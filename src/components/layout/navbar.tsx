"use client";
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react'

const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Features', href: '/features' },
  { label: 'Templates', href: '/#templates' },
  { label: 'Pricing', href: '/pricing' },
  {
    label: 'Resources',
    href: '#',
    hasDropdown: true,
    dropdownItems: [
      { label: 'ATS Score Checker', href: '/features' },
      { label: 'Cover Letter Builder', href: '/features' },
      { label: 'Interview STAR Prep', href: '/features' },
      { label: 'Resume Tips Blog', href: '/features' },
    ],
  },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ════════════════════════════════════════════════════════════ */}
      {/* NAVBAR                                                       */}
      {/* ════════════════════════════════════════════════════════════ */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1020,
          background: scrolled ? 'rgba(255,255,255,0.97)' : '#fff',
          borderBottom: '1px solid #f1f5f9',
          boxShadow: scrolled ? '0 2px 16px rgba(15,23,42,0.07)' : 'none',
          transition: 'box-shadow 0.25s',
          height: 72,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 24px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
          }}
        >

          {/* ── Logo ── */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/LOGO.png"
              alt="ResumeBuilderOne.com"
              style={{ height: 46, width: 'auto', objectFit: 'contain' }}
            />
          </Link>

          {/* ── Desktop Nav Links ── */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 32,
              flex: 1,
              justifyContent: 'center',
            }}
            className="hidden lg:flex"
          >
            {NAV_LINKS.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div
                    key={link.label}
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setResourcesOpen(true)}
                    onMouseLeave={() => setResourcesOpen(false)}
                  >
                    <button
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        fontSize: 14,
                        fontWeight: 600,
                        color: '#374151',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px 0',
                        transition: 'color 0.15s',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#111827' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#374151' }}
                    >
                      {link.label}
                      <ChevronDown style={{ width: 14, height: 14, color: '#9ca3af', marginTop: 1 }} />
                    </button>

                    {resourcesOpen && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          marginTop: 8,
                          background: '#fff',
                          border: '1px solid #f1f5f9',
                          borderRadius: 12,
                          boxShadow: '0 12px 32px rgba(15,23,42,0.12)',
                          padding: '6px',
                          minWidth: 190,
                          zIndex: 100,
                        }}
                      >
                        {link.dropdownItems?.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            style={{
                              display: 'block',
                              padding: '9px 14px',
                              fontSize: 13,
                              fontWeight: 600,
                              color: '#374151',
                              textDecoration: 'none',
                              borderRadius: 8,
                              transition: 'background 0.12s, color 0.12s',
                            }}
                            onMouseEnter={e => {
                              (e.currentTarget as HTMLAnchorElement).style.background = '#f8fafc'
                              ;(e.currentTarget as HTMLAnchorElement).style.color = '#111827'
                            }}
                            onMouseLeave={e => {
                              (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'
                              ;(e.currentTarget as HTMLAnchorElement).style.color = '#374151'
                            }}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }

              const isActive = pathname === link.href
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{
                    fontSize: 14,
                    fontWeight: isActive ? 700 : 600,
                    color: isActive ? '#111827' : '#374151',
                    textDecoration: 'none',
                    padding: '4px 0',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#111827' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = isActive ? '#111827' : '#374151' }}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* ── Right buttons ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>

            {/* Log In outlined button */}
            <Link
              href="/login"
              className="hidden sm:inline-flex"
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: '#374151',
                textDecoration: 'none',
                padding: '8px 20px',
                borderRadius: 10,
                border: '1.5px solid #d1d5db',
                background: '#fff',
                transition: 'border-color 0.15s, color 0.15s, background 0.15s',
                cursor: 'pointer',
                lineHeight: 1,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = '#9ca3af'
                ;(e.currentTarget as HTMLAnchorElement).style.background = '#f9fafb'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = '#d1d5db'
                ;(e.currentTarget as HTMLAnchorElement).style.background = '#fff'
              }}
            >
              Log In
            </Link>

            {/* Get Started Free → dark navy button */}
            <Link href="/register" style={{ textDecoration: 'none' }}>
              <button
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#fff',
                  background: '#0f172a',
                  padding: '9px 20px',
                  borderRadius: 10,
                  border: 'none',
                  cursor: 'pointer',
                  letterSpacing: '0.01em',
                  boxShadow: '0 2px 10px rgba(15,23,42,0.18)',
                  transition: 'background 0.15s, transform 0.12s',
                  whiteSpace: 'nowrap',
                  lineHeight: 1,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = '#1e293b'
                  ;(e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = '#0f172a'
                  ;(e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'
                }}
              >
                Get Started Free
                <ArrowRight style={{ width: 14, height: 14 }} />
              </button>
            </Link>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 38,
                height: 38,
                borderRadius: 8,
                border: '1px solid #e2e8f0',
                background: '#fff',
                cursor: 'pointer',
                color: '#374151',
              }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X style={{ width: 20, height: 20 }} /> : <Menu style={{ width: 20, height: 20 }} />}
            </button>
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* MOBILE DRAWER                                                */}
      {/* ════════════════════════════════════════════════════════════ */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1010,
            background: 'rgba(15,23,42,0.35)',
            paddingTop: 72,
          }}
          onClick={() => setMobileOpen(false)}
        >
          <div
            style={{
              background: '#fff',
              margin: '8px 12px',
              borderRadius: 16,
              border: '1px solid #f1f5f9',
              boxShadow: '0 20px 60px rgba(15,23,42,0.18)',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
            onClick={e => e.stopPropagation()}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  display: 'block',
                  padding: '11px 14px',
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#374151',
                  textDecoration: 'none',
                }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div style={{ borderTop: '1px solid #f1f5f9', marginTop: 4, paddingTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link
                href="/login"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '11px',
                  borderRadius: 10,
                  border: '1.5px solid #e2e8f0',
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#374151',
                  textDecoration: 'none',
                }}
                onClick={() => setMobileOpen(false)}
              >
                Log In
              </Link>
              <Link
                href="/register"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '12px',
                  borderRadius: 10,
                  background: '#0f172a',
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#fff',
                  textDecoration: 'none',
                }}
                onClick={() => setMobileOpen(false)}
              >
                Get Started Free →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
