'use client'

import { 
  Pencil, 
  MapPin, 
  Phone, 
  Mail, 
  Link as LinkIcon, 
  Briefcase, 
  GraduationCap, 
  FolderOpen, 
  Award, 
  Wrench, 
  CheckCircle2, 
  Building2, 
  Calendar,
  ExternalLink,
  ShieldCheck
} from 'lucide-react'

interface ProfileViewProps {
  profile: any
  onEdit?: (tab: string) => void
  hideBanner?: boolean
}

function SectionHeader({ 
  icon, 
  title, 
  tab, 
  onEdit 
}: { 
  icon: React.ReactNode; 
  title: string; 
  tab: string; 
  onEdit?: (tab: string) => void 
}) {
  return (
    <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-slate-200/80">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <h3 className="text-[15px] font-bold text-slate-900 tracking-tight">
          {title}
        </h3>
      </div>
      {onEdit && (
        <button
          onClick={() => onEdit(tab)}
          className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 px-2.5 py-1 rounded-md transition-colors cursor-pointer shadow-2xs"
        >
          <Pencil className="w-3 h-3 text-slate-500" />
          Edit
        </button>
      )}
    </div>
  )
}

function EmptyState({ text, tab, onEdit }: { text: string; tab?: string; onEdit?: (tab: string) => void }) {
  return (
    <div className="text-center py-6 px-4 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
      <p className="text-[13px] text-slate-400 font-medium mb-2">{text}</p>
      {tab && onEdit && (
        <button
          onClick={() => onEdit(tab)}
          className="text-[12px] font-bold text-primary hover:underline"
        >
          + Add Information
        </button>
      )}
    </div>
  )
}

