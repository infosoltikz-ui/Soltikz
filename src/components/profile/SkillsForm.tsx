import { Plus, X, Wrench, Search, Loader2, ChevronUp, ChevronDown, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { ProfilePreviewModal } from '@/components/profile/ProfilePreviewModal'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'react-hot-toast'

export interface ResumeSkillCategory {
  category: string;
  items: string[];
}

export function SkillsForm({
  profile,
  setProfile,
  onFinalSave,
  localMode,
  onLocalSave,
  onCancel,
  resumeType
}: {
  profile?: any,
  setProfile?: (p: any) => void,
  onFinalSave?: (profile: any) => void,
  localMode?: boolean,
  onLocalSave?: (profile: any) => void,
  onCancel?: () => void,
  resumeType?: 'c2c' | 'fulltime'
}) {
  const masterData = profile?.master_resume_data || {}

  const defaultCategories: ResumeSkillCategory[] = [
    { category: 'Core Languages & Frameworks', items: [] },
    { category: 'Databases & Cloud Platforms', items: [] },
    { category: 'Tools, DevOps & CI/CD', items: [] },
    { category: 'Architecture & Methodologies', items: [] }
  ];

  // Load saved skills from profile; fall back to defaults only when nothing saved yet
  const initialSkills = masterData.skills?.length > 0 ? masterData.skills : defaultCategories;
  
  const [categories, setCategories] = useState<ResumeSkillCategory[]>(
    initialSkills.map((s: any) => {
      if (typeof s === 'string') {
        return { category: 'Core Skills', items: [s] };
      }
      if (s.name && s.category && !s.items) {
        return { category: s.category, items: [s.name] };
      }
      if (s && typeof s === 'object' && Array.isArray(s.items)) {
        return { category: s.category || 'Skills', items: s.items };
      }
      return { category: 'Skills', items: [] };
    })
  )
  const [showPreview, setShowPreview] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const handleSave = async () => {
    if (!profile?.id) return;
    setIsLoading(true)
    try {
      const newMasterData = {
        ...profile.master_resume_data,
        skills: categories.filter(c => c.items.length > 0) // Only save categories with actual skills
      }

      const updates = { master_resume_data: newMasterData }
      const updatedProfile = { ...profile, ...updates }

      if (localMode && onLocalSave) {
        onLocalSave(updatedProfile)
        toast.success('Local changes saved!')
      } else {
        const { error } = await supabase
          .from('profiles')
          .upsert({ id: profile.id, email: profile.email, ...updates })

        if (error) throw error

        if (setProfile) setProfile(updatedProfile)
        toast.success('Skills saved successfully!')
      }
      
      setShowPreview(false)
      if (onFinalSave) onFinalSave(updatedProfile)
    } catch (error: any) {
      toast.error(error.message || 'Failed to save skills')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCategoryNameChange = (index: number, newName: string) => {
    const newCats = [...categories];
    newCats[index].category = newName;
    setCategories(newCats);
  }

  const handleItemsChange = (index: number, commaSeparatedString: string) => {
    const newCats = [...categories];
    newCats[index].items = commaSeparatedString.split(',').map(s => s.trim()).filter(Boolean);
    setCategories(newCats);
  }

  const moveCategory = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === categories.length - 1) return;
    
    const newCats = [...categories];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const temp = newCats[targetIndex];
    newCats[targetIndex] = newCats[index];
    newCats[index] = temp;
    setCategories(newCats);
  }

  const removeCategory = (index: number) => {
    const newCats = categories.filter((_, i) => i !== index);
    setCategories(newCats);
  }

  const addCategory = () => {
    setCategories([...categories, { category: 'New Skill Group', items: [] }]);
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Card Header */}
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-bold text-slate-900">Technical Skills &amp; Competencies</h2>
          <p className="text-[12px] text-slate-500 font-medium">Group skills into clear functional categories for ATS keyword scanning.</p>
        </div>
        <button
          onClick={addCategory}
          className="h-8 px-3 text-[12px] font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 rounded-lg inline-flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 text-primary" />
          Add Category
        </button>
      </div>

      <div className="px-6 py-6 space-y-4">
        {categories.map((cat, idx) => (
          <div key={idx} className="p-4 rounded-lg border border-slate-200 bg-slate-50/40 hover:bg-slate-50/70 transition-colors flex gap-3.5 items-start">
            <div className="flex flex-col gap-1 pt-1 text-slate-400">
              <button 
                onClick={() => moveCategory(idx, 'up')} 
                className="p-1 hover:text-slate-900 transition-colors disabled:opacity-20 cursor-pointer" 
                disabled={idx === 0}
                title="Move Up"
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => moveCategory(idx, 'down')} 
                className="p-1 hover:text-slate-900 transition-colors disabled:opacity-20 cursor-pointer" 
                disabled={idx === categories.length - 1}
                title="Move Down"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <div className="flex-1 space-y-3">
              <div className="flex gap-3 items-center justify-between">
                <div className="flex-1">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={cat.category}
                    onChange={(e) => handleCategoryNameChange(idx, e.target.value)}
                    placeholder="e.g. Programming Languages"
                    className="w-full h-9 px-3 rounded-md border border-slate-200 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[13px] font-bold text-slate-900"
                  />
                </div>
                <button 
                  onClick={() => removeCategory(idx)} 
                  className="mt-5 p-1.5 text-slate-400 hover:text-red-600 transition-colors rounded hover:bg-white cursor-pointer"
                  title="Remove category"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Skills &amp; Technologies <span className="text-slate-400 font-normal lowercase">(comma separated)</span>
                </label>
                <textarea
                  value={cat.items.join(', ')}
                  onChange={(e) => handleItemsChange(idx, e.target.value)}
                  placeholder="e.g. React, Next.js, TypeScript, Tailwind CSS"
                  rows={2}
                  className="w-full p-2.5 rounded-md border border-slate-200 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[13px] font-medium text-slate-800 resize-y leading-relaxed placeholder:text-slate-400"
                />
                {cat.items.length > 8 && (
                  <p className="text-amber-600 text-[11px] font-medium mt-1">
                    Note: Over 8 items in one group may reduce recruiter readability. Consider splitting into two categories.
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
          <button 
            onClick={handleSave} 
            disabled={isLoading} 
            className="h-9 px-6 rounded-lg font-semibold text-[13px] bg-primary text-white hover:bg-primary-dark shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save & Finish'}
          </button>
          <button 
            onClick={() => setShowPreview(true)} 
            className="h-9 px-4 rounded-lg font-semibold text-[13px] text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 bg-white transition-colors cursor-pointer"
          >
            Preview Profile
          </button>
          {onCancel && (
            <button 
              onClick={onCancel} 
              className="h-9 px-4 rounded-lg font-semibold text-[13px] text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-100 bg-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {showPreview && (
        <ProfilePreviewModal 
          profile={{ ...profile, master_resume_data: { ...profile?.master_resume_data, skills: categories.filter(c => c.items.length > 0) } }} 
          onClose={() => setShowPreview(false)}
          onSave={handleSave}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}
