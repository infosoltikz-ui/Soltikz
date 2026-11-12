import Link from 'next/link'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { ResumesPageContent } from '@/components/dashboard/resumes/ResumesPageContent'
import { ModuleHowItWorks, ModuleStep } from '@/components/dashboard/ModuleHowItWorks'
import { FilePlus2 } from 'lucide-react'

export default function MyResumesPage() {
  const steps: ModuleStep[] = [
    {
      iconName: 'FileStack',
      title: 'Resume Vault',
      description: 'All your AI-tailored resumes are stored here, organized by job and company.',
      bullets: [
        'Every resume is linked to the job description it was generated for',
        'Filter by resume type (Full-Time or C2C) or AI model',
        'Resume history is preserved across all sessions',
      ],
    },
    {
      iconName: 'Pencil',
      title: 'Review & Optimize',
      description: 'Check ATS scores, preview layouts, and edit or duplicate any resume with one click.',
      bullets: [
        'View the ATS compatibility score for each resume',
        'Open quick editor to polish bullets or switch templates',
        'Preview exact PDF layout before downloading',
      ],
    },
    {
      iconName: 'DownloadCloud',
      title: 'Export Anywhere',
      description: 'Download your finished resume as a PDF or share a live web link directly with recruiters.',
      bullets: [
        'PDF: pixel-perfect, ATS-safe, zero layout shifts',
        'One-click public share link for direct recruiter viewing',
        'Both options preserve exact formatting and typography',
      ],
    },
  ]

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-14 max-w-[1540px] mx-auto">
      <DashboardHeader
        eyebrow="Document Vault"
        title="My Resumes"
        subtitle="Manage, preview, duplicate, share, and download all your ATS-tailored resumes from one workspace."
        actions={
          <Link
            href="/dashboard/create"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F2744] hover:bg-[#0A1C33] text-white text-xs font-extrabold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <FilePlus2 className="w-4 h-4 text-[#F59E0B]" />
            <span>New Tailored Resume</span>
          </Link>
        }
      />

      <ModuleHowItWorks
        moduleTitle="My Resumes"
        tagline="All your AI-tailored resumes in one vault to review, edit, export, and share instantly."
        steps={steps}
      />

      <ResumesPageContent />
    </div>
  )
}
