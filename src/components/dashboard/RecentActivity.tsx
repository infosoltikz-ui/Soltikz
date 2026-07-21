import { FileText, TrendingUp, Download, Plus } from 'lucide-react'

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      title: 'Resume "Software Engineer" updated successfully',
      time: '2 mins ago',
      icon: FileText,
      color: 'text-primary',
      bg: 'bg-primary/10'
    },
    {
      id: 2,
      title: 'ATS score improved for "Product Manager Resume"',
      time: '1 hour ago',
      icon: TrendingUp,
      color: 'text-orange-500',
      bg: 'bg-orange-50'
    },
    {
      id: 3,
      title: 'Downloaded "Data Analyst Resume" in PDF format',
      time: '3 hours ago',
      icon: Download,
      color: 'text-purple-500',
      bg: 'bg-purple-50'
    },
    {
      id: 4,
      title: 'Created new resume "Marketing Manager"',
      time: '1 day ago',
      icon: Plus,
      color: 'text-blue-500',
      bg: 'bg-blue-50'
    },
  ]

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[16px] font-black text-slate-900">Recent Activity</h3>
        <button className="text-[12px] font-bold text-slate-500 hover:text-primary transition-colors border border-slate-200 rounded-lg px-3 py-1.5">
          View All
        </button>
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
