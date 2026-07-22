'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Loader2 } from 'lucide-react'

export function SubscriptionAnalyticsCharts() {
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(true)
  
  // Plan Distribution
  const [planData, setPlanData] = useState({ free: 0, pro: 0, enterprise: 0, total: 0 })
  
  // Revenue Data (last 6 months)
  const [revenueData, setRevenueData] = useState<number[]>([0, 0, 0, 0, 0, 0])
  const [monthLabels, setMonthLabels] = useState<string[]>([])

  useEffect(() => {
    async function fetchData() {
      // 1. Fetch Plan Distribution from Profiles
      const { data: profiles } = await supabase.from('profiles').select('plan_id')
      if (profiles) {
        let free = 0, pro = 0, enterprise = 0
        profiles.forEach(p => {
          if (p.plan_id === 'PREMIUM') pro++
          else if (p.plan_id === 'ENTERPRISE') enterprise++
          else free++
        })
        setPlanData({ free, pro, enterprise, total: profiles.length })
      }

      // 2. Fetch Revenue Data from payments_and_subscriptions
      const today = new Date()
      const sixMonthsAgo = new Date()
      sixMonthsAgo.setMonth(today.getMonth() - 5)
      sixMonthsAgo.setDate(1) // Start of the month 6 months ago

      const { data: payments } = await supabase
        .from('payments_and_subscriptions')
        .select('amount_paid, created_at, status')
        .gte('created_at', sixMonthsAgo.toISOString())
        // Normally we check status === 'success', assuming that's the value

      // Initialize months array (e.g., ["Jan", "Feb", "Mar", ...])
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      const labels: string[] = []
      const revenues: number[] = [0, 0, 0, 0, 0, 0]

      for (let i = 5; i >= 0; i--) {
        const d = new Date()
        d.setMonth(today.getMonth() - i)
        labels.push(monthNames[d.getMonth()])
      }
      setMonthLabels(labels)

      if (payments) {
        payments.forEach(payment => {
          // If status isn't tracked or is 'success', count it
          if (!payment.status || payment.status.toLowerCase() === 'success' || payment.status.toLowerCase() === 'paid') {
            const date = new Date(payment.created_at)
            // Calculate which bucket (0-5) this belongs to
            const monthDiff = (today.getFullYear() - date.getFullYear()) * 12 + today.getMonth() - date.getMonth()
            const bucketIndex = 5 - monthDiff
            if (bucketIndex >= 0 && bucketIndex <= 5) {
              revenues[bucketIndex] += Number(payment.amount_paid || 0)
            }
          }
        })
      }
      setRevenueData(revenues)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  // Calculate Revenue Chart SVG
  const maxRevenue = Math.max(...revenueData, 1000) // minimum scale 1000
  // Scale max value to Y=20, 0 to Y=200
  // Y = 200 - (val / maxRevenue * 180)
  const revenuePoints = revenueData.map((val, i) => {
    const x = Math.round((i / 5) * 500) // 0 to 500
    const y = Math.round(200 - (val / maxRevenue * 180))
    return `${x} ${y}`
  })
  
  // Use Q (Quadratic Bezier) for smoother curves if we had better logic, 
  // but straight lines (L) are safer for dynamic points
  const revLinePath = `M ${revenuePoints.join(' L ')}`
  const revAreaPath = `${revLinePath} L 500 200 L 0 200 Z`

  // Format labels for Y axis based on maxRevenue
  const yLabels = [
    `₹${(maxRevenue).toLocaleString()}`,
    `₹${(maxRevenue * 0.75).toLocaleString()}`,
    `₹${(maxRevenue * 0.5).toLocaleString()}`,
    `₹${(maxRevenue * 0.25).toLocaleString()}`,
    `₹0`
  ]

  // Calculate Donut Chart Dash Offsets
  const C = 251.2
  const proPercentage = planData.total > 0 ? (planData.pro / planData.total) : 0
  const entPercentage = planData.total > 0 ? (planData.enterprise / planData.total) : 0
  const freePercentage = planData.total > 0 ? (planData.free / planData.total) : 0

  const proOffset = C - (C * proPercentage)
  const entOffset = C - (C * entPercentage)
  // To stack them, we need to rotate Enterprise based on where Pro ends
  const entRotation = (proPercentage * 360) - 90 // -90 is the starting transform

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-16">
      
      {/* Chart 1: Revenue Growth */}
      <div className="bg-white border border-slate-200 rounded-[18px] p-6 shadow-sm flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[16px] font-black text-slate-900">Revenue Growth (MRR)</h3>
          <select className="bg-[#FAFAF8] border border-slate-200 rounded-lg px-2 py-1 text-[12px] font-bold text-slate-600 outline-none cursor-pointer">
            <option>Last 6 Months</option>
            <option>This Year</option>
          </select>
        </div>
        
        {isLoading ? (
          <div className="flex-1 flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
          </div>
        ) : (
          <div className="h-64 w-full relative">
            <div className="absolute inset-0 flex flex-col justify-between text-[11px] font-bold text-slate-400 pb-6">
              {yLabels.map((lbl, i) => <div key={i}>{lbl}</div>)}
            </div>
            
            <div className="ml-12 h-[calc(100%-24px)] relative pb-2">
              <div className="absolute inset-0 flex justify-between pointer-events-none">
                {[0, 1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="h-full w-px bg-slate-100"></div>
                ))}
              </div>
              
              <svg viewBox="0 0 500 200" preserveAspectRatio="none" className="w-full h-full overflow-visible absolute inset-0">
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#16A34A" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#16A34A" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path 
                  d={revAreaPath} 
                  fill="url(#revenueGrad)"
                />
                <path 
                  d={revLinePath} 
                  fill="none" 
                  stroke="#16A34A" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="drop-shadow-md"
                />
              </svg>
            </div>
            
            <div className="ml-12 flex justify-between text-[11px] font-bold text-slate-400 mt-2">
              {monthLabels.map((m, i) => <span key={i}>{m}</span>)}
            </div>
          </div>
        )}
      </div>

      {/* Chart 2: Plan Distribution */}
      <div className="bg-white border border-slate-200 rounded-[18px] p-6 shadow-sm flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[16px] font-black text-slate-900">Plan Distribution</h3>
        </div>
        
        {isLoading ? (
          <div className="flex-1 flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center gap-12">
            
            {/* Doughnut SVG */}
            <div className="w-48 h-48 relative">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 drop-shadow-sm">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#F1F5F9" strokeWidth="16" />
                {/* Pro */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="#16A34A" strokeWidth="16" strokeDasharray={C} strokeDashoffset={proOffset} />
                {/* Enterprise */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="#0F172A" strokeWidth="16" strokeDasharray={C} strokeDashoffset={entOffset} transform={`rotate(${proPercentage * 360} 50 50)`} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[24px] font-black text-slate-900">{planData.total}</span>
                <span className="text-[11px] font-bold text-slate-400">Total Users</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-sm bg-primary"></div>
                <div>
                  <div className="text-[13px] font-bold text-slate-900">Pro Plan</div>
                  <div className="text-[12px] font-medium text-slate-500">{Math.round(proPercentage * 100)}% ({planData.pro} users)</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-sm bg-slate-100"></div>
                <div>
                  <div className="text-[13px] font-bold text-slate-900">Free Plan</div>
                  <div className="text-[12px] font-medium text-slate-500">{Math.round(freePercentage * 100)}% ({planData.free} users)</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-sm bg-slate-900"></div>
                <div>
                  <div className="text-[13px] font-bold text-slate-900">Enterprise</div>
                  <div className="text-[12px] font-medium text-slate-500">{Math.round(entPercentage * 100)}% ({planData.enterprise} users)</div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

    </div>
  )
}
