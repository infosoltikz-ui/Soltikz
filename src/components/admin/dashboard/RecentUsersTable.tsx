'use client'

import { useEffect, useState, useMemo } from 'react'
import { Search, Filter, Download, MoreHorizontal, CheckCircle2, Ban, Loader2, ChevronUp, ChevronDown, Edit, Trash2, Eye, Mail, UserX } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import toast from 'react-hot-toast'

interface UserProfile {
  id: string
  full_name: string | null
  email: string | null
  plan_id: string | null
  created_at: string | null
  payments_and_subscriptions?: { created_at: string, valid_until: string | null }[]
}

type SortColumn = 'name' | 'plan' | 'date'
type SortDirection = 'asc' | 'desc'

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
  
  // Advanced options state
  const [sortColumn, setSortColumn] = useState<SortColumn>('date')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set())
  const [openActionId, setOpenActionId] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from('profiles')
        .select('*, payments_and_subscriptions(created_at, valid_until)')
        .order('created_at', { ascending: false })
        .limit(50) // Increased limit for better demonstration

      if (data) {
        setUsers(data as UserProfile[])
      }
      setLoading(false)
    }
    fetchUsers()
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = () => setOpenActionId(null)
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const processedUsers = useMemo(() => {
    let result = users.filter(u =>
      (u.full_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (u.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    )

    result = result.sort((a, b) => {
      let comparison = 0
      if (sortColumn === 'name') {
        comparison = (a.full_name || '').localeCompare(b.full_name || '')
      } else if (sortColumn === 'plan') {
        comparison = (a.plan_id || '').localeCompare(b.plan_id || '')
      } else if (sortColumn === 'date') {
        comparison = new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime()
      }
      return sortDirection === 'asc' ? comparison : -comparison
    })

    return result
  }, [users, searchTerm, sortColumn, sortDirection])

  const toggleSelectAll = () => {
    if (selectedUsers.size === processedUsers.length && processedUsers.length > 0) {
      setSelectedUsers(new Set())
    } else {
      setSelectedUsers(new Set(processedUsers.map(u => u.id)))
    }
  }

  const toggleSelectUser = (id: string) => {
    const newSelected = new Set(selectedUsers)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedUsers(newSelected)
  }

  // Helpers
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

  const getPlanDates = (user: UserProfile) => {
    const fmt = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    
    let start = user.created_at ? fmt(user.created_at) : 'N/A'
    let expiry = 'Lifetime'
    let isExpiringSoon = false
    
    // If premium, grab the latest payment details
    if (user.plan_id && user.plan_id !== 'FREE' && user.payments_and_subscriptions && user.payments_and_subscriptions.length > 0) {
      // Sort to get the most recent payment
      const latestPayment = [...user.payments_and_subscriptions].sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )[0]
      
      if (latestPayment) {
        start = fmt(latestPayment.created_at)
        if (latestPayment.valid_until) {
          expiry = fmt(latestPayment.valid_until)
          
          const expiryDate = new Date(latestPayment.valid_until)
          const today = new Date()
          const diffTime = expiryDate.getTime() - today.getTime()
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
          
          if (diffDays <= 5 && diffDays >= 0) {
            isExpiringSoon = true
          }
        }
      }
    }
    
    return { start, expiry, isExpiringSoon }
  }

  const SortIcon = ({ column }: { column: SortColumn }) => {
    if (sortColumn !== column) return <div className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-50 transition-opacity"><ChevronUp className="w-full h-full" /></div>
    return sortDirection === 'asc' 
      ? <ChevronUp className="w-4 h-4 ml-1 text-primary" />
      : <ChevronDown className="w-4 h-4 ml-1 text-primary" />
  }

  return (
    <div className="bg-white border border-slate-200 rounded-[18px] shadow-sm overflow-hidden mt-6">
      {/* Header & Controls */}
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-[18px] font-black text-slate-900">Recent Users</h3>
          <p className="text-[13px] font-medium text-slate-500">Manage and view platform registrations</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {selectedUsers.size > 0 && (
            <div className="flex items-center gap-2 mr-2 animate-in fade-in slide-in-from-right-4 duration-200">
              <span className="text-[13px] font-bold text-slate-600">{selectedUsers.size} selected</span>
              <button onClick={() => toast.success(`Mailing ${selectedUsers.size} users`)} className="h-9 px-3 bg-white border border-slate-200 rounded-lg text-[13px] font-bold text-slate-700 flex items-center gap-2 hover:bg-slate-50 transition-colors">
                <Mail className="w-4 h-4" /> Message
              </button>
              <button onClick={() => toast.success(`Deleted ${selectedUsers.size} users`)} className="h-9 px-3 bg-red-50 border border-red-100 rounded-lg text-[13px] font-bold text-red-600 flex items-center gap-2 hover:bg-red-100 transition-colors">
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          )}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-10 w-48 lg:w-64 bg-[#FAFAF8] border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-primary transition-colors focus:bg-white focus:ring-2 focus:ring-primary/20"
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
      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FAFAF8] border-b border-slate-100">
              <th className="px-6 py-4 w-[50px]">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/20 cursor-pointer accent-primary"
                  checked={selectedUsers.size > 0 && selectedUsers.size === processedUsers.length}
                  ref={input => {
                    if (input) {
                      input.indeterminate = selectedUsers.size > 0 && selectedUsers.size < processedUsers.length
                    }
                  }}
                  onChange={toggleSelectAll}
                />
              </th>
              <th 
                className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider cursor-pointer group hover:text-slate-700 transition-colors select-none"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center">User <SortIcon column="name" /></div>
              </th>
              <th 
                className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider cursor-pointer group hover:text-slate-700 transition-colors select-none whitespace-nowrap"
                onClick={() => handleSort('plan')}
              >
                <div className="flex items-center">Plan <SortIcon column="plan" /></div>
              </th>
              <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Plan Duration</th>
              <th 
                className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider cursor-pointer group hover:text-slate-700 transition-colors select-none whitespace-nowrap"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center">Signup Date <SortIcon column="date" /></div>
              </th>
              <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={7} className="py-12 text-center">
                  <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto mb-2" />
                  <p className="text-[13px] text-slate-500">Loading users...</p>
                </td>
              </tr>
            ) : processedUsers.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-50 mb-3">
                    <UserX className="w-6 h-6 text-slate-400" />
                  </div>
                  <p className="text-[14px] font-bold text-slate-900 mb-1">No users found</p>
                  <p className="text-[13px] text-slate-500 max-w-sm mx-auto">Try adjusting your search terms or filters to find what you're looking for.</p>
                </td>
              </tr>
            ) : (
              processedUsers.map((user, i) => {
                const colorClass = COLORS[i % COLORS.length]
                const isSelected = selectedUsers.has(user.id)
                return (
                  <tr 
                    key={user.id} 
                    className={`hover:bg-slate-50/80 transition-colors group ${isSelected ? 'bg-primary/[0.02]' : ''}`}
                  >
                    <td className="px-6 py-4">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/20 cursor-pointer accent-primary"
                        checked={isSelected}
                        onChange={() => toggleSelectUser(user.id)}
                      />
                    </td>
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider ${getPlanStyle(user.plan_id)}`}>
                        {getPlanName(user.plan_id)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-[12px]">
                        <span className="font-medium text-slate-500">
                          Start: <span className="font-bold text-slate-700">{getPlanDates(user).start}</span>
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="font-medium text-slate-500">
                          Exp: <span className={
                            user.plan_id && user.plan_id !== 'FREE' 
                              ? (getPlanDates(user).isExpiringSoon ? 'text-red-600 font-bold' : 'text-orange-600 font-bold') 
                              : 'font-bold text-slate-700'
                          }>{getPlanDates(user).expiry}</span>
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-[13px] font-medium text-slate-600">{formatDate(user.created_at)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-[13px] font-bold text-slate-700">Active</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setOpenActionId(openActionId === user.id ? null : user.id)
                        }}
                        className={`p-2 text-slate-400 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-100 ${openActionId === user.id ? 'bg-slate-100 text-slate-900' : ''}`}
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                      
                      {openActionId === user.id && (
                        <div 
                          className="absolute right-6 top-14 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-10 animate-in fade-in zoom-in-95 duration-100"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button 
                            onClick={() => { toast.success('Viewing user'); setOpenActionId(null); }}
                            className="w-full px-4 py-2 text-left text-[13px] font-medium text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4" /> View Profile
                          </button>
                          <button 
                            onClick={() => { toast.success('Editing user'); setOpenActionId(null); }}
                            className="w-full px-4 py-2 text-left text-[13px] font-medium text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors flex items-center gap-2"
                          >
                            <Edit className="w-4 h-4" /> Edit Details
                          </button>
                          <button 
                            onClick={() => { toast.success('Emailing user'); setOpenActionId(null); }}
                            className="w-full px-4 py-2 text-left text-[13px] font-medium text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors flex items-center gap-2"
                          >
                            <Mail className="w-4 h-4" /> Send Email
                          </button>
                          <div className="h-px bg-slate-100 my-1"></div>
                          <button 
                            onClick={() => { toast.error('User suspended'); setOpenActionId(null); }}
                            className="w-full px-4 py-2 text-left text-[13px] font-medium text-orange-600 hover:bg-orange-50 transition-colors flex items-center gap-2"
                          >
                            <Ban className="w-4 h-4" /> Suspend User
                          </button>
                          <button 
                            onClick={() => { toast.error('User deleted'); setOpenActionId(null); }}
                            className="w-full px-4 py-2 text-left text-[13px] font-medium text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                          >
                            <Trash2 className="w-4 h-4" /> Delete Account
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
      
      {/* Footer / Pagination summary */}
      {!loading && processedUsers.length > 0 && (
        <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
          <p className="text-[13px] font-medium text-slate-500">
            Showing <span className="font-bold text-slate-900">{processedUsers.length}</span> users
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-[13px] font-bold text-slate-400 bg-white border border-slate-200 rounded-lg cursor-not-allowed">
              Previous
            </button>
            <button className="px-3 py-1.5 text-[13px] font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
