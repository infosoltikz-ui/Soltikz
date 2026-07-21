'use client'

import { Crown, ArrowUpRight, Zap, Target } from 'lucide-react'

export function PricingRightSidebar() {
  return (
    <aside className="w-[320px] shrink-0 border-l border-slate-100 bg-white flex flex-col h-[calc(100vh-80px)] overflow-y-auto sticky top-20">
      
      {/* Most Popular */}
      <div className="p-6 border-b border-slate-100">
        <h3 className="text-[14px] font-black text-slate-900 mb-4">Most Popular</h3>
        
        <div className="bg-[#FAFAF8] border-2 border-primary/20 rounded-xl p-5 relative overflow-hidden group hover:border-primary/40 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
          
          <div className="flex items-center justify-between mb-4 relative">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
              <Crown className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded">#1 Plan</span>
          </div>

          <div className="relative">
            <h4 className="text-[18px] font-black text-slate-900">Pro Plan</h4>
            <p className="text-[12px] font-bold text-slate-500 mt-1 mb-4">65% of all active users choose this plan.</p>
            <div className="text-[24px] font-black text-slate-900 tracking-tight">₹499<span className="text-[13px] font-bold text-slate-500 tracking-normal">/mo</span></div>
          </div>
        </div>
      </div>

      {/* Recent Upgrades */}
      <div className="p-6 border-b border-slate-100">
        <h3 className="text-[14px] font-black text-slate-900 mb-4">Recent Upgrades</h3>
        <div className="space-y-4">
          {[
            { user: 'm.chen@dev.io', from: 'Free', to: 'Pro' },
            { user: 'Acme Corp', from: 'Pro', to: 'Enterprise' },
            { user: 'sarah.j@email.com', from: 'Free', to: 'Pro' },
          ].map((u, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                <ArrowUpRight className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-bold text-slate-900 truncate">{u.user}</div>
                <div className="text-[11px] font-medium text-slate-500">Upgraded: {u.from} → {u.to}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6">
        <h3 className="text-[14px] font-black text-slate-900 mb-4">Quick Actions</h3>
        <div className="space-y-2">
          <button className="w-full bg-[#FAFAF8] hover:bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between group transition-colors">
            <span className="text-[12px] font-bold text-slate-700">Run Billing Sync</span>
            <Zap className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
          </button>
          <button className="w-full bg-[#FAFAF8] hover:bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between group transition-colors">
            <span className="text-[12px] font-bold text-slate-700">View Revenue Goals</span>
            <Target className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
          </button>
        </div>
      </div>

    </aside>
  )
}
