import { Check, ArrowRight, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/utils/cn'

export function OnboardingSteps({ 
  profileCompletion, 
  resumesCreated 
}: { 
  profileCompletion: number
  resumesCreated: number 
}) {
  // If they have completed the profile and generated a resume, they don't need onboarding checklist.
  if (profileCompletion >= 80 && resumesCreated > 0) {
    return null
  }

  const steps = [
    {
      title: 'Complete Master Profile',
      description: 'Fill in your contact details, experience, education, and skills.',
      done: profileCompletion >= 80,
      href: '/dashboard/profile',
      cta: 'Go to Profile',
    },
    {
      title: 'Target a Job Description',
      description: 'Paste the target job requirements for high-relevance ATS matching.',
      done: resumesCreated > 0,
      href: '/dashboard/create',
      cta: 'Start Tailoring',
      disabled: profileCompletion < 40,
    },
    {
      title: 'Generate ATS-Optimized Resume',
      description: 'Produce a tailored, recruiter-ready PDF with high ATS keywords score.',
      done: resumesCreated > 0,
      href: '/dashboard/create',
      cta: 'Create Resume',
      disabled: profileCompletion < 40,
    },
  ]

  const completedCount = steps.filter(s => s.done).length

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-[15px] font-bold text-slate-900 tracking-tight">
            Getting Started Checklist
          </h2>
          <p className="text-[12px] text-slate-500 font-medium mt-0.5">
            Complete these recommended steps to maximize your ATS interview callbacks.
          </p>
        </div>
        <div className="text-[11px] font-semibold text-slate-700 bg-slate-100 border border-slate-200 rounded-md px-2.5 py-1 shrink-0 self-start sm:self-auto">
          {completedCount} of {steps.length} completed
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {steps.map((step, i) => (
          <div 
            key={step.title} 
            className={cn(
              "rounded-lg p-4 border flex flex-col justify-between transition-all",
              step.done 
                ? 'bg-emerald-50/40 border-emerald-200/70' 
                : 'bg-slate-50/60 border-slate-200/80 hover:bg-slate-50'
            )}
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
                  Step {i + 1}
                </span>
                <div className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0",
                  step.done ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-600"
                )}>
                  {step.done ? <Check className="w-3 h-3" strokeWidth={3} /> : i + 1}
                </div>
              </div>
              <h3 className="text-[13px] font-bold text-slate-900 mb-1 leading-snug">
                {step.title}
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
                {step.description}
              </p>
            </div>

            <div>
              {step.done ? (
                <div className="inline-flex items-center text-[11px] font-semibold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Completed
                </div>
              ) : step.disabled ? (
                <span className="text-[11px] text-slate-400 font-medium">Complete Step 1 first</span>
              ) : (
                <Link 
                  href={step.href} 
                  className="inline-flex items-center text-[11px] font-bold text-primary hover:text-primary-dark transition-colors"
                >
                  {step.cta} <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
