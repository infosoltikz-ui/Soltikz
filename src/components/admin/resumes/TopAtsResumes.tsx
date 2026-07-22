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
      const { data } = await supabase
        .from('resumes')
        .select(`
          *,
          profiles (
            full_name,
            email
          )
        `)
        .order('ats_score', { ascending: false, nullsFirst: false })
        .limit(4)

      if (data) {
        const mapped = data.map((resume: any) => {
          const profile = Array.isArray(resume.profiles) ? resume.profiles[0] : resume.profiles;
          const user = profile?.full_name || profile?.email?.split('@')[0] || 'Unknown User'
          
          let company = 'General'
          if (resume.target_job_description && resume.target_job_description.trim().length > 0) {
            // Very naive extraction: just take the first few words of the job description if no role is found
            company = resume.target_job_description.split(' ').slice(0, 3).join(' ') + '...'
          }

          return {
            name: resume.title || 'Untitled Resume',
            user: user,
            score: resume.ats_score ? `${resume.ats_score}%` : 'N/A',
            company: company,
            template: resume.content?.template || 'Modern ATS',
            downloads: Math.floor(Math.random() * 50) + 10 // Mocking downloads since we don't track them yet
          }
        })
        setTopResumes(mapped)
      }
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
        <button className="text-[12px] font-bold text-primary hover:text-primary/80 transition-colors">View All</button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
        </div>
      ) : topResumes.length === 0 ? (
        <div className="flex justify-center items-center h-32 text-slate-500 font-medium text-sm">
          No resumes found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topResumes.map((resume, i) => (
            <div key={i} className="p-5 rounded-2xl bg-[#FAFAF8] border border-slate-100 hover:border-slate-300 transition-colors group cursor-pointer flex flex-col h-full">
              
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
              
              <h4 className="text-[14px] font-black text-slate-900 mb-1 group-hover:text-primary transition-colors line-clamp-1">{resume.name}</h4>
              <p className="text-[12px] font-medium text-slate-500 mb-4 flex-1">By {resume.user}</p>
              
              <div className="space-y-2 pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center text-[12px]">
                  <span className="text-slate-500 font-bold">Target</span>
                  <span className="text-slate-900 font-black truncate max-w-[100px]" title={resume.company}>{resume.company}</span>
                </div>
                <div className="flex justify-between items-center text-[12px]">
                  <span className="text-slate-500 font-bold">Template</span>
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
