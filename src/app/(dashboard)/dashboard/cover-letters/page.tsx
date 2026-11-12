import Link from 'next/link'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { CoverLettersPageContent } from '@/components/dashboard/cover-letters/CoverLettersPageContent'
import { ModuleHowItWorks, ModuleStep } from '@/components/dashboard/ModuleHowItWorks'
import { FilePlus2 } from 'lucide-react'

export default function CoverLettersPage() {
  const steps: ModuleStep[] = [
    {
      iconName: 'FileText',
      title: 'Select Your Tailored Resume',
      description: 'Choose any resume you previously generated for a specific job description.',
      bullets: [
        'Each cover letter stays aligned to that resume and job description',
        'Our engine reads the exact role requirements used for your resume',
        'Supports both Full-Time and C2C contract applications',
      ],
    },
    {
      iconName: 'Sparkles',
      title: 'AI Crafts Your Narrative',
      description: 'Generate a concise, high-impact cover letter anchored in your real milestones.',
      bullets: [
        'Opening paragraph hooks the hiring manager right away',
        'Body paragraphs map your proven achievements to JD needs',
        'Clear closing call-to-action tailored to the company',
      ],
    },
    {
      iconName: 'Send',
      title: 'Export & Apply Fast',
      description: 'Open, refine, or download your letter as PDF or DOCX directly for applications.',
      bullets: [
        'PDF format: print-ready, executive typography',
        'DOCX format: fully editable in Word or Google Docs',
        'Automatically saved inside your Cover Letters vault',
      ],
    },
  ]

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-14 max-w-[1540px] mx-auto">
      <DashboardHeader
        eyebrow="Application Letters"
        title="Cover Letters"
        subtitle="AI-crafted cover letters matched directly to your tailored resumes and target job descriptions."
        actions={
          <Link
            href="/dashboard/create"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F2744] hover:bg-[#0A1C33] text-white text-xs font-extrabold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <FilePlus2 className="w-4 h-4 text-[#F59E0B]" />
            <span>New Resume Studio</span>
          </Link>
        }
      />

      <ModuleHowItWorks
        moduleTitle="Cover Letters"
        tagline="Select any tailored resume and generate a matching cover letter in seconds."
        steps={steps}
      />

      <CoverLettersPageContent />
    </div>
  )
}
