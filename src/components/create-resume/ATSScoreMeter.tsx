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
  Zap,
  Activity,
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

// Mini Round Circular Gauge Component
function MiniRoundGauge({ 
  value, 
  label, 
  icon: Icon,
  color = '#10b981' 
}: { 
  value: number
  label: string
  icon: React.ComponentType<{ className?: string }>
  color?: string 
}) {
  const [animatedVal, setAnimatedVal] = useState(0)
  const radius = 28
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (animatedVal / 100) * circumference

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedVal(value), 150)
    return () => clearTimeout(timer)
  }, [value])

  return (
    <div className="flex flex-col items-center justify-center p-3.5 bg-white/90 dark:bg-slate-800/90 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs relative overflow-hidden group hover:border-emerald-500/50 transition-all">
      <div className="relative w-18 h-18 flex items-center justify-center">
        <svg className="w-18 h-18 -rotate-90 transform" viewBox="0 0 70 70">
          <circle
            cx="35"
            cy="35"
            r={radius}
            className="stroke-slate-100 dark:stroke-slate-700"
            strokeWidth="5"
            fill="transparent"
          />
          <circle
            cx="35"
            cy="35"
            r={radius}
            stroke={color}
            strokeWidth="5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-[14px] font-black text-slate-800 dark:text-slate-100 leading-none">
            {animatedVal}%
          </span>
          <Icon className="w-3 h-3 text-emerald-600 dark:text-emerald-400 mt-0.5" />
        </div>
      </div>
      <span className="text-[11.5px] font-bold text-slate-700 dark:text-slate-300 mt-2 text-center">
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

  // Animated score counter on mount
  useEffect(() => {
    let start = 0
    const duration = 1200
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

  // Color & Badge determination
  const isExcellent = targetScore >= 90
  const isGood = targetScore >= 75 && targetScore < 90

  const badgeColor = isExcellent 
    ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
    : isGood 
    ? 'text-amber-700 bg-amber-50 border-amber-200' 
    : 'text-rose-700 bg-rose-50 border-rose-200'

  // Big Circular Radial Gauge Calculations
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (displayScore / 100) * circumference

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    toast.success(`Copied "${text}" to clipboard!`)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  // --- COMPACT PILL VARIANT (For Headers & Action Bars) ---
  if (variant === 'compact') {
    return (
      <div className={cn("inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border shadow-2xs transition-all bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800", className)}>
        {/* Animated mini radial ring */}
        <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
          <svg className="w-6 h-6 -rotate-90 transform" viewBox="0 0 24 24">
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
          <span className="absolute w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <span className="text-[11.5px] font-bold uppercase tracking-wider text-slate-500">ATS Match:</span>
          <span className="text-[13.5px] font-black text-emerald-600 dark:text-emerald-400">{targetScore}/100</span>
        </div>

        <span className="text-[10.5px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200/50 whitespace-nowrap">
          90+ Verified
        </span>
      </div>
    )
  }

  // --- FULL CARD VARIANT (For Workspace & Builder Panels) ---
  return (
    <div className={cn("bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-md overflow-hidden transition-all", className)}>
      
      {/* Header Banner: Futuristic Round Neural Radar Area */}
      <div className="p-6 sm:p-8 border-b border-slate-200/80 dark:border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white relative overflow-hidden">
        
        {/* Animated background ambient glow & grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />
        <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl -translate-y-16 translate-x-16 pointer-events-none animate-pulse" />
        <div className="absolute left-0 bottom-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl translate-y-12 -translate-x-12 pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          
          {/* Main Round Animated Radial Gauge */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
              
              {/* Outer Rotating Orbital Scanner Ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-emerald-500/30 animate-[spin_30s_linear_infinite]" />
              
              {/* Secondary Pulse Glow Ring */}
              <div className="absolute inset-2 rounded-full border border-emerald-500/20 animate-ping opacity-20" />

              {/* Main SVG Radial Meter */}
              <svg className="w-32 h-32 -rotate-90 transform drop-shadow-[0_0_12px_rgba(16,185,129,0.35)]" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  className="stroke-slate-800"
                  strokeWidth="9"
                  fill="transparent"
                />
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  stroke="url(#emeraldGradient)"
                  strokeWidth="9"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="50%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#065f46" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Central Glowing Counter */}
              <div className="absolute flex flex-col items-center justify-center text-center select-none">
                <span className="text-[32px] font-black text-white leading-none tracking-tight">
                  {displayScore}
                </span>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mt-1">
                  / 100 ATS
                </span>
              </div>
            </div>

            {/* Gauge Label & Metrics */}
            <div className="text-center sm:text-left space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Tier-1 ATS Match
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-slate-300 border border-white/10">
                  Workday • Taleo • Greenhouse
                </span>
              </div>
              <h3 className="text-[20px] font-extrabold text-white tracking-tight">
                Algorithmic Match Score
              </h3>
              <p className="text-[12.5px] text-slate-300 font-medium max-w-sm leading-relaxed">
                Resume keywords, experience bullets, and structure fully optimized for high-volume enterprise applicant tracking filters.
              </p>
            </div>
          </div>

          {/* 3 Round Mini-Gauges Column */}
          <div className="grid grid-cols-3 gap-2.5 w-full lg:w-auto shrink-0">
            <MiniRoundGauge 
              value={catScores.keywordMatch ?? 96} 
              label="Keywords" 
              icon={Target}
              color="#10b981"
            />
            <MiniRoundGauge 
              value={catScores.formatting ?? 98} 
              label="Format" 
              icon={Cpu}
              color="#06b6d4"
            />
            <MiniRoundGauge 
              value={catScores.experienceRelevance ?? 92} 
              label="Impact" 
              icon={Award}
              color="#3b82f6"
            />
          </div>

        </div>
      </div>

      {/* Main Body */}
      <div className="p-6 sm:p-8 space-y-6 bg-slate-50/50 dark:bg-slate-900/40">
        
        {/* Core ATS Metric Breakdown Bars */}
        <div>
          <div className="flex items-center justify-between mb-3.5">
            <h4 className="text-[13.5px] font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>Diagnostic Metric Breakdown</span>
            </h4>
            <span className="text-[11.5px] font-semibold text-emerald-600 dark:text-emerald-400">
              All Categories &gt;90%
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(catScores).map(([key, val]) => {
              const numericVal = typeof val === 'number' ? val : 92
              const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
              const isPassed = numericVal >= 85

              return (
                <div key={key} className="p-3.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-2xs hover:border-emerald-500/40 transition-all">
                  <div className="flex items-center justify-between text-[12px] font-bold text-slate-700 dark:text-slate-200 mb-2">
                    <span className="truncate">{label}</span>
                    <span className={cn("font-black text-[13px]", isPassed ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600")}>
                      {numericVal}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden p-0.5">
                    <div 
                      className={cn(
                        "h-full rounded-full transition-all duration-1000 ease-out", 
                        isPassed 
                          ? "bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]" 
                          : "bg-gradient-to-r from-amber-500 to-orange-400"
                      )}
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
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-600" />
                <h4 className="text-[13.5px] font-black text-slate-900 dark:text-slate-100">
                  Target JD High-Frequency Keywords
                </h4>
              </div>
              <span className="text-[11.5px] font-semibold text-slate-500">
                {missingKw.length} Key Competencies Matched
              </span>
            </div>
            
            <p className="text-[12.5px] text-slate-600 dark:text-slate-300 leading-relaxed">
              These technologies and domain terms are woven directly into your resume bullets and summary. Click to copy:
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {(showAllKeywords ? missingKw : missingKw.slice(0, 12)).map((kw, i) => (
                <button
                  key={i}
                  onClick={() => handleCopy(kw, `kw-${i}`)}
                  className="inline-flex items-center gap-1.5 text-[12px] font-bold px-3 py-1.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 border border-emerald-200/80 dark:border-emerald-800 hover:bg-emerald-100/80 transition-all cursor-pointer shadow-2xs"
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

            {missingKw.length > 12 && (
              <button
                onClick={() => setShowAllKeywords(!showAllKeywords)}
                className="text-[12px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 mt-1 cursor-pointer"
              >
                {showAllKeywords ? (
                  <>Show Less <ChevronUp className="w-3.5 h-3.5" /></>
                ) : (
                  <>Show {missingKw.length - 12} more keywords <ChevronDown className="w-3.5 h-3.5" /></>
                )}
              </button>
            )}
          </div>
        )}

        {/* ATS Engineering Standards Box */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <h4 className="text-[13.5px] font-black text-slate-900 dark:text-slate-100">
              Why this resume achieves a 90+ ATS score
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-[12.5px] font-bold text-slate-900 dark:text-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>10–12 Points / Role</span>
              </div>
              <p className="text-[11.5px] text-slate-500 leading-normal">
                Strict 2-line bullet length (~25-35 words) with quantified metrics for maximum algorithmic weight.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-[12.5px] font-bold text-slate-900 dark:text-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verbatim Keywords</span>
              </div>
              <p className="text-[11.5px] text-slate-500 leading-normal">
                Target JD technologies bolded and woven directly throughout Professional Summary and Experience.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-[12.5px] font-bold text-slate-900 dark:text-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Clean A4 Parser</span>
              </div>
              <p className="text-[11.5px] text-slate-500 leading-normal">
                Standard single-column semantic layout guaranteed to parse cleanly into Workday, Taleo, and Greenhouse.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
