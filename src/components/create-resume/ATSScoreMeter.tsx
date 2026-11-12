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
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import { cn } from '@/utils/cn'

export interface ATSDataProps {
  engineVersion?: string;
  overallScore?: number;
  confidence?: number;
  
  atsCompatibility?: {
    score: number;
    issues: string[];
  };
  
  jobMatch?: {
    score: number;
  };

  breakdown?: {
    requiredSkills: number;
    preferredSkills: number;
    semanticSkills: number;
    experience: number;
    title: number;
    education: number;
    certifications: number;
    responsibilities: number;
    formatting: number;
  };

  matchedRequirements?: string[];
  missingRequiredRequirements?: string[];
  missingPreferredRequirements?: string[];
  partialMatches?: string[];
  formattingIssues?: string[];
  evidence?: string[];
  
  // Legacy support
  overall_score?: number;
  missing_keywords?: string[];
  improvement_suggestions?: string[];
}

function getMetricColor(val: number) {
  if (val >= 75) return '#10b981' // emerald
  if (val >= 50) return '#f59e0b' // amber
  return '#f43f5e' // rose
}

function getScoreBadge(val: number) {
  if (val >= 75) {
    return {
      textColor: 'text-emerald-600 dark:text-emerald-400',
      barColor: 'from-emerald-500 to-teal-400',
    }
  }
  if (val >= 50) {
    return {
      textColor: 'text-amber-500 dark:text-amber-400',
      barColor: 'from-amber-500 to-yellow-400',
    }
  }
  return {
    textColor: 'text-rose-500 dark:text-rose-400',
    barColor: 'from-rose-500 to-red-400',
  }
}

