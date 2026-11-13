'use client'

import { useState } from 'react'
import { Building2, Briefcase, FileText, ArrowRight, Check, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

export interface Step2Draft {
  company: string
  role: string
  jd: string
}

interface CompanyDetailsSectionProps {
  onGenerate?: (company: string, role: string, jd: string) => void
  onDraftChange?: (draft: Step2Draft) => void
}

export function CompanyDetailsSection({
  onGenerate,
  onDraftChange,
}: CompanyDetailsSectionProps) {
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [jd, setJd] = useState('')

  const emitDraft = (nextCompany: string, nextRole: string, nextJd: string) => {
    onDraftChange?.({ company: nextCompany, role: nextRole, jd: nextJd })
  }

  const updateCompany = (val: string) => {
    setCompany(val)
    emitDraft(val, role, jd)
  }

  const updateRole = (val: string) => {
    setRole(val)
    emitDraft(company, val, jd)
  }

  const updateJd = (val: string) => {
    setJd(val)
    emitDraft(company, role, val)
  }

  const applySample = (nextCompany: string, nextRole: string, nextJd: string) => {
    setCompany(nextCompany)
    setRole(nextRole)
    setJd(nextJd)
    emitDraft(nextCompany, nextRole, nextJd)
  }

  const handleFillUnrelated = () => {
    applySample(
      'Global Logistics Corp',
      'HR Manager',
      'We are seeking an HR Manager to oversee our employee relations, benefits administration, and talent acquisition. You must have 7+ years of HR experience, SHRM certification, and expertise in resolving workplace conflicts. Technical programming skills are not required. You will be responsible for onboarding, performance reviews, and compliance with labor laws.'
    )
  }

  const handleFillPartial = () => {
    applySample(
      'FinTech Solutions',
      'Full Stack Developer',
      'Looking for a Full Stack Developer to build banking platforms. Required: 3+ years in React.js, Node.js, and AWS. Preferred: Python, Docker, Kubernetes, and PostgreSQL. You will design REST APIs and create responsive UIs for mobile and web. Financial domain experience is a big plus.'
    )
  }

  const handleFillPerfect = () => {
    applySample(
      'Tech Innovators Inc.',
      'Senior Frontend Engineer',
      'We are looking for an experienced Senior Frontend Engineer to join our core product team. You will be responsible for building responsive, high-performance web applications using React, Next.js, and Tailwind CSS. The ideal candidate has 5+ years of experience in modern JavaScript, a strong understanding of web performance optimization, and experience collaborating with design and backend teams. You should have a proven track record of shipping complex user interfaces and mentoring junior developers.'
    )
  }

  const completedSteps = [
    company.trim().length > 0,
    role.trim().length > 0,
    jd.trim().length >= 30,
  ].filter(Boolean).length
  const readinessPercent = Math.round((completedSteps / 3) * 100)
  const isFormReady = Boolean(company.trim() && role.trim() && jd.trim())

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all duration-300 hover:shadow-md">
      {/* Live Top Readiness Progress Line */}
      <div className="h-1 w-full bg-slate-100 overflow-hidden">
        <div
          className={cn(
            'h-full transition-all duration-500 ease-out',
            completedSteps === 3
              ? 'bg-emerald-600'
              : 'bg-gradient-to-r from-[#0F2744] to-[#F59E0B]'
          )}
          style={{ width: `${readinessPercent}%` }}
        />
      </div>

      <div className="p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
              Target Job Details
            </h2>
            <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5">
              Watch your tailoring blueprint update live on the right as you type.
            </p>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap shrink-0">
            <span className="text-[11px] font-medium text-slate-400 mr-1">Samples:</span>
            <button
              type="button"
              onClick={handleFillUnrelated}
              className="h-7 px-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-[11px] font-semibold text-slate-600 transition-all active:scale-95 cursor-pointer"
            >
              HR Role
            </button>
            <button
              type="button"
              onClick={handleFillPartial}
              className="h-7 px-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-[11px] font-semibold text-slate-600 transition-all active:scale-95 cursor-pointer"
            >
              Full Stack
            </button>
            <button
              type="button"
              onClick={handleFillPerfect}
              className="h-7 px-2.5 rounded-lg border border-[#0F2744]/20 bg-[#EEF4FA]/60 hover:bg-[#EEF4FA] text-[11px] font-semibold text-[#0F2744] transition-all active:scale-95 cursor-pointer"
            >
              Frontend
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="flex items-center gap-1.5 text-[12.5px] font-semibold text-slate-700">
                  <Building2 className="w-3.5 h-3.5 text-[#0F2744]" />
                  <span>Company Name</span>
                </label>
                {company.trim() && (
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 animate-in zoom-in-75 duration-200">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                )}
              </div>
              <input
                type="text"
                value={company}
                onChange={(e) => updateCompany(e.target.value)}
                placeholder="e.g., Google, Amazon, Acme Corp"
                className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-[#F8FAFC]/70 focus:bg-white focus:outline-none focus:border-[#0F2744] focus:ring-3 focus:ring-[#0F2744]/10 text-[13.5px] font-medium text-slate-900 placeholder:text-slate-400 transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="flex items-center gap-1.5 text-[12.5px] font-semibold text-slate-700">
                  <Briefcase className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Job Title</span>
                </label>
                {role.trim() && (
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 animate-in zoom-in-75 duration-200">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                )}
              </div>
              <input
                type="text"
                value={role}
                onChange={(e) => updateRole(e.target.value)}
                placeholder="e.g., Senior Full Stack Engineer"
                className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-[#F8FAFC]/70 focus:bg-white focus:outline-none focus:border-[#0F2744] focus:ring-3 focus:ring-[#0F2744]/10 text-[13.5px] font-medium text-slate-900 placeholder:text-slate-400 transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="flex items-center gap-1.5 text-[12.5px] font-semibold text-slate-700">
                <FileText className="w-3.5 h-3.5 text-[#0F2744]" />
                <span>Job Description</span>
              </label>
              <div className="flex items-center gap-2">
                {jd.trim().length >= 30 && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full animate-in fade-in duration-200">
                    <Check className="w-3 h-3 stroke-[2.75]" /> Ready
                  </span>
                )}
                <span className="text-[11px] font-medium text-slate-400 tabular-nums">
                  {jd ? `${jd.length} chars` : 'Required'}
                </span>
              </div>
            </div>
            <textarea
              rows={7}
              value={jd}
              onChange={(e) => updateJd(e.target.value)}
              placeholder="Paste the complete job posting text here."
              className="w-full p-3.5 rounded-xl border border-slate-200 bg-[#F8FAFC]/70 focus:bg-white focus:outline-none focus:border-[#0F2744] focus:ring-3 focus:ring-[#0F2744]/10 text-[13.5px] text-slate-900 placeholder:text-slate-400 leading-relaxed resize-y transition-all"
            />
          </div>
        </div>

        {/* Footer & Submit */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            Tailored strictly from your Master Profile experience.
          </p>

          <Button
            onClick={() => onGenerate && isFormReady && onGenerate(company, role, jd)}
            disabled={!isFormReady}
            className={cn(
              'group relative overflow-hidden h-11 px-6 rounded-xl text-[13.5px] font-bold flex items-center justify-center gap-2 transition-all duration-200 shrink-0 cursor-pointer',
              isFormReady
                ? 'bg-[#0F2744] hover:bg-[#0A1C33] text-white shadow-sm hover:shadow-md hover:-translate-y-0.5'
                : 'bg-slate-100 text-slate-400 pointer-events-none'
            )}
          >
            {isFormReady && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:animate-[shimmer-beam_1.1s_ease-out]"
              />
            )}
            <Sparkles className={cn('w-4 h-4 relative z-10', isFormReady ? 'text-[#F59E0B]' : 'text-slate-400')} />
            <span className="relative z-10">Generate Tailored Resume</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  )
}
