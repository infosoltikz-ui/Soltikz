'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sidebar } from './Sidebar'
import { Menu, FilePlus2 } from 'lucide-react'
import { ThemeToggle } from '@/components/theme/ThemeToggle'

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[var(--desk)] text-[var(--ink)]">
      {/* Sleek Mobile Header Utility Bar */}
      <div className="md:hidden fixed top-0 inset-x-0 h-14 bg-[#151E2B] text-white z-40 px-4 flex items-center justify-between border-b border-[#26313F]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileOpen(true)}
            aria-label="Open navigation menu"
            className="p-1.5 -ml-1 rounded-lg bg-[#1E2938] text-[#C3CCD9] hover:text-white cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#0A6E4E] via-[#0D8A62] to-[#D9791F] grid place-items-center text-white font-bold text-xs">
              SZ
            </div>
            <span className="font-semibold text-sm text-white">Soltikz Resume Builder</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle compact showLabel={false} />
          <Link
            href="/dashboard/create"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#0A6E4E] hover:bg-[#06412F] text-white text-xs font-medium transition-colors"
          >
            <FilePlus2 className="w-3.5 h-3.5" />
            <span>Tailor</span>
          </Link>
        </div>
      </div>

      {/* Grid container: rail sidebar (236px) and canvas (1fr) */}
      <div className="app">
        {/* Rail Sidebar */}
        <Sidebar
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />

        {/* Main Canvas Area */}
        <main className="canvas max-md:pt-16">
          {children}
        </main>
      </div>

      {/* ========================================================================= */}
      {/* PREVIOUS WHITE SHELL UI (KEPT FOR CLIENT REVERT) */}
      {/* ========================================================================= */}
      {/*
      <div className="hidden min-h-screen bg-[#F8FAFC]">
        Previous white shell implementation with 15s auto-collapse
      </div>
      */}
      {/* ========================================================================= */}
      {/* END PREVIOUS WHITE SHELL UI */}
      {/* ========================================================================= */}
    </div>
  )
}
