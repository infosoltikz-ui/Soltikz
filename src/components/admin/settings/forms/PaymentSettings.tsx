'use client'

import { Input } from '@/components/ui/Input'
import { CreditCard, CheckCircle2 } from 'lucide-react'

export function PaymentSettings() {
  return (
    <div className="max-w-3xl animate-in fade-in duration-300">
      <div className="mb-8">
        <h2 className="text-[18px] font-black text-slate-900">Payment Gateway</h2>
        <p className="text-[13px] font-medium text-slate-500 mt-1">Configure your primary payment processor for premium subscriptions.</p>
      </div>

      <div className="space-y-8">
        
        {/* Provider */}
        <div>
          <h3 className="text-[14px] font-black text-slate-900 mb-4">Payment Provider</h3>
          <div className="grid grid-cols-3 gap-4">
            <label className="flex items-center gap-3 p-4 bg-white border border-slate-200 hover:border-slate-300 rounded-xl cursor-pointer">
              <input type="radio" name="payment_provider" className="text-primary focus:ring-primary" />
              <span className="text-[13px] font-bold text-slate-900">Razorpay</span>
            </label>
            <label className="flex items-center gap-3 p-4 bg-white border-2 border-primary rounded-xl cursor-pointer shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-1.5 bg-green-50 rounded-bl-xl border-b border-l border-green-100">
                <CheckCircle2 className="w-3 h-3 text-green-600" />
              </div>
              <input type="radio" name="payment_provider" defaultChecked className="text-primary focus:ring-primary" />
              <span className="text-[13px] font-bold text-slate-900">Stripe</span>
            </label>
            <label className="flex items-center gap-3 p-4 bg-white border border-slate-200 hover:border-slate-300 rounded-xl cursor-pointer">
              <input type="radio" name="payment_provider" className="text-primary focus:ring-primary" />
              <span className="text-[13px] font-bold text-slate-900">PayPal</span>
            </label>
          </div>
        </div>

        {/* Configuration */}
        <div className="pt-6 border-t border-slate-100">
          <h3 className="text-[14px] font-black text-slate-900 mb-4">Stripe Configuration</h3>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-[13px] font-black text-slate-900 mb-2">Merchant Name</label>
              <Input defaultValue="Soltikz Technologies" className="h-11 bg-[#FAFAF8] border-slate-200 focus:bg-white" />
            </div>
            <div>
              <label className="block text-[13px] font-black text-slate-900 mb-2">Currency</label>
              <select className="w-full h-11 px-3 bg-[#FAFAF8] border border-slate-200 text-slate-700 text-[13px] font-bold rounded-xl outline-none focus:border-primary focus:bg-white transition-colors cursor-pointer">
                <option>INR (₹)</option>
                <option>USD ($)</option>
                <option>EUR (€)</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-[13px] font-black text-slate-900 mb-2">Publishable Key</label>
              <Input type="password" defaultValue="pk_test_************************" className="h-11 bg-[#FAFAF8] border-slate-200 focus:bg-white font-mono" />
            </div>
            <div>
              <label className="block text-[13px] font-black text-slate-900 mb-2">Secret Key</label>
              <Input type="password" defaultValue="sk_test_************************" className="h-11 bg-[#FAFAF8] border-slate-200 focus:bg-white font-mono" />
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="pt-6 border-t border-slate-100">
          <div className="bg-[#FAFAF8] border border-slate-200 p-5 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <div className="text-[13px] font-bold text-slate-900">Webhook Status</div>
                <div className="text-[12px] font-medium text-slate-500 mt-0.5">Listening to `invoice.payment_succeeded` and `customer.subscription.created`</div>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-50 text-green-700 text-[11px] font-black uppercase tracking-wider rounded-md border border-green-100">Connected</span>
          </div>
        </div>

      </div>
    </div>
  )
}
