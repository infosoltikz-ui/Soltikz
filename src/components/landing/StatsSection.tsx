"use client";
import { Users, BarChart3, LayoutTemplate, Phone, Star, Headset } from 'lucide-react'

const stats = [
  {
    icon: <Users className="w-6 h-6 text-primary" />,
    value: '50,000+',
    label: 'Happy Users Worldwide'
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-accent" />,
    value: '95%',
    label: 'Users Get Better ATS Score'
  },
  {
    icon: <LayoutTemplate className="w-6 h-6 text-primary" />,
    value: '5+',
    label: 'Professional Templates'
  },
  {
    icon: <Phone className="w-6 h-6 text-accent" />,
    value: '80%',
    label: 'More Interview Calls'
  },
  {
    icon: <Star className="w-6 h-6 text-primary" />,
    value: '4.8/5',
    label: 'User Rating on All Platforms'
  },
  {
    icon: <Headset className="w-6 h-6 text-accent" />,
    value: '24/7',
    label: 'Customer Support'
  }
]

export function StatsSection() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center sm:flex-row sm:items-start text-center sm:text-left gap-3">
              <div className="shrink-0">
                {stat.icon}
              </div>
              <div>
                <div className="text-xl md:text-2xl font-extrabold text-slate-900 leading-none mb-1">{stat.value}</div>
                <div className="text-xs text-slate-500 font-medium max-w-[100px]">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
