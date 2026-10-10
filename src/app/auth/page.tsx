'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { ArrowLeft, CheckCircle2, Eye, EyeOff, LockKeyhole, Mail, UserRound } from 'lucide-react';

type Mode = 'login' | 'signup';

type StoredUser = {
  name: string;
  email: string;
  password: string;
};

const USERS_KEY = 'rove-local-users';

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const switchMode = (nextMode: Mode) => {
    setMode(nextMode);
    setMessage(null);
    setError(null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    setError(null);

    const normalizedEmail = email.trim().toLowerCase();
    const users: StoredUser[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');

    if (mode === 'signup') {
      if (!name.trim()) {
        setError('Please enter your name.');
        return;
      }
      if (password.length < 8) {
        setError('Use at least 8 characters for your password.');
        return;
      }
      if (users.some((user) => user.email === normalizedEmail)) {
        setError('An account with this email already exists.');
        return;
      }

      localStorage.setItem(USERS_KEY, JSON.stringify([...users, { name: name.trim(), email: normalizedEmail, password }]));
      localStorage.setItem('rove-current-user', JSON.stringify({ name: name.trim(), email: normalizedEmail }));
      setMessage('Your Rove account is ready. Welcome aboard.');
      return;
    }

    const user = users.find((candidate) => candidate.email === normalizedEmail && candidate.password === password);
    if (!user) {
      setError('We could not match that email and password.');
      return;
    }

    localStorage.setItem('rove-current-user', JSON.stringify({ name: user.name, email: user.email }));
    setMessage(`Welcome back, ${user.name.split(' ')[0]}.`);
  };

  return (
    <main className="min-h-screen bg-[#f7f5f0] px-5 py-6 text-stone-900 sm:px-8 sm:py-10">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl flex-col justify-between gap-12">
        <Link href="/" className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-stone-600 transition hover:text-stone-950">
          <ArrowLeft className="h-4 w-4" /> Back to Rove
        </Link>

        <section className="grid overflow-hidden rounded-[2rem] border border-stone-200 bg-[#fbfaf7] shadow-[0_24px_80px_rgba(55,45,35,0.12)] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative hidden min-h-[620px] overflow-hidden bg-stone-900 p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div className="absolute inset-0 bg-[url('/rove-logo-header.png')] bg-[length:220px_auto] bg-center bg-no-repeat opacity-[0.08]" />
            <div className="relative">
              <div className="mb-6 flex items-center gap-3">
                <img src="/rove-logo-icon.png" alt="Rove" className="h-10 w-10 object-contain" />
                <span className="font-serif text-2xl">Rove</span>
              </div>
              <p className="max-w-sm font-serif text-5xl leading-[0.95] tracking-tight">Travel with room for the unexpected.</p>
            </div>
            <p className="relative max-w-sm text-sm leading-7 text-stone-300">Save your considered itineraries, sync bookings, and keep every journey in one calm place.</p>
          </div>

          <div className="p-7 sm:p-12 lg:p-14">
            <div className="mb-8 flex rounded-full bg-stone-100 p-1 text-sm font-semibold">
              <button type="button" onClick={() => switchMode('login')} className={`flex-1 rounded-full px-4 py-2.5 transition ${mode === 'login' ? 'bg-stone-900 text-white shadow-sm' : 'text-stone-500 hover:text-stone-900'}`}>
                Log in
              </button>
              <button type="button" onClick={() => switchMode('signup')} className={`flex-1 rounded-full px-4 py-2.5 transition ${mode === 'signup' ? 'bg-stone-900 text-white shadow-sm' : 'text-stone-500 hover:text-stone-900'}`}>
                Sign up
              </button>
            </div>

            <div className="mb-8">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-stone-500">Your Rove account</p>
              <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">{mode === 'login' ? 'Welcome back.' : 'Start your next chapter.'}</h1>
              <p className="mt-3 max-w-md text-sm leading-6 text-stone-500">{mode === 'login' ? 'Pick up your plans exactly where you left them.' : 'Create a home for trips that feel like yours.'}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-500">Name</span>
                  <span className="flex items-center gap-3 rounded-xl border border-stone-200 bg-white px-3.5 py-3 focus-within:border-stone-500">
                    <UserRound className="h-4 w-4 text-stone-400" />
                    <input value={name} onChange={(event) => setName(event.target.value)} className="w-full bg-transparent text-sm outline-none" placeholder="Your name" autoComplete="name" />
                  </span>
                </label>
              )}

              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-500">Email</span>
                <span className="flex items-center gap-3 rounded-xl border border-stone-200 bg-white px-3.5 py-3 focus-within:border-stone-500">
                  <Mail className="h-4 w-4 text-stone-400" />
                  <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full bg-transparent text-sm outline-none" placeholder="you@example.com" autoComplete="email" />
                </span>
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-500">Password</span>
                <span className="flex items-center gap-3 rounded-xl border border-stone-200 bg-white px-3.5 py-3 focus-within:border-stone-500">
                  <LockKeyhole className="h-4 w-4 text-stone-400" />
                  <input required minLength={mode === 'signup' ? 8 : undefined} type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} className="w-full bg-transparent text-sm outline-none" placeholder={mode === 'signup' ? 'At least 8 characters' : 'Your password'} autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} />
                  <button type="button" onClick={() => setShowPassword((visible) => !visible)} className="text-stone-400 hover:text-stone-900" aria-label={showPassword ? 'Hide password' : 'Show password'}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </span>
              </label>

              {error && <p role="alert" className="rounded-xl bg-rose-50 px-3.5 py-3 text-sm text-rose-700">{error}</p>}
              {message && <p role="status" className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3.5 py-3 text-sm text-emerald-700"><CheckCircle2 className="h-4 w-4 shrink-0" /> {message}</p>}

              <button type="submit" className="w-full rounded-full bg-stone-900 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-stone-900/10 transition hover:bg-stone-700">
                {mode === 'login' ? 'Log in to Rove' : 'Create my Rove account'}
              </button>
            </form>

            <p className="mt-7 text-center text-xs leading-5 text-stone-400">Your account is stored locally in this static GitHub Pages demo. Connect a server auth provider before using this for production accounts.</p>
          </div>
        </section>

        <p className="text-center text-xs text-stone-400">Rove · Move less, feel more.</p>
      </div>
    </main>
  );
}
