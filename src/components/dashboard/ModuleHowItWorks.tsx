'use client'

import { useState } from 'react'
import {
  BookOpen,
  ChevronRight,
  Sparkles,
  X,
  CheckCircle2,
  ArrowRight,
  FileText,
  Send,
  FileStack,
  Pencil,
  DownloadCloud,
  UserCircle,
  ShieldAlert,
  Key,
  Target,
  LayoutDashboard,
  SearchCheck,
  LucideIcon,
} from 'lucide-react'
import { cn } from '@/utils/cn'

const iconMap: Record<string, LucideIcon> = {
  FileText,
  Sparkles,
  Send,
  FileStack,
  Pencil,
  DownloadCloud,
  UserCircle,
  ShieldAlert,
  Key,
  Target,
  LayoutDashboard,
  SearchCheck,
}

export interface ModuleStep {
  iconName: keyof typeof iconMap
  title: string
  description: string
  bullets: string[]
}

interface ModuleHowItWorksProps {
  moduleTitle: string
  tagline: string
  steps: ModuleStep[]
}

function GuideModal({
  open,
  onClose,
  moduleTitle,
  steps,
}: {
  open: boolean
  onClose: () => void
  moduleTitle: string
  steps: ModuleStep[]
}) {
  if (!open) return null

  const accents = [
    {
      iconColor: 'text-[#0F2744]',
      iconBg: 'bg-[#EEF4FA]',
      border: 'border-[#0F2744]/15',
      checkColor: 'text-[#0F2744]',
    },
    {
      iconColor: 'text-amber-700',
      iconBg: 'bg-amber-50',
      border: 'border-amber-200',
      checkColor: 'text-amber-600',
    },
    {
      iconColor: 'text-emerald-700',
      iconBg: 'bg-emerald-50',
      border: 'border-emerald-200',
      checkColor: 'text-emerald-600',
    },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/55 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[88vh] flex flex-col overflow-hidden border border-slate-200/90 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="relative bg-[#0F2744] px-6 pt-6 pb-5 shrink-0 border-b border-white/10">
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 mb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span className="text-[10.5px] font-extrabold text-[#F59E0B] uppercase tracking-widest">
                  Workflow Guide
                </span>
              </div>
              <h2 className="text-xl font-black text-white tracking-tight leading-snug">
                How to use {moduleTitle}
              </h2>
              <p className="text-xs text-slate-300 font-medium mt-1">
                Follow these simple steps to get the highest ATS compatibility results.
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close guide"
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors shrink-0 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-3.5 bg-[#F8FAFC]">
          {steps.map((step, index) => {
            const Icon = iconMap[step.iconName]
            const a = accents[index % accents.length]
            return (
              <div
                key={index}
                className={cn(
                  'bg-white rounded-2xl border p-4 sm:p-5 flex gap-4 shadow-2xs hover:shadow-md transition-all duration-200',
                  a.border
                )}
              >
                <div className="shrink-0 flex flex-col items-center gap-1.5 pt-0.5">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-xl flex items-center justify-center border',
                      a.iconBg,
                      a.border
                    )}
                  >
                    {Icon && <Icon className={cn('w-5 h-5', a.iconColor)} strokeWidth={2.2} />}
                  </div>
                  <span className="text-[10px] font-black text-slate-400 tabular-nums tracking-wider">
                    0{index + 1}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-[14.5px] font-extrabold text-slate-900 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mb-3">
                    {step.description}
                  </p>
                  <ul className="space-y-1.5">
                    {step.bullets.map((b, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs text-slate-700 font-semibold"
                      >
                        <CheckCircle2 className={cn('w-3.5 h-3.5 mt-0.5 shrink-0', a.checkColor)} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-slate-200 px-6 py-4 bg-white flex items-center justify-between gap-3">
          <p className="text-xs text-slate-500 font-medium">
            Tip: Keep your Master Profile complete before tailoring resumes.
          </p>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 h-9 px-5 bg-[#0F2744] hover:bg-[#0A1C33] text-white text-xs font-bold rounded-xl shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <span>Got it</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F59E0B]" />
          </button>
        </div>
      </div>
    </div>
  )
}

export function ModuleHowItWorks({ moduleTitle, tagline, steps }: ModuleHowItWorksProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <GuideModal
        open={open}
        onClose={() => setOpen(false)}
        moduleTitle={moduleTitle}
        steps={steps}
      />

      {/* Sleek Editorial Guide Strip */}
      <div className="group bg-white border border-slate-200/90 hover:border-[#0F2744]/25 rounded-2xl shadow-2xs hover:shadow-sm transition-all duration-200 mb-6 px-4 sm:px-5 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0F2744] text-white text-[11px] font-extrabold uppercase tracking-wider shrink-0">
              <Sparkles className="w-3 h-3 text-[#F59E0B]" />
              <span>{moduleTitle}</span>
            </span>
            <p className="text-[13px] font-medium text-slate-600 truncate">
              {tagline}
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-xl bg-amber-50 hover:bg-[#F59E0B] text-amber-900 hover:text-slate-950 border border-amber-200/90 hover:border-[#F59E0B] text-xs font-extrabold transition-all duration-200 shrink-0 cursor-pointer self-start sm:self-auto shadow-2xs"
          >
            <BookOpen className="w-3.5 h-3.5 shrink-0" />
            <span>How it Works</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </>
  )
}