export function ProfileView({ profile, onEdit, hideBanner }: ProfileViewProps) {
  const data = profile?.master_resume_data || {}
  const pi = data.personal_info || {}
  const fullName = [pi.firstName, pi.middleName, pi.lastName].filter(Boolean).join(' ') || profile?.full_name || ''
  const email = profile?.email || pi.email || ''
  const phone = profile?.phone || pi.phone || ''

  return (
    <div className="space-y-6">

      {/* Success Notification Banner */}
      {!hideBanner && (
        <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl px-4 py-3 flex items-center gap-3 shadow-2xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <div className="text-[12.5px]">
            <span className="font-bold text-emerald-950">Master Career Record Synchronized. </span>
            <span className="text-emerald-800 font-medium">All AI-generated resumes will draw from this centralized data repository.</span>
          </div>
        </div>
      )}

      {/* 1. PERSONAL INFORMATION */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:border-slate-300 transition-colors">
        <SectionHeader 
          icon={<Mail className="w-4 h-4 text-slate-600" strokeWidth={2} />} 
          title="Personal & Contact Information" 
          tab="personal" 
          onEdit={onEdit} 
        />

        {!fullName && !email ? (
          <EmptyState text="No personal contact information provided yet." tab="personal" onEdit={onEdit} />
        ) : (
          <div className="space-y-4">
            <div>
              {fullName && (
                <h4 className="text-[18px] font-bold text-slate-900 tracking-tight mb-2">
                  {fullName}
                </h4>
              )}
              <div className="flex flex-wrap items-center gap-2 text-[12px]">
                {email && (
                  <span className="inline-flex items-center gap-1.5 font-medium text-slate-700 bg-slate-100 border border-slate-200/80 px-2.5 py-1 rounded-md">
                    <Mail className="w-3 h-3 text-slate-500" /> {email}
                  </span>
                )}
                {phone && (
                  <span className="inline-flex items-center gap-1.5 font-medium text-slate-700 bg-slate-100 border border-slate-200/80 px-2.5 py-1 rounded-md">
                    <Phone className="w-3 h-3 text-slate-500" /> {phone}
                  </span>
                )}
                {pi.location && (
                  <span className="inline-flex items-center gap-1.5 font-medium text-slate-700 bg-slate-100 border border-slate-200/80 px-2.5 py-1 rounded-md">
                    <MapPin className="w-3 h-3 text-slate-500" /> {pi.location}
                  </span>
                )}
                {pi.linkedin && (
                  <a 
                    href={pi.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-primary hover:text-primary-dark bg-primary/5 border border-primary/20 px-2.5 py-1 rounded-md transition-colors"
                  >
                    <LinkIcon className="w-3 h-3" /> LinkedIn Profile
                  </a>
                )}
              </div>
            </div>

            {/* Executive Summary */}
            {pi.summary && (
              <div className="pt-3 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Professional Executive Summary
                </span>
                <p className="text-[13px] text-slate-700 leading-relaxed font-normal bg-slate-50/60 p-3.5 rounded-xl border border-slate-100">
                  {pi.summary}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 2. EMPLOYMENT HISTORY */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:border-slate-300 transition-colors">
        <SectionHeader 
          icon={<Briefcase className="w-4 h-4 text-slate-600" strokeWidth={2} />} 
          title="Employment & Career History" 
          tab="employment" 
          onEdit={onEdit} 
        />

        {!data.employment?.length ? (
          <EmptyState text="No employment history recorded yet." tab="employment" onEdit={onEdit} />
        ) : (
          <div className="relative pl-4 space-y-6 before:absolute before:left-1 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {data.employment.map((job: any, i: number) => (
              <div key={i} className="relative pl-4">
                {/* Timeline node dot */}
                <div className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-slate-900 border-2 border-white ring-2 ring-slate-100" />

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-1.5">
                  <div>
                    <h4 className="text-[14.5px] font-bold text-slate-900 leading-tight">
                      {job.title || 'Role Title'}
                    </h4>
                    <p className="text-[12.5px] font-semibold text-primary mt-0.5 flex items-center gap-1.5">
                      <Building2 className="w-3 h-3" />
                      {job.company || 'Company Name'}
                      {job.location && <span className="text-slate-400 font-normal">• {job.location}</span>}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {job.startDate || '—'} — {job.current ? <strong className="text-emerald-700 font-bold">Present</strong> : (job.endDate || '—')}
                    </span>
                  </div>
                </div>

                {job.responsibilities && (
                  <p className="text-[13px] text-slate-600 leading-relaxed mt-2 whitespace-pre-line">
                    {job.responsibilities}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. EDUCATION */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:border-slate-300 transition-colors">
        <SectionHeader 
          icon={<GraduationCap className="w-4 h-4 text-slate-600" strokeWidth={2} />} 
          title="Education & Academic Credentials" 
          tab="education" 
          onEdit={onEdit} 
        />

        {!data.education?.length ? (
          <EmptyState text="No academic credentials recorded." tab="education" onEdit={onEdit} />
        ) : (
          <div className="divide-y divide-slate-100 space-y-4">
            {data.education.map((edu: any, i: number) => (
              <div key={i} className={i > 0 ? 'pt-4' : ''}>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <h4 className="text-[14.5px] font-bold text-slate-900 leading-tight">
                      {edu.degree || 'Degree Program'}
                    </h4>
                    <p className="text-[12.5px] font-semibold text-primary mt-0.5">
                      {edu.institution || 'University / Institution'}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
                      {edu.startDate || '—'} — {edu.endDate || '—'}
                    </span>
                    {edu.grade && (
                      <div className="text-[11px] text-slate-500 font-medium mt-1">
                        GPA / Grade: <strong className="text-slate-700">{edu.grade}</strong>
                      </div>
                    )}
                  </div>
                </div>
                {edu.description && (
                  <p className="text-[12.5px] text-slate-600 leading-relaxed mt-2">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. TECHNICAL SKILLS */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:border-slate-300 transition-colors">
        <SectionHeader 
          icon={<Wrench className="w-4 h-4 text-slate-600" strokeWidth={2} />} 
          title="Technical Skills & Competencies" 
          tab="skills" 
          onEdit={onEdit} 
        />

        {!data.skills?.length ? (
          <EmptyState text="No skills recorded yet." tab="skills" onEdit={onEdit} />
        ) : (
          <div className="space-y-4">
            {Array.isArray(data.skills) && typeof data.skills[0] === 'object' && Array.isArray(data.skills[0].items) ? (
              data.skills.map((cat: any, i: number) => (
                <div key={i} className={i > 0 ? 'pt-3 border-t border-slate-100' : ''}>
                  <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    {cat.category || 'Skill Group'}
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items?.map((item: string, j: number) => (
                      <span key={j} className="text-[12px] font-semibold bg-slate-50 text-slate-800 border border-slate-200/90 px-2.5 py-0.5 rounded-md">
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
                    <span key={i} className="text-[12px] font-semibold bg-slate-50 text-slate-800 border border-slate-200/90 px-2.5 py-0.5 rounded-md">
                      {label}
                    </span>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 5. PROJECTS */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:border-slate-300 transition-colors">
        <SectionHeader 
          icon={<FolderOpen className="w-4 h-4 text-slate-600" strokeWidth={2} />} 
          title="Key Projects & Portfolios" 
          tab="projects" 
          onEdit={onEdit} 
        />

        {!data.projects?.length ? (
          <EmptyState text="No project portfolios recorded." tab="projects" onEdit={onEdit} />
        ) : (
          <div className="divide-y divide-slate-100 space-y-4">
            {data.projects.map((proj: any, i: number) => (
              <div key={i} className={i > 0 ? 'pt-4' : ''}>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-1">
                  <div>
                    <h4 className="text-[14.5px] font-bold text-slate-900 leading-tight">
                      {proj.name}
                    </h4>
                    {proj.role && (
                      <p className="text-[12.5px] font-semibold text-primary mt-0.5">{proj.role}</p>
                    )}
                  </div>
                  <div className="text-right shrink-0 space-y-1">
                    {(proj.startDate || proj.endDate) && (
                      <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
                        {proj.startDate || '—'} — {proj.endDate || '—'}
                      </span>
                    )}
                    {proj.link && (
                      <a 
                        href={proj.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[12px] text-primary hover:underline font-semibold block text-right"
                      >
                        Project Link ↗
                      </a>
                    )}
                  </div>
                </div>
                {proj.description && (
                  <p className="text-[12.5px] text-slate-600 leading-relaxed mt-1.5">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 6. CERTIFICATIONS */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:border-slate-300 transition-colors">
        <SectionHeader 
          icon={<Award className="w-4 h-4 text-slate-600" strokeWidth={2} />} 
          title="Licenses & Professional Certifications" 
          tab="certifications" 
          onEdit={onEdit} 
        />

        {!data.certifications?.length ? (
          <EmptyState text="No certifications listed." tab="certifications" onEdit={onEdit} />
        ) : (
          <div className="divide-y divide-slate-100 space-y-3">
            {data.certifications.map((cert: any, i: number) => (
              <div key={i} className={`flex items-start justify-between gap-4 ${i > 0 ? 'pt-3' : ''}`}>
                <div>
                  <h4 className="text-[14px] font-bold text-slate-900">{cert.name}</h4>
                  {cert.organization && (
                    <p className="text-[12px] font-medium text-slate-600 mt-0.5">{cert.organization}</p>
                  )}
                  {cert.credentialUrl && (
                    <a 
                      href={cert.credentialUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[12px] text-primary hover:underline font-semibold mt-1 inline-block"
                    >
                      Verify Credential ↗
                    </a>
                  )}
                </div>
                <div className="text-right shrink-0 text-[11px] text-slate-500 font-medium">
                  {cert.issueDate && <div>Issued: {cert.issueDate}</div>}
                  {cert.expiryDate && <div>Expires: {cert.expiryDate}</div>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}
