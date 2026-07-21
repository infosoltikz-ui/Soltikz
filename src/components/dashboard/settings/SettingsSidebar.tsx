import { Lightbulb, Bell, CheckCircle2, CloudLightning } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function SettingsSidebar() {
  return (
    <div className="w-full xl:w-[320px] shrink-0 space-y-6">
      
      {/* Quick Tips */}
      <div className="bg-[#FAFAF8] rounded-2xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-[15px] font-black text-slate-900 mb-5 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-orange-500 fill-orange-500" />
          Quick Tips
        </h3>
        
        <ul className="space-y-4">
          {[
            'Complete your profile to improve ATS results.',
            'Enable Two-Factor Authentication.',
            'Connect LinkedIn.',
            'Upgrade storage.',
          ].map((tip, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
              <span className="text-[13px] font-medium text-slate-600 leading-relaxed">{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Notifications */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-[15px] font-black text-slate-900 mb-5 flex items-center gap-2">
          <Bell className="w-4 h-4 text-primary" />
          Recent Notifications
        </h3>
        
        <div className="space-y-5">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="text-[13px] font-bold text-slate-900">Profile Updated Successfully</div>
              <div className="text-[11px] font-medium text-slate-400 mt-0.5">2 hours ago</div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
              <CloudLightning className="w-4 h-4 text-slate-600" />
            </div>
            <div>
              <div className="text-[13px] font-bold text-slate-900">Resume Downloaded</div>
              <div className="text-[11px] font-medium text-slate-400 mt-0.5">Yesterday</div>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4 text-orange-500" />
            </div>
            <div>
              <div className="text-[13px] font-bold text-slate-900">Subscription Active</div>
              <div className="text-[11px] font-medium text-slate-400 mt-0.5">3 days ago</div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center shrink-0">
              <CloudLightning className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="text-[13px] font-bold text-slate-900">AI Credits Refreshed</div>
              <div className="text-[11px] font-medium text-slate-400 mt-0.5">1 week ago</div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}
