'use client'

import { Briefcase, FileText, CheckCircle2, ShieldCheck, Check } from 'lucide-react'
import { cn } from '@/utils/cn'

interface ResumeTypeSelectorProps {
  selectedType: 'fulltime' | 'c2c'
  onChange: (type: 'fulltime' | 'c2c') => void
}

export function ResumeTypeSelector({ selectedType, onChange }: ResumeTypeSelectorProps) {
  return (
    <div className="bg-[#151D28] rounded-2xl border border-[#26313F] shadow-sm p-4 sm:p-5">
      <div className="mb-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#26313F] pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-[15px] sm:text-[16px] font-bold text-[#E4EAF2]">Select Resume Type</h2>
            <span className="text-[11px] font-semibold text-[#78859A] hidden md:inline">• Corporate vs Vendor Submission</span>
          </div>
          <p className="text-[12px] font-medium text-[#9FACBE] mt-0.5">
            Choose format to enforce ATS structure, summary length & recruiter constraints.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-[#8FD3B6] bg-[#123227] px-2.5 py-1 rounded-full self-start sm:self-auto border border-[#3FA57C]/30 shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-[#3FA57C]" />
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
              ? "border-[#3FA57C] bg-gradient-to-br from-[#123227]/70 via-[#151D28] to-[#1A2330] ring-1 ring-[#3FA57C]/30 shadow-sm" 
              : "border-[#26313F] hover:border-[#3FA57C]/50 hover:shadow-xs bg-[#1A2330]/60"
          )}
        >
          <div>
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2.5">
                <div className={cn(
                  "p-2 rounded-lg transition-all shrink-0",
                  selectedType === 'fulltime' 
                    ? "bg-[#0A6E4E] text-white shadow-xs" 
                    : "bg-[#26313F] text-[#9FACBE] group-hover:bg-[#123227] group-hover:text-[#8FD3B6]"
                )}>
                  <Briefcase className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-[14px] font-bold text-[#E4EAF2] leading-tight">Full-Time Corporate</h3>
                    <span className={cn(
                      "text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider border",
                      selectedType === 'fulltime'
                        ? "bg-[#0A6E4E] text-white border-[#0A6E4E]"
                        : "bg-[#26313F] text-[#9FACBE] border-[#26313F]"
                    )}>
                      Direct-Hire
                    </span>
                  </div>
                  <p className="text-[11.5px] font-medium text-[#9FACBE] mt-0.5">
                    For direct-hire roles at US & global tech enterprises
                  </p>
                </div>
              </div>

              {selectedType === 'fulltime' ? (
                <div className="flex items-center gap-1 bg-[#0A6E4E] text-white text-[10.5px] font-black px-2 py-0.5 rounded-full shrink-0 shadow-2xs">
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>Selected</span>
                </div>
              ) : (
                <span className="text-[11px] font-bold text-[#78859A] group-hover:text-[#3FA57C] shrink-0">
                  Select
                </span>
              )}
            </div>

            {/* Compact feature chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#26313F]">
              <span className="text-[11px] font-semibold text-[#9FACBE] bg-[#1A2330] border border-[#26313F] px-2 py-0.5 rounded-md">
                5-Sentence Prose Summary
              </span>
              <span className="text-[11px] font-semibold text-[#9FACBE] bg-[#1A2330] border border-[#26313F] px-2 py-0.5 rounded-md">
                6-8 Bullets Per Role
              </span>
              <span className="text-[11px] font-semibold text-[#9FACBE] bg-[#1A2330] border border-[#26313F] px-2 py-0.5 rounded-md">
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
              ? "border-[#D9A441] bg-gradient-to-br from-[#2E2616]/70 via-[#151D28] to-[#1A2330] ring-1 ring-[#D9A441]/30 shadow-sm" 
              : "border-[#26313F] hover:border-[#D9A441]/50 hover:shadow-xs bg-[#1A2330]/60"
          )}
        >
          <div>
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2.5">
                <div className={cn(
                  "p-2 rounded-lg transition-all shrink-0",
                  selectedType === 'c2c' 
                    ? "bg-[#B7791F] text-white shadow-xs" 
                    : "bg-[#26313F] text-[#9FACBE] group-hover:bg-[#2E2616] group-hover:text-[#D9A441]"
                )}>
                  <FileText className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-[14px] font-bold text-[#E4EAF2] leading-tight">C2C (Contract to Hire)</h3>
                    <span className={cn(
                      "text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider border",
                      selectedType === 'c2c'
                        ? "bg-[#B7791F] text-white border-[#B7791F]"
                        : "bg-[#26313F] text-[#9FACBE] border-[#26313F]"
                    )}>
                      Vendor / Staffing
                    </span>
                  </div>
                  <p className="text-[11.5px] font-medium text-[#9FACBE] mt-0.5">
                    For US IT Staffing, Prime Vendor & C2C submissions
                  </p>
                </div>
              </div>

              {selectedType === 'c2c' ? (
                <div className="flex items-center gap-1 bg-[#D9A441] text-[#0D131B] text-[10.5px] font-black px-2 py-0.5 rounded-full shrink-0 shadow-2xs">
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>Selected</span>
                </div>
              ) : (
                <span className="text-[11px] font-bold text-[#78859A] group-hover:text-[#D9A441] shrink-0">
                  Select
                </span>
              )}
            </div>

            {/* Compact feature chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#26313F]">
              <span className="text-[11px] font-semibold text-[#9FACBE] bg-[#1A2330] border border-[#26313F] px-2 py-0.5 rounded-md">
                10-Bullet Summary
              </span>
              <span className="text-[11px] font-semibold text-[#9FACBE] bg-[#1A2330] border border-[#26313F] px-2 py-0.5 rounded-md">
                10 Bullets Per Role
              </span>
              <span className="text-[11px] font-semibold text-[#9FACBE] bg-[#1A2330] border border-[#26313F] px-2 py-0.5 rounded-md">
                Tech Environment Stack
              </span>
              <span className="text-[11px] font-semibold text-[#9FACBE] bg-[#1A2330] border border-[#26313F] px-2 py-0.5 rounded-md">
                3-4 Page Exhaustive
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
