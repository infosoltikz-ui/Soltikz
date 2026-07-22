'use client'

import { useState, useRef } from 'react'
import { ArrowRight, Lock, ShieldCheck, ArrowLeft, Key, Terminal, Cpu } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

const ADMIN_EMAILS = [
  'info.soltikz@gmail.com',
  'balajiprojects049@gmail.com'
]

export default function AdminLoginPage() {
  const [step, setStep] = useState<'email' | 'otp'>('email')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])
  const router = useRouter()

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!ADMIN_EMAILS.includes(email.toLowerCase().trim())) {
      toast.error('Unauthorized email address.')
      return
    }

    setIsLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false
      }
    })
    setIsLoading(false)

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Security token transmitted.')
      setStep('otp')
    }
  }

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = otp.join('')
    if (token.length !== 6) {
      toast.error('Please enter all 6 digits.')
      return
    }

    setIsLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email'
    })
    setIsLoading(false)

    if (error) {
      toast.error(error.message)
    } else {
      router.push('/admin?login=success')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050B14] font-sans relative overflow-hidden selection:bg-primary/30">
      
      {/* Immersive Background Effects */}
      <div className="absolute inset-0 w-full h-full">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        
        {/* Glowing Orbs */}
        <div className="absolute top-[-10%] right-[10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen animate-[pulse_8s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-[-10%] left-[10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] mix-blend-screen animate-[pulse_10s_ease-in-out_infinite_alternate]"></div>
      </div>

      <div className="relative w-full max-w-[420px] p-6 z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Logo / Brand Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-14 h-14 bg-gradient-to-br from-primary to-green-600 p-[1px] rounded-2xl mb-5 shadow-[0_0_30px_-5px_rgba(34,197,94,0.4)]">
            <div className="w-full h-full bg-[#050B14] rounded-[15px] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/10"></div>
              <Terminal className="w-6 h-6 text-primary relative z-10" strokeWidth={2} />
            </div>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2">Soltkiz Admin</h1>
          <p className="text-[14px] text-slate-400 font-medium">Restricted access protocol</p>
        </div>

        {/* Main Glass Card */}
        <div className="bg-[#0B1221]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          {/* Shimmer effect */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          
          <div className="relative">
            {step === 'email' ? (
              <form onSubmit={handleSendOTP} className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-[13px] font-bold text-slate-400 block">
                    Admin Identifier
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <ShieldCheck className="h-5 w-5 text-slate-500" />
                    </div>
                    <input 
                      id="email"
                      type="email" 
                      placeholder="Enter master email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full h-12 pl-11 pr-4 bg-white/5 border border-white/10 focus:border-primary focus:bg-white/10 text-white placeholder-slate-500 text-[15px] rounded-xl outline-none transition-all"
                    />
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isLoading} 
                  className="w-full h-12 bg-primary hover:bg-green-500 text-[#050B14] text-[15px] font-black rounded-xl shadow-[0_0_20px_-5px_rgba(34,197,94,0.4)] flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {isLoading ? 'Establishing...' : 'Request Access'}
                  {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={3} />}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                    <Key className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-[16px] font-bold text-white mb-1">Authorization Required</h3>
                  <p className="text-[13px] font-medium text-slate-400">
                    Transmission sent to <strong className="text-white font-bold">{email}</strong>
                  </p>
                </div>
                
                <div className="flex justify-between gap-2 mb-6">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={digit}
                      ref={(el) => { otpRefs.current[index] = el }}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-10 sm:w-12 h-12 sm:h-14 text-center text-xl font-black text-white bg-white/5 border border-white/10 rounded-xl focus:border-primary focus:bg-white/10 outline-none transition-all"
                    />
                  ))}
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading} 
                  className="w-full h-12 bg-white text-[#050B14] hover:bg-slate-200 text-[15px] font-black rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Verifying...' : 'Verify Token'}
                </button>

                <div className="mt-4 flex items-center justify-between text-[13px] font-bold">
                  <button type="button" onClick={() => setStep('email')} className="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Abort
                  </button>
                  <button type="button" className="text-primary hover:text-green-400 transition-colors">
                    Resend Token
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-8 flex items-center justify-center gap-6 text-[12px] font-bold text-slate-500">
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" />
            <span>v2.0.4-core</span>
          </div>
          <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
          <div className="flex items-center gap-1.5 text-primary">
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-[pulse_2s_ease-in-out_infinite]"></div>
            <span>Systems Normal</span>
          </div>
        </div>

      </div>
    </div>
  )
}
