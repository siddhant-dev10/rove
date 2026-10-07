'use client';

import React from 'react';
import { useRove } from '@/context/RoveContext';
import {
  Globe,
  Award,
  X,
} from 'lucide-react';

export const RovePassportModal: React.FC = () => {
  const { isPassportOpen, setIsPassportOpen, badges, stamps } = useRove();

  if (!isPassportOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 p-4 sm:p-6 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl rounded-3xl border border-stone-200 bg-[#FAF9F5] p-6 sm:p-8 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200/80 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-900 text-white">
              <Globe className="h-4 w-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-serif font-medium text-stone-900 tracking-tight">
                  Rove Digital Passport
                </h3>
                <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[10px] font-sans font-semibold text-stone-700 border border-stone-200">
                  Verified Traveler #ROV-8821
                </span>
              </div>
              <p className="text-xs text-stone-500 font-sans">Official travel achievements, completed journeys & regional stamps</p>
            </div>
          </div>

          <button
            onClick={() => setIsPassportOpen(false)}
            className="rounded-full bg-stone-100 p-2 text-stone-600 hover:bg-stone-200 hover:text-stone-900 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Global Travel Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 font-sans">
          <div className="rounded-2xl border border-stone-200 bg-white p-4 text-center shadow-sm">
            <span className="text-[10px] uppercase font-semibold text-stone-500 block">Distance Traveled</span>
            <span className="text-xl sm:text-2xl font-serif font-medium text-stone-900 mt-1 block">4,820 km</span>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-4 text-center shadow-sm">
            <span className="text-[10px] uppercase font-semibold text-stone-500 block">Countries & Regions</span>
            <span className="text-xl sm:text-2xl font-serif font-medium text-stone-900 mt-1 block">3 Regions</span>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-4 text-center shadow-sm">
            <span className="text-[10px] uppercase font-semibold text-stone-500 block">Completed Trips</span>
            <span className="text-xl sm:text-2xl font-serif font-medium text-stone-900 mt-1 block">3 Journeys</span>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-4 text-center shadow-sm">
            <span className="text-[10px] uppercase font-semibold text-stone-500 block">Carbon Offset</span>
            <span className="text-xl sm:text-2xl font-serif font-medium text-stone-900 mt-1 block">142 kg CO2</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-6 pr-1 font-sans">
          {/* Digital Stamps Book */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-stone-700" />
              <span>Official Digital Journey Stamps</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stamps.map((stamp) => (
                <div
                  key={stamp.id}
                  className="rounded-2xl border border-stone-300 bg-white p-5 text-center relative shadow-sm group hover:border-stone-900 transition"
                >
                  <div className="text-3xl mb-2">{stamp.badge.split(' ')[0]}</div>
                  <h5 className="text-base font-serif font-medium text-stone-900">{stamp.destination}</h5>
                  <div className="text-xs text-stone-500 mt-0.5">{stamp.country} · {stamp.date}</div>
                  <div className="mt-3 inline-block rounded-full bg-stone-100 border border-stone-200 px-3 py-1 text-[11px] font-medium text-stone-800">
                    {stamp.badge}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Earned Achievement Badges */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-stone-700" />
              <span>Explorer Achievements</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {badges.map((b) => (
                <div
                  key={b.id}
                  className="rounded-2xl border border-stone-200 bg-white p-4 flex items-start gap-3.5 shadow-sm"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-stone-100 border border-stone-200 text-xl">
                    {b.icon}
                  </span>
                  <div>
                    <div className="flex items-center justify-between">
                      <h5 className="text-sm font-serif font-medium text-stone-900">{b.title}</h5>
                      <span className="text-[10px] text-stone-400 font-mono">{b.dateEarned}</span>
                    </div>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">{b.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
