"use client";
import React from 'react';
import { Users, BarChart3, LayoutTemplate, Star, ShieldCheck, Zap } from 'lucide-react'

const stats = [
  {
    icon: <Users className="w-4 h-4 text-emerald-600" />,
    value: '50,000+',
    label: 'Resumes Tailored Globally'
  },
  {
    icon: <BarChart3 className="w-4 h-4 text-primary" />,
    value: '95% Avg.',
    label: 'ATS Pass Score'
  },
  {
    icon: <LayoutTemplate className="w-4 h-4 text-indigo-600" />,
    value: '10+ Tested',
    label: 'Full-Time & C2C Templates'
  },
  {
    icon: <Zap className="w-4 h-4 text-amber-500" />,
    value: '3.4x More',
    label: 'Recruiter Callback Rate'
  },
  {
    icon: <Star className="w-4 h-4 text-amber-400 fill-amber-400" />,
    value: '4.9 / 5.0',
    label: 'Average User Rating'
  },
  {
    icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
    value: 'Word & PDF',
    label: 'Multi-Format Export'
  }
]

export function StatsSection() {
  return (
    <section className="bg-slate-50/70 border-b border-slate-200/80 py-4.5 overflow-hidden relative flex items-center">
      {/* Edge Soft Fade Gradients */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-36 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-36 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-10" />

      <div className="w-full flex overflow-x-hidden">
        <div className="animate-ticker whitespace-nowrap flex items-center">
          {/* Duplicate 4 times for seamless infinite scroll */}
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              {stats.map((stat, idx) => (
                <div 
                  key={`${i}-${idx}`} 
                  className="flex items-center gap-3 mx-3 px-4 py-2 rounded-full bg-white/95 border border-slate-200/80 shadow-2xs shrink-0 hover:border-emerald-500/40 hover:shadow-md hover:scale-[1.03] transition-all duration-200 cursor-default"
                >
                  <div className="w-7 h-7 rounded-full bg-slate-100/80 border border-slate-200/60 flex items-center justify-center shrink-0">
                    {stat.icon}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13.5px] font-black text-slate-900 leading-none">{stat.value}</span>
                    <span className="text-[11.5px] text-slate-500 font-semibold leading-none">{stat.label}</span>
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes ticker {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-25%); }
        }
        .animate-ticker {
          animation: ticker 32s linear infinite;
          width: max-content;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}} />
    </section>
  )
}
