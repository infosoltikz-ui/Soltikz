"use client";
import React from 'react';
import { Users, Briefcase, Building2, Award } from 'lucide-react';

const STATS = [
  {
    icon: Users,
    value: '50,000+',
    label: 'Job Seekers Empowered',
    sub: 'Active worldwide',
  },
  {
    icon: Briefcase,
    value: '99.4%',
    label: 'ATS Pass Rate',
    sub: 'Workday & Taleo verified',
  },
  {
    icon: Building2,
    value: '1,200+',
    label: 'Target Employers',
    sub: 'Vocabulary mapped',
  },
  {
    icon: Award,
    value: '3.4x',
    label: 'Callback Multiplier',
    sub: 'Proven interview rate',
  },
];

export function AboutStats() {
  return (
    <section className="py-12 bg-slate-950 text-white relative overflow-hidden border-b border-slate-800">
      <div className="absolute top-0 right-1/4 w-96 h-40 bg-emerald-500/10 blur-[90px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex flex-col items-start p-2">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-slate-300 mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {stat.sub}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}