import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Service role bypasses RLS — can read ALL profiles, resumes, and ats_analyses
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  try {
    // 1. Fetch all profiles
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('*')
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

        return {
          ...profile,
          resume_count: resumeCount ?? 0,
          avg_ats_score: avgAts, // null means no analyses yet
        }
      })
    )

    return NextResponse.json(usersWithResumes)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
