import { FileText, Eye, Edit3, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

export function RecentResumes({ resumes }: { resumes: any[] }) {
  if (!resumes || resumes.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 h-full flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
          <FileText className="w-6 h-6 text-slate-400" strokeWidth={1.75} />
        </div>
        <h3 className="text-slate-900 font-bold text-[14px] mb-1">No resumes created yet</h3>
        <p className="text-slate-500 text-[12px] max-w-xs mb-4">
          Create a tailored resume targeted to your specific job description.
        </p>
        <Link href="/dashboard/create">
          <button className="bg-primary hover:bg-primary-dark text-white font-semibold px-4 py-2 rounded-lg text-[13px] shadow-sm transition-all">
            Create First Resume
          </button>
        </Link>
      </div>
    )
  }

  // Display top 4 most recent resumes
  const displayResumes = resumes.slice(0, 4)

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 h-full flex flex-col justify-between hover:border-slate-300 transition-colors">
      <div>
        <div className="flex items-center justify-between pb-3.5 mb-2 border-b border-slate-100">
          <div>
            <h3 className="text-[14px] font-bold text-slate-900">Recent Resumes</h3>
            <p className="text-[11px] text-slate-500 font-medium">Your recently tailored resume documents</p>
          </div>
          <Link href="/dashboard/resumes">
            <button className="text-[12px] font-semibold text-slate-600 hover:text-primary transition-colors border border-slate-200 hover:border-slate-300 rounded-md px-2.5 py-1">
              View All ({resumes.length})
            </button>
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {displayResumes.map((resume) => {
            const atsScore = (resume as any).ats_analyses?.[0]?.overall_score
            const resumeType = resume.resume_type === 'C2C' ? 'Contract (C2C)' : 'Full-Time'
            
            let timeAgo = 'recently'
            try {
              if (resume.updated_at) {
                timeAgo = formatDistanceToNow(new Date(resume.updated_at), { addSuffix: true })
              }
            } catch (e) {
              timeAgo = 'recently'
            }

            return (
              <div key={resume.id} className="py-3 flex items-center justify-between gap-3 group">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-9 rounded bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 text-slate-500 group-hover:border-slate-300 transition-colors">
                    <FileText className="w-4 h-4 text-slate-500" strokeWidth={2} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <Link 
                        href={`/dashboard/create?id=${resume.id}`}
                        className="text-[13px] font-bold text-slate-800 hover:text-primary truncate transition-colors"
                      >
                        {resume.title || 'Untitled Resume'}
                      </Link>
                      {atsScore && atsScore > 0 ? (
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold px-2 py-0.2 rounded shrink-0">
                          {atsScore}% ATS
                        </span>
                      ) : (
                        <span className="bg-slate-50 text-slate-500 border border-slate-200 text-[10px] font-medium px-1.5 py-0.2 rounded shrink-0">
                          Draft
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium mt-0.5">
                      <span className="text-slate-500">{resumeType}</span>
                      <span>•</span>
                      <span>Updated {timeAgo}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <Link href={`/dashboard/create?id=${resume.id}`}>
                    <button 
                      title="Edit Resume"
                      className="p-1.5 text-slate-500 hover:text-slate-900 transition-colors rounded hover:bg-slate-100"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                  <Link href={`/dashboard/create?id=${resume.id}`}>
                    <button 
                      title="Preview Resume"
                      className="p-1.5 text-slate-500 hover:text-slate-900 transition-colors rounded hover:bg-slate-100"
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

      <div className="pt-3 border-t border-slate-100 mt-2">
        <Link 
          href="/dashboard/create" 
          className="text-[12px] font-semibold text-primary hover:text-primary-dark inline-flex items-center gap-1 transition-colors"
        >
          Create New Tailored Resume <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  )
}
