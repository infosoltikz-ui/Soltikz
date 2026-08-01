'use client'

import { Pencil, MapPin, Phone, Mail, Link as LinkIcon, Briefcase, GraduationCap, FolderOpen, Award, Wrench, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface ProfileViewProps {
  profile: any
  onEdit: (tab: string) => void
}

function SectionHeader({ icon, title, tab, onEdit }: { icon: React.ReactNode; title: string; tab: string; onEdit: (tab: string) => void }) {
  return (
    <div className="flex items-center justify-between mb-5 pb-3 border-b-2 border-primary/20">
      <h2 className="text-[18px] font-black text-slate-900 flex items-center gap-3">
        <span className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
          {icon}
        </span>
        {title}
      </h2>
      <button
        onClick={() => onEdit(tab)}
        className="flex items-center gap-1.5 text-[12px] font-bold text-primary hover:text-primary/80 bg-primary/10 hover:bg-primary/15 px-3 py-1.5 rounded-lg transition-colors"
      >
        <Pencil className="w-3.5 h-3.5" />
        Edit
      </button>
    </div>
  )
}

function EmptyState({ text }: { text: string }) {
  return <p className="text-[14px] text-slate-400 italic">— {text}</p>
}

export function ProfileView({ profile, onEdit }: ProfileViewProps) {
  const data = profile?.master_resume_data || {}
  const pi = data.personal_info || {}
  const fullName = [pi.firstName, pi.middleName, pi.lastName].filter(Boolean).join(' ')
  const email = profile?.email || ''
  const phone = profile?.phone || ''

  return (
    <div className="space-y-8">

      {/* ── SUCCESS BANNER ────────────────────────── */}
      <div className="bg-gradient-to-r from-primary/10 to-emerald-50 border border-primary/20 rounded-2xl px-6 py-4 flex items-center gap-4">
        <CheckCircle2 className="w-8 h-8 text-primary shrink-0" />
        <div>
          <p className="text-[15px] font-black text-slate-900">Profile Saved Successfully!</p>
          <p className="text-[13px] text-slate-600 mt-0.5">Your master profile is ready. Review it below and click <strong>Edit</strong> on any section to make changes.</p>
        </div>
      </div>

      {/* ── 1. PERSONAL INFO ──────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
        <SectionHeader icon={<Mail className="w-4.5 h-4.5" />} title="Personal Information" tab="personal" onEdit={onEdit} />

        {!fullName && !email ? (
          <EmptyState text="No personal information entered." />
        ) : (
          <div className="space-y-5">
            {/* Name & contact pills */}
            <div className="flex flex-wrap gap-3">
              {fullName && (
                <span className="text-[20px] font-black text-slate-900 w-full">{fullName}</span>
              )}
              {email && (
                <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
                  <Mail className="w-3.5 h-3.5" /> {email}
                </span>
              )}
              {phone && (
                <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
                  <Phone className="w-3.5 h-3.5" /> {phone}
                </span>
              )}
              {pi.location && (
                <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
                  <MapPin className="w-3.5 h-3.5" /> {pi.location}
                </span>
              )}
              {pi.linkedin && (
                <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                  <LinkIcon className="w-3.5 h-3.5" /> {pi.linkedin}
                </span>
              )}
            </div>
            {/* Summary */}
            {pi.summary && (
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Professional Summary</p>
                <p className="text-[14px] text-slate-700 leading-relaxed">{pi.summary}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── 2. EMPLOYMENT ──────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
        <SectionHeader icon={<Briefcase className="w-4.5 h-4.5" />} title="Employment History" tab="employment" onEdit={onEdit} />

        {!data.employment?.length ? (
          <EmptyState text="No employment history added." />
        ) : (
          <div className="space-y-6">
            {data.employment.map((job: any, i: number) => (
              <div key={i} className={i > 0 ? 'pt-6 border-t border-slate-100' : ''}>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <p className="text-[16px] font-black text-slate-900">{job.title}</p>
                    <p className="text-[14px] font-bold text-primary mt-0.5">{job.company}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[13px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                      {job.startDate || '?'} — {job.current ? 'Present' : (job.endDate || '?')}
                    </p>
                    {job.location && <p className="text-[12px] text-slate-400 mt-1 text-right">{job.location}</p>}
                  </div>
                </div>
                {job.responsibilities && (
                  <p className="text-[14px] text-slate-600 leading-relaxed mt-2 whitespace-pre-line">{job.responsibilities}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── 3. EDUCATION ───────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
        <SectionHeader icon={<GraduationCap className="w-4.5 h-4.5" />} title="Education" tab="education" onEdit={onEdit} />

        {!data.education?.length ? (
          <EmptyState text="No education added." />
        ) : (
          <div className="space-y-6">
            {data.education.map((edu: any, i: number) => (
              <div key={i} className={i > 0 ? 'pt-6 border-t border-slate-100' : ''}>
                <div className="flex items-start justify-between gap-4 mb-1">
                  <div>
                    <p className="text-[16px] font-black text-slate-900">{edu.degree}</p>
                    <p className="text-[14px] font-bold text-primary mt-0.5">{edu.institution}</p>
                  </div>
                  <div className="text-right shrink-0 space-y-1">
                    <p className="text-[13px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                      {edu.startDate || '?'} — {edu.endDate || '?'}
                    </p>
                    {edu.grade && <p className="text-[12px] text-slate-500">Grade: <strong>{edu.grade}</strong></p>}
                  </div>
                </div>
                {edu.description && (
                  <p className="text-[14px] text-slate-600 leading-relaxed mt-2">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── 4. PROJECTS ────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
        <SectionHeader icon={<FolderOpen className="w-4.5 h-4.5" />} title="Projects" tab="projects" onEdit={onEdit} />

        {!data.projects?.length ? (
          <EmptyState text="No projects added." />
        ) : (
          <div className="space-y-6">
            {data.projects.map((proj: any, i: number) => (
              <div key={i} className={i > 0 ? 'pt-6 border-t border-slate-100' : ''}>
                <div className="flex items-start justify-between gap-4 mb-1">
                  <div>
                    <p className="text-[16px] font-black text-slate-900">{proj.name}</p>
                    {proj.role && <p className="text-[14px] font-bold text-primary mt-0.5">{proj.role}</p>}
                  </div>
                  <div className="text-right shrink-0 space-y-1">
                    {(proj.startDate || proj.endDate) && (
                      <p className="text-[13px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                        {proj.startDate || '?'} — {proj.endDate || '?'}
                      </p>
                    )}
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-[12px] text-primary underline block text-right">View Project</a>
                    )}
                  </div>
                </div>
                {proj.description && (
                  <p className="text-[14px] text-slate-600 leading-relaxed mt-2">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── 5. CERTIFICATIONS ──────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
        <SectionHeader icon={<Award className="w-4.5 h-4.5" />} title="Certifications" tab="certifications" onEdit={onEdit} />

        {!data.certifications?.length ? (
          <EmptyState text="No certifications added." />
        ) : (
          <div className="space-y-5">
            {data.certifications.map((cert: any, i: number) => (
              <div key={i} className={`flex items-start justify-between gap-4 ${i > 0 ? 'pt-5 border-t border-slate-100' : ''}`}>
                <div>
                  <p className="text-[15px] font-black text-slate-900">{cert.name}</p>
                  {cert.organization && <p className="text-[13px] font-bold text-primary mt-0.5">{cert.organization}</p>}
                  {cert.credentialUrl && (
                    <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-[12px] text-blue-500 underline mt-1 block">View Credential</a>
                  )}
                </div>
                <div className="text-right shrink-0 text-[12px] text-slate-500 space-y-0.5">
                  {cert.issueDate && <p>Issued: <strong>{cert.issueDate}</strong></p>}
                  {cert.expiryDate && <p>Expires: <strong>{cert.expiryDate}</strong></p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── 6. SKILLS ──────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
        <SectionHeader icon={<Wrench className="w-4.5 h-4.5" />} title="Skills" tab="skills" onEdit={onEdit} />

        {!data.skills?.length ? (
          <EmptyState text="No skills added." />
        ) : (
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill: any, i: number) => (
              <span key={i} className="px-4 py-2 bg-primary/10 text-primary text-[13px] font-bold rounded-full border border-primary/20">
                {skill.name || skill}
              </span>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}
