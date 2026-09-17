'use client'

import { Check, ChevronRight } from 'lucide-react'
import { cn } from '@/utils/cn'

interface HowItWorksProps {
  currentStep?: number
  onStepClick?: (step: number) => void
}

export function HowItWorks({ currentStep = 1, onStepClick }: HowItWorksProps) {
  const steps = [
    { 
      step: 1, 
      label: 'Profile & Template', 
      desc: 'Master record & layout',
      stepNum: '01'
    },
    { 
      step: 2, 
      label: 'Target Job & Resume', 
      desc: 'AI tailoring & live preview',
      stepNum: '02'
    },
    { 
      step: 3, 
      label: 'Interview Strategy', 
      desc: 'Cover letter & Q&A prep',
      stepNum: '03'
    },
  ]

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-2 sm:p-2.5 mb-5">
      <nav aria-label="Progress" className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {steps.map((item, index) => {
          const isCompleted = currentStep > item.step
          const isCurrent = currentStep === item.step
          const isUpcoming = currentStep < item.step
          const isClickable = isCompleted && onStepClick

          return (
            <div
              key={item.step}
              onClick={() => isClickable && onStepClick(item.step)}
              className={cn(
                "relative rounded-xl px-4 py-2.5 transition-all duration-200 flex items-center justify-between",
                isCurrent && "bg-emerald-50/70 border border-emerald-500/80 shadow-2xs ring-1 ring-emerald-500/20",
                isCompleted && "bg-slate-50/70 border border-slate-200/80 text-slate-900",
                isUpcoming && "bg-white border border-transparent text-slate-400",
                isClickable && "cursor-pointer hover:bg-slate-100/90 hover:border-slate-300"
              )}
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Step Icon / Number Indicator */}
                <div className={cn(
                  "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 font-bold text-[12px] transition-all",
                  isCurrent && "bg-emerald-600 text-white shadow-xs ring-3 ring-emerald-100",
                  isCompleted && "bg-slate-900 text-white",
                  isUpcoming && "bg-slate-100 text-slate-400 border border-slate-200/70"
                )}>
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  ) : (
                    <span>{item.step}</span>
                  )}
                </div>

                {/* Step Information */}
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className={cn(
                      "text-[10px] font-extrabold uppercase tracking-wider",
                      isCurrent ? "text-emerald-700" : isCompleted ? "text-slate-500" : "text-slate-400"
                    )}>
                      {isCompleted ? 'Completed' : isCurrent ? 'Active Step' : `Step ${item.stepNum}`}
                    </span>
                  </div>
                  <h4 className={cn(
                    "text-[13px] font-bold leading-tight truncate",
                    isCurrent ? "text-slate-950 font-black" : isCompleted ? "text-slate-800" : "text-slate-400"
                  )}>
                    {item.label}
                  </h4>
                  <p className={cn(
                    "text-[11px] truncate leading-tight mt-0.5",
                    isCurrent ? "text-emerald-900/80 font-medium" : "text-slate-400 font-normal"
                  )}>
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Trailing Indicator or Edit Action */}
              <div className="flex items-center gap-2 shrink-0 ml-2">
                {isClickable && (
                  <span className="text-[10px] font-bold text-slate-600 hover:text-slate-900 bg-white px-2 py-0.5 rounded-md border border-slate-200/80 shadow-2xs">
                    Edit ↗
                  </span>
                )}
                {index < steps.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-slate-300 hidden md:block" />
                )}
              </div>
            </div>
          )
        })}
      </nav>
    </div>
  )
}
