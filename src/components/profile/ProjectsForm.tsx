import { useState } from 'react'
import { Plus, Trash2, FolderOpen, Globe, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'react-hot-toast'
import { formatMonthYear } from '@/utils/dateFormatter'

export function ProjectsForm({ 
  profile, 
  setProfile, 
  onNext, 
  localMode, 
  onLocalSave 
}: { 
  profile?: any, 
  setProfile?: (p: any) => void, 
  onNext?: () => void,
  localMode?: boolean,
  onLocalSave?: (profile: any) => void
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
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
      
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-[18px] font-black text-slate-900 mb-1">Projects</h2>
          <p className="text-[13px] font-medium text-slate-500">Highlight significant projects you have worked on.</p>
        </div>
        <Button onClick={handleAdd} className="h-9 px-4 text-[13px] font-bold rounded-xl shadow-sm hover:shadow-md shadow-primary/20" leftIcon={<Plus className="w-4 h-4" />}>
          Add Project
        </Button>
      </div>

      <div className="space-y-8">
        
        {projectsList.map((project, index) => (
          <div key={index} className="relative group p-6 rounded-2xl border border-slate-200 hover:border-primary/50 bg-slate-50/50 transition-colors">
            <button 
              onClick={() => handleRemove(index)}
              className="absolute -top-3 -right-3 w-8 h-8 bg-white border border-slate-200 hover:border-red-500 hover:text-red-500 text-slate-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            
            <h3 className="text-[14px] font-bold text-slate-800 mb-4">Project {index + 1}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">
                  Project Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FolderOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    value={project.name || ''}
                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                    placeholder={`Name of Project`}
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[14px] font-medium text-slate-900 transition-colors bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">
                  Role / Title
                </label>
                <input 
                  type="text" 
                  value={project.role || ''}
                  onChange={(e) => handleChange(index, 'role', e.target.value)}
                  placeholder="e.g. Full Stack Developer" 
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[14px] font-medium text-slate-900 transition-colors bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">
                  Project Link / URL
                </label>
                <div className="relative">
                  <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="url" 
                    value={project.link || ''}
                    onChange={(e) => handleChange(index, 'link', e.target.value)}
                    placeholder="https://" 
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[14px] font-medium text-slate-900 transition-colors bg-white"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-[13px] font-bold text-slate-700 mb-2">
                    Start Date
                  </label>
                  <input 
                    type="text" 
                    value={project.startDate || ''}
                    onChange={(e) => handleChange(index, 'startDate', formatMonthYear(e.target.value))}
                    placeholder="MM/YYYY"
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[14px] font-medium text-slate-900 transition-colors bg-white"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[13px] font-bold text-slate-700 mb-2">
                    End Date
                  </label>
                  <input 
                    type="text" 
                    value={project.endDate || ''}
                    onChange={(e) => handleChange(index, 'endDate', formatMonthYear(e.target.value))}
                    placeholder="MM/YYYY"
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[14px] font-medium text-slate-900 transition-colors bg-white"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-slate-700 mb-2">
                Description
              </label>
              <textarea 
                rows={3}
                value={project.description || ''}
                onChange={(e) => handleChange(index, 'description', e.target.value)}
                placeholder={`Describe your contributions...`}
                className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[14px] font-medium text-slate-700 transition-colors resize-none leading-relaxed bg-white"
              ></textarea>
            </div>
          </div>
        ))}

        {projectsList.length === 0 && (
          <div className="text-center py-10 px-4 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
            <p className="text-[14px] font-medium text-slate-500 mb-4">No projects added yet.</p>
            <Button onClick={handleAdd} className="h-9 px-4 text-[13px] font-bold rounded-xl text-slate-700" variant="outline" leftIcon={<Plus className="w-4 h-4" />}>
              Add Your First Project
            </Button>
          </div>
        )}

        <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
          <Button 
            onClick={handleSave} 
            disabled={isLoading}
            className="h-11 px-6 rounded-xl font-bold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 min-w-[160px]"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save & Next'}
          </Button>
          <button className="h-11 px-6 rounded-xl font-bold text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors">
            Cancel
          </button>
        </div>

      </div>
    </div>
  )
}
