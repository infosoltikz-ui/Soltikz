import { X, CheckCircle2, User, Briefcase, GraduationCap, FolderOpen, Award, Wrench, MapPin, Phone, Mail, Link as LinkIcon, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface ProfilePreviewModalProps {
  profile: any
  onClose: () => void
  onSave: () => void
  isLoading: boolean
}

function EmptyState({ text }: { text: string }) {
  return <p className="text-[13px] text-slate-400 italic py-1">{text}</p>
}

function Field({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
      <span className="text-[14px] font-semibold text-slate-800 break-words">{value}</span>
    </div>
  )
}

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-100">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
        {icon}
      </div>
      <h3 className="text-[16px] font-black text-slate-900">{title}</h3>
    </div>
  )
}

export function ProfilePreviewModal({ profile, onClose, onSave, isLoading }: ProfilePreviewModalProps) {
  const data = profile?.master_resume_data || {}
  const pi = data.personal_info || {}

  // Build full name with optional middle name
  const fullName = [pi.firstName, pi.middleName, pi.lastName].filter(Boolean).join(' ')
  const email = profile?.email || ''
  const phone = profile?.phone || ''

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl max-h-[92vh] rounded-2xl shadow-2xl flex flex-col">

        {/* Modal Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100 bg-slate-50/80 rounded-t-2xl shrink-0">
          <div>
            <h2 className="text-[20px] font-black text-slate-900">Profile Preview</h2>
            <p className="text-[13px] font-medium text-slate-500 mt-0.5">Review all your information before the final save.</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-red-500 hover:border-red-300 transition-all shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">

          {/* ── 1. PERSONAL INFO ────────────────────────── */}
          <section>
            <SectionHeader icon={<User className="w-4 h-4" />} title="Personal Information" />
            {!fullName && !email ? (
              <EmptyState text="No personal information entered yet." />
            ) : (
              <div className="space-y-4">
                {fullName && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Field label="First Name" value={pi.firstName} />
                    {pi.middleName && <Field label="Middle Name" value={pi.middleName} />}
                    <Field label="Last Name" value={pi.lastName} />
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                    <Field label="Email" value={email} />
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <Field label="Phone" value={phone} />
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <Field label="Location" value={pi.location} />
                  </div>
                  {pi.linkedin && (
                    <div className="flex items-center gap-2">
                      <LinkIcon className="w-4 h-4 text-slate-400 shrink-0" />
                      <Field label="LinkedIn" value={pi.linkedin} />
                    </div>
                  )}
                </div>
                {pi.summary && (
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Professional Summary</span>
                    <p className="text-[14px] font-medium text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">{pi.summary}</p>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* ── 2. EMPLOYMENT ────────────────────────────── */}
          <section>
            <SectionHeader icon={<Briefcase className="w-4 h-4" />} title="Employment History" />
            {!data.employment?.length ? (
              <EmptyState text="No employment history added yet." />
            ) : (
              <div className="space-y-4">
                {data.employment.map((job: any, i: number) => (
                  <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-5">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <p className="text-[15px] font-black text-slate-900">{job.title || '—'}</p>
                        <p className="text-[13px] font-semibold text-primary mt-0.5">{job.company || '—'}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[12px] font-bold text-slate-500">
                          {job.startDate || '?'} — {job.current ? 'Present' : (job.endDate || '?')}
                        </p>
                        {job.location && <p className="text-[12px] text-slate-400 mt-0.5">{job.location}</p>}
                      </div>
                    </div>
                    {job.responsibilities && (
                      <p className="text-[13px] text-slate-600 leading-relaxed whitespace-pre-line">{job.responsibilities}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ── 3. EDUCATION ─────────────────────────────── */}
          <section>
            <SectionHeader icon={<GraduationCap className="w-4 h-4" />} title="Education" />
            {!data.education?.length ? (
              <EmptyState text="No education added yet." />
            ) : (
              <div className="space-y-4">
                {data.education.map((edu: any, i: number) => (
                  <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-5">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <p className="text-[15px] font-black text-slate-900">{edu.degree || '—'}</p>
                        <p className="text-[13px] font-semibold text-primary mt-0.5">{edu.institution || '—'}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[12px] font-bold text-slate-500">
                          {edu.startDate || '?'} — {edu.endDate || '?'}
                        </p>
                        {edu.grade && <p className="text-[12px] text-slate-400 mt-0.5">Grade: {edu.grade}</p>}
                      </div>
                    </div>
                    {edu.description && (
                      <p className="text-[13px] text-slate-600 leading-relaxed mt-2">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ── 4. PROJECTS ──────────────────────────────── */}
          <section>
            <SectionHeader icon={<FolderOpen className="w-4 h-4" />} title="Projects" />
            {!data.projects?.length ? (
              <EmptyState text="No projects added yet." />
            ) : (
              <div className="space-y-4">
                {data.projects.map((proj: any, i: number) => (
                  <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-5">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <p className="text-[15px] font-black text-slate-900">{proj.name || '—'}</p>
                        {proj.role && <p className="text-[13px] font-semibold text-primary mt-0.5">{proj.role}</p>}
                      </div>
                      <div className="text-right shrink-0">
                        {(proj.startDate || proj.endDate) && (
                          <p className="text-[12px] font-bold text-slate-500">
                            {proj.startDate || '?'} — {proj.endDate || '?'}
                          </p>
                        )}
                        {proj.link && (
                          <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-[12px] text-primary underline mt-0.5 block">
                            View Link
                          </a>
                        )}
                      </div>
                    </div>
                    {proj.description && (
                      <p className="text-[13px] text-slate-600 leading-relaxed mt-2">{proj.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ── 5. CERTIFICATIONS ────────────────────────── */}
          <section>
            <SectionHeader icon={<Award className="w-4 h-4" />} title="Certifications" />
            {!data.certifications?.length ? (
              <EmptyState text="No certifications added yet." />
            ) : (
              <div className="space-y-4">
                {data.certifications.map((cert: any, i: number) => (
                  <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[15px] font-black text-slate-900">{cert.name || '—'}</p>
                        {cert.organization && <p className="text-[13px] font-semibold text-primary mt-0.5">{cert.organization}</p>}
                        {cert.credentialUrl && (
                          <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-[12px] text-blue-500 underline mt-1 block">
                            View Credential
                          </a>
                        )}
                      </div>
                      <div className="text-right shrink-0 text-[12px] font-bold text-slate-500">
                        {cert.issueDate && <p>Issued: {cert.issueDate}</p>}
                        {cert.expiryDate && <p>Expires: {cert.expiryDate}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ── 6. SKILLS ────────────────────────────────── */}
          <section>
            <SectionHeader icon={<Wrench className="w-4 h-4" />} title="Skills" />
            {!data.skills?.length ? (
              <EmptyState text="No skills added yet." />
            ) : (
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill: any, i: number) => (
                  <span
                    key={i}
                    className="px-4 py-1.5 bg-primary/10 text-primary text-[13px] font-bold rounded-full border border-primary/20"
                  >
                    {skill.name || skill}
                  </span>
                ))}
              </div>
            )}
          </section>

        </div>

        {/* Modal Footer */}
        <div className="px-8 py-5 border-t border-slate-100 bg-white rounded-b-2xl flex items-center justify-between gap-4 shrink-0">
          <p className="text-[13px] text-slate-500 font-medium">
            This will save your entire master profile.
          </p>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onClose} className="h-12 px-6 rounded-xl font-bold text-slate-700">
              Go Back & Edit
            </Button>
            <Button
              onClick={onSave}
              disabled={isLoading}
              className="h-12 px-8 rounded-xl font-bold shadow-lg shadow-primary/30"
              leftIcon={isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
            >
              {isLoading ? 'Saving...' : 'Confirm & Final Save'}
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}
