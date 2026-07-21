'use client'

export function ResumeCharts() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
      
      {/* Line Chart: Daily Generation */}
      <div className="xl:col-span-2 bg-white border border-slate-200 rounded-[18px] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-[18px] font-black text-slate-900">Resume Generation Trend</h3>
            <p className="text-[13px] font-medium text-slate-500">Daily creation volume</p>
          </div>
          <select className="h-9 px-3 bg-[#FAFAF8] border border-slate-200 text-slate-700 text-[12px] font-bold rounded-lg outline-none cursor-pointer">
            <option>This Week</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
        </div>
        
        <div className="h-64 relative w-full flex items-end justify-between pb-6 border-b border-slate-100">
          {/* Chart Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between pb-6 pointer-events-none">
            <div className="w-full h-px bg-slate-100"></div>
            <div className="w-full h-px bg-slate-100"></div>
            <div className="w-full h-px bg-slate-100"></div>
            <div className="w-full h-px bg-slate-100"></div>
          </div>
          
          {/* SVG Line */}
          <div className="absolute inset-0 pb-6 w-full h-full">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
              {/* Gradient Def */}
              <defs>
                <linearGradient id="resumeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#16A34A" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#16A34A" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Area */}
              <path d="M 0 100 L 0 70 L 14 50 L 28 80 L 42 40 L 57 60 L 71 30 L 85 45 L 100 20 L 100 100 Z" fill="url(#resumeGradient)" />
              {/* Line */}
              <path d="M 0 70 L 14 50 L 28 80 L 42 40 L 57 60 L 71 30 L 85 45 L 100 20" fill="none" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          
          {/* X Axis Labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[11px] font-bold text-slate-400">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>
      </div>

      {/* Doughnut Chart: Types */}
      <div className="xl:col-span-1 bg-white border border-slate-200 rounded-[18px] p-6 shadow-sm flex flex-col">
        <h3 className="text-[18px] font-black text-slate-900 mb-1">Resume Types</h3>
        <p className="text-[13px] font-medium text-slate-500 mb-8">Distribution of targets</p>
        
        <div className="relative w-full max-w-[200px] aspect-square mx-auto flex items-center justify-center flex-1">
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
            {/* Background/Full Ring */}
            <circle cx="50" cy="50" r="40" fill="none" stroke="#F1F5F9" strokeWidth="20" />
            
            {/* C2C (Purple) */}
            <circle cx="50" cy="50" r="40" fill="none" stroke="#A855F7" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="160" />
            
            {/* Full-Time (Blue) */}
            <circle cx="50" cy="50" r="40" fill="none" stroke="#3B82F6" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="75" />
          </svg>
          <div className="absolute text-center flex flex-col items-center justify-center">
            <span className="text-3xl font-black text-slate-900">58k</span>
            <span className="text-[12px] font-bold text-slate-400">Total</span>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            <span className="text-[12px] font-bold text-slate-700">Full-Time (65%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-purple-500"></span>
            <span className="text-[12px] font-bold text-slate-700">C2C (35%)</span>
          </div>
        </div>
      </div>
      
    </div>
  )
}
