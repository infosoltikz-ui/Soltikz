import { Button } from '@/components/ui/Button'

export function ResumeInsights() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[16px] font-black text-slate-900">Resume Insights</h3>
        <button className="text-[12px] font-bold text-slate-500 hover:text-primary transition-colors border border-slate-200 rounded-lg px-3 py-1.5">
          View Report
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center gap-8">
        
        {/* Radar Chart (Custom SVG implementation for layout) */}
        <div className="relative w-48 h-48">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Background Webs */}
            <polygon points="50,5 95,38 78,90 22,90 5,38" fill="none" stroke="#E5E7EB" strokeWidth="1" />
            <polygon points="50,20 80,42 68,80 32,80 20,42" fill="none" stroke="#E5E7EB" strokeWidth="1" />
            <polygon points="50,35 65,47 59,67 41,67 35,47" fill="none" stroke="#E5E7EB" strokeWidth="1" />
            
            {/* Axes */}
            <line x1="50" y1="50" x2="50" y2="5" stroke="#E5E7EB" strokeWidth="1" />
            <line x1="50" y1="50" x2="95" y2="38" stroke="#E5E7EB" strokeWidth="1" />
            <line x1="50" y1="50" x2="78" y2="90" stroke="#E5E7EB" strokeWidth="1" />
            <line x1="50" y1="50" x2="22" y2="90" stroke="#E5E7EB" strokeWidth="1" />
            <line x1="50" y1="50" x2="5" y2="38" stroke="#E5E7EB" strokeWidth="1" />

            {/* Data Polygon */}
            <polygon points="50,15 85,38 70,80 30,70 15,45" fill="rgba(22, 163, 74, 0.2)" stroke="#16A34A" strokeWidth="2" strokeLinejoin="round" />
            
            {/* Data Points */}
            <circle cx="50" cy="15" r="2.5" fill="#16A34A" />
            <circle cx="85" cy="38" r="2.5" fill="#16A34A" />
            <circle cx="70" cy="80" r="2.5" fill="#16A34A" />
            <circle cx="30" cy="70" r="2.5" fill="#16A34A" />
            <circle cx="15" cy="45" r="2.5" fill="#16A34A" />
          </svg>

          {/* Labels */}
          <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 text-[9px] font-bold text-slate-500">Content</div>
          <div className="absolute top-[35%] right-[-30px] text-[9px] font-bold text-slate-500">Keywords</div>
          <div className="absolute bottom-[-10px] right-[10%] text-[9px] font-bold text-slate-500">Skills</div>
          <div className="absolute bottom-[-10px] left-[5%] text-[9px] font-bold text-slate-500">Formatting</div>
          <div className="absolute top-[35%] left-[-35px] text-[9px] font-bold text-slate-500">Experience</div>
        </div>

        {/* Score Details */}
        <div className="flex-1 flex flex-col items-center text-center max-w-[140px]">
          <div className="relative w-20 h-20 mb-3">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100"
                strokeWidth="4"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-primary"
                strokeWidth="4"
                strokeDasharray="87, 100"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-black text-slate-900">87%</span>
            </div>
          </div>
          <h4 className="text-[15px] font-black text-slate-900 mb-1">Great Score!</h4>
          <p className="text-[10px] font-medium text-slate-500 mb-4 leading-tight">
            Your resumes are well optimized. Keep going!
          </p>
          <Button className="w-full h-8 text-[11px] font-bold rounded-lg shadow-sm">
            Improve Score
          </Button>
        </div>

      </div>
    </div>
  )
}
