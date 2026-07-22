'use client'

import { useState, useEffect } from 'react'
import { CreditCard, Calendar, Download, Zap, CheckCircle2, Loader2, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/utils/supabase/client'
import Script from 'next/script'

export function BillingTab() {
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<any>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const fetchProfile = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      setProfile(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const handleUpgrade = async () => {
    setIsProcessing(true)
    try {
      // 1. Create order on our backend
      const res = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: 'PRO_MONTHLY',
          amountInr: 499 // 499 INR for example
        })
      });
      const data = await res.json();
      
      if (!data.success) throw new Error(data.error);

      // 2. Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
        amount: data.amount, 
        currency: data.currency,
        name: "Soltkiz Resume Builder",
        description: "Upgrade to Pro Monthly",
        order_id: data.orderId, 
        handler: async function (response: any) {
          // 3. Verify Payment on Backend
          const verifyRes = await fetch('/api/razorpay/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              amount: 499,
              planId: 'PRO_MONTHLY'
            })
          });
          
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            alert('Payment successful! You are now on the Pro Plan.');
            fetchProfile(); // Refresh UI
          } else {
            alert('Payment verification failed.');
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
      alert('Failed to initiate payment.');
    } finally {
      setIsProcessing(false);
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
  }

  const isPro = profile?.plan_id === 'PRO_MONTHLY';

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      {/* Current Plan Overview */}
      <div className={`rounded-2xl shadow-xl p-8 text-white relative overflow-hidden ${isPro ? 'bg-primary' : 'bg-slate-800'}`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl font-black">{isPro ? 'Pro Plan' : 'Free Plan'}</h3>
              <span className="px-2.5 py-1 bg-white/20 text-white text-[10px] font-black rounded uppercase tracking-wider backdrop-blur-sm">
                Active
              </span>
            </div>
            {isPro ? (
              <p className="text-[14px] text-primary-50 font-medium">
                You currently have unlimited AI generation access.
              </p>
            ) : (
              <p className="text-[14px] text-slate-300 font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                You have {profile?.credits_remaining || 0} free AI credits remaining.
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {!isPro && (
              <Button 
                onClick={handleUpgrade}
                disabled={isProcessing}
                className="h-11 px-6 text-[13px] font-bold rounded-xl bg-white text-slate-900 hover:bg-slate-50 shadow-sm"
              >
                {isProcessing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Zap className="w-4 h-4 mr-2 text-amber-500" />}
                Upgrade for ₹499/mo
              </Button>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}
