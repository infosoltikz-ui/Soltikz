import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { ResumesPageContent } from '@/components/dashboard/resumes/ResumesPageContent'
import { ModuleHowItWorks, ModuleStep } from '@/components/dashboard/ModuleHowItWorks'

export default function MyResumesPage() {
  const steps: ModuleStep[] = [
    {
      iconName: 'FileStack',
      title: 'Resume Vault',
      description: 'All your AI-tailored resumes are stored here, organized by job and company.',
      bullets: [
        'Every resume is linked to the job description it was generated for',
        'Filter by resume type — Full-Time or C2C',
        'Resume history is preserved across all sessions',
      ],
    },
    {
      iconName: 'Pencil',
      title: 'Review & Optimize',
      description: 'Check ATS scores, review generated content, and re-generate any resume with one click.',
      bullets: [
        'View the ATS compatibility score for each resume',
        'Re-generate a resume instantly with updated settings',
        'Open the full resume preview before downloading',
      ],
    },
    {
      iconName: 'DownloadCloud',
      title: 'Export Anywhere',
      description: 'Download your finished resume as a PDF or DOCX for immediate application.',
      bullets: [
        'PDF — pixel-perfect, ATS-safe, no layout shifts',
        'DOCX — fully editable in Microsoft Word or Google Docs',
        'Both formats preserve exact layout and typography',
      ],
    },
  ]

  return (
    <div className="p-6 md:p-8 max-w-[1800px] mx-auto min-h-screen">
      <DashboardHeader
        title="My Resumes"
        subtitle="Manage, organize, optimize, and download all your resumes from one place."
      />
      <ModuleHowItWorks
        moduleTitle="My Resumes"
        tagline="All your AI-tailored resumes in one place — review, export, and apply instantly."
        steps={steps}
      />
      <ResumesPageContent />
    </div>
  )
}
