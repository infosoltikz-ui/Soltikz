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
  ChevronRight
} from 'lucide-react'
import { cn } from '@/utils/cn'
import { Button } from '@/components/ui/Button'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: FileText },
  { label: 'Master Profile', href: '/dashboard/profile', icon: User },
  { label: 'Create Resume', href: '/dashboard/create', icon: FileEdit },
  { label: 'My Resumes', href: '/dashboard/resumes', icon: Folder },
  { label: 'Pricing', href: '/pricing', icon: DollarSign },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
]

interface SidebarProps {
  isCollapsed?: boolean;
  setIsCollapsed?: (val: boolean) => void;
}

export function Sidebar({ isCollapsed = false, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside 
      className={cn(
        "h-screen bg-white border-r border-slate-100 flex flex-col fixed left-0 top-0 z-40 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[80px]" : "w-[280px]"
      )}
    >
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

      {/* Upgrade CTA */}
      {!isCollapsed && (
        <div className="p-6 animate-in fade-in duration-300">
          <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-slate-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                <Crown className="w-3 h-3 text-orange-500" strokeWidth={3} />
              </div>
              <h4 className="font-black text-slate-900 text-[15px]">Upgrade to Premium</h4>
            </div>
            <Button 
              className="group w-full h-10 text-[13px] font-bold rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
              rightIcon={
                <div className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 ease-out flex items-center justify-start">
                  <ArrowRight 
                    className="w-4 h-4 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out delay-75" 
                    strokeWidth={3} 
                  />
                </div>
              }
            >
              Upgrade Now
            </Button>
          </div>
        </div>
      )}
    </aside>
  )
}
