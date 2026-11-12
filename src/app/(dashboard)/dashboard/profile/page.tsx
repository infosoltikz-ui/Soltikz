import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { ProfileContent } from '@/components/profile/ProfileContent'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { ModuleHowItWorks, ModuleStep } from '@/components/dashboard/ModuleHowItWorks'
import Link from 'next/link'
import { FilePlus2 } from 'lucide-react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function ProfilePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  let { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) {
    profile = {
      id: user.id,
      email: user.email,
      full_name: user.user_metadata?.full_name || '',
    }
  }

  const steps: ModuleStep[] = [
    {
      iconName: 'UserCircle',
      title: 'Build Your Master Profile',
      description: 'Fill in your personal details, work experience, education, skills, and certifications.',
      bullets: [
        'Personal info: name, email, phone, LinkedIn, and location',
        'Work experience with detailed measurable achievements',
        'Education, certifications, projects, and tech skill groups',
      ],
    },
    {
      iconName: 'ShieldAlert',
      title: 'Your AI Source of Truth',
      description: 'Every resume generated is based strictly on your master profile data with zero hallucinations.',
      bullets: [
        'AI never fabricates roles or metrics you did not list here',
        'Update your profile anytime to reflect new milestones',
        'Profile records are securely stored and private',
      ],
    },
    {
      iconName: 'Key',
      title: 'Complete Profile = Higher ATS Scores',
      description: 'A 100% complete profile gives our tailoring engine maximum context for any job description.',
      bullets: [
        'Aim for 100% Profile Health shown in the right sidebar',
        'Add past roles so AI can pick the strongest matches for each JD',
        'Import via LinkedIn PDF or Excel template to populate in seconds',
      ],
    },
  ]

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-14 max-w-[1540px] mx-auto">
      <DashboardHeader
        eyebrow="Career Repository"
        title="Master Profile"
        subtitle="Your centralized career record. Every tailored resume and cover letter draws straight from this source of truth."
        actions={
          <Link
            href="/dashboard/create"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F2744] hover:bg-[#0A1C33] text-white text-xs font-extrabold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <FilePlus2 className="w-4 h-4 text-[#F59E0B]" />
            <span>Use in Resume Studio</span>
          </Link>
        }
      />

      <ModuleHowItWorks
        moduleTitle="Master Profile"
        tagline="Build your complete career record once and tailor unlimited ATS resumes from it."
        steps={steps}
      />

      <ProfileContent initialProfile={profile} />
    </div>
  )
}
