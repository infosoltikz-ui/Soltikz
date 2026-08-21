'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { UserMenu } from '@/components/dashboard/UserMenu'

export function CreateResumeHeader({ title = "Untitled Resume" }) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
      {/* Left: Back & Title */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-900 transition-colors shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-[26px] font-black text-slate-900 tracking-tight leading-tight truncate max-w-[240px] sm:max-w-md">
            {title}
          </h1>
          <p className="text-[14px] font-medium text-slate-500 mt-1">Back to Dashboard</p>
        </div>
      </div>

      <UserMenu />
    </header>
  )
}
