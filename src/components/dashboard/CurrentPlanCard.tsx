'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Crown, ArrowUpRight, Zap, Infinity, CalendarDays, CheckCircle2 } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { isPremiumPlan, FREE_TIER_CREDITS } from '@/utils/pricingPlans'
import { format } from 'date-fns'
import { cn } from '@/utils/cn'

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
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data: profile } = await supabase
        .from('profiles')
        .select('plan_id, credits_remaining, resumes_generated, created_at')
        .eq('id', user.id)
        .single()

      const { count } = await supabase
        .from('resumes_v2')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id)

      const { data: payment } = await supabase
        .from('payments_and_subscriptions')
        .select('created_at, valid_until')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (profile) {
        setPlanId(profile.plan_id || 'FREE')

        if (!isPremiumPlan(profile.plan_id)) {
          setPlanStart(profile.created_at)
          setPlanExpiry(null)
          setIsExpiringSoon(false)
        } else if (payment) {
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
          setPlanStart(profile.created_at)
          setPlanExpiry(null)
          setIsExpiringSoon(false)
        }
      }

      const spentFreeCredits = !isPremiumPlan(profile?.plan_id)
        ? Math.max(0, FREE_TIER_CREDITS - (profile?.credits_remaining ?? FREE_TIER_CREDITS))
        : 0
      const permanentCount = Math.max(
        profile?.resumes_generated ?? 0,
        typeof count === 'number' ? count : 0,
        spentFreeCredits
      )
      setResumesCount(permanentCount)
    }
    loadData()
  }, [])

  const isPremium = isPremiumPlan(planId)
  const freeAllocation = FREE_TIER_CREDITS
  const usedCount = isPremium ? resumesCount : Math.min(freeAllocation, resumesCount)
  const remainingCount = Math.max(0, freeAllocation - resumesCount)
  const usagePercentage = Math.min(100, Math.round((usedCount / freeAllocation) * 100))

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 flex flex-col justify-between hover:border-slate-300 transition-all duration-200">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'w-9 h-9 rounded-xl flex items-center justify-center border',
                isPremium
                  ? 'bg-amber-50 border-amber-200 text-amber-700'
                  : 'bg-[#EEF4FA] border-[#0F2744]/10 text-[#0F2744]'
              )}
            >
              <Crown className="w-4 h-4" strokeWidth={2.2} />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-[15px]">
                {isPremium ? 'Pro Subscription' : 'Account & Plan Status'}
              </h4>
              <p className="text-xs text-slate-500 font-medium">
                {isPremium
                  ? 'Full unlimited workspace access active'
                  : `Standard ${FREE_TIER_CREDITS} Free Resumes tier`}
              </p>
            </div>
          </div>

          <span
            className={cn(
              'px-2.5 py-1 text-[11px] font-extrabold rounded-lg border',
              isPremium
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-slate-100 text-slate-700 border-slate-200'
            )}
          >
            {isPremium ? 'Active Pro' : 'Free Tier'}
          </span>
        </div>

        {/* Plan Dates Grid */}
        <div
          className={cn(
            'mb-4 rounded-xl p-3.5 border grid grid-cols-2 gap-3',
            isExpiringSoon
              ? 'bg-rose-50/50 border-rose-200'
              : 'bg-slate-50/80 border-slate-200/70'
          )}
        >
          <div>
            <span
              className={cn(
                'text-[10.5px] font-extrabold uppercase tracking-wider mb-1 flex items-center gap-1.5',
                isExpiringSoon ? 'text-rose-600' : 'text-slate-400'
              )}
            >
              <CalendarDays className="w-3.5 h-3.5" /> Plan Started
            </span>
            <span className="text-[13px] font-extrabold text-slate-900 tabular-nums">
              {planStart ? format(new Date(planStart), 'MMM d, yyyy') : 'Active'}
            </span>
          </div>

          <div className="border-l border-slate-200/80 pl-3.5">
            <span
              className={cn(
                'text-[10.5px] font-extrabold uppercase tracking-wider mb-1 flex items-center gap-1.5',
                isExpiringSoon ? 'text-rose-600' : 'text-slate-400'
              )}
            >
              <CalendarDays className="w-3.5 h-3.5" /> Valid Until
            </span>
            <span
              className={cn(
                'text-[13px] font-extrabold tabular-nums',
                isExpiringSoon
                  ? 'text-rose-600'
                  : isPremium
                  ? 'text-emerald-700'
                  : 'text-slate-900'
              )}
            >
              {planExpiry ? format(new Date(planExpiry), 'MMM d, yyyy') : 'Lifetime'}
            </span>
          </div>
        </div>

        {/* Plan Quota & Pro Comparison */}
        <div className="space-y-3 mb-5">
          {/* Free Tier Usage */}
          <div className="p-3.5 rounded-xl border border-slate-200/80 bg-white shadow-2xs">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0F2744]" />
                Free Tier Allowance
              </span>
              <span className="font-extrabold text-slate-900 tabular-nums">
                {isPremium ? 'Unlimited' : `${usedCount} of ${freeAllocation} used`}
              </span>
            </div>

            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={cn(
                  'h-full rounded-full transition-all duration-500',
                  usagePercentage >= 100 && !isPremium ? 'bg-amber-500' : 'bg-[#0F2744]'
                )}
                style={{ width: `${isPremium ? 100 : usagePercentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11.5px] text-slate-500 font-medium mt-2.5 pt-2 border-t border-slate-100">
              <span>
                Total generated: <strong className="text-slate-900 tabular-nums">{resumesCount}</strong>
              </span>
              <span>
                {isPremium ? (
                  <strong className="text-emerald-700">Unlimited Quota</strong>
                ) : (
                  <>
                    Remaining:{' '}
                    <strong
                      className={cn(
                        'tabular-nums',
                        remainingCount === 0 ? 'text-amber-700' : 'text-slate-900'
                      )}
                    >
                      {remainingCount} left
                    </strong>
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Upgraded Pro Membership Spotlight */}
          <div
            className={cn(
              'p-3.5 rounded-xl border transition-all',
              isPremium
                ? 'border-emerald-300 bg-emerald-50/40'
                : 'border-amber-200/90 bg-gradient-to-br from-amber-50/70 to-white'
            )}
          >
            <div className="flex items-center justify-between text-xs font-extrabold mb-2">
              <span className="flex items-center gap-1.5 text-[#0F2744]">
                <Zap className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                Soltkiz Pro Membership
              </span>
              <span className="inline-flex items-center gap-1 text-[10.5px] font-extrabold text-emerald-700 bg-white border border-emerald-200 px-2 py-0.5 rounded-md shadow-2xs">
                <Infinity className="w-3 h-3 text-emerald-600" /> Unlimited
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11.5px] text-slate-600 font-semibold mt-1">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Unlimited AI Generations
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Full-Time + C2C Templates
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div>
        <Link href="/dashboard/pricing" className="block">
          <button
            className={cn(
              'w-full h-10 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer',
              isPremium
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
                : 'bg-[#0F2744] hover:bg-[#0A1C33] text-white shadow-md shadow-[#0F2744]/15 hover:-translate-y-0.5'
            )}
          >
            <span>{isPremium ? 'Manage Pro Subscription' : 'Upgrade to Pro Unlimited'}</span>
            <ArrowUpRight className={cn('w-4 h-4', !isPremium && 'text-[#F59E0B]')} />
          </button>
        </Link>
      </div>
    </div>
  )
}
