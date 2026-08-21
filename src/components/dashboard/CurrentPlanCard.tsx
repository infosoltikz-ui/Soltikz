'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Crown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/utils/supabase/client'
import { isPremiumPlan } from '@/utils/pricingPlans'

export function CurrentPlanCard() {
  const [planId, setPlanId] = useState('FREE')
  const [creditsRemaining, setCreditsRemaining] = useState(5)

  useEffect(() => {
    async function loadData() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from('profiles')
        .select('plan_id, credits_remaining')
        .eq('id', user.id)
        .single()

      if (data) {
        setPlanId(data.plan_id || 'FREE')
        setCreditsRemaining(data.credits_remaining ?? 5)
      }
    }
    loadData()
  }, [])

  const isPremium = isPremiumPlan(planId)
  const maxResumes = 5
  const resumesUsed = Math.max(0, maxResumes - creditsRemaining)
  const resumePercentage = isPremium ? 100 : (resumesUsed / maxResumes) * 100

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-full relative overflow-hidden flex flex-col">
      {/* Decorative background element */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>

      <div className="flex items-center justify-between mb-5 relative z-10">
        <div className="flex items-center gap-2">
          <Crown className="w-4 h-4 text-orange-500" strokeWidth={2.5} />
          <h4 className="font-black text-slate-900 text-[15px]">{isPremium ? 'Pro Plan' : 'Free Plan'}</h4>
        </div>
        <span className="px-2 py-0.5 bg-green-100 text-primary text-[10px] font-black rounded uppercase tracking-wider">Active</span>
      </div>

      <div className="space-y-4 mb-6 relative z-10 flex-1">
        {/* Resume Usage */}
        <div>
          <div className="flex items-center justify-between text-[12px] font-bold mb-1.5">
            <span className="text-slate-500">Resumes Used</span>
            <span className="text-slate-900">{isPremium ? 'Unlimited' : `${resumesUsed} / ${maxResumes}`}</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: `${resumePercentage}%` }}></div>
          </div>
        </div>

        {/* AI Credits */}
        <div className="text-[12px] font-bold text-slate-500">
          <strong className="text-slate-900">{creditsRemaining}</strong> AI credits remaining
        </div>
      </div>

      <Link href="/dashboard/pricing">
        <Button className="w-full h-10 text-[13px] font-bold rounded-xl shadow-sm hover:shadow-md transition-all relative z-10">
          {isPremium ? 'Manage Plan' : 'Upgrade Plan'}
        </Button>
      </Link>
    </div>
  )
}
