'use client'

import { 
  FileText, 
  Sparkles, 
  ShieldCheck, 
  Download, 
  Check, 
  ChevronRight,
  ArrowRight
} from 'lucide-react'
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
      icon: FileText,
      badge: 'Step 1'
    },
    { 
      step: 2, 
      label: 'Target Job & JD', 
      desc: 'Company, role & requirements',
      icon: Sparkles,
      badge: 'Step 2'
    },
    { 
      step: 3, 
      label: 'ATS Review & Export', 
      desc: '90+ score & PDF download',
      icon: ShieldCheck,
      badge: 'Step 3'
    },
  ]

  // Calculate dynamic progress bar percentage
  const progressPercent = currentStep === 1 ? 25 : currentStep === 2 ? 65 : 100

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 mb-6 overflow-hidden relative">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-[14px] font-bold text-slate-900 tracking-tight">
              AI Resume Generation Pipeline
            </h3>
          </div>
          <p className="text-[12px] text-slate-500 font-medium mt-0.5">
            Real-time multi-stage tailoring for enterprise ATS match standards.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Progress:
          </span>
          <span className="text-[12px] font-black text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200/80">
            Stage {currentStep} of 3 ({progressPercent}%)
          </span>
        </div>
      </div>

      {/* Progress Line Track */}
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-5">
        <div 
          className="h-full bg-gradient-to-r from-emerald-500 via-primary to-emerald-600 transition-all duration-500 ease-out rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Interactive Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {steps.map((item) => {
          const Icon = item.icon
          const isCompleted = currentStep > item.step
          const isCurrent = currentStep === item.step
          const isUpcoming = currentStep < item.step
          const isClickable = isCompleted && onStepClick

          return (
            <div
              key={item.step}
              onClick={() => isClickable && onStepClick(item.step)}
              className={cn(
                "p-4 rounded-xl border-2 transition-all relative flex items-center justify-between gap-3",
                isCurrent && "bg-emerald-50/90 border-emerald-600 shadow-sm shadow-emerald-500/10 ring-1 ring-emerald-500/20",
                isCompleted && "bg-slate-50/80 border-slate-200 hover:bg-slate-100/80 text-slate-800",
                isUpcoming && "bg-white border-slate-200/80 text-slate-400",
                isClickable && "cursor-pointer hover:border-slate-300"
              )}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Step Circle */}
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-[13px] transition-all",
                  isCurrent && "bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-200",
                  isCompleted && "bg-slate-900 text-white shadow-xs",
                  isUpcoming && "bg-slate-50 border border-slate-200 text-slate-400"
                )}>
                  {isCompleted ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>

                {/* Text Content */}
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md",
                      isCurrent && "bg-emerald-600 text-white shadow-2xs",
                      isCompleted && "bg-slate-200 text-slate-700",
                      isUpcoming && "bg-slate-100 text-slate-500"
                    )}>
                      {isCompleted ? '✓ Completed' : isCurrent ? 'Active Stage' : item.badge}
                    </span>
                  </div>

                  <h4 className={cn(
                    "text-[13.5px] font-bold truncate mt-1",
                    isCurrent ? "text-slate-950" : isCompleted ? "text-slate-900" : "text-slate-600"
                  )}>
                    {item.label}
                  </h4>

                  <p className={cn(
                    "text-[11.5px] truncate",
                    isCurrent ? "text-emerald-900/80 font-medium" : isCompleted ? "text-slate-500 font-normal" : "text-slate-400 font-normal"
                  )}>
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Right Indicator / Jump trigger */}
              {isClickable && (
                <span className="text-[11px] font-semibold text-slate-600 hover:text-slate-900 bg-white px-2 py-1 rounded border border-slate-200 shrink-0 hidden sm:inline-block shadow-2xs">
                  Edit ↗
                </span>
              )}
            </div>
          )
        })}
      </div>

    </div>
  )
}
