import { useState } from 'react'
import { Plus, Trash2, Briefcase, Building2, MapPin, Loader2, Globe } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'react-hot-toast'
import { formatMonthYear } from '@/utils/dateFormatter'
import { AutocompleteInput } from '@/components/ui/AutocompleteInput'
import { COUNTRIES, fetchLocations } from '@/utils/locationApi'

export function EmploymentForm({
  profile,
  setProfile,
  onNext,
  localMode,
  onLocalSave,
  onCancel,
  resumeType
}: {
  profile?: any,
  setProfile?: (p: any) => void,
  onNext?: () => void,
  localMode?: boolean,
  onLocalSave?: (profile: any) => void,
  onCancel?: () => void,
  resumeType?: 'c2c' | 'fulltime'
}) {
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
      country: '',
      location: '',
      responsibilities: '',
      client: '',
      environment: ''
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
        toast.success('Employment history saved!')
      }
      if (onNext) onNext()
    } catch (error: any) {
      toast.error(error.message || 'Failed to save employment')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-[#151D28] rounded-xl border border-[#26313F] shadow-sm overflow-hidden">
      {/* Card Header */}
      <div className="px-6 py-4 border-b border-[#26313F] bg-[#101722] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-bold text-[#E4EAF2]">Employment &amp; Career History</h2>
          <p className="text-[12px] text-[#9FACBE] font-medium">Add all past and current roles with measurable achievements.</p>
        </div>
        <button
          onClick={handleAdd}
          className="h-8 px-3 text-[12px] font-semibold bg-[#1A2330] hover:bg-[#222E3F] text-[#E4EAF2] border border-[#26313F] hover:border-[#3FA57C]/40 rounded-lg inline-flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 text-[#3FA57C]" />
          Add Experience
        </button>
      </div>

      <div className="px-6 py-6 space-y-5">
        {employmentList.length === 0 ? (
          <div className="py-8 text-center border-2 border-dashed border-[#26313F] bg-[#101722]/40 rounded-lg">
            <Briefcase className="w-8 h-8 text-[#78859A] mx-auto mb-2" />
            <p className="text-[13px] font-semibold text-[#E4EAF2]">No work experience listed yet</p>
            <p className="text-[11px] text-[#9FACBE] mb-3">Click &quot;Add Experience&quot; to begin detailing your employment history.</p>
            <button
              onClick={handleAdd}
              className="h-8 px-3.5 text-[12px] font-semibold bg-[#0A6E4E] hover:bg-[#0D8A62] text-white border border-[#3FA57C]/40 rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add First Role
            </button>
          </div>
        ) : (
          employmentList.map((job, index) => (
            <div key={index} className="p-5 rounded-lg border border-[#26313F] bg-[#1A2330]/50 hover:bg-[#1A2330]/80 transition-colors space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#26313F]">
                <span className="text-[11px] font-bold text-[#78859A] uppercase tracking-wider">
                  Position #{index + 1}
                </span>
                <button
                  onClick={() => handleRemove(index)}
                  className="p-1 text-[#78859A] hover:text-red-400 transition-colors rounded hover:bg-[#101722] cursor-pointer"
                  title="Remove this role"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-semibold text-[#C3CCD9] mb-1.5">
                    Job Title <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#78859A]" />
                    <input 
                      type="text" 
                      value={job.title}
                      onChange={(e) => handleChange(index, 'title', e.target.value)}
                      placeholder="e.g. Senior Frontend Engineer"
                      className="w-full h-10 pl-9 pr-3 rounded-lg border border-[#26313F] bg-[#1A2330] focus:outline-none focus:border-[#3FA57C] focus:ring-1 focus:ring-[#3FA57C] text-[13px] font-medium text-[#E4EAF2] transition-colors placeholder:text-[#68768A]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#C3CCD9] mb-1.5">
                    Company Name <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#78859A]" />
                    <input 
                      type="text" 
                      value={job.company}
                      onChange={(e) => handleChange(index, 'company', e.target.value)}
                      placeholder="e.g. Acme Corp"
                      className="w-full h-10 pl-9 pr-3 rounded-lg border border-[#26313F] bg-[#1A2330] focus:outline-none focus:border-[#3FA57C] focus:ring-1 focus:ring-[#3FA57C] text-[13px] font-medium text-[#E4EAF2] transition-colors placeholder:text-[#68768A]"
                    />
                  </div>
                </div>
              </div>

              {resumeType === 'c2c' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-semibold text-[#C3CCD9] mb-1.5">
                      End Client <span className="text-[#78859A] font-normal">(Optional)</span>
                    </label>
                    <input 
                      type="text" 
                      value={job.client || ''}
                      onChange={(e) => handleChange(index, 'client', e.target.value)}
                      placeholder="e.g. Apple, JP Morgan"
                      className="w-full h-10 px-3 rounded-lg border border-[#26313F] bg-[#1A2330] focus:outline-none focus:border-[#3FA57C] focus:ring-1 focus:ring-[#3FA57C] text-[13px] font-medium text-[#E4EAF2] transition-colors placeholder:text-[#68768A]"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-[#C3CCD9] mb-1.5">
                      Technical Environment <span className="text-[#78859A] font-normal">(Comma separated)</span>
                    </label>
                    <input 
                      type="text" 
                      value={job.environment || ''}
                      onChange={(e) => handleChange(index, 'environment', e.target.value)}
                      placeholder="e.g. React, Node.js, AWS, PostgreSQL"
                      className="w-full h-10 px-3 rounded-lg border border-[#26313F] bg-[#1A2330] focus:outline-none focus:border-[#3FA57C] focus:ring-1 focus:ring-[#3FA57C] text-[13px] font-medium text-[#E4EAF2] transition-colors placeholder:text-[#68768A]"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[12px] font-semibold text-[#C3CCD9] mb-1.5">Start Date</label>
                  <input 
                    type="text" 
                    placeholder="MM/YYYY"
                    value={job.startDate}
                    onChange={(e) => handleChange(index, 'startDate', formatMonthYear(e.target.value))}
                    className="w-full h-10 px-3 rounded-lg border border-[#26313F] bg-[#1A2330] focus:outline-none focus:border-[#3FA57C] focus:ring-1 focus:ring-[#3FA57C] text-[13px] font-medium text-[#E4EAF2] transition-colors placeholder:text-[#68768A]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#C3CCD9] mb-1.5">End Date</label>
                  <input 
                    type="text" 
                    placeholder="MM/YYYY"
                    value={job.endDate}
                    onChange={(e) => handleChange(index, 'endDate', formatMonthYear(e.target.value))}
                    disabled={job.current}
                    className="w-full h-10 px-3 rounded-lg border border-[#26313F] bg-[#1A2330] focus:outline-none focus:border-[#3FA57C] focus:ring-1 focus:ring-[#3FA57C] text-[13px] font-medium text-[#E4EAF2] transition-colors placeholder:text-[#68768A] disabled:bg-[#101722] disabled:text-[#68768A]"
                  />
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <input 
                      type="checkbox" 
                      id={`currentRole-${index}`} 
                      checked={job.current}
                      onChange={(e) => handleChange(index, 'current', e.target.checked)}
                      className="rounded border-[#26313F] text-[#0A6E4E] focus:ring-[#3FA57C] w-3.5 h-3.5 bg-[#1A2330]" 
                    />
                    <label htmlFor={`currentRole-${index}`} className="text-[11.5px] font-medium text-[#9FACBE] cursor-pointer">
                      I currently work here
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#C3CCD9] mb-1.5">Country</label>
                  <AutocompleteInput
                    name={`country-${index}`}
                    value={job.country || ''}
                    onChange={(val) => handleChange(index, 'country', val)}
                    staticOptions={COUNTRIES}
                    placeholder="e.g. United States"
                    icon={<Globe className="w-3.5 h-3.5 text-[#78859A]" />}
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#C3CCD9] mb-1.5">Location</label>
                  <AutocompleteInput
                    name={`location-${index}`}
                    value={job.location || ''}
                    onChange={(val) => handleChange(index, 'location', val)}
                    fetchOptions={fetchLocations}
                    placeholder="e.g. Dallas, TX"
                    icon={<MapPin className="w-3.5 h-3.5 text-[#78859A]" />}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#C3CCD9] mb-1.5">Responsibilities &amp; Measurable Achievements</label>
                <textarea 
                  rows={4}
                  value={job.responsibilities}
                  onChange={(e) => handleChange(index, 'responsibilities', e.target.value)}
                  placeholder="• Led the migration of legacy monolith to React/Next.js, improving page performance by 42%&#10;• Designed and deployed 15+ microservices handling 2M+ daily requests..."
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
