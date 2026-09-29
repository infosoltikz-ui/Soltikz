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
      .limit(2)

    return NextResponse.json({ data: resumesData })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
