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
      .limit(2)

    return NextResponse.json({ data: resumesData })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
