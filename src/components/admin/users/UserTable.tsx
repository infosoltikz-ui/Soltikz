'use client'

import { MoreHorizontal, FileText, CheckCircle2, Ban, Mail } from 'lucide-react'
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { format } from 'date-fns'

interface UserTableProps {
  onRowClick: (userId: string) => void;
}

export function UserTable({ onRowClick }: UserTableProps) {
  const [users, setUsers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchUsers() {
      const supabase = createClient()
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (data) setUsers(data)
      setIsLoading(false)
    }
    fetchUsers()
  }, [])

  if (isLoading) {
    return <div className="mt-6 p-8 text-center text-slate-500 font-bold bg-white border border-slate-200 rounded-[18px]">Loading users...</div>
  }

  return (
    <div className="bg-white border border-slate-200 rounded-[18px] shadow-sm mt-6 overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-[#FAFAF8] border-b border-slate-100">
              <th className="px-5 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Profile</th>
              <th className="px-5 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Contact</th>
              <th className="px-5 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Plan</th>
              <th className="px-5 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Stats</th>
              <th className="px-5 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Activity</th>
              <th className="px-5 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((user) => {
              const initials = (user.full_name || user.email || 'U').substring(0, 2).toUpperCase()
              const plan = user.plan_id || 'FREE'
              
              return (
                <tr 
                  key={user.id} 
                  className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                  onClick={() => onRowClick(user.id)}
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-black shrink-0 bg-blue-100 text-blue-600">
                        {initials}
                      </div>
                      <div>
                        <div className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors">{user.full_name || 'No Name'}</div>
                        <div className="text-[12px] font-medium text-slate-500 truncate w-24">ID: {user.id.substring(0, 8)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="text-[13px] font-medium text-slate-900 mb-0.5">{user.email}</div>
                    <div className="text-[11px] font-bold text-slate-400">{user.phone || '-'}</div>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider
                      ${plan === 'FREE' ? 'bg-orange-100 text-orange-600' : 'bg-primary/10 text-primary'}`}
                    >
                      {plan}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="text-[13px] font-bold text-slate-900 mb-0.5 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-slate-400" /> {user.resumes_generated || 0} Resumes
                    </div>
                    <div className="text-[11px] font-bold text-slate-400">Credits: {user.credits_remaining || 0}</div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="text-[12px] font-medium text-slate-900 mb-0.5">Join: {format(new Date(user.created_at), 'MMM dd, yyyy')}</div>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button 
                      onClick={(e) => e.stopPropagation()} 
                      className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors rounded-lg"
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              )
            })}
            {users.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-slate-500 font-medium">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-[#FAFAF8]">
        <div className="flex items-center gap-4 text-[13px] font-bold text-slate-600">
          <span>Total users: {users.length}</span>
        </div>
      </div>
    </div>
  )
}
