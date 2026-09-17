'use client'

import { useState, useEffect, useRef } from 'react'
import { ProfileHeader } from '@/components/profile/ProfileHeader'
import { ProfileTabs } from '@/components/profile/ProfileTabs'
import { ProfileSidebar } from '@/components/profile/ProfileSidebar'
import { ProfileView } from '@/components/profile/ProfileView'
import { ProfilePreviewModal } from '@/components/profile/ProfilePreviewModal'

// Form Components
import { PersonalInfoForm } from '@/components/profile/PersonalInfoForm'
import { EducationForm } from '@/components/profile/EducationForm'
import { EmploymentForm } from '@/components/profile/EmploymentForm'
import { SkillsForm } from '@/components/profile/SkillsForm'
import { ProjectsForm } from '@/components/profile/ProjectsForm'
import { CertificationsForm } from '@/components/profile/CertificationsForm'
import { toast } from 'react-hot-toast'

export function ProfileContent({ initialProfile }: { initialProfile: any }) {
  const [activeTab, setActiveTab] = useState('personal')
  const [profile, setProfile] = useState(initialProfile)
  const [importVersion, setImportVersion] = useState(0)
  const [showPreviewModal, setShowPreviewModal] = useState(false)

  const hiddenFileInputRef = useRef<HTMLInputElement>(null)
  const [isImporting, setIsImporting] = useState(false)

  const masterData = profile?.master_resume_data || {}

  // If master_resume_data already has content, default to clean dossier view
  const hasExistingData = !!(
    masterData?.personal_info?.firstName ||
    masterData?.employment?.length > 0 ||
    masterData?.education?.length > 0 ||
    masterData?.skills?.length > 0
  )
  const [viewMode, setViewMode] = useState(hasExistingData)

  // Called by SkillsForm after Final Save
  const handleFinalSave = (savedProfile: any) => {
    setProfile(savedProfile)
    setViewMode(true)
  }

  // Called by ProfileView Edit buttons
  const handleEdit = (tab: string) => {
    setActiveTab(tab)
    setViewMode(false)
  }

  // LinkedIn Import handler
  const handleLinkedInImport = (parsedData: any) => {
    setProfile((prev: any) => ({
      ...prev,
      full_name: [parsedData.personal_info?.firstName, parsedData.personal_info?.lastName].filter(Boolean).join(' ') || prev.full_name,
      master_resume_data: {
        ...prev.master_resume_data,
        personal_info: { ...prev.master_resume_data?.personal_info, ...parsedData.personal_info },
        employment: parsedData.employment?.length > 0 ? parsedData.employment : prev.master_resume_data?.employment,
        education: parsedData.education?.length > 0 ? parsedData.education : prev.master_resume_data?.education,
        skills: parsedData.skills?.length > 0 ? parsedData.skills : prev.master_resume_data?.skills,
      }
    }))
    setViewMode(false)
    setActiveTab('personal')
    setImportVersion(v => v + 1)
  }

  const handleQuickImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return

    setIsImporting(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/ai/parse-linkedin-pdf', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || 'Failed to parse LinkedIn PDF')

      handleLinkedInImport(data.parsed_data)
      toast.success('LinkedIn PDF imported! Review your sections below.')
    } catch (error: any) {
      toast.error(error.message || 'Failed to import LinkedIn PDF')
    } finally {
      setIsImporting(false)
    }
  }

  // Scroll to top whenever tab changes or view mode toggles
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeTab, viewMode])

  const counts = {
    employment: masterData?.employment?.length || 0,
    education: masterData?.education?.length || 0,
    skills: Array.isArray(masterData?.skills) ? masterData.skills.length : 0,
    projects: masterData?.projects?.length || 0,
    certifications: masterData?.certifications?.length || 0
  }

  const renderActiveForm = () => {
    const onCancel = hasExistingData ? () => setViewMode(true) : undefined
    switch (activeTab) {
      case 'personal': return <PersonalInfoForm profile={profile} setProfile={setProfile} onNext={() => setActiveTab('employment')} onCancel={onCancel} />
      case 'employment': return <EmploymentForm profile={profile} setProfile={setProfile} onNext={() => setActiveTab('education')} onCancel={onCancel} />
      case 'education': return <EducationForm profile={profile} setProfile={setProfile} onNext={() => setActiveTab('projects')} onCancel={onCancel} />
      case 'projects': return <ProjectsForm profile={profile} setProfile={setProfile} onNext={() => setActiveTab('certifications')} onCancel={onCancel} />
      case 'certifications': return <CertificationsForm profile={profile} setProfile={setProfile} onNext={() => setActiveTab('skills')} onCancel={onCancel} />
      case 'skills': return <SkillsForm profile={profile} setProfile={setProfile} onFinalSave={handleFinalSave} onCancel={onCancel} />
      default: return <PersonalInfoForm profile={profile} setProfile={setProfile} onNext={() => setActiveTab('employment')} onCancel={onCancel} />
    }
  }

  return (
    <>
      <input
        ref={hiddenFileInputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handleQuickImportFile}
      />

      <ProfileHeader 
        profile={profile}
        viewMode={viewMode}
        onToggleViewMode={() => setViewMode(!viewMode)}
        onOpenImport={() => hiddenFileInputRef.current?.click()}
        onPreviewModal={() => setShowPreviewModal(true)}
      />

      {!viewMode && (
        <div className="mb-2">
          <ProfileTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onPreview={hasExistingData ? () => setViewMode(true) : undefined}
            counts={counts}
          />
        </div>
      )}

      <main>
        {viewMode ? (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 min-w-0">
              <ProfileView profile={profile} onEdit={handleEdit} />
            </div>
            
            {/* Sidebar */}
            <div className="w-full lg:w-[280px] xl:w-[300px] shrink-0">
              <ProfileSidebar 
                profile={profile} 
                onImport={handleLinkedInImport}
                onNavigateTab={handleEdit}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Form Area */}
            <div className="flex-1 min-w-0" key={`${activeTab}-${importVersion}`}>
              {renderActiveForm()}
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-[280px] xl:w-[300px] shrink-0">
              <ProfileSidebar 
                profile={profile} 
                onImport={handleLinkedInImport} 
                onNavigateTab={(tab) => setActiveTab(tab)}
              />
            </div>
          </div>
        )}
      </main>

      {showPreviewModal && (
        <ProfilePreviewModal
          profile={profile}
          onClose={() => setShowPreviewModal(false)}
          onSave={() => {
            setShowPreviewModal(false)
            toast.success('Master profile confirmed!')
          }}
          isLoading={false}
        />
      )}
    </>
  )
}
