import { Plus, X, Wrench, Search, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'
import { ProfilePreviewModal } from '@/components/profile/ProfilePreviewModal'
import { createClient } from '@/utils/supabase/client'

export function SkillsForm({ profile, setProfile, onFinalSave }: { profile?: any, setProfile?: (p: any) => void, onFinalSave?: (profile: any) => void }) {
  const defaultSkills = [
    { name: 'JavaScript', category: 'Programming Languages' },
    { name: 'React.js', category: 'Libraries & Frameworks' },
    { name: 'Node.js', category: 'Libraries & Frameworks' },
    { name: 'TypeScript', category: 'Programming Languages' },
    { name: 'Tailwind CSS', category: 'Libraries & Frameworks' },
    { name: 'Figma', category: 'Tools' },
    { name: 'Agile Methodology', category: 'Soft Skills' }
  ]

  const [showPreview, setShowPreview] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  // For now, these are the selected skills.
  const [skillsList, setSkillsList] = useState(defaultSkills)

  const handleSave = async () => {
    if (!profile?.id) return;
    setIsLoading(true)
    try {
      const newMasterData = {
        ...profile.master_resume_data,
        skills: skillsList
      }

      const updates = { master_resume_data: newMasterData }
      const { error } = await supabase
        .from('profiles')
        .upsert({ id: profile.id, email: profile.email, ...updates })

      if (error) throw error

      const savedProfile = { ...profile, ...updates }
      if (setProfile) setProfile(savedProfile)
      import('react-hot-toast').then(({ toast }) => {
        toast.success('Profile fully saved!')
      })
      setShowPreview(false)
      if (onFinalSave) onFinalSave(savedProfile)
    } catch (error: any) {
      import('react-hot-toast').then(({ toast }) => toast.error('Failed to save profile'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
      
      <div className="mb-8">
        <h2 className="text-[18px] font-black text-slate-900 mb-1">Skills</h2>
        <p className="text-[13px] font-medium text-slate-500">Add the skills you are proficient in to showcase your abilities.</p>
      </div>

      <div className="space-y-8">
        
        {/* Add Skill Input */}
        <div>
          <label className="block text-[13px] font-bold text-slate-700 mb-2">
            Search or Add Skill
          </label>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="e.g. Python, Public Speaking, Data Analysis" 
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[14px] font-medium text-slate-900 transition-colors bg-white"
              />
            </div>
            <Button className="h-11 px-6 rounded-xl font-bold shadow-sm" leftIcon={<Plus className="w-4 h-4" />}>
              Add
            </Button>
          </div>
        </div>

        {/* Added Skills List */}
        <div>
          <h3 className="text-[14px] font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-primary" />
            Added Skills
          </h3>
          
          <div className="flex flex-wrap gap-2">
            {defaultSkills.map((skill, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg group hover:border-primary/50 transition-colors">
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-slate-700">{skill.name}</span>
                </div>
                <button className="w-5 h-5 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors ml-1">
                  <X className="w-3.5 h-3.5" strokeWidth={3} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
          <Button onClick={handleSave} disabled={isLoading} className="h-11 px-6 rounded-xl font-bold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 min-w-[160px]">
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Final Save'}
          </Button>
          <Button onClick={() => setShowPreview(true)} variant="outline" className="h-11 px-6 rounded-xl font-bold text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors min-w-[160px]">
            Preview
          </Button>
          <button className="h-11 px-6 rounded-xl font-bold text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors">
            Cancel
          </button>
        </div>

      </div>

      {showPreview && (
        <ProfilePreviewModal 
          profile={{ ...profile, master_resume_data: { ...profile?.master_resume_data, skills: skillsList } }} 
          onClose={() => setShowPreview(false)}
          onSave={handleSave}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}
