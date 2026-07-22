'use client'

import { UserPlus, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { formatDistanceToNow } from 'date-fns'

export function UserActivityTimeline() {
  const supabase = createClient()
  const [activity, setActivity] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchActivity() {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)

      if (data) {
        const mapped = data.map(profile => {
          const name = profile.full_name || profile.email?.split('@')[0] || 'A user'
          return {
            user: name,
            action: 'registered new account',
            time: formatDistanceToNow(new Date(profile.created_at), { addSuffix: true }),
            icon: UserPlus,
            color: 'text-primary',
            bg: 'bg-green-50'
          }
        })
        setActivity(mapped)
      }
      setIsLoading(false)
    }
    fetchActivity()
  }, [])

  return (
    <div className="bg-white border border-slate-200 rounded-[18px] p-6 shadow-sm h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-[18px] font-black text-slate-900">Recent User Activity</h3>
          <p className="text-[13px] font-medium text-slate-500">Live platform events</p>
        </div>
        <button className="text-[12px] font-bold text-primary hover:text-primary/80 transition-colors">View All</button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
        </div>
      ) : activity.length === 0 ? (
        <div className="flex justify-center items-center h-32 text-slate-500 font-medium text-sm">
          No recent activity found.
        </div>
      ) : (
        <div className="relative pl-4 space-y-8 before:content-[''] before:absolute before:left-[35px] before:top-4 before:bottom-4 before:w-[2px] before:bg-slate-100">
          {activity.map((item, i) => {
            const Icon = item.icon
            return (
              <div key={i} className="relative flex gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 shrink-0 border-4 border-white ${item.bg}`}>
                  <Icon className={`w-4 h-4 ${item.color}`} strokeWidth={2.5} />
                </div>
                <div className="pt-2">
                  <p className="text-[14px] text-slate-700">
                    <span className="font-bold text-slate-900">{item.user}</span> {item.action}
                  </p>
                  <span className="text-[11px] font-bold text-slate-400 mt-1 block">{item.time}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
