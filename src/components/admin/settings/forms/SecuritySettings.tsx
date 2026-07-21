'use client'

import { Input } from '@/components/ui/Input'
import { ShieldAlert, Plus, X } from 'lucide-react'
import { useState } from 'react'

export function SecuritySettings() {
  const [ips, setIps] = useState(['192.168.1.1', '10.0.0.5'])
  const [toggles, setToggles] = useState({
    twoFactor: true,
    activityLogs: true
  })

  return (
    <div className="max-w-3xl animate-in fade-in duration-300">
      <div className="mb-8">
        <h2 className="text-[18px] font-black text-slate-900">Security</h2>
        <p className="text-[13px] font-medium text-slate-500 mt-1">Configure firewalls, 2FA requirements, and data backup schedules.</p>
      </div>

      <div className="space-y-8">
        
        {/* Alerts */}
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex gap-3">
          <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-[13px] font-black text-red-900 mb-1">Unrecognized Login Attempt</h4>
            <p className="text-[12px] font-medium text-red-700">An attempt to access the admin portal from IP 45.33.22.1 was blocked on Oct 24, 2024.</p>
          </div>
        </div>

        {/* IP Whitelist */}
        <div>
          <h3 className="text-[14px] font-black text-slate-900 mb-4">IP Whitelist</h3>
          <p className="text-[12px] font-medium text-slate-500 mb-4">Only allow administrative access from these specific IP addresses. Leave empty to allow from anywhere.</p>
          <div className="space-y-3">
            {ips.map((ip, i) => (
              <div key={i} className="flex items-center gap-3">
                <Input value={ip} readOnly className="h-10 bg-slate-50 text-slate-700 border-slate-200" />
                <button className="w-10 h-10 shrink-0 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <div className="flex items-center gap-3">
              <Input placeholder="Enter IP address (e.g. 192.168.1.1)" className="h-10 bg-white border-slate-200 focus:border-primary" />
              <button className="w-10 h-10 shrink-0 flex items-center justify-center bg-primary text-white rounded-xl shadow-sm hover:bg-primary/90 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Access Policies */}
        <div className="pt-6 border-t border-slate-100">
          <h3 className="text-[14px] font-black text-slate-900 mb-4">Access Policies</h3>
          
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-[13px] font-black text-slate-900 mb-2">Password Policy</label>
              <select className="w-full h-11 px-3 bg-[#FAFAF8] border border-slate-200 text-slate-700 text-[13px] font-bold rounded-xl outline-none focus:border-primary focus:bg-white transition-colors cursor-pointer">
                <option>Strong (Min 12 chars, 1 Special)</option>
                <option>Standard (Min 8 chars)</option>
                <option>Custom</option>
              </select>
            </div>
            <div>
              <label className="block text-[13px] font-black text-slate-900 mb-2">Backup Schedule</label>
              <select className="w-full h-11 px-3 bg-[#FAFAF8] border border-slate-200 text-slate-700 text-[13px] font-bold rounded-xl outline-none focus:border-primary focus:bg-white transition-colors cursor-pointer">
                <option>Daily at Midnight</option>
                <option>Weekly on Sunday</option>
                <option>Monthly</option>
              </select>
            </div>
          </div>

          <div className="space-y-1 bg-white border border-slate-200 rounded-xl overflow-hidden">
            {[
              { key: 'twoFactor', label: 'Require Two-Factor Authentication', desc: 'Enforce 2FA for all administrative accounts.' },
              { key: 'activityLogs', label: 'Enable Detailed Activity Logs', desc: 'Store a trail of every action taken by administrators.' },
            ].map((item, i) => (
              <label key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 border-b border-slate-100 last:border-0 cursor-pointer">
                <div>
                  <div className="text-[13px] font-bold text-slate-900">{item.label}</div>
                  <div className="text-[12px] font-medium text-slate-500 mt-0.5">{item.desc}</div>
                </div>
                <button 
                  type="button"
                  onClick={() => setToggles({...toggles, [item.key]: !toggles[item.key as keyof typeof toggles]})}
                  className={`w-11 h-6 rounded-full relative transition-colors ${toggles[item.key as keyof typeof toggles] ? 'bg-primary' : 'bg-slate-300'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${toggles[item.key as keyof typeof toggles] ? 'left-6' : 'left-1'}`}></div>
                </button>
              </label>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
