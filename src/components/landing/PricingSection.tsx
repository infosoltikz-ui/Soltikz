"use client";
import { Check, Minus, Loader2, Sparkles, Zap, Shield, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { PRO_MONTHLY, PRO_YEARLY, getPlan } from '@/utils/pricingPlans'
import Script from 'next/script'
import { toast } from 'react-hot-toast'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(true)
  const [currency, setCurrency] = useState<'INR' | 'USD'>('USD')
  const [isProcessing, setIsProcessing] = useState(false)
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz === 'Asia/Calcutta' || tz === 'Asia/Kolkata') {
      setCurrency('INR');
    } else {
      setCurrency('USD');
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

  const handleUpgrade = async () => {
    setIsProcessing(true)
    try {
      const selectedPlan = getPlan(isYearly)
      
      const res = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId: selectedPlan.id, currency })
      });
      const data = await res.json();

      if (res.status === 401 || data.error === 'Unauthorized') {
        window.location.href = '/login';
        return;
      }

      if (!data.success) throw new Error(data.error);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Resume Builder One",
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
              planId: selectedPlan.id
            })
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            toast.success('Payment successful! You are now on the Pro Plan. 🎉');
            window.location.href = '/dashboard';
          } else {
            toast.error('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: profile?.full_name || "User",
          email: profile?.email || "email@example.com",
        },
        theme: {
          color: "#0F2744"
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error(error);
      toast.error('Failed to initiate payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }

  const monthlyPrice = currency === 'INR' ? PRO_MONTHLY.amountInr : PRO_MONTHLY.amountUsd;
  const yearlyPrice = currency === 'INR' ? PRO_YEARLY.amountInr : PRO_YEARLY.amountUsd;
  const symbol = currency === 'INR' ? '₹' : '$';

  return (
    <section className="py-24 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden" id="pricing">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-emerald-500/5 blur-[130px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-[11px] font-black uppercase tracking-wider mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Simple, Transparent Pricing
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-slate-950 mb-5 tracking-tight">
            Free until you're serious. Then{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent">
              {symbol}{monthlyPrice}
            </span>.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            About the price of a single coffee a fortnight, for the month you're actively landing interviews. Cancel anytime from your settings in 2 clicks.
          </p>

          {/* Toggle Switch */}
          <div className="inline-flex items-center p-1.5 bg-white border border-slate-200/90 rounded-full shadow-sm">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-full text-xs sm:text-sm font-black transition-all cursor-pointer ${
                !isYearly 
                  ? 'bg-gradient-to-r from-[#0F2744] via-emerald-800 to-[#0F2744] text-white shadow-md' 
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-full text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
                isYearly 
                  ? 'bg-gradient-to-r from-[#0F2744] via-emerald-800 to-[#0F2744] text-white shadow-md' 
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              <span>Annual Plan</span>
              <span className="text-[10px] font-black text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-300">
                SAVE 35%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          
          {/* FREE TIER CARD */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-8 lg:p-10 flex flex-col hover:border-slate-300 hover:shadow-xl transition-all duration-300 relative group">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-black text-slate-900">Starter Free</h3>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                No Card Required
              </span>
            </div>
            
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-5xl sm:text-6xl font-black text-slate-950 tracking-tight">{symbol}0</span>
              <span className="text-slate-400 font-bold text-sm">/ forever</span>
            </div>
            
            <p className="text-slate-600 text-sm mb-8 leading-relaxed">
              Enough to build a real tailored resume, test AI tailoring, and verify ATS score parsing.
            </p>
            
            <Link href="/register">
              <button className="w-full py-3.5 px-6 rounded-2xl border-2 border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-900 font-black text-sm transition-all duration-200 shadow-2xs cursor-pointer mb-8">
                Get Started Free
              </button>
            </Link>

            <ul className="space-y-3.5 mt-auto">
              {[
                { text: '20 AI Tailored Resumes', included: true },
                { text: 'All 10 Resume Templates', included: true },
                { text: 'Instant Vector PDF Download', included: true },
                { text: 'Full-Time & C2C Resume Modes', included: true },
                { text: 'Advanced Word (.docx) Export', included: false },
                { text: 'Matching Cover Letter Studio', included: false },
              ].map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-[13px]">
                  {feature.included ? (
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                  ) : (
                    <Minus className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                  )}
                  <span className={feature.included ? "text-slate-700 font-medium" : "text-slate-400"}>
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* PRO TIER CARD (Radiant Gradient Border & Highlights) */}
          <div className="relative group flex flex-col">
            {/* Animated Glow Halo */}
            <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 opacity-60 blur-xs group-hover:opacity-100 transition duration-300" />
            
            <div className="relative flex-1 bg-white border border-slate-200/50 rounded-3xl p-8 lg:p-10 flex flex-col shadow-2xl">
              
              {/* Most Popular Floating Pill */}
              <div className="absolute -top-3.5 left-8 bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-[11px] font-black tracking-wider uppercase px-4 py-1 rounded-full shadow-md flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>Most Popular Choice</span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-black text-slate-900">Pro Career Pass</h3>
                <span className="text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  Unlimited Access
                </span>
              </div>

              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-5xl sm:text-6xl font-black text-slate-950 tracking-tight">
                  {symbol}{isYearly ? yearlyPrice : monthlyPrice}
                </span>
                <span className="text-slate-500 font-bold text-sm">/{isYearly ? 'year' : 'month'}</span>
              </div>

              <p className="text-slate-600 text-sm mb-8 leading-relaxed">
                For active job seekers sending multiple tailored applications who demand high interview conversion rates.
              </p>

              <button 
                onClick={handleUpgrade}
                disabled={isProcessing}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#0F2744] via-emerald-800 to-[#0F2744] hover:bg-[position:right_center] bg-[length:200%_auto] text-white font-black text-sm shadow-xl shadow-emerald-950/20 transition-all duration-300 transform group-hover:scale-[1.01] active:scale-[0.99] mb-8 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isProcessing && <Loader2 className="w-4 h-4 animate-spin text-emerald-300" />}
                <span>{isProcessing ? 'Connecting to Gateway...' : 'Upgrade to Pro Now'}</span>
                <ArrowRight className="w-4 h-4 text-emerald-300" />
              </button>

              <ul className="space-y-3.5 mt-auto">
                {[
                  'Unlimited AI tailored resumes',
                  'Word (.docx) & Vector PDF Export (All Templates)',
                  'Matching Cover Letter Studio with STAR points',
                  'Full ATS score diagnostics & 1-click rewrites',
                  'Strict 2-line bullets & keyword bolding',
                  'Target interview questions & prep sheet',
                  'Priority parser verification & support',
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-[13px]">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span className="text-slate-800 font-bold">{feature}</span>
                  </li>
                ))}
              </ul>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
