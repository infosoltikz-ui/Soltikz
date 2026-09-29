'use client'

import { Target, Download, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export function TopAtsResumes() {
  const supabase = createClient()
  const [topResumes, setTopResumes] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchResumes() {
      // 1. Fetch top ATS scores
      const { data: atsData } = await supabase
        .from('ats_analyses')
        .select('resume_id, overall_score')
        .order('overall_score', { ascending: false })
        .limit(10)

      if (!atsData || atsData.length === 0) {
        setIsLoading(false)
        return
      }

      // 2. Fetch those resumes
      const resumeIds = atsData.map(a => a.resume_id)
      const { data: resumes } = await supabase
        .from('resumes_v2')
        .select('id, title, resume_type, user_id, parsed_jd_id')
        .in('id', resumeIds)

      if (!resumes || resumes.length === 0) {
        setIsLoading(false)
        return
      }

      const userIds = [...new Set(resumes.map(r => r.user_id).filter(Boolean))]
      const jdIds = [...new Set(resumes.map(r => r.parsed_jd_id).filter(Boolean))]

      // 3. Fetch profiles
      const { data: profiles } = userIds.length > 0 ? await supabase
        .from('profiles')
        .select('id, full_name, email')
        .in('id', userIds) : { data: [] }

      // 4. Fetch JDs
      const { data: jds } = jdIds.length > 0 ? await supabase
        .from('parsed_job_descriptions')
        .select('id, company_name')
        .in('id', jdIds) : { data: [] }
        
      // 5. Fetch downloads (usage events)
      const { data: events } = await supabase
        .from('usage_events')
        .select('resume_id')
        .in('event_type', ['pdf_download', 'docx_download'])
        .in('resume_id', resumeIds)

      const downloadCounts: Record<string, number> = {}
      events?.forEach((e: any) => {
        downloadCounts[e.resume_id] = (downloadCounts[e.resume_id] || 0) + 1
      })

      const profileMap = new Map((profiles || []).map(p => [p.id, p]))
      const jdMap = new Map((jds || []).map(j => [j.id, j]))

      // 6. Merge
      const mapped = resumes.map(resume => {
        const ats = atsData.find(a => a.resume_id === resume.id)
        const profile = profileMap.get(resume.user_id)
        const jd = jdMap.get(resume.parsed_jd_id)
        
        const user = profile?.full_name || profile?.email?.split('@')[0] || 'Unknown User'

        return {
          id: resume.id,
          name: resume.title || 'Untitled Resume',
          user,
          score: `${ats?.overall_score || 0}%`,
          rawScore: ats?.overall_score || 0,
          company: jd?.company_name || 'General',
          template: resume.resume_type || 'Standard',
          downloads: downloadCounts[resume.id] || 0,
        }
      })
      
      mapped.sort((a, b) => b.rawScore - a.rawScore)

      setTopResumes(mapped.slice(0, 4))
      setIsLoading(false)
    }
    fetchResumes()
  }, [])

  return (
    <div className="bg-white border border-slate-200 rounded-[18px] p-6 shadow-sm mt-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-[18px] font-black text-slate-900">Highest ATS Scores</h3>
          <p className="text-[13px] font-medium text-slate-500">Platform's best performing resumes</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
        </div>
      ) : topResumes.length === 0 ? (
        <div className="flex justify-center items-center h-32 text-slate-500 font-medium text-sm">
          No scored resumes found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topResumes.map((resume) => (
            <div key={resume.id} className="p-5 rounded-2xl bg-[#FAFAF8] border border-slate-100 hover:border-slate-300 transition-colors group flex flex-col h-full">

              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-16 bg-white border border-slate-200 shadow-sm rounded-md overflow-hidden relative shrink-0">
                  <div className="absolute inset-0 bg-slate-50 opacity-50 p-1.5 flex flex-col gap-1">
                    <div className="w-1/2 h-1 bg-slate-300 rounded-full"></div>
                    <div className="w-full h-0.5 bg-slate-200 rounded-full mt-1"></div>
                    <div className="w-3/4 h-0.5 bg-slate-200 rounded-full"></div>
                    <div className="w-full h-0.5 bg-slate-200 rounded-full"></div>
                  </div>
                </div>
                <div className="bg-green-50 border border-green-100 text-primary px-2 py-1 rounded-lg flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5" />
                  <span className="text-[13px] font-black">{resume.score}</span>
                </div>
              </div>

              <h4 className="text-[14px] font-black text-slate-900 mb-1 group-hover:text-primary transition-colors leading-snug">{resume.name}</h4>
              <p className="text-[12px] font-medium text-slate-500 mb-4 flex-1">By {resume.user}</p>

              <div className="space-y-2 pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center text-[12px] gap-2">
                  <span className="text-slate-500 font-bold shrink-0">Target</span>
                  <span className="text-slate-900 font-black text-right">{resume.company}</span>
                </div>
                <div className="flex justify-between items-center text-[12px]">
                  <span className="text-slate-500 font-bold">Type</span>
                  <span className="text-slate-900 font-black">{resume.template}</span>
                </div>
                <div className="flex justify-between items-center text-[12px]">
                  <span className="text-slate-500 font-bold flex items-center gap-1"><Download className="w-3 h-3" /> DLs</span>
                  <span className="text-slate-900 font-black">{resume.downloads}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  )
}
