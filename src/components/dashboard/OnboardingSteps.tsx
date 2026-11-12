import { Check, ArrowRight, CheckCircle2, Lock, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/utils/cn'

export function OnboardingSteps({
  profileCompletion,
  resumesCreated,
}: {
  profileCompletion: number
  resumesCreated: number
}) {
  if (profileCompletion >= 80 && resumesCreated > 0) {
    return null
  }

  const steps = [
    {
      title: 'Complete Master Profile',
      description: 'Add your contact details, work history, education, and core tech skills once.',
      done: profileCompletion >= 80,
      href: '/dashboard/profile',
      cta: 'Go to Profile',
    },
    {
      title: 'Target a Job Description',
      description: 'Paste any Full-Time or C2C job listing for instant keyword & seniority alignment.',
      done: resumesCreated > 0,
      href: '/dashboard/create',
      cta: 'Start Tailoring',
      disabled: profileCompletion < 40,
    },
    {
      title: 'Export ATS-Ready Resume',
      description: 'Download a clean, single-column PDF or DOCX built to pass recruiter filters.',
      done: resumesCreated > 0,
      href: '/dashboard/create',
      cta: 'Create Resume',
      disabled: profileCompletion < 40,
    },
  ]

  const completedCount = steps.filter((s) => s.done).length
  const progressPercent = Math.round((completedCount / steps.length) * 100)

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-100">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-700 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" strokeWidth={2.2} />
          </div>
          <div>
            <h2 className="text-[15.5px] font-extrabold text-slate-900 tracking-tight">
              Launch Checklist
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Complete these milestones to maximize your ATS interview callbacks.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0F2744] rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-extrabold text-[#0F2744] bg-[#EEF4FA] border border-[#0F2744]/10 rounded-lg px-2.5 py-1 tabular-nums">
            {completedCount}/{steps.length} Done
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map((step, i) => (
          <div
            key={step.title}
            className={cn(
              'group rounded-xl p-4 sm:p-5 border flex flex-col justify-between transition-all duration-200',
              step.done
                ? 'bg-emerald-50/40 border-emerald-200/80'
                : step.disabled
                ? 'bg-slate-50/50 border-slate-200/70 opacity-80'
                : 'bg-white border-slate-200/90 hover:border-[#0F2744]/30 hover:shadow-md hover:-translate-y-0.5'
            )}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10.5px] font-extrabold tracking-widest uppercase text-slate-400">
                  Step 0{i + 1}
                </span>
                <div
                  className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-extrabold shrink-0 transition-colors',
                    step.done
                      ? 'bg-emerald-600 text-white'
                      : step.disabled
                      ? 'bg-slate-200 text-slate-500'
                      : 'bg-[#0F2744] text-[#F59E0B]'
                  )}
                >
                  {step.done ? (
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  ) : step.disabled ? (
                    <Lock className="w-3 h-3" />
                  ) : (
                    i + 1
                  )}
                </div>
              </div>
              <h3 className="text-[14px] font-extrabold text-slate-900 mb-1.5 leading-snug">
                {step.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                {step.description}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100/80">
              {step.done ? (
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Completed</span>
                </div>
              ) : step.disabled ? (
                <span className="text-xs text-slate-400 font-semibold">
                  Complete Step 01 first
                </span>
              ) : (
                <Link
                  href={step.href}
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#0F2744] hover:text-amber-700 transition-colors"
                >
                  <span>{step.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
