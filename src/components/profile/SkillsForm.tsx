import { Plus, X, Wrench, Search, Loader2, GripVertical, ChevronUp, ChevronDown, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'
import { ProfilePreviewModal } from '@/components/profile/ProfilePreviewModal'
import { createClient } from '@/utils/supabase/client'

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
    { category: 'Core Domain Skills', items: [] },
    { category: 'Tools & Platforms', items: [] },
    { category: 'Programming & Scripting', items: [] },
    { category: 'Databases & Data Handling', items: [] },
    { category: 'Cloud & Infrastructure', items: [] },
    { category: 'Frameworks & Methodologies', items: [] },
    { category: 'Testing & Quality', items: [] },
    { category: 'Reporting & Visualization', items: [] },
    { category: 'Collaboration & Workflow', items: [] },
    { category: 'Operating Systems & Environments', items: [] }
  ];

  // Load saved skills from profile; fall back to defaults only when nothing saved yet
  // Make sure it matches ResumeSkillCategory[] structure. If legacy flat structure, map it.
  const initialSkills = masterData.skills?.length > 0 ? masterData.skills : defaultCategories;
  
  const [categories, setCategories] = useState<ResumeSkillCategory[]>(
    initialSkills.map((s: any) => {
      // Handle legacy flat skill objects
      if (s.name && s.category && !s.items) {
        return { category: s.category, items: [s.name] };
      }
      return s;
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
        import('react-hot-toast').then(({ toast }) => {
          toast.success('Local changes saved!')
        })
      } else {
        const { error } = await supabase
          .from('profiles')
          .upsert({ id: profile.id, email: profile.email, ...updates })

        if (error) throw error

        if (setProfile) setProfile(updatedProfile)
        import('react-hot-toast').then(({ toast }) => {
          toast.success('Profile fully saved!')
        })
      }
      
      setShowPreview(false)
      if (onFinalSave) onFinalSave(updatedProfile)
    } catch (error: any) {
      import('react-hot-toast').then(({ toast }) => toast.error('Failed to save profile'))
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
    setCategories([...categories, { category: 'New Category', items: [] }]);
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
      
      <div className="mb-8">
        <h2 className="text-[18px] font-black text-slate-900 mb-1">Technical Skills</h2>
        <p className="text-[13px] font-medium text-slate-500">
          Group your skills into clear categories. The JD's exact terms should go first in each line. Keep to 5-7 items per category.
        </p>
      </div>

      <div className="space-y-6">
        
        {categories.map((cat, idx) => (
          <div key={idx} className="flex gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50/50">
            <div className="flex flex-col gap-2 justify-center text-slate-400">
              <button onClick={() => moveCategory(idx, 'up')} className="hover:text-primary transition-colors disabled:opacity-30" disabled={idx === 0}>
                <ChevronUp className="w-5 h-5" />
              </button>
              <button onClick={() => moveCategory(idx, 'down')} className="hover:text-primary transition-colors disabled:opacity-30" disabled={idx === categories.length - 1}>
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="flex gap-4 items-start">
                <div className="flex-1">
                  <label className="block text-[12px] font-bold text-slate-700 mb-1">Category Name</label>
                  <input
                    type="text"
                    value={cat.category}
                    onChange={(e) => handleCategoryNameChange(idx, e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-primary text-[13px] font-bold text-slate-900 bg-white"
                  />
                </div>
                <button onClick={() => removeCategory(idx)} className="mt-6 w-8 h-8 rounded-full flex items-center justify-center text-red-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div>
                <label className="block text-[12px] font-bold text-slate-700 mb-1">Skills (Comma separated)</label>
                <textarea
                  value={cat.items.join(', ')}
                  onChange={(e) => handleItemsChange(idx, e.target.value)}
                  placeholder="e.g. React, Node.js, TypeScript"
                  rows={2}
                  className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:border-primary text-[13px] font-medium text-slate-700 resize-y bg-white"
                />
                {cat.items.length > 7 && (
                  <p className="text-red-500 text-[11px] font-bold mt-1">Warning: Over 7 items. Recruiters skim past long lists.</p>
                )}
              </div>
            </div>
          </div>
        ))}

        <Button onClick={addCategory} variant="outline" className="w-full h-12 rounded-xl border-dashed border-2 border-slate-200 text-slate-500 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all" leftIcon={<Plus className="w-4 h-4" />}>
          Add Skill Category
        </Button>

        <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
          <Button onClick={handleSave} disabled={isLoading} className="h-11 px-6 rounded-xl font-bold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 min-w-[160px]">
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Final Save'}
          </Button>
          <Button onClick={() => setShowPreview(true)} variant="outline" className="h-11 px-6 rounded-xl font-bold text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors min-w-[160px]">
            Preview
          </Button>
          {onCancel && (
            <button onClick={onCancel} className="h-11 px-6 rounded-xl font-bold text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors">
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
