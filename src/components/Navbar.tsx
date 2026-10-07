'use client';

import React from 'react';
import { useRove } from '@/context/RoveContext';
import {
  Compass,
  Wallet,
  BookOpen,
  Play,
  MessageSquare,
  Radio,
  ArrowRight,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    creditsBalance,
    setIsWalletOpen,
    setIsPassportOpen,
    setIsBookingOpen,
    setIsDemoTourOpen,
    setIsReplayModalOpen,
    setIsNegotiationOpen,
    isTravelModeActive,
    setIsTravelModeActive,
    setIsConciergeOpen,
  } = useRove();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 bg-[#FAF9F5]/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-900 text-stone-50 shadow-sm">
            <Compass className="h-5 w-5 stroke-[1.75]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-serif tracking-tight font-medium text-stone-900">ROVE</span>
              <span className="text-[10px] uppercase font-sans tracking-widest text-stone-500 font-semibold border-l border-stone-300 pl-2">
                Travel OS
              </span>
            </div>
            <p className="hidden text-[11px] text-stone-500 sm:block font-sans">
              Thoughtful, human travel planned by AI
            </p>
          </div>
        </div>

        {/* Center Editorial Links */}
        <nav className="hidden items-center gap-6 lg:flex text-xs font-medium text-stone-600">
          <button
            onClick={() => {
              const el = document.getElementById('itinerary-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-stone-900 transition py-1"
          >
            Itinerary
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('budget-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-stone-900 transition py-1"
          >
            Clear Pricing
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('map-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-stone-900 transition py-1"
          >
            Route Map
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('crowd-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-stone-900 transition py-1"
          >
            Quiet Spots
          </button>
          <button
            onClick={() => setIsNegotiationOpen(true)}
            className="text-stone-900 hover:text-amber-800 transition py-1 flex items-center gap-1 font-semibold"
          >
            Tailored Proposals
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Judge Demo Walkthrough Pill */}
          <button
            onClick={() => setIsDemoTourOpen(true)}
            className="flex items-center gap-1.5 rounded-full border border-stone-300 bg-white px-3.5 py-1.5 text-xs font-medium text-stone-800 shadow-sm hover:border-stone-400 hover:bg-stone-50 transition active:scale-98"
            title="Launch step-by-step judge demonstration"
          >
            <Play className="h-3 w-3 fill-stone-800 text-stone-800" />
            <span>Interactive Demo</span>
          </button>

          {/* Journey Storybook / Replay */}
          <button
            onClick={() => setIsReplayModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 rounded-full border border-stone-200 bg-stone-100/80 px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-200/70 transition"
          >
            <Compass className="h-3.5 w-3.5 text-stone-600" />
            <span>Preview Route</span>
          </button>

          {/* Rove Wallet Badge */}
          <button
            onClick={() => setIsWalletOpen(true)}
            className="flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-700 shadow-sm hover:bg-stone-50 transition"
            title="Rove Credits Wallet"
          >
            <Wallet className="h-3.5 w-3.5 text-amber-700" />
            <span className="font-sans font-semibold">{creditsBalance.toLocaleString()} RC</span>
          </button>

          {/* Digital Passport */}
          <button
            onClick={() => setIsPassportOpen(true)}
            className="hidden md:flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-700 shadow-sm hover:bg-stone-50 transition"
            title="Digital Passport"
          >
            <BookOpen className="h-3.5 w-3.5 text-stone-600" />
            <span>Passport</span>
          </button>

          {/* Travel Concierge */}
          <button
            onClick={() => setIsConciergeOpen(true)}
            className="hidden sm:flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-700 shadow-sm hover:bg-stone-50 transition"
            title="Ask Concierge"
          >
            <MessageSquare className="h-3.5 w-3.5 text-stone-600" />
            <span>Concierge</span>
          </button>

          {/* Travel Mode Toggle */}
          <button
            onClick={() => setIsTravelModeActive(!isTravelModeActive)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${
              isTravelModeActive
                ? 'bg-amber-800 text-white shadow-sm'
                : 'border border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
            }`}
            title="Toggle Live On-Trip Companion"
          >
            <Radio className="h-3 w-3" />
            <span className="hidden sm:inline">{isTravelModeActive ? 'On Trip' : 'Live Mode'}</span>
          </button>

          {/* Reserve / Book CTA */}
          <button
            onClick={() => setIsBookingOpen(true)}
            className="flex items-center gap-1.5 rounded-full bg-stone-900 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-stone-800 transition active:scale-98"
          >
            <span>Review & Reserve</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
