'use client'

export function SecondaryCharts() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
      
      {/* Doughnut Chart */}
      <div className="bg-white border border-slate-200 rounded-[18px] p-6 shadow-sm xl:col-span-1">
        <h3 className="text-[18px] font-black text-slate-900 mb-1">Subscription Distribution</h3>
        <p className="text-[13px] font-medium text-slate-500 mb-8">Active user plans</p>
        
        <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
            {/* Free */}
            <circle cx="50" cy="50" r="40" fill="none" stroke="#F1F5F9" strokeWidth="20" />
            {/* Enterprise */}
            <circle cx="50" cy="50" r="40" fill="none" stroke="#EA580C" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="180" />
            {/* Pro */}
            <circle cx="50" cy="50" r="40" fill="none" stroke="#16A34A" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="75" />
          </svg>
          <div className="absolute text-center flex flex-col items-center justify-center">
            <span className="text-2xl font-black text-slate-900">72%</span>
            <span className="text-[11px] font-bold text-slate-400">Pro Plan</span>
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

      {/* Bar Chart */}
      <div className="bg-white border border-slate-200 rounded-[18px] p-6 shadow-sm xl:col-span-2">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-[18px] font-black text-slate-900">Revenue Overview</h3>
            <p className="text-[13px] font-medium text-slate-500">Monthly breakdown</p>
          </div>
          <div className="flex gap-2">
            <select className="bg-slate-50 border border-slate-200 text-slate-700 text-[13px] font-bold rounded-lg px-3 py-1.5 outline-none focus:border-primary">
              <option>Monthly Revenue</option>
              <option>Quarterly Revenue</option>
              <option>Annual Revenue</option>
            </select>
          </div>
        </div>

        <div className="w-full h-64 flex items-end justify-between gap-2 px-2 border-b border-slate-100">
          {[40, 55, 30, 75, 90, 65, 80, 100, 70, 85, 95, 110].map((val, i) => (
            <div key={i} className="w-full max-w-[40px] flex flex-col items-center gap-3 group">
              <div 
                className="w-full bg-primary/20 hover:bg-primary rounded-t-md transition-colors relative cursor-pointer"
                style={{ height: `${(val / 110) * 100}%` }}
              >
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  ${val}k
                </div>
              </div>
              <span className="text-[11px] font-bold text-slate-400">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
