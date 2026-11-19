import Link from 'next/link'
import { FileText, Gauge, ShieldCheck, ArrowUpRight, Sparkles } from 'lucide-react'
import { cn } from '@/utils/cn'

function completionMessage(profileCompletion: number) {
  if (profileCompletion === 100) return 'Master Profile 100% synced'
  if (profileCompletion >= 80) return 'Almost ready for tailoring'
  if (profileCompletion >= 40) return 'Partially completed'
  if (profileCompletion > 0) return 'Needs more details'
  return 'Profile not started yet'
}

export function StatCards({
  resumesCreated,
  avgAts,
  scoredCount = 0,
  profileCompletion,
}: {
  resumesCreated: number
  avgAts: number | null
  scoredCount?: number
  profileCompletion: number
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* 1. Resumes Created */}
      <Link
        href="/dashboard/resumes"
        className="group relative bg-[#151D28] rounded-2xl p-6 border border-[#26313F] shadow-xs hover:border-[#3FA57C]/40 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col justify-between"
      >
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0A6E4E] to-[#3FA57C] opacity-90" />

        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-[0.09em] text-[#78859A] block mb-1.5">
              Resumes Created
            </span>
            <div className="flex items-baseline gap-2.5">
              <span className="text-4xl font-black text-[#E4EAF2] tracking-tight tabular-nums">
                {resumesCreated}
              </span>
              {scoredCount > 0 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#123227] text-[#8FD3B6] border border-[#3FA57C]/30">
                  {scoredCount} active
                </span>
              )}
            </div>
          </div>

          <div className="w-11 h-11 rounded-2xl bg-[#1A2330] border border-[#26313F] text-[#3FA57C] flex items-center justify-center shrink-0 group-hover:bg-[#0A6E4E] group-hover:text-white transition-colors duration-200">
            <FileText className="w-5 h-5" strokeWidth={2.2} />
          </div>
        </div>

        <div className="flex items-center justify-between pt-3.5 border-t border-[#26313F] text-xs">
          <span className="font-medium text-[#9FACBE]">
            {scoredCount > 0
              ? `${scoredCount} tailored resume${scoredCount === 1 ? '' : 's'} in your library`
              : resumesCreated > 0
              ? `${resumesCreated} generated all-time`
              : 'No resumes in library yet'}
          </span>
          <span className="inline-flex items-center gap-1 font-bold text-[#3FA57C] group-hover:translate-x-0.5 transition-transform">
            Library <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </Link>

      {/* 2. ATS Score (Avg) */}
      <Link
        href="/dashboard/create"
        className="group relative bg-[#151D28] rounded-2xl p-6 border border-[#26313F] shadow-xs hover:border-[#D9A441]/40 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col justify-between"
      >
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#D9A441] to-[#F59E0B] opacity-90" />

        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-[0.09em] text-[#78859A] block mb-1.5">
              ATS Match Average
            </span>
            <div className="flex items-baseline gap-2.5">
              <span className="text-4xl font-black text-[#E4EAF2] tracking-tight tabular-nums">
                {avgAts !== null && avgAts > 0 ? `${avgAts}%` : 'Ready'}
              </span>
              {avgAts !== null && avgAts >= 85 && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#123227] text-[#8FD3B6] border border-[#3FA57C]/30">
                  <Sparkles className="w-2.5 h-2.5" /> High Match
                </span>
              )}
            </div>
          </div>

          <div className="w-11 h-11 rounded-2xl bg-[#2E2616] border border-[#D9A441]/30 text-[#D9A441] flex items-center justify-center shrink-0 group-hover:bg-[#D9A441] group-hover:text-[#0A1017] transition-colors duration-200">
            <Gauge className="w-5 h-5" strokeWidth={2.2} />
          </div>
        </div>

        <div className="flex items-center justify-between pt-3.5 border-t border-[#26313F] text-xs">
          <span className="font-medium text-[#9FACBE]">
            {avgAts !== null && avgAts > 0 && scoredCount > 0
              ? `Across ${scoredCount} scored resume${scoredCount === 1 ? '' : 's'}`
              : 'Paste a JD to measure your match'}
          </span>
          <span className="inline-flex items-center gap-1 font-bold text-[#D9A441] group-hover:translate-x-0.5 transition-transform">
            Tailor JD <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </Link>

      {/* 3. Master Profile Completion */}
      <Link
        href="/dashboard/profile"
        className="group relative bg-[#151D28] rounded-2xl p-6 border border-[#26313F] shadow-xs hover:border-[#3FA57C]/40 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col justify-between"
      >
        <div
          className={cn(
            'absolute inset-x-0 top-0 h-1 opacity-90',
            profileCompletion === 100
              ? 'bg-gradient-to-r from-[#0A6E4E] to-[#3FA57C]'
              : 'bg-gradient-to-r from-[#D9A441] to-[#3FA57C]'
          )}
        />

        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-[0.09em] text-[#78859A] block mb-1.5">
              Profile Readiness
            </span>
            <div className="flex items-baseline gap-2.5">
              <span className="text-4xl font-black text-[#E4EAF2] tracking-tight tabular-nums">
                {profileCompletion}%
              </span>
              {profileCompletion === 100 && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#123227] text-[#8FD3B6] border border-[#3FA57C]/30">
                  <ShieldCheck className="w-3 h-3" /> Verified
                </span>
              )}
            </div>
          </div>

          <div className="relative w-12 h-12 shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#1A2330]"
                strokeWidth="3.8"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={cn(
                  'transition-all duration-700 ease-out',
                  profileCompletion === 100 ? 'text-[#3FA57C]' : 'text-[#D9A441]'
                )}
                strokeWidth="3.8"
                strokeDasharray={`${profileCompletion}, 100`}
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3.5 border-t border-[#26313F] text-xs">
          <span className="font-medium text-[#9FACBE]">
            {completionMessage(profileCompletion)}
          </span>
          <span className="inline-flex items-center gap-1 font-bold text-[#3FA57C] group-hover:translate-x-0.5 transition-transform">
            {profileCompletion === 100 ? 'View Dossier' : 'Complete Now'} <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </Link>
    </div>
  )
}
