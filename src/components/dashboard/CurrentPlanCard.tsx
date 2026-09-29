'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Crown, Sparkles, ArrowUpRight, Check, Zap, Infinity, CalendarDays } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { isPremiumPlan, FREE_TIER_CREDITS } from '@/utils/pricingPlans'
import { format } from 'date-fns'

interface CurrentPlanCardProps {
  initialPlanId?: string
  initialCreditsRemaining?: number
  totalResumes?: number
}

export function CurrentPlanCard({
  initialPlanId = 'FREE',
  initialCreditsRemaining = FREE_TIER_CREDITS,
  totalResumes = 0,
}: CurrentPlanCardProps) {
  const [planId, setPlanId] = useState(initialPlanId)
  const [resumesCount, setResumesCount] = useState(totalResumes)
  const [planStart, setPlanStart] = useState<string | null>(null)
  const [planExpiry, setPlanExpiry] = useState<string | null>(null)
  const [isExpiringSoon, setIsExpiringSoon] = useState(false)

  useEffect(() => {
    async function loadData() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Fetch latest profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('plan_id, credits_remaining, resumes_generated, created_at')
        .eq('id', user.id)
        .single()

      // Fetch actual resumes count from resumes_v2
      const { count } = await supabase
        .from('resumes_v2')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id)

      // Fetch latest subscription/payment
      const { data: payment } = await supabase
        .from('payments_and_subscriptions')
        .select('created_at, valid_until')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (profile) {
        setPlanId(profile.plan_id || 'FREE')
        
        // For FREE plan, start is profile creation, no expiry
        if (!profile.plan_id || profile.plan_id === 'FREE') {
          setPlanStart(profile.created_at)
          setPlanExpiry(null) // Lifetime
          setIsExpiringSoon(false)
        } else if (payment) {
          // For PRO plan, use payment dates
          setPlanStart(payment.created_at)
          setPlanExpiry(payment.valid_until)
          
          if (payment.valid_until) {
            const expiryDate = new Date(payment.valid_until)
            const today = new Date()
            const diffTime = expiryDate.getTime() - today.getTime()
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
            setIsExpiringSoon(diffDays <= 5 && diffDays >= 0)
          } else {
            setIsExpiringSoon(false)
          }
        } else {
          // Fallback if payment record is missing but plan is PRO
          setPlanStart(profile.created_at)
          setPlanExpiry(null)
          setIsExpiringSoon(false)
        }
      }

      // Calculate the maximum possible generated count
      const spentFreeCredits = profile?.plan_id === 'FREE' ? Math.max(0, 10 - (profile.credits_remaining ?? 10)) : 0;
      const permanentCount = Math.max(
        profile?.resumes_generated ?? 0,
        (typeof count === 'number' ? count : 0),
        spentFreeCredits
      );
      setResumesCount(permanentCount);
    }
    loadData()
  }, [])

  const isPremium = isPremiumPlan(planId)
  const freeAllocation = FREE_TIER_CREDITS
  const usedCount = isPremium ? resumesCount : Math.min(freeAllocation, resumesCount)
  const remainingCount = Math.max(0, freeAllocation - resumesCount)
  const usagePercentage = Math.min(100, Math.round((usedCount / freeAllocation) * 100))

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between hover:border-slate-300 transition-colors">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              isPremium ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
            }`}>
              <Crown className="w-4 h-4" strokeWidth={2.2} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-[14px]">
                {isPremium ? 'Pro Subscription' : 'Account & Plan Status'}
              </h4>
              <p className="text-[11px] text-slate-500 font-medium">
                {isPremium ? 'Full unlimited access active' : 'Standard 20 Free Resumes tier'}
              </p>
            </div>
          </div>
          <span className={`px-2.5 py-0.5 text-[11px] font-semibold rounded-md border ${
            isPremium 
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
              : 'bg-slate-50 text-slate-600 border-slate-200'
          }`}>
            {isPremium ? 'Active Plan' : 'Free Tier'}
          </span>
        </div>

        {/* Plan Dates Info */}
        <div className={`mb-4 rounded-lg p-3 border flex items-center justify-between ${isExpiringSoon ? 'bg-red-50/50 border-red-200' : 'bg-slate-50/80 border-slate-100'}`}>
          <div className="flex flex-col">
            <span className={`text-[11px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1 ${isExpiringSoon ? 'text-red-500' : 'text-slate-500'}`}>
              <CalendarDays className="w-3 h-3" /> Plan Started
            </span>
            <span className="text-[13px] font-bold text-slate-800">
              {planStart ? format(new Date(planStart), 'MMM d, yyyy') : 'N/A'}
            </span>
          </div>
          <div className={`w-px h-8 ${isExpiringSoon ? 'bg-red-200' : 'bg-slate-200'}`}></div>
          <div className="flex flex-col text-right">
            <span className={`text-[11px] font-bold uppercase tracking-wider mb-1 flex items-center justify-end gap-1 ${isExpiringSoon ? 'text-red-500' : 'text-slate-500'}`}>
              <CalendarDays className="w-3 h-3" /> Valid Until
            </span>
            <span className={`text-[13px] font-bold ${
              isExpiringSoon ? 'text-red-600' : (isPremium ? 'text-emerald-700' : 'text-slate-800')
            }`}>
              {planExpiry ? format(new Date(planExpiry), 'MMM d, yyyy') : 'Lifetime'}
            </span>
          </div>
        </div>

        {/* 2-Bar Comparison Layout */}
        <div className="space-y-3.5 mb-5">
          {/* Bar 1: Free Tier Allowance */}
          <div className="p-3 rounded-lg border border-slate-200/80 bg-slate-50/50">
            <div className="flex items-center justify-between text-[12px] font-semibold text-slate-700 mb-1.5">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                Free Tier Usage
              </span>
              <span className="font-bold text-slate-900">
                {isPremium ? 'Unlimited' : `${usedCount} of ${freeAllocation} used`}
              </span>
            </div>

            <div className="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${isPremium ? 100 : usagePercentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium mt-2 pt-1.5 border-t border-slate-200/50">
              <span>Resumes created: <strong className="text-slate-800">{resumesCount}</strong></span>
              <span>
                {isPremium ? (
                  <strong className="text-emerald-700">Unlimited</strong>
                ) : (
                  <>Remaining: <strong className="text-slate-800">{remainingCount} left</strong></>
                )}
              </span>
            </div>
          </div>

          {/* Bar 2: Upgraded Pro Tier Bar */}
          <div className={`p-3 rounded-lg border transition-all ${
            isPremium 
              ? 'border-emerald-300 bg-emerald-50/30' 
              : 'border-emerald-200/80 bg-emerald-50/20'
          }`}>
            <div className="flex items-center justify-between text-[12px] font-bold text-emerald-950 mb-1.5">
              <span className="flex items-center gap-1.5 text-emerald-800">
                <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                Upgraded Pro Tier
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-white border border-emerald-200 px-2 py-0.2 rounded">
                <Infinity className="w-3 h-3 text-emerald-600" /> Unlimited
              </span>
            </div>

            <div className="w-full h-2 bg-emerald-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                style={{ width: '100%' }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-emerald-900/80 font-medium mt-2 pt-1.5 border-t border-emerald-200/50">
              <span>✓ Unlimited AI Generations</span>
              <span>✓ Full-Time + C2C Templates</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="pt-1">
        <Link href="/dashboard/pricing" className="block">
          <button className={`w-full h-9 rounded-lg text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-all ${
            isPremium
              ? 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200'
              : 'bg-primary text-white hover:bg-primary-dark shadow-sm hover:shadow'
          }`}>
            <span>{isPremium ? 'Manage Pro Subscription' : 'Upgrade to Pro'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </Link>
      </div>
    </div>
  )
}
