"use client";
import { Users, Briefcase, Building2, Award } from 'lucide-react'

const stats = [
  {
    icon: <Users className="w-8 h-8 text-white/90" strokeWidth={1.5} />,
    value: '10,000+',
    label: 'Students Trained'
  },
  {
    icon: <Briefcase className="w-8 h-8 text-accent" strokeWidth={1.5} />,
    value: '5,000+',
    label: 'Successful Placements'
  },
  {
    icon: <Building2 className="w-8 h-8 text-white/90" strokeWidth={1.5} />,
    value: '500+',
    label: 'Partner Companies'
  },
  {
    icon: <Award className="w-8 h-8 text-accent" strokeWidth={1.5} />,
    value: '98%',
    label: 'Placement Success Rate'
  }
]

export function AboutStats() {
  return (
    <section className="py-12 bg-primary">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left - Title */}
          <div className="shrink-0 text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
              Soltikz IT<br />
              In Numbers
            </h2>
          </div>

          {/* Right - Stats Grid */}
          <div className="flex-1 w-full grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 divide-x-0 lg:divide-x divide-white/10">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center lg:items-start text-center lg:text-left lg:pl-8 first:pl-0">
                <div className="flex items-center gap-4 mb-3">
                  {stat.icon}
                  <div className="text-2xl md:text-3xl font-black text-white">
                    {stat.value}
                  </div>
                </div>
                <div className="text-xs md:text-[13px] font-bold text-white/70 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
