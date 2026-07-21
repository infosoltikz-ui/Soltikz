'use client'

import { Target, Download, FileText } from 'lucide-react'

const TOP_RESUMES = [
  { name: 'Senior Staff Engineer Resume', user: 'Sarah Jenkins', score: '99%', company: 'Google', template: 'Modern ATS', downloads: 142 },
  { name: 'Cloud Architect C2C', user: 'Michael Chen', score: '98%', company: 'Microsoft', template: 'Executive', downloads: 89 },
  { name: 'Product Lead 2024', user: 'David Smith', score: '97%', company: 'Amazon', template: 'Professional', downloads: 65 },
  { name: 'VP of Engineering', user: 'Aisha Patel', score: '96%', company: 'Stripe', template: 'Minimalist', downloads: 54 },
]

export function TopAtsResumes() {
  return (
    <div className="bg-white border border-slate-200 rounded-[18px] p-6 shadow-sm mt-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-[18px] font-black text-slate-900">Highest ATS Scores</h3>
          <p className="text-[13px] font-medium text-slate-500">Platform's best performing resumes</p>
        </div>
        <button className="text-[12px] font-bold text-primary hover:text-primary/80 transition-colors">View All</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TOP_RESUMES.map((resume, i) => (
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
                <span className="text-slate-900 font-black">{resume.company}</span>
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
    </div>
  )
}
