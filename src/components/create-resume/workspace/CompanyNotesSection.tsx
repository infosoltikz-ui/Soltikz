'use client'

import { Building, Lightbulb } from 'lucide-react'

interface CompanyNotesSectionProps {
  companyNotes: string
}

export function CompanyNotesSection({ companyNotes }: CompanyNotesSectionProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-[17px] font-black text-slate-900">Target Role & Company Strategy</h3>
            <p className="text-[12px] font-medium text-slate-500">Strategic notes derived from the Job Description</p>
          </div>
        </div>
      </div>

      <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 text-[14px] leading-relaxed text-slate-700 font-medium">
        <p>{companyNotes}</p>
      </div>

      <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-[12px] text-amber-900 leading-relaxed font-medium">
          <strong>Tip:</strong> Align your project descriptions and metrics directly with the company's business domain (e.g. FinTech latency, E-Commerce conversion, SaaS onboarding).
        </p>
      </div>
    </div>
  )
}
