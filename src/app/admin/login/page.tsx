'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowRight, Lock, Shield, Server, FileText, BarChart3, Database, ArrowLeft, Key, Activity, Fingerprint } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import Link from 'next/link'

export default function AdminLoginPage() {
  const [step, setStep] = useState<'email' | 'otp'>('email')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
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

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault()
    // Verify OTP logic
  }

  return (
    <div className="min-h-screen flex bg-white font-sans text-slate-900">
      
      {/* Left Side - 55% - Futuristic AI Illustration */}
      <div className="hidden lg:flex lg:w-[55%] bg-[#FAFAF8] relative overflow-hidden flex-col items-center justify-center p-12">
        {/* Decorative Grid & Glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-60 mix-blend-multiply"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl opacity-60 mix-blend-multiply"></div>
        
        {/* Floating UI Composition */}
        <div className="relative w-full max-w-2xl aspect-square flex items-center justify-center">
          
          {/* Connecting SVG Lines */}
          <svg className="absolute inset-0 w-full h-full stroke-slate-200" style={{ zIndex: 0 }}>
            <path d="M 200 300 C 300 200, 400 400, 500 300" fill="none" strokeWidth="2" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite]" />
            <path d="M 150 500 C 250 600, 500 500, 600 600" fill="none" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M 600 200 C 500 150, 400 300, 300 200" fill="none" strokeWidth="2" strokeDasharray="4 4" />
          </svg>

          {/* Central AI Node */}
          <div className="absolute z-10 w-32 h-32 bg-white rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-100 flex items-center justify-center transform -rotate-3 animate-[float_6s_ease-in-out_infinite]">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center relative">
              <div className="absolute inset-0 bg-primary/20 rounded-2xl animate-ping opacity-25"></div>
              <Server className="w-8 h-8 text-primary" strokeWidth={2} />
            </div>
          </div>

          {/* Floating Card 1: Resume Analysis */}
          <div className="absolute top-12 left-8 z-10 w-64 bg-white/80 backdrop-blur-xl rounded-2xl p-5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-white transform rotate-3 animate-[float_7s_ease-in-out_infinite_1s]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-orange-500" strokeWidth={2.5} />
              </div>
              <div>
                <div className="text-[13px] font-black text-slate-900">ATS Engine Scanning</div>
                <div className="text-[11px] font-bold text-slate-400">Processing 1,204 resumes</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-[85%] h-full bg-orange-500 rounded-full"></div>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-[60%] h-full bg-primary rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Floating Card 2: Analytics */}
          <div className="absolute bottom-24 left-12 z-10 w-56 bg-white/80 backdrop-blur-xl rounded-2xl p-5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-white transform -rotate-6 animate-[float_8s_ease-in-out_infinite_0.5s]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                <BarChart3 className="w-5 h-5 text-primary" strokeWidth={2.5} />
              </div>
              <div>
                <div className="text-[13px] font-black text-slate-900">Conversion Rate</div>
                <div className="text-[11px] font-bold text-primary">+12.5% this week</div>
              </div>
            </div>
            <div className="h-12 w-full flex items-end gap-1.5">
              {[40, 70, 45, 90, 65, 100, 80].map((h, i) => (
                <div key={i} className="flex-1 bg-slate-200 rounded-t-sm" style={{ height: `${h}%` }}>
                  <div className="w-full h-full bg-primary/20 rounded-t-sm transition-all"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating Card 3: Security */}
          <div className="absolute top-32 right-12 z-10 w-60 bg-white/80 backdrop-blur-xl rounded-2xl p-5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-white transform rotate-6 animate-[float_6.5s_ease-in-out_infinite_1.5s]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-blue-500" strokeWidth={2.5} />
              </div>
              <div>
                <div className="text-[13px] font-black text-slate-900">Zero-Trust Network</div>
                <div className="text-[11px] font-bold text-slate-400">Encrypted traffic</div>
              </div>
            </div>
            <div className="mt-4 flex gap-1">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-blue-500/50"></div>
              <div className="w-2 h-2 rounded-full bg-blue-500/50"></div>
            </div>
          </div>

          {/* Floating Card 4: Database */}
          <div className="absolute bottom-40 right-4 z-10 w-48 bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-white transform -rotate-3 animate-[float_7.5s_ease-in-out_infinite_2s]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                <Database className="w-4 h-4 text-slate-600" strokeWidth={2.5} />
              </div>
              <div>
                <div className="text-[12px] font-black text-slate-900">Cloud Sync</div>
                <div className="text-[10px] font-bold text-slate-400">99.99% Uptime</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Right Side - 45% - Login Form */}
      <div className="w-full lg:w-[45%] flex flex-col items-center justify-center p-8 sm:p-16 relative">
        
        {/* Top Right Version Tag */}
        <div className="absolute top-8 right-8 px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-[11px] font-bold text-slate-500">
          Admin Portal v2.0
        </div>

        <div className="w-full max-w-[400px]">
          {/* Logo */}
          <div className="flex justify-center lg:justify-start mb-10">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-[12px] flex items-center justify-center shadow-lg shadow-primary/20">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-black tracking-tight text-slate-900 leading-none">Soltikz</div>
                <div className="text-[10px] font-black text-orange-500 uppercase tracking-widest mt-0.5">Enterprise</div>
              </div>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
              Admin Portal
            </h1>
            <p className="text-[15px] font-medium text-slate-500 leading-relaxed">
              Secure administrator access to the Soltikz AI ATS Resume Builder infrastructure.
            </p>
          </div>

          {/* Dynamic Form Area */}
          <div className="relative">
            {step === 'email' ? (
              <form onSubmit={handleSendOTP} className="space-y-5 animate-in slide-in-from-right-4 fade-in duration-300">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-[13px] font-bold text-slate-700 block">
                    Email Address
                  </label>
                  <Input 
                    id="email"
                    type="email" 
                    placeholder="Enter your authorized email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 bg-slate-50/50 border-slate-200 focus:bg-white text-[15px] rounded-xl"
                  />
                </div>
                <Button type="submit" className="w-full h-12 text-[15px] font-bold rounded-xl shadow-lg shadow-primary/20 group">
                  Send OTP
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-[15px] font-bold text-slate-900 mb-1">Enter Security Code</h3>
                      <p className="text-[13px] font-medium text-slate-500">Sent to <strong className="text-slate-900">{email}</strong></p>
                    </div>
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <Lock className="w-5 h-5 text-primary" strokeWidth={2.5} />
                    </div>
                  </div>
                  
                  <div className="flex justify-between gap-2 sm:gap-3 mb-6">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={digit}
                        ref={(el) => { otpRefs.current[index] = el }}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-10 sm:w-12 h-12 sm:h-14 text-center text-xl font-black text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                      />
                    ))}
                  </div>

                  <Button type="submit" className="w-full h-12 text-[15px] font-bold rounded-xl shadow-lg shadow-primary/20">
                    Verify & Authenticate
                  </Button>

                  <div className="mt-5 flex items-center justify-between text-[13px] font-bold">
                    <button type="button" onClick={() => setStep('email')} className="text-slate-500 hover:text-slate-900 flex items-center gap-1.5 transition-colors">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button type="button" className="text-primary hover:text-primary/80 transition-colors">
                      Resend Code
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Security Features */}
          <div className="mt-12 grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-4 rounded-xl bg-slate-50 border border-slate-100">
              <Shield className="w-5 h-5 text-slate-400 mb-2" />
              <div className="text-[12px] font-black text-slate-900">Authorized Only</div>
              <div className="text-[11px] font-bold text-slate-500 mt-0.5">Strict RBAC controls</div>
            </div>
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-4 rounded-xl bg-slate-50 border border-slate-100">
              <Fingerprint className="w-5 h-5 text-slate-400 mb-2" />
              <div className="text-[12px] font-black text-slate-900">Encrypted Auth</div>
              <div className="text-[11px] font-bold text-slate-500 mt-0.5">End-to-end security</div>
            </div>
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-4 rounded-xl bg-slate-50 border border-slate-100">
              <Key className="w-5 h-5 text-slate-400 mb-2" />
              <div className="text-[12px] font-black text-slate-900">OTP Protected</div>
              <div className="text-[11px] font-bold text-slate-500 mt-0.5">Multi-factor required</div>
            </div>
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-4 rounded-xl bg-slate-50 border border-slate-100">
              <Activity className="w-5 h-5 text-slate-400 mb-2" />
              <div className="text-[12px] font-black text-slate-900">Activity Monitor</div>
              <div className="text-[11px] font-bold text-slate-500 mt-0.5">Audit logging active</div>
            </div>
          </div>

        </div>
        
        {/* Footer */}
        <div className="absolute bottom-8 left-0 right-0 px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] font-bold text-slate-400">
          <div>&copy; {new Date().getFullYear()} Soltikz. All rights reserved.</div>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-slate-600 transition-colors">Support</Link>
          </div>
        </div>

      </div>

    </div>
  )
}
