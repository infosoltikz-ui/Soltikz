import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { CoverLettersPageContent } from '@/components/dashboard/cover-letters/CoverLettersPageContent'
import { ModuleHowItWorks } from '@/components/dashboard/ModuleHowItWorks'

export default function CoverLettersPage() {
  const steps = [
    { title: 'Select Resume', description: 'Choose a tailored resume you previously generated for a job.', iconName: 'FileText' as const },
    { title: 'AI Generation', description: 'AI writes a cover letter matching the exact JD requirements.', iconName: 'Sparkles' as const },
    { title: 'Download & Apply', description: 'Export your cover letter as PDF/DOCX and apply instantly.', iconName: 'Send' as const },
  ]

  return (
    <div className="p-8 max-w-[1600px] mx-auto min-h-screen">
      <DashboardHeader
        title="Cover Letters"
        subtitle="AI-written cover letters, tailored to the job description behind each resume."
      />
      <ModuleHowItWorks steps={steps} />
      <CoverLettersPageContent />
    </div>
  )
}
