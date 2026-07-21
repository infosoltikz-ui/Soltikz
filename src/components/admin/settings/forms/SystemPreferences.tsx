'use client'

import { AlertTriangle, Trash2, RotateCw } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'

export function SystemPreferences() {
  const [toggles, setToggles] = useState({
    maintenance: false,
    debug: false
  })

  return (
    <div className="max-w-3xl animate-in fade-in duration-300">
      <div className="mb-8">
        <h2 className="text-[18px] font-black text-slate-900">System Preferences</h2>
        <p className="text-[13px] font-medium text-slate-500 mt-1">Manage global platform state, cache, and advanced configurations.</p>
      </div>

      <div className="space-y-8">
        
        {/* Global State */}
        <div>
          <h3 className="text-[14px] font-black text-slate-900 mb-4">Global State</h3>
          <div className="space-y-1 bg-white border border-slate-200 rounded-xl overflow-hidden">
            {[
              { key: 'maintenance', label: 'Maintenance Mode', desc: 'Take the platform offline for users. Admins retain access.', warning: true },
              { key: 'debug', label: 'Enable Debug Logs', desc: 'Write verbose logs to the console for troubleshooting.', warning: false },
            ].map((item, i) => (
              <label key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 border-b border-slate-100 last:border-0 cursor-pointer">
                <div>
                  <div className={`text-[13px] font-bold ${item.warning && toggles[item.key as keyof typeof toggles] ? 'text-orange-600' : 'text-slate-900'}`}>{item.label}</div>
                  <div className="text-[12px] font-medium text-slate-500 mt-0.5">{item.desc}</div>
                </div>
                <button 
                  type="button"
                  onClick={() => setToggles({...toggles, [item.key]: !toggles[item.key as keyof typeof toggles]})}
                  className={`w-11 h-6 rounded-full relative transition-colors ${toggles[item.key as keyof typeof toggles] ? (item.warning ? 'bg-orange-500' : 'bg-primary') : 'bg-slate-300'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${toggles[item.key as keyof typeof toggles] ? 'left-6' : 'left-1'}`}></div>
                </button>
              </label>
            ))}
          </div>
        </div>

        {/* Maintenance Tools */}
        <div className="pt-6 border-t border-slate-100">
          <h3 className="text-[14px] font-black text-slate-900 mb-4">Maintenance Tools</h3>
          <div className="grid grid-cols-2 gap-4">
            
            <div className="bg-[#FAFAF8] border border-slate-200 p-5 rounded-xl">
              <h4 className="text-[13px] font-black text-slate-900 mb-1">Cache Management</h4>
              <p className="text-[12px] font-medium text-slate-500 mb-4">Clear Redis cache to force a fresh pull from the database.</p>
              <Button variant="outline" className="w-full h-9 text-[12px]">
                <Trash2 className="w-3.5 h-3.5 mr-2" /> Clear Cache
              </Button>
            </div>

            <div className="bg-[#FAFAF8] border border-slate-200 p-5 rounded-xl">
              <h4 className="text-[13px] font-black text-slate-900 mb-1">Service Worker</h4>
              <p className="text-[12px] font-medium text-slate-500 mb-4">Restart background jobs and queue processors.</p>
              <Button variant="outline" className="w-full h-9 text-[12px]">
                <RotateCw className="w-3.5 h-3.5 mr-2" /> Restart Services
              </Button>
            </div>

          </div>
        </div>

        {/* Danger Zone */}
        <div className="pt-6 border-t border-slate-100">
          <h3 className="text-[14px] font-black text-red-600 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Danger Zone
          </h3>
          <div className="border border-red-200 rounded-xl overflow-hidden">
            <div className="p-5 bg-red-50/50 border-b border-red-100 flex items-center justify-between">
              <div>
                <h4 className="text-[13px] font-black text-slate-900 mb-1">Factory Reset</h4>
                <p className="text-[12px] font-medium text-slate-600">Revert all platform settings to their default values. This cannot be undone.</p>
              </div>
              <Button className="bg-red-600 hover:bg-red-700 text-white shrink-0 h-9 px-4 text-[12px]">
                Reset Settings
              </Button>
            </div>
            <div className="p-5 bg-red-50/50 flex items-center justify-between">
              <div>
                <h4 className="text-[13px] font-black text-slate-900 mb-1">Purge Database Logs</h4>
                <p className="text-[12px] font-medium text-slate-600">Permanently delete all activity logs and AI generation history older than 30 days.</p>
              </div>
              <Button className="bg-red-600 hover:bg-red-700 text-white shrink-0 h-9 px-4 text-[12px]">
                Purge Logs
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
