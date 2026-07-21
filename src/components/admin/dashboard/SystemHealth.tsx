'use client'

import { Activity, Server, Database, Cloud, Mail, Cpu, HardDrive, Users, Radio } from 'lucide-react'

const HEALTH_SERVICES = [
  { name: 'AI Engine', status: 'Healthy', uptime: '99.9%', icon: Cpu },
  { name: 'Email Service', status: 'Healthy', uptime: '99.99%', icon: Mail },
  { name: 'OTP Service', status: 'Healthy', uptime: '100%', icon: Radio },
  { name: 'Database', status: 'Healthy', uptime: '99.99%', icon: Database },
  { name: 'Cloud Storage', status: 'Healthy', uptime: '99.9%', icon: Cloud },
]

const METRICS = [
  { label: 'Server Response Time', value: '142ms', icon: Server, color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'Storage Usage', value: '68%', icon: HardDrive, color: 'text-purple-500', bg: 'bg-purple-50' },
  { label: 'Active Sessions', value: '1,284', icon: Users, color: 'text-orange-500', bg: 'bg-orange-50' },
  { label: 'API Requests Today', value: '182,340', icon: Activity, color: 'text-primary', bg: 'bg-green-50' },
]

export function SystemHealth() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
      
      {/* Platform Health */}
      <div className="bg-white border border-slate-200 rounded-[18px] p-6 shadow-sm">
        <h3 className="text-[18px] font-black text-slate-900 mb-1">Platform Health</h3>
        <p className="text-[13px] font-medium text-slate-500 mb-6">Real-time service status</p>
        
        <div className="space-y-3">
          {HEALTH_SERVICES.map((service, i) => {
            const Icon = service.icon
            return (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
                    <Icon className="w-4 h-4 text-slate-600" />
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-slate-900">{service.name}</div>
                    <div className="text-[11px] font-bold text-slate-400">Uptime: {service.uptime}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-primary text-[11px] font-black rounded-lg border border-green-100 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                  {service.status}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Live System Metrics */}
      <div className="bg-white border border-slate-200 rounded-[18px] p-6 shadow-sm">
        <h3 className="text-[18px] font-black text-slate-900 mb-1">Live System Metrics</h3>
        <p className="text-[13px] font-medium text-slate-500 mb-6">Current infrastructure load</p>
        
        <div className="grid grid-cols-2 gap-4">
          {METRICS.map((metric, i) => {
            const Icon = metric.icon
            return (
              <div key={i} className="p-4 rounded-xl border border-slate-100 bg-[#FAFAF8] flex flex-col items-start hover:border-slate-300 transition-colors">
                <div className={`w-10 h-10 rounded-xl mb-4 flex items-center justify-center ${metric.bg}`}>
                  <Icon className={`w-5 h-5 ${metric.color}`} />
                </div>
                <div className="text-[20px] font-black text-slate-900 mb-0.5">{metric.value}</div>
                <div className="text-[12px] font-bold text-slate-500">{metric.label}</div>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}
