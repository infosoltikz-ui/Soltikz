'use client'

import { Users, Crown, FileText, FileUp, DollarSign, Target } from 'lucide-react'

const CARDS = [
  { title: 'Total Users', value: '12,548', growth: '+18%', icon: Users, sparklineData: [20, 30, 25, 45, 40, 60, 80], sparklineColor: 'stroke-blue-500' },
  { title: 'Premium Subscribers', value: '2,184', growth: '+9%', icon: Crown, sparklineData: [10, 15, 20, 18, 30, 25, 40], sparklineColor: 'stroke-orange-500' },
  { title: 'Total Resumes Created', value: '58,920', growth: '+26%', icon: FileText, sparklineData: [40, 50, 45, 70, 65, 80, 100], sparklineColor: 'stroke-primary' },
  { title: "Today's Generation", value: '428', isLive: true, icon: FileUp },
  { title: 'Monthly Revenue', value: '$24,860', growth: '+14%', icon: DollarSign, sparklineData: [50, 60, 55, 75, 70, 90, 110], sparklineColor: 'stroke-green-500' },
  { title: 'Average ATS Score', value: '91%', isCircular: true, icon: Target },
]

export function AnalyticsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {CARDS.map((card, i) => {
        const Icon = card.icon
        return (
          <div key={i} className="bg-white border border-slate-200 rounded-[18px] p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                <Icon className="w-6 h-6 text-slate-600" strokeWidth={2} />
              </div>
              
              {card.growth && (
                <div className="px-2.5 py-1 bg-green-50 text-primary text-[12px] font-black rounded-lg border border-green-100">
                  {card.growth}
                </div>
              )}
              {card.isLive && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 text-orange-600 text-[12px] font-black rounded-lg border border-orange-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                  LIVE
                </div>
              )}
            </div>

            <div className="flex items-end justify-between">
              <div>
                <p className="text-[14px] font-bold text-slate-500 mb-1">{card.title}</p>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">{card.value}</h3>
              </div>

              {/* Sparkline Visuals */}
              {card.sparklineData && (
                <div className="w-24 h-12 relative opacity-50 group-hover:opacity-100 transition-opacity">
                  <svg viewBox="0 0 100 40" className="absolute inset-0 w-full h-full overflow-visible">
                    <path
                      d={`M 0 ${40 - card.sparklineData[0]/3} ` + card.sparklineData.map((val, idx) => `L ${idx * (100/6)} ${40 - val/3}`).join(' ')}
                      fill="none"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={card.sparklineColor}
                    />
                  </svg>
                </div>
              )}

              {/* Circular Progress */}
              {card.isCircular && (
                <div className="w-12 h-12 relative flex items-center justify-center">
                  <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-slate-100" strokeWidth="4" />
                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-primary" strokeWidth="4" strokeDasharray="100" strokeDashoffset="9" />
                  </svg>
                  <span className="absolute text-[10px] font-black text-slate-700">91</span>
                </div>
              )}
            </div>

          </div>
        )
      })}
    </div>
  )
}
