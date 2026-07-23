import { useState } from 'react'
import { Plus, Trash2, Briefcase, Building2, MapPin, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'react-hot-toast'

export function EmploymentForm({ profile, setProfile }: { profile: any, setProfile: (p: any) => void }) {
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(false)
  const masterData = profile?.master_resume_data || {}
  
  const [employmentList, setEmploymentList] = useState<any[]>(masterData.employment || [])

  const handleAdd = () => {
    setEmploymentList([...employmentList, {
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      current: false,
      location: '',
      responsibilities: ''
    }])
  }

  const handleRemove = (index: number) => {
    setEmploymentList(employmentList.filter((_, i) => i !== index))
  }

  const handleChange = (index: number, field: string, value: any) => {
    const newList = [...employmentList]
    newList[index][field] = value
    setEmploymentList(newList)
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const newMasterData = {
        ...masterData,
        employment: employmentList
      }

      const updates = {
        master_resume_data: newMasterData
      }

      const { error } = await supabase
        .from('profiles')
        .upsert({ 
          id: profile.id, 
          email: profile.email,
          ...updates 
        })

      if (error) throw error

      setProfile({ ...profile, ...updates })
      toast.success('Employment history saved!')
    } catch (error: any) {
      toast.error(error.message || 'Failed to save employment')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-[18px] font-black text-slate-900 mb-1">Employment Details</h2>
          <p className="text-[13px] font-medium text-slate-500">Detail your past employment, roles, and responsibilities.</p>
        </div>
        <Button onClick={handleAdd} className="h-9 px-4 text-[13px] font-bold rounded-xl shadow-sm hover:shadow-md shadow-primary/20" leftIcon={<Plus className="w-4 h-4" />}>
          Add Employment
        </Button>
      </div>

      <div className="space-y-8">
        {employmentList.map((job, index) => (
          <div key={index} className="relative group p-6 rounded-2xl border border-slate-200 hover:border-primary/50 bg-slate-50/50 transition-colors">
            <button onClick={() => handleRemove(index)} className="absolute -top-3 -right-3 w-8 h-8 bg-white border border-slate-200 hover:border-red-500 hover:text-red-500 text-slate-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm">
              <Trash2 className="w-4 h-4" />
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">Job Title <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    value={job.title}
                    onChange={(e) => handleChange(index, 'title', e.target.value)}
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[14px] font-medium text-slate-900 transition-colors bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">Company Name <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    value={job.company}
                    onChange={(e) => handleChange(index, 'company', e.target.value)}
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[14px] font-medium text-slate-900 transition-colors bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">Start Date</label>
                <input 
                  type="month" 
                  value={job.startDate}
                  onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[14px] font-medium text-slate-900 transition-colors bg-white"
                />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">End Date</label>
                <input 
                  type="month" 
                  value={job.endDate}
                  onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                  disabled={job.current}
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[14px] font-medium text-slate-900 transition-colors bg-white disabled:bg-slate-100 disabled:text-slate-400"
                />
                <div className="mt-2 flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id={`currentRole-${index}`} 
                    checked={job.current}
                    onChange={(e) => handleChange(index, 'current', e.target.checked)}
                    className="rounded border-slate-300 text-primary focus:ring-primary w-4 h-4" 
                  />
                  <label htmlFor={`currentRole-${index}`} className="text-[12.5px] font-medium text-slate-600">I currently work here</label>
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    value={job.location}
                    onChange={(e) => handleChange(index, 'location', e.target.value)}
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[14px] font-medium text-slate-900 transition-colors bg-white"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-slate-700 mb-2">Responsibilities & Achievements</label>
              <textarea 
                rows={5}
                value={job.responsibilities}
                onChange={(e) => handleChange(index, 'responsibilities', e.target.value)}
                className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[14px] font-medium text-slate-700 transition-colors resize-none leading-relaxed bg-white"
              ></textarea>
            </div>
          </div>
        ))}

        <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
          <Button onClick={handleSave} disabled={isLoading} className="h-11 px-6 rounded-xl font-bold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30">
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Changes'}
          </Button>
          <button className="h-11 px-6 rounded-xl font-bold text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors">
            Cancel
          </button>
        </div>

      </div>
    </div>
  )
}
