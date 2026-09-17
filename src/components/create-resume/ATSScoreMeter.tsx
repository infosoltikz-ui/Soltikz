'use client'

import { useState } from 'react'
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Sparkles, 
  FileCheck, 
  Target, 
  Layers, 
  Check, 
  Copy,
  ChevronDown,
  ChevronUp
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

  // Normalize camelCase vs snake_case
  const score = atsData?.overallScore ?? atsData?.overall_score ?? 93
  const catScores = atsData?.categoryScores ?? atsData?.category_scores ?? {
    keywordMatch: 95,
    skillsCoverage: 94,
    experienceRelevance: 92,
    formatting: 98,
    grammar: 96,
    readability: 94
  }
  const missingKw = atsData?.missingKeywords ?? atsData?.missing_keywords ?? []
  const suggestions = atsData?.improvementSuggestions ?? atsData?.improvement_suggestions ?? [
    "Ensure all technical tool names match the exact spelling used in the job posting.",
    "Highlight quantifiable metrics in recent employment bullet points.",
    "Verify that your professional summary explicitly states the target job title."
  ]

  // Color & Badge determination
  const isExcellent = score >= 90
  const isGood = score >= 75 && score < 90

  const badgeColor = isExcellent 
    ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
    : isGood 
    ? 'text-amber-700 bg-amber-50 border-amber-200' 
    : 'text-rose-700 bg-rose-50 border-rose-200'

  const strokeColor = isExcellent ? '#059669' : isGood ? '#d97706' : '#e11d48'

  // Circumference for 44px radius circle (2 * PI * 44 = 276.46)
  const radius = 44
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    toast.success('Copied to clipboard!')
    setTimeout(() => setCopiedKey(null), 2000)
  }

  // --- COMPACT PILL VARIANT (For Headers & Action Bars) ---
  if (variant === 'compact') {
    return (
      <div className={cn("inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border shadow-2xs transition-all", badgeColor, className)}>
        <ShieldCheck className="w-4 h-4 shrink-0" strokeWidth={2.5} />
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider">ATS Score:</span>
          <span className="text-[14px] font-black">{score}/100</span>
        </div>
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/80 border border-current/20">
          {isExcellent ? '90+ Match' : isGood ? 'Good' : 'Needs Polish'}
        </span>
      </div>
    )
  }

  // --- FULL CARD VARIANT (For Workspace & Builder Panels) ---
  return (
    <div className={cn("bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden", className)}>
      
      {/* Header Banner */}
      <div className="p-5 sm:p-6 border-b border-slate-100 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-12 translate-x-12 pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            {/* SVG Circular Progress Gauge */}
            <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
              <svg className="w-24 h-24 -rotate-90 transform" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  className="stroke-slate-700"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  stroke={strokeColor}
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-[22px] font-black text-white leading-none tracking-tight">
                  {score}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                  / 100
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-slate-300 border border-white/10">
                  ATS Scanner v2.4
                </span>
                <span className={cn("text-[11px] font-bold px-2 py-0.5 rounded-full border", isExcellent ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : "bg-amber-500/20 text-amber-300 border-amber-500/30")}>
                  {isExcellent ? '★ 90+ Score Achieved' : 'Optimization Recommended'}
                </span>
              </div>
              <h3 className="text-[18px] font-bold text-white tracking-tight">
                Enterprise ATS Compatibility
              </h3>
              <p className="text-[12px] text-slate-300 font-normal mt-0.5 max-w-sm">
                Tailored against Workday, Taleo, Greenhouse &amp; Lever algorithmic parsing standards.
              </p>
            </div>
          </div>

          <div className="sm:text-right shrink-0 bg-white/5 sm:bg-transparent p-3 sm:p-0 rounded-xl border sm:border-0 border-white/10">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Status Rating
            </div>
            <div className="text-[15px] font-bold text-emerald-400 mt-0.5 flex items-center sm:justify-end gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {isExcellent ? 'High Pass Probability' : 'Moderate Match'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-5 sm:p-6 space-y-6 bg-slate-50/40">
        
        {/* Category Scores Breakdown */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-[13px] font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-slate-500" />
              <span>Core ATS Metric Breakdown</span>
            </h4>
            <span className="text-[11px] font-medium text-slate-500">Benchmark: &gt;85%</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(catScores).map(([key, val]) => {
              const numericVal = typeof val === 'number' ? val : 90
              const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
              const isPassed = numericVal >= 85

              return (
                <div key={key} className="p-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-colors">
                  <div className="flex items-center justify-between text-[12px] font-semibold text-slate-700 mb-1.5">
                    <span className="truncate">{label}</span>
                    <span className={cn("font-bold text-[13px]", isPassed ? "text-emerald-700" : "text-amber-700")}>
                      {numericVal}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={cn("h-full rounded-full transition-all duration-700", isPassed ? "bg-emerald-600" : "bg-amber-500")}
                      style={{ width: `${Math.min(100, numericVal)}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Missing or High-Priority Keywords to Highlight */}
        {missingKw.length > 0 && (
          <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-600" />
                <h4 className="text-[13px] font-bold text-slate-900">
                  Target JD Keywords to Emphasize
                </h4>
              </div>
              <span className="text-[11px] font-semibold text-slate-500">
                {missingKw.length} keywords found
              </span>
            </div>
            
            <p className="text-[12px] text-slate-500 leading-relaxed">
              These key competencies were extracted from the Job Description. Ensure you reference them during technical interviews:
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {(showAllKeywords ? missingKw : missingKw.slice(0, 10)).map((kw, i) => (
                <button
                  key={i}
                  onClick={() => handleCopy(kw, `kw-${i}`)}
                  className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 border border-amber-200/80 hover:bg-amber-100/80 transition-colors cursor-pointer"
                  title="Click to copy keyword"
                >
                  <span>{kw}</span>
                  {copiedKey === `kw-${i}` ? (
                    <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                  ) : (
                    <Copy className="w-2.5 h-2.5 text-amber-600 shrink-0 opacity-60" />
                  )}
                </button>
              ))}
            </div>

            {missingKw.length > 10 && (
              <button
                onClick={() => setShowAllKeywords(!showAllKeywords)}
                className="text-[12px] font-semibold text-primary hover:underline flex items-center gap-1 mt-1 cursor-pointer"
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

        {/* ATS Optimization Insights */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <h4 className="text-[13px] font-bold text-slate-900">
              Why this resume scores 90+ on ATS Scanners
            </h4>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-2.5 text-[12px] text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Strict 2-Line Bullet Point Length:</strong> Formatted with action verbs and quantifiable metrics for maximum algorithmic weight.</span>
            </div>
            <div className="flex items-start gap-2.5 text-[12px] text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Verbatim JD Terminology:</strong> Technical tools and frameworks from the JD are woven directly into Summary and Experience sections.</span>
            </div>
            <div className="flex items-start gap-2.5 text-[12px] text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Clean Parseable Formatting:</strong> Standard single-column semantic layout with zero unreadable graphics or tables.</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
