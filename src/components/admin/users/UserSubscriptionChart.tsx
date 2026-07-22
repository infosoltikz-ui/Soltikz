'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Loader2 } from 'lucide-react'

export function UserSubscriptionChart() {
  const supabase = createClient()
  const [data, setData] = useState({
    free: 0,
    pro: 0,
    enterprise: 0,
    total: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const { data: profiles } = await supabase.from('profiles').select('plan_id')
      if (profiles) {
        let free = 0
        let pro = 0
        let enterprise = 0
        
        profiles.forEach(p => {
          if (p.plan_id === 'PREMIUM') pro++
          else if (p.plan_id === 'ENTERPRISE') enterprise++
          else free++
        })
        
        setData({
          free,
          pro,
          enterprise,
          total: profiles.length || 1
        })
      }
      setIsLoading(false)
    }
    fetchData()
  }, [])

  const proPercentage = Math.round((data.pro / data.total) * 100)
  const enterprisePercentage = Math.round((data.enterprise / data.total) * 100)
  
  // Circumference for r=40 is 2 * pi * 40 ≈ 251.2
  const C = 251.2
  // Offsets
  const proOffset = C - (C * (data.pro / data.total))
  const entOffset = C - (C * (data.enterprise / data.total))

  return (
    <div className="bg-white border border-slate-200 rounded-[18px] p-6 shadow-sm h-full flex flex-col">
      <h3 className="text-[18px] font-black text-slate-900 mb-1">Subscription Overview</h3>
      <p className="text-[13px] font-medium text-slate-500 mb-8">Current active user plans</p>
      
      {isLoading ? (
        <div className="flex-1 flex justify-center items-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
        </div>
      ) : (
        <>
          <div className="relative w-full max-w-[240px] aspect-square mx-auto flex items-center justify-center flex-1">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              {/* Free (Background/Full Ring) */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#F1F5F9" strokeWidth="20" />
              
              {/* Enterprise (Draws on top of free) */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#EA580C" strokeWidth="20" strokeDasharray={C} strokeDashoffset={entOffset} />
              
              {/* Pro (Draws on top of everything) */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#16A34A" strokeWidth="20" strokeDasharray={C} strokeDashoffset={proOffset} />
            </svg>
            <div className="absolute text-center flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-slate-900">{proPercentage}%</span>
              <span className="text-[12px] font-bold text-slate-400">Pro Plan</span>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary"></span>
              <span className="text-[12px] font-bold text-slate-700">Pro ({data.pro})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-slate-100"></span>
              <span className="text-[12px] font-bold text-slate-700">Free ({data.free})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-orange-600"></span>
              <span className="text-[12px] font-bold text-slate-700">Enterprise ({data.enterprise})</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
