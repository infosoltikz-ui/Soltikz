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

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

export function Sidebar({ 
  isCollapsed = false, 
  setIsCollapsed,
  isMobileOpen = false,
  setIsMobileOpen
}: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  
  const [subscriptionTier, setSubscriptionTier] = useState('FREE')
  const [creditsRemaining, setCreditsRemaining] = useState(5)

  useEffect(() => {
    async function loadData() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('plan_id, credits_remaining')
          .eq('id', user.id)
          .single()
        
        if (data) {
          setSubscriptionTier(data.plan_id || 'FREE')
          setCreditsRemaining(data.credits_remaining ?? 5)
        }
      }
    }
    loadData()
  }, [])

  const isPremium = subscriptionTier === 'PRO_MONTHLY'
  const maxResumes = 5
  const resumesUsed = Math.max(0, maxResumes - creditsRemaining)
  const resumePercentage = isPremium ? 100 : (resumesUsed / maxResumes) * 100

  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login?logout=success')
    router.refresh()
  }

  const handleLogoutClick = () => {
    setShowLogoutModal(true)
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
        <Link href="/" className="flex items-center justify-center">
          <img src="/LOGO.png" alt="Resume Builder Logo" className={cn("object-contain transition-all", isCollapsed ? "h-8 w-auto" : "h-10 w-auto")} />
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
            onClick={handleLogoutClick}
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
                <h4 className="font-black text-slate-900 text-[14px]">{isPremium ? 'Pro Plan' : 'Free Plan'}</h4>
              </div>
              <span className="px-2 py-0.5 bg-green-100 text-primary text-[10px] font-black rounded uppercase tracking-wider">Active</span>
            </div>

            <div className="space-y-3 mb-5 relative z-10">
              {/* Resume Usage */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-bold mb-1.5">
                  <span className="text-slate-500">Resumes</span>
                  <span className="text-slate-900">{isPremium ? 'Unlimited' : `${resumesUsed} / ${maxResumes}`}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${resumePercentage}%` }}></div>
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

            <Link href="/dashboard/pricing">
              <Button 
                className="w-full h-10 text-[13px] font-bold rounded-xl shadow-sm hover:shadow-md transition-all relative z-10"
              >
                {isPremium ? 'Manage Plan' : 'Upgrade Plan'}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </aside>

    {/* Logout Confirmation Modal */}
    {showLogoutModal && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0">
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
          onClick={() => setShowLogoutModal(false)}
        />
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 w-full max-w-sm overflow-hidden z-10 animate-in zoom-in-95 duration-200">
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogOut className="w-8 h-8" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">Log out of Soltkiz?</h3>
            <p className="text-sm text-slate-500 font-medium px-4">
              You can always log back in to access your resumes and profile.
            </p>
          </div>
          <div className="flex border-t border-slate-100 bg-slate-50/50 p-4 gap-3">
            <button
              onClick={() => setShowLogoutModal(false)}
              className="flex-1 px-4 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-sm font-bold transition-colors shadow-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-bold transition-colors shadow-sm"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  )
}

