export function PricingStats() {
  return (
    <div className="mb-24 max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-10 md:p-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          
          <div className="flex flex-col items-center justify-center text-center pt-4 md:pt-0">
            <span className="text-4xl font-black text-primary mb-1 tracking-tight">100K+</span>
            <span className="text-[13px] font-bold text-slate-500 uppercase tracking-wider">Resumes Created</span>
          </div>

          <div className="flex flex-col items-center justify-center text-center pt-8 md:pt-0">
            <span className="text-4xl font-black text-slate-900 mb-1 tracking-tight">95%</span>
            <span className="text-[13px] font-bold text-slate-500 uppercase tracking-wider">ATS Success</span>
          </div>

          <div className="flex flex-col items-center justify-center text-center pt-8 md:pt-0">
            <span className="text-4xl font-black text-orange-500 mb-1 tracking-tight">50K+</span>
            <span className="text-[13px] font-bold text-slate-500 uppercase tracking-wider">Downloads</span>
          </div>

          <div className="flex flex-col items-center justify-center text-center pt-8 md:pt-0">
            <span className="text-4xl font-black text-slate-900 mb-1 tracking-tight">4.9★</span>
            <span className="text-[13px] font-bold text-slate-500 uppercase tracking-wider">User Rating</span>
          </div>

        </div>
      </div>
    </div>
  )
}
