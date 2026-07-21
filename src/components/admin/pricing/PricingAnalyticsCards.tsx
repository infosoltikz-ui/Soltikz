'use client'

import { Layers, Users, IndianRupee, TrendingUp, Crown, Target } from 'lucide-react'

const CARDS = [
  { title: 'Total Plans', value: '3', icon: Layers, color: 'text-slate-600', bg: 'bg-slate-50' },
  { title: 'Active Subscribers', value: '2,184', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { title: 'Monthly Revenue', value: '₹24,860', growth: '+14%', icon: IndianRupee, color: 'text-green-600', bg: 'bg-green-50' },
  { title: 'Annual Revenue', value: '₹298,000', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
  { title: 'Most Popular Plan', value: 'Pro', icon: Crown, color: 'text-orange-500', bg: 'bg-orange-50' },
  { title: 'Conversion Rate', value: '28%', isCircular: true, icon: Target, color: 'text-primary', bg: 'bg-primary/10' },
]

export function PricingAnalyticsCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4">
      {CARDS.map((card, i) => {
        const Icon = card.icon
        return (
          <div key={i} className="bg-white border border-slate-200 rounded-[18px] p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group flex flex-col">
            
            <div className="flex justify-between items-start mb-4">
              <div className={`w-10 h-10 rounded-xl border border-slate-100 flex items-center justify-center ${card.bg}`}>
                <Icon className={`w-5 h-5 ${card.color}`} strokeWidth={2} />
              </div>
              
              {card.growth && (
                <div className="px-2 py-0.5 bg-green-50 text-primary text-[11px] font-black rounded-lg border border-green-100">
                  {card.growth}
                </div>
              )}
            </div>

            <div className="flex flex-col mt-auto">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-[12px] font-bold text-slate-500 mb-1 min-h-[36px] flex items-end">{card.title}</p>
                  <h3 className="text-[22px] font-black text-slate-900 tracking-tight">{card.value}</h3>
                </div>

                {/* Circular Progress */}
                {card.isCircular && (
                  <div className="w-10 h-10 relative flex items-center justify-center shrink-0 mb-1">
                    <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                      <circle cx="18" cy="18" r="16" fill="none" className="stroke-slate-100" strokeWidth="4" />
                      <circle cx="18" cy="18" r="16" fill="none" className="stroke-primary" strokeWidth="4" strokeDasharray="100" strokeDashoffset="72" />
                    </svg>
                    <span className="absolute text-[10px] font-black text-slate-700">28</span>
                  </div>
                )}
              </div>
            </div>

          </div>
        )
      })}
    </div>
  )
}
