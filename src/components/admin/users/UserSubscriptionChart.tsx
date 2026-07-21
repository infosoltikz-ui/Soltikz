'use client'

export function UserSubscriptionChart() {
  return (
    <div className="bg-white border border-slate-200 rounded-[18px] p-6 shadow-sm h-full flex flex-col">
      <h3 className="text-[18px] font-black text-slate-900 mb-1">Subscription Overview</h3>
      <p className="text-[13px] font-medium text-slate-500 mb-8">Current active user plans</p>
      
      <div className="relative w-full max-w-[240px] aspect-square mx-auto flex items-center justify-center flex-1">
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          {/* Free (Background/Full Ring) */}
          <circle cx="50" cy="50" r="40" fill="none" stroke="#F1F5F9" strokeWidth="20" />
          
          {/* Enterprise */}
          <circle cx="50" cy="50" r="40" fill="none" stroke="#EA580C" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="180" />
          
          {/* Pro */}
          <circle cx="50" cy="50" r="40" fill="none" stroke="#16A34A" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="75" />
        </svg>
        <div className="absolute text-center flex flex-col items-center justify-center">
          <span className="text-3xl font-black text-slate-900">72%</span>
          <span className="text-[12px] font-bold text-slate-400">Pro Plan</span>
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-6">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-primary"></span>
          <span className="text-[12px] font-bold text-slate-700">Pro</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-slate-100"></span>
          <span className="text-[12px] font-bold text-slate-700">Free</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-orange-600"></span>
          <span className="text-[12px] font-bold text-slate-700">Enterprise</span>
        </div>
      </div>
    </div>
  )
}
