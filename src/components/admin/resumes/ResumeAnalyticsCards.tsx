'use client'

import { FileText, FileUp, Target, Briefcase, Users, Download } from 'lucide-react'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export function ResumeAnalyticsCards() {
  const supabase = createClientComponentClient()
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    avgAts: 91,
    downloads: 182650 // Static as downloads aren't tracked
  })

  useEffect(() => {
    async function fetchStats() {
      const { count: totalCount } = await supabase.from('resumes').select('*', { count: 'exact', head: true })
      
      const today = new Date()
      today.setHours(0,0,0,0)
      const { count: todayCount } = await supabase.from('resumes').select('*', { count: 'exact', head: true }).gte('created_at', today.toISOString())
      
      // Calculate Average ATS
      const { data: scores } = await supabase.from('resumes').select('ats_score')
      let avg = 0
      if (scores && scores.length > 0) {
        const validScores = scores.filter(s => s.ats_score !== null && s.ats_score !== undefined)
        if (validScores.length > 0) {
          const sum = validScores.reduce((acc, curr) => acc + (curr.ats_score as number), 0)
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
    { title: 'Total Resumes', value: stats.total.toLocaleString(), growth: '+18%', icon: FileText, sparklineData: [40, 50, 45, 70, 65, 80, 100], sparklineColor: 'stroke-primary' },
    { title: "Today's Creation", value: stats.today.toLocaleString(), isLive: true, icon: FileUp },
    { title: 'Average ATS Score', value: `${stats.avgAts}%`, isCircular: true, icon: Target },
    { title: 'Full-Time Resumes', value: Math.floor(stats.total * 0.7).toLocaleString(), icon: Briefcase }, // Estimates based on total
    { title: 'C2C Resumes', value: Math.ceil(stats.total * 0.3).toLocaleString(), icon: Users },
    { title: 'Resume Downloads', value: stats.downloads.toLocaleString(), growth: '+11%', icon: Download, sparklineData: [50, 60, 55, 75, 70, 90, 110], sparklineColor: 'stroke-blue-500' },
  ]
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
