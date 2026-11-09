"use client";
import React from 'react';
import { Search, BrainCircuit, Rocket, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const PILLARS = [
  {
    step: '01',
    icon: Search,
    title: 'Recruitment & Job Market Alignment',
    tag: 'US IT & Global Market',
    description: 'We analyze current live job requisitions across Fortune 500 enterprises, tech startups, and government contractors to map the exact technical requirements, title hierarchies, and certification values.',
    points: ['Live Workday & Taleo algorithm indexing', 'Target keyword gap extraction', 'Recruiter seniority verification'],
  },
  {
    step: '02',
    icon: BrainCircuit,
    title: 'Profile Optimization & Transformation',
    tag: 'Strict 2-Line Standard',
    description: 'Our AI engine restructures your raw career history into concise 2-line bullets with bolded employer keywords, action verbs, and measured business impact percentages that recruiters scan first.',
    points: ['Instant Word (.docx) & Vector PDF outputs', 'Full-Time (1-page) vs C2C (2-page) switcher', '100% human-readable typography'],
  },
  {
    step: '03',
    icon: Rocket,
    title: 'Career Acceleration & Interview STAR Prep',
    tag: 'End-to-End Success',
    description: 'A great resume gets you the call; our companion tools prepare you to win the offer. Automatically generate matching Cover Letters and STAR-framework behavioral interview talking points.',
    points: ['Auto-generated matching Cover Letter', 'STAR behavioral story generator', 'Role-specific compensation benchmarks'],
  },
];

export function AboutWhatWeDo() {
  return (
    <section className="py-12 sm:py-16 bg-slate-50/60 border-b border-slate-200/80 relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-[11px] font-black uppercase tracking-wider mb-3">
            What We Do
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 mb-3 tracking-tight">
            Comprehensive Career Enablement from Start to Offer.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
            Beyond standard templates, Soltkiz provides the complete pipeline to help technical and corporate professionals stand out in an overcrowded market.
          </p>
        </div>

        {/* 3 Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.step}
                className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black text-slate-400 group-hover:text-emerald-600 transition-colors">
                      {pillar.step}
                    </span>
                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      {pillar.tag}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-4 group-hover:bg-emerald-500/10 transition-colors">
                    <Icon className="w-6 h-6 text-slate-800 group-hover:text-emerald-700 transition-colors" />
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-slate-950 mb-2.5">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 font-normal">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  {pillar.points.map((pt, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}