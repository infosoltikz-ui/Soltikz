"use client"
import { DashboardHeader } from '@/components/dashboard/Header'
import { StatCards } from '@/components/dashboard/StatCards'
import { PlanDetails } from '@/components/dashboard/PlanDetails'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import { RecentResumes } from '@/components/dashboard/RecentResumes'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { AITipBanner } from '@/components/dashboard/AITipBanner'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, Suspense } from 'react'
import { toast } from 'react-hot-toast'

function DashboardContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    if (searchParams.get('login') === 'success') {
      toast.success('Successfully logged in!')
      router.replace('/dashboard')
    }
  }, [searchParams, router])

  return null
}

export default function DashboardPage() {
  return (
    <div className="px-8 pb-8 max-w-[1600px] mx-auto">
      <Suspense fallback={null}>
        <DashboardContent />
      </Suspense>
      <DashboardHeader />
      
      <main>
        <StatCards />

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 mb-6">
          <PlanDetails />
          <RecentActivity />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentResumes />
          <QuickActions />
        </div>

        <AITipBanner />
      </main>
    </div>
  )
}
