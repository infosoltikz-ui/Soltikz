'use client'

import { useEffect, useState } from 'react'
import { Cpu, Sparkles, ShieldCheck, Zap, Terminal, Activity, Layers } from 'lucide-react'
import { cn } from '@/utils/cn'

export function AIGenerationLoadingHUD({ currentState }: { currentState: string }) {
  const [dots, setDots] = useState('')
  const [progress, setProgress] = useState(15)

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'))
    }, 400)
    return () => clearInterval(dotInterval)
  }, [])

  // Smoothly increment simulated progress based on orchestrator state
  useEffect(() => {
    if (currentState.includes('Parsing')) {
      setProgress(28)
    } else if (currentState.includes('Strategy')) {
      setProgress(55)
    } else if (currentState.includes('Generating') || currentState.includes('Resume')) {
      setProgress(82)
    } else if (currentState.includes('Finalizing') || currentState.includes('ATS')) {
      setProgress(96)
    }
  }, [currentState])

  const stages = [
    { label: 'Deep JD Keyword Extraction', active: currentState.includes('Parsing') || progress >= 25 },
    { label: 'Strategic Alignment & Positioning', active: currentState.includes('Strategy') || progress >= 50 },
    { label: '2-Line Bullet Point Synthesis', active: currentState.includes('Generating') || progress >= 75 },
    { label: '90+ ATS Scoring & Formatting', active: currentState.includes('Finalizing') || progress >= 95 },
  ]

  return (
    <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl border border-emerald-500/40 shadow-2xl overflow-hidden animate-in fade-in duration-300">
      
      {/* Background Cyber Grid & Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
      <div className="absolute w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl translate-x-24 -translate-y-24 pointer-events-none" />

      {/* Main Holographic Centerpiece */}
      <div className="relative flex items-center justify-center mb-6">
        
        {/* Outer Pulsing Glow */}
        <div className="absolute w-36 h-36 rounded-full bg-emerald-500/20 blur-xl animate-pulse" />

        {/* Outer Rotating Cyber Ring (Clockwise) */}
        <div className="w-32 h-32 rounded-full border-2 border-dashed border-emerald-400/60 animate-[spin_8s_linear_infinite]" />

        {/* Middle Rotating Cyan Ring (Counter-Clockwise) */}
        <div className="absolute w-24 h-24 rounded-full border-2 border-cyan-400/70 border-t-transparent border-b-transparent animate-[spin_4s_linear_infinite_reverse]" />

        {/* Inner Glowing Core */}
        <div className="absolute w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-emerald-500/50 animate-pulse">
          <Cpu className="w-8 h-8 text-white animate-bounce" />
        </div>

        {/* Floating Cyber Particle Badges */}
        <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/60 text-[10px] font-mono font-bold text-emerald-300 backdrop-blur-xs flex items-center gap-1 shadow-xs">
          <Activity className="w-3 h-3 animate-spin" />
          <span>AI ACTIVE</span>
        </div>
      </div>

      {/* Terminal Cyber Text */}
      <div className="text-center relative z-10 max-w-md w-full space-y-3">
        
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[11px] font-mono font-bold text-emerald-400 mb-2 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>NEURAL ATS GENERATOR v4.0</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center justify-center gap-2">
            <span>Synthesizing Tailored Resume</span>
          </h3>

          <p className="text-[13px] font-mono font-semibold text-cyan-300 mt-1 h-6">
            {currentState || 'Optimizing ATS Keywords'}
            <span className="text-emerald-400">{dots}</span>
          </p>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="w-full bg-slate-900 rounded-full h-2.5 p-0.5 border border-slate-700 shadow-inner overflow-hidden relative">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 rounded-full transition-all duration-500 ease-out relative shadow-[0_0_12px_rgba(16,185,129,0.8)]"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full animate-ping" />
          </div>
        </div>

        {/* Live Multi-Stage Matrix */}
        <div className="grid grid-cols-2 gap-2 pt-2 text-left">
          {stages.map((st, i) => (
            <div 
              key={i} 
              className={cn(
                "px-2.5 py-1.5 rounded-lg border text-[11px] font-mono flex items-center gap-2 transition-all",
                st.active 
                  ? "bg-emerald-950/60 border-emerald-500/60 text-emerald-300 shadow-xs" 
                  : "bg-slate-900/40 border-slate-800 text-slate-500"
              )}
            >
              <div className={cn(
                "w-1.5 h-1.5 rounded-full shrink-0",
                st.active ? "bg-emerald-400 animate-ping" : "bg-slate-600"
              )} />
              <span className="truncate">{st.label}</span>
            </div>
          ))}
        </div>

        {/* Footer Badge */}
        <div className="pt-2 flex items-center justify-center gap-4 text-[10.5px] font-mono text-slate-400 border-t border-slate-800/80">
          <span className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-400" /> GPT-4o ENGINE
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3 h-3" /> ATS 90+ TARGET
          </span>
        </div>

      </div>

    </div>
  )
}
