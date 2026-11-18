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
      iconColor: 'text-[#3FA57C]',
      iconBg: 'bg-[#123227]',
      border: 'border-[#3FA57C]/30',
      checkColor: 'text-[#3FA57C]',
    },
    {
      iconColor: 'text-[#D9A441]',
      iconBg: 'bg-[#2E2616]',
      border: 'border-[#D9A441]/30',
      checkColor: 'text-[#D9A441]',
    },
    {
      iconColor: 'text-[#3FA57C]',
      iconBg: 'bg-[#1A2330]',
      border: 'border-[#26313F]',
      checkColor: 'text-[#3FA57C]',
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
      <div className="relative bg-[#151D28] rounded-3xl shadow-2xl w-full max-w-2xl max-h-[88vh] flex flex-col overflow-hidden border border-[#26313F] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="relative bg-[#0D131B] px-6 pt-6 pb-5 shrink-0 border-b border-[#26313F]">
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#2E2616] border border-[#D9A441]/40 mb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
                <span className="text-[10.5px] font-extrabold text-[#D9A441] uppercase tracking-widest">
                  Workflow Guide
                </span>
              </div>
              <h2 className="text-xl font-black text-[#E4EAF2] tracking-tight leading-snug">
                How to use {moduleTitle}
              </h2>
              <p className="text-xs text-[#9FACBE] font-medium mt-1">
                Follow these simple steps to get the highest ATS compatibility results.
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close guide"
              className="w-8 h-8 rounded-xl bg-[#1A2330] hover:bg-[#222E3F] flex items-center justify-center text-[#9FACBE] hover:text-[#E4EAF2] transition-colors shrink-0 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-3.5 bg-[#0D131B]">
          {steps.map((step, index) => {
            const Icon = iconMap[step.iconName]
            const a = accents[index % accents.length]
            return (
              <div
                key={index}
                className={cn(
                  'bg-[#151D28] rounded-2xl border p-4 sm:p-5 flex gap-4 shadow-2xs hover:border-[#3A495C] transition-all duration-200',
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
                  <span className="text-[10px] font-black text-[#78859A] tabular-nums tracking-wider">
                    0{index + 1}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-[14.5px] font-extrabold text-[#E4EAF2] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#9FACBE] font-medium leading-relaxed mb-3">
                    {step.description}
                  </p>
                  <ul className="space-y-1.5">
                    {step.bullets.map((b, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs text-[#C3CCD9] font-semibold"
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
        <div className="shrink-0 border-t border-[#26313F] px-6 py-4 bg-[#151D28] flex items-center justify-between gap-3">
          <p className="text-xs text-[#78859A] font-medium">
            Tip: Keep your Master Profile complete before tailoring resumes.
          </p>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 h-9 px-5 bg-[#0A6E4E] hover:bg-[#0D8A62] text-white text-xs font-bold rounded-xl shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <span>Got it</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#D9A441]" />
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
      <div className="group bg-[#151D28] border border-[#26313F] hover:border-[#3A495C] rounded-2xl shadow-xs transition-all duration-200 mb-6 px-4 sm:px-5 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1A2330] text-[#E4EAF2] border border-[#26313F] text-[11px] font-extrabold uppercase tracking-wider shrink-0">
              <Sparkles className="w-3 h-3 text-[#D9A441]" />
              <span>{moduleTitle}</span>
            </span>
            <p className="text-[13px] font-medium text-[#9FACBE] truncate">
              {tagline}
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-xl bg-[#1A2330] hover:bg-[#222E3F] text-[#D9A441] hover:text-white border border-[#26313F] hover:border-[#D9A441]/40 text-xs font-extrabold transition-all duration-200 shrink-0 cursor-pointer self-start sm:self-auto shadow-2xs"
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
