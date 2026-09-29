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
    <div className="min-h-screen flex items-center justify-center relative bg-[#FAFAF8] overflow-hidden selection:bg-emerald-500/20">
      
      {/* Ultra-Premium Animated Mesh Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-emerald-400/10 rounded-full blur-[120px] mix-blend-multiply animate-[pulse_8s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-teal-400/10 rounded-full blur-[120px] mix-blend-multiply animate-[pulse_10s_ease-in-out_infinite_alternate]"></div>
        <div className="absolute top-[30%] left-[60%] w-[30%] h-[30%] bg-blue-400/5 rounded-full blur-[100px] mix-blend-multiply"></div>
        
        {/* Subtle grid texture overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000004_1px,transparent_1px),linear-gradient(to_bottom,#00000004_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>
      <div className="relative z-10 w-full max-w-[460px] px-4">
        
        {/* Floating Glassmorphism Card */}
        <div className="bg-white/70 backdrop-blur-3xl rounded-[32px] p-8 sm:p-12 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] border border-white/60 relative animate-in zoom-in-95 fade-in duration-700 overflow-hidden">
          
          {/* Top highlight glow */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></div>

          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-16 h-16 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-2xl flex items-center justify-center shadow-[0_10px_20px_-10px_rgba(16,185,129,0.5)] mb-6 relative group cursor-default">
              <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <ShieldCheck className="w-8 h-8 text-white relative z-10" strokeWidth={2} />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Soltkiz Workspace</h1>
            <p className="text-[15px] text-slate-500 font-medium">Secure administrator authentication</p>
          </div>

          <div className="relative">
            {step === 'email' ? (
              <form onSubmit={handleSendOTP} className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
                <div className="space-y-2">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-emerald-500">
                      <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                    </div>
                    <input 
                      id="email"
                      type="email" 
                      placeholder="Enter master email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full h-14 pl-12 pr-4 bg-white/50 border-2 border-slate-100 focus:border-emerald-500 focus:bg-white text-slate-900 placeholder-slate-400 text-[15px] font-semibold rounded-2xl outline-none transition-all shadow-sm focus:shadow-[0_0_0_4px_rgba(16,185,129,0.1)]"
                    />
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isLoading} 
                  className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white text-[15px] font-black rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                  {isLoading ? 'Verifying Identity...' : 'Request Secure Access'}
                  {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={3} />}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 mb-4">
                    <Key className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-1">Enter Security Token</h3>
                  <p className="text-[14px] font-medium text-slate-500 leading-relaxed">
                    Sent to <strong className="text-slate-900">{email}</strong>
                  </p>
                </div>
                
                <div className="flex justify-between gap-2 mb-8">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={digit}
                      ref={(el) => { otpRefs.current[index] = el }}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-12 h-14 sm:w-[52px] sm:h-[60px] text-center text-2xl font-black text-slate-900 bg-white/50 border-2 border-slate-100 rounded-2xl focus:border-emerald-500 focus:bg-white outline-none transition-all shadow-sm focus:shadow-[0_0_0_4px_rgba(16,185,129,0.1)]"
                    />
                  ))}
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading} 
                  className="w-full h-14 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-[15px] font-black rounded-2xl shadow-[0_10px_20px_-10px_rgba(16,185,129,0.6)] flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-0.5"
                >
                  {isLoading ? 'Authenticating...' : 'Verify Token'}
                </button>

                <div className="mt-6 flex items-center justify-between text-[13px] font-bold">
                  <button type="button" onClick={() => setStep('email')} className="text-slate-400 hover:text-slate-700 flex items-center gap-1.5 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button type="button" className="text-emerald-600 hover:text-emerald-700 transition-colors">
                    Resend Code
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footer Link */}
        <div className="mt-8 text-center animate-in fade-in duration-1000 delay-300">
          <Link href="/login" className="inline-flex items-center gap-2 text-[13px] font-bold text-slate-400 hover:text-slate-600 transition-colors bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/50 shadow-sm">
            <ArrowLeft className="w-3.5 h-3.5" /> Return to User App
          </Link>
        </div>
      </div>
    </div>
  )
}
