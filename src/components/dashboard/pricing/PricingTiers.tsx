import { CheckCircle2, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

export function PricingTiers() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 max-w-4xl mx-auto">
      
      {/* Free Plan */}
      <div className="bg-[#FAFAF8] rounded-[24px] border border-slate-200 shadow-sm p-8 flex flex-col hover:shadow-md transition-shadow">
        <h3 className="text-xl font-black text-slate-900 mb-2">Free</h3>
        <div className="flex items-baseline gap-1 mb-6">
          <span className="text-4xl font-black text-slate-900">Free</span>
        </div>
        <p className="text-[14px] text-slate-500 font-medium mb-8">
          Perfect for trying out our basic features and creating your first resume.
        </p>
        
        <Button 
          variant="outline" 
          className="w-full h-12 text-[14px] font-bold rounded-xl border-slate-200 text-slate-400 bg-slate-50 cursor-default hover:bg-slate-50 hover:text-slate-400"
        >
          Current Plan
        </Button>

        <div className="mt-8 space-y-4 flex-1">
          <div className="text-[12px] font-bold text-slate-900 uppercase tracking-wider mb-4">What's included</div>
          {[
            '5 Resume Templates',
            '10 Resume Creations',
            'Basic ATS Score',
            'Basic AI Suggestions',
            'PDF Download',
            'Email Support'
          ].map((feature, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" strokeWidth={2.5} />
              <span className="text-[14px] font-medium text-slate-600">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pro Plan */}
      <div className="bg-primary rounded-[24px] shadow-xl p-8 flex flex-col relative transform lg:-translate-y-4">
        {/* Decorative Blur */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        
        <div className="absolute -top-4 inset-x-0 flex justify-center">
          <div className="bg-orange-500 text-white px-4 py-1 rounded-full text-[12px] font-black tracking-wider uppercase flex items-center gap-1.5 shadow-sm border border-orange-400/50">
            <Star className="w-3.5 h-3.5 fill-white" />
            Most Popular
          </div>
        </div>

        <h3 className="text-xl font-black text-white mb-2 relative z-10">Pro</h3>
        <div className="flex items-baseline gap-1 mb-6 relative z-10">
          <span className="text-4xl font-black text-white">$19</span>
          <span className="text-[14px] text-primary-50 font-medium">/month</span>
        </div>
        <p className="text-[14px] text-primary-50 font-medium mb-8 relative z-10">
          Unlock the full power of AI and build recruiter-approved resumes effortlessly.
        </p>
        
        <Button 
          className="w-full h-12 text-[14px] font-bold rounded-xl bg-white text-primary hover:bg-slate-50 relative z-10 shadow-sm"
        >
          Upgrade Now
        </Button>

        <div className="mt-8 space-y-4 flex-1 relative z-10">
          <div className="text-[12px] font-bold text-white uppercase tracking-wider mb-4">Everything in Free, plus</div>
          {[
            'Unlimited Resume Creation',
            'Unlimited ATS Analysis',
            'AI Resume Optimization',
            'Unlimited Templates',
            'Cover Letter Generator',
            'Interview Preparation',
            'Priority Support',
            'DOCX + PDF Download',
            'Resume History',
            'Cloud Storage'
          ].map((feature, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-white shrink-0" strokeWidth={2.5} />
              <span className="text-[14px] font-medium text-primary-50">{feature}</span>
            </div>
          ))}
        </div>
      </div>



    </div>
  )
}
