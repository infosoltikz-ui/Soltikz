import { createClient } from '@/utils/supabase/server'
import { getTemplateById, DEFAULT_TEMPLATE_ID } from '@/components/create-resume/templates/registry'
import { PrintButton } from './PrintButton'

export const dynamic = 'force-dynamic'

export default async function PublicResumePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  // The public RLS policy (migration_06) only returns a row here when is_public = true,
  // regardless of who's viewing - no login required, and this never touches `profiles`.
  const { data: resume } = await supabase
    .from('resumes_v2')
    .select('id, title, public_snapshot')
    .eq('share_slug', slug)
    .eq('is_public', true)
    .single()

  if (!resume) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-2xl font-black text-slate-900 mb-2">Resume not found</h1>
          <p className="text-slate-500">This link is invalid, or the owner has made this resume private again.</p>
        </div>
      </div>
    )
  }

  const { data: sections } = await supabase
    .from('resume_sections')
    .select('section_type, content')
    .eq('resume_id', resume.id)

  const resumeData: any = {}
  sections?.forEach((sec: any) => {
    resumeData[sec.section_type.toLowerCase()] = sec.content
  })

  const profileData = resume.public_snapshot || {}
  const Template = getTemplateById(DEFAULT_TEMPLATE_ID).component

  return (
    <div className="min-h-screen bg-slate-50 py-10 print:py-0 print:bg-white">
      <PrintButton />
      <div className="overflow-x-auto px-4">
        <Template resumeData={resumeData} profileData={profileData} />
      </div>
    </div>
  )
}
