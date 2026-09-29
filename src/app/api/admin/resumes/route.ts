import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  try {
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
