"use client";
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-[1020] transition-all duration-300',
          scrolled
            ? 'shadow-sm border-b bg-white/95 backdrop-blur-md border-slate-100'
            : 'bg-white border-transparent',
        )}
        style={{ height: '80px' }}
      >
        <div className="container mx-auto px-4 lg:px-8 h-full flex items-center justify-between gap-4 max-w-[1400px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-900 leading-none">
              ATS
              <span className="block text-[11px] font-bold text-slate-600 tracking-normal mt-0.5">Resume Builder</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href))
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "group relative text-[13px] font-bold transition-colors py-2",
                    isActive ? "text-primary" : "text-slate-700 hover:text-primary"
                  )}
                >
                  {link.label}
                  <span className={cn(
                    "absolute bottom-0 left-1/2 h-0.5 bg-primary -translate-x-1/2 transition-all duration-300 ease-out rounded-full",
                    isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                  )} />
                </Link>
              )
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/login" className="hidden sm:block text-[14px] font-bold text-slate-800 hover:text-primary transition-colors group relative py-2">
              Log In
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ease-out group-hover:w-full rounded-full opacity-0 group-hover:opacity-100" />
            </Link>
            
            <Link href="/register" className="hidden sm:block">
              <Button className="font-bold rounded-lg px-6 h-10 text-[14px] transition-all duration-300 hover:shadow-md hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0">
                Get Started Free
              </Button>
            </Link>

            <button
              className="lg:hidden p-2 -mr-2 text-slate-800"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              aria-label="Toggle menu"
            >
              {mobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-[1010] bg-white pt-24 px-4 pb-6 overflow-y-auto lg:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href))
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "text-lg font-bold p-4 rounded-xl active:bg-slate-100 transition-colors",
                    isActive ? "text-primary bg-primary/5" : "text-slate-900 bg-slate-50"
                  )}
                  onClick={() => setMobileNavOpen(false)}
                >
                  {link.label}
                </Link>
              )
            })}
            <hr className="my-4 border-slate-100" />
            <Link
              href="/login"
              className="text-lg font-bold text-slate-900 p-4 rounded-xl bg-slate-50 text-center"
              onClick={() => setMobileNavOpen(false)}
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="text-lg font-bold text-white p-4 rounded-xl bg-primary text-center"
              onClick={() => setMobileNavOpen(false)}
            >
              Get Started Free
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}
