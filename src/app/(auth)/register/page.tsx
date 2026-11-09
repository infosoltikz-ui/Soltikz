"use client";
import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Star,
  Loader2
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { signup } from '../actions';

export default function RegisterPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleGoogleLogin = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          prompt: 'select_account',
        },
      },
    });

    if (error) {
      setErrorMsg(error.message);
    }
  };

  const passwordStrength =
    password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthColors = ['', 'bg-rose-500', 'bg-amber-500', 'bg-emerald-600'];
  const strengthLabels = ['', 'Weak (min 6 chars)', 'Fair (add numbers)', 'Strong'];

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');

    if (password !== confirm) {
      setErrorMsg('Passwords do not match');
      return;
    }

    if (!agreed) {
      setErrorMsg('Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);

      const result = await signup(formData);
      if (result?.error) {
        setErrorMsg(result.error);
      }
    });
  };

  return (
    <div className="min-h-screen flex bg-white font-sans text-slate-900">

      {/* ── LEFT SHOWCASE PANEL (Clean Warm Brand Showcase) ── */}
      <div className="hidden lg:flex lg:w-[48%] xl:w-[50%] bg-[#F8FAFC] relative overflow-hidden flex-col justify-between p-8 xl:p-12 border-r border-slate-200/80">

        {/* Top Brand Logo */}
        <div className="flex items-center justify-between z-10">
          <Link href="/" className="inline-flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/LOGO.png"
              alt="ResumeBuilderOne.com"
              className="h-14 sm:h-16 w-auto object-contain"
            />
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Free Forever Plan Included</span>
          </div>
        </div>

        {/* Centerpiece Image Showcase Card */}
        <div className="my-auto flex items-center justify-center p-2 z-10">
          <div className="relative rounded-3xl bg-white p-5 sm:p-7 shadow-xl shadow-slate-200/70 border border-slate-200/80 max-w-md w-full group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/login side pannel image.png"
              alt="Soltkiz - Build Resumes That Actually Get Results"
              className="w-full h-auto object-contain rounded-2xl"
            />
            <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium">
              <span className="flex items-center gap-1 text-amber-600 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                4.9/5 Rating
              </span>
              <span>20 Free Tailored Generations</span>
            </div>
          </div>
        </div>

        {/* Bottom Social Proof Bar */}
        <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500 font-medium z-10">
          <span>Official Soltkiz IT Platform</span>
          <span className="flex items-center gap-1 text-emerald-700 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            256-bit SSL Secure
          </span>
        </div>

      </div>

      {/* ── RIGHT AUTH FORM PANEL (Clean Crisp Human-Centered UI) ── */}
      <div className="flex-1 flex flex-col justify-between px-6 py-8 sm:px-12 lg:px-16 xl:px-24 bg-white overflow-y-auto">

        {/* Top Header: Back to Home & Mobile Logo */}
        <div className="flex items-center justify-between mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#0F2744] transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>

          <div className="lg:hidden">
            <Link href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/LOGO.png" alt="Resume Builder Logo" className="h-12 sm:h-14 w-auto object-contain" />
            </Link>
          </div>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-md mx-auto my-auto py-2">

          {/* Welcome Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-black text-[#0F2744] mb-1.5 tracking-tight">
              Create your account 🚀
            </h1>
            <p className="text-sm text-slate-500 font-normal">
              Free forever. No credit card required to start.
            </p>
          </div>

          {/* Google OAuth Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3 w-full h-12 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 font-bold text-slate-700 text-sm shadow-xs hover:shadow-sm transition-all cursor-pointer mb-5"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-4 bg-white text-slate-400 font-bold uppercase tracking-wider">
                or register with email
              </span>
            </div>
          </div>

          {/* Registration Form */}
          <form className="space-y-3.5" onSubmit={handleRegister}>

            {errorMsg && (
              <div className="p-3 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-xl">
                {errorMsg}
              </div>
            )}

            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1" htmlFor="reg-name">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  id="reg-name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0F2744]/15 focus:border-[#0F2744] transition-all shadow-2xs"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1" htmlFor="reg-email">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  id="reg-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0F2744]/15 focus:border-[#0F2744] transition-all shadow-2xs"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1" htmlFor="reg-password">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  className="w-full h-11 pl-10 pr-10 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0F2744]/15 focus:border-[#0F2744] transition-all shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Meter */}
              {password.length > 0 && (
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="flex-1 flex gap-1">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= passwordStrength ? strengthColors[passwordStrength] : 'bg-slate-200'
                          }`}
                      />
                    ))}
                  </div>
                  <span
                    className={`text-[10px] font-bold ${passwordStrength === 1
                        ? 'text-rose-600'
                        : passwordStrength === 2
                          ? 'text-amber-600'
                          : 'text-emerald-700'
                      }`}
                  >
                    {strengthLabels[passwordStrength]}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1" htmlFor="reg-confirm">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  id="reg-confirm"
                  type={showConfirm ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Repeat your password"
                  className={`w-full h-11 pl-10 pr-10 rounded-xl border bg-white text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 transition-all shadow-2xs ${confirm.length > 0 && confirm !== password
                      ? 'border-rose-300 focus:ring-rose-200 focus:border-rose-400'
                      : confirm.length > 0 && confirm === password
                        ? 'border-emerald-600 focus:ring-emerald-200 focus:border-emerald-600'
                        : 'border-slate-200 focus:ring-[#0F2744]/15 focus:border-[#0F2744]'
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                {confirm.length > 0 && confirm === password && (
                  <CheckCircle2 className="absolute right-9 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600" />
                )}
              </div>
              {confirm.length > 0 && confirm !== password && (
                <p className="mt-1 text-[11px] font-medium text-rose-600">Passwords do not match</p>
              )}
            </div>

            {/* Terms of Service Checkbox */}
            <label className="flex items-start gap-2.5 cursor-pointer group pt-1">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 rounded border-slate-300 text-[#0F2744] focus:ring-[#0F2744] cursor-pointer"
              />
              <span className="text-xs text-slate-600 leading-tight">
                I agree to the{' '}
                <Link href="/terms" className="font-bold text-[#0F2744] hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="font-bold text-[#0F2744] hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </label>

            {/* Primary Submit Button (Brand Navy) */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full h-12 rounded-xl bg-[#0F2744] hover:bg-[#0A1C33] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed group mt-2"
            >
              <span>{isPending ? 'Creating Account...' : 'Create Free Account'}</span>
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
              ) : (
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              )}
            </button>
          </form>

          {/* Toggle to Login */}
          <p className="text-center text-sm font-medium text-slate-500 mt-6">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-bold text-[#0F2744] hover:underline transition-colors"
            >
              Sign in
            </Link>
          </p>

        </div>

        {/* Footer Security Note */}
        <div className="pt-3 text-center text-xs text-slate-400 font-medium">
          Protected with 256-bit SSL encryption. We never sell your career data.
        </div>

      </div>
    </div>
  );
}