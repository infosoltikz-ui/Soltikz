'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { createClient } from '@/utils/supabase/client'
import { ADMIN_EMAILS } from '@/constants/admin'
import { Loader2 } from 'lucide-react'

export function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isLoginPage = pathname === '/admin/login'
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(isLoginPage ? true : null)

  useEffect(() => {
    if (isLoginPage) {
      setIsAuthorized(true)
      return
    }

    const checkAdminAuth = async () => {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user || !user.email || !ADMIN_EMAILS.includes(user.email.toLowerCase().trim())) {
          router.replace('/admin/login')
          return
        }
        setIsAuthorized(true)
      } catch {
        router.replace('/admin/login')
      }
    }

    checkAdminAuth()
  }, [pathname, isLoginPage, router])

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] font-sans">
        {children}
      </div>
    )
  }

  if (isAuthorized === null) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      {/* Left Sidebar Fixed */}
      <AdminSidebar />
      
      {/* Main Content Wrapper */}
      <div className="pl-[280px] flex flex-col min-h-screen">
        <AdminHeader />
        
        {/* Children will contain the center content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
