import { FileText, Building2, Target, Calendar, CheckCircle2, Eye, Edit3, Trash2, Copy, GitBranch, Loader2, Share2, Download } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/utils/cn'

export interface ResumeData {
  id: string;
  name: string;
  type: 'Full-Time' | 'C2C' | string;
  company: string;
  role: string;
  template: string;
  atsScore: number;
  lastUpdated: string;
  status: 'Completed' | 'Draft' | string;
  versionNumber?: number;
  isPublic?: boolean;
  candidateName?: string;
  summaryText?: string;
  experienceRole?: string;
  experienceCompany?: string;
  experienceBullet?: string;
  skillsList?: string[];
}

interface ResumeCardProps {
  data: ResumeData
  onDelete?: () => void
  onDuplicate?: () => void
  isDuplicating?: boolean
  onToggleShare?: () => void
  isTogglingShare?: boolean
  onPreview?: () => void
  onEdit?: () => void
  onDownload?: () => void
  isDownloading?: boolean
}

export function ResumeCard({ data, onDelete, onDuplicate, isDuplicating, onToggleShare, isTogglingShare, onPreview, onEdit, onDownload, isDownloading }: ResumeCardProps) {
  const isFullTime = !String(data.type || '').toLowerCase().includes('c2c')

  const displayName = data.candidateName || data.name?.replace(/Resume/i, '').replace(/Full Time/i, '').replace(/C2C/i, '').replace(/[-–]/g, '').trim() || 'Balaji Rockzzz'
  const displayRole = data.experienceRole || data.role || 'Senior Software Engineer'
  const displayCompany = data.experienceCompany || data.company || 'Tech Innovators'
  const displaySummary = data.summaryText || `High-impact ${displayRole} architecting scalable enterprise systems with React, Node.js, and Cloud platforms.`
  const displayBullet = data.experienceBullet || `Engineered core features at ${displayCompany} boosting performance by 35%.`
  const skillsToRender = (data.skillsList && data.skillsList.length > 0)
    ? data.skillsList.slice(0, 4)
    : ['React', 'Node.js', 'AWS', 'TypeScript']

  return (
    <div className="group bg-[#FAFAF8] rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
      {/* Top Section: Full-Width Realistic Resume Document Sheet */}
      <div 
        onClick={() => onPreview?.()}
        className="relative h-48 bg-white border-b border-slate-200 p-3 flex flex-col justify-between overflow-hidden cursor-pointer group-hover:bg-slate-50/40 transition-colors select-none"
      >
        {/* Top Header */}
        <div className="border-b border-slate-100 pb-1.5 pr-18">
          <div className="text-[9px] font-black uppercase text-emerald-800 tracking-wider truncate">
            {displayName}
          </div>
          <div className="text-[7.5px] font-semibold text-slate-500 truncate mt-0.5">
            {displayRole} • {displayCompany}
          </div>
        </div>

        {/* Real Summary Section */}
        <div className="my-1 space-y-0.5">
          <div className="text-[6.5px] font-bold text-emerald-700 uppercase tracking-widest leading-none">Summary</div>
          <div className="text-[7px] text-slate-600 leading-snug line-clamp-2" title={displaySummary}>
            {displaySummary}
          </div>
        </div>

        {/* Real Experience Section */}
        <div className="my-1 space-y-0.5">
          <div className="text-[6.5px] font-bold text-emerald-700 uppercase tracking-widest leading-none">Experience</div>
          <div className="flex items-start gap-1">
            <span className="w-1 h-1 rounded-full bg-emerald-500 shrink-0 mt-1"></span>
            <div className="text-[7px] text-slate-600 leading-snug line-clamp-2" title={displayBullet}>
              {displayBullet}
            </div>
          </div>
        </div>

        {/* Real Skills Chips */}
        <div className="pt-1.5 border-t border-slate-100 flex flex-wrap gap-1 overflow-hidden max-h-[24px]">
          {skillsToRender.map((skill, idx) => (
            <span key={idx} className="text-[6.5px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/60 px-1.5 py-0.5 rounded-xs truncate max-w-[70px]">
              {skill}
            </span>
          ))}
        </div>
        
        {/* High-Impact ATS Score Badge */}
        <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-lg border border-slate-200 shadow-xs flex items-center gap-1.5 z-10">
          <div className={cn(
            "w-1.5 h-1.5 rounded-full",
            data.atsScore >= 90 ? "bg-emerald-500 animate-pulse" : data.atsScore >= 70 ? "bg-amber-500" : "bg-red-500"
          )}></div>
          <span className="text-[10.5px] font-black text-slate-800">{data.atsScore}% ATS</span>
        </div>

        {/* Action Overlay on Hover */}
        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2.5 backdrop-blur-[2px] z-20">
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onPreview?.()
            }} 
            className="w-9 h-9 bg-white text-slate-900 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-sm cursor-pointer" 
            title="Preview Resume"
          >
            <Eye className="w-4 h-4" strokeWidth={2.5} />
          </button>
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onEdit?.()
            }}
            className="w-9 h-9 bg-emerald-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-sm cursor-pointer" 
            title="Edit Resume (Same Tab)"
          >
            <Edit3 className="w-4 h-4" strokeWidth={2.5} />
          </button>
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onDownload?.()
            }}
            disabled={isDownloading}
            className="w-9 h-9 bg-slate-800 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-sm cursor-pointer disabled:opacity-50" 
            title="Download Resume (DOCX)"
          >
            {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" strokeWidth={2.5} />}
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-1.5 mb-1.5">
          <h3 className="text-[14.5px] font-black text-slate-900 line-clamp-1" title={data.name}>{data.name}</h3>
          <div className="shrink-0 flex items-center gap-1">
            {data.isPublic && (
              <span className="flex items-center gap-0.5 text-[9px] font-black text-primary bg-primary/10 px-1.5 py-0.5 rounded-full" title="Anyone with the link can view this resume">
                <Share2 className="w-2.5 h-2.5" />
                Public
              </span>
            )}
            {data.versionNumber != null && data.versionNumber > 1 && (
              <span className="flex items-center gap-0.5 text-[9px] font-black text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-full" title="Duplicated from an earlier version">
                <GitBranch className="w-2.5 h-2.5" />
                v{data.versionNumber}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 mb-3">
          <span className={cn(
            "px-1.5 py-0.5 rounded text-[10.5px] font-bold",
            isFullTime ? "bg-primary/10 text-primary" : "bg-orange-500/10 text-orange-500"
          )}>
            {data.type}
          </span>
          <span className="flex items-center gap-1 text-[11.5px] font-bold text-slate-500">
            <CheckCircle2 className="w-3 h-3 text-primary" strokeWidth={3} />
            {data.status}
          </span>
        </div>

        <div className="space-y-1.5 mb-3">
          <div className="flex items-center gap-2 text-[12px] text-slate-600">
            <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-medium truncate">{data.company}</span>
          </div>
          <div className="flex items-center gap-2 text-[12px] text-slate-600">
            <Target className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-medium truncate">{data.role}</span>
          </div>
          <div className="flex items-center gap-2 text-[12px] text-slate-600">
            <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-medium truncate">{data.template}</span>
          </div>
        </div>

        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10.5px] font-bold text-slate-400 truncate">
            <Calendar className="w-3 h-3 shrink-0" />
            <span className="truncate">{data.lastUpdated}</span>
          </div>
          
          <div className="flex items-center gap-2 shrink-0">
            <button 
              type="button"
              onClick={(e) => {
                e.preventDefault()
                onDownload?.()
              }} 
              disabled={isDownloading}
              className="text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer p-0.5 disabled:opacity-50" 
              title="Download Word (DOCX)"
            >
              {isDownloading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
            </button>
            <button 
              type="button"
              onClick={(e) => {
                e.preventDefault()
                onEdit?.()
              }} 
              className="text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer p-0.5" 
              title="Edit in same tab"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            <button onClick={onDuplicate} disabled={isDuplicating} className="text-slate-400 hover:text-slate-900 transition-colors disabled:opacity-50 p-0.5" title="Duplicate">
              {isDuplicating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onToggleShare}
              disabled={isTogglingShare}
              className={cn(
                "transition-colors disabled:opacity-50 p-0.5",
                data.isPublic ? "text-primary" : "text-slate-400 hover:text-slate-900"
              )}
              title={data.isPublic ? "Make private" : "Make public & copy link"}
            >
              {isTogglingShare ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>
            <button onClick={onDelete} className="text-slate-400 hover:text-red-500 transition-colors p-0.5" title="Delete">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
