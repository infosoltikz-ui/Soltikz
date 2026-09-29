"use client";
import { Check, Minus, Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { PRO_MONTHLY, PRO_YEARLY, getPlan } from '@/utils/pricingPlans'
import Script from 'next/script'
import { toast } from 'react-hot-toast'
import { createClient } from '@/utils/supabase/client'

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
          color: "#22c55e"
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
    <section className="py-24 bg-slate-50">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Free until you're serious. Then<br className="hidden md:block" /> {symbol}{monthlyPrice}.
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            About the price of one coffee a fortnight, for the month you're actually job hunting. Cancel from settings in two clicks.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center p-1 bg-white border border-slate-200 rounded-full shadow-sm">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-colors ${
                !isYearly ? 'bg-[#18202F] text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-colors ${
                isYearly ? 'bg-[#18202F] text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Yearly <span className="font-normal text-slate-500">- two months free</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Tier */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 lg:p-10 flex flex-col">
            <h3 className="text-xl font-medium text-slate-900 mb-4">Free</h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-6xl font-black text-slate-900 tracking-tighter">{symbol}0</span>
            </div>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Enough to build a real résumé and judge the scoring for yourself.
            </p>
            <button className="w-full py-3.5 px-6 rounded-xl border border-slate-300 text-slate-900 font-bold hover:bg-slate-50 transition-colors mb-10">
              Create a free account
            </button>

            <ul className="space-y-4 mt-auto">
              {[
                { text: '10 tailored résumés', included: true },
                { text: 'All five templates', included: true },
                { text: 'Match score, without the breakdown', included: true },
                { text: 'PDF download', included: true },
                { text: 'No cover letters', included: false },
                { text: 'No Word export', included: false },
              ].map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  {feature.included ? (
                    <Check className="w-5 h-5 text-[#12734C] shrink-0 mt-0.5" />
                  ) : (
                    <Minus className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
                  )}
                  <span className={feature.included ? "text-slate-600" : "text-slate-400"}>{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pro Tier */}
          <div className="bg-white border border-slate-900 rounded-2xl p-8 lg:p-10 flex flex-col relative shadow-xl">
            <div className="absolute -top-4 left-8 bg-[#12734C] text-white text-xs font-bold px-4 py-1.5 rounded-full">
              What most students pick
            </div>
            <h3 className="text-xl font-medium text-slate-900 mb-4">Pro</h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-6xl font-black text-slate-900 tracking-tighter">{symbol}{isYearly ? yearlyPrice : monthlyPrice}</span>
              <span className="text-slate-500 font-medium">/{isYearly ? 'year' : 'month'}</span>
            </div>
            <p className="text-slate-500 mb-8 leading-relaxed">
              For an active search - when every application needs its own version and you want to know why a score is what it is.
            </p>
            <button 
              onClick={handleUpgrade}
              disabled={isProcessing}
              className="w-full py-3.5 px-6 rounded-xl bg-[#12734C] text-white font-bold hover:bg-[#0f603f] transition-colors mb-10 flex items-center justify-center gap-2"
            >
              {isProcessing && <Loader2 className="w-4 h-4 animate-spin" />}
              {isProcessing ? 'Processing...' : 'Upgrade to Pro'}
            </button>

            <ul className="space-y-4 mt-auto">
              {[
                'Unlimited tailored résumés',
                'The full match report, with one-click rewrites',
                'Cover letters from the same posting',
                'PDF and Word export',
                'Interview questions from the job description',
                'Version history',
                'Replies within a day',
              ].map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#12734C] shrink-0 mt-0.5" />
                  <span className="text-slate-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-500 font-medium">
            Studying? Verify a .edu address for 40% off - $5.40 a month.
          </p>
        </div>

        {/* Subscription Features Grid */}
        <div className="mt-32 max-w-6xl mx-auto">
          <div className="mb-10 text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              What you get with a subscription
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl">
              Built for the weeks when you're sending five or ten applications<br className="hidden md:block" /> and each one needs its own version.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 bg-white border border-slate-200 rounded-2xl overflow-hidden">
            {/* Feature 1 */}
            <div className="p-8 border-b border-slate-200 md:border-r">
              <div className="w-8 h-8 rounded bg-[#12734C]/10 text-[#12734C] flex items-center justify-center mb-6">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
              </div>
              <h4 className="text-[17px] font-bold text-slate-900 mb-2">Unlimited tailored résumés</h4>
              <p className="text-[15px] text-slate-500 leading-relaxed">
                A separate version for every posting, each stored with the job it was written for so you know which one you actually sent.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 border-b border-slate-200 md:border-r">
              <div className="w-8 h-8 rounded bg-[#12734C]/10 text-[#12734C] flex items-center justify-center mb-6">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              </div>
              <h4 className="text-[17px] font-bold text-slate-900 mb-2">The full match report</h4>
              <p className="text-[15px] text-slate-500 leading-relaxed">
                Not just a number. Every missing keyword, every weak bullet, every fix - with a one-click rewrite you approve.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 border-b border-slate-200">
              <div className="w-8 h-8 rounded bg-[#12734C]/10 text-[#12734C] flex items-center justify-center mb-6">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              <h4 className="text-[17px] font-bold text-slate-900 mb-2">Cover letters that match</h4>
              <p className="text-[15px] text-slate-500 leading-relaxed">
                Written from the same posting and the same résumé, so the story you tell in the letter is the story on the page.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 border-b border-slate-200 md:border-b-0 md:border-r">
              <div className="w-8 h-8 rounded bg-[#12734C]/10 text-[#12734C] flex items-center justify-center mb-6">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              </div>
              <h4 className="text-[17px] font-bold text-slate-900 mb-2">PDF and Word export</h4>
              <p className="text-[15px] text-slate-500 leading-relaxed">
                Some application portals only accept .docx. Both formats keep the same layout and stay readable to a parser.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 border-b border-slate-200 md:border-b-0 md:border-r">
              <div className="w-8 h-8 rounded bg-[#12734C]/10 text-[#12734C] flex items-center justify-center mb-6">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
              </div>
              <h4 className="text-[17px] font-bold text-slate-900 mb-2">Interview questions from the posting</h4>
              <p className="text-[15px] text-slate-500 leading-relaxed">
                The five things they're most likely to ask, drawn from the requirements you were just matched against.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-8">
              <div className="w-8 h-8 rounded bg-[#12734C]/10 text-[#12734C] flex items-center justify-center mb-6">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              </div>
              <h4 className="text-[17px] font-bold text-slate-900 mb-2">Version history</h4>
              <p className="text-[15px] text-slate-500 leading-relaxed">
                Every rewrite is saved. If the older wording was better, go back to it in one click.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
