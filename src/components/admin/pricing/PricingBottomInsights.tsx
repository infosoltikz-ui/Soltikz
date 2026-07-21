'use client'

export function PricingBottomInsights() {
  return (
    <div className="mt-16 pt-12 border-t border-slate-200 pb-12">
      <h3 className="text-[18px] font-black text-slate-900 mb-6">Subscription Insights</h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#FAFAF8] border border-slate-200 rounded-2xl p-6">
          <div className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-2">Average Revenue Per User</div>
          <div className="text-[28px] font-black text-slate-900 tracking-tight">₹420</div>
          <div className="text-[12px] font-medium text-green-600 mt-2">↑ 5% from last month</div>
        </div>

        <div className="bg-[#FAFAF8] border border-slate-200 rounded-2xl p-6">
          <div className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-2">Monthly Recurring Rev</div>
          <div className="text-[28px] font-black text-slate-900 tracking-tight">₹24.8k</div>
          <div className="text-[12px] font-medium text-green-600 mt-2">↑ 12% from last month</div>
        </div>

        <div className="bg-[#FAFAF8] border border-slate-200 rounded-2xl p-6">
          <div className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-2">Annual Recurring Rev</div>
          <div className="text-[28px] font-black text-slate-900 tracking-tight">₹298k</div>
          <div className="text-[12px] font-medium text-green-600 mt-2">↑ 18% YoY</div>
        </div>

        <div className="bg-[#FAFAF8] border border-slate-200 rounded-2xl p-6">
          <div className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-2">Lifetime Customer Value</div>
          <div className="text-[28px] font-black text-slate-900 tracking-tight">₹3,400</div>
          <div className="text-[12px] font-medium text-slate-500 mt-2">Based on avg 8mo retention</div>
        </div>
      </div>
    </div>
  )
}
