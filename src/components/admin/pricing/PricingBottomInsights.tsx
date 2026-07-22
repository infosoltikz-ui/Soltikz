'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Loader2 } from 'lucide-react'

export function PricingBottomInsights() {
  const supabase = createClient()
  const [insights, setInsights] = useState({
    arpu: 0,
    mrr: 0,
    arr: 0,
    ltv: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchInsights() {
      // 1. Fetch total unique paying users and total revenue
      const { data: payments } = await supabase
        .from('payments_and_subscriptions')
        .select('user_id, amount_paid, created_at, status')

      if (payments && payments.length > 0) {
        const uniqueUsers = new Set()
        let totalRevenue = 0
        let currentMonthRevenue = 0
        let lastMonthRevenue = 0
        
        const now = new Date()
        const currentMonth = now.getMonth()
        const currentYear = now.getFullYear()
        
        const lastMonthDate = new Date()
        lastMonthDate.setMonth(now.getMonth() - 1)
        const lastMonth = lastMonthDate.getMonth()
        const lastMonthYear = lastMonthDate.getFullYear()

        payments.forEach(p => {
          if (!p.status || p.status.toLowerCase() === 'success' || p.status.toLowerCase() === 'paid') {
            const amount = Number(p.amount_paid) || 0
            totalRevenue += amount
            uniqueUsers.add(p.user_id)
            
            const pDate = new Date(p.created_at)
            if (pDate.getMonth() === currentMonth && pDate.getFullYear() === currentYear) {
              currentMonthRevenue += amount
            } else if (pDate.getMonth() === lastMonth && pDate.getFullYear() === lastMonthYear) {
              lastMonthRevenue += amount
            }
          }
        })

        const totalUsers = uniqueUsers.size > 0 ? uniqueUsers.size : 1 // prevent div by zero
        const arpu = Math.round(totalRevenue / totalUsers)
        const mrr = currentMonthRevenue // simplistic calculation for MRR
        const arr = mrr * 12
        const ltv = arpu * 8 // Using the existing "Based on avg 8mo retention" logic

        setInsights({
          arpu,
          mrr,
          arr,
          ltv
        })
      }
      setIsLoading(false)
    }
    fetchInsights()
  }, [])

  if (isLoading) {
    return (
      <div className="mt-16 pt-12 border-t border-slate-200 pb-12 flex justify-center items-center h-32">
        <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
      </div>
    )
  }

  return (
    <div className="mt-16 pt-12 border-t border-slate-200 pb-12">
      <h3 className="text-[18px] font-black text-slate-900 mb-6">Subscription Insights</h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#FAFAF8] border border-slate-200 rounded-2xl p-6">
          <div className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-2">Average Revenue Per User</div>
          <div className="text-[28px] font-black text-slate-900 tracking-tight">₹{insights.arpu.toLocaleString()}</div>
          <div className="text-[12px] font-medium text-green-600 mt-2">Live aggregate data</div>
        </div>

        <div className="bg-[#FAFAF8] border border-slate-200 rounded-2xl p-6">
          <div className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-2">Monthly Recurring Rev</div>
          <div className="text-[28px] font-black text-slate-900 tracking-tight">
            ₹{insights.mrr > 1000 ? (insights.mrr / 1000).toFixed(1) + 'k' : insights.mrr.toLocaleString()}
          </div>
          <div className="text-[12px] font-medium text-green-600 mt-2">Current month</div>
        </div>

        <div className="bg-[#FAFAF8] border border-slate-200 rounded-2xl p-6">
          <div className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-2">Annual Recurring Rev</div>
          <div className="text-[28px] font-black text-slate-900 tracking-tight">
            ₹{insights.arr > 1000 ? (insights.arr / 1000).toFixed(1) + 'k' : insights.arr.toLocaleString()}
          </div>
          <div className="text-[12px] font-medium text-green-600 mt-2">Projected MRR * 12</div>
        </div>

        <div className="bg-[#FAFAF8] border border-slate-200 rounded-2xl p-6">
          <div className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-2">Lifetime Customer Value</div>
          <div className="text-[28px] font-black text-slate-900 tracking-tight">₹{insights.ltv.toLocaleString()}</div>
          <div className="text-[12px] font-medium text-slate-500 mt-2">Based on avg 8mo retention</div>
        </div>
      </div>
    </div>
  )
}
