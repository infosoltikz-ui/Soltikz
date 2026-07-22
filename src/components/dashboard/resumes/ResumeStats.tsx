'use client'

import { FileText, Briefcase, Users, Download, Activity } from 'lucide-react'
import { cn } from '@/utils/cn'
import { createClient } from '@/utils/supabase/client'
import { useState, useEffect } from 'react'

export function ResumeStats() {
  const [stats, setStats] = useState({
    totalResumes: 0,
    fullTimeCount: 0,
    c2cCount: 0,
    avgAtsScore: 0,
    totalDownloads: 0
  })

  useEffect(() => {
    async function fetchStats() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        const { data: resumes } = await supabase
          .from('resumes')
          .select('title, ats_score')
          .eq('user_id', user.id)
          
        if (resumes && resumes.length > 0) {
          let totalAts = 0
          let atsCount = 0
          let c2cCount = 0
          let fullTimeCount = 0
          
          resumes.forEach(r => {
            const title = (r.title || '').toLowerCase()
            if (title.includes('c2c') || title.includes('contract')) {
              c2cCount++
            } else {
              fullTimeCount++
            }
            
            if (r.ats_score != null && r.ats_score > 0) {
              totalAts += r.ats_score
              atsCount++
            }
          })
          
          setStats({
            totalResumes: resumes.length,
            fullTimeCount,
            c2cCount,
            avgAtsScore: atsCount > 0 ? Math.round(totalAts / atsCount) : 0,
            totalDownloads: 0 // Feature pending
          })
        }
      }
    }
    fetchStats()
  }, [])

  const { totalResumes, fullTimeCount, c2cCount, avgAtsScore, totalDownloads } = stats

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
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

      {/* Average ATS Score */}
      <div className="bg-[#FAFAF8] rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow col-span-2 md:col-span-1">
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

    </div>
  )
}
