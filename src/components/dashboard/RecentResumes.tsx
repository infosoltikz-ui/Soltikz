import { FileText, Eye, Edit3, ArrowRight, FilePlus2, Briefcase, Building2 } from 'lucide-react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { cn } from '@/utils/cn'

export function RecentResumes({ resumes }: { resumes: any[] }) {
  if (!resumes || resumes.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-8 h-full flex flex-col justify-between hover:border-slate-300 transition-all duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#EEF4FA] border border-[#0F2744]/10 text-[#0F2744] flex items-center justify-center">
              <FileText className="w-4 h-4" strokeWidth={2.2} />
            </div>
            <div>
              <h3 className="text-[15px] font-extrabold text-slate-900">Recent Resumes</h3>
              <p className="text-xs text-slate-500 font-medium">Your tailored resume library</p>
            </div>
          </div>
        </div>

        <div className="py-10 flex flex-col items-center justify-center text-center my-auto">
          <div className="w-16 h-16 rounded-2xl bg-[#EEF4FA] border border-[#0F2744]/10 flex items-center justify-center mb-4 shadow-2xs">
            <FilePlus2 className="w-7 h-7 text-[#0F2744]" strokeWidth={1.8} />
          </div>
          <h4 className="text-base font-extrabold text-slate-900 mb-1.5">
            No active resumes in your library
          </h4>
          <p className="text-xs text-slate-500 max-w-xs leading-relaxed mb-6 font-medium">
            Paste a job description and build a clean, ATS-optimized resume tailored straight from your Master Profile.
          </p>
          <Link href="/dashboard/create">
            <button className="inline-flex items-center gap-2 bg-[#0F2744] hover:bg-[#0A1C33] text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-md shadow-[#0F2744]/15 hover:-translate-y-0.5 transition-all cursor-pointer">
              <FilePlus2 className="w-4 h-4 text-[#F59E0B]" />
              <span>Create Tailored Resume</span>
            </button>
          </Link>
        </div>

        <div className="pt-3 border-t border-slate-100 text-[11px] font-medium text-slate-400 text-center">
          Supports Full-Time & Contract (C2C) recruiter-approved formats
        </div>
      </div>
    )
  }

  const displayResumes = resumes.slice(0, 4)

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 h-full flex flex-col justify-between hover:border-slate-300 transition-all duration-200">
      <div>
        <div className="flex items-center justify-between pb-4 mb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#EEF4FA] border border-[#0F2744]/10 text-[#0F2744] flex items-center justify-center">
              <FileText className="w-4 h-4" strokeWidth={2.2} />
            </div>
            <div>
              <h3 className="text-[15px] font-extrabold text-slate-900">Recent Resumes</h3>
              <p className="text-xs text-slate-500 font-medium">
                Recently tailored resume documents
              </p>
            </div>
          </div>

          <Link href="/dashboard/resumes">
            <button className="text-xs font-bold text-[#0F2744] hover:bg-[#EEF4FA] border border-slate-200 hover:border-[#0F2744]/20 rounded-xl px-3 py-1.5 transition-all cursor-pointer">
              View All ({resumes.length})
            </button>
          </Link>
        </div>

        <div className="space-y-2.5">
          {displayResumes.map((resume) => {
            const atsScore = (resume as any).ats_analyses?.[0]?.overall_score
            const isC2C = String(resume.resume_type || '').toUpperCase() === 'C2C'
            const resumeType = isC2C ? 'C2C / Contract' : 'Full-Time'
            const jd = Array.isArray(resume.parsed_job_descriptions)
              ? resume.parsed_job_descriptions[0]
              : resume.parsed_job_descriptions

            let timeAgo = 'recently'
            try {
              if (resume.updated_at) {
                timeAgo = formatDistanceToNow(new Date(resume.updated_at), { addSuffix: true })
              }
            } catch {
              timeAgo = 'recently'
            }

            return (
              <div
                key={resume.id}
                className="group p-3.5 rounded-xl border border-slate-200/70 bg-slate-50/40 hover:bg-white hover:border-[#0F2744]/25 hover:shadow-md hover:shadow-slate-900/[0.03] transition-all duration-200 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-11 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center shrink-0 text-slate-500 group-hover:border-[#0F2744]/30 group-hover:text-[#0F2744] shadow-2xs transition-colors">
                    <FileText className="w-4 h-4" strokeWidth={2} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Link
                        href={`/dashboard/create?id=${resume.id}`}
                        className="text-[13.5px] font-extrabold text-slate-900 hover:text-[#0F2744] truncate transition-colors max-w-[200px] sm:max-w-[260px]"
                      >
                        {resume.title || 'Untitled Resume'}
                      </Link>

                      {atsScore && atsScore > 0 ? (
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10.5px] font-extrabold px-2 py-0.5 rounded-md tabular-nums shrink-0">
                          {atsScore}% ATS
                        </span>
                      ) : (
                        <span className="bg-slate-100 text-slate-600 border border-slate-200 text-[10.5px] font-bold px-2 py-0.5 rounded-md shrink-0">
                          Draft
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-[11.5px] text-slate-500 font-medium mt-1 flex-wrap">
                      <span
                        className={cn(
                          'inline-flex items-center gap-1 text-[10.5px] font-bold px-1.5 py-px rounded border',
                          isC2C
                            ? 'bg-amber-50 text-amber-800 border-amber-200/80'
                            : 'bg-[#EEF4FA] text-[#0F2744] border-[#0F2744]/10'
                        )}
                      >
                        <Briefcase className="w-2.5 h-2.5" />
                        {resumeType}
                      </span>
                      {jd?.company_name && (
                        <span className="inline-flex items-center gap-1 text-slate-600 truncate max-w-[120px]">
                          <Building2 className="w-3 h-3 text-slate-400" />
                          {jd.company_name}
                        </span>
                      )}
                      <span className="text-slate-400">· Updated {timeAgo}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <Link href={`/dashboard/create?id=${resume.id}`}>
                    <button
                      title="Edit Resume"
                      className="p-2 text-slate-500 hover:text-[#0F2744] bg-white hover:bg-[#EEF4FA] border border-slate-200/80 hover:border-[#0F2744]/20 rounded-xl transition-all cursor-pointer shadow-2xs"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                  <Link href={`/dashboard/create?id=${resume.id}`}>
                    <button
                      title="Preview Resume"
                      className="p-2 text-slate-500 hover:text-[#0F2744] bg-white hover:bg-[#EEF4FA] border border-slate-200/80 hover:border-[#0F2744]/20 rounded-xl transition-all cursor-pointer shadow-2xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
        <Link
          href="/dashboard/create"
          className="group text-xs font-extrabold text-[#0F2744] hover:text-amber-700 inline-flex items-center gap-1.5 transition-colors"
        >
          <span>Create New Tailored Resume</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
        <span className="text-[11px] font-medium text-slate-400">
          Showing {displayResumes.length} of {resumes.length}
        </span>
      </div>
    </div>
  )
}
