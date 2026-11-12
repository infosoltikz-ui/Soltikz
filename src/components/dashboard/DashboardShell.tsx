'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { Sidebar } from './Sidebar'
import { cn } from '@/utils/cn'
import { Menu, FilePlus2 } from 'lucide-react'

const AUTO_COLLAPSE_DELAY_MS = 15000

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [isDockedExpanded, setIsDockedExpanded] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const isHoveredRef = useRef(false)
  const pendingAutoCollapseRef = useRef(false)
  const manualOverrideRef = useRef(false)
  const hoverHoldTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (manualOverrideRef.current) return
      if (isHoveredRef.current) {
        pendingAutoCollapseRef.current = true
      } else {
        setIsDockedExpanded(false)
      }
    }, AUTO_COLLAPSE_DELAY_MS)

    return () => {
      clearTimeout(timer)
      if (hoverHoldTimerRef.current) {
        clearTimeout(hoverHoldTimerRef.current)
      }
    }
  }, [])

  const handleSidebarMouseEnter = useCallback(() => {
    if (typeof window !== 'undefined' && !window.matchMedia('(min-width: 768px)').matches) {
      return
    }
    if (hoverHoldTimerRef.current) {
      clearTimeout(hoverHoldTimerRef.current)
      hoverHoldTimerRef.current = null
    }
    isHoveredRef.current = true
    setIsHovered(true)
  }, [])

  const handleSidebarMouseLeave = useCallback(() => {
    isHoveredRef.current = false
    if (hoverHoldTimerRef.current) {
      clearTimeout(hoverHoldTimerRef.current)
    }
    if (pendingAutoCollapseRef.current && !manualOverrideRef.current) {
      pendingAutoCollapseRef.current = false
      setIsDockedExpanded(false)
    }
    // Hold the hover-expanded sidebar open for 15 seconds after cursor leaves
    hoverHoldTimerRef.current = setTimeout(() => {
      setIsHovered(false)
      hoverHoldTimerRef.current = null
    }, AUTO_COLLAPSE_DELAY_MS)
  }, [])

  const handleToggleDocked = useCallback(() => {
    manualOverrideRef.current = true
    pendingAutoCollapseRef.current = false
    if (hoverHoldTimerRef.current) {
      clearTimeout(hoverHoldTimerRef.current)
      hoverHoldTimerRef.current = null
    }
    setIsDockedExpanded((prev) => {
      const next = !prev
      if (!next) {
        isHoveredRef.current = false
        setIsHovered(false)
      }
      return next
    })
  }, [])

  const sidebarCollapsed = !(isDockedExpanded || isHovered)
  const isHoverExpanded = !isDockedExpanded && isHovered

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative overflow-x-clip selection:bg-[#0F2744] selection:text-white">
      {/* Subtle architectural top ambient tint */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_75%_55%_at_50%_-10%,rgba(15,39,68,0.045),transparent)] z-0"
      />

      <Sidebar
        isCollapsed={sidebarCollapsed}
        isDockedExpanded={isDockedExpanded}
        isHoverExpanded={isHoverExpanded}
        onToggleDocked={handleToggleDocked}
        onMouseEnter={handleSidebarMouseEnter}
        onMouseLeave={handleSidebarMouseLeave}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Sleek Mobile Header Utility Bar */}
      <div className="md:hidden fixed top-0 inset-x-0 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 z-40 px-4 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileOpen(true)}
            aria-label="Open navigation menu"
            className="p-2 -ml-1 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200/80 text-slate-700 hover:text-[#0F2744] transition-colors cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link href="/dashboard" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/LOGO.png"
              alt="ResumeBuilderOne.com"
              className="h-10 w-auto object-contain"
            />
          </Link>
        </div>

        <Link
          href="/dashboard/create"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0F2744] hover:bg-[#0A1C33] text-white text-xs font-bold shadow-xs transition-all"
        >
          <FilePlus2 className="w-3.5 h-3.5 text-[#F59E0B]" />
          <span>Create</span>
        </Link>
      </div>

      {/* Main Content Area */}
      <div
        className={cn(
          'relative z-10 min-w-0 transition-[padding] duration-300 ease-in-out pt-16 md:pt-0 min-h-screen',
          !sidebarCollapsed ? 'md:pl-[276px]' : 'md:pl-[84px]'
        )}
      >
        {children}
      </div>
    </div>
  )
}
