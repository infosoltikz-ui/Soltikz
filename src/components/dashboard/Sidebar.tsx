'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LogOut,
  X,
} from 'lucide-react'
import { cn } from '@/utils/cn'
import { createClient } from '@/utils/supabase/client'
import { isPremiumPlan, FREE_TIER_CREDITS } from '@/utils/pricingPlans'

const BUILD_NAV_ITEMS = [
  { label: 'Home', href: '/dashboard', icon: 'home' },
  { label: 'Tailor a résumé', href: '/dashboard/create', icon: 'plus' },
  { label: 'Match report', href: '/dashboard/match-report', icon: 'clock' },
  { label: 'My résumés', href: '/dashboard/resumes', icon: 'file' },
  { label: 'Cover letters', href: '/dashboard/cover-letters', icon: 'mail' },
]

const DETAILS_NAV_ITEMS = [
  { label: 'Career profile', href: '/dashboard/profile', icon: 'user' },
  { label: 'Settings', href: '/dashboard/settings', icon: 'gear' },
]

function RailIcon({ type, isActive }: { type: string; isActive: boolean }) {
  const strokeClass = isActive ? 'text-[#4FBE92]' : 'text-current opacity-75'
  if (type === 'home') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={cn('w-4 h-4 shrink-0', strokeClass)}>
        <rect x="3" y="3" width="7" height="9" rx="1.5" />
        <rect x="14" y="3" width="7" height="5" rx="1.5" />
        <rect x="14" y="12" width="7" height="9" rx="1.5" />
        <rect x="3" y="16" width="7" height="5" rx="1.5" />
      </svg>
    )
  }
  if (type === 'plus') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={cn('w-4 h-4 shrink-0', strokeClass)}>
        <path d="M12 5v14M5 12h14" />
      </svg>
    )
  }
  if (type === 'clock') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={cn('w-4 h-4 shrink-0', strokeClass)}>
        <path d="M12 3a9 9 0 1 0 9 9" />
        <path d="M12 8v4l3 2" />
      </svg>
    )
  }
  if (type === 'file') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={cn('w-4 h-4 shrink-0', strokeClass)}>
        <path d="M4 4h11l5 5v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
        <path d="M14 4v6h6" />
      </svg>
    )
  }
  if (type === 'mail') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={cn('w-4 h-4 shrink-0', strokeClass)}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    )
  }
  if (type === 'user') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={cn('w-4 h-4 shrink-0', strokeClass)}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" />
      </svg>
    )
  }
  if (type === 'crown') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={cn('w-4 h-4 shrink-0', strokeClass)}>
        <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7z" />
      </svg>
    )
  }
  if (type === 'gear') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={cn('w-4 h-4 shrink-0', strokeClass)}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 7.5 19.4l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 3 13.9H3a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 4.6 7.5l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 10 3.6V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1.3z" />
      </svg>
    )
  }
  return null
}

