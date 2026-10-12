import { NextResponse } from 'next/server'
import { verifyAdminSession, getAdminSupabaseClient } from '@/utils/adminAuth'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const { authorized } = await verifyAdminSession()
    if (!authorized) {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 401 })
    }

    const supabase = getAdminSupabaseClient()
    // 1. Fetch all profiles
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('*, payments_and_subscriptions(created_at, valid_until)')
      .order('created_at', { ascending: false })

    if (profileError) throw profileError

    // 2. For each user: count their resumes + calculate average ATS score
    const usersWithResumes = await Promise.all(
      (profiles || []).map(async (profile) => {
        // Get all resume IDs for this user
        const { data: resumes, count: resumeCount } = await supabase
          .from('resumes_v2')
          .select('id', { count: 'exact' })
          .eq('user_id', profile.id)

        const resumeIds = (resumes || []).map(r => r.id)

        // Get average ATS score across all their resumes
        let avgAts: number | null = null
        if (resumeIds.length > 0) {
          const { data: atsRows } = await supabase
            .from('ats_analyses')
            .select('overall_score')
            .in('resume_id', resumeIds)

          if (atsRows && atsRows.length > 0) {
            const total = atsRows.reduce((sum, row) => sum + (row.overall_score || 0), 0)
            avgAts = Math.round(total / atsRows.length)
          }
        }

        // Calculate the maximum possible generated count to prevent count dropping on deletion
        const spentFreeCredits = profile.plan_id === 'FREE' ? Math.max(0, 10 - (profile.credits_remaining ?? 10)) : 0;
        const permanentCount = Math.max(
          profile.resumes_generated ?? 0,
          resumeCount ?? 0,
          spentFreeCredits
        );

        return {
          ...profile,
          resume_count: permanentCount,
          avg_ats_score: avgAts, // null means no analyses yet
        }
      })
    )

    return NextResponse.json(usersWithResumes)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
