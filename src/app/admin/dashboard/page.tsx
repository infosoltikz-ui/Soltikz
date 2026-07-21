'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { LayoutDashboard, Users, FileText, Settings, LogOut, ShieldAlert, Activity, Database } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { toast } from 'react-hot-toast'

export default function AdminDashboardPage() {
  const [adminEmail, setAdminEmail] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAdmin = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setAdminEmail(user.email ?? null)
      }
    }
    checkAdmin()
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    toast.success('Admin logged out successfully')
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
            <ShieldAlert className="w-5 h-5 text-primary" />
          </div>
          <span className="font-bold text-lg text-slate-900">Admin Portal</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <button className="w-full flex items-center px-3 py-2.5 text-sm font-semibold rounded-lg bg-primary/5 text-primary">
            <LayoutDashboard className="w-4 h-4 mr-3" />
            Overview
          </button>
          <button className="w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
            <Users className="w-4 h-4 mr-3 text-slate-400" />
            User Management
          </button>
          <button className="w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
            <FileText className="w-4 h-4 mr-3 text-slate-400" />
            Resumes & Templates
          </button>
          <button className="w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
            <Settings className="w-4 h-4 mr-3 text-slate-400" />
            System Settings
          </button>
        </nav>

        <div className="p-4 border-t border-slate-200">
          <div className="mb-4 px-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Logged in as</p>
            <p className="text-sm font-medium text-slate-900 truncate">{adminEmail || 'Loading...'}</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100">
            <LogOut className="w-4 h-4 mr-2" />
            Secure Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <h1 className="text-xl font-bold text-slate-900">System Overview</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
              All Systems Operational
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Stat Cards */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-600">Total Users</h3>
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-900">1,248</p>
              <p className="text-sm text-emerald-600 font-medium mt-2">+12% from last month</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-600">Resumes Generated</h3>
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-900">8,592</p>
              <p className="text-sm text-emerald-600 font-medium mt-2">+24% from last month</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-600">System Load</h3>
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-amber-600" />
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-900">24%</p>
              <p className="text-sm text-slate-500 font-medium mt-2">Optimal performance</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-900">Recent Security Activity</h2>
            </div>
            <div className="p-0">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-sm font-semibold text-slate-500 border-b border-slate-200">
                    <th className="px-6 py-4">Event</th>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">IP Address</th>
                    <th className="px-6 py-4">Time</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600 divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">Admin Login Success</td>
                    <td className="px-6 py-4">{adminEmail || 'admin@soltikz.com'}</td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">192.168.1.104</td>
                    <td className="px-6 py-4 text-slate-500">Just now</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        Success
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">Database Backup</td>
                    <td className="px-6 py-4">System</td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">-</td>
                    <td className="px-6 py-4 text-slate-500">2 hours ago</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">Failed Login Attempt</td>
                    <td className="px-6 py-4">unknown@email.com</td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">45.22.19.88</td>
                    <td className="px-6 py-4 text-slate-500">5 hours ago</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Blocked
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
