import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { ResumesPageContent } from '@/components/dashboard/resumes/ResumesPageContent'
import { ModuleHowItWorks } from '@/components/dashboard/ModuleHowItWorks'

export default function MyResumesPage() {
  const steps = [
    { title: 'Resume Vault', description: 'All your AI-tailored resumes are securely stored here.', iconName: 'FileStack' as const },
    { title: 'Edit & Optimize', description: 'Review ATS scores, edit content, and prepare for interviews.', iconName: 'Pencil' as const },
    { title: 'Export Anywhere', description: 'Download as PDF or Word Doc for direct application.', iconName: 'DownloadCloud' as const },
  ]

  return (
    <div className="p-6 md:p-8 max-w-[1800px] mx-auto min-h-screen">
      {/* Top Header */}
      <DashboardHeader
        title="My Resumes"
        subtitle="Manage, organize, optimize, and download all your resumes from one place."
      />

      <ModuleHowItWorks steps={steps} />

      <ResumesPageContent />

    </div>
  )
}
