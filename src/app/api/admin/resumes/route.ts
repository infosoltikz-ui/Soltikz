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
    const { data: resumesData, error: resumesError } = await supabase
      .from('resumes_v2')
      .select('*, parsed_job_descriptions(company_name, job_title), ats_analyses(overall_score)')
      .order('updated_at', { ascending: false })

    if (resumesError) {
      throw resumesError
    }

    if (!resumesData || resumesData.length === 0) {
      return NextResponse.json({ resumes: [] })
    }

    // Get unique user IDs
    const userIds = [...new Set(resumesData.map(r => r.user_id).filter(Boolean))]

    // Fetch corresponding profiles
    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .select('id, full_name')
      .in('id', userIds)

    if (profilesError) {
      console.error('Failed to fetch profiles for resumes:', profilesError)
      // Continue anyway, we just won't have names
    }

    // Create a map for quick lookup
    const profileMap = (profilesData || []).reduce((acc: any, profile: any) => {
      acc[profile.id] = profile
      return acc
    }, {})

    // Map profiles back to resumes
    const enrichedResumes = resumesData.map(resume => ({
      ...resume,
      profiles: profileMap[resume.user_id] || null
    }))

    return NextResponse.json({ resumes: enrichedResumes })
  } catch (err: any) {
    console.error('Admin Fetch Resumes Error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
