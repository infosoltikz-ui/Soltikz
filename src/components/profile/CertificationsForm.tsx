import { useState } from 'react'
import { Plus, Trash2, Award, Building2, ExternalLink, Loader2 } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'react-hot-toast'
import { formatMonthYear } from '@/utils/dateFormatter'

export function CertificationsForm({
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

  const [certList, setCertList] = useState<any[]>(masterData.certifications || [])

  const handleAdd = () => {
    setCertList([...certList, {
      name: '',
      organization: '',
      issueDate: '',
      expiryDate: '',
      credentialUrl: ''
    }])
  }

  const handleRemove = (index: number) => {
    setCertList(certList.filter((_, i) => i !== index))
  }

  const handleChange = (index: number, field: string, value: string) => {
    const newList = [...certList]
    newList[index][field] = value
    setCertList(newList)
  }

  const handleSave = async () => {
    if (!profile?.id) return
    setIsLoading(true)
    try {
      const newMasterData = {
        ...masterData,
        certifications: certList
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
        toast.success('Certifications saved!')
      }
      if (onNext) onNext()
    } catch (error: any) {
      toast.error(error.message || 'Failed to save certifications')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Card Header */}
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-bold text-slate-900">Professional Certifications &amp; Licenses</h2>
          <p className="text-[12px] text-slate-500 font-medium">Add verified industry credentials, cloud certifications, and technical licenses.</p>
        </div>
        <button 
          onClick={handleAdd} 
          className="h-8 px-3 text-[12px] font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 rounded-lg inline-flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 text-primary" />
          Add Certification
        </button>
      </div>

      <div className="px-6 py-6 space-y-5">
        {certList.length === 0 ? (
          <div className="py-8 text-center border-2 border-dashed border-slate-200 rounded-lg">
            <Award className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-[13px] font-semibold text-slate-700">No certifications added yet</p>
            <p className="text-[11px] text-slate-500 mb-3">Add verified credentials like AWS, PMP, CKAD, or Google Cloud.</p>
            <button
              onClick={handleAdd}
              className="h-8 px-3.5 text-[12px] font-semibold bg-primary text-white rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add First Certification
            </button>
          </div>
        ) : (
          certList.map((cert, index) => (
            <div key={index} className="p-5 rounded-lg border border-slate-200 bg-slate-50/40 hover:bg-slate-50/70 transition-colors space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Certification #{index + 1}
                </span>
                <button 
                  onClick={() => handleRemove(index)} 
                  className="p-1 text-slate-400 hover:text-red-600 transition-colors rounded hover:bg-white cursor-pointer"
                  title="Remove certification"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">
                    Certification Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="e.g. AWS Certified Solutions Architect"
                      value={cert.name}
                      onChange={(e) => handleChange(index, 'name', e.target.value)}
                      className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[13px] font-medium text-slate-900 transition-colors placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">
                    Issuing Organization <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="e.g. Amazon Web Services (AWS)"
                      value={cert.organization}
                      onChange={(e) => handleChange(index, 'organization', e.target.value)}
                      className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[13px] font-medium text-slate-900 transition-colors placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Issue Date</label>
                  <input 
                    type="text" 
                    placeholder="MM/YYYY"
                    value={cert.issueDate}
                    onChange={(e) => handleChange(index, 'issueDate', formatMonthYear(e.target.value))}
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[13px] font-medium text-slate-900 transition-colors placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Expiration Date</label>
                  <input 
                    type="text" 
                    placeholder="MM/YYYY or Never"
                    value={cert.expiryDate}
                    onChange={(e) => handleChange(index, 'expiryDate', formatMonthYear(e.target.value))}
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[13px] font-medium text-slate-900 transition-colors placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Credential URL / Verification ID</label>
                  <input 
                    type="text" 
                    placeholder="https://..."
                    value={cert.credentialUrl}
                    onChange={(e) => handleChange(index, 'credentialUrl', e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[13px] font-medium text-slate-900 transition-colors placeholder:text-slate-400"
                  />
                </div>
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
