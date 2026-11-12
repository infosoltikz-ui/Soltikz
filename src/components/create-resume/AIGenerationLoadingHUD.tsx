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
    <div className="absolute inset-0 bg-white/95 backdrop-blur-xl z-20 flex flex-col items-center justify-center p-6 sm:p-10 rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden animate-in fade-in duration-300">
      
      {/* Background Ambient Radial Glow */}
      <div
        className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #0F2744 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #F59E0B 0%, transparent 70%)' }}
      />

      {/* Main Centerpiece: Executive AI Orb */}
      <div className="relative flex items-center justify-center mb-8 mt-4">
        <div className="absolute w-32 h-32 rounded-full bg-[#EEF4FA] blur-xl pointer-events-none" />
        
        {/* Outer Spinning Ring */}
        <div className="absolute w-24 h-24 rounded-full border-2 border-slate-200/70 border-t-[#0F2744] animate-[spin_3s_linear_infinite]" />
        
        {/* Inner Spinning Ring (Opposite direction) */}
        <div className="absolute w-16 h-16 rounded-full border-2 border-slate-200/70 border-b-[#F59E0B] animate-[spin_2s_linear_infinite_reverse]" />

        {/* Center Navy Core */}
        <div className="relative w-11 h-11 rounded-2xl bg-[#0F2744] flex items-center justify-center shadow-lg shadow-slate-900/20">
          <Sparkles className="w-5 h-5 text-[#F59E0B]" />
        </div>
      </div>

      {/* Text Header */}
      <div className="text-center relative z-10 max-w-lg w-full space-y-4">
        
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF4FA] border border-slate-200/80 text-[11.5px] font-bold text-[#0F2744] mb-2.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#059669]" />
            <span>AI Resume Intelligence Engine</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Crafting Your Tailored Resume
          </h3>

          <p className="text-[13.5px] font-medium text-slate-600 mt-1.5 h-6">
            {currentState || 'Optimizing ATS Keywords & Bullet Points'}
            <span className="text-[#D97706] font-bold">{dots}</span>
          </p>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2.5 p-0.5 border border-slate-200/80 overflow-hidden shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-[#0F2744] via-[#1E3A5F] to-[#F59E0B] rounded-full transition-all duration-700 ease-out"
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
                  ? "bg-emerald-50/80 border-emerald-200/90 text-emerald-950 shadow-2xs" 
                  : st.active
                  ? "bg-white border-[#0F2744]/40 text-slate-900 shadow-xs ring-1 ring-[#0F2744]/15"
                  : "bg-[#F8FAFC] border-slate-200/60 text-slate-400"
              )}
            >
              <div className="mt-0.5 shrink-0">
                {st.completed ? (
                  <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                ) : st.active ? (
                  <Loader2 className="w-4 h-4 text-[#D97706] animate-spin" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[9px] font-bold text-slate-400">
                    {i + 1}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <div className="font-bold text-[12.5px] leading-tight truncate">
                  {st.label}
                </div>
                <div className="text-[11px] text-slate-500 leading-tight mt-0.5 truncate">
                  {st.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Executive Trust Badges Footer */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-[11.5px] font-semibold text-slate-500 border-t border-slate-100">
          <span className="flex items-center gap-1.5 text-slate-700">
            <Target className="w-3.5 h-3.5 text-[#059669]" /> 90+ ATS Score Target
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1.5 text-slate-700">
            <FileText className="w-3.5 h-3.5 text-[#0F2744]" /> Strict 2-Line Bullets
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1.5 text-slate-700">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D97706]" /> Enterprise Privacy
          </span>
        </div>

      </div>

    </div>
  )
}
