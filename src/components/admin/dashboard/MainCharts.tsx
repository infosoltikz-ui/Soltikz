'use client'

import { useState } from 'react'

export function MainCharts() {
  const [filter, setFilter] = useState('30 Days')

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
      
      {/* Line Chart */}
      <div className="bg-white border border-slate-200 rounded-[18px] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-[18px] font-black text-slate-900">User Registration Growth</h3>
            <p className="text-[13px] font-medium text-slate-500">Active new users over time</p>
          </div>
          <div className="flex gap-2">
            {['7 Days', '30 Days', '90 Days', '1 Year'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-[12px] font-bold rounded-lg transition-colors ${filter === f ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Custom SVG Line Chart */}
        <div className="ml-8 mr-2 mt-4 h-64 relative border-b border-l border-slate-100">
          <div className="absolute inset-0 flex flex-col justify-between">
            {[4,3,2,1,0].map(i => (
              <div key={i} className="w-full border-t border-slate-50 border-dashed h-0 relative">
                <span className="absolute -left-10 -top-2.5 w-8 text-right text-[10px] font-bold text-slate-400">{i * 250}</span>
              </div>
            ))}
          </div>
          
          <svg viewBox="0 0 500 200" className="absolute inset-0 w-full h-full overflow-visible preserve-aspect-ratio-none">
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#16A34A" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#16A34A" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Fill Area */}
            <path 
              d="M 0 180 C 100 150, 200 160, 250 120 S 400 80, 500 40 L 500 200 L 0 200 Z" 
              fill="url(#lineGrad)" 
            />
            {/* Stroke Line */}
            <path 
              d="M 0 180 C 100 150, 200 160, 250 120 S 400 80, 500 40" 
              fill="none" 
              stroke="#16A34A" 
              strokeWidth="4" 
              strokeLinecap="round" 
            />
          </svg>

          <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[10px] font-bold text-slate-400">
            <span>Jan 1</span>
            <span>Jan 10</span>
            <span>Jan 20</span>
            <span>Jan 30</span>
          </div>
        </div>
      </div>

      {/* Area Chart */}
      <div className="bg-white border border-slate-200 rounded-[18px] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-[18px] font-black text-slate-900">Resume Generation</h3>
            <p className="text-[13px] font-medium text-slate-500">Total resumes created by users</p>
          </div>
          <div className="flex gap-2 bg-slate-50 p-1 rounded-xl border border-slate-100">
            {['Daily', 'Weekly', 'Monthly'].map((f) => (
              <button
                key={f}
                className={`px-4 py-1.5 text-[12px] font-bold rounded-lg transition-colors ${f === 'Daily' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Custom SVG Area Chart */}
        <div className="ml-8 mr-2 mt-4 h-64 relative border-b border-l border-slate-100">
          <div className="absolute inset-0 flex flex-col justify-between">
            {[4,3,2,1,0].map(i => (
              <div key={i} className="w-full border-t border-slate-50 border-dashed h-0 relative">
                <span className="absolute -left-10 -top-2.5 w-8 text-right text-[10px] font-bold text-slate-400">{i * 50}</span>
              </div>
            ))}
          </div>
          
          <svg viewBox="0 0 500 200" className="absolute inset-0 w-full h-full overflow-visible preserve-aspect-ratio-none">
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F97316" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Fill Area */}
            <path 
              d="M 0 160 L 100 120 L 200 140 L 300 80 L 400 100 L 500 20 L 500 200 L 0 200 Z" 
              fill="url(#areaGrad)" 
            />
            {/* Stroke Line */}
            <path 
              d="M 0 160 L 100 120 L 200 140 L 300 80 L 400 100 L 500 20" 
              fill="none" 
              stroke="#F97316" 
              strokeWidth="4" 
              strokeLinejoin="round" 
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

    </div>
  )
}
