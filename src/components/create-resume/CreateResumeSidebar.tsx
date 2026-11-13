'use client'

import { useMemo } from 'react'
import { Briefcase, Building2, Check, FileCheck2, Gauge, Layers, Sparkles } from 'lucide-react'
import { cn } from '@/utils/cn'

const KNOWN_SKILLS = [
  'React',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'Python',
  'Java',
  'Go',
  'AWS',
  'Azure',
  'GCP',
  'Docker',
  'Kubernetes',
  'PostgreSQL',
  'SQL',
  'GraphQL',
  'REST',
  'Tailwind',
  'Microservices',
  'CI/CD',
  'Agile',
  'SHRM',
  'Onboarding',
  'Compliance',
  'Payroll',
  'Employee Relations',
]

interface CreateResumeSidebarProps {
  company?: string
  role?: string
  jd?: string
  resumeType?: 'fulltime' | 'c2c'
  templateName?: string
  roleCount?: number
}

export function CreateResumeSidebar({
  company = '',
  role = '',
  jd = '',
  resumeType = 'fulltime',
  templateName = 'Modern',
  roleCount = 0,
}: CreateResumeSidebarProps) {
  const hasCompany = company.trim().length > 0
  const hasRole = role.trim().length > 0
  const hasJd = jd.trim().length >= 30

  const completedSteps = [hasCompany, hasRole, hasJd].filter(Boolean).length
  const readiness = Math.round((completedSteps / 3) * 100)

  const extractedKeywords = useMemo(() => {
    if (!jd.trim()) return []
    const lower = jd.toLowerCase()
    const matched = KNOWN_SKILLS.filter((kw) => lower.includes(kw.toLowerCase()))
    return matched.slice(0, 6)
  }, [jd])

  const radius = 20
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (readiness / 100) * circumference

  return (
    <div className="space-y-4">
      {/* Live Tailoring Blueprint Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 transition-all duration-300 hover:shadow-md">
        <div className="flex items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'w-2 h-2 rounded-full transition-colors duration-300',
                  completedSteps === 3 ? 'bg-emerald-500' : 'bg-[#F59E0B]'
                )}
              />
              <h3 className="text-[15px] font-extrabold text-slate-900 tracking-tight">
                Live Tailoring Blueprint
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {completedSteps === 3
                ? 'All signals locked. Ready to build.'
                : `${completedSteps} of 3 target signals ready`}
            </p>
          </div>

          {/* Animated SVG Readiness Gauge */}
          <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
              <circle
                cx="24"
                cy="24"
                r={radius}
                stroke="#E2E8F0"
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="24"
                cy="24"
                r={radius}
                stroke={completedSteps === 3 ? '#059669' : '#0F2744'}
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-500 ease-out"
              />
            </svg>
            <span className="absolute text-[11px] font-extrabold text-slate-900 tabular-nums">
              {readiness}%
            </span>
          </div>
        </div>

        {/* Layered Interactive Target Document Preview */}
        <div className="relative group/card perspective-[900px]">
          {/* Subtle offset back sheet for tactile paper depth */}
          <div
            aria-hidden="true"
            className="absolute inset-x-2 -bottom-1.5 h-full rounded-xl bg-slate-100/90 border border-slate-200/70 transition-transform duration-300 group-hover/card:translate-y-0.5"
          />

          <div className="relative rounded-xl border border-slate-200 bg-[#F8FAFC] p-4 space-y-3.5 transition-transform duration-300 group-hover/card:-translate-y-0.5">
            {/* Layer 1: Target Company & Role */}
            <div
              className={cn(
                'rounded-xl border p-3 transition-all duration-300',
                hasCompany || hasRole
                  ? 'bg-white border-[#0F2744]/20 shadow-2xs'
                  : 'bg-white/60 border-dashed border-slate-200'
              )}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
                  Target Header
                </span>
                {hasCompany && hasRole && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md animate-in fade-in duration-200">
                    <Check className="w-2.5 h-2.5 stroke-[3]" /> Matched
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-[13px] font-bold text-slate-900 truncate">
                <Briefcase
                  className={cn(
                    'w-3.5 h-3.5 shrink-0 transition-colors',
                    hasRole ? 'text-[#D97706]' : 'text-slate-300'
                  )}
                />
                <span className={cn('truncate', !hasRole && 'text-slate-400 font-medium')}>
                  {hasRole ? role : 'Waiting for job title...'}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-600 mt-1 truncate">
                <Building2
                  className={cn(
                    'w-3.5 h-3.5 shrink-0 transition-colors',
                    hasCompany ? 'text-[#0F2744]' : 'text-slate-300'
                  )}
                />
                <span className={cn('truncate', !hasCompany && 'text-slate-400')}>
                  {hasCompany ? company : 'Waiting for company name...'}
                </span>
              </div>
            </div>

            {/* Layer 2: Live JD Keyword Signals */}
            <div
              className={cn(
                'rounded-xl border p-3 transition-all duration-300',
                hasJd
                  ? 'bg-white border-emerald-200/90 shadow-2xs'
                  : 'bg-white/60 border-dashed border-slate-200'
              )}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
                  Detected JD Keywords
                </span>
                <span className="text-[10.5px] font-semibold text-slate-400 tabular-nums">
                  {extractedKeywords.length > 0 ? `${extractedKeywords.length} signals` : 'Live scan'}
                </span>
              </div>

              {extractedKeywords.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {extractedKeywords.map((kw, index) => (
                    <span
                      key={kw}
                      style={{ animationDelay: `${index * 45}ms` }}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#EEF4FA] text-[#0F2744] border border-[#0F2744]/15 text-[11px] font-semibold animate-in fade-in zoom-in-95 duration-200 fill-mode-both"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#F59E0B]" />
                      {kw}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 leading-relaxed">
                  {jd.trim().length > 0
                    ? 'Paste a few more lines of responsibilities to surface role keywords.'
                    : 'Skills and tools from the job description will appear here automatically.'}
                </p>
              )}
            </div>

            {/* Layer 3: Active Architecture Config */}
            <div className="rounded-xl border border-slate-200/80 bg-white p-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-[#0F2744] text-[#F59E0B] flex items-center justify-center shrink-0">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">
                    {templateName} Layout
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">
                    {resumeType === 'c2c' ? 'C2C Contract Format' : 'Full-Time Corporate'}
                  </p>
                </div>
              </div>

              {roleCount > 0 && (
                <span className="text-[10.5px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md shrink-0 tabular-nums">
                  {roleCount} roles synced
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Included Deliverables Summary */}
      <div className="bg-slate-50/90 rounded-2xl border border-slate-200/90 p-4 space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
          <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
          <span>Included After Generation</span>
        </div>
        <div className="grid grid-cols-1 gap-2 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-3.5 h-3.5 text-[#0F2744] shrink-0" />
            <span>Tailored Resume in PDF &amp; editable Word (.docx)</span>
          </div>
          <div className="flex items-center gap-2">
            <Gauge className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span>ATS Keyword Score Breakdown &amp; Cover Letter</span>
          </div>
        </div>
      </div>
    </div>
  )
}
