'use client'

import { Building2, UploadCloud, Sparkles, Zap, CheckCircle2, Edit3, Shield, FileText, Briefcase, ArrowRight, Wand2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'

interface CompanyDetailsSectionProps {
  onGenerate?: (company: string, role: string, jd: string) => void;
}

export function CompanyDetailsSection({ onGenerate }: CompanyDetailsSectionProps) {
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [jd, setJd] = useState('')

  const handleFillUnrelated = () => {
    setCompany('Global Logistics Corp')
    setRole('HR Manager')
    setJd('We are seeking an HR Manager to oversee our employee relations, benefits administration, and talent acquisition. You must have 7+ years of HR experience, SHRM certification, and expertise in resolving workplace conflicts. Technical programming skills are not required. You will be responsible for onboarding, performance reviews, and compliance with labor laws.')
  }

  const handleFillPartial = () => {
    setCompany('FinTech Solutions')
    setRole('Full Stack Developer')
    setJd('Looking for a Full Stack Developer to build banking platforms. Required: 3+ years in React.js, Node.js, and AWS. Preferred: Python, Docker, Kubernetes, and PostgreSQL. You will design REST APIs and create responsive UIs for mobile and web. Financial domain experience is a big plus.')
  }

  const handleFillPerfect = () => {
    setCompany('Tech Innovators Inc.')
    setRole('Senior Frontend Engineer')
    setJd('We are looking for an experienced Senior Frontend Engineer to join our core product team. You will be responsible for building responsive, high-performance web applications using React, Next.js, and Tailwind CSS. The ideal candidate has 5+ years of experience in modern JavaScript, a strong understanding of web performance optimization, and experience collaborating with design and backend teams. You should have a proven track record of shipping complex user interfaces and mentoring junior developers.')
  }

  const isFormReady = company.trim() && role.trim() && jd.trim()

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/20 p-8 relative overflow-hidden group hover:shadow-2xl hover:border-emerald-200 transition-all duration-500">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 pointer-events-none group-hover:bg-emerald-100 transition-colors duration-500" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8 border-b border-slate-100 pb-5 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <h2 className="text-[20px] font-black text-slate-900 tracking-tight">Target Job Details</h2>
          </div>
          <p className="text-[13px] font-medium text-slate-500">
            Provide the role and job description. Our AI will analyze requirements and tailor your resume.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right hidden sm:block">ATS Score Testing</span>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleFillUnrelated} className="text-[11px] h-8 px-3 font-bold text-rose-700 border-rose-200 bg-rose-50 hover:bg-rose-100 transition-all rounded-lg">
              0% Match
            </Button>
            <Button variant="outline" size="sm" onClick={handleFillPartial} className="text-[11px] h-8 px-3 font-bold text-amber-700 border-amber-200 bg-amber-50 hover:bg-amber-100 transition-all rounded-lg">
              Partial Match
            </Button>
            <Button variant="outline" size="sm" onClick={handleFillPerfect} className="text-[11px] h-8 px-3 font-bold text-emerald-700 border-emerald-300 bg-emerald-50 hover:bg-emerald-100 transition-all rounded-lg">
              <Wand2 className="w-3 h-3 mr-1.5 text-emerald-600" />
              100% Match
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        
        {/* Two-Column Company & Role */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="group/input">
            <label className="block text-[12.5px] font-extrabold text-slate-800 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-emerald-600" />
                Target Company Name
              </span>
            </label>
            <input 
              type="text" 
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g., Google, Amazon, Startup Inc." 
              className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 text-[14px] font-bold text-slate-900 transition-all bg-slate-50 group-hover/input:bg-white placeholder:text-slate-400 shadow-xs"
            />
          </div>
          
          <div className="group/input">
            <label className="block text-[12.5px] font-extrabold text-slate-800 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-teal-600" />
                Target Job Title
              </span>
            </label>
            <input 
              type="text" 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., Senior Full Stack Engineer" 
              className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 text-[14px] font-bold text-slate-900 transition-all bg-slate-50 group-hover/input:bg-white placeholder:text-slate-400 shadow-xs"
            />
          </div>
        </div>

        {/* Job Description Textarea */}
        <div className="group/textarea">
          <label className="block text-[12.5px] font-extrabold text-slate-800 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-indigo-600" />
              Full Job Description
            </span>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">
              {jd ? `${jd.length} chars` : 'Required'}
            </span>
          </label>
          <textarea 
            rows={5}
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste the full job posting text here. AI will extract keywords and requirements to tailor your resume perfectly."
            className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 text-[13.5px] font-medium text-slate-900 transition-all resize-none leading-relaxed bg-slate-50 group-hover/textarea:bg-white placeholder:text-slate-400 shadow-xs"
          ></textarea>
        </div>
      </div>

      {/* Generate Resume Button Container */}
      <div className="mt-10 flex flex-col items-center justify-center pt-8 border-t border-slate-100 relative z-10">
        <Button 
          onClick={() => onGenerate && isFormReady && onGenerate(company, role, jd)}
          disabled={!isFormReady}
          className="relative h-14 px-10 text-[16px] font-black rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-xl shadow-emerald-600/30 w-full sm:w-auto min-w-[360px] flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none hover:shadow-2xl hover:shadow-emerald-600/50 hover:-translate-y-1 overflow-hidden group/btn" 
        >
          {/* Shimmer Effect */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/btn:animate-[shimmer_1.5s_infinite]" />
          
          <Sparkles className="w-5 h-5 text-amber-300 animate-spin-slow relative z-10" />
          <span className="relative z-10 tracking-wide">Generate Tailored AI Resume</span>
          <ArrowRight className="w-5 h-5 opacity-90 group-hover/btn:translate-x-1.5 transition-transform relative z-10" />
        </Button>

        <p className="text-[12px] font-bold text-slate-400 mt-4 flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-emerald-500" />
          <span>Powered by Gemini AI • Guaranteed 90%+ ATS Score</span>
        </p>
      </div>

    </div>
  )
}
