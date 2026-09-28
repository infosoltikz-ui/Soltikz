'use client'

import { useState } from 'react'
import {
  X, Sparkles, Layout, FileText, ShieldCheck, Download,
  CheckCircle2, Zap, Target, Brain, Star, ArrowRight,
  FileCheck, Users, BarChart3, Lightbulb, BookOpen
} from 'lucide-react'
import { cn } from '@/utils/cn'

interface GuideModalProps {
  open: boolean
  onClose: () => void
}

const FEATURES = [
  {
    icon: Layout,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    title: 'Choose Your Template',
    step: '01',
    desc: 'Pick from 10 professionally designed templates — 5 Full-Time and 5 C2C formats. Each template is ATS-optimized and pagination-perfect.',
    bullets: [
      'Classic, Modern, Banner, Certified, Sidebar styles',
      'Full-Time Corporate & C2C Vendor submission formats',
      'Live preview before selecting',
    ],
  },
  {
    icon: Users,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    title: 'Verify Your Profile',
    step: '02',
    desc: 'Your master profile is pre-loaded. Review your personal info, employment history, education, skills and certifications before generating.',
    bullets: [
      'Edit any section inline without leaving the page',
      'All data is auto-pulled from your saved profile',
      'Changes apply only to this resume session',
    ],
  },
  {
    icon: Target,
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    title: 'Paste the Job Description',
    step: '03',
    desc: 'Enter the target company name, job role, and paste the full job description. Our AI extracts every key requirement and keyword automatically.',
    bullets: [
      'AI parses mandatory skills, responsibilities and keywords',
      'Builds a targeting strategy before generating',
      'Works with any job board JD (LinkedIn, Indeed, Workday, etc.)',
    ],
  },
  {
    icon: Brain,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    title: 'AI Generates Your Resume',
    step: '04',
    desc: 'Gemini AI rewrites your experience bullets to match the JD — 10 power bullets per role, 25-30 words each, using strong executive action verbs.',
    bullets: [
      '10 tailored bullet points per experience (25-30 words each)',
      'Professional Summary as executive bullet points',
      'Skills section aligned to the JD keywords',
    ],
  },
  {
    icon: BarChart3,
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
    border: 'border-cyan-200',
    title: 'ATS Score Analysis',
    step: '05',
    desc: 'After generation, get your ATS compatibility score across 6 dimensions — keyword match, formatting, readability, grammar, skills coverage and experience relevance.',
    bullets: [
      'Overall ATS score out of 100',
      'Category-level breakdown with improvement tips',
      'Missing keywords highlighted with suggestions',
    ],
  },
  {
    icon: BookOpen,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    title: 'Interview Strategy Prep',
    step: '06',
    desc: 'Step 3 generates a complete interview kit — HR questions, technical Q&A, STAR method answers, self-introduction script and company research notes.',
    bullets: [
      'Role-specific HR & technical questions with model answers',
      'STAR format behavioral answer templates',
      'Self-introduction script tailored to the job',
    ],
  },
  {
    icon: Download,
    color: 'text-slate-700',
    bg: 'bg-slate-100',
    border: 'border-slate-300',
    title: 'Download in Multiple Formats',
    step: '07',
    desc: 'Export your finished resume as a pixel-perfect PDF or a fully editable DOCX file. Both formats preserve the exact layout and typography.',
    bullets: [
      'PDF — print-ready, ATS-safe, no layout shifts',
      'DOCX — fully editable in Word or Google Docs',
      'Saved to your dashboard for future access',
    ],
  },
]

const TIPS = [
  { icon: Lightbulb, text: 'Use the full job description — the more detail, the better the keyword match.' },
  { icon: Zap, text: 'Generate a new resume for every application. Tailoring = 3× higher callback rate.' },
  { icon: Star, text: 'Regenerate the summary if the first attempt doesn\'t feel right — it\'s instant.' },
  { icon: FileCheck, text: 'Aim for an ATS score above 88 before submitting your resume.' },
]

export function HowToGuideModal({ open, onClose }: GuideModalProps) {
  const [tab, setTab] = useState<'guide' | 'tips'>('guide')

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="How to generate your resume"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[88vh] flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 px-6 pt-6 pb-5 shrink-0">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
          />
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-[11px] font-extrabold text-emerald-400 uppercase tracking-widest">AI Resume Suite</span>
              </div>
              <h2 className="text-[22px] font-black text-white leading-tight mb-1">How to Generate Your Resume</h2>
              <p className="text-[13px] text-slate-300 font-medium">Complete guide — from setup to download in under 3 minutes.</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-all shrink-0 mt-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1.5 mt-5 relative z-10">
            {(['guide', 'tips'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  'px-4 py-1.5 rounded-lg text-[12px] font-bold transition-all border',
                  tab === t
                    ? 'bg-white text-slate-900 border-white/80 shadow-sm'
                    : 'bg-white/10 text-slate-300 border-white/10 hover:bg-white/20'
                )}
              >
                {t === 'guide' ? '📋 Step-by-Step Guide' : '💡 Pro Tips'}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-slate-50/50">
          {tab === 'guide' ? (
            FEATURES.map((feat) => {
              const Icon = feat.icon
              return (
                <div
                  key={feat.step}
                  className={cn('bg-white rounded-xl border p-4 flex gap-4 hover:shadow-sm transition-shadow', feat.border)}
                >
                  {/* Step number + icon */}
                  <div className="shrink-0 flex flex-col items-center gap-1.5 pt-0.5">
                    <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center border', feat.bg, feat.border)}>
                      <Icon className={cn('w-5 h-5', feat.color)} />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 tracking-wider">{feat.step}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[14px] font-black text-slate-900 mb-0.5">{feat.title}</h3>
                    <p className="text-[12px] text-slate-500 font-medium leading-relaxed mb-2">{feat.desc}</p>
                    <ul className="space-y-1">
                      {feat.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-[12px] text-slate-700 font-semibold">
                          <CheckCircle2 className={cn('w-3.5 h-3.5 mt-0.5 shrink-0', feat.color)} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4 mb-2">
                <p className="text-[13px] font-bold text-emerald-800">🚀 These tips will maximize your resume quality and ATS score.</p>
              </div>
              {TIPS.map((tip, i) => {
                const Icon = tip.icon
                return (
                  <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 flex items-start gap-3 hover:shadow-sm transition-shadow">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                      <Icon className="w-4.5 h-4.5 text-amber-500" />
                    </div>
                    <p className="text-[13px] text-slate-700 font-semibold leading-relaxed pt-1.5">{tip.text}</p>
                  </div>
                )
              })}
              <div className="bg-slate-900 rounded-xl p-4 mt-2">
                <p className="text-[12px] text-slate-400 font-medium leading-relaxed">
                  💼 <span className="text-white font-bold">C2C Users:</span> Select the C2C resume type and a C2C template. The AI will use vendor-submission language, list the client company and contract duration, and format your environment/tech stack as a separate line per role.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-slate-200 px-5 py-3.5 bg-white flex items-center justify-between gap-3">
          <p className="text-[11.5px] text-slate-400 font-medium">
            ✅ Your profile is pre-loaded. Just paste the JD and click <strong className="text-slate-700">Generate</strong>.
          </p>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 h-9 px-5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-[12px] font-bold rounded-xl shadow-md shadow-emerald-500/25 hover:shadow-lg hover:from-emerald-600 hover:to-teal-700 transition-all"
          >
            Got it — Let's build
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
