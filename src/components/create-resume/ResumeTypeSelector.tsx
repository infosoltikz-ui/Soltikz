'use client'

import { Briefcase, FileText, CheckCircle2, ShieldCheck, Check } from 'lucide-react'
import { cn } from '@/utils/cn'

interface ResumeTypeSelectorProps {
  selectedType: 'fulltime' | 'c2c'
  onChange: (type: 'fulltime' | 'c2c') => void
}

export function ResumeTypeSelector({ selectedType, onChange }: ResumeTypeSelectorProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5">
      <div className="mb-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-[15px] sm:text-[16px] font-black text-slate-900">Select Resume Type</h2>
            <span className="text-[11px] font-semibold text-slate-400 hidden md:inline">• Corporate vs Vendor Submission</span>
          </div>
          <p className="text-[12px] font-medium text-slate-500 mt-0.5">
            Choose format to enforce ATS structure, summary length & recruiter constraints.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full self-start sm:self-auto border border-slate-200 shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Strict Enterprise Compliant</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        
        {/* Full Time Option */}
        <div
          onClick={() => onChange('fulltime')}
          className={cn(
            "relative p-3.5 sm:p-4 rounded-xl border-2 text-left transition-all duration-200 group cursor-pointer flex flex-col justify-between overflow-hidden",
            selectedType === 'fulltime' 
              ? "border-[#0F2744] bg-gradient-to-br from-[#EEF4FA] via-white to-slate-50 ring-2 ring-[#0F2744]/20 shadow-sm" 
              : "border-slate-200 hover:border-[#0F2744]/40 hover:shadow-xs bg-white"
          )}
        >
          <div>
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2.5">
                <div className={cn(
                  "p-2 rounded-lg transition-all shrink-0",
                  selectedType === 'fulltime' 
                    ? "bg-[#0F2744] text-white shadow-xs" 
                    : "bg-slate-100 text-slate-500 group-hover:bg-[#EEF4FA] group-hover:text-[#0F2744]"
                )}>
                  <Briefcase className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-[14px] font-black text-slate-900 leading-tight">Full-Time Corporate</h3>
                    <span className={cn(
                      "text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider border",
                      selectedType === 'fulltime'
                        ? "bg-[#0F2744] text-white border-[#0F2744]"
                        : "bg-slate-100 text-slate-500 border-slate-200"
                    )}>
                      Direct-Hire
                    </span>
                  </div>
                  <p className="text-[11.5px] font-medium text-slate-500 mt-0.5">
                    For direct-hire roles at US & global tech enterprises
                  </p>
                </div>
              </div>

              {selectedType === 'fulltime' ? (
                <div className="flex items-center gap-1 bg-emerald-600 text-white text-[10.5px] font-black px-2 py-0.5 rounded-full shrink-0 shadow-2xs">
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>Selected</span>
                </div>
              ) : (
                <span className="text-[11px] font-bold text-slate-400 group-hover:text-emerald-600 shrink-0">
                  Select
                </span>
              )}
            </div>

            {/* Compact feature chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100/80">
              <span className="text-[11px] font-semibold text-slate-600 bg-slate-50 border border-slate-200/60 px-2 py-0.5 rounded-md">
                5-Sentence Prose Summary
              </span>
              <span className="text-[11px] font-semibold text-slate-600 bg-slate-50 border border-slate-200/60 px-2 py-0.5 rounded-md">
                6-8 Bullets Per Role
              </span>
              <span className="text-[11px] font-semibold text-slate-600 bg-slate-50 border border-slate-200/60 px-2 py-0.5 rounded-md">
                1-2 Page Compact Layout
              </span>
            </div>
          </div>
        </div>

        {/* C2C Option */}
        <div
          onClick={() => onChange('c2c')}
          className={cn(
            "relative p-3.5 sm:p-4 rounded-xl border-2 text-left transition-all duration-200 group cursor-pointer flex flex-col justify-between overflow-hidden",
            selectedType === 'c2c' 
              ? "border-[#D97706] bg-gradient-to-br from-[#FEF3C7]/40 via-white to-amber-50/20 ring-2 ring-[#D97706]/20 shadow-sm" 
              : "border-slate-200 hover:border-[#D97706]/40 hover:shadow-xs bg-white"
          )}
        >
          <div>
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2.5">
                <div className={cn(
                  "p-2 rounded-lg transition-all shrink-0",
                  selectedType === 'c2c' 
                    ? "bg-[#D97706] text-white shadow-xs" 
                    : "bg-slate-100 text-slate-500 group-hover:bg-amber-50 group-hover:text-amber-700"
                )}>
                  <FileText className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-[14px] font-black text-slate-900 leading-tight">C2C (Contract to Hire)</h3>
                    <span className={cn(
                      "text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider border",
                      selectedType === 'c2c'
                        ? "bg-[#D97706] text-white border-[#D97706]"
                        : "bg-slate-100 text-slate-500 border-slate-200"
                    )}>
                      Vendor / Staffing
                    </span>
                  </div>
                  <p className="text-[11.5px] font-medium text-slate-500 mt-0.5">
                    For US IT Staffing, Prime Vendor & C2C submissions
                  </p>
                </div>
              </div>

              {selectedType === 'c2c' ? (
                <div className="flex items-center gap-1 bg-[#D97706] text-white text-[10.5px] font-black px-2 py-0.5 rounded-full shrink-0 shadow-2xs">
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>Selected</span>
                </div>
              ) : (
                <span className="text-[11px] font-bold text-slate-400 group-hover:text-orange-600 shrink-0">
                  Select
                </span>
              )}
            </div>

            {/* Compact feature chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100/80">
              <span className="text-[11px] font-semibold text-slate-600 bg-slate-50 border border-slate-200/60 px-2 py-0.5 rounded-md">
                10-Bullet Summary
              </span>
              <span className="text-[11px] font-semibold text-slate-600 bg-slate-50 border border-slate-200/60 px-2 py-0.5 rounded-md">
                10 Bullets Per Role
              </span>
              <span className="text-[11px] font-semibold text-slate-600 bg-slate-50 border border-slate-200/60 px-2 py-0.5 rounded-md">
                Tech Environment Stack
              </span>
              <span className="text-[11px] font-semibold text-slate-600 bg-slate-50 border border-slate-200/60 px-2 py-0.5 rounded-md">
                3-4 Page Exhaustive
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
