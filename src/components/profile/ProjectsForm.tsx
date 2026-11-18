import { useState } from 'react'
import { Plus, Trash2, FolderOpen, Globe, Loader2, Link as LinkIcon } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'react-hot-toast'
import { formatMonthYear } from '@/utils/dateFormatter'

export function ProjectsForm({
  profile,
  setProfile,
  onNext,
  localMode,
  onLocalSave,
  onCancel
}: {
  profile?: any,
  setProfile?: (p: any) => void,
  onNext?: () => void,
  localMode?: boolean,
  onLocalSave?: (profile: any) => void,
  onCancel?: () => void
}) {
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(false)
  const masterData = profile?.master_resume_data || {}
  
  const [projectsList, setProjectsList] = useState<any[]>(masterData.projects || [])

  const handleAdd = () => {
    setProjectsList([...projectsList, {
      name: '',
      role: '',
      link: '',
      startDate: '',
      endDate: '',
      description: ''
    }])
  }

  const handleRemove = (index: number) => {
    setProjectsList(projectsList.filter((_, i) => i !== index))
  }

  const handleChange = (index: number, field: string, value: any) => {
    const newList = [...projectsList]
    newList[index][field] = value
    setProjectsList(newList)
  }

  const handleSave = async () => {
    if (!profile?.id) return;
    setIsLoading(true)
    try {
      const newMasterData = {
        ...masterData,
        projects: projectsList
      }

      const updates = {
        master_resume_data: newMasterData
      }
      
      const updatedProfile = { ...profile, ...updates }

      if (localMode && onLocalSave) {
        onLocalSave(updatedProfile)
        toast.success('Local changes saved!')
      } else {
        const { error } = await supabase
          .from('profiles')
          .upsert({ 
            id: profile.id, 
            email: profile.email,
            ...updates 
          })

        if (error) throw error

        if (setProfile) setProfile(updatedProfile)
        toast.success('Projects saved!')
      }
      if (onNext) onNext()
    } catch (error: any) {
      toast.error(error.message || 'Failed to save projects')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-[#151D28] rounded-xl border border-[#26313F] shadow-sm overflow-hidden">
      {/* Card Header */}
      <div className="px-6 py-4 border-b border-[#26313F] bg-[#101722] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-bold text-[#E4EAF2]">Key Projects &amp; Portfolios</h2>
          <p className="text-[12px] text-[#9FACBE] font-medium">Showcase major software systems, client deliverables, and open-source contributions.</p>
        </div>
        <button 
          onClick={handleAdd} 
          className="h-8 px-3 text-[12px] font-semibold bg-[#1A2330] hover:bg-[#222E3F] text-[#E4EAF2] border border-[#26313F] hover:border-[#3FA57C]/40 rounded-lg inline-flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 text-[#3FA57C]" />
          Add Project
        </button>
      </div>

      <div className="px-6 py-6 space-y-5">
        {projectsList.length === 0 ? (
          <div className="py-8 text-center border-2 border-dashed border-[#26313F] bg-[#101722]/40 rounded-lg">
            <FolderOpen className="w-8 h-8 text-[#78859A] mx-auto mb-2" />
            <p className="text-[13px] font-semibold text-[#E4EAF2]">No projects added yet</p>
            <p className="text-[11px] text-[#9FACBE] mb-3">Add standout projects with tech stack and live links.</p>
            <button
              onClick={handleAdd}
              className="h-8 px-3.5 text-[12px] font-semibold bg-[#0A6E4E] hover:bg-[#0D8A62] text-white border border-[#3FA57C]/40 rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add First Project
            </button>
          </div>
        ) : (
          projectsList.map((proj, index) => (
            <div key={index} className="p-5 rounded-lg border border-[#26313F] bg-[#1A2330]/50 hover:bg-[#1A2330]/80 transition-colors space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#26313F]">
                <span className="text-[11px] font-bold text-[#78859A] uppercase tracking-wider">
                  Project #{index + 1}
                </span>
                <button 
                  onClick={() => handleRemove(index)} 
                  className="p-1 text-[#78859A] hover:text-red-400 transition-colors rounded hover:bg-[#101722] cursor-pointer"
                  title="Remove project"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-semibold text-[#C3CCD9] mb-1.5">
                    Project Name <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <FolderOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#78859A]" />
                    <input 
                      type="text" 
                      placeholder="e.g. Real-Time Analytics Platform"
                      value={proj.name}
                      onChange={(e) => handleChange(index, 'name', e.target.value)}
                      className="w-full h-10 pl-9 pr-3 rounded-lg border border-[#26313F] bg-[#1A2330] focus:outline-none focus:border-[#3FA57C] focus:ring-1 focus:ring-[#3FA57C] text-[13px] font-medium text-[#E4EAF2] transition-colors placeholder:text-[#68768A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-[#C3CCD9] mb-1.5">
                    Your Role / Title
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. Lead Full Stack Developer"
                    value={proj.role}
                    onChange={(e) => handleChange(index, 'role', e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-[#26313F] bg-[#1A2330] focus:outline-none focus:border-[#3FA57C] focus:ring-1 focus:ring-[#3FA57C] text-[13px] font-medium text-[#E4EAF2] transition-colors placeholder:text-[#68768A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[12px] font-semibold text-[#C3CCD9] mb-1.5">Live Link / Repository</label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#78859A]" />
                    <input 
                      type="text" 
                      placeholder="https://..."
                      value={proj.link}
                      onChange={(e) => handleChange(index, 'link', e.target.value)}
                      className="w-full h-10 pl-9 pr-3 rounded-lg border border-[#26313F] bg-[#1A2330] focus:outline-none focus:border-[#3FA57C] focus:ring-1 focus:ring-[#3FA57C] text-[13px] font-medium text-[#E4EAF2] transition-colors placeholder:text-[#68768A]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#C3CCD9] mb-1.5">Start Date</label>
                  <input 
                    type="text" 
                    placeholder="MM/YYYY"
                    value={proj.startDate}
                    onChange={(e) => handleChange(index, 'startDate', formatMonthYear(e.target.value))}
                    className="w-full h-10 px-3 rounded-lg border border-[#26313F] bg-[#1A2330] focus:outline-none focus:border-[#3FA57C] focus:ring-1 focus:ring-[#3FA57C] text-[13px] font-medium text-[#E4EAF2] transition-colors placeholder:text-[#68768A]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#C3CCD9] mb-1.5">End Date</label>
                  <input 
                    type="text" 
                    placeholder="MM/YYYY"
                    value={proj.endDate}
                    onChange={(e) => handleChange(index, 'endDate', formatMonthYear(e.target.value))}
                    className="w-full h-10 px-3 rounded-lg border border-[#26313F] bg-[#1A2330] focus:outline-none focus:border-[#3FA57C] focus:ring-1 focus:ring-[#3FA57C] text-[13px] font-medium text-[#E4EAF2] transition-colors placeholder:text-[#68768A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#C3CCD9] mb-1.5">Project Overview &amp; Architecture</label>
                <textarea 
                  rows={3}
                  value={proj.description}
                  onChange={(e) => handleChange(index, 'description', e.target.value)}
                  placeholder="• Developed distributed queuing service using Redis & Go, reducing job processing latency by 60%..."
                  className="w-full p-3 rounded-lg border border-[#26313F] bg-[#1A2330] focus:outline-none focus:border-[#3FA57C] focus:ring-1 focus:ring-[#3FA57C] text-[13px] font-medium text-[#E4EAF2] transition-colors leading-relaxed placeholder:text-[#68768A]"
                ></textarea>
              </div>
            </div>
          ))
        )}

        <div className="flex items-center gap-3 pt-3 border-t border-[#26313F]">
          <button 
            onClick={handleSave} 
            disabled={isLoading} 
            className="h-9 px-6 rounded-lg font-semibold text-[13px] bg-[#0A6E4E] hover:bg-[#0D8A62] text-white border border-[#3FA57C]/40 shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save & Continue'}
          </button>
          {onCancel && (
            <button 
              onClick={onCancel} 
              className="h-9 px-4 rounded-lg font-semibold text-[13px] text-[#E4EAF2] hover:text-white border border-[#26313F] hover:bg-[#222E3F] bg-[#1A2330] transition-colors cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
