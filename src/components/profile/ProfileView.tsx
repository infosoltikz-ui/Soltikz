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
} from 'lucide-react'
import { cn } from '@/utils/cn'

interface ProfileViewProps {
  profile: any
  onEdit?: (tab: string) => void
  hideBanner?: boolean
}

function SectionHeader({
  icon,
  title,
  tab,
  onEdit,
  count,
}: {
  icon: React.ReactNode
  title: string
  tab: string
  onEdit?: (tab: string) => void
  count?: number
}) {
  return (
    <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#EEF4FA] border border-[#0F2744]/10 text-[#0F2744] flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div className="flex items-center gap-2">
          <h3 className="text-[15.5px] font-extrabold text-slate-900 tracking-tight">
            {title}
          </h3>
          {typeof count === 'number' && count > 0 && (
            <span className="text-[11px] font-extrabold text-[#0F2744] bg-[#EEF4FA] border border-[#0F2744]/10 px-2 py-0.5 rounded-md tabular-nums">
              {count}
            </span>
          )}
        </div>
      </div>

      {onEdit && (
        <button
          onClick={() => onEdit(tab)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F2744] hover:text-white bg-[#EEF4FA] hover:bg-[#0F2744] border border-[#0F2744]/15 px-3 py-1.5 rounded-xl transition-all cursor-pointer shadow-2xs"
        >
          <Pencil className="w-3 h-3" />
          <span>Edit</span>
        </button>
      )}
    </div>
  )
}

function EmptyState({
  text,
  tab,
  onEdit,
}: {
  text: string
  tab?: string
  onEdit?: (tab: string) => void
}) {
  return (
    <div className="text-center py-7 px-4 bg-slate-50/70 rounded-2xl border border-dashed border-slate-200/90">
      <p className="text-xs text-slate-500 font-medium mb-2.5">{text}</p>
      {tab && onEdit && (
        <button
          onClick={() => onEdit(tab)}
          className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#0F2744] hover:text-amber-700 bg-white border border-slate-200 hover:border-[#0F2744]/25 px-3.5 py-1.5 rounded-xl shadow-2xs transition-all cursor-pointer"
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
  const fullName =
    [pi.firstName, pi.middleName, pi.lastName].filter(Boolean).join(' ') ||
    profile?.full_name ||
    ''
  const email = profile?.email || pi.email || ''
  const phone = profile?.phone || pi.phone || ''

  return (
    <div className="space-y-5">
      {/* Sync Banner */}
      {!hideBanner && (
        <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl px-4 py-3.5 flex items-center gap-3 shadow-2xs">
          <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="text-xs sm:text-[13px] leading-relaxed">
            <span className="font-extrabold text-emerald-950">Master Career Record Synchronized. </span>
            <span className="text-emerald-800 font-medium">
              All AI-generated resumes will pull strictly from these verified details.
            </span>
          </div>
        </div>
      )}

      {/* 1. PERSONAL INFORMATION */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 hover:border-slate-300 transition-colors">
        <SectionHeader
          icon={<Mail className="w-4 h-4" strokeWidth={2.2} />}
          title="Personal & Contact Information"
          tab="personal"
          onEdit={onEdit}
        />

        {!fullName && !email ? (
          <EmptyState
            text="No personal contact information provided yet."
            tab="personal"
            onEdit={onEdit}
          />
        ) : (
          <div className="space-y-4">
            <div>
              {fullName && (
                <h4 className="text-xl font-black text-slate-900 tracking-tight mb-2.5">
                  {fullName}
                </h4>
              )}

              <div className="flex flex-wrap items-center gap-2 text-xs">
                {email && (
                  <span className="inline-flex items-center gap-1.5 font-semibold text-slate-700 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-xl">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    {email}
                  </span>
                )}
                {phone && (
                  <span className="inline-flex items-center gap-1.5 font-semibold text-slate-700 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-xl">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    {phone}
                  </span>
                )}
                {pi.location && (
                  <span className="inline-flex items-center gap-1.5 font-semibold text-slate-700 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-xl">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {pi.location}
                  </span>
                )}
                {pi.linkedin && (
                  <a
                    href={pi.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-bold text-[#0F2744] hover:text-amber-700 bg-[#EEF4FA] border border-[#0F2744]/15 px-3 py-1.5 rounded-xl transition-colors"
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span>LinkedIn Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            {pi.summary && (
              <div className="pt-4 border-t border-slate-100">
                <span className="text-[10.5px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2">
                  Professional Executive Summary
                </span>
                <p className="text-[13px] text-slate-700 leading-relaxed font-normal bg-slate-50/70 p-4 rounded-xl border border-slate-200/60">
                  {pi.summary}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 2. EMPLOYMENT HISTORY */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 hover:border-slate-300 transition-colors">
        <SectionHeader
          icon={<Briefcase className="w-4 h-4" strokeWidth={2.2} />}
          title="Employment & Career History"
          tab="employment"
          onEdit={onEdit}
          count={data.employment?.length}
        />

        {!data.employment?.length ? (
          <EmptyState
            text="No employment history recorded yet."
            tab="employment"
            onEdit={onEdit}
          />
        ) : (
          <div className="relative pl-5 space-y-6 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {data.employment.map((job: any, i: number) => (
              <div key={i} className="relative pl-4">
                <div
                  className={cn(
                    'absolute -left-[22px] top-1.5 w-3 h-3 rounded-full border-2 border-white ring-2',
                    job.current
                      ? 'bg-emerald-600 ring-emerald-100'
                      : 'bg-[#0F2744] ring-slate-100'
                  )}
                />

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                  <div>
                    <h4 className="text-[15px] font-extrabold text-slate-900 leading-tight">
                      {job.title || 'Role Title'}
                    </h4>
                    <p className="text-xs font-bold text-[#0F2744] mt-1 flex items-center gap-1.5 flex-wrap">
                      <Building2 className="w-3.5 h-3.5 text-[#F59E0B]" />
                      <span>{job.company || 'Company Name'}</span>
                      {job.location && (
                        <span className="text-slate-400 font-medium">· {job.location}</span>
                      )}
                    </p>
                  </div>

                  <div className="shrink-0">
                    <span className="text-[11px] font-bold text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg inline-flex items-center gap-1.5 tabular-nums">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {job.startDate || '-'} to{' '}
                      {job.current ? (
                        <strong className="text-emerald-700 font-extrabold">Present</strong>
                      ) : (
                        job.endDate || '-'
                      )}
                    </span>
                  </div>
                </div>

                {job.responsibilities && (
                  <p className="text-[13px] text-slate-600 leading-relaxed mt-2 whitespace-pre-line bg-slate-50/50 p-3.5 rounded-xl border border-slate-100">
                    {job.responsibilities}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. EDUCATION */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 hover:border-slate-300 transition-colors">
        <SectionHeader
          icon={<GraduationCap className="w-4 h-4" strokeWidth={2.2} />}
          title="Education & Academic Credentials"
          tab="education"
          onEdit={onEdit}
          count={data.education?.length}
        />

        {!data.education?.length ? (
          <EmptyState
            text="No academic credentials recorded."
            tab="education"
            onEdit={onEdit}
          />
        ) : (
          <div className="divide-y divide-slate-100 space-y-4">
            {data.education.map((edu: any, i: number) => (
              <div key={i} className={i > 0 ? 'pt-4' : ''}>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <h4 className="text-[14.5px] font-extrabold text-slate-900 leading-tight">
                      {edu.degree || 'Degree Program'}
                    </h4>
                    <p className="text-xs font-bold text-[#0F2744] mt-1">
                      {edu.institution || 'University / Institution'}
                    </p>
                  </div>
                  <div className="sm:text-right shrink-0">
                    <span className="text-[11px] font-bold text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg tabular-nums inline-block">
                      {edu.startDate || '-'} - {edu.endDate || '-'}
                    </span>
                    {edu.grade && (
                      <div className="text-[11px] text-slate-500 font-semibold mt-1">
                        GPA / Grade: <strong className="text-slate-900">{edu.grade}</strong>
                      </div>
                    )}
                  </div>
                </div>
                {edu.description && (
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. TECHNICAL SKILLS */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 hover:border-slate-300 transition-colors">
        <SectionHeader
          icon={<Wrench className="w-4 h-4" strokeWidth={2.2} />}
          title="Technical Skills & Competencies"
          tab="skills"
          onEdit={onEdit}
          count={data.skills?.length}
        />

        {!data.skills?.length ? (
          <EmptyState text="No skills recorded yet." tab="skills" onEdit={onEdit} />
        ) : (
          <div className="space-y-4">
            {Array.isArray(data.skills) &&
            typeof data.skills[0] === 'object' &&
            Array.isArray(data.skills[0].items) ? (
              data.skills.map((cat: any, i: number) => (
                <div key={i} className={i > 0 ? 'pt-3.5 border-t border-slate-100' : ''}>
                  <h5 className="text-[10.5px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">
                    {cat.category || 'Skill Group'}
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items?.map((item: string, j: number) => (
                      <span
                        key={j}
                        className="text-xs font-bold bg-[#EEF4FA] text-[#0F2744] border border-[#0F2744]/10 px-3 py-1 rounded-lg"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {data.skills.map((skill: any, i: number) => {
                  const label =
                    typeof skill === 'string' ? skill : skill?.name || skill?.skill || ''
                  if (!label) return null
                  return (
                    <span
                      key={i}
                      className="text-xs font-bold bg-[#EEF4FA] text-[#0F2744] border border-[#0F2744]/10 px-3 py-1 rounded-lg"
                    >
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
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 hover:border-slate-300 transition-colors">
        <SectionHeader
          icon={<FolderOpen className="w-4 h-4" strokeWidth={2.2} />}
          title="Key Projects & Portfolios"
          tab="projects"
          onEdit={onEdit}
          count={data.projects?.length}
        />

        {!data.projects?.length ? (
          <EmptyState
            text="No project portfolios recorded."
            tab="projects"
            onEdit={onEdit}
          />
        ) : (
          <div className="divide-y divide-slate-100 space-y-4">
            {data.projects.map((proj: any, i: number) => (
              <div key={i} className={i > 0 ? 'pt-4' : ''}>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-1.5">
                  <div>
                    <h4 className="text-[14.5px] font-extrabold text-slate-900 leading-tight">
                      {proj.name}
                    </h4>
                    {proj.role && (
                      <p className="text-xs font-bold text-[#0F2744] mt-0.5">{proj.role}</p>
                    )}
                  </div>
                  <div className="sm:text-right shrink-0 flex flex-wrap sm:flex-col items-center sm:items-end gap-1.5">
                    {(proj.startDate || proj.endDate) && (
                      <span className="text-[11px] font-bold text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-0.5 rounded-lg tabular-nums">
                        {proj.startDate || '-'} - {proj.endDate || '-'}
                      </span>
                    )}
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-[#0F2744] hover:text-amber-700 font-bold"
                      >
                        <span>Project Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
                {proj.description && (
                  <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 6. CERTIFICATIONS */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 hover:border-slate-300 transition-colors">
        <SectionHeader
          icon={<Award className="w-4 h-4" strokeWidth={2.2} />}
          title="Licenses & Professional Certifications"
          tab="certifications"
          onEdit={onEdit}
          count={data.certifications?.length}
        />

        {!data.certifications?.length ? (
          <EmptyState
            text="No certifications listed."
            tab="certifications"
            onEdit={onEdit}
          />
        ) : (
          <div className="divide-y divide-slate-100 space-y-3">
            {data.certifications.map((cert: any, i: number) => (
              <div
                key={i}
                className={`flex items-start justify-between gap-4 ${i > 0 ? 'pt-3' : ''}`}
              >
                <div>
                  <h4 className="text-[14px] font-extrabold text-slate-900">{cert.name}</h4>
                  {cert.organization && (
                    <p className="text-xs font-semibold text-slate-600 mt-0.5">
                      {cert.organization}
                    </p>
                  )}
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#0F2744] hover:text-amber-700 font-bold mt-1.5"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <div className="text-right shrink-0 text-[11px] text-slate-500 font-semibold tabular-nums">
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
