'use client'

import { useEffect, useState } from 'react'
import { FileEdit, UserPlus, ArrowUpCircle, Loader2 } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

interface ActivityItem {
  id: string
  user: string
  action: string
  time: Date
  icon: any
  color: string
  bg: string
}

function timeAgo(date: Date) {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diffInSeconds < 60) return 'just now'
  const diffInMins = Math.floor(diffInSeconds / 60)
  if (diffInMins < 60) return `${diffInMins} mins ago`
  const diffInHours = Math.floor(diffInMins / 60)
  if (diffInHours < 24) return `${diffInHours} hours ago`
  const diffInDays = Math.floor(diffInHours / 24)
  return `${diffInDays} days ago`
}

export function ActivityTimeline() {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchActivities = async () => {
      const supabase = createClient()
      
      try {
        const [
          { data: newUsers },
          { data: recentResumes },
          { data: recentPayments }
        ] = await Promise.all([
          supabase.from('profiles').select('id, full_name, created_at').order('created_at', { ascending: false }).limit(5),
          supabase.from('resumes_v2').select('id, user_id, title, created_at').order('created_at', { ascending: false }).limit(5),
          supabase.from('payments_and_subscriptions').select('id, user_id, amount_paid, created_at').order('created_at', { ascending: false }).limit(5)
        ])

        const userIds = new Set<string>()
        recentResumes?.forEach(r => { if (r.user_id) userIds.add(r.user_id) })
        recentPayments?.forEach(p => { if (p.user_id) userIds.add(p.user_id) })

        let userProfiles: any[] = []
        if (userIds.size > 0) {
          const { data } = await supabase
            .from('profiles')
            .select('id, full_name')
            .in('id', Array.from(userIds))
          userProfiles = data || []
        }

        const profileMap = new Map()
        userProfiles.forEach(p => profileMap.set(p.id, p.full_name || 'Anonymous User'))
        newUsers?.forEach(u => profileMap.set(u.id, u.full_name || 'Anonymous User'))

        const allActivities: ActivityItem[] = []

        newUsers?.forEach(u => {
          allActivities.push({
            id: `usr_${u.id}`,
            user: profileMap.get(u.id),
            action: 'registered on the platform',
            time: new Date(u.created_at),
            icon: UserPlus,
            color: 'text-emerald-500',
            bg: 'bg-emerald-50'
          })
        })

        recentResumes?.forEach(r => {
          allActivities.push({
            id: `res_${r.id}`,
            user: profileMap.get(r.user_id) || 'Anonymous User',
            action: `created resume: ${r.title || 'Untitled'}`,
            time: new Date(r.created_at || new Date()),
            icon: FileEdit,
            color: 'text-blue-500',
            bg: 'bg-blue-50'
          })
        })

        recentPayments?.forEach(p => {
          allActivities.push({
            id: `pay_${p.id}`,
            user: profileMap.get(p.user_id) || 'Anonymous User',
            action: `upgraded plan (₹${p.amount_paid})`,
            time: new Date(p.created_at),
            icon: ArrowUpCircle,
            color: 'text-amber-500',
            bg: 'bg-amber-50'
          })
        })

        allActivities.sort((a, b) => b.time.getTime() - a.time.getTime())
        setActivities(allActivities.slice(0, 5))
      } catch (error) {
        console.error("Error fetching activities:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  return (
    <div className="bg-white border border-slate-200 rounded-[18px] p-6 shadow-sm min-h-[300px]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-[18px] font-black text-slate-900">Recent Activity</h3>
          <p className="text-[13px] font-medium text-slate-500">Live platform events</p>
        </div>
        <button className="text-[12px] font-bold text-primary hover:text-primary/80 transition-colors">View All</button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-10">
          <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
          <p className="text-[13px] text-slate-500 font-medium">Loading live events...</p>
        </div>
      ) : activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10">
          <p className="text-[13px] text-slate-500 font-medium">No recent activity found.</p>
        </div>
      ) : (
        <div className="relative pl-4 space-y-8 before:content-[''] before:absolute before:left-[35px] before:top-4 before:bottom-4 before:w-[2px] before:bg-slate-100">
          {activities.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.id} className="relative flex gap-4 group">
                {/* Timeline dot/icon */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 shrink-0 border-4 border-white ${item.bg} group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-4 h-4 ${item.color}`} strokeWidth={2.5} />
                </div>
                
                <div className="pt-2">
                  <p className="text-[14px] text-slate-700 leading-tight">
                    <span className="font-bold text-slate-900">{item.user}</span> {item.action}
                  </p>
                  <span className="text-[11px] font-bold text-slate-400 mt-1 block">{timeAgo(item.time)}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
