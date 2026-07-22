'use client'

import { FilePlus, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { formatDistanceToNow } from 'date-fns'

export function ResumeActivityTimeline() {
  const supabase = createClient()
  const [activity, setActivity] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchActivity() {
      const { data } = await supabase
        .from('resumes')
        .select(`
          title,
          created_at,
          profiles (
            full_name,
            email
          )
        `)
        .order('created_at', { ascending: false })
        .limit(5)

      if (data) {
        const mapped = data.map((resume: any) => {
          const profile = Array.isArray(resume.profiles) ? resume.profiles[0] : resume.profiles;
          const user = profile?.full_name || profile?.email?.split('@')[0] || 'Unknown User'
          
          return {
            user: user,
            action: 'created new resume',
            item: resume.title || 'Untitled Resume',
            time: formatDistanceToNow(new Date(resume.created_at), { addSuffix: true }),
            icon: FilePlus,
            color: 'text-green-600',
            bg: 'bg-green-50 border-green-100'
          }
        })
        setActivity(mapped)
      }
      setIsLoading(false)
    }
    fetchActivity()
  }, [])

  return (
    <div className="bg-white border border-slate-200 rounded-[18px] p-6 shadow-sm mt-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-[18px] font-black text-slate-900">Recent Resume Activity</h3>
          <p className="text-[13px] font-medium text-slate-500">Live platform events</p>
        </div>
        <button className="text-[12px] font-bold text-primary hover:text-primary/80 transition-colors">View Full Log</button>
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
                <div className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 shrink-0 border-2 ${item.bg}`}>
                  <Icon className={`w-4 h-4 ${item.color}`} strokeWidth={2.5} />
                </div>
                <div className="pt-2">
                  <p className="text-[14px] text-slate-700">
                    <span className="font-bold text-slate-900">{item.user}</span> {item.action} <span className="font-bold text-slate-900">"{item.item}"</span>
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
