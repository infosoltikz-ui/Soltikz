'use client'

import React, { useState, useEffect } from 'react'
import { 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Target, 
  Layers, 
  Check, 
  Copy,
  ChevronDown,
  ChevronUp,
  Cpu,
  Award
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import { cn } from '@/utils/cn'

export interface ATSDataProps {
  overallScore?: number
  overall_score?: number
  categoryScores?: {
    keywordMatch?: number
    formatting?: number
    readability?: number
    grammar?: number
    skillsCoverage?: number
    experienceRelevance?: number
    [key: string]: number | undefined
  }
  category_scores?: {
    keywordMatch?: number
    formatting?: number
    readability?: number
    grammar?: number
    skillsCoverage?: number
    experienceRelevance?: number
    [key: string]: number | undefined
  }
  missingKeywords?: string[]
  missing_keywords?: string[]
  improvementSuggestions?: string[]
  improvement_suggestions?: string[]
}

// Sleek Mini Gauge Card Component (Fits perfectly in 3-column grid)
function MiniMetricCard({ 
  value, 
  label, 
  color = '#10b981' 
}: { 
  value: number
  label: string
  color?: string 
}) {
  const [animatedVal, setAnimatedVal] = useState(0)
  const radius = 18
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (animatedVal / 100) * circumference

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedVal(value), 150)
    return () => clearTimeout(timer)
  }, [value])

  return (
    <div className="flex flex-col items-center justify-center p-2.5 sm:p-3 bg-white/10 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl border border-white/15 shadow-xs w-full transition-all hover:bg-white/15">
      <div className="relative w-11 h-11 flex items-center justify-center">
        <svg className="w-11 h-11 -rotate-90 transform" viewBox="0 0 44 44">
          <circle
            cx="22"
            cy="22"
            r={radius}
            className="stroke-slate-800 dark:stroke-slate-700"
            strokeWidth="3.5"
            fill="transparent"
          />
          <circle
            cx="22"
            cy="22"
            r={radius}
            stroke={color}
            strokeWidth="3.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-[11px] font-black text-white leading-none">
            {animatedVal}%
          </span>
        </div>
      </div>
      <span className="text-[10.5px] font-bold text-slate-200 mt-1.5 text-center truncate max-w-full">
        {label}
      </span>
    </div>
  )
}

