'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Loader2 } from 'lucide-react'

export function ResumeCharts() {
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(true)
  
  // Weekly data (Mon-Sun)
  const [weeklyData, setWeeklyData] = useState([0, 0, 0, 0, 0, 0, 0])
  
  // Type distribution
  const [types, setTypes] = useState({ targeted: 0, general: 0, total: 0 })

  useEffect(() => {
    async function fetchData() {
      // Fetch resumes from the last 7 days for the chart
      const { data: resumes } = await supabase.from('resumes').select('created_at, target_job_description')
      
      if (resumes) {
        // Calculate types
        let targeted = 0
        let general = 0
        resumes.forEach(r => {
          if (r.target_job_description && r.target_job_description.trim().length > 0) targeted++
          else general++
        })
        setTypes({ targeted, general, total: resumes.length })

        // Calculate weekly distribution (very basic: just mapping by day of week)
        const days = [0, 0, 0, 0, 0, 0, 0] // Mon to Sun
        const today = new Date()
        const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
        
        resumes.forEach(r => {
          const date = new Date(r.created_at)
          if (date >= oneWeekAgo) {
            // getDay() returns 0 for Sunday, 1 for Monday
            let dayIndex = date.getDay() - 1
            if (dayIndex === -1) dayIndex = 6 // Sunday is 6
            days[dayIndex]++
          }
        })
        setWeeklyData(days)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [])

  // Calculate SVG paths for line chart
  const maxVal = Math.max(...weeklyData, 1) // prevent div by zero
  // Scale so max value is at Y=20, 0 is at Y=100.
  // Formula: Y = 100 - (val / maxVal * 80)
  const points = weeklyData.map((val, i) => {
    const x = Math.round((i / 6) * 100) // 0 to 100
    const y = Math.round(100 - (val / maxVal * 80))
    return `${x} ${y}`
  })
  
  const linePath = `M ${points.join(' L ')}`
  const areaPath = `${linePath} L 100 100 L 0 100 Z`

  // Calculate SVG dash offset for donut chart
  const targetedPercentage = types.total > 0 ? Math.round((types.targeted / types.total) * 100) : 0
  const generalPercentage = types.total > 0 ? 100 - targetedPercentage : 0
  
  const C = 251.2
  const targetedOffset = C - (C * (types.targeted / (types.total || 1)))

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
      
      {/* Line Chart: Daily Generation */}
      <div className="xl:col-span-2 bg-white border border-slate-200 rounded-[18px] p-6 shadow-sm flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-[18px] font-black text-slate-900">Resume Generation Trend</h3>
            <p className="text-[13px] font-medium text-slate-500">Daily creation volume (last 7 days)</p>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex-1 flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
          </div>
        ) : (
          <div className="h-64 relative w-full flex items-end justify-between pb-6 border-b border-slate-100">
            {/* Chart Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pb-6 pointer-events-none">
              <div className="w-full h-px bg-slate-100"></div>
              <div className="w-full h-px bg-slate-100"></div>
              <div className="w-full h-px bg-slate-100"></div>
              <div className="w-full h-px bg-slate-100"></div>
            </div>
            
            {/* SVG Line */}
            <div className="absolute inset-0 pb-6 w-full h-full">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="resumeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#16A34A" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#16A34A" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Area */}
                <path d={areaPath} fill="url(#resumeGradient)" />
                {/* Line */}
                <path d={linePath} fill="none" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            
            {/* X Axis Labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[11px] font-bold text-slate-400">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
        )}
      </div>

      {/* Doughnut Chart: Types */}
      <div className="xl:col-span-1 bg-white border border-slate-200 rounded-[18px] p-6 shadow-sm flex flex-col">
        <h3 className="text-[18px] font-black text-slate-900 mb-1">Resume Types</h3>
        <p className="text-[13px] font-medium text-slate-500 mb-8">Distribution of targets</p>
        
        {isLoading ? (
          <div className="flex-1 flex justify-center items-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
          </div>
        ) : (
          <>
            <div className="relative w-full max-w-[200px] aspect-square mx-auto flex items-center justify-center flex-1">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                {/* Background/Full Ring (General) */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="#F1F5F9" strokeWidth="20" />
                
                {/* Targeted (Purple) */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="#A855F7" strokeWidth="20" strokeDasharray={C} strokeDashoffset={targetedOffset} />
              </svg>
              <div className="absolute text-center flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-slate-900">{types.total}</span>
                <span className="text-[12px] font-bold text-slate-400">Total</span>
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-slate-200"></span>
                <span className="text-[12px] font-bold text-slate-700">General ({generalPercentage}%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                <span className="text-[12px] font-bold text-slate-700">Targeted ({targetedPercentage}%)</span>
              </div>
            </div>
          </>
        )}
      </div>
      
    </div>
  )
}
