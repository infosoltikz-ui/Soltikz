"use client";
import React, { useState, useTransition, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { login, signup } from './actions';
import { toast } from 'react-hot-toast';

function LoginToast() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const logoutParam = searchParams.get('logout');
    const reasonParam = searchParams.get('reason');

    if (logoutParam === 'success') {
      toast.success('Successfully logged out!');
      router.replace('/login');
    } else if (reasonParam === 'expired') {
      toast.error('Your session has expired. Please sign in again.');
      router.replace('/login');
    } else if (reasonParam === 'session_ended') {
      toast('Please sign in to access your dashboard.', { icon: '🔒' });
      router.replace('/login');
    }
  }, [searchParams, router]);

  return null;
}

interface AuthScreenProps {
  initialMode?: 'signin' | 'signup';
}

export default function AuthScreen({ initialMode = 'signin' }: AuthScreenProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState('');

  // Sign in form state
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Sign up form state
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const switchMode = (newMode: 'signin' | 'signup') => {
    setErrorMsg('');
    setMode(newMode);
    if (typeof window !== 'undefined') {
      const targetUrl = newMode === 'signin' ? '/login' : '/register';
      window.history.pushState(null, '', targetUrl);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg('');
    try {
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
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to authenticate with Google';
      setErrorMsg(message);
    }
  };

  // Password strength calculation (0 to 4)
  const getPasswordStrength = (pw: string) => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
    if (/\d/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  };

  const pwStrength = getPasswordStrength(signUpPassword);
  const pwMessages = [
    'Too short - use at least 8 characters.',
    'Weak. Mix upper and lower case.',
    'Getting there. Add a number.',
    'Good password.',
    'Strong password.',
  ];

  const handleSignInSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');

    startTransition(async () => {
      const formData = new FormData();
      formData.append('email', signInEmail);
      formData.append('password', signInPassword);

      const result = await login(formData);
      if (result?.error) {
        setErrorMsg(result.error);
      }
    });
  };

  const handleSignUpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');

    if (signUpPassword.length < 8) {
      setErrorMsg('Password must be at least 8 characters long');
      return;
    }

    if (!agreedToTerms) {
      setErrorMsg('Please agree to the terms and privacy policy');
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append('name', signUpName);
      formData.append('email', signUpEmail);
      formData.append('password', signUpPassword);

      const result = await signup(formData);
      if (result?.error) {
        setErrorMsg(result.error);
      }
    });
  };

  return (
    <div className="auth-wrap">
      <Suspense fallback={null}>
        <LoginToast />
      </Suspense>

      {/* ================= LEFT: the product itself ================= */}
      <section className="auth-stage">
        <Link href="/" className="auth-stage-mark">
          <div className="auth-mark">R1</div>
          <div>
            <b>ResumeBuilderOne</b>
            <span>From résumé to dream job</span>
          </div>
        </Link>

        <div className="auth-pitch">
          <h1>One résumé won&apos;t get you ten jobs.</h1>
          <p>
            Paste the posting. Get a version written for that role, and a report showing exactly what matched and what didn&apos;t.
          </p>
        </div>

        <div className="auth-demo">
          <div className="auth-demo-inner">
            <div className="auth-doc">
              <div className="auth-nm">Joh****</div>
              <div className="auth-ct">Dallas, TX · +1 (813) - xxx xxxx · linkedin.com/in/john-xxxx</div>

              <h4>Summary</h4>
              <p>
                Information security analyst with five years across cloud and financial-services environments. Runs{' '}
                <mark className="k">incident response</mark> end to end and tunes{' '}
                <mark className="k">SIEM</mark> detections analysts actually trust.
              </p>

              <h4>Experience</h4>
              <div className="auth-jb">
                <span><b>Information Security Analyst</b> - CPS</span>
                <i>Jul 2026 - Now</i>
              </div>
              <ul>
                <li>
                  Tuned 40+ <mark className="k">Splunk ES</mark> correlation searches, cutting false positives 38%.
                </li>
                <li>
                  Led <mark className="k">incident response</mark> on 60 P2/P3 events and wrote the SOC playbooks.
                </li>
              </ul>
              <div className="auth-jb">
                <span><b>Cyber Security Analyst</b> - Amazon</span>
                <i>2023</i>
              </div>
              <ul>
                <li>
                  Investigated ~150 endpoint alerts a month in <mark className="k">CrowdStrike Falcon</mark>.
                </li>
                <li>
                  <mark className="n">Reviewed IAM access quarterly</mark> across 400+ accounts.
                </li>
              </ul>
            </div>

            <div className="auth-pin auth-pin-score">
              <div className="ring">
                <svg width="46" height="46" viewBox="0 0 46 46" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="23" cy="23" r="19" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="5"/>
                  <circle cx="23" cy="23" r="19" fill="none" stroke="#4FBE92" strokeWidth="5" strokeLinecap="round" strokeDasharray="119.4" strokeDashoffset="10.7"/>
                </svg>
                <div className="v num">91</div>
              </div>
              <div>
                <b>Match score</b>
                <span>Up from 74</span>
              </div>
            </div>

            <div className="auth-pin auth-pin-kw">
              <b>From the posting</b>
              <div className="tags">
                <span>incident response</span>
                <span>Splunk ES</span>
                <span>NIST 800-53</span>
                <span className="miss">KQL</span>
                <span className="miss">Sentinel</span>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-stage-foot">
          <div>
            <b>Free to start</b>
            <span>10 résumés, no card needed</span>
          </div>
          <div>
            <b>$9 a month after</b>
            <span>Cancel in two clicks</span>
          </div>
          <div>
            <b>Private</b>
            <span>We never sell your data</span>
          </div>
        </div>
      </section>

      {/* ================= RIGHT: the form ================= */}
      <section className="auth-side">
        <div className="auth-card">
          <Link href="/" className="auth-back">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
              <path d="M15 5l-7 7 7 7"/>
            </svg>
            <span>Back to home</span>
          </Link>

          {/* ---- SIGN IN ---- */}
          {mode === 'signin' && (
            <div className="auth-pane on" id="p-in">
              <h2>Sign in</h2>
              <p className="auth-lede">Your profile and every résumé you&apos;ve tailored are waiting.</p>

              <button type="button" onClick={handleGoogleLogin} className="auth-google">
                <svg viewBox="0 0 48 48" className="w-[17px] h-[17px] flex-none">
                  <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-2.8-.4-4.1H24v7.4h12.1c-.2 2-1.6 5-4.6 7l-.1.3 6.7 5.2.5.1c4.2-3.9 6.6-9.7 6.6-15.9"/>
                  <path fill="#34A853" d="M24 46c6.1 0 11.2-2 14.9-5.5l-7.1-5.5c-1.9 1.3-4.5 2.2-7.8 2.2-6 0-11-3.9-12.8-9.3l-.3.1-6.9 5.4-.1.3C7.6 41 15.2 46 24 46"/>
                  <path fill="#FBBC05" d="M11.2 27.9c-.5-1.4-.8-2.8-.8-4.4s.3-3 .7-4.4v-.3l-7-5.4-.2.1A22 22 0 0 0 2 23.5c0 3.5.9 6.9 2.3 9.9z"/>
                  <path fill="#EB4335" d="M24 9.8c4.3 0 7.1 1.8 8.8 3.4l6.4-6.2C35.2 3.4 30.1 1 24 1 15.2 1 7.6 6 4 13.2l7.2 5.6C13 13.7 18 9.8 24 9.8"/>
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="auth-or">or use your email</div>

              {errorMsg && (
                <div className="auth-error">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSignInSubmit}>
                <div className="auth-field">
                  <div className="auth-lab">
                    <label htmlFor="e1">Email</label>
                  </div>
                  <div className="auth-inp">
                    <input
                      id="e1"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      placeholder="you@university.edu"
                    />
                  </div>
                </div>

                <div className="auth-field">
                  <div className="auth-lab">
                    <label htmlFor="p1">Password</label>
                    <Link href="/forgot-password">Forgot it?</Link>
                  </div>
                  <div className="auth-inp has-eye">
                    <input
                      id="p1"
                      name="password"
                      type={showSignInPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      placeholder="Your password"
                    />
                    <button
                      type="button"
                      className="auth-eye"
                      onClick={() => setShowSignInPassword(!showSignInPassword)}
                      aria-label={showSignInPassword ? 'Hide password' : 'Show password'}
                    >
                      {showSignInPassword ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-7-10-7a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 10 7 10 7a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                          <line x1="1" y1="1" x2="23" y2="23"/>
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/>
                          <circle cx="12" cy="12" r="2.8"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <label className="auth-check">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Keep me signed in on this device</span>
                </label>

                <button type="submit" disabled={isPending} className="auth-submit">
                  {isPending ? 'Signing in...' : 'Sign in'}
                </button>
              </form>

              <p className="auth-swap">
                New here?{' '}
                <button type="button" onClick={() => switchMode('signup')}>
                  Create a free account
                </button>
              </p>
            </div>
          )}

          {/* ---- SIGN UP ---- */}
          {mode === 'signup' && (
            <div className="auth-pane on" id="p-up">
              <h2>Create your account</h2>
              <p className="auth-lede">Ten tailored résumés free. No card, no trial countdown.</p>

              <button type="button" onClick={handleGoogleLogin} className="auth-google">
                <svg viewBox="0 0 48 48" className="w-[17px] h-[17px] flex-none">
                  <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-2.8-.4-4.1H24v7.4h12.1c-.2 2-1.6 5-4.6 7l-.1.3 6.7 5.2.5.1c4.2-3.9 6.6-9.7 6.6-15.9"/>
                  <path fill="#34A853" d="M24 46c6.1 0 11.2-2 14.9-5.5l-7.1-5.5c-1.9 1.3-4.5 2.2-7.8 2.2-6 0-11-3.9-12.8-9.3l-.3.1-6.9 5.4-.1.3C7.6 41 15.2 46 24 46"/>
                  <path fill="#FBBC05" d="M11.2 27.9c-.5-1.4-.8-2.8-.8-4.4s.3-3 .7-4.4v-.3l-7-5.4-.2.1A22 22 0 0 0 2 23.5c0 3.5.9 6.9 2.3 9.9z"/>
                  <path fill="#EB4335" d="M24 9.8c4.3 0 7.1 1.8 8.8 3.4l6.4-6.2C35.2 3.4 30.1 1 24 1 15.2 1 7.6 6 4 13.2l7.2 5.6C13 13.7 18 9.8 24 9.8"/>
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="auth-or">or use your email</div>

              {errorMsg && (
                <div className="auth-error">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSignUpSubmit}>
                <div className="auth-field">
                  <div className="auth-lab">
                    <label htmlFor="n2">Full name</label>
                  </div>
                  <div className="auth-inp">
                    <input
                      id="n2"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={signUpName}
                      onChange={(e) => setSignUpName(e.target.value)}
                      placeholder="As it should appear on your résumé"
                    />
                  </div>
                </div>

                <div className="auth-field">
                  <div className="auth-lab">
                    <label htmlFor="e2">Email</label>
                  </div>
                  <div className="auth-inp">
                    <input
                      id="e2"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      placeholder="you@university.edu"
                    />
                  </div>
                </div>

                <div className="auth-field">
                  <div className="auth-lab">
                    <label htmlFor="p2">Password</label>
                  </div>
                  <div className="auth-inp has-eye">
                    <input
                      id="p2"
                      name="password"
                      type={showSignUpPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      placeholder="At least 8 characters"
                    />
                    <button
                      type="button"
                      className="auth-eye"
                      onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                      aria-label={showSignUpPassword ? 'Hide password' : 'Show password'}
                    >
                      {showSignUpPassword ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-7-10-7a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 10 7 10 7a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                          <line x1="1" y1="1" x2="23" y2="23"/>
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/>
                          <circle cx="12" cy="12" r="2.8"/>
                        </svg>
                      )}
                    </button>
                  </div>

                  <div className={`auth-strength ${signUpPassword.length > 0 ? 'on' : ''}`}>
                    <div className="bars">
                      {[0, 1, 2, 3].map((idx) => {
                        let cls = '';
                        if (idx < pwStrength) {
                          cls = pwStrength >= 3 ? 'g' : 'a';
                        }
                        return <i key={idx} className={cls} />;
                      })}
                    </div>
                    <p>{signUpPassword.length > 0 ? pwMessages[pwStrength] : ''}</p>
                  </div>
                </div>

                <label className="auth-check">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                  />
                  <span>
                    I agree to the <Link href="/terms">terms</Link> and <Link href="/privacy">privacy policy</Link>.
                  </span>
                </label>

                <button type="submit" disabled={isPending} className="auth-submit">
                  {isPending ? 'Creating account...' : 'Create account'}
                </button>
              </form>

              <p className="auth-swap">
                Already have an account?{' '}
                <button type="button" onClick={() => switchMode('signin')}>
                  Sign in
                </button>
              </p>

              <div className="auth-assure">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 3l8 3v6c0 5-3.4 8.3-8 9-4.6-.7-8-4-8-9V6z"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
                <span>Studying? Verify a .edu address later for 40% off Pro - $5.40 a month.</span>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
