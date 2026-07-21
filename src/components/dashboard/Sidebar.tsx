'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  FileText, 
  User, 
  FileEdit, 
  Folder, 
  DollarSign, 
  Settings, 
  LogOut,
  Crown,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react'
import { cn } from '@/utils/cn'
import { Button } from '@/components/ui/Button'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: FileText },
  { label: 'Master Profile', href: '/dashboard/profile', icon: User },
  { label: 'Create Resume', href: '/dashboard/create', icon: FileEdit },
  { label: 'My Resumes', href: '/dashboard/resumes', icon: Folder },
  { label: 'Pricing', href: '/dashboard/pricing', icon: DollarSign },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
]

interface SidebarProps {
  isCollapsed?: boolean;
  setIsCollapsed?: (val: boolean) => void;
  isMobileOpen?: boolean;
  setIsMobileOpen?: (val: boolean) => void;
}

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export function Sidebar({ 
  isCollapsed = false, 
  setIsCollapsed,
  isMobileOpen = false,
  setIsMobileOpen
}: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login?logout=success')
    router.refresh()
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsMobileOpen?.(false)}
        />
      )}

      <aside 
        className={cn(
          "h-screen bg-white border-r border-slate-100 flex flex-col fixed left-0 top-0 z-50 transition-all duration-300 ease-in-out",
          isCollapsed ? "md:w-[80px]" : "w-[280px]",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Mobile Close Button */}
        <button 
          onClick={() => setIsMobileOpen?.(false)}
          className="md:hidden absolute top-6 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      {/* Toggle Button */}
      {setIsCollapsed && (
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3.5 top-8 w-7 h-7 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:shadow-sm z-50 transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      )}

      {/* Logo */}
      <div className={cn("h-20 flex flex-col justify-center border-b border-transparent", isCollapsed ? "px-0 items-center" : "px-8")}>
        <Link href="/" className={cn("flex items-center", isCollapsed ? "justify-center" : "gap-2")}>
          <div className="w-8 h-8 bg-primary rounded-[10px] flex items-center justify-center shadow-sm shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden whitespace-nowrap animate-in fade-in duration-300">
              <div className="text-xl font-black tracking-tight text-slate-900 leading-none">Soltkiz</div>
              <div className="text-[10px] font-bold text-slate-400 mt-1">AI-Powered. ATS-Optimized.</div>
            </div>
          )}
        </Link>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          
          return (
            <Link
              key={item.label}
              href={item.href}
              title={isCollapsed ? item.label : undefined}
              className={cn(
                "flex items-center px-4 py-3.5 rounded-xl text-[14px] font-bold transition-all duration-200",
                isCollapsed ? "justify-center" : "gap-3",
                isActive 
                  ? "bg-[#F0FDF4] text-primary" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon className={cn("shrink-0 w-[18px] h-[18px]", isActive ? "text-primary" : "text-slate-400")} strokeWidth={2.5} />
              {!isCollapsed && <span className="overflow-hidden whitespace-nowrap">{item.label}</span>}
            </Link>
          )
        })}

        <div className="pt-4 mt-4 border-t border-slate-100">
          <button 
            title={isCollapsed ? "Logout" : undefined}
            onClick={handleLogout}
            className={cn(
              "w-full flex items-center px-4 py-3.5 rounded-xl text-[14px] font-bold text-red-500 hover:bg-red-50 transition-all duration-200",
              isCollapsed ? "justify-center" : "gap-3"
            )}
          >
            <LogOut className="shrink-0 w-[18px] h-[18px]" strokeWidth={2.5} />
            {!isCollapsed && <span className="overflow-hidden whitespace-nowrap">Logout</span>}
          </button>
        </div>
      </nav>

      {/* Current Plan Card */}
      {!isCollapsed && (
        <div className="p-6 animate-in fade-in duration-300 hidden md:block">
          <div className="bg-[#FAFAF8] rounded-2xl p-5 border border-slate-200 shadow-sm relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
            
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-orange-500" strokeWidth={2.5} />
                <h4 className="font-black text-slate-900 text-[14px]">Free Plan</h4>
              </div>
              <span className="px-2 py-0.5 bg-green-100 text-primary text-[10px] font-black rounded uppercase tracking-wider">Active</span>
            </div>

            <div className="space-y-3 mb-5 relative z-10">
              {/* Resume Usage */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-bold mb-1.5">
                  <span className="text-slate-500">Resumes</span>
                  <span className="text-slate-900">8 / 10</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full w-[80%]"></div>
                </div>
              </div>

              {/* ATS Optimizations */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-bold mb-1.5">
                  <span className="text-slate-500">ATS Scans</span>
                  <span className="text-slate-900">12 / 20</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full w-[60%]"></div>
                </div>
              </div>
              
              {/* AI Credits */}
              <div className="pt-1">
                <span className="text-[11px] font-bold text-slate-500 block">
                  <strong className="text-slate-900">80</strong> AI Credits Remaining
                </span>
              </div>
            </div>

            <Button 
              className="w-full h-10 text-[13px] font-bold rounded-xl shadow-sm hover:shadow-md transition-all relative z-10"
            >
              Upgrade Plan
            </Button>
          </div>
        </div>
      )}
    </aside>
    </>
  )
}
