'use client'

import { useEffect, useState } from 'react'
import { Check, CheckCircle2, FileText, Sparkles } from 'lucide-react'
import { cn } from '@/utils/cn'

interface AIGenerationLoadingHUDProps {
  currentState: string
  companyName?: string
  jobRole?: string
}

export function AIGenerationLoadingHUD({
  currentState,
  companyName = '',
  jobRole = '',
}: AIGenerationLoadingHUDProps) {
  const [progress, setProgress] = useState(18)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (currentState.includes('Parsing') || currentState.includes('Extracting')) {
      setProgress(26)
    } else if (currentState.includes('Strategy') || currentState.includes('Aligning')) {
      setProgress(52)
    } else if (
      currentState.includes('Generating') ||
      currentState.includes('Resume') ||
      currentState.includes('Synthesis')
    ) {
      setProgress(78)
    } else if (
      currentState.includes('Finalizing') ||
      currentState.includes('ATS') ||
      currentState.includes('Scoring')
    ) {
      setProgress(94)
    }
  }, [currentState])

  const stages = [
    {
      title: 'Analyzing Job Description',
      detail: 'Extracting role requirements, tech stack, and priorities',
      completed: progress >= 45,
      active: progress < 45,
    },
    {
      title: 'Mapping Master Profile',
      detail: 'Matching your verified projects and career milestones',
      completed: progress >= 70,
      active: progress >= 45 && progress < 70,
    },
    {
      title: 'Writing Tailored Resume',
      detail: 'Drafting executive summary and impact bullets',
      completed: progress >= 90,
      active: progress >= 70 && progress < 90,
    },
    {
      title: 'Verifying ATS Compatibility',
      detail: 'Checking keyword alignment, scoring, and interview prep',
      completed: progress >= 98,
      active: progress >= 90,
    },
  ]

  const completedStagesCount = stages.filter((s) => s.completed).length
  const railHeightPercent = Math.min(100, Math.round(((completedStagesCount + 0.45) / stages.length) * 100))

  const ringRadius = 22
  const ringCircumference = 2 * Math.PI * ringRadius
  const ringOffset = ringCircumference - (progress / 100) * ringCircumference

  const formattedTime = `00:${String(elapsedSeconds).padStart(2, '0')}`
  const weavingTokens = [
    jobRole || 'Role Focus',
    companyName || 'Target Org',
    'ATS Keywords',
  ]

  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-lg shadow-slate-900/5 overflow-hidden">
        {/* Top Executive Progress Banner */}
        <div className="bg-[#0F2744] text-white px-6 py-5 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#F59E0B] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Resume Synthesis</span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight truncate">
              {jobRole && companyName
                ? `Tailoring for ${jobRole} at ${companyName}`
                : 'Building Your Tailored Resume'}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5 truncate">
              {currentState || 'Preparing tailored resume sections...'}
            </p>
          </div>

          {/* Right: Live Timer + Smooth SVG Circular Gauge */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden sm:block text-right">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Elapsed
              </span>
              <span className="text-xs font-bold text-white tabular-nums">{formattedTime}</span>
            </div>

            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                <circle
                  cx="28"
                  cy="28"
                  r={ringRadius}
                  stroke="rgba(255,255,255,0.14)"
                  strokeWidth="4"
                  fill="none"
                />
                <circle
                  cx="28"
                  cy="28"
                  r={ringRadius}
                  stroke="#F59E0B"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={ringCircumference}
                  strokeDashoffset={ringOffset}
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <span className="absolute text-xs font-extrabold text-white tabular-nums">
                {progress}%
              </span>
            </div>
          </div>
        </div>

        {/* Main Split Animation Body */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-7 items-center bg-gradient-to-b from-slate-50/50 to-white">
          {/* Left: Animated Live Page Assembly Visual */}
          <div className="md:col-span-5 flex flex-col items-center">
            {/* Floating Keywords Weaving Into Sheet */}
            <div className="flex items-center justify-center gap-2 mb-3 h-7 overflow-hidden">
              {weavingTokens.map((token, idx) => (
                <span
                  key={`${token}-${idx}`}
                  style={{ animationDelay: `${idx * 0.7}s` }}
                  className="px-2.5 py-0.5 rounded-full bg-[#EEF4FA] border border-[#0F2744]/15 text-[10.5px] font-bold text-[#0F2744] truncate max-w-[110px] animate-[weave-drop_2.8s_ease-in-out_infinite]"
                >
                  {token}
                </span>
              ))}
            </div>

            {/* Animated Miniature A4 Document Sheet */}
            <div className="w-full max-w-[240px] relative animate-[float-slow_4s_ease-in-out_infinite]">
              <div
                aria-hidden="true"
                className="absolute inset-x-3 -bottom-2 h-full rounded-xl bg-slate-200/70 border border-slate-200"
              />
              <div className="relative bg-white rounded-xl border border-slate-200/90 shadow-md p-4 space-y-3">
                {/* Header Block (Stage 1) */}
                <div
                  className={cn(
                    'pb-2.5 border-b border-slate-100 transition-all duration-500',
                    progress >= 25 ? 'opacity-100' : 'opacity-40'
                  )}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div
                      className={cn(
                        'h-2.5 rounded-full transition-all duration-700',
                        progress >= 25 ? 'w-24 bg-[#0F2744]' : 'w-14 bg-slate-200'
                      )}
                    />
                    <FileText className="w-3.5 h-3.5 text-[#F59E0B]" />
                  </div>
                  <div
                    className={cn(
                      'h-1.5 rounded-full transition-all duration-700',
                      progress >= 25 ? 'w-32 bg-amber-500/70' : 'w-20 bg-slate-200'
                    )}
                  />
                </div>

                {/* Summary & Strategy Lines (Stage 2) */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0F2744]" />
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                      Summary
                    </span>
                  </div>
                  {[100, 92, 76].map((w, i) => (
                    <div key={i} className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        style={{
                          width: progress >= 50 ? `${w}%` : progress >= 26 ? '45%' : '18%',
                          transitionDelay: `${i * 120}ms`,
                        }}
                        className={cn(
                          'h-full rounded-full transition-all duration-700 ease-out',
                          progress >= 50 ? 'bg-slate-600' : 'bg-slate-300'
                        )}
                      />
                    </div>
                  ))}
                </div>

                {/* Tailored Experience Bullets (Stage 3) */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                      Experience
                    </span>
                  </div>
                  {[95, 88, 82].map((w, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span
                        className={cn(
                          'w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-300',
                          progress >= 75 ? 'bg-emerald-500' : 'bg-slate-200'
                        )}
                      />
                      <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          style={{
                            width: progress >= 75 ? `${w}%` : '22%',
                            transitionDelay: `${i * 140}ms`,
                          }}
                          className={cn(
                            'h-full rounded-full transition-all duration-700 ease-out',
                            progress >= 75 ? 'bg-[#0F2744]/75' : 'bg-slate-200'
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* ATS Verification Stamp (Stage 4) */}
                <div
                  className={cn(
                    'pt-2 border-t border-slate-100 flex items-center justify-between transition-all duration-500',
                    progress >= 90 ? 'opacity-100 translate-y-0' : 'opacity-45 translate-y-0.5'
                  )}
                >
                  <div className="flex gap-1">
                    <span className="h-3 w-8 rounded bg-[#EEF4FA]" />
                    <span className="h-3 w-10 rounded bg-[#FEF3C7]" />
                  </div>
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 text-[9.5px] font-extrabold px-2 py-0.5 rounded-full transition-colors',
                      progress >= 90
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-400'
                    )}
                  >
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    ATS Ready
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Continuous Connected Milestone Rail */}
          <div className="md:col-span-7 relative pl-1">
            {/* Vertical Connecting Track */}
            <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="w-full bg-gradient-to-b from-emerald-500 via-[#0F2744] to-[#F59E0B] transition-all duration-700 ease-out"
                style={{ height: `${railHeightPercent}%` }}
              />
            </div>

            <div className="space-y-4">
              {stages.map((stage, idx) => (
                <div
                  key={stage.title}
                  className={cn(
                    'relative flex items-start gap-3.5 rounded-xl p-3 transition-all duration-300',
                    stage.active
                      ? 'bg-white border border-[#0F2744]/20 shadow-xs'
                      : stage.completed
                      ? 'bg-emerald-50/40 border border-emerald-200/60'
                      : 'bg-transparent border border-transparent opacity-60'
                  )}
                >
                  {/* Step Node Circle */}
                  <div className="relative z-10 mt-0.5 shrink-0">
                    {stage.completed ? (
                      <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs animate-in zoom-in-75 duration-200">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    ) : stage.active ? (
                      <div className="relative w-7 h-7 rounded-full bg-[#0F2744] text-[#F59E0B] flex items-center justify-center shadow-xs">
                        <span className="absolute inset-0 rounded-full bg-[#F59E0B]/30 animate-ping" />
                        <span className="relative text-[11px] font-extrabold tabular-nums">
                          {idx + 1}
                        </span>
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-white border-2 border-slate-200 text-slate-400 flex items-center justify-center text-[11px] font-bold tabular-nums">
                        {idx + 1}
                      </div>
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4
                        className={cn(
                          'text-[13.5px] font-bold',
                          stage.active || stage.completed ? 'text-slate-900' : 'text-slate-500'
                        )}
                      >
                        {stage.title}
                      </h4>
                      {stage.active && (
                        <span className="text-[10.5px] font-bold text-[#D97706] bg-[#FEF3C7] px-2 py-0.5 rounded-full">
                          In Progress
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                      {stage.detail}
                    </p>

                    {/* Active Indeterminate Shimmer Track */}
                    {stage.active && (
                      <div className="mt-2.5 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full w-2/5 bg-gradient-to-r from-[#0F2744] to-[#F59E0B] rounded-full animate-[bar-indeterminate_1.6s_ease-in-out_infinite]" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
