import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { StatCards } from '@/components/dashboard/StatCards'
import { RecentResumes } from '@/components/dashboard/RecentResumes'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { CurrentPlanCard } from '@/components/dashboard/CurrentPlanCard'
import { AITipBanner } from '@/components/dashboard/AITipBanner'
import { LoginToast } from '@/components/dashboard/LoginToast'
import { OnboardingSteps } from '@/components/dashboard/OnboardingSteps'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch Profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Fetch Resumes
  const { data: resumes } = await supabase
    .from('resumes_v2')
    .select('id, title, updated_at, ats_analyses ( overall_score )')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false })

  // Calculate stats
  const resumesCreated = profile?.resumes_generated || 0

  const atsScores = resumes?.map(r => (r as any).ats_analyses?.[0]?.overall_score).filter(Boolean) || []
  const avgAts = atsScores.length > 0 ? Math.round(atsScores.reduce((a, b) => a + b, 0) / atsScores.length) : 0

  // Calculate profile completion based on master_resume_data fields
  const masterData = profile?.master_resume_data || {}
  let profileCompletion = 0
  if (profile?.full_name) profileCompletion += 25
  if (profile?.phone) profileCompletion += 25
  if (masterData.experience) profileCompletion += 25
  if (masterData.education) profileCompletion += 25

  return (
    <div className="px-8 pt-8 pb-8 max-w-[1600px] mx-auto">
      <LoginToast />
      <DashboardHeader title="Dashboard" greeting />

      <main className="space-y-8">
        <OnboardingSteps profileCompletion={profileCompletion} resumesCreated={resumesCreated} />

        <StatCards
          resumesCreated={resumesCreated}
          avgAts={avgAts}
          profileCompletion={profileCompletion}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentResumes resumes={resumes || []} />
          <CurrentPlanCard />
        </div>

        <QuickActions />

        <AITipBanner />
      </main>
    </div>
  )
}
