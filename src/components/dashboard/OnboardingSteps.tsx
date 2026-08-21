import { Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/utils/cn'

export function OnboardingSteps({ profileCompletion, resumesCreated }: { profileCompletion: number, resumesCreated: number }) {
  // If they have completed the profile and generated a resume, they don't need onboarding anymore.
  if (profileCompletion === 100 && resumesCreated > 0) {
    return null
  }

  const steps = [
    {
      title: 'Complete Master Profile',
      description: 'Fill in your experience, education, and skills once.',
      done: profileCompletion === 100,
      href: '/dashboard/profile',
      cta: 'Go to Profile',
    },
    {
      title: 'Add a Job Description',
      description: 'Paste the job description you want to tailor your resume for.',
      done: resumesCreated > 0,
      href: '/dashboard/create',
      cta: 'Start Creating',
      disabled: profileCompletion < 100,
    },
    {
      title: 'Generate Your AI Resume',
      description: "Let the AI rewrite your bullets to match the job perfectly.",
      done: resumesCreated > 0,
      href: '/dashboard/create',
      cta: 'Generate Resume',
      disabled: profileCompletion < 100,
    },
  ]

  const completedCount = steps.filter(s => s.done).length

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
        <div>
          <h2 className="text-[16px] font-black text-indigo-950">Getting Started Guide</h2>
          <p className="text-[13px] font-medium text-indigo-700">Follow these 3 simple steps to generate your first ATS-optimized resume.</p>
        </div>
        <div className="text-[12px] font-black text-indigo-700 bg-white/70 border border-indigo-200 rounded-full px-3 py-1 shrink-0 self-start sm:self-auto">
          {completedCount} of {steps.length} complete
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map((step, i) => (
          <div key={step.title} className={cn(
            "bg-white rounded-xl p-4 border flex flex-col",
            step.done ? 'border-green-200' : 'border-indigo-100 shadow-sm'
          )}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400">Step {i + 1}</span>
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black shrink-0",
                step.done ? "bg-primary text-white" : "bg-indigo-100 text-indigo-500"
              )}>
                {step.done ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : i + 1}
              </div>
            </div>
            <h3 className="text-[14px] font-bold text-slate-900 mb-1">{step.title}</h3>
            <p className="text-[12px] text-slate-500 mb-3 flex-1">{step.description}</p>
            {!step.done && !step.disabled && (
              <Link href={step.href} className="inline-flex items-center text-[12px] font-bold text-primary hover:text-primary-dark transition-colors">
                {step.cta} <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
