import { CoverLettersPageContent } from '@/components/dashboard/cover-letters/CoverLettersPageContent'
import { ModuleHowItWorks, ModuleStep } from '@/components/dashboard/ModuleHowItWorks'

export default function CoverLettersPage() {
  const steps: ModuleStep[] = [
    {
      iconName: 'FileText',
      title: 'Select Your Resume',
      description: 'Choose any tailored resume you previously generated for a specific job.',
      bullets: [
        'Each cover letter is tied to one resume + job description',
        'AI reads the same JD that was used to generate that resume',
        'Works for Full-Time and C2C resume types',
      ],
    },
    {
      iconName: 'Sparkles',
      title: 'AI Writes Your Cover Letter',
      description: 'AI generates a professional, personalized cover letter matching the JD and your profile.',
      bullets: [
        'Opening paragraph hooks the hiring manager immediately',
        'Body paragraphs align your experience to JD requirements',
        'Closing with clear call-to-action and availability',
      ],
    },
    {
      iconName: 'Send',
      title: 'Download & Apply',
      description: 'Export your cover letter as a PDF or DOCX and attach it directly to your application.',
      bullets: [
        'PDF format — print-ready and ATS-safe',
        'DOCX format — fully editable in Word or Google Docs',
        'Saved to your dashboard for future reference',
      ],
    },
  ]

  return (
    <div className="min-h-screen">
      <ModuleHowItWorks
        moduleTitle="Cover Letters"
        tagline="Select a resume — AI writes a matching cover letter in seconds."
        steps={steps}
      />
      <div className="p-8 max-w-[1600px] mx-auto">
        <CoverLettersPageContent />
      </div>
    </div>
  )
}
