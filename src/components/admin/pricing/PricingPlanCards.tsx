'use client'

import { CheckCircle2, Copy, Edit3, Power, HelpCircle } from 'lucide-react'
import { useState } from 'react'

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: '₹0',
    popular: false,
    status: 'Active',
    features: [
      { name: 'Resume Limit', val: '10' },
      { name: 'ATS Analysis', val: '10' },
      { name: 'AI Resume Optimization', val: 'Limited' },
      { name: 'Cover Letter', val: 'Not Included', disabled: true },
      { name: 'Templates', val: 'Basic' },
      { name: 'Storage', val: '100 MB' },
      { name: 'Downloads', val: 'PDF Only' },
      { name: 'Support', val: 'Community' },
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '₹499',
    period: '/ Month',
    popular: true,
    status: 'Active',
    features: [
      { name: 'Resume Limit', val: 'Unlimited' },
      { name: 'ATS Analysis', val: 'Unlimited' },
      { name: 'AI Resume Optimization', val: 'Unlimited' },
      { name: 'Templates', val: 'All Premium' },
      { name: 'Cover Letter Generator', val: 'Included' },
      { name: 'Interview Preparation', val: 'Included' },
      { name: 'Cloud Storage', val: '5 GB' },
      { name: 'Downloads', val: 'PDF + DOCX' },
      { name: 'Priority Support', val: 'Included' },
    ]
  }
]

interface PricingPlanCardsProps {
  onEditClick: (planId: string) => void;
}

export function PricingPlanCards({ onEditClick }: PricingPlanCardsProps) {
  const [billingCycle, setBillingCycle] = useState<'Monthly' | 'Yearly'>('Monthly')

  return (
    <div className="mt-8">
      
      <div className="flex justify-center mb-8">
        <div className="bg-[#FAFAF8] border border-slate-200 p-1 rounded-xl flex items-center">
          <button 
            onClick={() => setBillingCycle('Monthly')}
            className={`px-6 py-2 rounded-lg text-[13px] font-bold transition-all ${billingCycle === 'Monthly' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Monthly
          </button>
          <button 
            onClick={() => setBillingCycle('Yearly')}
            className={`px-6 py-2 rounded-lg text-[13px] font-bold transition-all ${billingCycle === 'Yearly' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Yearly <span className="text-[10px] text-green-600 bg-green-50 px-1.5 py-0.5 rounded ml-1">Save 20%</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto gap-6">
        {PLANS.map((plan) => (
          <div key={plan.id} className={`bg-white rounded-3xl p-8 relative flex flex-col ${plan.popular ? 'border-2 border-primary shadow-xl shadow-primary/5' : 'border border-slate-200 shadow-sm'}`}>
            
            {plan.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-[12px] font-black tracking-wider uppercase shadow-sm">
                Most Popular
              </div>
            )}

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[18px] font-black text-slate-900">{plan.name}</h3>
              <span className={`flex items-center gap-1.5 text-[11px] font-bold px-2 py-0.5 rounded-md ${plan.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${plan.status === 'Active' ? 'bg-green-500' : 'bg-slate-400'}`}></span>
                {plan.status}
              </span>
            </div>

            <div className="mb-8 flex items-end gap-1">
              <span className="text-[36px] font-black text-slate-900 tracking-tight leading-none">
                {plan.price === '₹499' ? (billingCycle === 'Yearly' ? '₹399' : '₹499') : plan.price}
              </span>
              {plan.period && <span className="text-[14px] font-bold text-slate-500 mb-1">{plan.period}</span>}
            </div>

            <div className="space-y-4 mb-8 flex-1">
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-center justify-between text-[13px]">
                  <span className={`font-medium flex items-center gap-1.5 ${feature.disabled ? 'text-slate-400' : 'text-slate-600'}`}>
                    {feature.name}
                    <HelpCircle className="w-3.5 h-3.5 text-slate-300" />
                  </span>
                  <span className={`font-black ${feature.disabled ? 'text-slate-400' : 'text-slate-900'}`}>{feature.val}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-6 border-t border-slate-100">
              <button 
                onClick={() => onEditClick(plan.id)}
                className="w-full h-11 bg-[#FAFAF8] border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl text-[13px] font-bold text-slate-700 flex items-center justify-center gap-2 transition-all"
              >
                <Edit3 className="w-4 h-4 text-slate-400" /> Edit
              </button>
              {plan.id === 'pro' && (
                <button className="w-full h-11 bg-[#FAFAF8] border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl text-[13px] font-bold text-slate-700 flex items-center justify-center gap-2 transition-all">
                  <Copy className="w-4 h-4 text-slate-400" /> Duplicate
                </button>
              )}
              {plan.id !== 'pro' && (
                <button className="w-full h-11 bg-white border border-red-200 hover:bg-red-50 rounded-xl text-[13px] font-bold text-red-600 flex items-center justify-center gap-2 transition-all">
                  <Power className="w-4 h-4" /> Disable
                </button>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}
