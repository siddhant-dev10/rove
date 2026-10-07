'use client';

import React, { useState } from 'react';
import { useRove } from '@/context/RoveContext';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
} from 'lucide-react';

export const GuidedDemoTour: React.FC = () => {
  const {
    isDemoTourOpen,
    setIsDemoTourOpen,
    toggleLockHotel,
    isHotelLocked,
    reoptimizeTrip,
    setIsReplayModalOpen,
    earnCredits,
    resetTripToDefault,
  } = useRove();

  const [stepIndex, setStepIndex] = useState(0);

  if (!isDemoTourOpen) return null;

  const tourSteps = [
    {
      stepNumber: 1,
      tag: 'Constraint Resolution',
      title: '1. Traveler Input & Strict Financial Boundaries',
      description:
        'The traveler specifies: Goa · 3 Nights · 2 Guests · Strict ₹15,000 Total Budget · Coastal Trails & Ocean Activities. Rather than assembling a generic list, Rove treats this as a dynamic multi-variable optimization problem.',
      highlightAction: () => {
        resetTripToDefault();
        const el = document.getElementById('itinerary-section');
        el?.scrollIntoView({ behavior: 'smooth' });
      },
      actionText: 'Scroll to Itinerary',
    },
    {
      stepNumber: 2,
      tag: 'Geographic Intelligence',
      title: '2. Clustered Route & Transit Elimination',
      description:
        'Rove analyzes physical coordinates. Days 1 & 2 are strictly clustered across North Goa (Candolim, Vagator, Assagao) to eliminate 32 km of cross-river taxi transit and bypass bottleneck toll bridges.',
      highlightAction: () => {
        const el = document.getElementById('map-section');
        el?.scrollIntoView({ behavior: 'smooth' });
      },
      actionText: 'Inspect Geographic Route',
    },
    {
      stepNumber: 3,
      tag: 'Budget Intelligence',
      title: '3. Transparent Ledger & Ground Verification',
      description:
        'Every single item reflects verified local rates. Total planned cost stands precisely at ₹14,650 against the ₹15,000 ceiling, leaving a clean ₹350 contingency reserve with zero hidden markup.',
      highlightAction: () => {
        const el = document.getElementById('budget-section');
        el?.scrollIntoView({ behavior: 'smooth' });
      },
      actionText: 'View Financial Ledger',
    },
    {
      stepNumber: 4,
      tag: 'Trip Personality',
      title: '4. Algorithmic Trip DNA & Curated Balance',
      description:
        'Rove synthesizes the traveler archetype: Coastal Maverick & Adrenaline Nomad (88% Adventure, 84% Nature, 76% Local Food) with a 92/100 Schedule Equilibrium score.',
      highlightAction: () => {
        const el = document.getElementById('dna-section');
        el?.scrollIntoView({ behavior: 'smooth' });
      },
      actionText: 'Inspect Trip DNA',
    },
    {
      stepNumber: 5,
      tag: 'Signature Interaction',
      title: '5. The Lock Interaction (Hotel Protected)',
      description:
        'The traveler selects Casa De Vagator Heritage Haven (₹4,500 for 3 nights). By clicking [Lock Hotel], the AI commits never to replace or downgrade this property during future recalibrations.',
      highlightAction: () => {
        if (!isHotelLocked) toggleLockHotel();
        const el = document.getElementById('itinerary-section');
        el?.scrollIntoView({ behavior: 'smooth' });
      },
      actionText: 'Lock Hotel Now',
    },
    {
      stepNumber: 6,
      tag: 'Dynamic Re-Optimization',
      title: "6. Conversational Re-Optimization: 'Reduce by ₹2,000'",
      description:
        'The core wow moment. When instructed to lower total costs by ₹2,000, Casa De Vagator remains securely locked at ₹4,500. Activities and local transport adjust dynamically, bringing total spend down to ₹12,650.',
      highlightAction: () => {
        reoptimizeTrip(2000);
      },
      actionText: 'Execute Re-Optimization (Save ₹2,000)',
    },
    {
      stepNumber: 7,
      tag: 'Crowd Intelligence',
      title: '7. Live Crowd Bypass & Handpicked Secrets',
      description:
        'Rove assesses live congestion metrics: Baga Beach is at 94% capacity. The system guides travelers to the serene red cliffs of Vagator (41% capacity) and reveals heritage gems like the Divar Island Ferry.',
      highlightAction: () => {
        const el = document.getElementById('crowd-section');
        el?.scrollIntoView({ behavior: 'smooth' });
      },
      actionText: 'View Crowd Bypass',
    },
    {
      stepNumber: 8,
      tag: 'Visual Storytelling',
      title: '8. Animated Geographic Route Playback',
      description:
        'Witness the physical journey come alive. An interactive waypoint journey traces arrival from Dabolim Airport to hotel check-in, Aguada coastal ramparts, and secluded marine reefs.',
      highlightAction: () => {
        setIsReplayModalOpen(true);
      },
      actionText: 'Launch Journey Playback',
    },
    {
      stepNumber: 9,
      tag: 'Loyalty & Recognition',
      title: '9. Rove Credits & The Traveler Passport',
      description:
        'The traveler earns +150 Rove Credits for intelligent budget adherence, unlocks the “Constraint Explorer” badge, and stamps their digital travel passport with the North Goa Heritage seal.',
      highlightAction: () => {
        earnCredits(150, 'Completed Demonstration Walkthrough');
      },
      actionText: 'Collect +150 Rove Credits',
    },
  ];

  const current = tourSteps[stepIndex];

  const nextStep = () => {
    if (stepIndex < tourSteps.length - 1) {
      const nextIdx = stepIndex + 1;
      setStepIndex(nextIdx);
      tourSteps[nextIdx].highlightAction();
    } else {
      setIsDemoTourOpen(false);
    }
  };

  const prevStep = () => {
    if (stepIndex > 0) {
      const prevIdx = stepIndex - 1;
      setStepIndex(prevIdx);
      tourSteps[prevIdx].highlightAction();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 p-4 sm:p-6 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-2xl flex flex-col text-stone-900">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-stone-100 pb-5 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-stone-100 text-stone-700">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Product Walkthrough
              </span>
              <span className="text-stone-300">•</span>
              <span className="text-xs font-mono font-medium text-stone-600">
                Step {current.stepNumber} of {tourSteps.length}
              </span>
            </div>
            <h3 className="font-serif text-2xl text-stone-900 tracking-tight">
              Interactive System Tour
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Curated walkthrough of Rove’s core architectural and user experience breakthroughs
            </p>
          </div>

          <button
            onClick={() => setIsDemoTourOpen(false)}
            className="rounded-full p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition"
            aria-label="Close tour"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Step Body */}
        <div className="py-2">
          <div className="inline-block rounded-md bg-stone-100 px-2.5 py-1 text-[11px] font-medium text-stone-600 mb-3">
            {current.tag}
          </div>
          <h4 className="font-serif text-xl sm:text-2xl font-normal text-stone-900 tracking-tight mb-2.5">
            {current.title}
          </h4>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6 font-light">
            {current.description}
          </p>

          {/* Action Trigger Card */}
          <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
            <div className="text-xs text-stone-600">
              <span className="font-medium text-stone-800">Demonstration Action:</span> Trigger this transformation live on screen
            </div>
            <button
              onClick={current.highlightAction}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-2.5 text-xs font-medium text-white hover:bg-stone-800 transition active:scale-95 shadow-sm"
            >
              <span>{current.actionText}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between border-t border-stone-100 pt-5 mt-2">
          <button
            onClick={prevStep}
            disabled={stepIndex === 0}
            className="flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3.5 py-2 text-xs font-medium text-stone-600 hover:bg-stone-50 hover:text-stone-900 disabled:opacity-30 transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-1.5">
            {tourSteps.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === stepIndex ? 'w-5 bg-stone-900' : 'w-1.5 bg-stone-200'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextStep}
            className="flex items-center gap-1.5 rounded-xl bg-stone-900 px-4 py-2 text-xs font-medium text-white hover:bg-stone-800 transition active:scale-95 shadow-sm"
          >
            <span>{stepIndex === tourSteps.length - 1 ? 'Conclude Tour' : 'Next Step'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
