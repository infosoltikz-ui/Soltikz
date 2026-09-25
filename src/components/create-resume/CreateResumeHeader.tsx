'use client'

import { ArrowLeft, Sparkles, ShieldCheck, FileCheck } from 'lucide-react'
import Link from 'next/link'
import { UserMenu } from '@/components/dashboard/UserMenu'

export function CreateResumeHeader({ title = "Create AI Resume" }: { title?: string }) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 mb-2">
      {/* Left: Back & Title */}
      <div className="flex items-center gap-4 min-w-0">
        <Link
          href="/dashboard"
          className="flex items-center justify-center w-11 h-11 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-all shadow-2xs hover:shadow-sm shrink-0 group"
          title="Back to Dashboard"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
        </Link>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-[22px] sm:text-[26px] font-black text-slate-900 tracking-tight leading-tight truncate">
              {title}
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 shrink-0">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>AI Tailoring Suite</span>
            </span>
          </div>
          <p className="text-[13px] font-medium text-slate-500 mt-0.5 flex items-center gap-1.5">
            <Link href="/dashboard" className="hover:text-emerald-700 transition-colors font-semibold">Dashboard</Link>
            <span>/</span>
            <span className="text-slate-700 font-bold">Resume Builder</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="hidden lg:flex items-center gap-2 text-[12px] font-bold text-slate-600 bg-slate-100/80 px-3 py-1.5 rounded-xl border border-slate-200/80">
          <FileCheck className="w-4 h-4 text-emerald-600" />
          <span>Workday & Taleo Certified</span>
        </div>
        <UserMenu />
      </div>
    </header>
  )
}
