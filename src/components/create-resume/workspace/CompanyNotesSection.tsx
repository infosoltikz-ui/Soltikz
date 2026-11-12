'use client'

import { Building, Lightbulb } from 'lucide-react'

interface CompanyNotesSectionProps {
  companyNotes: string
}

export function CompanyNotesSection({ companyNotes }: CompanyNotesSectionProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-4 animate-in fade-in duration-300">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EEF4FA] text-[#0F2744] flex items-center justify-center shrink-0">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-[17px] font-black text-slate-900">Target Role &amp; Company Strategy</h3>
            <p className="text-[12px] font-medium text-slate-500">Strategic notes derived from the Job Description</p>
          </div>
        </div>
      </div>

      <div className="p-5 rounded-xl bg-[#F8FAFC] border border-slate-200/70 text-[14px] leading-relaxed text-slate-700 font-medium">
        <p>{companyNotes}</p>
      </div>

      <div className="p-4 rounded-xl bg-[#FEF3C7]/60 border border-[#F59E0B]/30 flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
        <p className="text-[12.5px] text-slate-700 leading-relaxed font-medium">
          <strong>Tip:</strong> Align your project descriptions and metrics directly with the company&apos;s domain priorities (e.g., latency, conversion impact, scalability, reliability).
        </p>
      </div>
    </div>
  )
}
