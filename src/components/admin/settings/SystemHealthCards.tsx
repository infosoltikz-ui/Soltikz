'use client'

import { Database, Mail, BrainCircuit, HardDrive, CreditCard, Shield } from 'lucide-react'

const HEALTH_DATA = [
  { name: 'Database', icon: Database, status: 'Healthy', code: 'Operational' },
  { name: 'Email Service', icon: Mail, status: 'Healthy', code: 'SendGrid Online' },
  { name: 'AI Service', icon: BrainCircuit, status: 'Healthy', code: 'OpenAI 45ms ping' },
  { name: 'Storage', icon: HardDrive, status: 'Healthy', code: 'Cloudinary OK' },
  { name: 'Payment Gateway', icon: CreditCard, status: 'Connected', code: 'Stripe Webhooks OK' },
  { name: 'Authentication', icon: Shield, status: 'Secure', code: 'No breaches detected' },
]

export function SystemHealthCards() {
  return (
    <div className="mt-12 pt-12 border-t border-slate-100">
      <h3 className="text-[16px] font-black text-slate-900 mb-6">System Health</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {HEALTH_DATA.map((item, i) => {
          const Icon = item.icon
          return (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-5 h-5 text-slate-400" />
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
              </div>
              <div>
                <div className="text-[13px] font-black text-slate-900 mb-0.5">{item.name}</div>
                <div className="text-[11px] font-medium text-slate-500">{item.code}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
