'use client'

import { useEffect, useState } from 'react'
import { Search, Filter, Download, MoreHorizontal, CheckCircle2, Ban, Loader2 } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import toast from 'react-hot-toast'

interface UserProfile {
  id: string
  full_name: string | null
  email: string | null
  plan_id: string | null
  created_at: string | null
}

const COLORS = [
  'bg-blue-100 text-blue-600',
  'bg-orange-100 text-orange-600',
  'bg-green-100 text-green-600',
  'bg-purple-100 text-purple-600',
  'bg-pink-100 text-pink-600',
]

export function RecentUsersTable() {
  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10)

      if (data) {
        setUsers(data)
      }
      setLoading(false)
    }
    fetchUsers()
  }, [])

  const filteredUsers = users.filter(u =>
    (u.full_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (u.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  )

  const getInitials = (name: string | null) => {
    if (!name) return 'U'
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
  }

  const getPlanStyle = (plan: string | null) => {
    if (!plan || plan === 'FREE') return 'bg-slate-100 text-slate-600'
    if (plan.includes('PRO')) return 'bg-primary/10 text-primary'
    return 'bg-orange-100 text-orange-600'
  }

  const getPlanName = (plan: string | null) => {
    if (!plan) return 'Free'
    if (plan === 'PRO_MONTHLY') return 'Pro Monthly'
    if (plan === 'PRO_YEARLY') return 'Pro Yearly'
    return plan
  }

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'N/A'
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  return (
    <div className="bg-white border border-slate-200 rounded-[18px] shadow-sm overflow-hidden mt-6">

      {/* Header & Controls */}
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-[18px] font-black text-slate-900">Recent Users</h3>
          <p className="text-[13px] font-medium text-slate-500">Latest platform registrations</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-10 w-48 bg-[#FAFAF8] border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <button className="h-10 px-4 bg-[#FAFAF8] border border-slate-200 rounded-xl text-[13px] font-bold text-slate-700 flex items-center gap-2 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="h-10 px-4 bg-primary border border-transparent rounded-xl text-[13px] font-bold text-white flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FAFAF8] border-b border-slate-100">
              <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Plan</th>
              <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Signup Date</th>
              <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-12 text-center">
                  <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto mb-2" />
                  <p className="text-[13px] text-slate-500">Loading users...</p>
                </td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center">
                  <p className="text-[13px] text-slate-500">No users found.</p>
                </td>
              </tr>
            ) : (
              filteredUsers.map((user, i) => {
                const colorClass = COLORS[i % COLORS.length]
                return (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-black ${colorClass}`}>
                          {getInitials(user.full_name)}
                        </div>
                        <div>
                          <div className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors cursor-pointer">{user.full_name || 'Anonymous User'}</div>
                          <div className="text-[12px] font-medium text-slate-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider ${getPlanStyle(user.plan_id)}`}>
                        {getPlanName(user.plan_id)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[13px] font-medium text-slate-600">{formatDate(user.created_at)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-[13px] font-bold text-slate-700">Active</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => toast.success(`Viewing options for ${user.full_name || 'Anonymous User'}`)}
                        className="p-2 text-slate-400 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-100"
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
