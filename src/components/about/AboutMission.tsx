"use client";
import React from 'react';
import { Target, Shield, Zap, Sparkles, Check, Lock, Layers } from 'lucide-react';

const CORE_VALUES = [
  {
    icon: Shield,
    title: 'Authentic Truth (Zero Hallucination)',
    desc: 'We never fabricate employers, exaggerate credentials, or invent fake facts. Soltkiz extracts your authentic work history and translates it into employer vocabulary with mathematical rigor.',
    tag: 'Integrity First',
    color: 'emerald',
  },
  {
    icon: Zap,
    title: 'Strict 2-Line Recruiter Cadence',
    desc: 'Hiring managers spend an average of 6 seconds skimming a resume. Our engine enforces exactly two full printed lines per bullet with bolded keywords so your top achievements are instantly seen.',
    tag: '6-Sec Standard',
    color: 'amber',
  },
  {
    icon: Layers,
    title: 'Dual US Market Architecture',
    desc: 'Full-Time roles require a 1-page high-impact narrative. Contract and C2C roles require a 2-page detailed skills matrix. We are the only platform purpose-built with dedicated engines for both.',
    tag: 'Dual Format',
    color: 'indigo',
  },
  {
    icon: Lock,
    title: 'Zero Data Broker Selling',
    desc: 'Your career history, contact details, and employer metrics belong to you. We never sell your resume to headhunters, third-party recruiters, or advertising networks. Your vault is private.',
    tag: 'Encrypted Vault',
    color: 'teal',
  },
];

export function AboutMission() {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-200/80 relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-bold uppercase tracking-wider mb-3">
            <Target className="w-3.5 h-3.5 text-emerald-600" />
            Core Engineering Principles
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 mb-3 tracking-tight">
            How we engineer your unfair career advantage.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            Most resume builders sell colorful Canva-style templates that break applicant tracking systems. We build algorithmic tools engineered for one single outcome: getting you shortlisted for the interview.
          </p>
        </div>

        {/* 4 Pillars Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {CORE_VALUES.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.title}
                className="bg-slate-50/70 border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5 text-slate-900" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700">
                      {val.tag}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-slate-950 mb-2">
                    {val.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {val.desc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-200/70 flex items-center gap-2 text-xs font-bold text-slate-800">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" strokeWidth={2.5} />
                  <span>Verified across Workday, Taleo & Greenhouse</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}