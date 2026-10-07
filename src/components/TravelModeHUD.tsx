'use client';

import React, { useState } from 'react';
import { useRove } from '@/context/RoveContext';
import {
  Sun,
  Navigation,
  PhoneCall,
  X,
  AlertCircle,
  Radio,
} from 'lucide-react';

export const TravelModeHUD: React.FC = () => {
  const { isTravelModeActive, setIsTravelModeActive } = useRove();
  const [delaySimulated, setDelaySimulated] = useState(false);

  if (!isTravelModeActive) return null;

  return (
    <div className="fixed top-16 left-0 right-0 z-30 border-b border-stone-800 bg-stone-950 text-stone-200 px-4 py-2.5 shadow-lg">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        {/* Left Status */}
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-stone-800 text-stone-200 shrink-0">
            <Radio className="h-3.5 w-3.5 animate-pulse text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white tracking-wide text-[11px] uppercase">
                Active Travel Mode
              </span>
              <span className="rounded bg-stone-800 px-1.5 py-0.5 text-[10px] text-stone-400 font-mono">
                GOA · ON SCHEDULE
              </span>
            </div>
            <p className="text-[11px] text-stone-400">
              Next Stop: <span className="text-stone-100 font-medium">Fort Aguada Ramparts (11:30 AM · 15m away)</span>
            </p>
          </div>
        </div>

        {/* Center Live Telemetry */}
        <div className="flex items-center gap-4 text-stone-400 text-xs">
          <div className="flex items-center gap-1.5">
            <Sun className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-stone-300">29°C · Clear Coastal Sky</span>
          </div>
          <span className="text-stone-700 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5">
            <Navigation className="h-3.5 w-3.5 text-stone-400" />
            <span className="text-stone-300">Chauffeur: EV Sedan #GA-03-9082</span>
          </div>
          <span className="text-stone-700 hidden sm:inline">•</span>
          <div className="hidden sm:flex items-center gap-1.5 text-stone-400">
            <span>Spend: ₹0 / ₹14,650</span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Real-time Delay Adaptation Simulator */}
          <button
            onClick={() => {
              setDelaySimulated(!delaySimulated);
              if (!delaySimulated) {
                alert('⚠️ 2-Hour Flight Delay Logged: Rove re-clustered afternoon stops to preserve sunset at Vagator cliffs without extra cost.');
              }
            }}
            className="rounded-lg border border-stone-700 bg-stone-900 px-2.5 py-1 text-[11px] font-medium text-stone-300 hover:bg-stone-800 hover:text-white transition flex items-center gap-1"
          >
            <AlertCircle className="h-3 w-3 text-amber-400" />
            <span>{delaySimulated ? 'Clear Flight Delay' : 'Simulate 2h Delay'}</span>
          </button>

          {/* SOS Help */}
          <button
            onClick={() => alert('Emergency Tourist Helpline Connected: +91 832 2420804 (Goa Dept of Tourism)')}
            className="rounded-lg border border-stone-800 bg-stone-900 px-2.5 py-1 text-[11px] font-medium text-stone-400 hover:text-rose-400 transition flex items-center gap-1"
          >
            <PhoneCall className="h-3 w-3" />
            <span>Assistance</span>
          </button>

          {/* Close Live Mode */}
          <button
            onClick={() => setIsTravelModeActive(false)}
            className="rounded-lg p-1 text-stone-400 hover:text-white hover:bg-stone-800 transition"
            title="Exit Active Travel Mode"
            aria-label="Exit Active Travel Mode"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
