"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Bot,
  FileCheck2,
  CheckCircle2,
  TrendingUp,
  Cpu
} from 'lucide-react';

export function FeaturesHero() {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-white via-slate-50/60 to-white relative overflow-hidden border-b border-slate-200/80">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-emerald-500/5 blur-[140px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        
        {/* Header Eyebrow */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-[11px] font-black uppercase tracking-wider mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Recruiter-Calibrated AI Platform
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-slate-950 mb-4 leading-[1.12] tracking-tight">
            Every feature engineered to<br />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent">
              beat Workday & impress recruiters.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
            From real-time keyword gap extraction to strict 2-line bullet formatting and dual-format Word/PDF generation - explore the full technology suite built for maximum interview callbacks.
          </p>
        </div>

        {/* Hero Interactive Terminal & Feature Teaser */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden mb-8">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold">
                  Soltkiz Core Engine v2.4
                </span>
                <span className="text-xs text-slate-500 font-medium">Real-time parser simulation</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-950">
                The Anatomy of an ATS-Shortlisted Resume
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-950 text-white text-xs font-bold shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                96/100 Guaranteed ATS Score
              </span>
            </div>
          </div>

          {/* Interactive Feature Pills Dock */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'ATS Score Checker', sub: 'Taleo & Workday', icon: ShieldCheck, color: 'text-emerald-600' },
              { label: 'Strict 2-Line Bullets', sub: '6-Sec Standard', icon: Zap, color: 'text-amber-600' },
              { label: 'Full-Time vs C2C', sub: 'Dual Format Matrix', icon: Layers, color: 'text-indigo-600' },
              { label: 'Keyword Gap Extractor', sub: 'JD Alignment', icon: FileCheck2, color: 'text-teal-600' },
              { label: 'Interview STAR Prep', sub: 'Behavioral Scripts', icon: Bot, color: 'text-purple-600' },
              { label: 'Word & Vector PDF', sub: 'Pixel-Perfect Export', icon: Cpu, color: 'text-rose-600' },
            ].map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between group cursor-default"
                >
                  <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-2.5 shadow-2xs group-hover:scale-105 transition-transform">
                    <Icon className={`w-4 h-4 ${tool.color}`} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {tool.label}
                    </h4>
                    <p className="text-[10.5px] text-slate-500 mt-0.5">
                      {tool.sub}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}