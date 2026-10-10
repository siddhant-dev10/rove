'use client';

import React from 'react';
import { Compass, Mail, Phone, MapPin, Quote, ArrowUpRight, Sparkles, Shield, Heart } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <footer className="w-full bg-[#f4f0e8] border-t border-[#e2dcd0] text-stone-900 pt-20 sm:pt-28 pb-36 sm:pb-44 transition-all">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* BIG EDITORIAL PROJECT QUOTE */}
        <section className="text-center max-w-4xl mx-auto mb-20 sm:mb-28">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-sm border border-stone-200/80 text-stone-800 mb-8">
            <Quote className="w-6 h-6 stroke-[1.6]" />
          </div>

          <h2 className="font-serif italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-stone-900 leading-[1.18] tracking-tight text-balance">
            “We do not travel to escape life, but for life not to escape us. Rove was built for the wanderer who seeks depth over checklists, quiet mornings over hurried commutes, and the unexpected beauty found only when you leave room to breathe.”
          </h2>

          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-stone-300" />
            <span className="text-xs uppercase tracking-[0.22em] font-sans font-semibold text-stone-500">
              The Rove Manifesto · Travel, Thoughtfully
            </span>
            <span className="h-px w-12 bg-stone-300" />
          </div>
        </section>

        {/* ABOUT ROVE SECTION */}
        <section className="border-t border-stone-200/80 pt-16 sm:pt-20 mb-20 sm:mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200/60 text-stone-700 text-[11px] font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                About Rove Travel OS
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-stone-900 leading-tight">
                An antidote to rushed, cookie-cutter tourism.
              </h3>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Modern travel has become overcrowded, frantic, and transactional. We built Rove as an intelligent, human-first travel operating system that prioritizes slow discovery, route optimization without backtracking, and real-time budget guardrails.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-stone-200/80 bg-white/70 p-5 shadow-xs backdrop-blur-xs">
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-800 mb-3">
                  <Compass className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-base font-medium text-stone-900 mb-1.5">Route Intelligence</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Geographic clustering groups highlights by neighbourhood, saving up to 32 km in wasted daily transit.
                </p>
              </div>

              <div className="rounded-2xl border border-stone-200/80 bg-white/70 p-5 shadow-xs backdrop-blur-xs">
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-800 mb-3">
                  <Shield className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-base font-medium text-stone-900 mb-1.5">Anchor Protection</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Lock your favorite heritage boutique stays. Optimization tunes the rest of the plan around your anchor.
                </p>
              </div>

              <div className="rounded-2xl border border-stone-200/80 bg-white/70 p-5 shadow-xs backdrop-blur-xs">
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-800 mb-3">
                  <Heart className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-base font-medium text-stone-900 mb-1.5">Quiet Discovery</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Crowd sensors steer you away from peak rush hours toward serene Portuguese lanes and secluded coves.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BELOW ABOUT: CONTACTS AND SOCIALS */}
        <section className="border-t border-stone-200/80 pt-16 sm:pt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-stone-200/70">
            {/* Brand identity column */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <img src="rove-logo-header.png" alt="Rove — Move Less, Feel More" className="h-8 w-auto object-contain" />
                <span className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold border-l border-stone-300 pl-2.5">
                  TRAVEL OS
                </span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed max-w-sm">
                Built for travellers who wander with intention. Every itinerary is engineered with AI precision and tailored for peaceful discovery.
              </p>
              <div className="pt-2 text-xs text-stone-500 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                <span>Concierge & trip services live 24/7</span>
              </div>
            </div>

            {/* Direct Contacts Column */}
            <div className="lg:col-span-4 space-y-3">
              <h4 className="text-xs uppercase font-sans font-semibold tracking-wider text-stone-900">
                Direct Contacts & Support
              </h4>
              <ul className="space-y-2.5 text-xs text-stone-600">
                <li>
                  <a
                    href="mailto:concierge@rove.travel"
                    className="flex items-center gap-2.5 hover:text-stone-950 transition group"
                  >
                    <Mail className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-900" />
                    <span>concierge@rove.travel</span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+918007687683"
                    className="flex items-center gap-2.5 hover:text-stone-950 transition group"
                  >
                    <Phone className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-900" />
                    <span>+91 (800) 768-ROVE (24/7 Line)</span>
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 mt-0.5 shrink-0" />
                  <span>Vagator Cliff Hub, North Goa & Indiranagar, Bengaluru</span>
                </li>
              </ul>
            </div>

            {/* Socials Column */}
            <div className="lg:col-span-4 space-y-3">
              <h4 className="text-xs uppercase font-sans font-semibold tracking-wider text-stone-900">
                Follow & Connect
              </h4>
              <p className="text-xs text-stone-500 mb-3">
                Stories from the slow road, algorithmic travel updates, and field notes.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-200 bg-white/80 text-stone-700 hover:text-stone-950 hover:border-stone-400 transition"
                >
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span>@rovetravel</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-200 bg-white/80 text-stone-700 hover:text-stone-950 hover:border-stone-400 transition"
                >
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <span>@rove.journeys</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-200 bg-white/80 text-stone-700 hover:text-stone-950 hover:border-stone-400 transition"
                >
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span>github.com/rovetravel</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-200 bg-white/80 text-stone-700 hover:text-stone-950 hover:border-stone-400 transition"
                >
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Strip */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
            <p>© 2026 ROVE Travel Operating System. Thoughtfully built for unhurried journeys.</p>
            <div className="flex items-center gap-6">
              <span>Privacy & Ethics</span>
              <span>Terms of Wander</span>
              <span>API & Open Data</span>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
};
