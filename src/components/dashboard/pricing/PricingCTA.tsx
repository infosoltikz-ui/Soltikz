import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function PricingCTA() {
  return (
    <div className="bg-primary rounded-[32px] p-10 md:p-16 text-center relative overflow-hidden shadow-xl mb-12 max-w-4xl mx-auto">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight">
          Ready to Build Your Dream Resume?
        </h2>
        <p className="text-[15px] text-primary-50 font-medium mb-10 leading-relaxed max-w-xl mx-auto">
          Upgrade today and unlock premium AI-powered resume generation, ATS optimization, and recruiter-approved templates.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button 
            className="w-full sm:w-auto h-14 px-8 text-[15px] font-bold rounded-xl bg-white text-primary hover:bg-slate-50 shadow-sm"
          >
            Upgrade Now
          </Button>
          <Button 
            variant="outline"
            className="w-full sm:w-auto h-14 px-8 text-[15px] font-bold rounded-xl border-white/20 text-white bg-transparent hover:bg-white/10"
            rightIcon={<ArrowRight className="w-4 h-4" strokeWidth={2.5} />}
          >
            View Features
          </Button>
        </div>
      </div>
    </div>
  )
}
