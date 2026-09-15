"use client";
import React from 'react';
import { Users, BarChart3, LayoutTemplate, Phone, Star, Headset } from 'lucide-react'

const stats = [
  {
    icon: <Users className="w-[18px] h-[18px] text-primary" />,
    value: '50,000+',
    label1: 'Happy Users',
    label2: 'Worldwide'
  },
  {
    icon: <BarChart3 className="w-[18px] h-[18px] text-accent" />,
    value: '95%',
    label1: 'Users Get Better',
    label2: 'ATS Score'
  },
  {
    icon: <LayoutTemplate className="w-[18px] h-[18px] text-primary" />,
    value: '5+',
    label1: 'Professional',
    label2: 'Templates'
  },
  {
    icon: <Phone className="w-[18px] h-[18px] text-accent" />,
    value: '80%',
    label1: 'More Interview',
    label2: 'Calls'
  },
  {
    icon: <Star className="w-[18px] h-[18px] text-primary" />,
    value: '4.8/5',
    label1: 'User Rating on',
    label2: 'All Platforms'
  },
  {
    icon: <Headset className="w-[18px] h-[18px] text-accent" />,
    value: '24/7',
    label1: 'Customer',
    label2: 'Support'
  }
]

export function StatsSection() {
  return (
    <section className="bg-slate-50 border-b border-slate-200 py-4 overflow-hidden relative flex">
      <div className="w-full flex overflow-x-hidden">
        <div className="animate-ticker whitespace-nowrap flex items-center">
          {/* Duplicate 4 times for a seamless loop on ultrawide screens */}
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              {stats.map((stat, idx) => (
                <div key={`${i}-${idx}`} className="flex items-start gap-2.5 mx-8 shrink-0">
                  <div className="pt-0.5">
                    {stat.icon}
                  </div>
                  <div className="flex flex-col">
                    <div className="text-[17px] font-extrabold text-slate-900 leading-none mb-1">{stat.value}</div>
                    <div className="text-[10px] text-slate-500 font-medium leading-tight">{stat.label1}</div>
                    <div className="text-[10px] text-slate-500 font-medium leading-tight">{stat.label2}</div>
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
          100% { transform: translateX(-25%); } /* 25% because there are 4 identical blocks */
        }
        .animate-ticker {
          animation: ticker 25s linear infinite;
          width: max-content;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}} />
    </section>
  )
}
