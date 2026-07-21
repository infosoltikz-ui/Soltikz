import { Crown, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function PlanDetails() {
  const features = [
    'Unlimited Resumes',
    'AI Resume Optimization',
    'ATS Score Checker',
    'Premium Templates',
    'Cover Letter Generator',
    'Priority Support',
  ]

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 relative">
      <h3 className="text-[16px] font-black text-slate-900 mb-5">Plan Details</h3>
      
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        
        {/* Left: Plan Info Box */}
        <div className="flex-1 bg-[#F0FDF4] rounded-xl p-5 border border-primary/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-white border border-primary/20 flex items-center justify-center">
              <Crown className="w-4 h-4 text-primary" strokeWidth={2.5} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-[15px] font-black text-slate-900">Premium Plan</h4>
                <span className="bg-primary text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">Active</span>
              </div>
              <div className="text-[11px] font-bold text-slate-500">Valid till 25 May, 2025</div>
            </div>
          </div>
          <p className="text-[12.5px] font-medium text-slate-600 mt-4 mb-4 leading-relaxed">
            You have access to all premium features and unlimited AI tools.
          </p>
          <Button className="h-9 px-5 text-[12px] font-bold rounded-lg shadow-sm">
            Manage Plan
          </Button>
        </div>

        {/* Middle: Features List */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 gap-y-3">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" strokeWidth={3} />
                <span className="text-[13px] font-bold text-slate-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Resumes Used Circle */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="relative w-32 h-32 flex items-center justify-center">
            {/* Background Circle */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              {/* Colored sections to match the screenshot (green and yellow gradient effect) */}
              <path
                className="text-primary"
                strokeWidth="3.5"
                strokeDasharray="75, 100"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="text-center z-10 bg-white rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.05)] border border-slate-50">
              <div className="text-[10px] font-bold text-slate-500 mb-1">Resumes Used</div>
              <div className="text-2xl font-black text-slate-900 leading-none">12 <span className="text-lg text-slate-400 font-bold">/ &infin;</span></div>
              <div className="text-[10px] font-bold text-primary mt-1">Unlimited</div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Progress Bar */}
      <div className="border-t border-slate-100 pt-5">
        <div className="flex justify-between items-center mb-2">
          <div className="text-[13px] font-black text-slate-900">AI Generations Used</div>
          <div className="text-[13px] font-black text-slate-900">120 <span className="text-slate-400 font-bold">/ 500</span></div>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
          <div className="h-full bg-primary rounded-full" style={{ width: '24%' }}></div>
        </div>
        <div className="text-[11px] font-bold text-slate-400">Resets on 25 May, 2025</div>
      </div>

    </div>
  )
}
