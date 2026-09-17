'use client'

import { useEffect, useState } from 'react'
import { Sparkles, ShieldCheck, CheckCircle2, Loader2, FileText, Target, Award } from 'lucide-react'
import { cn } from '@/utils/cn'

export function AIGenerationLoadingHUD({ currentState }: { currentState: string }) {
  const [dots, setDots] = useState('')
  const [progress, setProgress] = useState(20)

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'))
    }, 400)
    return () => clearInterval(dotInterval)
  }, [])

  // Smoothly increment simulated progress based on orchestrator state
  useEffect(() => {
    if (currentState.includes('Parsing') || currentState.includes('Extracting')) {
      setProgress(30)
    } else if (currentState.includes('Strategy') || currentState.includes('Aligning')) {
      setProgress(58)
    } else if (currentState.includes('Generating') || currentState.includes('Resume') || currentState.includes('Synthesis')) {
      setProgress(84)
    } else if (currentState.includes('Finalizing') || currentState.includes('ATS') || currentState.includes('Scoring')) {
      setProgress(96)
    }
  }, [currentState])

  const stages = [
    { 
      label: 'Job Description Parsing', 
      desc: 'Extracting required technical keywords & qualifications',
      completed: progress >= 50,
      active: progress < 50
    },
    { 
      label: 'Strategic Alignment', 
      desc: 'Positioning candidate profile to match role expectations',
      completed: progress >= 75,
      active: progress >= 50 && progress < 75
    },
    { 
      label: '2-Line Bullet Point Synthesis', 
      desc: 'Generating 10–12 action bullets per company with metrics',
      completed: progress >= 90,
      active: progress >= 75 && progress < 90
    },
    { 
      label: '90+ ATS Score Verification', 
      desc: 'Ensuring formatting compliance for Workday, Taleo & Greenhouse',
      completed: progress >= 98,
      active: progress >= 90
    },
  ]

  return (
    <div className="absolute inset-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center p-6 sm:p-10 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden animate-in fade-in duration-300">
      
      {/* Background Ambient Mesh Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-y-24 translate-x-24 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl translate-y-24 -translate-x-24 pointer-events-none" />

      {/* Main Centerpiece: Elegant Executive AI Orb */}
      <div className="relative flex items-center justify-center mb-6">
        
        {/* Outer Gentle Pulse Ring */}
        <div className="absolute w-28 h-28 rounded-full bg-emerald-500/10 animate-ping opacity-30 pointer-events-none" />
        
        {/* Smooth Spinning Gradient Ring */}
        <div className="w-24 h-24 rounded-full border-2 border-slate-200 dark:border-slate-700 border-t-emerald-600 dark:border-t-emerald-400 border-r-teal-500 animate-[spin_2s_linear_infinite]" />

        {/* Center Glowing Icon */}
        <div className="absolute w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-600/25">
          <Sparkles className="w-8 h-8 text-white animate-pulse" />
        </div>
      </div>

      {/* Text Header */}
      <div className="text-center relative z-10 max-w-lg w-full space-y-4">
        
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800 text-[11.5px] font-bold text-emerald-800 dark:text-emerald-300 mb-2.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>AI Resume Intelligence Engine</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Crafting Your Tailored Resume
          </h3>

          <p className="text-[13.5px] font-medium text-slate-600 dark:text-slate-300 mt-1.5 h-6">
            {currentState || 'Optimizing ATS Keywords & Bullet Points'}
            <span className="text-emerald-600 font-bold">{dots}</span>
          </p>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 p-0.5 border border-slate-200/80 dark:border-slate-700 overflow-hidden shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Professional Multi-Stage Pipeline Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-left">
          {stages.map((st, i) => (
            <div 
              key={i} 
              className={cn(
                "p-3 rounded-xl border text-[12px] transition-all flex items-start gap-2.5",
                st.completed
                  ? "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-200/90 dark:border-emerald-800/80 text-emerald-900 dark:text-emerald-200 shadow-2xs" 
                  : st.active
                  ? "bg-white dark:bg-slate-800 border-emerald-500/80 text-slate-900 dark:text-slate-100 shadow-xs ring-1 ring-emerald-500/20"
                  : "bg-slate-50/60 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800 text-slate-400"
              )}
            >
              <div className="mt-0.5 shrink-0">
                {st.completed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                ) : st.active ? (
                  <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center text-[9px] font-bold text-slate-400">
                    {i + 1}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <div className="font-bold text-[12.5px] leading-tight truncate">
                  {st.label}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5 truncate">
                  {st.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Executive Trust Badges Footer */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-[11.5px] font-semibold text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
          <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <Target className="w-3.5 h-3.5 text-emerald-600" /> 90+ ATS Score Target
          </span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <FileText className="w-3.5 h-3.5 text-teal-600" /> Strict 2-Line Bullets
          </span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Enterprise Privacy
          </span>
        </div>

      </div>

    </div>
  )
}
