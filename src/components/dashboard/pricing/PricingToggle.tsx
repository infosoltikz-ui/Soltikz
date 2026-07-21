'use client'

import { useState } from 'react'
import { cn } from '@/utils/cn'

export function PricingToggle() {
  const [isYearly, setIsYearly] = useState(true)

  return (
    <div className="flex flex-col items-center mb-12">
      <div className="relative flex items-center bg-white border border-slate-200 rounded-full p-1 shadow-sm">
        <button
          onClick={() => setIsYearly(false)}
          className={cn(
            "relative w-32 py-2.5 text-[13px] font-bold rounded-full transition-all duration-300 z-10",
            !isYearly ? "text-white" : "text-slate-500 hover:text-slate-900"
          )}
        >
          Monthly
        </button>
        <button
          onClick={() => setIsYearly(true)}
          className={cn(
            "relative w-32 py-2.5 text-[13px] font-bold rounded-full transition-all duration-300 z-10",
            isYearly ? "text-white" : "text-slate-500 hover:text-slate-900"
          )}
        >
          Yearly
        </button>

        {/* Sliding Background */}
        <div 
          className={cn(
            "absolute top-1 bottom-1 w-32 bg-slate-900 rounded-full transition-transform duration-300 ease-out shadow-sm",
            isYearly ? "translate-x-32" : "translate-x-0"
          )}
        ></div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span className="text-[13px] font-bold text-slate-500">Save 20% on yearly plans</span>
        <span className="bg-green-100 text-primary px-2 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider">
          Save 20%
        </span>
      </div>
    </div>
  )
}
