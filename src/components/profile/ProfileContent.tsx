'use client'

import { useState } from 'react'
import { ProfileHeader } from '@/components/profile/ProfileHeader'
import { ProfileTabs } from '@/components/profile/ProfileTabs'
import { ProfileSidebar } from '@/components/profile/ProfileSidebar'
import { ProfileCompletionBanner } from '@/components/profile/ProfileCompletionBanner'

// Form Components
import { PersonalInfoForm } from '@/components/profile/PersonalInfoForm'
import { EducationForm } from '@/components/profile/EducationForm'
import { EmploymentForm } from '@/components/profile/EmploymentForm'
import { SkillsForm } from '@/components/profile/SkillsForm'
import { ProjectsForm } from '@/components/profile/ProjectsForm'
import { CertificationsForm } from '@/components/profile/CertificationsForm'

export function ProfileContent({ initialProfile }: { initialProfile: any }) {
  const [activeTab, setActiveTab] = useState('personal')
  const [profile, setProfile] = useState(initialProfile)

  const renderActiveForm = () => {
    switch (activeTab) {
      case 'personal': return <PersonalInfoForm profile={profile} setProfile={setProfile} onNext={() => setActiveTab('education')} />
      case 'education': return <EducationForm profile={profile} setProfile={setProfile} onNext={() => setActiveTab('employment')} />
      case 'employment': return <EmploymentForm profile={profile} setProfile={setProfile} onNext={() => setActiveTab('projects')} />
      case 'projects': return <ProjectsForm profile={profile} setProfile={setProfile} onNext={() => setActiveTab('certifications')} />
      case 'certifications': return <CertificationsForm profile={profile} setProfile={setProfile} onNext={() => setActiveTab('skills')} />
      case 'skills': return <SkillsForm profile={profile} setProfile={setProfile} onNext={() => setActiveTab('personal')} />
      default: return <PersonalInfoForm profile={profile} setProfile={setProfile} onNext={() => setActiveTab('education')} />
    }
  }

  return (
    <>
      <ProfileHeader profile={profile} />

      <div className="mb-2">
        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <main>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Form Area */}
          <div className="flex-1 min-w-0">
            {renderActiveForm()}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[260px] xl:w-[280px] shrink-0">
            <ProfileSidebar profile={profile} />
          </div>
        </div>

        <ProfileCompletionBanner profile={profile} />
      </main>
    </>
  )
}
