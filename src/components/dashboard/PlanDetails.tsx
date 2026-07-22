import { Crown, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export function PlanDetails({
  planName,
  resumesUsed,
  validUntil,
  features
}: {
  planName: string
  resumesUsed: number
  validUntil: string | null
  features: string[]
}) {
  const isPremium = planName !== 'FREE'
  const limit = isPremium ? '∞' : '5'
  const usagePercent = isPremium ? 0 : (resumesUsed / 5) * 100

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 relative">
      <h3 className="text-[16px] font-black text-slate-900 mb-5">Plan Details</h3>
      
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        
        {/* Left: Plan Info Box */}
        <div className={`flex-1 ${isPremium ? 'bg-[#F0FDF4]' : 'bg-slate-50'} rounded-xl p-5 border ${isPremium ? 'border-primary/20' : 'border-slate-200'}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-8 h-8 rounded-full bg-white border flex items-center justify-center ${isPremium ? 'border-primary/20' : 'border-slate-200'}`}>
              <Crown className={`w-4 h-4 ${isPremium ? 'text-primary' : 'text-slate-400'}`} strokeWidth={2.5} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-[15px] font-black text-slate-900 uppercase">{planName}</h4>
                <span className={`${isPremium ? 'bg-primary' : 'bg-slate-400'} text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider`}>Active</span>
              </div>
              <div className="text-[11px] font-bold text-slate-500">{validUntil ? `Valid till ${validUntil}` : 'Forever Free'}</div>
            </div>
          </div>
          <p className="text-[12.5px] font-medium text-slate-600 mt-4 mb-4 leading-relaxed">
            {isPremium ? 'You have access to all premium features and unlimited AI tools.' : 'You are on the free plan. Upgrade to unlock unlimited features.'}
          </p>
          <Link href="/dashboard/pricing">
            <Button className="h-9 px-5 text-[12px] font-bold rounded-lg shadow-sm">
              {isPremium ? 'Manage Plan' : 'Upgrade Plan'}
            </Button>
          </Link>
        </div>

        {/* Middle: Features List */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 gap-y-3">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-2.5">
                <CheckCircle2 className={`w-4 h-4 ${isPremium ? 'text-primary' : 'text-slate-400'} shrink-0`} strokeWidth={3} />
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
              {/* Colored sections */}
              <path
                className={isPremium ? "text-primary" : (usagePercent >= 100 ? "text-red-500" : "text-blue-500")}
                strokeWidth="3.5"
                strokeDasharray={`${isPremium ? 100 : usagePercent}, 100`}
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="text-center z-10 bg-white rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.05)] border border-slate-50">
              <div className="text-[10px] font-bold text-slate-500 mb-1">Resumes Used</div>
              <div className="text-2xl font-black text-slate-900 leading-none">{resumesUsed} <span className="text-lg text-slate-400 font-bold">/ {limit}</span></div>
              <div className="text-[10px] font-bold text-primary mt-1">{isPremium ? 'Unlimited' : `${5 - resumesUsed} left`}</div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Progress Bar */}
      <div className="border-t border-slate-100 pt-5">
        <div className="flex justify-between items-center mb-2">
          <div className="text-[13px] font-black text-slate-900">AI Generations Used</div>
          <div className="text-[13px] font-black text-slate-900">{resumesUsed} <span className="text-slate-400 font-bold">/ {isPremium ? 'Unlimited' : '5'}</span></div>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
          <div className={`h-full ${isPremium ? 'bg-primary' : (usagePercent >= 100 ? 'bg-red-500' : 'bg-blue-500')} rounded-full`} style={{ width: `${isPremium ? 100 : usagePercent}%` }}></div>
        </div>
        <div className="text-[11px] font-bold text-slate-400">{isPremium ? 'Unlimited access' : 'Upgrade for unlimited AI generations'}</div>
      </div>

    </div>
  )
}
