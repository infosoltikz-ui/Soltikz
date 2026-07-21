import { Key, Shield, Smartphone, Monitor, Lock, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function SecurityTab() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Password Management */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <h3 className="text-[16px] font-black text-slate-900 mb-6">Password Management</h3>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50 p-6 rounded-xl border border-slate-100">
          <div>
            <div className="text-[14px] font-bold text-slate-900 mb-1">Current Password</div>
            <div className="text-[13px] text-slate-500 flex items-center gap-2">
              <span className="tracking-[0.2em] font-black mt-1">••••••••</span>
              <span>(Last changed 3 months ago)</span>
            </div>
          </div>
          <Button variant="outline" className="h-10 px-6 text-[13px] font-bold rounded-xl border-slate-200 bg-white">
            Change Password
          </Button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <h3 className="text-[16px] font-black text-slate-900 mb-6">Security Measures</h3>
        
        <div className="space-y-6">
          <div className="flex items-start justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <div className="text-[14px] font-bold text-slate-900 mb-1">Two-Factor Authentication</div>
                <div className="text-[13px] text-slate-500 max-w-lg">
                  Add an extra layer of security to your account by requiring both a password and a security code from your mobile device.
                </div>
              </div>
            </div>
            
            {/* Toggle switch placeholder */}
            <div className="w-11 h-6 bg-primary rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
            </div>
          </div>

          <div className="flex items-start justify-between gap-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-[14px] font-bold text-slate-900">Email Verification</div>
                  <span className="px-2 py-0.5 bg-green-100 text-primary text-[10px] font-black rounded uppercase tracking-wider">Verified</span>
                </div>
                <div className="text-[13px] text-slate-500">
                  Your email address <span className="font-medium text-slate-700">alex.wright@example.com</span> is verified.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Activity */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[16px] font-black text-slate-900">Login Activity</h3>
          <button className="text-[13px] font-bold text-primary hover:text-primary/80 transition-colors">
            View All Sessions
          </button>
        </div>
        
        <div className="space-y-4">
          
          <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0">
                <Monitor className="w-4 h-4 text-slate-400" />
              </div>
              <div>
                <div className="text-[13px] font-bold text-slate-900 flex items-center gap-2">
                  Chrome on Windows
                  <span className="px-2 py-0.5 bg-green-100 text-primary text-[10px] font-black rounded uppercase tracking-wider">Current Session</span>
                </div>
                <div className="text-[12px] font-medium text-slate-500 mt-0.5">
                  San Francisco, CA • Active Now
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl border border-transparent">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                <Smartphone className="w-4 h-4 text-slate-400" />
              </div>
              <div>
                <div className="text-[13px] font-bold text-slate-900">
                  Safari on iPhone
                </div>
                <div className="text-[12px] font-medium text-slate-500 mt-0.5">
                  San Francisco, CA • 2 hours ago
                </div>
              </div>
            </div>
            <button className="text-[12px] font-bold text-slate-400 hover:text-red-500 transition-colors">
              Log out
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl border border-transparent">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                <Monitor className="w-4 h-4 text-slate-400" />
              </div>
              <div>
                <div className="text-[13px] font-bold text-slate-900">
                  Edge on Laptop
                </div>
                <div className="text-[12px] font-medium text-slate-500 mt-0.5">
                  Seattle, WA • Yesterday
                </div>
              </div>
            </div>
            <button className="text-[12px] font-bold text-slate-400 hover:text-red-500 transition-colors">
              Log out
            </button>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
          <Button variant="outline" className="h-10 px-6 text-[13px] font-bold rounded-xl border-slate-200 text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200">
            Log out from all other devices
          </Button>
        </div>
      </div>

    </div>
  )
}
