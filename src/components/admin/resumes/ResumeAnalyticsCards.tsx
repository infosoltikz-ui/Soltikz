'use client'

import { FileText, FileUp, Target, Briefcase, Users, Download } from 'lucide-react'

const CARDS = [
  { title: 'Total Resumes', value: '58,942', growth: '+18%', icon: FileText, sparklineData: [40, 50, 45, 70, 65, 80, 100], sparklineColor: 'stroke-primary' },
  { title: "Today's Creation", value: '426', isLive: true, icon: FileUp },
  { title: 'Average ATS Score', value: '91%', isCircular: true, icon: Target },
  { title: 'Full-Time Resumes', value: '38,214', icon: Briefcase },
  { title: 'C2C Resumes', value: '20,728', icon: Users },
  { title: 'Resume Downloads', value: '182,650', growth: '+11%', icon: Download, sparklineData: [50, 60, 55, 75, 70, 90, 110], sparklineColor: 'stroke-blue-500' },
]

export function ResumeAnalyticsCards() {
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

            <div className="flex items-end justify-between">
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

              {/* Circular Progress */}
              {card.isCircular && (
                <div className="w-10 h-10 relative flex items-center justify-center">
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
