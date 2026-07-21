'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { LayoutDashboard, Users, FileText, LayoutTemplate, DollarSign, Settings, LogOut, CheckCircle2 } from 'lucide-react'
import { cn } from '@/utils/cn'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'react-hot-toast'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Resumes', href: '/admin/resumes', icon: FileText },
  { label: 'Pricing', href: '/admin/pricing', icon: DollarSign },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    toast.success('Successfully logged out of Admin Portal')
    router.push('/admin/login')
    setIsLoggingOut(false)
    setIsLogoutModalOpen(false)
  }
  return (
    <>
      <aside className="w-[280px] h-screen fixed left-0 top-0 bg-white border-r border-slate-100 flex flex-col z-50">
      {/* Logo */}
      <div className="h-20 px-8 flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div>
          <div className="text-[18px] font-black tracking-tight text-slate-900 leading-none">Soltikz</div>
          <div className="text-[10px] font-black text-orange-500 uppercase tracking-widest mt-1">Admin Portal</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3.5 rounded-xl text-[14px] font-bold transition-all duration-200 group",
                isActive 
                  ? "bg-[#F0FDF4] text-primary" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon 
                className={cn(
                  "shrink-0 w-[18px] h-[18px] transition-transform duration-200", 
                  isActive ? "text-primary" : "text-slate-400 group-hover:scale-110 group-hover:text-slate-600"
                )} 
                strokeWidth={2.5} 
              />
              {item.label}
            </Link>
          )
        })}

        <div className="pt-4 mt-4 border-t border-slate-100">
          <button 
            onClick={() => setIsLogoutModalOpen(true)} 
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-[14px] font-bold text-red-500 hover:bg-red-50 transition-all duration-200"
          >
            <LogOut className="shrink-0 w-[18px] h-[18px]" strokeWidth={2.5} />
            Logout
          </button>
        </div>
      </nav>

      {/* Platform Status */}
      <div className="p-6">
        <div className="bg-[#FAFAF8] border border-slate-200 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-primary" strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-[13px] font-black text-slate-900">Platform Status</div>
            <div className="text-[11px] font-bold text-primary flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              All Services Online
            </div>
          </div>
        </div>
      </div>
    </aside>
      
      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogOut className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to Leave?</h3>
              <p className="text-sm text-slate-500 mb-6">Are you sure you want to log out of the Admin Portal?</p>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsLogoutModalOpen(false)}
                  disabled={isLoggingOut}
                  className="flex-1 px-4 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex-1 px-4 py-3 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 transition-colors"
                >
                  {isLoggingOut ? 'Logging out...' : 'Yes, Logout'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
