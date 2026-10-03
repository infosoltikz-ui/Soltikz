'use client'

import { useState } from 'react'
import { BookOpen, ChevronRight, Sparkles, X, CheckCircle2, ArrowRight } from 'lucide-react'
import { FileText, Send, FileStack, Pencil, DownloadCloud, UserCircle, ShieldAlert, Key, Target, LayoutDashboard, SearchCheck, LucideIcon } from 'lucide-react'
import { cn } from '@/utils/cn'

const iconMap: Record<string, LucideIcon> = {
  FileText, Sparkles, Send, FileStack, Pencil, DownloadCloud,
  UserCircle, ShieldAlert, Key, Target, LayoutDashboard, SearchCheck,
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

function GuideModal({ open, onClose, moduleTitle, steps }: { open: boolean; onClose: () => void; moduleTitle: string; steps: ModuleStep[] }) {
  if (!open) return null

  const colors = [
    { color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-200' },
    { color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    { color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
    { color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-200' },
    { color: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-200' },
    { color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200' },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[88vh] flex flex-col overflow-hidden border border-slate-200">

        {/* Header */}
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 px-6 pt-6 pb-5 shrink-0">
          <div
            className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
          />
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-[11px] font-extrabold text-emerald-400 uppercase tracking-widest">Module Guide</span>
              </div>
              <h2 className="text-[20px] font-black text-white leading-tight mb-1">How to use — {moduleTitle}</h2>
              <p className="text-[12px] text-slate-300 font-medium">Step-by-step guide for this module.</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-all shrink-0 mt-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-slate-50/50">
          {steps.map((step, index) => {
            const Icon = iconMap[step.iconName]
            const c = colors[index % colors.length]
            return (
              <div key={index} className={cn('bg-white rounded-xl border p-4 flex gap-4 hover:shadow-sm transition-shadow', c.border)}>
                <div className="shrink-0 flex flex-col items-center gap-1.5 pt-0.5">
                  <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center border', c.bg, c.border)}>
                    {Icon && <Icon className={cn('w-5 h-5', c.color)} />}
                  </div>
                  <span className="text-[10px] font-black text-slate-400 tracking-wider">0{index + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[14px] font-black text-slate-900 mb-0.5">{step.title}</h3>
                  <p className="text-[12px] text-slate-500 font-medium leading-relaxed mb-2">{step.description}</p>
                  <ul className="space-y-1">
                    {step.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-[12px] text-slate-700 font-semibold">
                        <CheckCircle2 className={cn('w-3.5 h-3.5 mt-0.5 shrink-0', c.color)} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-slate-200 px-5 py-3.5 bg-white flex items-center justify-between gap-3">
          <p className="text-[11.5px] text-slate-400 font-medium">✅ Follow the steps above to get the best results.</p>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 h-9 px-5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-[12px] font-bold rounded-xl shadow-md shadow-emerald-500/25 hover:shadow-lg hover:from-emerald-600 hover:to-teal-700 transition-all"
          >
            Got it <ArrowRight className="w-3.5 h-3.5" />
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
      <GuideModal open={open} onClose={() => setOpen(false)} moduleTitle={moduleTitle} steps={steps} />

      {/* Dark horizontal bar — same style as CreateResumeHeader sub-bar */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-lg mb-6">
        <div className="px-4 sm:px-5 h-11 flex items-center justify-between gap-4">

          {/* Left: pulsing dot + sparkle + tagline */}
          <div className="flex items-center gap-2.5 min-w-0 flex-1 overflow-hidden">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <Sparkles className="w-3 h-3 text-emerald-400 shrink-0" style={{ animation: 'spin 5s linear infinite' }} />
            <p className="text-[11.5px] font-semibold text-slate-400 whitespace-nowrap overflow-hidden text-ellipsis">
              <span className="text-emerald-400 font-bold">{moduleTitle}</span>
              <span className="mx-2 text-slate-600">·</span>
              {tagline}
            </p>
          </div>

          {/* Right: arrow + How it Works button */}
          <div className="flex items-center gap-2 shrink-0">
            <ChevronRight className="w-4 h-4 text-emerald-400 animate-pulse" />
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-1.5 h-7 px-3.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-[11.5px] font-bold transition-all shadow-md shadow-emerald-500/30 hover:shadow-emerald-400/40 hover:scale-[1.03] active:scale-[0.97] select-none"
            >
              <BookOpen className="w-3 h-3 shrink-0" />
              How it Works
            </button>
          </div>

        </div>
      </div>
    </>
  )
}
