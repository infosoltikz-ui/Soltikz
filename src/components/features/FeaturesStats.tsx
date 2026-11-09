"use client";
import React from 'react';
import { ShieldCheck, CheckCircle2, TrendingUp, Users } from 'lucide-react';

const STAT_BLOCKS = [
  {
    value: '99.4%',
    title: 'Workday & Taleo Pass Rate',
    desc: 'Zero rejected resumes due to layout, font, or parsing errors',
  },
  {
    value: '3.4x',
    title: 'Higher Interview Callback Rate',
    desc: 'Measured across 50,000+ candidates who applied with Soltkiz',
  },
  {
    value: '6 Seconds',
    title: 'Recruiter Reading Cadence',
    desc: 'Strict 2-line standard engineered for fast human skimmers',
  },
  {
    value: '20 Free',
    title: 'Tailored Resume Generations',
    desc: 'Generate, optimize, and export Word and PDF resumes completely free',
  },
];

export function FeaturesStats() {
  return (
    <section className="py-12 bg-slate-950 text-white relative overflow-hidden border-b border-slate-800">
      <div className="absolute top-0 left-1/3 w-96 h-40 bg-emerald-500/10 blur-[90px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STAT_BLOCKS.map((b) => (
            <div key={b.title} className="flex flex-col items-start p-2">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight">
                {b.value}
              </div>
              <div className="text-xs font-bold text-slate-200 mt-1">
                {b.title}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                {b.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}