import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { ResumesPageContent } from '@/components/dashboard/resumes/ResumesPageContent'

export default function MyResumesPage() {
  return (
    <div className="p-6 md:p-8 max-w-[1800px] mx-auto min-h-screen">

      {/* Top Header */}
      <DashboardHeader
        title="My Resumes"
        subtitle="Manage, organize, optimize, and download all your resumes from one place."
      />

      <ResumesPageContent />

    </div>
  )
}