interface SidebarProps {
  isMobileOpen?: boolean
  setIsMobileOpen?: (val: boolean) => void
  isCollapsed?: boolean
  isDockedExpanded?: boolean
  isHoverExpanded?: boolean
  onToggleDocked?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export function Sidebar({
  isMobileOpen = false,
  setIsMobileOpen,
}: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [userName, setUserName] = useState<string>('User')
  const [userInitial, setUserInitial] = useState<string>('U')
  const [planName, setPlanName] = useState<string>('Free plan')
  const [creditsUsed, setCreditsUsed] = useState<number>(0)
  const [maxCredits, setMaxCredits] = useState<number>(FREE_TIER_CREDITS)
  const [isPro, setIsPro] = useState<boolean>(false)
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
    async function loadUserData() {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()

          const fullName = profile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'Candidate'
          setUserName(fullName)
          setUserInitial(fullName.trim().charAt(0).toUpperCase() || 'C')

          const premium = isPremiumPlan(profile?.plan_id)
          setIsPro(premium)
          setPlanName(premium ? 'Pro plan' : 'Free plan')

          const remaining = profile?.credits_remaining ?? FREE_TIER_CREDITS
          const used = Math.max(0, FREE_TIER_CREDITS - remaining)
          setCreditsUsed(used)
          setMaxCredits(FREE_TIER_CREDITS)
        }
      } catch (err) {
        console.warn('Could not load user data for sidebar', err)
      }
    }
    loadUserData()
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('soltkiz_session_active')
      sessionStorage.removeItem('soltkiz_session_start')
      document.cookie = 'session_start=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax'
    }
    router.push('/login?logout=success')
    router.refresh()
  }

  const renderItem = (item: { label: string; href: string; icon: string }) => {
    const isActive = pathname === item.href
    return (
      <Link
        key={item.label}
        href={item.href}
        aria-current={isActive ? 'true' : undefined}
        onClick={() => setIsMobileOpen?.(false)}
        className={cn(
          'flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-[13.5px] transition-colors',
          isActive
            ? 'bg-[#1E2938] text-white font-medium'
            : 'text-[#C3CCD9] hover:bg-[#1E2938] hover:text-white'
        )}
      >
        <RailIcon type={item.icon} isActive={isActive} />
        <span>{item.label}</span>
      </Link>
    )
  }

  return (
    <>
      {/* Mobile Backdrop (Portalled so it never disrupts CSS grid layout) */}
      {mounted && typeof document !== 'undefined' && isMobileOpen && createPortal(
        <div
          className="md:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 transition-opacity"
          onClick={() => setIsMobileOpen?.(false)}
        />,
        document.body
      )}

      {/* ========================================================================= */}
      {/* ACTIVE REDESIGN PROTOTYPE RAIL SIDEBAR (FROM DESKTOP/RESUME MOCKUP) */}
      {/* ========================================================================= */}
      <aside
        className={cn(
          'rail select-none z-50',
          'max-md:fixed max-md:top-0 max-md:bottom-0 max-md:left-0 max-md:w-[260px] max-md:transition-transform max-md:duration-300',
          isMobileOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-full'
        )}
      >
        {/* Mobile Close Button */}
        <button
          onClick={() => setIsMobileOpen?.(false)}
          aria-label="Close sidebar"
          className="md:hidden absolute top-4 right-3 p-1.5 rounded-lg bg-[#1E2938] text-[#9FACBE] hover:text-white cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Header */}
        <Link
          href="/dashboard"
          onClick={() => setIsMobileOpen?.(false)}
          className="brand flex items-center gap-2.5 px-1.5 pt-1 pb-5 group"
        >
          <div className="brand-mark w-[30px] h-[30px] rounded-[7px] shrink-0 bg-gradient-to-br from-[#0A6E4E] via-[#0D8A62] to-[#D9791F] grid place-items-center text-white font-bold text-[13px] tracking-tight shadow-sm">
            R1
          </div>
          <div>
            <div className="brand-name text-white font-semibold text-[14.5px] tracking-tight leading-tight group-hover:text-emerald-400 transition-colors">
              ResumeBuilderOne
            </div>
            <div className="brand-sub text-[#6F7D8F] text-[11px] leading-tight">
              From résumé to dream job
            </div>
          </div>
        </Link>

        {/* Group 1: Build */}
        <div className="rail-group mb-3.5">
          <div className="rail-label text-[11px] text-[#68768A] px-2 pb-1.5 tracking-wide uppercase font-semibold">
            Build
          </div>
          <nav className="rail-nav flex flex-col gap-0.5">
            {BUILD_NAV_ITEMS.map(renderItem)}
          </nav>
        </div>

        {/* Group 2: Your Details */}
        <div className="rail-group mb-3.5">
          <div className="rail-label text-[11px] text-[#68768A] px-2 pb-1.5 tracking-wide uppercase font-semibold">
            Your details
          </div>
          <nav className="rail-nav flex flex-col gap-0.5">
            {DETAILS_NAV_ITEMS.map(renderItem)}
          </nav>
        </div>

        <div className="rail-spacer flex-1" />

        {/* Plan Usage Card */}
        <div className="plan-card bg-[#1E2938] rounded-[10px] p-3 mb-2.5 border border-[#26313F]/50">
          <div className="plan-top flex justify-between items-baseline mb-2">
            <strong className="text-white text-[13px] font-semibold">{planName}</strong>
            <span className="text-[11.5px] text-[#7C8A9D] num">
              {isPro ? 'Unlimited' : `${creditsUsed} of ${maxCredits} used`}
            </span>
          </div>
          {!isPro && (
            <div className="plan-bar h-1 rounded-sm bg-[#2C3949] overflow-hidden mb-2.5">
              <i
                className="block h-full bg-[#4FBE92] transition-all duration-300"
                style={{ width: `${Math.min(100, Math.round((creditsUsed / maxCredits) * 100))}%` }}
              />
            </div>
          )}
          <p className="text-[11.5px] text-[#8C99AB] mb-2.5 leading-snug">
            {isPro
              ? 'Full ATS matching and unlimited exports.'
              : `${Math.max(0, maxCredits - creditsUsed)} tailored résumés left. Pro removes the cap and unlocks the full match report.`}
          </p>
          {!isPro ? (
            <Link
              href="/dashboard/pricing"
              onClick={() => setIsMobileOpen?.(false)}
              className="btn btn-primary w-full justify-center py-2 px-3 rounded-[7px] text-[12.5px] font-semibold shadow-xs"
            >
              Upgrade - $9/month
            </Link>
          ) : (
            <Link
              href="/dashboard/pricing"
              onClick={() => setIsMobileOpen?.(false)}
              className="btn btn-quiet w-full justify-center py-1.5 px-3 rounded-[7px] text-[12.5px] font-medium bg-[#2C3949] hover:bg-[#38485C] text-white transition-colors"
            >
              Manage plan
            </Link>
          )}
        </div>

        {/* User Footer with Sign Out */}
        <div className="rail-foot flex items-center gap-2.5 px-1 py-1.5 border-t border-[#1E2938]">
          <div className="avatar w-7 h-7 rounded-full bg-[#2E4A3E] text-[#8FD3B6] grid place-items-center text-[11px] font-semibold shrink-0">
            {userInitial}
          </div>
          <div className="min-w-0 flex-1">
            <b className="block text-white text-[12.5px] font-medium truncate leading-tight">
              {userName}
            </b>
            <span className="text-[11px] text-[#6F7D8F] leading-tight block">
              Signed in
            </span>
          </div>
          <button
            onClick={() => setShowLogoutModal(true)}
            title="Sign out"
            aria-label="Sign out"
            className="icon-btn p-1.5 rounded text-[#7B8698] hover:text-rose-400 hover:bg-[#1E2938] transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Modal (Portalled so it never disrupts CSS grid layout) */}
      {mounted && typeof document !== 'undefined' && showLogoutModal && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            onClick={() => setShowLogoutModal(false)}
          />
          <div className="bg-[#151D28] rounded-2xl shadow-2xl border border-[#26313F] w-full max-w-sm overflow-hidden z-10 animate-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xs">
                <LogOut className="w-6 h-6 text-rose-400" strokeWidth={2} />
              </div>
              <h3 className="text-[17px] font-bold text-[#E4EAF2] tracking-tight mb-1.5" style={{ color: '#E4EAF2' }}>
                Sign out of ResumeBuilderOne?
              </h3>
              <p className="text-[12.5px] text-[#9FACBE] font-medium leading-relaxed px-2" style={{ color: '#9FACBE' }}>
                Your profile and tailored resumes are safely saved. You can sign back in anytime.
              </p>
            </div>
            <div className="flex border-t border-[#26313F] bg-[#101722] p-3.5 gap-2.5">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-3 py-2.5 bg-[#1A2330] hover:bg-[#222E3F] border border-[#26313F] text-[#E4EAF2] rounded-xl text-[12.5px] font-semibold transition-all shadow-xs cursor-pointer"
                style={{ color: '#E4EAF2' }}
              >
                Stay Signed In
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="flex-1 px-3 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-[12.5px] font-semibold transition-all shadow-xs hover:shadow cursor-pointer"
                style={{ color: '#FFFFFF' }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ========================================================================= */}
      {/* PREVIOUS WHITE SIDEBAR UI (KEPT FOR CLIENT REVERT) */}
      {/* ========================================================================= */}
      {/*
      <aside className="hidden h-screen bg-white border-r border-slate-200/90 flex flex-col fixed left-0 top-0 z-50">
        <div className="h-[90px] flex items-center border-b border-slate-100 px-5">
          <img src="/LOGO.png" alt="ResumeBuilderOne" className="h-16 w-auto" />
        </div>
        <div className="p-4">
          <Link href="/dashboard/create" className="w-full py-3 px-4 bg-[#0F2744] text-white rounded-xl">
            New Tailored Resume
          </Link>
        </div>
      </aside>
      */}
      {/* ========================================================================= */}
      {/* END PREVIOUS WHITE SIDEBAR UI */}
      {/* ========================================================================= */}
    </>
  )
}
