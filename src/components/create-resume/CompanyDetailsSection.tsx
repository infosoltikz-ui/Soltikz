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
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-8 relative overflow-hidden group hover:shadow-lg hover:border-[#0F2744]/25 transition-all duration-300">
      
      {/* Top accent strip */}
      <div className="absolute inset-x-0 top-0 h-1 bg-[#0F2744]" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-7 border-b border-slate-100 pb-5 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
            <h2 className="text-[19px] font-black text-slate-900 tracking-tight">Target Job Details</h2>
          </div>
          <p className="text-[13px] font-medium text-slate-500">
            Provide the role and job description. Our AI analyzes requirements and tailors your resume.
          </p>
        </div>

        <div className="flex flex-col gap-1.5 shrink-0">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider sm:text-right">Quick Fill Samples</span>
          <div className="flex flex-wrap items-center gap-1.5">
            <Button variant="outline" size="sm" onClick={handleFillUnrelated} className="text-[11px] h-8 px-2.5 font-bold text-rose-700 border-rose-200 bg-rose-50 hover:bg-rose-100 transition-all rounded-lg cursor-pointer">
              0% Match
            </Button>
            <Button variant="outline" size="sm" onClick={handleFillPartial} className="text-[11px] h-8 px-2.5 font-bold text-[#B45309] border-[#F59E0B]/40 bg-[#FEF3C7]/60 hover:bg-[#FEF3C7] transition-all rounded-lg cursor-pointer">
              Partial Match
            </Button>
            <Button variant="outline" size="sm" onClick={handleFillPerfect} className="text-[11px] h-8 px-2.5 font-bold text-[#0F2744] border-[#0F2744]/20 bg-[#EEF4FA] hover:bg-[#E1ECF8] transition-all rounded-lg cursor-pointer">
              <Wand2 className="w-3 h-3 mr-1 text-[#D97706]" />
              100% Match
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-5 relative z-10">
        
        {/* Two-Column Company & Role */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="group/input">
            <label className="block text-[12.5px] font-extrabold text-slate-800 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-[#0F2744]" />
                Target Company Name
              </span>
            </label>
            <input 
              type="text" 
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g., Google, Amazon, Startup Inc." 
              className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F2744] focus:ring-4 focus:ring-[#0F2744]/10 text-[13.5px] font-bold text-slate-900 transition-all bg-[#F8FAFC] focus:bg-white placeholder:text-slate-400"
            />
          </div>
          
          <div className="group/input">
            <label className="block text-[12.5px] font-extrabold text-slate-800 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-[#D97706]" />
                Target Job Title
              </span>
            </label>
            <input 
              type="text" 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., Senior Full Stack Engineer" 
              className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F2744] focus:ring-4 focus:ring-[#0F2744]/10 text-[13.5px] font-bold text-slate-900 transition-all bg-[#F8FAFC] focus:bg-white placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Job Description Textarea */}
        <div className="group/textarea">
          <label className="block text-[12.5px] font-extrabold text-slate-800 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#0F2744]" />
              Full Job Description
            </span>
            <span className="text-[11px] font-bold text-[#0F2744] bg-[#EEF4FA] px-2.5 py-0.5 rounded-full border border-slate-200/80 tabular-nums">
              {jd ? `${jd.length} chars` : 'Required'}
            </span>
          </label>
          <textarea 
            rows={6}
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste the full job posting text here. AI will extract keywords and requirements to tailor your resume accurately."
            className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F2744] focus:ring-4 focus:ring-[#0F2744]/10 text-[13.5px] font-medium text-slate-900 transition-all resize-y leading-relaxed bg-[#F8FAFC] focus:bg-white placeholder:text-slate-400"
          ></textarea>
        </div>
      </div>

      {/* Generate Resume Button Container */}
      <div className="mt-8 flex flex-col items-center justify-center pt-6 border-t border-slate-100 relative z-10">
        <Button 
          onClick={() => onGenerate && isFormReady && onGenerate(company, role, jd)}
          disabled={!isFormReady}
          className="relative h-13 px-8 text-[15px] font-black rounded-2xl bg-[#0F2744] hover:bg-[#0A1C33] text-white shadow-lg shadow-slate-900/15 w-full sm:w-auto sm:min-w-[320px] flex items-center justify-center gap-3 transition-all duration-200 disabled:opacity-45 disabled:pointer-events-none hover:-translate-y-0.5 overflow-hidden group/btn cursor-pointer" 
        >
          <Sparkles className="w-5 h-5 text-[#F59E0B] relative z-10" />
          <span className="relative z-10 tracking-wide">Generate Tailored AI Resume</span>
          <ArrowRight className="w-5 h-5 text-[#F59E0B] group-hover/btn:translate-x-1 transition-transform relative z-10" />
        </Button>

        <p className="text-[12px] font-semibold text-slate-400 mt-3.5 flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-[#059669]" />
          <span>Strict Evidence-Grounded Engine • High ATS Alignment</span>
        </p>
      </div>

    </div>
  )
}
