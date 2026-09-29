'use client'

import { Layers, Users, IndianRupee, TrendingUp, Crown, Target } from 'lucide-react'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export function PricingAnalyticsCards() {
  const supabase = createClient()
  const [stats, setStats] = useState({
    totalPlans: 0,
    activeSubscribers: 0,
    monthlyRevenue: 0,
    annualRevenue: 0,
    popularPlan: 'Pro',
    conversionRate: 28
  })

  useEffect(() => {
    async function fetchStats() {
      const { count: plansCount } = await supabase.from('pricing_plans').select('*', { count: 'exact', head: true })
      
      const { data: profiles } = await supabase.from('profiles').select('plan_id')
      let activeSubscribers = 0
      let freeSubscribers = 0
      
      if (profiles) {
        profiles.forEach(p => {
          if (p.plan_id !== 'FREE') activeSubscribers++
          else freeSubscribers++
        })
      }

      // Fetch Pro plan price to estimate revenue
      const { data: proPlan } = await supabase.from('pricing_plans').select('price_inr').eq('id', 'PRO_MONTHLY').single()
      const price = proPlan?.price_inr || 499

      const monthlyRevenue = activeSubscribers * price
      const annualRevenue = monthlyRevenue * 12
      const totalUsers = activeSubscribers + freeSubscribers
      const conversionRate = totalUsers > 0 ? Math.round((activeSubscribers / totalUsers) * 100) : 0

      setStats({
        totalPlans: plansCount || 0,
        activeSubscribers,
        monthlyRevenue,
        annualRevenue,
        popularPlan: 'Pro', // Static for now, can be computed if multiple paid plans exist
        conversionRate
      })
    }
    fetchStats()
  }, [])

  const CARDS = [
    { title: 'Total Plans', value: stats.totalPlans.toLocaleString(), icon: Layers, color: 'text-slate-600', bg: 'bg-slate-50' },
    { title: 'Active Subscribers', value: stats.activeSubscribers.toLocaleString(), icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Monthly Revenue', value: `₹${stats.monthlyRevenue.toLocaleString()}`, growth: '+14%', icon: IndianRupee, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Annual Revenue', value: `₹${stats.annualRevenue.toLocaleString()}`, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Most Popular Plan', value: stats.popularPlan, icon: Crown, color: 'text-orange-500', bg: 'bg-orange-50' },
    { title: 'Conversion Rate', value: `${stats.conversionRate}%`, isCircular: true, icon: Target, color: 'text-primary', bg: 'bg-primary/10' },
  ]
  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 mb-6">
      {CARDS.map((card, i) => {
        const Icon = card.icon
        return (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl px-4 py-3.5 shadow-sm hover:shadow-md transition-all flex flex-col gap-2.5">
            
            <div className="flex justify-between items-center">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${card.bg}`}>
                <Icon className={`w-4 h-4 ${card.color}`} strokeWidth={2.2} />
              </div>
              
              {card.growth && (
                <div className="px-1.5 py-0.5 bg-green-50 text-green-700 text-[10px] font-black rounded-md border border-green-100">
                  {card.growth}
                </div>
              )}
            </div>

            <div>
              <p className="text-[11px] font-bold text-slate-500 mb-0.5">{card.title}</p>
              <div className="flex items-center justify-between">
                <h3 className="text-[18px] font-black text-slate-900 tracking-tight">{card.value}</h3>

                {/* Circular Progress */}
                {card.isCircular && (
                  <div className="w-6 h-6 relative flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                      <circle cx="18" cy="18" r="16" fill="none" className="stroke-slate-100" strokeWidth="4" />
                      <circle cx="18" cy="18" r="16" fill="none" className="stroke-primary" strokeWidth="4" strokeDasharray="100" strokeDashoffset={`${100 - stats.conversionRate}`} />
                    </svg>
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
