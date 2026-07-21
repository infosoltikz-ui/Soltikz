'use client'

export function SubscriptionAnalyticsCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-16">
      
      {/* Chart 1: Revenue Growth */}
      <div className="bg-white border border-slate-200 rounded-[18px] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[16px] font-black text-slate-900">Revenue Growth (MRR)</h3>
          <select className="bg-[#FAFAF8] border border-slate-200 rounded-lg px-2 py-1 text-[12px] font-bold text-slate-600 outline-none">
            <option>Last 6 Months</option>
            <option>This Year</option>
          </select>
        </div>
        
        <div className="h-64 w-full relative">
          <div className="absolute inset-0 flex flex-col justify-between text-[11px] font-bold text-slate-400">
            <div>₹40k</div>
            <div>₹30k</div>
            <div>₹20k</div>
            <div>₹10k</div>
            <div>₹0</div>
          </div>
          
          <div className="ml-10 h-full relative">
            <div className="absolute inset-0 flex justify-between">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="h-full w-px bg-slate-100"></div>
              ))}
            </div>
            
            <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible drop-shadow-sm absolute inset-0">
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#16A34A" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#16A34A" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path 
                d="M 0 200 L 0 160 Q 50 150 100 130 T 200 90 T 300 110 T 400 60 T 500 20 L 500 200 Z" 
                fill="url(#revenueGrad)"
              />
              <path 
                d="M 0 160 Q 50 150 100 130 T 200 90 T 300 110 T 400 60 T 500 20" 
                fill="none" 
                stroke="#16A34A" 
                strokeWidth="4" 
                strokeLinecap="round" 
                className="drop-shadow-md"
              />
            </svg>
          </div>
          
          <div className="ml-10 flex justify-between text-[11px] font-bold text-slate-400 mt-2">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
          </div>
        </div>
      </div>

      {/* Chart 2: Plan Distribution */}
      <div className="bg-white border border-slate-200 rounded-[18px] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[16px] font-black text-slate-900">Plan Distribution</h3>
        </div>
        
        <div className="h-64 flex items-center justify-center gap-12">
          
          {/* Doughnut SVG */}
          <div className="w-48 h-48 relative">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 drop-shadow-sm">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#F1F5F9" strokeWidth="16" />
              {/* Pro: 65% */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#16A34A" strokeWidth="16" strokeDasharray="251.2" strokeDashoffset={251.2 * 0.35} />
              {/* Enterprise: 15% */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#0F172A" strokeWidth="16" strokeDasharray="251.2" strokeDashoffset={251.2 * 0.85} transform="rotate(234 50 50)" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[24px] font-black text-slate-900">2.1k</span>
              <span className="text-[11px] font-bold text-slate-400">Total Users</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-sm bg-primary"></div>
              <div>
                <div className="text-[13px] font-bold text-slate-900">Pro Plan</div>
                <div className="text-[12px] font-medium text-slate-500">65% (1,419 users)</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-sm bg-slate-100"></div>
              <div>
                <div className="text-[13px] font-bold text-slate-900">Free Plan</div>
                <div className="text-[12px] font-medium text-slate-500">20% (436 users)</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-sm bg-slate-900"></div>
              <div>
                <div className="text-[13px] font-bold text-slate-900">Enterprise</div>
                <div className="text-[12px] font-medium text-slate-500">15% (329 users)</div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
