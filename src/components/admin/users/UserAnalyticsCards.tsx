'use client'

import { Users, Crown, User, CheckCircle2, Ban, UserPlus } from 'lucide-react'

const CARDS = [
  { title: 'Total Users', value: '12,548', growth: '+18%', icon: Users, sparklineData: [20, 30, 25, 45, 40, 60, 80], sparklineColor: 'stroke-blue-500' },
  { title: 'Premium Users', value: '2,184', growth: '+9%', icon: Crown, sparklineData: [10, 15, 20, 18, 30, 25, 40], sparklineColor: 'stroke-primary' },
  { title: 'Free Users', value: '10,364', icon: User },
  { title: 'Verified Users', value: '11,890', icon: CheckCircle2 },
  { title: 'Blocked Users', value: '36', icon: Ban },
  { title: 'New Users Today', value: '124', isLive: true, icon: UserPlus },
]

export function UserAnalyticsCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4">
      {CARDS.map((card, i) => {
        const Icon = card.icon
        return (
          <div key={i} className="bg-white border border-slate-200 rounded-[18px] p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                <Icon className="w-5 h-5 text-slate-600" strokeWidth={2} />
              </div>
              
              {card.growth && (
                <div className="px-2 py-0.5 bg-green-50 text-primary text-[11px] font-black rounded-lg border border-green-100">
                  {card.growth}
                </div>
              )}
              {card.isLive && (
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-orange-50 text-orange-600 text-[11px] font-black rounded-lg border border-orange-100">
                  <span className="w-1 h-1 rounded-full bg-orange-500 animate-pulse"></span>
                  LIVE
                </div>
              )}
            </div>

            <div>
              <p className="text-[12px] font-bold text-slate-500 mb-1">{card.title}</p>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">{card.value}</h3>
            </div>

            {/* Sparkline Visuals */}
            {card.sparklineData && (
              <div className="absolute right-0 bottom-4 w-16 h-8 opacity-40 group-hover:opacity-100 transition-opacity">
                <svg viewBox="0 0 100 40" className="absolute inset-0 w-full h-full overflow-visible">
                  <path
                    d={`M 0 ${40 - card.sparklineData[0]/3} ` + card.sparklineData.map((val, idx) => `L ${idx * (100/6)} ${40 - val/3}`).join(' ')}
                    fill="none"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={card.sparklineColor}
                  />
                </svg>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
