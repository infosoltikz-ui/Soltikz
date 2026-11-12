'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  IdCard,
  FilePlus2,
  Files,
  FileSignature,
  Crown,
  Settings2,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Pin,
  X,
  Plus,
} from 'lucide-react'
import { cn } from '@/utils/cn'
import { PoweredBySoltkiz } from '@/components/ui/PoweredBySoltkiz'
import { createClient } from '@/utils/supabase/client'

const WORKSPACE_NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Master Profile', href: '/dashboard/profile', icon: IdCard },
  { label: 'Create Resume', href: '/dashboard/create', icon: FilePlus2 },
  { label: 'My Resumes', href: '/dashboard/resumes', icon: Files },
  { label: 'Cover Letters', href: '/dashboard/cover-letters', icon: FileSignature },
]

const ACCOUNT_NAV_ITEMS = [
  { label: 'Pricing & Plans', href: '/dashboard/pricing', icon: Crown },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings2 },
]

interface SidebarProps {
  isCollapsed?: boolean
  isDockedExpanded?: boolean
  isHoverExpanded?: boolean
  onToggleDocked?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  isMobileOpen?: boolean
  setIsMobileOpen?: (val: boolean) => void
}

export function Sidebar({
  isCollapsed = false,
  isDockedExpanded = true,
  isHoverExpanded = false,
  onToggleDocked,
  onMouseEnter,
  onMouseLeave,
  isMobileOpen = false,
  setIsMobileOpen,
}: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  // Always show full labels when the mobile slide-over drawer is open
  const compact = isCollapsed && !isMobileOpen

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

  const renderNavItem = (item: { label: string; href: string; icon: any }) => {
    const isActive = pathname === item.href
    const Icon = item.icon

    return (
      <Link
        key={item.label}
        href={item.href}
        title={compact ? item.label : undefined}
        onClick={() => {
          setIsMobileOpen?.(false)
          if (
            item.href === '/dashboard/create' &&
            typeof window !== 'undefined' &&
            window.location.pathname === '/dashboard/create'
          ) {
            window.location.href = '/dashboard/create'
          }
        }}
        className={cn(
          'group relative flex items-center rounded-xl text-[14px] font-bold transition-all duration-200',
          compact ? 'justify-center px-2.5 py-2.5' : 'gap-3.5 px-3.5 py-2.5',
          isActive
            ? 'bg-[#0F2744] text-white shadow-md shadow-[#0F2744]/15'
            : 'text-slate-600 hover:bg-slate-100/90 hover:text-[#0F2744] hover:translate-x-0.5'
        )}
      >
        {isActive && !compact && (
          <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[#F59E0B]" />
        )}
        <div
          className={cn(
            'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200',
            isActive
              ? 'bg-white/10 text-[#F59E0B]'
              : 'bg-slate-100/80 text-slate-500 group-hover:bg-white group-hover:text-[#0F2744] group-hover:shadow-2xs'
          )}
        >
          <Icon className="w-[18px] h-[18px]" strokeWidth={2.2} />
        </div>
        {!compact && (
          <span className="overflow-hidden whitespace-nowrap tracking-tight flex-1">
            {item.label}
          </span>
        )}
      </Link>
    )
  }

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 transition-opacity"
          onClick={() => setIsMobileOpen?.(false)}
        />
      )}

      <aside
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={cn(
          'h-screen bg-white border-r border-slate-200/90 flex flex-col fixed left-0 top-0 z-50 transition-[width,transform,box-shadow] duration-300 ease-in-out',
          isHoverExpanded
            ? 'shadow-[10px_0_30px_-10px_rgba(15,39,68,0.14)]'
            : 'shadow-[4px_0_24px_-12px_rgba(15,39,68,0.06)]',
          compact ? 'w-[276px] md:w-[84px]' : 'w-[276px]',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        {/* Mobile Close Button */}
        <button
          onClick={() => setIsMobileOpen?.(false)}
          aria-label="Close sidebar"
          className="md:hidden absolute top-5 right-4 p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Desktop Pin / Collapse Toggle */}
        {onToggleDocked && (
          <button
            onClick={onToggleDocked}
            title={
              isDockedExpanded
                ? 'Collapse to icon rail'
                : isHoverExpanded
                ? 'Pin sidebar open'
                : 'Expand & pin sidebar'
            }
            aria-label={
              isDockedExpanded
                ? 'Collapse sidebar'
                : isHoverExpanded
                ? 'Pin sidebar open'
                : 'Expand sidebar'
            }
            className="hidden md:flex absolute -right-3.5 top-6 w-7 h-7 bg-white border border-slate-200/90 rounded-full items-center justify-center text-slate-500 hover:text-[#0F2744] hover:border-[#0F2744]/40 hover:scale-110 shadow-sm z-50 transition-all cursor-pointer"
          >
            {isDockedExpanded ? (
              <ChevronLeft className="w-3.5 h-3.5" />
            ) : isHoverExpanded ? (
              <Pin className="w-3.5 h-3.5 text-[#0F2744]" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5" />
            )}
          </button>
        )}

        {/* Brand Identity Header */}
        <div
          className={cn(
            'h-[90px] flex items-center border-b border-slate-100 shrink-0 overflow-hidden',
            compact ? 'justify-center px-2' : 'px-5'
          )}
        >
          <Link href="/" className="flex items-center justify-center group w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={compact ? '/icon.png' : '/LOGO.png'}
              alt="ResumeBuilderOne.com"
              className={cn(
                'object-contain transition-all duration-200 group-hover:scale-[1.03]',
                compact ? 'h-11 w-11 rounded-xl' : 'h-16 w-auto max-w-full'
              )}
            />
          </Link>
        </div>

        {/* Quick Create Action */}
        <div className={cn('pt-5 pb-2.5 shrink-0', compact ? 'px-3' : 'px-4')}>
          <Link
            href="/dashboard/create"
            title={compact ? 'New Tailored Resume' : undefined}
            onClick={() => setIsMobileOpen?.(false)}
            className={cn(
              'group flex items-center justify-center rounded-xl bg-gradient-to-r from-[#0F2744] to-[#173861] hover:from-[#0A1C33] hover:to-[#0F2744] text-white font-bold text-[13.5px] shadow-md shadow-[#0F2744]/15 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 border border-[#0F2744] overflow-hidden',
              compact ? 'w-full h-11 px-0' : 'w-full py-3 px-4 gap-2'
            )}
          >
            <Plus className="w-4 h-4 text-[#F59E0B] group-hover:rotate-90 transition-transform duration-200 shrink-0" strokeWidth={2.75} />
            {!compact && <span className="whitespace-nowrap">New Tailored Resume</span>}
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3.5 py-3 overflow-y-auto overflow-x-hidden space-y-5">
          <div>
            {!compact && (
              <div className="px-3 mb-2.5 text-[10.5px] font-extrabold uppercase tracking-[0.12em] text-slate-400 whitespace-nowrap">
                Workspace
              </div>
            )}
            <div className="space-y-1.5">
              {WORKSPACE_NAV_ITEMS.map(renderNavItem)}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            {!compact && (
              <div className="px-3 mb-2.5 mt-1 text-[10.5px] font-extrabold uppercase tracking-[0.12em] text-slate-400 whitespace-nowrap">
                Account
              </div>
            )}
            <div className="space-y-1.5">
              {ACCOUNT_NAV_ITEMS.map(renderNavItem)}
            </div>
          </div>
        </nav>

        {/* Bottom Actions & Branding */}
        <div className="p-3.5 border-t border-slate-100 bg-slate-50/40 space-y-2.5 shrink-0 overflow-hidden">
          <button
            title={compact ? 'Sign Out' : undefined}
            onClick={() => setShowLogoutModal(true)}
            className={cn(
              'group w-full flex items-center rounded-xl text-[14px] font-bold text-slate-600 hover:text-rose-600 hover:bg-rose-50/90 transition-all duration-200 cursor-pointer',
              compact ? 'justify-center p-2.5' : 'gap-3.5 px-3.5 py-2.5'
            )}
          >
            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200/80 group-hover:border-rose-200 group-hover:bg-rose-100/70 flex items-center justify-center shrink-0 transition-colors">
              <LogOut className="w-4 h-4 text-slate-500 group-hover:text-rose-600 transition-colors" strokeWidth={2.2} />
            </div>
            {!compact && <span className="whitespace-nowrap">Sign Out</span>}
          </button>

          {!compact && (
            <div className="hidden md:flex justify-center pt-0.5">
              <PoweredBySoltkiz className="w-full justify-center py-1.5 px-3 border-slate-200/80 bg-white/90" />
            </div>
          )}
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setShowLogoutModal(false)}
          />
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 w-full max-w-sm overflow-hidden z-10 animate-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
              <div className="w-14 h-14 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xs">
                <LogOut className="w-7 h-7" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 tracking-tight mb-1.5">
                Sign out of your workspace?
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed px-3">
                Your master profile and tailored resumes are safely saved. You can sign back in anytime.
              </p>
            </div>
            <div className="flex border-t border-slate-100 bg-slate-50/70 p-4 gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-2.5 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer"
              >
                Stay Signed In
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
