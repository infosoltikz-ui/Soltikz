'use client'

import { FileText, Briefcase, Users, Activity, Download } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { useState, useEffect } from 'react'

export function ResumeStats() {
  const [stats, setStats] = useState({
    totalResumes: 0,
    fullTimeCount: 0,
    c2cCount: 0,
    avgAtsScore: 0,
    totalDownloads: 0,
  })

  useEffect(() => {
    async function fetchStats() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      try {
        let resumes: any[] = []
        const { data, error } = await supabase
          .from('resumes_v2')
          .select('id, resume_type, ats_analyses ( overall_score )')
          .eq('user_id', user.id)

        if (!error && data) {
          resumes = data
        } else {
          // Fallback query
          const { data: rawResumes } = await supabase
            .from('resumes_v2')
            .select('id, resume_type')
            .eq('user_id', user.id)

          if (rawResumes && rawResumes.length > 0) {
            const resumeIds = rawResumes.map(r => r.id)
            const { data: atsList } = await supabase
              .from('ats_analyses')
              .select('resume_id, overall_score')
              .in('resume_id', resumeIds)

            const atsMap: Record<string, number> = {}
            atsList?.forEach(a => {
              if (!atsMap[a.resume_id] || a.overall_score > atsMap[a.resume_id]) {
                atsMap[a.resume_id] = a.overall_score
              }
            })

            resumes = rawResumes.map(r => ({
              ...r,
              ats_analyses: atsMap[r.id] != null ? [{ overall_score: atsMap[r.id] }] : []
            }))
          }
        }

        let totalAts = 0
        let atsCount = 0
        let c2cCount = 0
        let fullTimeCount = 0

        resumes.forEach((r: any) => {
          const isC2C = String(r.resume_type || '').toLowerCase().includes('c2c')
          if (isC2C) c2cCount++
          else fullTimeCount++

          const score = Array.isArray(r.ats_analyses)
            ? r.ats_analyses[0]?.overall_score
            : r.ats_analyses?.overall_score

          if (score != null && score > 0) {
            totalAts += score
            atsCount++
          }
        })

        const resumeIds = resumes.map((r: any) => r.id)
        let totalDownloads = 0
        if (resumeIds.length > 0) {
          const { count } = await supabase
            .from('usage_events')
            .select('id', { count: 'exact', head: true })
            .in('event_type', ['pdf_download', 'docx_download'])
            .in('resume_id', resumeIds)
          totalDownloads = count || 0
        }

        setStats({
          totalResumes: resumes.length,
          fullTimeCount,
          c2cCount,
          avgAtsScore: atsCount > 0 ? Math.round(totalAts / atsCount) : 0,
          totalDownloads,
        })
      } catch (err) {
        console.error('Error fetching resume stats:', err)
      }
    }
    fetchStats()
  }, [])

  const { totalResumes, fullTimeCount, c2cCount, avgAtsScore, totalDownloads } = stats

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      {/* Total Resumes */}
      <div className="bg-[#FAFAF8] rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4" strokeWidth={2.5} />
          </div>
          <span className="text-[13px] font-bold text-slate-500">Total Resumes</span>
        </div>
        <div className="text-3xl font-black text-slate-900 tracking-tight">{totalResumes}</div>
      </div>

      {/* Full-Time Resumes */}
      <div className="bg-[#FAFAF8] rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Briefcase className="w-4 h-4" strokeWidth={2.5} />
          </div>
          <span className="text-[13px] font-bold text-slate-500">Full-Time</span>
        </div>
        <div className="text-3xl font-black text-slate-900 tracking-tight">{fullTimeCount}</div>
      </div>

      {/* C2C Resumes */}
      <div className="bg-[#FAFAF8] rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0">
            <Users className="w-4 h-4" strokeWidth={2.5} />
          </div>
          <span className="text-[13px] font-bold text-slate-500">C2C Resumes</span>
        </div>
        <div className="text-3xl font-black text-slate-900 tracking-tight">{c2cCount}</div>
      </div>

      {/* Downloads */}
      <div className="bg-[#FAFAF8] rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
            <Download className="w-4 h-4" strokeWidth={2.5} />
          </div>
          <span className="text-[13px] font-bold text-slate-500">Downloads</span>
        </div>
        <div className="text-3xl font-black text-slate-900 tracking-tight">{totalDownloads}</div>
      </div>

      {/* Average ATS Score */}
      <div className="bg-[#FAFAF8] rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
        <div className="flex flex-col h-full justify-between">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
              <Activity className="w-4 h-4" strokeWidth={2.5} />
            </div>
            <span className="text-[13px] font-bold text-slate-500">Avg. ATS Score</span>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">{avgAtsScore}%</div>
        </div>

        {/* Circular Progress */}
        <div className="relative w-16 h-16 shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-slate-200"
              strokeWidth="3"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-primary"
              strokeDasharray={`${avgAtsScore}, 100`}
              strokeWidth="3"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
        </div>
      </div>

    </div>
  )
}
