'use client'

import { useState } from 'react'
import { 
  User, 
  Briefcase, 
  Wrench, 
  GraduationCap, 
  FolderOpen, 
  Award, 
  Pencil, 
  Mail, 
  Phone, 
  MapPin, 
  Link as LinkIcon, 
  Building2, 
  Calendar,
  CheckCircle2
} from 'lucide-react'
import { cn } from '@/utils/cn'
import { Button } from '@/components/ui/Button'

interface ResumeDetailsTabsProps {
  profile: any
  editingTab: string | null
  onEdit: (tab: string) => void
  onCancelEdit: () => void
  renderEditForm: () => React.ReactNode
}

type TabKey = 'personal' | 'employment' | 'skills' | 'education' | 'projects' | 'certifications'

export function ResumeDetailsTabs({
  profile,
  editingTab,
  onEdit,
  onCancelEdit,
  renderEditForm
}: ResumeDetailsTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('personal')

  const data = profile?.master_resume_data || {}
  const pi = data.personal_info || {}
  const fullName = [pi.firstName, pi.middleName, pi.lastName].filter(Boolean).join(' ') || profile?.full_name || ''
  const email = profile?.email || pi.email || ''
  const phone = profile?.phone || pi.phone || ''

  const employmentCount = data.employment?.length || 0
  const skillsCount = Array.isArray(data.skills) 
    ? (typeof data.skills[0] === 'object' && Array.isArray(data.skills[0]?.items)
        ? data.skills.reduce((acc: number, curr: any) => acc + (curr.items?.length || 0), 0)
        : data.skills.length)
    : 0
  const educationCount = data.education?.length || 0
  const projectsCount = data.projects?.length || 0
  const certificationsCount = data.certifications?.length || 0

  const tabs: { key: TabKey; label: string; icon: any; count?: number }[] = [
    { key: 'personal', label: 'Personal & Contact', icon: User },
    { key: 'employment', label: 'Work Experience', icon: Briefcase, count: employmentCount },
    { key: 'skills', label: 'Skills', icon: Wrench, count: skillsCount },
    { key: 'education', label: 'Education', icon: GraduationCap, count: educationCount },
    { key: 'projects', label: 'Projects', icon: FolderOpen, count: projectsCount },
    { key: 'certifications', label: 'Certifications', icon: Award, count: certificationsCount },
  ]

  // If a tab is being edited, sync the active tab view to that tab
  const currentTab = (editingTab as TabKey) || activeTab

  return (
    <div className="bg-white dark:bg-[#151D28] rounded-3xl border border-[#D8DEE7] dark:border-[#26313F] shadow-sm p-5 sm:p-7 relative overflow-hidden transition-all duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-5 border-b border-[#D8DEE7] dark:border-[#26313F]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0A6E4E] dark:bg-[#3FA57C]" />
            <h2 className="text-[17px] sm:text-[18px] font-bold text-[#16202E] dark:text-[#E4EAF2] tracking-tight">
              Resume Details & Master Profile
            </h2>
          </div>
          <p className="text-[12.5px] font-medium text-[#4B5768] dark:text-[#9FACBE] mt-0.5">
            Review and verify your master profile information before generating your tailored resume.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {editingTab ? (
            <Button variant="outline" size="sm" onClick={onCancelEdit} className="text-[12px] h-9 px-3.5 rounded-xl font-bold border-[#D8DEE7] dark:border-[#26313F] bg-[#F8FAFC] dark:bg-[#1A2330] text-[#16202E] dark:text-[#E4EAF2] hover:bg-[#EEF2F6] dark:hover:bg-[#222E3F] cursor-pointer">
              Cancel Edit
            </Button>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onEdit(currentTab)} 
              className="text-[12px] h-9 px-3.5 rounded-xl font-bold flex items-center gap-1.5 border-[#D8DEE7] dark:border-[#26313F] bg-[#F8FAFC] dark:bg-[#1A2330] text-[#16202E] dark:text-[#E4EAF2] hover:bg-[#EEF2F6] dark:hover:bg-[#222E3F] hover:border-[#0A6E4E]/40 dark:hover:border-[#3FA57C]/40 hover:text-[#0A6E4E] dark:hover:text-[#8FD3B6] cursor-pointer"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span>Edit {tabs.find(t => t.key === currentTab)?.label}</span>
            </Button>
          )}
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-5 scrollbar-none border-b border-[#D8DEE7] dark:border-[#26313F]">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = currentTab === tab.key
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => {
                if (editingTab) onCancelEdit()
                setActiveTab(tab.key)
              }}
              className={cn(
                "flex items-center gap-2 px-3.5 py-2 rounded-xl text-[12.5px] font-bold transition-all shrink-0 cursor-pointer select-none",
                isActive
                  ? "bg-[#0A6E4E] text-white shadow-xs"
                  : "bg-[#F8FAFC] dark:bg-[#1A2330] text-[#4B5768] dark:text-[#9FACBE] hover:bg-[#EEF2F6] dark:hover:bg-[#222E3F] hover:text-[#16202E] dark:hover:text-[#E4EAF2] border border-[#D8DEE7] dark:border-[#26313F]"
              )}
            >
              <Icon className={cn("w-3.5 h-3.5", isActive ? "text-white" : "text-[#64748B] dark:text-[#78859A]")} />
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && (
                <span className={cn(
                  "text-[10px] px-1.5 py-0.5 rounded-full font-black tabular-nums leading-none",
                  isActive ? "bg-white/20 text-white" : "bg-[#E2E8F0] dark:bg-[#26313F] text-[#4B5768] dark:text-[#9FACBE]"
                )}>
                  {tab.count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Tab Content or Edit Form */}
      {editingTab ? (
        <div className="animate-in fade-in duration-200 pt-1">
          {renderEditForm()}
        </div>
      ) : (
        <div className="animate-in fade-in duration-200">
          
          {/* 1. PERSONAL TAB */}
          {currentTab === 'personal' && (
            <div className="space-y-4">
              {!fullName && !email ? (
                <EmptyState 
                  title="No personal contact info provided yet" 
                  actionLabel="+ Add Personal Details" 
                  onAction={() => onEdit('personal')} 
                />
              ) : (
                <div className="space-y-3.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#1A2330] border border-[#D8DEE7] dark:border-[#26313F]">
                    <div>
                      <h4 className="text-[16px] font-bold text-[#16202E] dark:text-[#E4EAF2]">{fullName || 'Candidate Name'}</h4>
                      {pi.targetRole && (
                        <p className="text-[12.5px] font-bold text-[#0A6E4E] dark:text-[#8FD3B6] mt-0.5">{pi.targetRole}</p>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[12px]">
                      {email && (
                        <span className="inline-flex items-center gap-1.5 font-medium text-[#4B5768] dark:text-[#9FACBE] bg-white dark:bg-[#151D28] border border-[#D8DEE7] dark:border-[#26313F] px-2.5 py-1 rounded-lg">
                          <Mail className="w-3 h-3 text-[#64748B] dark:text-[#78859A]" /> {email}
                        </span>
                      )}
                      {phone && (
                        <span className="inline-flex items-center gap-1.5 font-medium text-[#4B5768] dark:text-[#9FACBE] bg-white dark:bg-[#151D28] border border-[#D8DEE7] dark:border-[#26313F] px-2.5 py-1 rounded-lg">
                          <Phone className="w-3 h-3 text-[#64748B] dark:text-[#78859A]" /> {phone}
                        </span>
                      )}
                      {pi.location && (
                        <span className="inline-flex items-center gap-1.5 font-medium text-[#4B5768] dark:text-[#9FACBE] bg-white dark:bg-[#151D28] border border-[#D8DEE7] dark:border-[#26313F] px-2.5 py-1 rounded-lg">
                          <MapPin className="w-3 h-3 text-[#64748B] dark:text-[#78859A]" /> {pi.location}
                        </span>
                      )}
                      {pi.linkedin && (
                        <a 
                          href={pi.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-medium text-[#0A6E4E] dark:text-[#8FD3B6] bg-[#E6F4EA] dark:bg-[#123227] border border-[#CEEAD6] dark:border-[#3FA57C]/40 px-2.5 py-1 rounded-lg hover:underline"
                        >
                          <LinkIcon className="w-3 h-3" /> LinkedIn Profile
                        </a>
                      )}
                    </div>
                  </div>

                  {pi.summary && (
                    <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#1A2330] border border-[#D8DEE7] dark:border-[#26313F]">
                      <span className="text-[11px] font-bold text-[#64748B] dark:text-[#78859A] uppercase tracking-wider block mb-1">
                        Professional Executive Summary
                      </span>
                      <p className="text-[13px] text-[#334155] dark:text-[#C3CCD9] leading-relaxed font-normal">
                        {pi.summary}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* 2. EMPLOYMENT TAB */}
          {currentTab === 'employment' && (
            <div>
              {!data.employment?.length ? (
                <EmptyState 
                  title="No employment history recorded yet" 
                  actionLabel="+ Add Work Experience" 
                  onAction={() => onEdit('employment')} 
                />
              ) : (
                <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
                  {data.employment.map((job: any, i: number) => (
                    <div key={i} className="p-4 rounded-xl bg-[#1A2330] border border-[#26313F] hover:bg-[#1E2938] transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1.5 mb-2">
                        <div>
                          <h4 className="text-[14.5px] font-bold text-[#E4EAF2] leading-tight">
                            {job.title || 'Role Title'}
                          </h4>
                          <p className="text-[12.5px] font-bold text-[#8FD3B6] mt-0.5 flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-[#3FA57C]" />
                            {job.company || 'Company Name'}
                            {job.location && <span className="text-[#78859A] font-normal">• {job.location}</span>}
                          </p>
                        </div>
                        <span className="text-[11px] font-bold text-[#9FACBE] bg-[#151D28] border border-[#26313F] px-2.5 py-1 rounded-lg inline-flex items-center gap-1.5 shrink-0 self-start">
                          <Calendar className="w-3 h-3 text-[#78859A]" />
                          {job.startDate || '-'} - {job.current ? <strong className="text-[#8FD3B6] font-bold">Present</strong> : (job.endDate || '-')}
                        </span>
                      </div>
                      {job.responsibilities && (
                        <p className="text-[12.5px] text-[#C3CCD9] leading-relaxed line-clamp-3 whitespace-pre-line bg-[#151D28] p-2.5 rounded-lg border border-[#26313F]">
                          {job.responsibilities}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 3. SKILLS TAB */}
          {currentTab === 'skills' && (
            <div>
              {!skillsCount ? (
                <EmptyState 
                  title="No skills recorded yet" 
                  actionLabel="+ Add Technical Skills" 
                  onAction={() => onEdit('skills')} 
                />
              ) : (
                <div className="p-4 rounded-xl bg-[#1A2330] border border-[#26313F] space-y-4 max-h-[380px] overflow-y-auto">
                  {Array.isArray(data.skills) && typeof data.skills[0] === 'object' && Array.isArray(data.skills[0].items) ? (
                    data.skills.map((cat: any, i: number) => (
                      <div key={i} className={i > 0 ? 'pt-3 border-t border-[#26313F]' : ''}>
                        <h5 className="text-[11px] font-bold text-[#78859A] uppercase tracking-wider mb-2">
                          {cat.category || 'Skill Group'}
                        </h5>
                        <div className="flex flex-wrap gap-1.5">
                          {cat.items?.map((item: string, j: number) => (
                            <span key={j} className="text-[12px] font-semibold bg-[#151D28] text-[#8FD3B6] border border-[#26313F] px-2.5 py-1 rounded-lg shadow-2xs">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {data.skills.map((skill: any, i: number) => {
                        const label = typeof skill === 'string' ? skill : (skill?.name || skill?.skill || '')
                        if (!label) return null
                        return (
                          <span key={i} className="text-[12px] font-semibold bg-[#151D28] text-[#8FD3B6] border border-[#26313F] px-2.5 py-1 rounded-lg shadow-2xs">
                            {label}
                          </span>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* 4. EDUCATION TAB */}
          {currentTab === 'education' && (
            <div>
              {!data.education?.length ? (
                <EmptyState 
                  title="No academic credentials recorded" 
                  actionLabel="+ Add Education" 
                  onAction={() => onEdit('education')} 
                />
              ) : (
                <div className="space-y-3 max-h-[380px] overflow-y-auto">
                  {data.education.map((edu: any, i: number) => (
                    <div key={i} className="p-4 rounded-xl bg-[#1A2330] border border-[#26313F] flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <h4 className="text-[14.5px] font-bold text-[#E4EAF2] leading-tight">
                          {edu.degree || 'Degree Program'}
                        </h4>
                        <p className="text-[12.5px] font-bold text-[#8FD3B6] mt-0.5">
                          {edu.institution || 'University / Institution'}
                        </p>
                        {edu.description && (
                          <p className="text-[12px] text-[#C3CCD9] mt-1.5 leading-relaxed">{edu.description}</p>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[11px] font-bold text-[#9FACBE] bg-[#151D28] border border-[#26313F] px-2.5 py-1 rounded-lg">
                          {edu.startDate || '-'} - {edu.endDate || '-'}
                        </span>
                        {edu.grade && (
                          <div className="text-[11px] text-[#78859A] font-medium mt-1">
                            GPA: <strong className="text-[#E4EAF2] font-bold">{edu.grade}</strong>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 5. PROJECTS TAB */}
          {currentTab === 'projects' && (
            <div>
              {!data.projects?.length ? (
                <EmptyState 
                  title="No project portfolios recorded" 
                  actionLabel="+ Add Project" 
                  onAction={() => onEdit('projects')} 
                />
              ) : (
                <div className="space-y-3 max-h-[380px] overflow-y-auto">
                  {data.projects.map((proj: any, i: number) => (
                    <div key={i} className="p-4 rounded-xl bg-[#1A2330] border border-[#26313F]">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 mb-1">
                        <div>
                          <h4 className="text-[14px] font-bold text-[#E4EAF2]">{proj.name}</h4>
                          {proj.role && <p className="text-[12px] font-bold text-[#8FD3B6]">{proj.role}</p>}
                        </div>
                        {proj.link && (
                          <a 
                            href={proj.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-[11.5px] font-bold text-[#3FA57C] hover:underline"
                          >
                            Project Link ↗
                          </a>
                        )}
                      </div>
                      {proj.description && (
                        <p className="text-[12px] text-[#C3CCD9] leading-relaxed mt-1">{proj.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 6. CERTIFICATIONS TAB */}
          {currentTab === 'certifications' && (
            <div>
              {!data.certifications?.length ? (
                <EmptyState 
                  title="No certifications listed" 
                  actionLabel="+ Add Certification" 
                  onAction={() => onEdit('certifications')} 
                />
              ) : (
                <div className="space-y-3 max-h-[380px] overflow-y-auto">
                  {data.certifications.map((cert: any, i: number) => (
                    <div key={i} className="p-4 rounded-xl bg-[#1A2330] border border-[#26313F] flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-[14px] font-bold text-[#E4EAF2]">{cert.name}</h4>
                        {cert.organization && <p className="text-[12px] font-medium text-[#9FACBE] mt-0.5">{cert.organization}</p>}
                        {cert.credentialUrl && (
                          <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-[11.5px] font-bold text-[#3FA57C] hover:underline mt-1 inline-block">
                            Verify Credential ↗
                          </a>
                        )}
                      </div>
                      {(cert.issueDate || cert.expiryDate) && (
                        <span className="text-[11px] font-semibold text-[#9FACBE] bg-[#151D28] border border-[#26313F] px-2 py-0.5 rounded-md">
                          {cert.issueDate || '-'}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      )}

    </div>
  )
}

function EmptyState({ title, actionLabel, onAction }: { title: string; actionLabel: string; onAction: () => void }) {
  return (
    <div className="text-center py-7 px-4 bg-[#1A2330]/50 rounded-xl border border-dashed border-[#26313F]">
      <p className="text-[13px] text-[#78859A] font-medium mb-2.5">{title}</p>
      <button
        type="button"
        onClick={onAction}
        className="text-[12.5px] font-bold text-[#8FD3B6] hover:text-white bg-[#123227] border border-[#3FA57C]/40 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
      >
        {actionLabel}
      </button>
    </div>
  )
}
