"use client";
import React from 'react';
import { Users, BarChart3, LayoutTemplate, Phone, Star, Headset, ShieldCheck, Zap } from 'lucide-react'

const stats = [
  {
    icon: <Users className="w-4 h-4 text-primary" />,
    value: '50,000+',
    label: 'Resumes Tailored Globally'
  },
  {
    icon: <BarChart3 className="w-4 h-4 text-secondary" />,
    value: '95% Avg.',
    label: 'ATS Pass Score'
  },
  {
    icon: <LayoutTemplate className="w-4 h-4 text-primary" />,
    value: '5+ Tested',
    label: 'Single-Column Templates'
  },
  {
    icon: <Zap className="w-4 h-4 text-secondary" />,
    value: '3x More',
    label: 'Recruiter Callback Rate'
  },
  {
    icon: <Star className="w-4 h-4 text-amber-500 fill-amber-500" />,
    value: '4.9 / 5',
    label: 'Average User Rating'
  },
  {
    icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
    value: '100% Free',
    label: '20 Free AI Generations'
  }
]

export function StatsSection() {
  return (
    <section className="bg-[#FBFBF9] border-b border-slate-200/80 py-5 overflow-hidden relative flex items-center">
      <div className="w-full flex overflow-x-hidden">
        <div className="animate-ticker whitespace-nowrap flex items-center">
          {/* Duplicate 4 times for a seamless infinite loop on any screen */}
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              {stats.map((stat, idx) => (
                <div 
                  key={`${i}-${idx}`} 
                  className="flex items-center gap-3 mx-4 px-4 py-2 rounded-full bg-white/90 border border-slate-200/90 shadow-2xs shrink-0 hover:border-slate-300 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0">
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
          animation: ticker 30s linear infinite;
          width: max-content;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}} />
    </section>
  )
}
