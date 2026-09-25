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

  const handleFillDummyData = () => {
    setCompany('Tech Innovators Inc.')
    setRole('Senior Frontend Engineer')
    setJd('We are looking for an experienced Senior Frontend Engineer to join our core product team. You will be responsible for building responsive, high-performance web applications using React, Next.js, and Tailwind CSS. The ideal candidate has 5+ years of experience in modern JavaScript, a strong understanding of web performance optimization, and experience collaborating with design and backend teams. You should have a proven track record of shipping complex user interfaces and mentoring junior developers.')
  }

  const isFormReady = company.trim() && role.trim() && jd.trim()

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-[18px] font-black text-slate-900">Target Job & Opportunity Details</h2>
          </div>
          <p className="text-[13px] font-medium text-slate-500">
            Paste the Job Description to let AI extract mandatory keywords & match scores.
          </p>
        </div>

        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleFillDummyData}
          className="text-[12px] h-9 px-4 font-extrabold text-emerald-700 border-emerald-300 hover:bg-emerald-50 transition-all rounded-xl self-start sm:self-auto shadow-2xs"
        >
          <Wand2 className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
          Fill Sample Job Description
        </Button>
      </div>

      <div className="space-y-6">
        
        {/* Two-Column Company & Role */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-[12.5px] font-extrabold text-slate-800 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-emerald-600" />
                Company Name
              </span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">Required</span>
            </label>
            <input 
              type="text" 
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g., Google, Amazon, Software Solutions Inc." 
              className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-[14px] font-semibold text-slate-900 transition-all bg-slate-50/30 focus:bg-white placeholder:text-slate-400"
            />
          </div>
          
          <div>
            <label className="block text-[12.5px] font-extrabold text-slate-800 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-teal-600" />
                Target Job Title
              </span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">Required</span>
            </label>
            <input 
              type="text" 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., Senior Full Stack Engineer, DevOps Specialist" 
              className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-[14px] font-semibold text-slate-900 transition-all bg-slate-50/30 focus:bg-white placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Job Description Textarea */}
        <div>
          <label className="block text-[12.5px] font-extrabold text-slate-800 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-indigo-600" />
              Job Description (JD Text)
            </span>
            <span className="text-[11.5px] font-medium text-slate-400">
              {jd ? `${jd.length} characters` : 'Paste full JD here'}
            </span>
          </label>
          <textarea 
            rows={5}
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste the full job posting text here... AI will parse technical skills, core responsibilities, and required keywords to build a 90%+ ATS matching resume."
            className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-[13.5px] font-medium text-slate-900 transition-all resize-none leading-relaxed bg-slate-50/30 focus:bg-white placeholder:text-slate-400"
          ></textarea>
        </div>

        {/* Optional Upload Box */}
        <div>
          <label className="block text-[12px] font-bold text-slate-700 mb-2">
            Upload Job Description File <span className="font-normal text-slate-400">(Optional PDF / DOCX)</span>
          </label>
          <div className="w-full border-2 border-dashed border-emerald-300/80 rounded-2xl bg-gradient-to-br from-emerald-50/40 to-teal-50/20 hover:bg-emerald-50/80 transition-all cursor-pointer py-6 px-4 flex flex-col items-center justify-center text-center group">
            <div className="w-10 h-10 rounded-xl bg-white text-emerald-600 shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div className="text-[13px] font-extrabold text-slate-800">Click to upload or drag & drop Job Description</div>
            <div className="text-[11px] font-medium text-slate-500 mt-1">Supports PDF, DOCX, TXT (Max 10MB)</div>
          </div>
        </div>
      </div>

      {/* Generate Resume Button Container */}
      <div className="mt-10 flex flex-col items-center justify-center pt-8 border-t border-slate-100">
        <Button 
          onClick={() => onGenerate && isFormReady && onGenerate(company, role, jd)}
          disabled={!isFormReady}
          className="h-14 px-10 text-[16px] font-black rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-700 text-white shadow-xl shadow-emerald-600/30 hover:shadow-2xl hover:shadow-emerald-600/40 hover:-translate-y-0.5 transition-all w-full sm:w-auto min-w-[340px] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-3 cursor-pointer" 
        >
          <Sparkles className="w-5 h-5 text-amber-300 animate-spin-slow" />
          <span>Generate Tailored AI Resume</span>
          <ArrowRight className="w-5 h-5 opacity-90" />
        </Button>

        <p className="text-[12px] font-bold text-slate-400 mt-3 flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-emerald-500" />
          <span>Powered by Enterprise GPT-4o Engine • Guaranteed 90%+ ATS Score</span>
        </p>
      </div>

    </div>
  )
}
