import { Bell, Mail, Download, Sparkles, Megaphone, TrendingUp } from 'lucide-react'
import { BottomActionBar } from '../BottomActionBar'

export function NotificationsTab() {
  const Toggle = ({ active = false }: { active?: boolean }) => (
    <div className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${active ? 'bg-primary' : 'bg-slate-200'}`}>
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${active ? 'right-1' : 'left-1'}`}></div>
    </div>
  )

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Platform Notifications */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <h3 className="text-[16px] font-black text-slate-900 mb-6">Platform Notifications</h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                <Bell className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <div className="text-[14px] font-bold text-slate-900 mb-1">Resume Creation Alerts</div>
                <div className="text-[13px] text-slate-500">
                  Get notified when your AI resume generation is complete.
                </div>
              </div>
            </div>
            <Toggle active={true} />
          </div>

          <div className="flex items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <div className="text-[14px] font-bold text-slate-900 mb-1">ATS Score Reports</div>
                <div className="text-[13px] text-slate-500">
                  Receive an alert when your ATS score report is ready to view.
                </div>
              </div>
            </div>
            <Toggle active={true} />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                <Download className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <div className="text-[14px] font-bold text-slate-900 mb-1">Resume Download Alerts</div>
                <div className="text-[13px] text-slate-500">
                  Notify me when a recruiter downloads my public resume link.
                </div>
              </div>
            </div>
            <Toggle active={false} />
          </div>
        </div>
      </div>

      {/* Email Preferences */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <h3 className="text-[16px] font-black text-slate-900 mb-6">Email Preferences</h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <div className="text-[14px] font-bold text-slate-900 mb-1">Email Notifications</div>
                <div className="text-[13px] text-slate-500">
                  Receive important account and security updates via email.
                </div>
              </div>
            </div>
            <Toggle active={true} />
          </div>

          <div className="flex items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                <Megaphone className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <div className="text-[14px] font-bold text-slate-900 mb-1">Product Updates</div>
                <div className="text-[13px] text-slate-500">
                  Stay in the loop with new features, improvements, and updates.
                </div>
              </div>
            </div>
            <Toggle active={true} />
          </div>

          <div className="flex items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <div className="text-[14px] font-bold text-slate-900 mb-1">Weekly Career Tips</div>
                <div className="text-[13px] text-slate-500">
                  Get curated advice on how to improve your resume and ace interviews.
                </div>
              </div>
            </div>
            <Toggle active={false} />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <div className="text-[14px] font-bold text-slate-900 mb-1">Promotional Emails</div>
                <div className="text-[13px] text-slate-500">
                  Receive exclusive offers, discounts, and partner promotions.
                </div>
              </div>
            </div>
            <Toggle active={false} />
          </div>

        </div>
      </div>

      <BottomActionBar />

    </div>
  )
}
