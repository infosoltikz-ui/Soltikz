'use client'

import { Users, LayoutTemplate, DollarSign, Settings, ArrowRight, BarChart } from 'lucide-react'

const ACTIONS = [
  { title: 'Manage Users', desc: 'Suspend, delete, or view user accounts', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
  { title: 'Manage Templates', desc: 'Add or edit ATS resume templates', icon: LayoutTemplate, color: 'text-purple-500', bg: 'bg-purple-50' },
  { title: 'Manage Pricing', desc: 'Update plans and feature limits', icon: DollarSign, color: 'text-green-500', bg: 'bg-green-50' },
  { title: 'System Settings', desc: 'Configure global platform preferences', icon: Settings, color: 'text-slate-600', bg: 'bg-slate-100' },
]

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      {ACTIONS.map((action, i) => {
        const Icon = action.icon
        return (
          <div key={i} className="bg-white border border-slate-200 rounded-[18px] p-6 shadow-sm hover:shadow-md hover:border-primary/20 transition-all group cursor-pointer">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${action.bg}`}>
              <Icon className={`w-6 h-6 ${action.color}`} strokeWidth={2} />
            </div>
            <h4 className="text-[15px] font-black text-slate-900 mb-1">{action.title}</h4>
            <p className="text-[12px] font-medium text-slate-500 mb-6">{action.desc}</p>
            
            <div className="flex items-center text-[13px] font-bold text-primary group-hover:text-orange-500 transition-colors">
              Manage <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        )
      })}
    </div>
  )
}
