import { useState } from 'react'
import { Plus, Trash2, Award, Building2, ExternalLink, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'react-hot-toast'
import { formatMonthYear } from '@/utils/dateFormatter'

export function CertificationsForm({ 
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
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
      
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-[18px] font-black text-slate-900 mb-1">Certifications</h2>
          <p className="text-[13px] font-medium text-slate-500">Add any relevant certifications or licenses you hold.</p>
        </div>
        <Button onClick={handleAdd} className="h-9 px-4 text-[13px] font-bold rounded-xl shadow-sm hover:shadow-md shadow-primary/20" leftIcon={<Plus className="w-4 h-4" />}>
          Add Certification
        </Button>
      </div>

      <div className="space-y-8">
        
        {certList.map((cert, index) => (
          <div key={index} className="relative group p-6 rounded-2xl border border-slate-200 hover:border-primary/50 bg-slate-50/50 transition-colors">
            <button
              onClick={() => handleRemove(index)}
              className="absolute -top-3 -right-3 w-8 h-8 bg-white border border-slate-200 hover:border-red-500 hover:text-red-500 text-slate-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">
                  Certification Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Award className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    value={cert.name}
                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                    placeholder="e.g. AWS Certified Solutions Architect"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[14px] font-medium text-slate-900 transition-colors bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">
                  Issuing Organization <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    value={cert.organization}
                    onChange={(e) => handleChange(index, 'organization', e.target.value)}
                    placeholder="e.g. Amazon Web Services"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[14px] font-medium text-slate-900 transition-colors bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-[13px] font-bold text-slate-700 mb-2">
                    Issue Date
                  </label>
                  <input 
                    type="text" 
                    placeholder="MM/YYYY"
                    value={cert.issueDate}
                    onChange={(e) => handleChange(index, 'issueDate', formatMonthYear(e.target.value))}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[14px] font-medium text-slate-900 transition-colors bg-white"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[13px] font-bold text-slate-700 mb-2">
                    Expiration Date
                  </label>
                  <input 
                    type="text" 
                    placeholder="MM/YYYY"
                    value={cert.expiryDate}
                    onChange={(e) => handleChange(index, 'expiryDate', formatMonthYear(e.target.value))}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[14px] font-medium text-slate-900 transition-colors bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">
                  Credential URL
                </label>
                <div className="relative">
                  <ExternalLink className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="url" 
                    value={cert.credentialUrl}
                    onChange={(e) => handleChange(index, 'credentialUrl', e.target.value)}
                    placeholder="https://..."
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[14px] font-medium text-slate-900 transition-colors bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {certList.length === 0 && (
          <div className="text-center py-10 px-4 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
            <p className="text-[14px] font-medium text-slate-500 mb-4">No certifications added yet.</p>
            <Button onClick={handleAdd} variant="outline" className="h-9 px-4 text-[13px] font-bold rounded-xl text-slate-700" leftIcon={<Plus className="w-4 h-4" />}>
              Add Your First Certification
            </Button>
          </div>
        )}

        <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
          <Button onClick={handleSave} disabled={isLoading} className="h-11 px-6 rounded-xl font-bold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 min-w-[160px]">
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