function MiniMetricCard({ 
  value, 
  label, 
  color 
}: { 
  value: number
  label: string
  color?: string 
}) {
  const [animatedVal, setAnimatedVal] = useState(0)
  const radius = 18
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (animatedVal / 100) * circumference
  const strokeColor = color || getMetricColor(value)

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
            stroke={strokeColor}
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
  const [activeTab, setActiveTab] = useState<'metrics' | 'missing' | 'evidence'>('metrics')

  // Map new data structure or fallback
  const targetScore = atsData?.overallScore ?? atsData?.overall_score ?? 0;
  
  const categoryScores = (atsData as any)?.categoryScores || (atsData as any)?.category_scores || {};

  const atsCompatibility = atsData?.atsCompatibility?.score ?? categoryScores?.keywordMatch ?? categoryScores?.atsCompatibility ?? 100;
  const jobMatchScore = atsData?.jobMatch?.score ?? categoryScores?.jobMatch ?? categoryScores?.experienceRelevance ?? 0;
  
  // Deduplicate missing requirements so keywords aren't counted or displayed multiple times
  const missingKw = Array.from(new Set([
    ...(atsData?.missingRequiredRequirements || []),
    ...(atsData?.missingPreferredRequirements || []),
    ...((atsData?.missingRequiredRequirements && atsData.missingRequiredRequirements.length > 0) ? [] : (atsData?.missing_keywords || []))
  ])).filter(Boolean);

  const evidence = atsData?.evidence || atsData?.improvement_suggestions || [];

  const breakdown = atsData?.breakdown || {
    requiredSkills: categoryScores?.requiredSkills ?? categoryScores?.keywordMatch ?? 0,
    preferredSkills: categoryScores?.preferredSkills ?? categoryScores?.skillsCoverage ?? 0,
    semanticSkills: categoryScores?.semanticSkills ?? 0,
    experience: categoryScores?.experience ?? categoryScores?.experienceRelevance ?? 0,
    title: categoryScores?.title ?? 0,
    formatting: categoryScores?.formatting ?? 100,
  };

  useEffect(() => {
    let start = 0
    const duration = 1000
    const stepTime = 20
    const steps = duration / stepTime
    const increment = targetScore / steps

    if (targetScore === 0) {
      setDisplayScore(0);
      return;
    }

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

  const radius = 46
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (displayScore / 100) * circumference
  const mainScoreColor = getMetricColor(displayScore)

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(id)
    toast.success(`Copied "${text}" to clipboard!`)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  if (!atsData) {
    if (variant === 'compact') {
      return (
        <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full border shadow-2xs transition-all bg-slate-100 border-slate-200 animate-pulse", className)}>
          <span className="text-[11px] font-bold text-slate-400">Analyzing ATS...</span>
        </div>
      )
    }
    return (
       <div className={cn("bg-white rounded-3xl p-6 border shadow-xl flex items-center justify-center min-h-[400px]", className)}>
          <span className="text-slate-400 font-bold animate-pulse">Running deterministic ATS analysis...</span>
       </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={cn("inline-flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-2xs transition-all bg-white border-slate-200/90", className)}>
        <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
          <svg className="w-5 h-5 -rotate-90 transform" viewBox="0 0 24 24">
            <circle
              cx="12"
              cy="12"
              r="9"
              className="stroke-slate-200"
              strokeWidth="2.5"
              fill="transparent"
            />
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke={mainScoreColor}
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
          <span className={cn("text-[12.5px] font-black tabular-nums", displayScore >= 75 ? "text-[#059669]" : displayScore >= 50 ? "text-[#D97706]" : "text-rose-600")}>
            {targetScore}/100
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden transition-all w-full", className)}>
      <div className="p-5 sm:p-6 border-b border-slate-200/80 bg-[#0F2744] text-white relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #F59E0B 0%, transparent 70%)' }}
        />

        <div className="flex flex-col items-center text-center relative z-10 space-y-4">
          <span className="inline-flex items-center gap-1.5 text-[10.5px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 text-[#F59E0B] border border-white/15">
            <ShieldCheck className="w-4 h-4 text-[#F59E0B]" />
            Deterministic Scan Verified
          </span>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full pt-1">
            <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
              <svg className="w-28 h-28 -rotate-90 transform" viewBox="0 0 110 110">
                <circle cx="55" cy="55" r={radius} className="stroke-white/15" strokeWidth="8" fill="transparent" />
                <circle cx="55" cy="55" r={radius} stroke={mainScoreColor} strokeWidth="8" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" fill="transparent" className="transition-all duration-1000 ease-out" />
              </svg>

              <div className="absolute flex flex-col items-center justify-center text-center select-none">
                <span className="text-[28px] font-black text-white leading-none tracking-tight tabular-nums">
                  {displayScore}
                </span>
                <span className="text-[9px] font-bold text-[#F59E0B] uppercase tracking-widest mt-1">
                  / 100 ATS
                </span>
              </div>
            </div>

            <div className="text-center sm:text-left space-y-1 max-w-xs">
              <h3 className="text-[18px] font-black text-white tracking-tight leading-tight">
                Standardized ATS Match
              </h3>
              <p className="text-[12px] text-slate-300 font-medium leading-relaxed">
                Evidence-based engine v{atsData.engineVersion || '2.0.0'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 w-full pt-2">
            <MiniMetricCard value={atsCompatibility} label="ATS Compatibility" color={getMetricColor(atsCompatibility)} />
            <MiniMetricCard value={jobMatchScore} label="Job Match" color={getMetricColor(jobMatchScore)} />
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5 bg-[#F8FAFC]">
        
        {/* Navigation Tabs */}
        <div className="flex bg-slate-200/60 p-1 rounded-xl mb-4">
          <button 
            onClick={() => setActiveTab('metrics')}
            className={cn("flex-1 text-[12px] font-extrabold py-2 px-2 text-center rounded-lg transition-all cursor-pointer", activeTab === 'metrics' ? "bg-white text-[#0F2744] shadow-xs" : "text-slate-500 hover:text-slate-800")}
          >
            Diagnostic Metrics
          </button>
          <button 
            onClick={() => setActiveTab('missing')}
            className={cn("flex-1 text-[12px] font-extrabold py-2 px-2 text-center rounded-lg transition-all cursor-pointer", activeTab === 'missing' ? "bg-white text-[#0F2744] shadow-xs" : "text-slate-500 hover:text-slate-800")}
          >
            Missing ({missingKw.length})
          </button>
          <button 
            onClick={() => setActiveTab('evidence')}
            className={cn("flex-1 text-[12px] font-extrabold py-2 px-2 text-center rounded-lg transition-all cursor-pointer", activeTab === 'evidence' ? "bg-white text-[#0F2744] shadow-xs" : "text-slate-500 hover:text-slate-800")}
          >
            Evidence Log
          </button>
        </div>

        {activeTab === 'metrics' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-[13px] font-extrabold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#0F2744]" />
                <span>Diagnostic Breakdown</span>
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(breakdown).map(([key, val]) => {
                const displayLabel = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                const { textColor, barColor } = getScoreBadge(val);
                return (
                  <div key={key} className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                    <div className="flex items-center justify-between text-[12px] font-bold text-slate-800 mb-1.5 gap-2">
                      <span className="truncate" title={displayLabel}>{displayLabel}</span>
                      <span className={cn("font-extrabold shrink-0 tabular-nums", textColor)}>
                        {val}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={cn("h-full rounded-full bg-gradient-to-r transition-all duration-1000 ease-out", barColor)}
                        style={{ width: `${Math.max(val === 0 ? 0 : 3, Math.min(100, val))}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {activeTab === 'missing' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-4">
            {missingKw.length > 0 ? (
              <>
                <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-rose-500" />
                      <h4 className="text-[13px] font-extrabold text-slate-900">
                        Missing Requirements
                      </h4>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(showAllKeywords ? missingKw : missingKw.slice(0, 10)).map((kw, i) => (
                      <button
                        key={i}
                        onClick={() => handleCopy(kw, `kw-${i}`)}
                        className="inline-flex items-center gap-1.5 text-[11.5px] font-bold px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200/80 hover:bg-rose-100 transition-all cursor-pointer"
                        title="Click to copy keyword"
                      >
                        <span>{kw}</span>
                        {copiedKey === `kw-${i}` ? (
                          <Check className="w-3 h-3 text-rose-600 shrink-0" />
                        ) : (
                          <Copy className="w-3 h-3 text-rose-600/60 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>

                  {missingKw.length > 10 && (
                    <button
                      onClick={() => setShowAllKeywords(!showAllKeywords)}
                      className="text-[11.5px] font-bold text-rose-600 hover:underline flex items-center gap-1 mt-1 cursor-pointer"
                    >
                      {showAllKeywords ? (
                        <>Show Less <ChevronUp className="w-3.5 h-3.5" /></>
                      ) : (
                        <>Show {missingKw.length - 10} more keywords <ChevronDown className="w-3.5 h-3.5" /></>
                      )}
                    </button>
                  )}
                </div>

                <div className="bg-[#EEF4FA] rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D97706]" />
                    <h4 className="text-[13px] font-extrabold text-[#0F2744]">
                      Action Plan
                    </h4>
                  </div>
                  <p className="text-[12px] text-slate-600 leading-relaxed font-medium">
                    To raise your ATS score further, integrate truthful matching keywords into your skills or bullets via Master Profile.
                  </p>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-xl border border-emerald-200/80 p-6 flex flex-col items-center justify-center text-center shadow-2xs">
                <CheckCircle2 className="w-8 h-8 text-[#059669] mb-2" />
                <h4 className="text-[14px] font-bold text-slate-900">No Missing Keywords</h4>
                <p className="text-[12px] text-slate-500 mt-1">Your resume covers all required and preferred skills.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'evidence' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-[#0F2744]" />
                <h4 className="text-[13px] font-extrabold text-slate-900">
                  Scoring Evidence Log
                </h4>
              </div>

              {evidence.length > 0 ? (
                <div className="space-y-2.5">
                  {evidence.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-[12.5px] font-medium text-slate-700 bg-[#F8FAFC] p-3 rounded-xl border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-4">
                  <p className="text-[12px] text-slate-500">No scoring evidence available.</p>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
