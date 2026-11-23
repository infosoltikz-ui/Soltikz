'use client'

import Link from 'next/link'
import {
  CheckCircle2,
  Circle,
  ShieldCheck,
  ArrowRight,
  FilePlus2,
} from 'lucide-react'
import { cn } from '@/utils/cn'

export function ProfileSidebar({
  profile,
  onNavigateTab,
}: {
  profile?: any
  onNavigateTab?: (tab: string) => void
}) {

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
    completion >= 80 ? '#3FA57C' : completion >= 40 ? '#D9A441' : '#78859A'

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
      {/* Profile Strength Gauge Card */}
      <div className="bg-[#151D28] rounded-2xl border border-[#26313F] shadow-xs p-5 hover:border-[#3A495C] transition-colors">
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#26313F]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#1A2330] text-[#3FA57C] border border-[#26313F] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-[13.5px] font-extrabold text-[#E4EAF2]">Profile Health</h3>
          </div>
          <span
            className={cn(
              'text-[11px] font-extrabold px-2.5 py-0.5 rounded-lg border tabular-nums',
              completion >= 80
                ? 'bg-[#123227] text-[#3FA57C] border-[#3FA57C]/30'
                : completion >= 40
                ? 'bg-[#2E2616] text-[#D9A441] border-[#D9A441]/40'
                : 'bg-[#1A2330] text-[#9FACBE] border-[#26313F]'
            )}
          >
            {completion}% Ready
          </span>
        </div>

        {/* Circular SVG Meter */}
        <div className="flex items-center gap-3.5 mb-4 bg-[#1A2330] p-3.5 rounded-xl border border-[#26313F]">
          <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
            <svg className="w-16 h-16 -rotate-90 transform" viewBox="0 0 80 80">
              <circle
                cx="40"
                cy="40"
                r={radius}
                className="stroke-[#26313F]"
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
            <span className="absolute text-[13px] font-black text-[#E4EAF2] tabular-nums">
              {completion}%
            </span>
          </div>

          <div>
            <h4 className="text-[13px] font-extrabold text-[#E4EAF2] leading-tight">
              {completion >= 80 ? 'Strong Foundation' : 'Add Missing Sections'}
            </h4>
            <p className="text-[11.5px] text-[#9FACBE] font-medium mt-1 leading-relaxed">
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
              className="group w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-all hover:bg-[#1A2330] cursor-pointer text-left"
            >
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                {item.done ? (
                  <CheckCircle2 className="w-4 h-4 text-[#3FA57C] shrink-0" strokeWidth={2.5} />
                ) : (
                  <Circle className="w-4 h-4 text-[#78859A] group-hover:text-[#E4EAF2] shrink-0" strokeWidth={2} />
                )}
                <span
                  className={cn(
                    'truncate',
                    item.done
                      ? 'text-[#C3CCD9] font-semibold'
                      : 'text-[#78859A] group-hover:text-[#E4EAF2] font-semibold'
                  )}
                >
                  {item.text}
                </span>
              </div>

              {!item.done && onNavigateTab && (
                <span className="text-[10px] font-extrabold text-[#3FA57C] bg-[#123227] border border-[#3FA57C]/30 px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0">
                  Add
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Next Step Studio CTA */}
      {completion >= 50 && (
        <div className="bg-[#0D131B] border border-[#26313F] rounded-2xl p-5 text-white shadow-md">
          <div className="text-[10.5px] font-extrabold uppercase tracking-wider text-[#D9A441] mb-1">
            Ready to Tailor
          </div>
          <h4 className="text-sm font-extrabold text-[#E4EAF2] leading-snug mb-2">
            Turn this profile into an ATS-matched resume
          </h4>
          <p className="text-xs text-[#9FACBE] font-medium leading-relaxed mb-4">
            Paste any job description and generate a tailored PDF or DOCX in seconds.
          </p>
          <Link
            href="/dashboard/create"
            className="w-full h-9 rounded-xl bg-[#0A6E4E] hover:bg-[#0D8A62] text-white border border-[#3FA57C]/40 text-xs font-extrabold flex items-center justify-center gap-1.5 transition-colors"
          >
            <FilePlus2 className="w-3.5 h-3.5 text-[#D9A441]" />
            <span>Open Resume Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  )
}
