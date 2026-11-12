'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import {
  CheckCircle2,
  Circle,
  Loader2,
  UploadCloud,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  FilePlus2,
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import { cn } from '@/utils/cn'

export function ProfileSidebar({
  profile,
  onImport,
  onNavigateTab,
}: {
  profile?: any
  onImport?: (parsedData: any) => void
  onNavigateTab?: (tab: string) => void
}) {
  const [isImporting, setIsImporting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return

    setIsImporting(true)
    const toastId = toast.loading('Parsing LinkedIn PDF profile...')
    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/ai/parse-linkedin-pdf', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || 'Failed to parse LinkedIn PDF')

      onImport?.(data.parsed_data)
      toast.success('LinkedIn profile imported - please review and save each section.', {
        id: toastId,
      })
    } catch (error: any) {
      toast.error(error.message || 'Failed to import LinkedIn profile', { id: toastId })
    } finally {
      setIsImporting(false)
    }
  }

  const masterData = profile?.master_resume_data || {}
  const personalInfo = masterData?.personal_info || {}

  const email = profile?.email || personalInfo?.email || null
  const phone = profile?.phone || personalInfo?.phone || null

  const totalPoints = 6

  const hasPersonalDetails = !!(
    (profile?.full_name || personalInfo?.firstName) &&
    email &&
    phone
  )
  const hasExperience =
    masterData?.employment?.length > 0 || masterData?.experience?.length > 0
  const hasEducation = masterData?.education?.length > 0
  const hasProjects = masterData?.projects?.length > 0
  const hasCertifications = masterData?.certifications?.length > 0
  const hasSkills = masterData?.skills?.length > 0

  const completedPoints = [
    hasPersonalDetails,
    hasExperience,
    hasEducation,
    hasProjects,
    hasCertifications,
    hasSkills,
  ].filter(Boolean).length

  const completion = Math.round((completedPoints / totalPoints) * 100)

  const radius = 32
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (completion / 100) * circumference
  const strokeColor =
    completion >= 80 ? '#059669' : completion >= 40 ? '#F59E0B' : '#0F2744'

  const checklist = [
    { text: 'Personal & Contact Info', done: hasPersonalDetails, tab: 'personal' },
    { text: 'Work Experience History', done: hasExperience, tab: 'employment' },
    { text: 'Academic Education', done: hasEducation, tab: 'education' },
    { text: 'Projects & Portfolio', done: hasProjects, tab: 'projects' },
    { text: 'Certifications & Licenses', done: hasCertifications, tab: 'certifications' },
    { text: 'Technical Skills & Tools', done: hasSkills, tab: 'skills' },
  ]

  return (
    <div className="space-y-4 lg:sticky lg:top-6">
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handleFileSelected}
      />

      {/* Profile Strength Gauge Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 hover:border-slate-300 transition-colors">
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#EEF4FA] text-[#0F2744] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-[13.5px] font-extrabold text-slate-900">Profile Health</h3>
          </div>
          <span
            className={cn(
              'text-[11px] font-extrabold px-2.5 py-0.5 rounded-lg border tabular-nums',
              completion >= 80
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : completion >= 40
                ? 'bg-amber-50 text-amber-800 border-amber-200'
                : 'bg-slate-100 text-slate-600 border-slate-200'
            )}
          >
            {completion}% Ready
          </span>
        </div>

        {/* Circular SVG Meter */}
        <div className="flex items-center gap-3.5 mb-4 bg-slate-50/90 p-3.5 rounded-xl border border-slate-200/70">
          <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
            <svg className="w-16 h-16 -rotate-90 transform" viewBox="0 0 80 80">
              <circle
                cx="40"
                cy="40"
                r={radius}
                className="stroke-slate-200"
                strokeWidth="6"
                fill="transparent"
              />
              <circle
                cx="40"
                cy="40"
                r={radius}
                stroke={strokeColor}
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <span className="absolute text-[13px] font-black text-slate-900 tabular-nums">
              {completion}%
            </span>
          </div>

          <div>
            <h4 className="text-[13px] font-extrabold text-slate-900 leading-tight">
              {completion >= 80 ? 'Strong Foundation' : 'Add Missing Sections'}
            </h4>
            <p className="text-[11.5px] text-slate-500 font-medium mt-1 leading-relaxed">
              {completion >= 80
                ? 'Optimal data density for 90+ ATS tailoring.'
                : 'Click any item below to jump straight to that tab.'}
            </p>
          </div>
        </div>

        {/* Interactive Checklist */}
        <div className="space-y-1">
          {checklist.map((item, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => onNavigateTab?.(item.tab)}
              className="group w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-all hover:bg-[#EEF4FA] cursor-pointer text-left"
            >
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                {item.done ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" strokeWidth={2.5} />
                ) : (
                  <Circle className="w-4 h-4 text-slate-300 group-hover:text-[#0F2744] shrink-0" strokeWidth={2} />
                )}
                <span
                  className={cn(
                    'truncate',
                    item.done
                      ? 'text-slate-700 font-semibold'
                      : 'text-slate-500 group-hover:text-[#0F2744] font-semibold'
                  )}
                >
                  {item.text}
                </span>
              </div>

              {!item.done && onNavigateTab && (
                <span className="text-[10px] font-extrabold text-[#0F2744] bg-white border border-[#0F2744]/15 px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0">
                  Add
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* LinkedIn PDF Quick Import Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 hover:border-slate-300 transition-colors">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="text-[13.5px] font-extrabold text-slate-900">
            LinkedIn PDF Import
          </h3>
        </div>

        <p className="text-xs font-medium text-slate-500 mb-3.5 leading-relaxed">
          Export your LinkedIn profile as PDF (Resources &gt; Save to PDF) and drop it here to auto-fill work &amp; education.
        </p>

        <button
          type="button"
          disabled={isImporting}
          onClick={() => fileInputRef.current?.click()}
          className="w-full h-10 text-xs font-extrabold border border-[#0F2744]/20 bg-[#EEF4FA] hover:bg-[#0F2744] text-[#0F2744] hover:text-white rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60 shadow-2xs"
        >
          {isImporting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Parsing PDF...</span>
            </>
          ) : (
            <>
              <UploadCloud className="w-4 h-4" />
              <span>Upload LinkedIn PDF</span>
            </>
          )}
        </button>
      </div>

      {/* Next Step Studio CTA */}
      {completion >= 50 && (
        <div className="bg-[#0F2744] rounded-2xl p-5 text-white shadow-md">
          <div className="text-[10.5px] font-extrabold uppercase tracking-wider text-[#F59E0B] mb-1">
            Ready to Tailor
          </div>
          <h4 className="text-sm font-extrabold leading-snug mb-2">
            Turn this profile into an ATS-matched resume
          </h4>
          <p className="text-xs text-slate-300 font-medium leading-relaxed mb-4">
            Paste any job description and generate a tailored PDF or DOCX in seconds.
          </p>
          <Link
            href="/dashboard/create"
            className="w-full h-9 rounded-xl bg-[#F59E0B] hover:bg-amber-400 text-slate-950 text-xs font-extrabold flex items-center justify-center gap-1.5 transition-colors"
          >
            <FilePlus2 className="w-3.5 h-3.5" />
            <span>Open Resume Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  )
}
