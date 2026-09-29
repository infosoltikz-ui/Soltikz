'use client'

import { Layers, Zap, Activity, Building2, Handshake, DownloadCloud } from 'lucide-react'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export function ResumeAnalyticsCards() {
  const supabase = createClient()
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    avgAts: 91,
    downloads: 182650 // Static as downloads aren't tracked
  })

  useEffect(() => {
    async function fetchStats() {
      const { count: totalCount } = await supabase.from('resumes_v2').select('*', { count: 'exact', head: true })
      
      const today = new Date()
      today.setHours(0,0,0,0)
      const { count: todayCount } = await supabase.from('resumes_v2').select('*', { count: 'exact', head: true }).gte('created_at', today.toISOString())
      
      // Calculate Average ATS from ats_analyses table (resumes_v2 stores scores there)
      const { data: scores } = await supabase.from('ats_analyses').select('overall_score')
      let avg = 0
      if (scores && scores.length > 0) {
        const validScores = scores.filter(s => s.overall_score !== null && s.overall_score !== undefined)
        if (validScores.length > 0) {
          const sum = validScores.reduce((acc, curr) => acc + (curr.overall_score as number), 0)
          avg = Math.round(sum / validScores.length)
        }
      }
      
      setStats({
        total: totalCount || 0,
        today: todayCount || 0,
        avgAts: avg || 0,
        downloads: 182650 // Placeholder for now
      })
    }
    fetchStats()
  }, [])

  const CARDS = [
    { title: 'Total Resumes', value: stats.total.toLocaleString(), growth: '+18%', icon: Layers, iconColor: 'text-blue-600', iconBg: 'bg-blue-100', sparklineData: [40, 50, 45, 70, 65, 80, 100], sparklineColor: 'stroke-blue-500' },
    { title: "Today's Creation", value: stats.today.toLocaleString(), isLive: true, icon: Zap, iconColor: 'text-amber-600', iconBg: 'bg-amber-100' },
    { title: 'Average ATS Score', value: `${stats.avgAts}%`, isCircular: true, icon: Activity, iconColor: 'text-emerald-600', iconBg: 'bg-emerald-100' },
    { title: 'Full-Time Resumes', value: Math.floor(stats.total * 0.7).toLocaleString(), icon: Building2, iconColor: 'text-purple-600', iconBg: 'bg-purple-100' },
    { title: 'C2C Resumes', value: Math.ceil(stats.total * 0.3).toLocaleString(), icon: Handshake, iconColor: 'text-rose-600', iconBg: 'bg-rose-100' },
    { title: 'Resume Downloads', value: stats.downloads.toLocaleString(), growth: '+11%', icon: DownloadCloud, iconColor: 'text-indigo-600', iconBg: 'bg-indigo-100', sparklineData: [50, 60, 55, 75, 70, 90, 110], sparklineColor: 'stroke-indigo-500' },
  ]
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {CARDS.map((card, i) => {
        const Icon = card.icon
        return (
          <div key={i} className="bg-white border border-slate-200 rounded-[14px] p-3.5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            
            <div className="flex justify-between items-start mb-3">
              <div className={`w-8 h-8 rounded-lg ${card.iconBg} border border-white/50 flex items-center justify-center`}>
                <Icon className={`w-4 h-4 ${card.iconColor}`} strokeWidth={2.5} />
              </div>
              
              {card.growth && (
                <div className="px-1.5 py-0.5 bg-green-50 text-primary text-[10px] font-black rounded-md border border-green-100">
                  {card.growth}
                </div>
              )}
              {card.isLive && (
                <div className="flex items-center gap-1 px-1.5 py-0.5 bg-orange-50 text-orange-600 text-[10px] font-black rounded-md border border-orange-100">
                  <span className="w-1 h-1 rounded-full bg-orange-500 animate-pulse"></span>
                  LIVE
                </div>
              )}
            </div>

            <div className="flex items-end justify-between">
              <div>
                <p className="text-[11px] font-bold text-slate-500 mb-0.5 whitespace-nowrap">{card.title}</p>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">{card.value}</h3>
              </div>

              {/* Sparkline Visuals */}
              {card.sparklineData && (
                <div className="absolute right-0 bottom-3 w-12 h-6 opacity-40 group-hover:opacity-100 transition-opacity">
                  <svg viewBox="0 0 100 40" className="absolute inset-0 w-full h-full overflow-visible">
                    <path
                      d={`M 0 ${40 - card.sparklineData[0]/3} ` + card.sparklineData.map((val, idx) => `L ${idx * (100/6)} ${40 - val/3}`).join(' ')}
                      fill="none"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={card.sparklineColor}
                    />
                  </svg>
                </div>
              )}

              {/* Circular Progress */}
              {card.isCircular && (
                <div className="w-8 h-8 relative flex items-center justify-center -mr-1">
                  <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-slate-100" strokeWidth="5" />
                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-primary" strokeWidth="5" strokeDasharray="100" strokeDashoffset={`${100 - stats.avgAts}`} />
                  </svg>
                  <span className="absolute text-[9px] font-black text-slate-700">{stats.avgAts}</span>
                </div>
              )}
            </div>

          </div>
        )
      })}
    </div>
  )
}
