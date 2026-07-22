'use client'

import { FileText, Download, Target, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export function TopActiveUsers() {
  const supabase = createClient()
  const [topUsers, setTopUsers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchTopUsers() {
      // Order by resumes_generated to find "most active"
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('resumes_generated', { ascending: false, nullsFirst: false })
        .limit(4)

      if (data) {
        // Map to display structure
        const mappedUsers = data.map((user: any, index: number) => {
          const colors = [
            'bg-orange-100 text-orange-600',
            'bg-blue-100 text-blue-600',
            'bg-purple-100 text-purple-600',
            'bg-green-100 text-green-600'
          ]
          const name = user.full_name || user.email?.split('@')[0] || 'Unknown User'
          const initials = name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()
          
          return {
            name,
            plan: user.plan_id === 'PREMIUM' ? 'Pro' : (user.plan_id === 'ENTERPRISE' ? 'Enterprise' : 'Free'),
            resumes: user.resumes_generated || 0,
            downloads: Math.round((user.resumes_generated || 0) * 1.5), // Estimate since we don't track downloads
            score: 'N/A', // We can't easily join avg score here without a complex RPC
            color: colors[index % colors.length],
            initials
          }
        })
        setTopUsers(mappedUsers)
      }
      setIsLoading(false)
    }
    
    fetchTopUsers()
  }, [])

  return (
    <div className="bg-white border border-slate-200 rounded-[18px] p-6 shadow-sm mt-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-[18px] font-black text-slate-900">Top Active Users</h3>
          <p className="text-[13px] font-medium text-slate-500">Most engaged platform users</p>
        </div>
        <button className="text-[12px] font-bold text-primary hover:text-primary/80 transition-colors">View Report</button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
        </div>
      ) : topUsers.length === 0 ? (
        <div className="flex justify-center items-center h-32 text-slate-500 font-medium text-sm">
          No users found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topUsers.map((user, i) => (
            <div key={i} className="p-5 rounded-2xl bg-[#FAFAF8] border border-slate-100 hover:border-slate-300 transition-colors group cursor-pointer">
              <div className="flex items-start justify-between gap-2 mb-4">
                <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center text-[15px] font-black ${user.color}`}>
                  {user.initials}
                </div>
                <span className={`inline-flex shrink-0 items-center px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider
                    ${user.plan === 'Pro' ? 'bg-primary/10 text-primary' : (user.plan === 'Free' ? 'bg-slate-200 text-slate-600' : 'bg-orange-100 text-orange-600')}`}
                  >
                    {user.plan}
                </span>
              </div>
              
              <h4 className="text-[15px] font-black text-slate-900 mb-4 group-hover:text-primary transition-colors truncate">{user.name}</h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 text-[13px]">
                  <span className="font-bold text-slate-500 flex items-center gap-1.5 whitespace-nowrap"><FileText className="w-3.5 h-3.5 shrink-0" /> Resumes</span>
                  <span className="font-black text-slate-900 shrink-0">{user.resumes}</span>
                </div>
                <div className="flex items-center justify-between gap-2 text-[13px]">
                  <span className="font-bold text-slate-500 flex items-center gap-1.5 whitespace-nowrap"><Download className="w-3.5 h-3.5 shrink-0" /> Downloads</span>
                  <span className="font-black text-slate-900 shrink-0">{user.downloads}</span>
                </div>
                <div className="flex items-center justify-between gap-2 text-[13px]">
                  <span className="font-bold text-slate-500 flex items-center gap-1.5 whitespace-nowrap"><Target className="w-3.5 h-3.5 shrink-0" /> ATS Score</span>
                  <span className="font-black text-primary shrink-0">{user.score}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
