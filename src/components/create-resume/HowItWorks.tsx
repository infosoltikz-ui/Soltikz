'use client'

import { Check, Sparkles, Layout, ShieldCheck, ArrowRight } from 'lucide-react'
import { cn } from '@/utils/cn'

interface HowItWorksProps {
  currentStep?: number
  onStepClick?: (step: number) => void
}

export function HowItWorks({ currentStep = 1, onStepClick }: HowItWorksProps) {
  const steps = [
    { 
      step: 1, 
      label: 'Setup & Target', 
      desc: 'Layout & Job Details',
      icon: Layout,
      badge: 'Step 01'
    },
    { 
      step: 2, 
      label: 'AI Tailored Resume', 
      desc: 'Live Preview & ATS Score',
      icon: Sparkles,
      badge: 'Step 02'
    },
    { 
      step: 3, 
      label: 'Interview Strategy', 
      desc: 'Cover Letter & Q&A Prep',
      icon: ShieldCheck,
      badge: 'Step 03'
    },
  ]

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-xl border border-slate-200/80 shadow-2xs p-2 sm:p-2.5 mb-5">
      <nav aria-label="Progress Workflow" className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-2.5">
        {steps.map((item) => {
          const isCompleted = currentStep > item.step
          const isCurrent = currentStep === item.step
          const isUpcoming = currentStep < item.step
          const isClickable = isCompleted && onStepClick
          const StepIcon = item.icon

          return (
            <div
              key={item.step}
              onClick={() => isClickable && onStepClick(item.step)}
              className={cn(
                "relative rounded-lg p-2.5 px-3 transition-all duration-200 flex items-center justify-between border overflow-hidden",
                isCurrent && "bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-emerald-500/10 border-emerald-500/50 ring-1 ring-emerald-500/20 shadow-2xs",
                isCompleted && "bg-slate-50/90 border-slate-200/80 text-slate-900",
                isUpcoming && "bg-slate-50/30 border-slate-200/50 text-slate-400 opacity-75",
                isClickable && "cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/20"
              )}
            >
              <div className="flex items-center gap-2.5 min-w-0 z-10">
                {/* Compact Icon Indicator */}
                <div className={cn(
                  "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 font-bold text-[11px] transition-all duration-200",
                  isCurrent && "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xs",
                  isCompleted && "bg-slate-900 text-emerald-400",
                  isUpcoming && "bg-slate-100 text-slate-400 border border-slate-200/80"
                )}>
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  ) : (
                    <StepIcon className="w-3.5 h-3.5" />
                  )}
                </div>

                {/* Step Text Details */}
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 leading-none mb-0.5">
                    <span className={cn(
                      "text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.2 rounded-md border",
                      isCurrent 
                        ? "text-emerald-700 bg-emerald-100/80 border-emerald-200" 
                        : isCompleted 
                        ? "text-slate-600 bg-slate-200/60 border-slate-300/50" 
                        : "text-slate-400 bg-slate-100 border-slate-200/60"
                    )}>
                      {isCompleted ? '✓ Done' : isCurrent ? 'Active' : item.badge}
                    </span>
                  </div>
                  <h3 className={cn(
                    "text-[12.5px] font-bold tracking-tight truncate leading-snug",
                    isCurrent ? "text-slate-900" : isCompleted ? "text-slate-800" : "text-slate-400"
                  )}>
                    {item.label}
                  </h3>
                  <p className={cn(
                    "text-[10.5px] truncate font-medium leading-none text-slate-400"
                  )}>
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Edit Action Button if completed */}
              {isClickable && (
                <div className="z-10 shrink-0 ml-1.5">
                  <span className="text-[10px] font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-md transition-all flex items-center gap-0.5">
                    Edit <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </div>
  )
}
