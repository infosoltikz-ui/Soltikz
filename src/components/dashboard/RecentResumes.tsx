import { FileText, Eye, Download, MoreVertical } from 'lucide-react'

export function RecentResumes() {
  const resumes = [
    {
      id: 1,
      name: 'Software Engineer Resume',
      updated: '2 mins ago',
      format: 'PDF',
      score: '87% ATS Score'
    },
    {
      id: 2,
      name: 'Product Manager Resume',
      updated: '1 day ago',
      format: 'PDF',
      score: '91% ATS Score'
    },
    {
      id: 3,
      name: 'Data Analyst Resume',
      updated: '2 days ago',
      format: 'DOCX',
      score: '78% ATS Score'
    }
  ]

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[16px] font-black text-slate-900">Recent Resumes</h3>
        <button className="text-[12px] font-bold text-slate-500 hover:text-primary transition-colors border border-slate-200 rounded-lg px-3 py-1.5">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {resumes.map((resume) => (
          <div key={resume.id} className="flex items-center gap-4 py-3 border-b border-slate-50 last:border-0 last:pb-0">
            {/* Document Icon Placeholder */}
            <div className="w-10 h-12 rounded border-2 border-slate-100 bg-slate-50 flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden">
              <div className="absolute top-1 left-2 right-2 h-0.5 bg-slate-200 rounded-full"></div>
              <div className="absolute top-2.5 left-2 w-4 h-0.5 bg-slate-200 rounded-full"></div>
              <div className="absolute top-4 left-2 right-2 h-0.5 bg-slate-200 rounded-full"></div>
              <div className="absolute top-5.5 left-2 right-4 h-0.5 bg-slate-200 rounded-full"></div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-[13.5px] font-bold text-slate-800 truncate">{resume.name}</h4>
                <span className="bg-[#F0FDF4] text-primary text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                  {resume.score}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
                <span>Updated {resume.updated}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span>{resume.format}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button className="p-1.5 text-slate-400 hover:text-slate-900 transition-colors rounded-md hover:bg-slate-100">
                <Eye className="w-[18px] h-[18px]" strokeWidth={2.5} />
              </button>
              <button className="p-1.5 text-slate-400 hover:text-slate-900 transition-colors rounded-md hover:bg-slate-100">
                <Download className="w-[18px] h-[18px]" strokeWidth={2.5} />
              </button>
              <button className="p-1.5 text-slate-400 hover:text-slate-900 transition-colors rounded-md hover:bg-slate-100">
                <MoreVertical className="w-[18px] h-[18px]" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
