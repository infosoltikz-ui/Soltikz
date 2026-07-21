'use client'

const ACTIVITY = [
  { action: 'Admin Updated Branding', user: 'admin@soltikz.com', time: '10 mins ago', date: 'Oct 24, 2024' },
  { action: 'AI Configuration Changed (Model updated to gpt-4o)', user: 'admin@soltikz.com', time: '2 hours ago', date: 'Oct 24, 2024' },
  { action: 'Payment Gateway Updated (Stripe active)', user: 'founder@soltikz.com', time: 'Yesterday', date: 'Oct 23, 2024' },
  { action: 'Email Template Edited (Welcome Email)', user: 'admin@soltikz.com', time: '3 days ago', date: 'Oct 21, 2024' },
  { action: 'System Backup Completed', user: 'System (Auto)', time: '4 days ago', date: 'Oct 20, 2024' },
]

export function RecentSystemActivity() {
  return (
    <div className="mt-12 pt-12 border-t border-slate-100">
      <h3 className="text-[16px] font-black text-slate-900 mb-6">Recent System Activity</h3>
      
      <div className="bg-white border border-slate-200 rounded-[18px] p-6 shadow-sm">
        <div className="relative border-l-2 border-slate-100 ml-3 space-y-8 py-2">
          {ACTIVITY.map((item, i) => (
            <div key={i} className="relative pl-6">
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 bg-white border-2 border-slate-300 rounded-full"></div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[13px] font-black text-slate-900">{item.action}</span>
                  <span className="text-[11px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">{item.time}</span>
                </div>
                <div className="text-[12px] font-medium text-slate-500">by {item.user} on {item.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
