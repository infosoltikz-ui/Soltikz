'use client'

import { Briefcase, FileText, CheckCircle2, ShieldCheck, Check } from 'lucide-react'
import { cn } from '@/utils/cn'

interface ResumeTypeSelectorProps {
  selectedType: 'fulltime' | 'c2c'
  onChange: (type: 'fulltime' | 'c2c') => void
}

export function ResumeTypeSelector({ selectedType, onChange }: ResumeTypeSelectorProps) {
  return (
    <div className="bg-white dark:bg-[#151D28] rounded-2xl border border-[#D8DEE7] dark:border-[#26313F] shadow-sm p-4 sm:p-5">
      <div className="mb-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D8DEE7] dark:border-[#26313F] pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-[15px] sm:text-[16px] font-bold text-[#16202E] dark:text-[#E4EAF2]">Select Resume Type</h2>
            <span className="text-[11px] font-semibold text-[#64748B] dark:text-[#78859A] hidden md:inline">• Full Time vs C2C</span>
          </div>
          <p className="text-[12px] font-medium text-[#4B5768] dark:text-[#9FACBE] mt-0.5">
            Choose format to enforce ATS structure, summary length & recruiter constraints.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-[#0F5132] dark:text-[#8FD3B6] bg-[#E6F4EA] dark:bg-[#123227] px-2.5 py-1 rounded-full self-start sm:self-auto border border-[#CEEAD6] dark:border-[#3FA57C]/30 shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-[#0A6E4E] dark:text-[#3FA57C]" />
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
              ? "border-[#0A6E4E] dark:border-[#3FA57C] bg-[#E8F5E9] dark:bg-gradient-to-br dark:from-[#123227]/70 dark:via-[#151D28] dark:to-[#1A2330] ring-1 ring-[#0A6E4E]/30 dark:ring-[#3FA57C]/30 shadow-xs" 
              : "border-[#D8DEE7] dark:border-[#26313F] hover:border-[#0A6E4E]/50 dark:hover:border-[#3FA57C]/50 hover:shadow-xs bg-[#F8FAFC] dark:bg-[#1A2330]/60"
          )}
        >
          <div>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className={cn(
                  "p-2 rounded-lg transition-all shrink-0",
                  selectedType === 'fulltime' 
                    ? "bg-[#0A6E4E] text-white shadow-xs" 
                    : "bg-[#E2E8F0] dark:bg-[#26313F] text-[#475569] dark:text-[#9FACBE] group-hover:bg-[#E6F4EA] dark:group-hover:bg-[#123227] group-hover:text-[#0A6E4E] dark:group-hover:text-[#8FD3B6]"
                )}>
                  <Briefcase className="w-4 h-4 stroke-[2.2]" />
                </div>
                <h3 className="text-[14px] font-bold text-[#16202E] dark:text-[#E4EAF2] leading-tight">Full time Resume</h3>
              </div>

              {selectedType === 'fulltime' ? (
                <div className="flex items-center gap-1 bg-[#0A6E4E] text-white text-[10.5px] font-black px-2 py-0.5 rounded-full shrink-0 shadow-2xs">
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>Selected</span>
                </div>
              ) : (
                <span className="text-[11px] font-bold text-[#64748B] dark:text-[#78859A] group-hover:text-[#0A6E4E] dark:group-hover:text-[#3FA57C] shrink-0">
                  Select
                </span>
              )}
            </div>
          </div>
        </div>

        {/* C2C Option */}
        <div
          onClick={() => onChange('c2c')}
          className={cn(
            "relative p-3.5 sm:p-4 rounded-xl border-2 text-left transition-all duration-200 group cursor-pointer flex flex-col justify-between overflow-hidden",
            selectedType === 'c2c' 
              ? "border-[#B7791F] dark:border-[#D9A441] bg-[#FEF8E7] dark:bg-gradient-to-br dark:from-[#2E2616]/70 dark:via-[#151D28] dark:to-[#1A2330] ring-1 ring-[#B7791F]/30 dark:ring-[#D9A441]/30 shadow-xs" 
              : "border-[#D8DEE7] dark:border-[#26313F] hover:border-[#B7791F]/50 dark:hover:border-[#D9A441]/50 hover:shadow-xs bg-[#F8FAFC] dark:bg-[#1A2330]/60"
          )}
        >
          <div>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className={cn(
                  "p-2 rounded-lg transition-all shrink-0",
                  selectedType === 'c2c' 
                    ? "bg-[#B7791F] text-white shadow-xs" 
                    : "bg-[#E2E8F0] dark:bg-[#26313F] text-[#475569] dark:text-[#9FACBE] group-hover:bg-[#FEF3C7] dark:group-hover:bg-[#2E2616] group-hover:text-[#B7791F] dark:group-hover:text-[#D9A441]"
                )}>
                  <FileText className="w-4 h-4 stroke-[2.2]" />
                </div>
                <h3 className="text-[14px] font-bold text-[#16202E] dark:text-[#E4EAF2] leading-tight">C2C Resumes</h3>
              </div>

              {selectedType === 'c2c' ? (
                <div className="flex items-center gap-1 bg-[#B7791F] dark:bg-[#D9A441] text-white dark:text-[#0D131B] text-[10.5px] font-black px-2 py-0.5 rounded-full shrink-0 shadow-2xs">
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>Selected</span>
                </div>
              ) : (
                <span className="text-[11px] font-bold text-[#64748B] dark:text-[#78859A] group-hover:text-[#B7791F] dark:group-hover:text-[#D9A441] shrink-0">
                  Select
                </span>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
