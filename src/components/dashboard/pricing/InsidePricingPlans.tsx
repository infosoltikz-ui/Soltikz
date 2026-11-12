'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'
import Link from 'next/link'
import { Check, Minus, Loader2, Sparkles, ShieldCheck, ArrowRight, Crown, CheckCircle2 } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { createClient } from '@/utils/supabase/client'
import { PRO_MONTHLY, PRO_YEARLY, getPlan, isPremiumPlan, FREE_TIER_CREDITS } from '@/utils/pricingPlans'
import { cn } from '@/utils/cn'

export function InsidePricingPlans() {
  const [isYearly, setIsYearly] = useState(true)
  const [currency, setCurrency] = useState<'INR' | 'USD'>('USD')
  const [isProcessing, setIsProcessing] = useState(false)
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (tz === 'Asia/Calcutta' || tz === 'Asia/Kolkata') {
      setCurrency('INR')
    } else {
      setCurrency('USD')
    }

    const fetchProfile = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
        setProfile(data)
      }
    }
    fetchProfile()
  }, [])

  const isPro = isPremiumPlan(profile?.plan_id)

  const handleUpgrade = async () => {
    setIsProcessing(true)
    try {
      const selectedPlan = getPlan(isYearly)

      const res = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId: selectedPlan.id, currency }),
      })
      const data = await res.json()

      if (res.status === 401 || data.error === 'Unauthorized') {
        window.location.href = '/login'
        return
      }

      if (!data.success) throw new Error(data.error)

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: 'Resume Builder One',
        description: `Upgrade to ${selectedPlan.label}`,
        order_id: data.orderId,
        handler: async function (response: any) {
          const verifyRes = await fetch('/api/razorpay/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              planId: selectedPlan.id,
            }),
          })

          const verifyData = await verifyRes.json()
          if (verifyData.success) {
            toast.success('Payment successful! You are now on the Pro Plan.')
            window.location.href = '/dashboard'
          } else {
            toast.error('Payment verification failed. Please contact support.')
          }
        },
        prefill: {
          name: profile?.full_name || 'User',
          email: profile?.email || 'email@example.com',
        },
        theme: {
          color: '#0F2744',
        },
      }

      const rzp = new (window as any).Razorpay(options)
      rzp.open()
    } catch (error) {
      console.error(error)
      toast.error('Failed to initiate payment. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const monthlyPrice = currency === 'INR' ? PRO_MONTHLY.amountInr : PRO_MONTHLY.amountUsd
  const yearlyPrice = currency === 'INR' ? PRO_YEARLY.amountInr : PRO_YEARLY.amountUsd
  const symbol = currency === 'INR' ? '₹' : '$'

  return (
    <section id="pricing-plans" className="mb-14">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      {/* Top Billing Cadence Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF4FA] border border-slate-200/80 text-[#0F2744] text-[11px] font-extrabold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Transparent Plans</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Unlock Unlimited Tailored Applications
          </h2>
          <p className="text-[14px] text-slate-500 font-medium mt-1.5 max-w-xl">
            Start free with {FREE_TIER_CREDITS} AI resume builds. Upgrade to Pro for unlimited exports, Word (.docx) support, and complete interview preparation.
          </p>
        </div>

        {/* Billing Cycle Toggle */}
        <div className="inline-flex items-center p-1 bg-white border border-slate-200/90 rounded-2xl shadow-xs self-start md:self-auto shrink-0">
          <button
            type="button"
            onClick={() => setIsYearly(false)}
            className={cn(
              'px-4 py-2 rounded-xl text-[13px] font-bold transition-all cursor-pointer',
              !isYearly
                ? 'bg-[#0F2744] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            )}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setIsYearly(true)}
            className={cn(
              'px-4 py-2 rounded-xl text-[13px] font-bold transition-all cursor-pointer flex items-center gap-2',
              isYearly
                ? 'bg-[#0F2744] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            )}
          >
            <span>Annual</span>
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#B45309] border border-[#F59E0B]/30">
              2 Months Free
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Free Tier Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-8 flex flex-col shadow-xs hover:shadow-md transition-all duration-200 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-slate-200" />

          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                Starter Tier
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-0.5">Free Plan</h3>
            </div>
            {!isPro ? (
              <span className="inline-flex items-center gap-1.5 text-[11.5px] font-extrabold text-[#059669] bg-emerald-50 border border-emerald-200/80 px-3 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Current Plan
              </span>
            ) : (
              <span className="text-[11.5px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                Base Tier
              </span>
            )}
          </div>

          <div className="flex items-baseline gap-1.5 mb-3">
            <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight tabular-nums">
              {symbol}0
            </span>
            <span className="text-[13px] font-bold text-slate-400">/ lifetime</span>
          </div>

          <p className="text-[13.5px] text-slate-500 font-medium leading-relaxed mb-6">
            Ideal for testing our ATS-strict resume engine and creating targeted drafts before ramping up applications.
          </p>

          <Link
            href="/dashboard/create"
            className="w-full h-12 px-5 rounded-xl border border-slate-200 hover:border-[#0F2744] bg-[#F8FAFC] hover:bg-[#EEF4FA] text-slate-800 hover:text-[#0F2744] font-bold text-[13.5px] inline-flex items-center justify-center gap-2 transition-all mb-7"
          >
            <span>Open Resume Studio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="pt-5 border-t border-slate-100 flex-1">
            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-3.5">
              Included in Free
            </p>
            <ul className="space-y-3">
              {[
                { text: `${FREE_TIER_CREDITS} AI Tailored Resumes`, included: true },
                { text: 'All 10 Full-Time & C2C Templates', included: true },
                { text: 'Vector PDF Download', included: true },
                { text: 'ATS Keyword Match Score', included: true },
                { text: 'Word (.docx) Export', included: false },
                { text: 'Cover Letter & Interview Strategy Studio', included: false },
              ].map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-[13px]">
                  {feature.included ? (
                    <Check className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" strokeWidth={2.5} />
                  ) : (
                    <Minus className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                  )}
                  <span className={feature.included ? 'text-slate-700 font-semibold' : 'text-slate-400'}>
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pro Tier Card */}
        <div className="bg-[#0F2744] rounded-3xl border border-[#1E3A5F] p-7 sm:p-8 flex flex-col text-white shadow-xl shadow-slate-900/15 relative overflow-hidden group">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#F59E0B] via-amber-400 to-[#F59E0B]" />
          <div
            className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #F59E0B 0%, transparent 70%)' }}
          />

          <div className="relative z-10 flex items-center justify-between gap-3 mb-4">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#F59E0B]">
                Most Popular
              </span>
              <h3 className="text-xl font-black text-white mt-0.5 flex items-center gap-2">
                <span>Pro Career Pass</span>
              </h3>
            </div>
            {isPro ? (
              <span className="inline-flex items-center gap-1.5 text-[11.5px] font-extrabold text-emerald-300 bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 rounded-full">
                <Crown className="w-3.5 h-3.5 text-[#F59E0B]" />
                Active Plan
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-[#0F2744] bg-[#F59E0B] px-3 py-1 rounded-full shadow-xs">
                <Crown className="w-3 h-3" />
                Unlimited Access
              </span>
            )}
          </div>

          <div className="relative z-10 flex items-baseline gap-2 mb-3">
            <span className="text-4xl sm:text-5xl font-black text-white tracking-tight tabular-nums">
              {symbol}{isYearly ? yearlyPrice : monthlyPrice}
            </span>
            <span className="text-[13px] font-semibold text-slate-300">
              / {isYearly ? 'year' : 'month'}
            </span>
            {isYearly && (
              <span className="ml-2 text-[11.5px] font-bold text-[#F59E0B]">
                ({symbol}{Math.round(yearlyPrice / 12)}/mo effective)
              </span>
            )}
          </div>

          <p className="relative z-10 text-[13.5px] text-slate-300 font-medium leading-relaxed mb-6">
            Built for active candidates tailoring every application for maximum shortlist rate and interview readiness.
          </p>

          {isPro ? (
            <Link
              href="/dashboard/settings?tab=billing"
              className="relative z-10 w-full h-12 px-5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-[13.5px] inline-flex items-center justify-center gap-2 transition-all mb-7"
            >
              <ShieldCheck className="w-4 h-4 text-[#F59E0B]" />
              <span>Manage Active Subscription</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleUpgrade}
              disabled={isProcessing}
              className="relative z-10 w-full h-12 px-5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] disabled:opacity-70 text-[#0F2744] font-black text-[14px] shadow-lg shadow-amber-500/20 inline-flex items-center justify-center gap-2 transition-all cursor-pointer mb-7 hover:-translate-y-0.5"
            >
              {isProcessing && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>{isProcessing ? 'Connecting to Razorpay...' : 'Upgrade to Pro Now'}</span>
              {!isProcessing && <ArrowRight className="w-4 h-4" />}
            </button>
          )}

          <div className="relative z-10 pt-5 border-t border-white/10 flex-1">
            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-3.5">
              Everything in Free, plus
            </p>
            <ul className="space-y-3">
              {[
                'Unlimited AI tailored resumes for every JD',
                'Editable Word (.docx) & Vector PDF downloads',
                'Matching Cover Letter Studio with STAR framing',
                'Full ATS gap diagnostics & 1-click bullet rewrites',
                'Strict 2-line recruiter bullets & bold keywords',
                'Role-specific Tech, HR & STAR interview prep sheet',
                'Priority LinkedIn PDF parsing & support',
              ].map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-[13px]">
                  <Check className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" strokeWidth={2.75} />
                  <span className="text-slate-100 font-semibold">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

