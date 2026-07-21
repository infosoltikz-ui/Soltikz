import { ArrowRight } from 'lucide-react'

export function ProfileCompletionBanner() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col lg:flex-row items-center gap-8 mt-6">
      
      {/* Left: Completion Score */}
      <div className="flex items-center gap-6 lg:w-1/2">
        <div className="relative w-16 h-16 shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-slate-100"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-primary"
              strokeWidth="3.5"
              strokeDasharray="95, 100"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[13px] font-black text-slate-900">95%</span>
          </div>
        </div>
        
        <div>
          <h4 className="text-[14px] font-black text-slate-900 mb-1">Profile Completion</h4>
          <p className="text-[12px] font-medium text-slate-500 leading-snug">
            Almost there! Complete your profile to get better AI suggestions and higher ATS scores.
          </p>
        </div>
      </div>

      {/* Divider for mobile, though usually flex handles it. We'll use border-l on lg screens */}
      <div className="hidden lg:block w-px h-12 bg-slate-100"></div>

      {/* Right: Next Step */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 lg:w-1/2 w-full pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
        <div>
          <h4 className="text-[14px] font-black text-slate-900 mb-1">Next Step</h4>
          <p className="text-[12px] font-medium text-slate-500 leading-snug">
            Add your work experience to improve your profile and create better resumes.
          </p>
        </div>
        <button className="shrink-0 h-10 px-4 rounded-xl border border-primary text-primary text-[13px] font-bold flex items-center gap-2 hover:bg-primary/5 transition-colors whitespace-nowrap">
          Add Experience
          <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
        </button>
      </div>

    </div>
  )
}
