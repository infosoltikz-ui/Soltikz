'use client'

import React, { useState } from 'react'
import { Briefcase, Building2, Plus, ExternalLink, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { cn } from '@/utils/cn'

interface ApplicationTrackerWidgetProps {
  resumes: any[]
}

type AppStatus = 'Ready to Apply' | 'Applied' | 'Interviewing' | 'Offer'

const STATUS_BADGE_MAP: Record<AppStatus, string> = {
  'Ready to Apply': 'bg-[#EEF4FA] text-[#0F2744] border-[#0F2744]/20',
  Applied: 'bg-amber-50 text-amber-800 border-amber-200',
  Interviewing: 'bg-sky-50 text-sky-800 border-sky-200',
  Offer: 'bg-emerald-50 text-emerald-800 border-emerald-200',
}

export function ApplicationTrackerWidget({ resumes }: ApplicationTrackerWidgetProps) {
  const [statuses, setStatuses] = useState<Record<string, AppStatus>>({})

  const handleStatusChange = (id: string, newStatus: AppStatus) => {
    setStatuses((prev) => ({ ...prev, [id]: newStatus }))
  }

  const applications = resumes.slice(0, 4).map((r) => {
    const jd = Array.isArray(r.parsed_job_descriptions)
      ? r.parsed_job_descriptions[0]
      : r.parsed_job_descriptions
    let company = jd?.company_name || ''
    if (
      !company ||
      company.toLowerCase().includes('unknown') ||
      company === 'N/A' ||
      company === 'Draft'
    ) {
      if (r.title) {
        const parts = r.title.split('-').map((s: string) => s.trim())
        if (parts.length > 1) {
          company = parts.slice(1).join(' - ').trim()
        }
      }
    }
    if (!company || company.toLowerCase().includes('unknown')) {
      company = 'Direct Employer'
    }
    const role =
      jd?.job_title ||
      r.title
        ?.replace(/Resume/i, '')
        .replace(/Full Time/i, '')
        .replace(/Contract/i, '')
        .replace(/[-–@]/g, '')
        .trim() ||
      'Senior Software Engineer'
    const atsScore = r.ats_analyses?.[0]?.overall_score || null
    const currentStatus: AppStatus = statuses[r.id] || 'Ready to Apply'

    let timeLabel = 'Recently'
    try {
      if (r.updated_at) {
        timeLabel = formatDistanceToNow(new Date(r.updated_at), { addSuffix: true })
      }
    } catch {
      timeLabel = 'Recently'
    }

    return {
      id: r.id,
      company,
      initial: company.charAt(0).toUpperCase() || 'E',
      role,
      atsScore,
      status: currentStatus,
      timeLabel,
    }
  })

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 flex flex-col justify-between hover:border-slate-300 transition-all duration-200">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#EEF4FA] border border-[#0F2744]/10 text-[#0F2744] flex items-center justify-center">
              <Briefcase className="w-4 h-4" strokeWidth={2.2} />
            </div>
            <div>
              <h3 className="text-[15px] font-extrabold text-slate-900">
                Application Pipeline
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Track active applications & target employers
              </p>
            </div>
          </div>

          <Link href="/dashboard/create">
            <button className="text-xs font-bold text-[#0F2744] hover:bg-[#0F2744] hover:text-white inline-flex items-center gap-1 border border-[#0F2744]/20 bg-[#EEF4FA] px-3 py-1.5 rounded-xl transition-all cursor-pointer">
              <Plus className="w-3.5 h-3.5" />
              <span>Target JD</span>
            </button>
          </Link>
        </div>

        {/* Content */}
        {applications.length === 0 ? (
          <div className="py-10 text-center flex flex-col items-center justify-center">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center mb-3">
              <Building2 className="w-6 h-6 text-slate-400" strokeWidth={1.8} />
            </div>
            <p className="text-sm font-extrabold text-slate-900">
              No active applications tracked yet
            </p>
            <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1 leading-relaxed font-medium">
              Paste a job description when creating a resume to track company status and match scores automatically.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {applications.map((app) => (
              <div
                key={app.id}
                className="group p-3.5 rounded-xl border border-slate-200/75 bg-slate-50/40 hover:bg-white hover:border-[#0F2744]/25 hover:shadow-md hover:shadow-slate-900/[0.03] transition-all duration-200 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/90 text-[#0F2744] font-black text-xs flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-[#0F2744] group-hover:text-[#F59E0B] transition-colors">
                    {app.initial}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="font-extrabold text-[13.5px] text-slate-900 truncate max-w-[160px] sm:max-w-[200px]">
                        {app.company}
                      </span>
                      {app.atsScore ? (
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold px-1.5 py-0.5 rounded-md tabular-nums shrink-0">
                          {app.atsScore}% Match
                        </span>
                      ) : null}
                    </div>

                    <div className="flex items-center gap-1.5 text-[11.5px] text-slate-500 font-medium">
                      <span className="truncate text-slate-700 font-semibold">{app.role}</span>
                      <span className="text-slate-300">·</span>
                      <span className="shrink-0 text-slate-400">{app.timeLabel}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <select
                    value={app.status}
                    onChange={(e) => handleStatusChange(app.id, e.target.value as AppStatus)}
                    className={cn(
                      'text-[11px] font-bold rounded-lg border px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#0F2744]/20 cursor-pointer transition-colors',
                      STATUS_BADGE_MAP[app.status] || 'bg-white border-slate-200 text-slate-700'
                    )}
                  >
                    <option value="Ready to Apply">Ready to Apply</option>
                    <option value="Applied">Applied</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Offer">Offer</option>
                  </select>

                  <Link href={`/dashboard/create?id=${app.id}`}>
                    <button
                      title="Open Tailored Resume"
                      className="p-2 text-slate-400 hover:text-[#0F2744] hover:bg-[#EEF4FA] rounded-xl transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-medium text-slate-500">
        <span>
          Active roles: <strong className="text-slate-900 tabular-nums">{applications.length}</strong>
        </span>
        <Link
          href="/dashboard/resumes"
          className="group text-[#0F2744] hover:text-amber-700 font-extrabold inline-flex items-center gap-1 transition-colors"
        >
          <span>View library</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  )
}