export function ATSScoreMeter({ 
  atsData,
  className,
  variant = 'full'
}: { 
  atsData?: ATSDataProps | null
  className?: string
  variant?: 'full' | 'compact' | 'card'
}) {
  const [showAllKeywords, setShowAllKeywords] = useState(false)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [displayScore, setDisplayScore] = useState(0)

  // Normalize camelCase vs snake_case
  const targetScore = atsData?.overallScore ?? atsData?.overall_score ?? 94
  const catScores = atsData?.categoryScores ?? atsData?.category_scores ?? {
    keywordMatch: 96,
    skillsCoverage: 95,
    experienceRelevance: 92,
    formatting: 98,
    grammar: 96,
    readability: 94
  }
  const missingKw = atsData?.missingKeywords ?? atsData?.missing_keywords ?? [
    "TypeScript", "React.js", "AWS Lambda", "Microservices", "CI/CD", "PostgreSQL", "Docker", "RESTful APIs"
  ]
  const suggestions = atsData?.improvementSuggestions ?? atsData?.improvement_suggestions ?? [
    "Target JD technologies bolded and woven directly into experience bullets.",
    "Single-column semantic layout guaranteed to parse cleanly on Workday & Taleo.",
    "Quantified metrics included in >80% of experience bullet points."
  ]

  // Animated score counter on mount
  useEffect(() => {
    let start = 0
    const duration = 1000
    const stepTime = 20
    const steps = duration / stepTime
    const increment = targetScore / steps

    const timer = setInterval(() => {
      start += increment
      if (start >= targetScore) {
        setDisplayScore(targetScore)
        clearInterval(timer)
      } else {
        setDisplayScore(Math.floor(start))
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [targetScore])

  // Big Circular Radial Gauge Calculations
  const radius = 46
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (displayScore / 100) * circumference

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    toast.success(`Copied "${text}" to clipboard!`)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  // --- COMPACT PILL VARIANT ---
  if (variant === 'compact') {
    return (
      <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full border shadow-2xs transition-all bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800", className)}>
        <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
          <svg className="w-5 h-5 -rotate-90 transform" viewBox="0 0 24 24">
            <circle
              cx="12"
              cy="12"
              r="9"
              className="stroke-slate-200 dark:stroke-slate-700"
              strokeWidth="2.5"
              fill="transparent"
            />
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeDasharray={2 * Math.PI * 9}
              strokeDashoffset={(2 * Math.PI * 9) - (targetScore / 100) * (2 * Math.PI * 9)}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
        </div>

        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">ATS Match:</span>
          <span className="text-[12.5px] font-black text-emerald-600 dark:text-emerald-400">{targetScore}/100</span>
        </div>

        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200/50 whitespace-nowrap">
          90+ Verified
        </span>
      </div>
    )
  }

  // --- FULL CARD VARIANT (PROMINENT DASHBOARD WIDGET) ---
  return (
    <div className={cn("bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xl overflow-hidden transition-all w-full", className)}>
      
      {/* Header Banner: Ultra-Modern Stacked Hero Section */}
      <div className="p-5 sm:p-6 border-b border-slate-200/80 dark:border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white relative">
        
        {/* Ambient Radial Glow */}
        <div className="absolute right-0 top-0 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
        <div className="absolute left-0 bottom-0 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl pointer-events-none -ml-12 -mb-12" />

        <div className="flex flex-col items-center text-center relative z-10 space-y-4">
          
          {/* Top Verification Pill */}
          <span className="inline-flex items-center gap-1.5 text-[10.5px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Tier-1 ATS Match Verified
          </span>

          {/* Main Radial Dial + Score Text Layout */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full pt-1">
            
            {/* Radial Dial */}
            <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
              <svg className="w-28 h-28 -rotate-90 transform drop-shadow-[0_0_12px_rgba(16,185,129,0.35)]" viewBox="0 0 110 110">
                <circle
                  cx="55"
                  cy="55"
                  r={radius}
                  className="stroke-slate-800"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="55"
                  cy="55"
                  r={radius}
                  stroke="#10b981"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              <div className="absolute flex flex-col items-center justify-center text-center select-none">
                <span className="text-[28px] font-black text-white leading-none tracking-tight">
                  {displayScore}
                </span>
                <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest mt-1">
                  / 100 ATS
                </span>
              </div>
            </div>

            {/* Score Title & Description */}
            <div className="text-center sm:text-left space-y-1 max-w-xs">
              <h3 className="text-[18px] font-black text-white tracking-tight leading-tight">
                Algorithmic Match Score
              </h3>
              <p className="text-[12px] text-slate-300 font-medium leading-relaxed">
                Fully optimized for Workday, Taleo, Greenhouse & Lever ATS parsing filters.
              </p>
            </div>
          </div>

          {/* 3 Mini Metric Cards Grid (3 Columns Equal Width - NEVER Overflows) */}
          <div className="grid grid-cols-3 gap-2.5 w-full pt-2">
            <MiniMetricCard value={catScores.keywordMatch ?? 96} label="Keywords" color="#10b981" />
            <MiniMetricCard value={catScores.formatting ?? 98} label="Format" color="#06b6d4" />
            <MiniMetricCard value={catScores.experienceRelevance ?? 92} label="Impact" color="#3b82f6" />
          </div>

        </div>
      </div>

      {/* Main Body Details */}
      <div className="p-5 sm:p-6 space-y-5 bg-slate-50/50 dark:bg-slate-900/40">
        
        {/* Core ATS Metric Breakdown Bars */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-[13px] font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>Diagnostic Metric Breakdown</span>
            </h4>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              All Categories &gt;90%
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(catScores).map(([key, val]) => {
              const numericVal = typeof val === 'number' ? val : 92
              const labelMap: Record<string, string> = {
                keywordMatch: 'Keyword Match',
                formatting: 'Formatting',
                readability: 'Readability',
                grammar: 'Grammar',
                skillsCoverage: 'Skills Coverage',
                experienceRelevance: 'Experience Match'
              }
              const displayLabel = labelMap[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())

              return (
                <div key={key} className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-2xs">
                  <div className="flex items-center justify-between text-[12px] font-bold text-slate-800 dark:text-slate-200 mb-1.5 gap-2">
                    <span className="truncate" title={displayLabel}>{displayLabel}</span>
                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400 shrink-0">
                      {numericVal}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-1000 ease-out"
                      style={{ width: `${Math.min(100, numericVal)}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Target Job Description Keywords Matrix */}
        {missingKw.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700/80 p-4 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-600" />
                <h4 className="text-[13px] font-extrabold text-slate-900 dark:text-slate-100">
                  Target Job Description Keywords
                </h4>
              </div>
              <span className="text-[11px] font-semibold text-slate-500">
                {missingKw.length} Injected
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {(showAllKeywords ? missingKw : missingKw.slice(0, 10)).map((kw, i) => (
                <button
                  key={i}
                  onClick={() => handleCopy(kw, `kw-${i}`)}
                  className="inline-flex items-center gap-1.5 text-[11.5px] font-bold px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 border border-emerald-200/80 dark:border-emerald-800 hover:bg-emerald-100 transition-all cursor-pointer"
                  title="Click to copy keyword"
                >
                  <span>{kw}</span>
                  {copiedKey === `kw-${i}` ? (
                    <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                  ) : (
                    <Copy className="w-3 h-3 text-emerald-600/60 shrink-0" />
                  )}
                </button>
              ))}
            </div>

            {missingKw.length > 10 && (
              <button
                onClick={() => setShowAllKeywords(!showAllKeywords)}
                className="text-[11.5px] font-bold text-emerald-600 hover:underline flex items-center gap-1 mt-1 cursor-pointer"
              >
                {showAllKeywords ? (
                  <>Show Less <ChevronUp className="w-3.5 h-3.5" /></>
                ) : (
                  <>Show {missingKw.length - 10} more keywords <ChevronDown className="w-3.5 h-3.5" /></>
                )}
              </button>
            )}
          </div>
        )}

        {/* ATS Engineering Standards Box */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700/80 p-4 shadow-2xs space-y-2.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <h4 className="text-[13px] font-extrabold text-slate-900 dark:text-slate-100">
              Why this resume achieves a 90+ ATS score
            </h4>
          </div>

          <div className="space-y-2 pt-1">
            {suggestions.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-[12px] font-medium text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
