import { Activity } from 'lucide-react'

export function RecentActivity({ activities = [] }: { activities?: any[] }) {
  if (!activities || activities.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 h-full flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
          <Activity className="w-8 h-8 text-slate-300" />
        </div>
        <h3 className="text-slate-900 font-bold mb-2">No recent activity</h3>
        <p className="text-slate-500 text-sm">Your latest actions will appear here.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[16px] font-black text-slate-900">Recent Activity</h3>
      </div>

      <div className="space-y-6">
        {activities.map((activity) => {
          const Icon = activity.icon
          return (
            <div key={activity.id} className="flex gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${activity.bg}`}>
                <Icon className={`w-4 h-4 ${activity.color}`} strokeWidth={2.5} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13.5px] font-bold text-slate-700 leading-snug pr-4">
                  {activity.title}
                </div>
              </div>
              <div className="text-[11px] font-bold text-slate-400 whitespace-nowrap shrink-0 mt-0.5">
                {activity.time}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
