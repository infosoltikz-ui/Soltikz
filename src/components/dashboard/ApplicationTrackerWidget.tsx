'use client'

import React, { useState } from 'react'
import { Briefcase, Building2, Calendar, CheckCircle2, ChevronRight, Clock, Plus, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

interface ApplicationTrackerWidgetProps {
  resumes: any[]
}

type AppStatus = 'Ready to Apply' | 'Applied' | 'Interviewing' | 'Offer'

export function ApplicationTrackerWidget({ resumes }: ApplicationTrackerWidgetProps) {
  // Local status state so user can interactively toggle status per resume
  const [statuses, setStatuses] = useState<Record<string, AppStatus>>({})

  const handleStatusChange = (id: string, newStatus: AppStatus) => {
    setStatuses(prev => ({ ...prev, [id]: newStatus }))
  }

  // Filter resumes that have job description targets or titles
  const applications = resumes.slice(0, 4).map(r => {
    const jd = Array.isArray(r.parsed_job_descriptions) ? r.parsed_job_descriptions[0] : r.parsed_job_descriptions
    let company = jd?.company_name || ''
    if (!company || company.toLowerCase().includes('unknown') || company === 'N/A' || company === 'Draft') {
      if (r.title) {
        const parts = r.title.split('-').map((s: string) => s.trim())
        if (parts.length > 1) {
          company = parts.slice(1).join(' - ').trim()
        }
      }
    }
    if (!company || company.toLowerCase().includes('unknown')) company = 'Direct Employer'
    const role = jd?.job_title || r.title?.replace(/Resume/i, '').replace(/Full Time/i, '').replace(/Contract/i, '').replace(/[-–@]/g, '').trim() || 'Senior Software Engineer'
    const atsScore = r.ats_analyses?.[0]?.overall_score || null
    const currentStatus: AppStatus = statuses[r.id] || (atsScore && atsScore >= 85 ? 'Ready to Apply' : 'Tailored') as AppStatus

    let timeLabel = 'Recently'
    try {
      if (r.updated_at) {
        timeLabel = formatDistanceToNow(new Date(r.updated_at), { addSuffix: true })
      }
    } catch (e) {
      timeLabel = 'Recently'
    }

    return {
      id: r.id,
      company,
      role,
      atsScore,
      status: currentStatus,
      timeLabel,
      resumeType: r.resume_type === 'C2C' ? 'C2C' : 'Full-Time'
    }
  })

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between hover:border-slate-300 transition-colors">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-blue-50 text-blue-700 flex items-center justify-center">
              <Briefcase className="w-3.5 h-3.5" strokeWidth={2.2} />
            </div>
            <div>
              <h3 className="text-[14px] font-bold text-slate-900">Application Pipeline</h3>
              <p className="text-[11px] text-slate-500 font-medium">Track your job applications and target roles</p>
            </div>
          </div>
          <Link href="/dashboard/create">
            <button className="text-[12px] font-semibold text-primary hover:text-primary-dark inline-flex items-center gap-1 border border-primary/20 hover:border-primary/40 bg-primary/5 px-2.5 py-1 rounded-md transition-colors">
              <Plus className="w-3 h-3" /> Target New JD
            </button>
          </Link>
        </div>

        {/* Content */}
        {applications.length === 0 ? (
          <div className="py-8 text-center">
            <Building2 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-[13px] font-semibold text-slate-700">No active applications yet</p>
            <p className="text-[11px] text-slate-500 max-w-xs mx-auto mt-0.5">
              Paste a job description when generating a resume to automatically track your target application here.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {applications.map((app) => (
              <div 
                key={app.id}
                className="p-3 rounded-lg border border-slate-200/80 bg-slate-50/40 hover:bg-slate-50/80 transition-colors flex items-center justify-between gap-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-bold text-[13px] text-slate-900 truncate">
                      {app.company}
                    </span>
                    {app.atsScore ? (
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-1.5 py-0.2 rounded shrink-0">
                        {app.atsScore}% Match
                      </span>
                    ) : null}
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                    <span className="truncate text-slate-700 font-semibold">{app.role}</span>
                    <span>•</span>
                    <span className="shrink-0">{app.timeLabel}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Status Dropdown / Badge */}
                  <select
                    value={app.status}
                    onChange={(e) => handleStatusChange(app.id, e.target.value as AppStatus)}
                    className="text-[11px] font-semibold rounded border border-slate-200 bg-white px-2 py-1 text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                  >
                    <option value="Ready to Apply">Ready to Apply</option>
                    <option value="Applied">Applied</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Offer">Offer</option>
                  </select>

                  <Link href={`/dashboard/create?id=${app.id}`}>
                    <button 
                      title="Open Tailored Resume"
                      className="p-1 text-slate-400 hover:text-primary transition-colors"
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

      <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between text-[11px] text-slate-500 font-medium">
        <span>Active tracked roles: <strong className="text-slate-800">{applications.length}</strong></span>
        <Link href="/dashboard/resumes" className="text-primary hover:text-primary-dark font-semibold">
          View all in library →
        </Link>
      </div>
    </div>
  )
}
