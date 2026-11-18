'use client'

import { useState, useEffect } from 'react'
import { User, Mail, Phone, Loader2 } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'react-hot-toast'
import { BottomActionBar } from '../BottomActionBar'

export function AccountTab() {
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setLoading(false)
        return
      }

      setUserId(user.id)
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, email, phone')
        .eq('id', user.id)
        .single()

      setFullName(profile?.full_name || user.user_metadata?.full_name || '')
      setEmail(profile?.email || user.email || '')
      setPhone(profile?.phone || '')
      setLoading(false)
    }
    loadProfile()
  }, [])

  const handleSave = async () => {
    if (!userId) return
    setSaving(true)
    const supabase = createClient()
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName, phone })
      .eq('id', userId)
    setSaving(false)

    if (error) {
      toast.error('Failed to save changes')
    } else {
      toast.success('Account details updated')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center p-24">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">

      {/* Personal Information */}
      <div className="bg-[#151D28] rounded-2xl border border-[#26313F] shadow-xs p-8">
        <h3 className="text-[16px] font-black text-[#E4EAF2] mb-1">Personal Information</h3>
        <p className="text-[13px] font-medium text-[#9FACBE] mb-6">This is the account-level info tied to your login. Resume content (experience, skills, etc.) lives in your Master Profile.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="space-y-2">
            <label className="text-[13px] font-bold text-[#C3CCD9]">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 w-4 h-4 text-[#78859A]" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                className="w-full h-10 pl-10 pr-4 rounded-xl border border-[#26313F] bg-[#1A2330] text-[14px] font-medium text-[#E4EAF2] placeholder:text-[#68768A] focus:outline-none focus:border-[#3FA57C] focus:bg-[#151D28] transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-bold text-[#C3CCD9]">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-[#78859A]" />
              <input
                type="email"
                value={email}
                disabled
                title="Contact support to change your login email"
                className="w-full h-10 pl-10 pr-4 rounded-xl border border-[#26313F] bg-[#1A2330]/50 text-[14px] font-medium text-[#78859A] cursor-not-allowed"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-bold text-[#C3CCD9]">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-3 w-4 h-4 text-[#78859A]" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="w-full h-10 pl-10 pr-4 rounded-xl border border-[#26313F] bg-[#1A2330] text-[14px] font-medium text-[#E4EAF2] placeholder:text-[#68768A] focus:outline-none focus:border-[#3FA57C] focus:bg-[#151D28] transition-all"
              />
            </div>
          </div>

        </div>
      </div>

      <BottomActionBar onSave={handleSave} saving={saving} />

    </div>
  )
}
