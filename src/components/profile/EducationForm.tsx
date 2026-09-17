import { useState } from 'react'
import { Plus, Trash2, GraduationCap, Building, Loader2 } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'react-hot-toast'
import { formatMonthYear } from '@/utils/dateFormatter'

export function EducationForm({
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
  
  const [educationList, setEducationList] = useState<any[]>(masterData.education || [])

  const handleAdd = () => {
    setEducationList([...educationList, {
      degree: 'Bachelors',
      institution: '',
      startDate: '',
      endDate: '',
      grade: '',
      description: ''
    }])
  }

  const handleRemove = (index: number) => {
    setEducationList(educationList.filter((_, i) => i !== index))
  }

  const handleChange = (index: number, field: string, value: string) => {
    const newList = [...educationList]
    newList[index][field] = value
    setEducationList(newList)
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const newMasterData = {
        ...masterData,
        education: educationList
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
        toast.success('Education history saved!')
      }
      if (onNext) onNext()
    } catch (error: any) {
      toast.error(error.message || 'Failed to save education')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Card Header */}
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-bold text-slate-900">Education &amp; Academic Qualifications</h2>
          <p className="text-[12px] text-slate-500 font-medium">Add degrees, universities, graduation dates, and academic honors.</p>
        </div>
        <button 
          onClick={handleAdd} 
          className="h-8 px-3 text-[12px] font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 rounded-lg inline-flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 text-primary" />
          Add Education
        </button>
      </div>

      <div className="px-6 py-6 space-y-5">
        {educationList.length === 0 ? (
          <div className="py-8 text-center border-2 border-dashed border-slate-200 rounded-lg">
            <GraduationCap className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-[13px] font-semibold text-slate-700">No education records added yet</p>
            <p className="text-[11px] text-slate-500 mb-3">Click &quot;Add Education&quot; to list your degrees.</p>
            <button
              onClick={handleAdd}
              className="h-8 px-3.5 text-[12px] font-semibold bg-primary text-white rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add First Degree
            </button>
          </div>
        ) : (
          educationList.map((edu, index) => (
            <div key={index} className="p-5 rounded-lg border border-slate-200 bg-slate-50/40 hover:bg-slate-50/70 transition-colors space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Degree / Program #{index + 1}
                </span>
                <button 
                  onClick={() => handleRemove(index)} 
                  className="p-1 text-slate-400 hover:text-red-600 transition-colors rounded hover:bg-white cursor-pointer"
                  title="Remove this record"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">
                    Degree / Qualification <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="e.g. B.S. in Computer Science"
                      value={edu.degree}
                      onChange={(e) => handleChange(index, 'degree', e.target.value)}
                      className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[13px] font-medium text-slate-900 transition-colors placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">
                    School / University <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="e.g. University of California, Berkeley"
                      value={edu.institution}
                      onChange={(e) => handleChange(index, 'institution', e.target.value)}
                      className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[13px] font-medium text-slate-900 transition-colors placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Start Date</label>
                  <input 
                    type="text" 
                    placeholder="MM/YYYY"
                    value={edu.startDate}
                    onChange={(e) => handleChange(index, 'startDate', formatMonthYear(e.target.value))}
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[13px] font-medium text-slate-900 transition-colors placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">End Date</label>
                  <input 
                    type="text" 
                    placeholder="MM/YYYY"
                    value={edu.endDate}
                    onChange={(e) => handleChange(index, 'endDate', formatMonthYear(e.target.value))}
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[13px] font-medium text-slate-900 transition-colors placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Grade / GPA (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 3.8 / 4.0"
                    value={edu.grade}
                    onChange={(e) => handleChange(index, 'grade', e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[13px] font-medium text-slate-900 transition-colors placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Honors &amp; Relevant Coursework</label>
                <textarea 
                  rows={2}
                  value={edu.description}
                  onChange={(e) => handleChange(index, 'description', e.target.value)}
                  placeholder="e.g. Dean's Honor List, Capstone Project in Distributed Systems..."
                  className="w-full p-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[13px] font-medium text-slate-800 transition-colors leading-relaxed placeholder:text-slate-400"
                ></textarea>
              </div>
            </div>
          ))
        )}

        <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
          <button 
            onClick={handleSave} 
            disabled={isLoading} 
            className="h-9 px-6 rounded-lg font-semibold text-[13px] bg-primary text-white hover:bg-primary-dark shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save & Continue'}
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
    </div>
  )
}
