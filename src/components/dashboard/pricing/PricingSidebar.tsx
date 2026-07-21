import { CreditCard, FileText, Download, HardDrive, Sparkles, Receipt, Calendar, CheckCircle2 } from 'lucide-react'

export function PricingSidebar() {
  return (
    <div className="w-full xl:w-[320px] shrink-0 space-y-6">
      
      {/* Usage Summary */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <h3 className="text-[15px] font-black text-slate-900 mb-5 flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-primary" />
          Usage Summary
        </h3>
        
        <div className="space-y-5">
          {/* Resume Credits */}
          <div>
            <div className="flex items-center justify-between text-[13px] font-bold mb-2">
              <span className="text-slate-500 flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> Resume Credits</span>
              <span className="text-slate-900">8 / 10</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full w-[80%]"></div>
            </div>
          </div>

          {/* AI Credits */}
          <div>
            <div className="flex items-center justify-between text-[13px] font-bold mb-2">
              <span className="text-slate-500 flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-orange-500" /> AI Credits</span>
              <span className="text-slate-900">20 / 100</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 rounded-full w-[20%]"></div>
            </div>
          </div>

          {/* Downloads */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-[13px] font-bold text-slate-500 flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5" /> Total Downloads
            </span>
            <span className="text-[13px] font-black text-slate-900">42</span>
          </div>

        </div>
      </div>

      {/* Recent Billing */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <h3 className="text-[15px] font-black text-slate-900 mb-4 flex items-center gap-2">
          <Receipt className="w-4 h-4 text-slate-400" />
          Recent Billing
        </h3>
        
        <div className="space-y-4">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start justify-between">
            <div>
              <div className="text-[13px] font-bold text-slate-900">Invoice #INV-2023-08</div>
              <div className="text-[11px] font-medium text-slate-500 mt-0.5">Aug 01, 2023</div>
            </div>
            <span className="flex items-center gap-1 text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
              <CheckCircle2 className="w-3 h-3" /> Paid
            </span>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold text-slate-500">Payment Method</span>
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-4 bg-slate-200 rounded shrink-0"></div>
                <span className="text-[12px] font-black text-slate-900">•••• 4242</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold text-slate-500 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Renewal Date
              </span>
              <span className="text-[12px] font-black text-slate-900">Sep 01, 2023</span>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}
