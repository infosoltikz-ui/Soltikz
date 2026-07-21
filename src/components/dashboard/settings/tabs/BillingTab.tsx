import { CreditCard, Calendar, Download, ExternalLink, ArrowRight, Zap, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function BillingTab() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Current Plan Overview */}
      <div className="bg-primary rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl font-black">Pro Plan</h3>
              <span className="px-2.5 py-1 bg-white/20 text-white text-[10px] font-black rounded uppercase tracking-wider backdrop-blur-sm">
                Active
              </span>
            </div>
            <p className="text-[14px] text-primary-50 font-medium">
              You are currently on the monthly billing cycle.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button className="h-11 px-6 text-[13px] font-bold rounded-xl bg-white text-primary hover:bg-slate-50 shadow-sm">
              Upgrade Plan
            </Button>
            <Button variant="outline" className="h-11 px-6 text-[13px] font-bold rounded-xl border-white/20 text-white bg-transparent hover:bg-white/10">
              Manage Subscription
            </Button>
          </div>
        </div>
      </div>

      {/* Billing Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <h3 className="text-[15px] font-black text-slate-900 mb-6 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            Billing Cycle
          </h3>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-6 border-b border-slate-100">
              <span className="text-[13px] font-bold text-slate-500">Next Billing Date</span>
              <span className="text-[14px] font-black text-slate-900">September 01, 2026</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-bold text-slate-500">Amount to be Billed</span>
              <span className="text-[14px] font-black text-slate-900">$19.00 USD</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <h3 className="text-[15px] font-black text-slate-900 mb-6 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-slate-400" />
            Payment Method
          </h3>
          
          <div className="flex items-center justify-between pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-8 bg-slate-100 rounded flex items-center justify-center border border-slate-200 shrink-0">
                <span className="text-[11px] font-black text-slate-600">VISA</span>
              </div>
              <div>
                <div className="text-[14px] font-bold text-slate-900">Visa ending in 4589</div>
                <div className="text-[12px] text-slate-500">Expires 12/2028</div>
              </div>
            </div>
            <button className="text-[13px] font-bold text-primary hover:text-primary/80 transition-colors">
              Edit
            </button>
          </div>
          
          <div className="pt-6">
            <div className="text-[13px] font-bold text-slate-500 mb-1">Billing Address</div>
            <div className="text-[14px] font-medium text-slate-900">
              123 Startup Way, Suite 400<br />
              San Francisco, CA 94107
            </div>
          </div>
        </div>

      </div>

      {/* Invoice History */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <h3 className="text-[16px] font-black text-slate-900 mb-6">Invoice History</h3>
        
        <div className="space-y-4">
          
          <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-50 border border-green-100 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="text-[14px] font-bold text-slate-900">August 2026 — Pro Plan</div>
                <div className="text-[12px] font-medium text-slate-500 mt-0.5">Aug 01, 2026 • $19.00</div>
              </div>
            </div>
            <button className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center transition-colors text-slate-500 hover:text-slate-900">
              <Download className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl border border-transparent">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-50 border border-green-100 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="text-[14px] font-bold text-slate-900">July 2026 — Pro Plan</div>
                <div className="text-[12px] font-medium text-slate-500 mt-0.5">Jul 01, 2026 • $19.00</div>
              </div>
            </div>
            <button className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors text-slate-500 hover:text-slate-900">
              <Download className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl border border-transparent">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-50 border border-green-100 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="text-[14px] font-bold text-slate-900">June 2026 — Pro Plan</div>
                <div className="text-[12px] font-medium text-slate-500 mt-0.5">Jun 01, 2026 • $19.00</div>
              </div>
            </div>
            <button className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors text-slate-500 hover:text-slate-900">
              <Download className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

    </div>
  )
}
