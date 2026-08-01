import { X, CheckCircle2, User, Briefcase, GraduationCap, FolderOpen, Award, Wrench } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function ProfilePreviewModal({ profile, onClose, onSave, isLoading }: { profile: any, onClose: () => void, onSave: () => void, isLoading: boolean }) {
  const data = profile?.master_resume_data || {}

  const renderSection = (title: string, icon: any, content: React.ReactNode) => (
    <div className="mb-8">
      <h3 className="text-[16px] font-bold text-slate-900 flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
        {icon}
        {title}
      </h3>
      <div className="pl-6">
        {content}
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100 bg-slate-50/50 rounded-t-2xl">
          <div>
            <h2 className="text-[20px] font-black text-slate-900">Profile Preview</h2>
            <p className="text-[13px] font-medium text-slate-500">Review your information before final save.</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          
          {/* Personal Info */}
          {renderSection('Personal Information', <User className="w-5 h-5 text-primary" />, (
            <div className="grid grid-cols-2 gap-4 text-[14px]">
              <div><span className="text-slate-500 font-medium">Name:</span> <span className="font-bold text-slate-800">{data.personalInfo?.firstName} {data.personalInfo?.lastName}</span></div>
              <div><span className="text-slate-500 font-medium">Email:</span> <span className="font-bold text-slate-800">{data.personalInfo?.email}</span></div>
              <div><span className="text-slate-500 font-medium">Phone:</span> <span className="font-bold text-slate-800">{data.personalInfo?.phone}</span></div>
              <div><span className="text-slate-500 font-medium">Location:</span> <span className="font-bold text-slate-800">{data.personalInfo?.location}</span></div>
            </div>
          ))}

          {/* Employment */}
          {renderSection('Employment History', <Briefcase className="w-5 h-5 text-primary" />, (
            <div className="space-y-4">
              {data.employment?.length > 0 ? data.employment.map((job: any, i: number) => (
                <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="font-bold text-slate-800">{job.title} at {job.company}</div>
                  <div className="text-[13px] text-slate-500">{job.startDate} - {job.current ? 'Present' : job.endDate}</div>
                </div>
              )) : <div className="text-slate-400 text-[13px] italic">No employment history added.</div>}
            </div>
          ))}

          {/* Education */}
          {renderSection('Education', <GraduationCap className="w-5 h-5 text-primary" />, (
            <div className="space-y-4">
              {data.education?.length > 0 ? data.education.map((edu: any, i: number) => (
                <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="font-bold text-slate-800">{edu.degree} in {edu.fieldOfStudy}</div>
                  <div className="text-[13px] text-slate-500">{edu.school} | {edu.startDate} - {edu.endDate}</div>
                </div>
              )) : <div className="text-slate-400 text-[13px] italic">No education added.</div>}
            </div>
          ))}

          {/* Projects */}
          {renderSection('Projects', <FolderOpen className="w-5 h-5 text-primary" />, (
            <div className="space-y-4">
              {data.projects?.length > 0 ? data.projects.map((proj: any, i: number) => (
                <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="font-bold text-slate-800">{proj.name}</div>
                  <div className="text-[13px] text-slate-500">{proj.role}</div>
                </div>
              )) : <div className="text-slate-400 text-[13px] italic">No projects added.</div>}
            </div>
          ))}

          {/* Skills */}
          {renderSection('Skills', <Wrench className="w-5 h-5 text-primary" />, (
            <div className="flex flex-wrap gap-2">
              {data.skills?.length > 0 ? data.skills.map((skill: any, i: number) => (
                <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-[13px] font-bold rounded-lg border border-primary/20">
                  {skill.name}
                </span>
              )) : <div className="text-slate-400 text-[13px] italic">No skills added.</div>}
            </div>
          ))}

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-white rounded-b-2xl flex items-center justify-end gap-4">
          <Button variant="outline" onClick={onClose} className="h-12 px-6 rounded-xl font-bold">
            Go Back
          </Button>
          <Button 
            onClick={onSave} 
            disabled={isLoading}
            className="h-12 px-8 rounded-xl font-bold shadow-lg shadow-primary/30"
            leftIcon={<CheckCircle2 className="w-5 h-5" />}
          >
            {isLoading ? 'Saving...' : 'Confirm & Final Save'}
          </Button>
        </div>

      </div>
    </div>
  )
}
