"use client";
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle2, Zap } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'
import { useGoogleLogin } from '@react-oauth/google'

const plans = [
  { id: 'free', label: 'Free', desc: 'Get started', price: '$0' },
  { id: 'pro', label: 'Pro', desc: 'Most popular', price: '$9.99', badge: true },
]

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('free')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [agreed, setAgreed] = useState(false)

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log('Google login success:', tokenResponse);
      // In a real app, send the token to your backend here
      alert('Google Signup Successful! Check console for token.');
    },
    onError: () => {
      console.error('Google login failed');
      alert('Google Signup Failed');
    },
  });

  const passwordStrength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3
  const strengthColors = ['', 'bg-red-400', 'bg-yellow-400', 'bg-primary']
  const strengthLabels = ['', 'Weak', 'Fair', 'Strong']

  return (
    <div className="min-h-screen flex">

      {/* ── Left Panel (Image) ─────────────────────────── */}
      <div className="hidden lg:flex lg:w-[44%] xl:w-[48%] relative overflow-hidden bg-white items-center justify-center border-r border-slate-100">
        <img
          src="/login side pannel image.png"
          alt="Soltkiz - Build Resumes That Actually Get Results"
          className="w-full h-full object-contain p-4 lg:p-8"
        />
      </div>

      {/* ── Right Panel (Form) ─────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-14 xl:px-20 bg-white overflow-y-auto">



        {/* Mobile Logo */}
        <div className="lg:hidden mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-xl font-black text-slate-900">Soltkiz</span>
          </Link>
        </div>

        <div className="w-full max-w-md mx-auto">

          {/* Back to Home */}
          <div className="mb-6">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </div>

          {/* Header */}
          <div className="mb-7">
            <h1 className="text-3xl font-black text-slate-900 mb-2">Create your account 🚀</h1>
            <p className="text-slate-500 font-medium">Free forever. Upgrade when you're ready.</p>
          </div>

          {/* Plan Toggle */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {plans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={cn(
                  "relative flex flex-col items-start p-4 rounded-xl border-2 transition-all text-left",
                  selectedPlan === plan.id
                    ? "border-primary bg-primary/5"
                    : "border-slate-200 bg-white hover:border-primary/40"
                )}
              >
                {plan.badge && (
                  <div className="absolute -top-2.5 right-3 bg-accent text-white text-[10px] font-black px-2.5 py-0.5 rounded-full">
                    Popular
                  </div>
                )}
                <div className="flex items-center gap-2 mb-1">
                  <div className={cn(
                    "w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0",
                    selectedPlan === plan.id ? "border-primary bg-primary" : "border-slate-300"
                  )}>
                    {selectedPlan === plan.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <span className="text-sm font-black text-slate-900">{plan.label}</span>
                </div>
                <div className="text-[11px] font-medium text-slate-500">{plan.desc}</div>
                <div className={cn("text-lg font-black mt-1", selectedPlan === plan.id ? "text-primary" : "text-slate-700")}>
                  {plan.price}<span className="text-xs font-bold text-slate-400">/mo</span>
                </div>
              </button>
            ))}
          </div>

          {/* Social Signup */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button 
              onClick={() => loginWithGoogle()}
              className="flex items-center justify-center gap-2.5 h-11 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors font-bold text-slate-700 text-sm shadow-sm hover:shadow-md"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2.5 h-11 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors font-bold text-slate-700 text-sm shadow-sm hover:shadow-md">
              <svg className="w-4 h-4" fill="#0A66C2" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-4 bg-white text-slate-400 font-bold uppercase tracking-widest">or with email</span>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>

            {/* Name */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="reg-name">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  id="reg-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="reg-email">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  id="reg-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="reg-password">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  className="w-full h-12 pl-11 pr-12 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:bg-white transition-all"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {/* Strength Meter */}
              {password.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 flex gap-1">
                    {[1,2,3].map((i) => (
                      <div key={i} className={cn("h-1.5 flex-1 rounded-full transition-all duration-300", i <= passwordStrength ? strengthColors[passwordStrength] : 'bg-slate-200')} />
                    ))}
                  </div>
                  <span className={cn("text-[11px] font-bold", passwordStrength === 1 ? 'text-red-500' : passwordStrength === 2 ? 'text-yellow-500' : 'text-primary')}>
                    {strengthLabels[passwordStrength]}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="reg-confirm">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  id="reg-confirm"
                  type={showConfirm ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Repeat your password"
                  className={cn(
                    "w-full h-12 pl-11 pr-12 rounded-xl border bg-slate-50 text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:bg-white transition-all",
                    confirm.length > 0 && confirm !== password
                      ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                      : confirm.length > 0 && confirm === password
                      ? "border-primary focus:ring-primary/30 focus:border-primary"
                      : "border-slate-200 focus:ring-primary/30 focus:border-primary"
                  )}
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                {confirm.length > 0 && confirm === password && (
                  <CheckCircle2 className="absolute right-10 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                )}
              </div>
              {confirm.length > 0 && confirm !== password && (
                <p className="mt-1.5 text-xs font-medium text-red-500">Passwords do not match</p>
              )}
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative mt-0.5">
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="sr-only peer" />
                <div className="w-5 h-5 rounded-md border-2 border-slate-300 peer-checked:bg-primary peer-checked:border-primary transition-all group-hover:border-primary/50" />
                <svg className="absolute top-0.5 left-0.5 w-4 h-4 text-white hidden peer-checked:block pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span className="text-sm font-medium text-slate-600 leading-snug">
                I agree to the{' '}
                <Link href="/terms" className="font-bold text-primary hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" className="font-bold text-primary hover:underline">Privacy Policy</Link>
              </span>
            </label>

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              className="w-full font-bold text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all mt-2"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Create Free Account
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm font-medium text-slate-500 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-primary hover:text-primary-hover transition-colors">
              Sign in →
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}
