'use client'

import {
  X,
  CheckCircle2,
  User,
  Briefcase,
  GraduationCap,
  FolderOpen,
  Award,
  Wrench,
  MapPin,
  Phone,
  Mail,
  Link as LinkIcon,
  Loader2,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface ProfilePreviewModalProps {
  profile: any
  onClose: () => void
  onSave: () => void
  isLoading: boolean
}

function EmptyState({ text }: { text: string }) {
  return <p className="text-xs text-slate-400 font-medium py-1">- {text}</p>
}

function Field({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10.5px] font-extrabold text-slate-400 uppercase tracking-wider">
        {label}
      </span>
      <span className="text-[13px] font-bold text-slate-800 break-words">{value}</span>
    </div>
  )
}

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-slate-100">
      <div className="w-7 h-7 rounded-lg bg-[#EEF4FA] flex items-center justify-center text-[#0F2744] shrink-0">
        {icon}
      </div>
      <h3 className="text-[14px] font-extrabold text-slate-900 tracking-tight">{title}</h3>
    </div>
  )
}

export function ProfilePreviewModal({
  profile,
  onClose,
  onSave,
  isLoading,
}: ProfilePreviewModalProps) {
  const data = profile?.master_resume_data || {}
  const pi = data.personal_info || {}

  const fullName =
    [pi.firstName, pi.middleName, pi.lastName].filter(Boolean).join(' ') ||
    profile?.full_name ||
    ''
  const email = profile?.email || pi.email || ''
  const phone = profile?.phone || pi.phone || ''

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0F2744] text-white shrink-0">
          <div>
            <h2 className="text-base sm:text-lg font-extrabold tracking-tight">
              Master Profile Dossier Preview
            </h2>
            <p className="text-xs font-medium text-slate-300 mt-0.5">
              Review your verified career record used for AI resume generation.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close preview"
            className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 bg-[#F8FAFC]">
          {/* 1. PERSONAL INFO */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
            <SectionHeader
              icon={<User className="w-3.5 h-3.5" />}
              title="Personal & Contact Information"
            />
            {!fullName && !email ? (
              <EmptyState text="No personal information recorded." />
            ) : (
              <div className="space-y-4">
                {fullName && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-3 border-b border-slate-100">
                    <Field label="First Name" value={pi.firstName} />
                    {pi.middleName && <Field label="Middle Name" value={pi.middleName} />}
                    <Field label="Last Name" value={pi.lastName} />
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {email && (
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                      <Field label="Email Address" value={email} />
                    </div>
                  )}
                  {phone && (
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                      <Field label="Phone Number" value={phone} />
                    </div>
                  )}
                  {pi.location && (
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                      <Field label="Location" value={pi.location} />
                    </div>
                  )}
                  {pi.linkedin && (
                    <div className="flex items-center gap-2.5">
                      <LinkIcon className="w-4 h-4 text-slate-400 shrink-0" />
                      <Field label="LinkedIn Profile" value={pi.linkedin} />
                    </div>
                  )}
                </div>
                {pi.summary && (
                  <div className="pt-3 border-t border-slate-100">
                    <span className="text-[10.5px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Executive Summary
                    </span>
                    <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
                      {pi.summary}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 2. EMPLOYMENT */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
            <SectionHeader
              icon={<Briefcase className="w-3.5 h-3.5" />}
              title="Employment & Career History"
            />
            {!data.employment?.length ? (
              <EmptyState text="No employment history recorded." />
            ) : (
              <div className="divide-y divide-slate-100 space-y-4">
                {data.employment.map((job: any, i: number) => (
                  <div key={i} className={i > 0 ? 'pt-4' : ''}>
                    <div className="flex items-start justify-between gap-4 mb-1.5">
                      <div>
                        <h4 className="text-[14px] font-extrabold text-slate-900">
                          {job.title || '-'}
                        </h4>
                        <p className="text-xs font-bold text-[#0F2744] mt-0.5">
                          {job.company || '-'}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[11px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-lg tabular-nums">
                          {job.startDate || '?'} - {job.current ? 'Present' : job.endDate || '?'}
                        </span>
                        {job.location && (
                          <p className="text-[11px] text-slate-400 mt-0.5">{job.location}</p>
                        )}
                      </div>
                    </div>
                    {job.responsibilities && (
                      <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line mt-2">
                        {job.responsibilities}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3. EDUCATION */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
            <SectionHeader
              icon={<GraduationCap className="w-3.5 h-3.5" />}
              title="Education & Academic Credentials"
            />
            {!data.education?.length ? (
              <EmptyState text="No education credentials recorded." />
            ) : (
              <div className="divide-y divide-slate-100 space-y-3">
                {data.education.map((edu: any, i: number) => (
                  <div key={i} className={i > 0 ? 'pt-3' : ''}>
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <div>
                        <h4 className="text-[14px] font-extrabold text-slate-900">
                          {edu.degree || '-'}
                        </h4>
                        <p className="text-xs font-bold text-[#0F2744] mt-0.5">
                          {edu.institution || '-'}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[11px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-lg tabular-nums">
                          {edu.startDate || '?'} - {edu.endDate || '?'}
                        </span>
                        {edu.grade && (
                          <p className="text-[11px] text-slate-500 font-semibold mt-0.5">
                            Grade: {edu.grade}
                          </p>
                        )}
                      </div>
                    </div>
                    {edu.description && (
                      <p className="text-xs text-slate-600 leading-relaxed mt-1">
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 4. KEY SKILLS */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
            <SectionHeader
              icon={<Wrench className="w-3.5 h-3.5" />}
              title="Technical Skills & Competencies"
            />
            {!data.skills?.length ? (
              <EmptyState text="No skills recorded." />
            ) : (
              <div className="space-y-3">
                {Array.isArray(data.skills) &&
                typeof data.skills[0] === 'object' &&
                Array.isArray(data.skills[0].items) ? (
                  data.skills.map((cat: any, i: number) => (
                    <div key={i} className={i > 0 ? 'pt-2.5 border-t border-slate-100' : ''}>
                      <h5 className="text-[10.5px] font-extrabold text-slate-400 uppercase tracking-wider mb-1.5">
                        {cat.category || 'Competencies'}
                      </h5>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.items?.map((item: string, j: number) => (
                          <span
                            key={j}
                            className="text-[11.5px] font-bold bg-[#EEF4FA] text-[#0F2744] border border-[#0F2744]/10 px-2.5 py-0.5 rounded-lg"
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
                          className="text-[11.5px] font-bold bg-[#EEF4FA] text-[#0F2744] border border-[#0F2744]/10 px-2.5 py-0.5 rounded-lg"
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
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
            <SectionHeader
              icon={<FolderOpen className="w-3.5 h-3.5" />}
              title="Key Projects & Portfolios"
            />
            {!data.projects?.length ? (
              <EmptyState text="No projects recorded." />
            ) : (
              <div className="divide-y divide-slate-100 space-y-3">
                {data.projects.map((proj: any, i: number) => (
                  <div key={i} className={i > 0 ? 'pt-3' : ''}>
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <div>
                        <h4 className="text-[14px] font-extrabold text-slate-900">
                          {proj.name || '-'}
                        </h4>
                        {proj.role && (
                          <p className="text-xs font-bold text-[#0F2744] mt-0.5">{proj.role}</p>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        {(proj.startDate || proj.endDate) && (
                          <span className="text-[11px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-lg tabular-nums">
                            {proj.startDate || '?'} - {proj.endDate || '?'}
                          </span>
                        )}
                        {proj.link && (
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-[#0F2744] hover:underline font-bold block mt-1"
                          >
                            View Project
                          </a>
                        )}
                      </div>
                    </div>
                    {proj.description && (
                      <p className="text-xs text-slate-600 leading-relaxed mt-1">
                        {proj.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 6. CERTIFICATIONS */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
            <SectionHeader
              icon={<Award className="w-3.5 h-3.5" />}
              title="Licenses & Professional Certifications"
            />
            {!data.certifications?.length ? (
              <EmptyState text="No certifications recorded." />
            ) : (
              <div className="divide-y divide-slate-100 space-y-3">
                {data.certifications.map((cert: any, i: number) => (
                  <div key={i} className={i > 0 ? 'pt-3' : ''}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-[14px] font-extrabold text-slate-900">
                          {cert.name || '-'}
                        </h4>
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
                            className="text-xs text-[#0F2744] hover:underline font-bold block mt-1"
                          >
                            Verify Credential
                          </a>
                        )}
                      </div>
                      <div className="text-right shrink-0 text-[11px] text-slate-500 font-semibold tabular-nums">
                        {cert.issueDate && <div>Issued: {cert.issueDate}</div>}
                        {cert.expiryDate && <div>Expires: {cert.expiryDate}</div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-white flex items-center justify-between gap-4 shrink-0">
          <p className="text-xs text-slate-500 font-medium hidden sm:block">
            Your profile is private and used exclusively for tailoring your resumes.
          </p>
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="h-9 px-4 rounded-xl font-bold text-xs text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
            >
              Back to Edit
            </button>
            <Button
              onClick={onSave}
              disabled={isLoading}
              className="h-9 px-5 rounded-xl font-extrabold text-xs shadow-sm cursor-pointer bg-[#0F2744] hover:bg-[#0A1C33] text-white"
              leftIcon={
                isLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F59E0B]" />
                )
              }
            >
              {isLoading ? 'Saving...' : 'Confirm & Save Profile'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
