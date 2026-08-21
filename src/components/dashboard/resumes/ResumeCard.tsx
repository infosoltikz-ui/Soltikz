import { FileText, Building2, Target, Calendar, CheckCircle2, Eye, Edit3, Trash2, Copy, GitBranch, Loader2, Share2 } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/utils/cn'

export interface ResumeData {
  id: string;
  name: string;
  type: 'Full-Time' | 'C2C';
  company: string;
  role: string;
  template: string;
  atsScore: number;
  lastUpdated: string;
  status: 'Completed' | 'Draft' | string;
  versionNumber?: number;
  isPublic?: boolean;
}

interface ResumeCardProps {
  data: ResumeData
  onDelete?: () => void
  onDuplicate?: () => void
  isDuplicating?: boolean
  onToggleShare?: () => void
  isTogglingShare?: boolean
}

export function ResumeCard({ data, onDelete, onDuplicate, isDuplicating, onToggleShare, isTogglingShare }: ResumeCardProps) {
  const isFullTime = data.type === 'Full-Time'

  return (
    <div className="group bg-[#FAFAF8] rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
      {/* Top Header / Thumbnail Area */}
      <div className="relative h-32 bg-slate-100 flex items-center justify-center border-b border-slate-200 p-4">
        {/* Decorative elements representing a resume */}
        <div className="w-20 h-28 bg-white shadow-sm rounded flex flex-col p-2 gap-1.5 opacity-80">
          <div className="w-1/2 h-1.5 bg-slate-200 rounded-full"></div>
          <div className="w-full h-1 bg-slate-100 rounded-full mt-1"></div>
          <div className="w-full h-1 bg-slate-100 rounded-full"></div>
          <div className="w-4/5 h-1 bg-slate-100 rounded-full"></div>
        </div>
        
        {/* ATS Score Badge overlapping */}
        <div className="absolute top-4 right-4 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-sm flex items-center gap-1.5">
          <div className={cn(
            "w-2 h-2 rounded-full",
            data.atsScore >= 90 ? "bg-primary" : data.atsScore >= 70 ? "bg-orange-500" : "bg-red-500"
          )}></div>
          <span className="text-[12px] font-black text-slate-700">{data.atsScore}% ATS</span>
        </div>

        {/* Action Overlay on Hover */}
        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
          <Link href={`/dashboard/create?id=${data.id}`} className="w-10 h-10 bg-white text-slate-900 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-sm" title="Preview">
            <Eye className="w-4 h-4" strokeWidth={2.5} />
          </Link>
          <Link href={`/dashboard/create?id=${data.id}`} className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-sm" title="Edit">
            <Edit3 className="w-4 h-4" strokeWidth={2.5} />
          </Link>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-[16px] font-black text-slate-900 line-clamp-1">{data.name}</h3>
          <div className="shrink-0 flex items-center gap-1.5">
            {data.isPublic && (
              <span className="flex items-center gap-1 text-[10px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-full" title="Anyone with the link can view this resume">
                <Share2 className="w-3 h-3" />
                Public
              </span>
            )}
            {data.versionNumber != null && data.versionNumber > 1 && (
              <span className="flex items-center gap-1 text-[10px] font-black text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full" title="Duplicated from an earlier version">
                <GitBranch className="w-3 h-3" />
                v{data.versionNumber}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className={cn(
            "px-2 py-0.5 rounded-md text-[11px] font-bold",
            isFullTime ? "bg-primary/10 text-primary" : "bg-orange-500/10 text-orange-500"
          )}>
            {data.type}
          </span>
          <span className="flex items-center gap-1 text-[12px] font-bold text-slate-500">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary" strokeWidth={3} />
            {data.status}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-[13px] text-slate-600">
            <Building2 className="w-4 h-4 text-slate-400" />
            <span className="font-medium">{data.company}</span>
          </div>
          <div className="flex items-center gap-2 text-[13px] text-slate-600">
            <Target className="w-4 h-4 text-slate-400" />
            <span className="font-medium line-clamp-1">{data.role}</span>
          </div>
          <div className="flex items-center gap-2 text-[13px] text-slate-600">
            <FileText className="w-4 h-4 text-slate-400" />
            <span className="font-medium truncate">{data.template}</span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
            <Calendar className="w-3.5 h-3.5" />
            Updated {data.lastUpdated}
          </div>
          
          <div className="flex items-center gap-3">
            <Link href={`/dashboard/create?id=${data.id}`} className="text-slate-400 hover:text-slate-900 transition-colors" title="Edit">
              <Edit3 className="w-4 h-4" />
            </Link>
            <button onClick={onDuplicate} disabled={isDuplicating} className="text-slate-400 hover:text-slate-900 transition-colors disabled:opacity-50" title="Duplicate">
              {isDuplicating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={onToggleShare}
              disabled={isTogglingShare}
              className={cn(
                "transition-colors disabled:opacity-50",
                data.isPublic ? "text-primary" : "text-slate-400 hover:text-slate-900"
              )}
              title={data.isPublic ? "Make private" : "Make public & copy link"}
            >
              {isTogglingShare ? <Loader2 className="w-4 h-4 animate-spin" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button onClick={onDelete} className="text-slate-400 hover:text-red-500 transition-colors" title="Delete">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
