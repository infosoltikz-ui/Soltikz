'use client'

import { Briefcase, FileText, CheckCircle2, ShieldCheck, Zap, Layers, Sparkles } from 'lucide-react'
import { cn } from '@/utils/cn'

interface ResumeTypeSelectorProps {
  selectedType: 'fulltime' | 'c2c'
  onChange: (type: 'fulltime' | 'c2c') => void
}

export function ResumeTypeSelector({ selectedType, onChange }: ResumeTypeSelectorProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-[18px] font-black text-slate-900">Select Resume Type</h2>
          </div>
          <p className="text-[13px] font-medium text-slate-500">
            Choose the target format to apply the exact ATS constraints & recruiter rules.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[12px] font-extrabold text-slate-600 bg-slate-100 px-3.5 py-1.5 rounded-full self-start sm:self-auto border border-slate-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Strict Enterprise Compliant</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Full Time Card */}
        <div
          onClick={() => onChange('fulltime')}
          className={cn(
            "relative p-6 rounded-2xl border-2 text-left transition-all duration-300 group cursor-pointer flex flex-col justify-between overflow-hidden",
            selectedType === 'fulltime' 
              ? "border-emerald-500 bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/30 ring-4 ring-emerald-500/10 shadow-md" 
              : "border-slate-200 hover:border-emerald-400/60 hover:shadow-md bg-white"
          )}
        >
          {selectedType === 'fulltime' && (
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />
          )}

          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className={cn(
                "p-3 rounded-xl transition-all shadow-sm",
                selectedType === 'fulltime' 
                  ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-emerald-500/30" 
                  : "bg-slate-100 text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-600"
              )}>
                <Briefcase className="w-6 h-6 stroke-[2]" />
              </div>

              <span className={cn(
                "text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border",
                selectedType === 'fulltime'
                  ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                  : "bg-slate-100 text-slate-500 border-slate-200"
              )}>
                Direct-Hire Corporate
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="text-[17px] font-black text-slate-900">Full-Time Corporate</h3>
              {selectedType === 'fulltime' && (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" fill="currentColor" stroke="white" strokeWidth={1.5} />
              )}
            </div>

            <p className="text-[13px] font-medium text-slate-600 leading-relaxed mb-5">
              Engineered for direct-hire roles at US & global tech enterprises. Features a 5-sentence prose summary and 6-8 impact metrics per role.
            </p>

            <ul className="space-y-2 text-[12px] font-bold text-slate-600 border-t border-slate-100 pt-4">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>5-Sentence Prose Summary (No Bullets)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>6 to 8 Powerful Bullets Per Recent Role</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>10 Grouped Technical Skill Matrix</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>1-2 Page Compact ATS High-Scoring Layout</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11.5px] font-extrabold text-slate-400 group-hover:text-emerald-700 transition-colors">
              {selectedType === 'fulltime' ? '✓ Currently Selected' : 'Click to Select Full-Time'}
            </span>
            <span className={cn(
              "text-[12px] font-extrabold px-3 py-1 rounded-lg transition-all",
              selectedType === 'fulltime' ? "bg-emerald-600 text-white shadow-xs" : "bg-slate-100 text-slate-600 group-hover:bg-emerald-50 group-hover:text-emerald-700"
            )}>
              {selectedType === 'fulltime' ? 'Active Format' : 'Select'}
            </span>
          </div>
        </div>

        {/* C2C Card */}
        <div
          onClick={() => onChange('c2c')}
          className={cn(
            "relative p-6 rounded-2xl border-2 text-left transition-all duration-300 group cursor-pointer flex flex-col justify-between overflow-hidden",
            selectedType === 'c2c' 
              ? "border-orange-500 bg-gradient-to-br from-orange-50/80 via-white to-amber-50/30 ring-4 ring-orange-500/10 shadow-md" 
              : "border-slate-200 hover:border-orange-400/60 hover:shadow-md bg-white"
          )}
        >
          {selectedType === 'c2c' && (
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />
          )}

          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className={cn(
                "p-3 rounded-xl transition-all shadow-sm",
                selectedType === 'c2c' 
                  ? "bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-orange-500/30" 
                  : "bg-slate-100 text-slate-500 group-hover:bg-orange-50 group-hover:text-orange-600"
              )}>
                <FileText className="w-6 h-6 stroke-[2]" />
              </div>

              <span className={cn(
                "text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border",
                selectedType === 'c2c'
                  ? "bg-orange-100 text-orange-900 border-orange-300"
                  : "bg-slate-100 text-slate-500 border-slate-200"
              )}>
                Contract / Prime Vendor
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="text-[17px] font-black text-slate-900">C2C (Contract to Hire)</h3>
              {selectedType === 'c2c' && (
                <CheckCircle2 className="w-6 h-6 text-orange-500 shrink-0" fill="currentColor" stroke="white" strokeWidth={1.5} />
              )}
            </div>

            <p className="text-[13px] font-medium text-slate-600 leading-relaxed mb-5">
              Designed for US IT Staffing & Vendor submissions. Features a 10-bullet structured summary, 10 bullets per role, and tech environment arrays.
            </p>

            <ul className="space-y-2 text-[12px] font-bold text-slate-600 border-t border-slate-100 pt-4">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <span>EXACTLY 10 Structured Executive Summary Bullets</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <span>EXACTLY 10 Powerful Bullets Per Recent Role</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <span>Mandatory Environment Tech Stack Array Per Role</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <span>3-4 Page Exhaustive Vendor Submission Format</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11.5px] font-extrabold text-slate-400 group-hover:text-orange-700 transition-colors">
              {selectedType === 'c2c' ? '✓ Currently Selected' : 'Click to Select C2C'}
            </span>
            <span className={cn(
              "text-[12px] font-extrabold px-3 py-1 rounded-lg transition-all",
              selectedType === 'c2c' ? "bg-orange-500 text-white shadow-xs" : "bg-slate-100 text-slate-600 group-hover:bg-orange-50 group-hover:text-orange-700"
            )}>
              {selectedType === 'c2c' ? 'Active Format' : 'Select'}
            </span>
          </div>
        </div>

      </div>
    </div>
  )
}
