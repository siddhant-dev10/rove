'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Compass,
  Eye,
  EyeOff,
  LockKeyhole,
  LogOut,
  Mail,
  ShieldCheck,
  UserRound,
  AlertCircle,
  Loader2,
  Check,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

type Mode = 'login' | 'signup';

export default function AuthPage() {
  const { user, isAuthenticated, isLoading, login, signup, logout } = useAuth();

  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loginSuggestion, setLoginSuggestion] = useState<string | null>(null);
  const [showForgotNotice, setShowForgotNotice] = useState(false);

  const switchMode = (nextMode: Mode) => {
    setMode(nextMode);
    setError(null);
    setLoginSuggestion(null);
    setShowForgotNotice(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoginSuggestion(null);
    setShowForgotNotice(false);
    setIsSubmitting(true);

    try {
      if (mode === 'signup') {
        if (!name.trim()) {
          setError('Please provide your full name.');
          setIsSubmitting(false);
          return;
        }
        if (password.length < 8) {
          setError('Password must contain at least 8 characters.');
          setIsSubmitting(false);
          return;
        }

        const res = await signup(name.trim(), email.trim(), password);
        if (res.success) {
          setIsRedirecting(true);
          // Hard reload to refresh the entire workspace with the new session
          window.location.href = '/';
          return;
        } else {
          setError(res.error || 'Unable to create account. Please try again.');
        }
      } else {
        const res = await login(email.trim(), password, rememberMe);
        if (res.success) {
          setIsRedirecting(true);
          // Hard reload to refresh the entire workspace with the new session
          window.location.href = '/';
          return;
        } else {
          setError(res.error || 'We could not verify that email and password.');
          setLoginSuggestion('new_user');
        }
      }
    } catch {
      setError('A network or server error occurred. Please try again shortly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    setIsSubmitting(true);
    try {
      await logout();
      window.location.href = '/';
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f5f0] px-4 py-4 sm:px-6 sm:py-8 lg:px-8 text-stone-900 selection:bg-stone-900 selection:text-white flex flex-col justify-between">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-4rem)] w-full max-w-5xl flex-col justify-between gap-6 sm:gap-8">
        {/* Top Navigation Row */}
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-stone-600 transition-colors hover:text-stone-950 touch-manipulation"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="hidden xs:inline sm:inline">Return to Trip Workspace</span>
            <span className="inline xs:hidden sm:hidden">Trip Workspace</span>
          </Link>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 border border-stone-200/80 text-stone-600 text-[11px] font-medium">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>Secure Session</span>
          </div>
        </div>

        {/* Main Card Container */}
        <section className="grid overflow-hidden rounded-2xl sm:rounded-[2rem] border border-stone-200/90 bg-[#fbfaf7] shadow-[0_20px_70px_rgba(55,45,35,0.07)] lg:grid-cols-[1fr_1fr]">
          {/* Left Hero Composition (Editorial brand banner - desktop) */}
          <div className="relative hidden min-h-[600px] overflow-hidden bg-stone-950 p-8 sm:p-10 text-white lg:flex lg:flex-col lg:justify-between">
            {/* Background photography */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-45 mix-blend-luminosity scale-105 transition-transform duration-1000 motion-reduce:transform-none"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1800&q=85')",
              }}
            />
            {/* Dark warm vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/40" />

            {/* Top Brand Header */}
            <div className="relative z-10">
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-md">
                  <Compass className="h-6 w-6 stroke-[1.75]" />
                </div>
                <div>
                  <span className="font-serif text-2xl tracking-tight font-medium">ROVE</span>
                  <span className="ml-2 text-[10px] font-mono uppercase tracking-widest text-stone-400">
                    Travel OS
                  </span>
                </div>
              </div>
              <h2 className="max-w-md font-serif text-3xl sm:text-4xl lg:text-[42px] leading-[1.12] tracking-tight text-stone-100">
                Travel with room for the unexpected.
              </h2>
            </div>

            {/* Bottom Trust & Feature Pillars */}
            <div className="relative z-10 space-y-5">
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-xs text-stone-300">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                  <span>
                    Cryptographically protected accounts with secure HTTP-only sessions.
                  </span>
                </div>
                <div className="flex items-start gap-3 text-xs text-stone-300">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300 mt-0.5" />
                  <span>
                    Trips, custom budget caps, and locked anchors persist seamlessly across your visits.
                  </span>
                </div>
              </div>

              <div className="pt-5 border-t border-white/10 flex items-center justify-between text-[11px] text-stone-400 font-mono">
                <span>Rove Travel Operating System</span>
                <span>Move less, feel more</span>
              </div>
            </div>
          </div>

          {/* Right Interactive Form Area */}
          <div className="p-5 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between">
            <div>
              {/* Mobile-only brand bar */}
              <div className="lg:hidden flex items-center justify-between pb-4 mb-5 border-b border-stone-200/60">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-900 text-white shadow-xs">
                    <Compass className="h-5 w-5 stroke-[1.75]" />
                  </div>
                  <div>
                    <span className="font-serif text-lg tracking-tight font-medium text-stone-900">ROVE</span>
                    <span className="ml-1.5 text-[9px] font-mono uppercase tracking-widest text-stone-500">
                      Travel OS
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">
                  Member Portal
                </span>
              </div>

              {/* Redirecting Overlay / Banner */}
              {isRedirecting && (
                <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50/90 p-4 text-center space-y-2 animate-in fade-in">
                  <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white mx-auto shadow-xs">
                    <Check className="h-4 w-4 stroke-[3]" />
                  </div>
                  <h3 className="font-serif text-base font-semibold text-emerald-950">
                    Welcome to Rove
                  </h3>
                  <p className="text-xs text-emerald-700 flex items-center justify-center gap-1.5">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Refreshing your travel workspace...</span>
                  </p>
                </div>
              )}

              {/* If Loading Auth State */}
              {isLoading ? (
                <div className="py-16 flex flex-col items-center justify-center text-center space-y-3">
                  <Loader2 className="h-7 w-7 text-stone-500 animate-spin" />
                  <p className="text-xs text-stone-500 font-medium tracking-wide">
                    Verifying session status...
                  </p>
                </div>
              ) : isAuthenticated && user ? (
                /* Authenticated User State View */
                <div className="space-y-6 py-2">
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200/80 px-3.5 py-1 text-xs font-semibold text-emerald-800">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Active Signed-In Session</span>
                  </div>

                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400">
                      Welcome back
                    </p>
                    <h1 className="mt-1 font-serif text-2xl sm:text-3xl lg:text-4xl tracking-tight text-stone-900">
                      {user.name}
                    </h1>
                    <p className="mt-1.5 text-xs sm:text-sm text-stone-500">
                      Signed in as <strong className="font-semibold text-stone-700">{user.email}</strong>
                    </p>
                  </div>

                  <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 space-y-2.5 shadow-xs">
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span>Traveler Identity</span>
                      <span className="font-mono text-stone-800 font-semibold">
                        #ROV-{user.id.slice(-4).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span>Membership Status</span>
                      <span className="font-semibold text-emerald-700">Verified Explorer</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        window.location.href = '/';
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 px-5 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-stone-800 active:scale-98 transition cursor-pointer min-h-[48px]"
                    >
                      <span>Continue to Trip Workspace</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-white px-5 py-3 text-sm font-semibold text-stone-700 transition hover:bg-stone-100 hover:text-stone-950 active:scale-98 cursor-pointer disabled:opacity-60 min-h-[46px]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Signing out...</span>
                        </>
                      ) : (
                        <>
                          <LogOut className="h-4 w-4 text-stone-500" />
                          <span>Sign out & switch account</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                /* Unauthenticated View: Full Login / Signup Form */
                <>
                  {/* Mode Selector Pill */}
                  <div className="mb-6 sm:mb-7 flex rounded-full bg-stone-100 p-1 text-xs sm:text-sm font-semibold">
                    <button
                      type="button"
                      onClick={() => switchMode('login')}
                      className={`flex-1 rounded-full py-2 sm:py-2.5 px-3 sm:px-4 text-center transition-all cursor-pointer min-h-[42px] touch-manipulation ${
                        mode === 'login'
                          ? 'bg-stone-900 text-white shadow-xs'
                          : 'text-stone-500 hover:text-stone-900'
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      onClick={() => switchMode('signup')}
                      className={`flex-1 rounded-full py-2 sm:py-2.5 px-3 sm:px-4 text-center transition-all cursor-pointer min-h-[42px] touch-manipulation ${
                        mode === 'signup'
                          ? 'bg-stone-900 text-white shadow-xs'
                          : 'text-stone-500 hover:text-stone-900'
                      }`}
                    >
                      Create Account
                    </button>
                  </div>

                  {/* Header */}
                  <div className="mb-5 sm:mb-6">
                    <p className="mb-1 text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-stone-400">
                      {mode === 'login' ? 'Welcome back' : 'New to Rove'}
                    </p>
                    <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl tracking-tight text-stone-900">
                      {mode === 'login' ? 'Sign in to your account.' : 'Start your next chapter.'}
                    </h1>
                    <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed text-stone-500">
                      {mode === 'login'
                        ? 'Pick up your itineraries and customized budgets right where you left them.'
                        : 'Set up your private Rove travel profile with tailored itineraries and nomad rewards.'}
                    </p>
                  </div>

                  {/* Error Notification with 1-click helper */}
                  {error && (
                    <div
                      role="alert"
                      className="mb-5 rounded-xl border border-rose-200 bg-rose-50/90 p-3 sm:p-4 text-xs text-rose-800 space-y-2.5 animate-in fade-in"
                    >
                      <div className="flex items-start gap-2.5">
                        <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
                        <div className="flex-1 leading-snug">
                          <strong className="font-semibold">Notice:</strong> {error}
                        </div>
                      </div>
                      {loginSuggestion === 'new_user' && mode === 'login' && (
                        <div className="pt-2 border-t border-rose-200/70 flex flex-wrap items-center justify-between gap-2">
                          <span className="text-[11px] text-rose-700">Don&apos;t have an account yet?</span>
                          <button
                            type="button"
                            onClick={() => switchMode('signup')}
                            className="px-3 py-1 rounded-full bg-stone-900 text-white text-[11px] font-semibold hover:bg-stone-800 transition cursor-pointer"
                          >
                            Create Account with this email &rarr;
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                    {mode === 'signup' && (
                      <div>
                        <label
                          htmlFor="auth-name"
                          className="mb-1 block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-600"
                        >
                          Full Name
                        </label>
                        <div className="flex items-center gap-2.5 sm:gap-3 rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 sm:py-3 transition focus-within:border-stone-900 focus-within:ring-2 focus-within:ring-stone-900/10 min-h-[46px]">
                          <UserRound className="h-4 w-4 text-stone-400 shrink-0" />
                          <input
                            id="auth-name"
                            required
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-transparent text-base sm:text-sm text-stone-900 placeholder-stone-400 outline-none"
                            placeholder="e.g. Siddhant Shrivastava"
                            autoComplete="name"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label
                        htmlFor="auth-email"
                        className="mb-1 block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-600"
                      >
                        Email Address
                      </label>
                      <div className="flex items-center gap-2.5 sm:gap-3 rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 sm:py-3 transition focus-within:border-stone-900 focus-within:ring-2 focus-within:ring-stone-900/10 min-h-[46px]">
                        <Mail className="h-4 w-4 text-stone-400 shrink-0" />
                        <input
                          id="auth-email"
                          required
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-transparent text-base sm:text-sm text-stone-900 placeholder-stone-400 outline-none"
                          placeholder="you@domain.com"
                          autoComplete="email"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="auth-password"
                        className="mb-1 block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-600"
                      >
                        Password
                      </label>
                      <div className="flex items-center gap-2.5 sm:gap-3 rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 sm:py-3 transition focus-within:border-stone-900 focus-within:ring-2 focus-within:ring-stone-900/10 min-h-[46px]">
                        <LockKeyhole className="h-4 w-4 text-stone-400 shrink-0" />
                        <input
                          id="auth-password"
                          required
                          minLength={mode === 'signup' ? 8 : undefined}
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-transparent text-base sm:text-sm text-stone-900 placeholder-stone-400 outline-none"
                          placeholder={
                            mode === 'signup' ? 'Minimum 8 characters' : 'Enter your password'
                          }
                          autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="text-stone-400 hover:text-stone-800 transition p-1.5 cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center touch-manipulation"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {mode === 'signup' && (
                        <p className="mt-1 text-[11px] text-stone-400">
                          Use 8 or more characters for account security.
                        </p>
                      )}
                    </div>

                    {mode === 'login' && (
                      <div className="flex flex-col xs:flex-row sm:flex-row items-start sm:items-center justify-between gap-2 pt-1 text-xs">
                        <label className="flex items-center gap-2 cursor-pointer select-none text-stone-600 touch-manipulation">
                          <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="h-4 w-4 rounded border-stone-300 text-stone-900 focus:ring-stone-900 accent-stone-900 cursor-pointer"
                          />
                          <span>Remember me on this browser</span>
                        </label>

                        <button
                          type="button"
                          onClick={() => setShowForgotNotice((prev) => !prev)}
                          className="text-stone-600 hover:text-stone-950 font-medium transition cursor-pointer text-left sm:text-right touch-manipulation"
                        >
                          Forgot password?
                        </button>
                      </div>
                    )}

                    {showForgotNotice && (
                      <div className="rounded-xl border border-stone-200 bg-stone-100 p-3 text-xs text-stone-700 animate-in fade-in">
                        <strong>Password Recovery:</strong> For assistance recovering your Rove account,
                        please reach out to{' '}
                        <a
                          href="mailto:support@rovetravel.com"
                          className="font-semibold underline underline-offset-2 text-stone-900"
                        >
                          support@rovetravel.com
                        </a>{' '}
                        with your registered email address.
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting || isRedirecting}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-stone-900/10 transition hover:bg-stone-800 active:scale-98 disabled:opacity-60 cursor-pointer min-h-[48px] touch-manipulation"
                      >
                        {isSubmitting || isRedirecting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>
                              {isRedirecting
                                ? 'Refreshing workspace...'
                                : mode === 'login'
                                ? 'Signing in...'
                                : 'Creating account...'}
                            </span>
                          </>
                        ) : (
                          <>
                            <span>{mode === 'login' ? 'Sign in to Rove' : 'Create Rove Account'}</span>
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>

                  {/* Mode switcher helper text */}
                  <p className="mt-5 text-center text-xs text-stone-500">
                    {mode === 'login' ? (
                      <>
                        Don&apos;t have an account yet?{' '}
                        <button
                          type="button"
                          onClick={() => switchMode('signup')}
                          className="font-semibold text-stone-900 underline underline-offset-2 hover:text-stone-700 cursor-pointer"
                        >
                          Create one now
                        </button>
                      </>
                    ) : (
                      <>
                        Already registered with Rove?{' '}
                        <button
                          type="button"
                          onClick={() => switchMode('login')}
                          className="font-semibold text-stone-900 underline underline-offset-2 hover:text-stone-700 cursor-pointer"
                        >
                          Sign in here
                        </button>
                      </>
                    )}
                  </p>
                </>
              )}
            </div>

            {/* Bottom footnote */}
            <div className="mt-6 sm:mt-8 border-t border-stone-200/60 pt-4 text-center">
              <p className="text-[11px] text-stone-400">
                Rove · Handcrafted itineraries with room for serendipity.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <p className="text-center text-xs text-stone-400">
          Rove OS · Move less, feel more.
        </p>
      </div>
    </main>
  );
}
