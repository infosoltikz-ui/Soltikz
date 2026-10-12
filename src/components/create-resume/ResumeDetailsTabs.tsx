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
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-7 relative overflow-hidden transition-all duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-[17px] sm:text-[18px] font-black text-slate-900 tracking-tight">
              Resume Details & Master Profile
            </h2>
          </div>
          <p className="text-[12.5px] font-medium text-slate-500 mt-0.5">
            Review and verify your master profile information before generating your tailored resume.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {editingTab ? (
            <Button variant="outline" size="sm" onClick={onCancelEdit} className="text-[12px] h-8.5 font-bold">
              Cancel Edit
            </Button>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onEdit(currentTab)} 
              className="text-[12px] h-8.5 font-bold flex items-center gap-1.5 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50/50"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span>Edit {tabs.find(t => t.key === currentTab)?.label}</span>
            </Button>
          )}
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-5 scrollbar-none border-b border-slate-100">
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
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/70"
              )}
            >
              <Icon className={cn("w-3.5 h-3.5", isActive ? "text-emerald-400" : "text-slate-500")} />
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && (
                <span className={cn(
                  "text-[10px] px-1.5 py-0.2 rounded-full font-black",
                  isActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
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
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-xl bg-slate-50/70 border border-slate-200/70">
                    <div>
                      <h4 className="text-[16px] font-black text-slate-900">{fullName || 'Candidate Name'}</h4>
                      {pi.targetRole && (
                        <p className="text-[12.5px] font-bold text-emerald-700 mt-0.5">{pi.targetRole}</p>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[12px]">
                      {email && (
                        <span className="inline-flex items-center gap-1.5 font-medium text-slate-700 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                          <Mail className="w-3 h-3 text-slate-400" /> {email}
                        </span>
                      )}
                      {phone && (
                        <span className="inline-flex items-center gap-1.5 font-medium text-slate-700 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                          <Phone className="w-3 h-3 text-slate-400" /> {phone}
                        </span>
                      )}
                      {pi.location && (
                        <span className="inline-flex items-center gap-1.5 font-medium text-slate-700 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                          <MapPin className="w-3 h-3 text-slate-400" /> {pi.location}
                        </span>
                      )}
                      {pi.linkedin && (
                        <a 
                          href={pi.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg hover:underline"
                        >
                          <LinkIcon className="w-3 h-3" /> LinkedIn Profile
                        </a>
                      )}
                    </div>
                  </div>

                  {pi.summary && (
                    <div className="p-4 rounded-xl bg-white border border-slate-200/80">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Professional Executive Summary
                      </span>
                      <p className="text-[13px] text-slate-700 leading-relaxed font-normal">
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
                    <div key={i} className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/70 hover:bg-slate-50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1.5 mb-2">
                        <div>
                          <h4 className="text-[14.5px] font-black text-slate-900 leading-tight">
                            {job.title || 'Role Title'}
                          </h4>
                          <p className="text-[12.5px] font-bold text-emerald-700 mt-0.5 flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                            {job.company || 'Company Name'}
                            {job.location && <span className="text-slate-400 font-normal">• {job.location}</span>}
                          </p>
                        </div>
                        <span className="text-[11px] font-bold text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-lg inline-flex items-center gap-1.5 shrink-0 self-start">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {job.startDate || '—'} — {job.current ? <strong className="text-emerald-700 font-black">Present</strong> : (job.endDate || '—')}
                        </span>
                      </div>
                      {job.responsibilities && (
                        <p className="text-[12.5px] text-slate-600 leading-relaxed line-clamp-3 whitespace-pre-line bg-white p-2.5 rounded-lg border border-slate-100">
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
                <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/70 space-y-4 max-h-[380px] overflow-y-auto">
                  {Array.isArray(data.skills) && typeof data.skills[0] === 'object' && Array.isArray(data.skills[0].items) ? (
                    data.skills.map((cat: any, i: number) => (
                      <div key={i} className={i > 0 ? 'pt-3 border-t border-slate-200/60' : ''}>
                        <h5 className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-2">
                          {cat.category || 'Skill Group'}
                        </h5>
                        <div className="flex flex-wrap gap-1.5">
                          {cat.items?.map((item: string, j: number) => (
                            <span key={j} className="text-[12px] font-semibold bg-white text-slate-800 border border-slate-200 px-2.5 py-1 rounded-lg shadow-2xs">
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
                          <span key={i} className="text-[12px] font-semibold bg-white text-slate-800 border border-slate-200 px-2.5 py-1 rounded-lg shadow-2xs">
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
                    <div key={i} className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/70 flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <h4 className="text-[14.5px] font-black text-slate-900 leading-tight">
                          {edu.degree || 'Degree Program'}
                        </h4>
                        <p className="text-[12.5px] font-bold text-emerald-700 mt-0.5">
                          {edu.institution || 'University / Institution'}
                        </p>
                        {edu.description && (
                          <p className="text-[12px] text-slate-600 mt-1.5 leading-relaxed">{edu.description}</p>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[11px] font-bold text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                          {edu.startDate || '—'} — {edu.endDate || '—'}
                        </span>
                        {edu.grade && (
                          <div className="text-[11px] text-slate-500 font-medium mt-1">
                            GPA: <strong className="text-slate-800 font-bold">{edu.grade}</strong>
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
                    <div key={i} className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/70">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 mb-1">
                        <div>
                          <h4 className="text-[14px] font-black text-slate-900">{proj.name}</h4>
                          {proj.role && <p className="text-[12px] font-bold text-emerald-700">{proj.role}</p>}
                        </div>
                        {proj.link && (
                          <a 
                            href={proj.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-[11.5px] font-bold text-emerald-700 hover:underline"
                          >
                            Project Link ↗
                          </a>
                        )}
                      </div>
                      {proj.description && (
                        <p className="text-[12px] text-slate-600 leading-relaxed mt-1">{proj.description}</p>
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
                    <div key={i} className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/70 flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-[14px] font-black text-slate-900">{cert.name}</h4>
                        {cert.organization && <p className="text-[12px] font-medium text-slate-600 mt-0.5">{cert.organization}</p>}
                        {cert.credentialUrl && (
                          <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-[11.5px] font-bold text-emerald-700 hover:underline mt-1 inline-block">
                            Verify Credential ↗
                          </a>
                        )}
                      </div>
                      {(cert.issueDate || cert.expiryDate) && (
                        <span className="text-[11px] font-semibold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                          {cert.issueDate || '—'}
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
    <div className="text-center py-7 px-4 bg-slate-50/70 rounded-xl border border-dashed border-slate-200">
      <p className="text-[13px] text-slate-500 font-medium mb-2.5">{title}</p>
      <button
        type="button"
        onClick={onAction}
        className="text-[12.5px] font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
      >
        {actionLabel}
      </button>
    </div>
  )
}
