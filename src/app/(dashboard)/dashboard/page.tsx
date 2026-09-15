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
import { FREE_TIER_CREDITS } from '@/utils/pricingPlans'

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

  // Fetch Resumes with complete info
  const { data: resumes } = await supabase
    .from('resumes_v2')
    .select('id, title, resume_type, updated_at, created_at, ats_analyses ( overall_score )')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false })

  // Calculate accurate live stats
  const totalResumes = resumes?.length || profile?.resumes_generated || 0

  const scoredResumes = resumes?.filter((r: any) => {
    const score = r.ats_analyses?.[0]?.overall_score
    return typeof score === 'number' && score > 0
  }) || []

  const avgAts = scoredResumes.length > 0
    ? Math.round(scoredResumes.reduce((sum: number, r: any) => sum + (r.ats_analyses?.[0]?.overall_score || 0), 0) / scoredResumes.length)
    : null

  // Calculate profile completion accurately based on master_resume_data & profile
  const masterData = profile?.master_resume_data || {}
  const personalInfo = masterData.personal_info || {}
  let completedSections = 0
  const totalSections = 5

  if ((profile?.full_name || personalInfo.firstName) && (profile?.phone || personalInfo.phone || personalInfo.email)) {
    completedSections++
  }
  if (personalInfo.summary || personalInfo.targetRole) {
    completedSections++
  }
  if ((masterData.employment && masterData.employment.length > 0) || (masterData.experience && masterData.experience.length > 0)) {
    completedSections++
  }
  if (masterData.education && masterData.education.length > 0) {
    completedSections++
  }
  if (masterData.skills && masterData.skills.length > 0) {
    completedSections++
  }

  const profileCompletion = Math.round((completedSections / totalSections) * 100)
  const planId = profile?.plan_id || 'FREE'
  const creditsRemaining = profile?.credits_remaining ?? FREE_TIER_CREDITS

  return (
    <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-12 max-w-[1600px] mx-auto bg-slate-50/50 min-h-screen">
      <LoginToast />
      <DashboardHeader title="Dashboard" greeting />

      <main className="space-y-6">
        <OnboardingSteps
          profileCompletion={profileCompletion}
          resumesCreated={totalResumes}
        />

        <StatCards
          resumesCreated={totalResumes}
          avgAts={avgAts}
          scoredCount={scoredResumes.length}
          profileCompletion={profileCompletion}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <RecentResumes resumes={resumes || []} />
          <CurrentPlanCard
            initialPlanId={planId}
            initialCreditsRemaining={creditsRemaining}
            totalResumes={totalResumes}
          />
        </div>

        <QuickActions />

        <AITipBanner />
      </main>
    </div>
  )
}
