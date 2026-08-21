import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { CoverLettersPageContent } from '@/components/dashboard/cover-letters/CoverLettersPageContent'

export default function CoverLettersPage() {
  return (
    <div className="p-8 max-w-[1600px] mx-auto min-h-screen">

      <DashboardHeader
        title="Cover Letters"
        subtitle="AI-written cover letters, tailored to the job description behind each resume."
      />

      <CoverLettersPageContent />

    </div>
  )
}
