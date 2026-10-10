'use client';

import React from 'react';
import { useRove } from '@/context/RoveContext';
import {
  CloudRain,
  TrendingDown,
  Train,
  TrendingUp,
  RotateCcw,
  ArrowRight,
  Mountain,
  Compass,
} from 'lucide-react';

export const WhatIfSimulator: React.FC = () => {
  const { trip, activeSimulation, applySimulation } = useRove();

  const isLadakh = trip.destination.toLowerCase().includes('ladakh');
  const isBali = trip.destination.toLowerCase().includes('bali') || trip.destination.toLowerCase().includes('indonesia');

  const goaScenarios = [
    {
      id: 'cheaper2k' as const,
      icon: TrendingDown,
      title: 'Make Trip ₹2,000 Cheaper',
      prompt: 'What if I need to reduce costs right now?',
      budgetImpact: '-₹2,000 Saved (Total ₹12,650)',
      timeImpact: 'Zero daylight hours compromised',
      expImpact: 'Swaps motorized jet ski for sea cave kayaking',
      scoreImpact: 'Balance score surges to 96/100',
      description: 'Guarantees your pinned Casa De Vagator hotel is untouched while optimizing marine passes and local transit.',
    },
    {
      id: 'rain' as const,
      icon: CloudRain,
      title: 'Monsoon Rain Protocol',
      prompt: 'What if coastal showers hit tomorrow?',
      budgetImpact: 'Saves ₹450 on canceled boat rides',
      timeImpact: 'Seamless indoor shift (0 lost hours)',
      expImpact: 'Unlocks Mario Miranda Gallery & Cazulo Cellars',
      scoreImpact: 'Maintains 92/100 (Weatherproofed)',
      description: 'Rove instantly substitutes open-water activities with indoor Portuguese tile ateliers and private craft tastings.',
    },
    {
      id: 'train' as const,
      icon: Train,
      title: 'Vande Bharat Express Transit',
      prompt: 'What if I travel by scenic train instead?',
      budgetImpact: 'Saves ₹1,300 in transit (₹2,900 vs ₹4,200)',
      timeImpact: '+6 hours scenic travel through Konkan ghats',
      expImpact: 'Mountain vistas + 77% CO2 reduction',
      scoreImpact: 'Adjusted to 89/100',
      description: 'Converts travel into an experience. Frees up ₹1,300 to upgrade culinary meals or extend boutique nights.',
    },
    {
      id: 'budgetUp5k' as const,
      icon: TrendingUp,
      title: 'Stretch Budget by ₹5,000',
      prompt: 'What if I expand my budget to ₹20,000?',
      budgetImpact: 'Expands cap to ₹20,000 (+₹5,000 surplus)',
      timeImpact: 'Zero change to transit schedule',
      expImpact: 'Private yacht charter + private scuba guide',
      scoreImpact: 'Reaches 97/100 (Bespoke Luxury)',
      description: 'Unlocks private marine charters, a pool villa suite upgrade, and private chef pairings.',
    },
  ];

  const ladakhScenarios = [
    {
      id: 'cheaper2k' as const,
      icon: TrendingDown,
      title: 'Make Trip ₹3,000 Cheaper',
      prompt: 'What if I want to save without missing passes?',
      budgetImpact: '-₹3,000 Saved (Total ₹36,800)',
      timeImpact: 'Zero daylight hours compromised',
      expImpact: 'Swaps private ATV for peaceful Hunder dune walk',
      scoreImpact: 'Balance score surges to 97/100',
      description: 'Protects The Grand Dragon stay while consolidating local 4x4 mountain transit passes.',
    },
    {
      id: 'rain' as const,
      icon: Mountain,
      title: 'Gradual Acclimatization Buffer',
      prompt: 'What if we need extra rest at 11,500 ft?',
      budgetImpact: 'Zero cost delta',
      timeImpact: 'Adds extra peaceful morning in Leh',
      expImpact: 'Replaces steep fort steps with quiet herbal tea veranda',
      scoreImpact: 'Altitude safety index 100/100',
      description: 'Rove extends Day 1 hydration and oxygen recovery before ascending the 5,359m Khardung La pass.',
    },
    {
      id: 'train' as const,
      icon: Compass,
      title: 'Manali-Leh Overland Route',
      prompt: 'What if we drive through high passes instead?',
      budgetImpact: 'Saves ₹4,500 vs peak season flights',
      timeImpact: '+1.5 days scenic mountain crossing',
      expImpact: 'Rohtang, Baralacha & Gata Loops vistas',
      scoreImpact: 'Adjusted to 93/100 (Epic Road Trip)',
      description: 'Transforms transit into the ultimate road journey through high Himalayan passes.',
    },
    {
      id: 'budgetUp5k' as const,
      icon: TrendingUp,
      title: 'Stretch Budget by ₹5,000',
      prompt: 'What if we upgrade to luxury astro-glamping?',
      budgetImpact: 'Expands cap to ₹47,000 (+₹5,000 surplus)',
      timeImpact: 'Zero transit disruption',
      expImpact: 'Luxury heated astro-dome camp at Pangong Tso',
      scoreImpact: 'Reaches 99/100 (Unforgettable Stargazing)',
      description: 'Unlocks a heated luxury dome tent by Pangong lake with private astronomical telescope session.',
    },
  ];

  const baliScenarios = [
    {
      id: 'cheaper2k' as const,
      icon: TrendingDown,
      title: 'Make Trip ₹3,000 Cheaper',
      prompt: 'What if I want to trim island expenses?',
      budgetImpact: '-₹3,000 Saved (Total ₹61,500)',
      timeImpact: 'Zero daylight hours compromised',
      expImpact: 'Swaps private speedboat with scenic coastal snorkel pass',
      scoreImpact: 'Balance score surges to 97/100',
      description: 'Keeps Komaneka jungle villa locked while optimizing transit and dining choices.',
    },
    {
      id: 'rain' as const,
      icon: CloudRain,
      title: 'Tropical Rain Protocol',
      prompt: 'What if tropical showers hit the coast?',
      budgetImpact: 'Saves ₹600 on outdoor surf passes',
      timeImpact: 'Zero lost hours',
      expImpact: 'Unlocks Celuk silver artisan atelier & herbal spa',
      scoreImpact: 'Maintains 95/100 (Weatherproofed)',
      description: 'Rove smoothly shifts open-water activities to indoor Balinese silver-making ateliers and botanical herbal spas.',
    },
    {
      id: 'train' as const,
      icon: Compass,
      title: 'Nusa Penida Overnight Extension',
      prompt: 'What if we stay overnight on Nusa Penida island?',
      budgetImpact: '+₹1,200 island bungalow delta',
      timeImpact: '+1 day exploring dramatic sea arches',
      expImpact: 'Sunrise at Diamond Beach before tourist crowds arrive',
      scoreImpact: 'Adjusted to 96/100',
      description: 'Adds an overnight island stay to witness Kelingking viewpoint and Diamond beach in peaceful dawn solitude.',
    },
    {
      id: 'budgetUp5k' as const,
      icon: TrendingUp,
      title: 'Stretch Budget by ₹5,000',
      prompt: 'What if we add private villa luxury?',
      budgetImpact: 'Expands cap to ₹73,000 (+₹5,000 surplus)',
      timeImpact: 'Zero schedule change',
      expImpact: 'Private infinity plunge pool + floating breakfast & spa',
      scoreImpact: 'Reaches 98/100 (Bespoke Sanctuary)',
      description: 'Unlocks an upgraded cliff suite in Uluwatu, floating flower bath breakfast, and private catamaran.',
    },
  ];

  const scenarios = isLadakh ? ladakhScenarios : isBali ? baliScenarios : goaScenarios;

  return (
    <section id="simulator-section" className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-12">
      <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-10 shadow-sm">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4 border-b border-stone-100 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase font-sans tracking-widest text-stone-500 font-semibold block">
                Adaptive Intelligence
              </span>
              <span className="text-stone-300">•</span>
              <span className="text-xs font-serif text-stone-600 italic">
                {trip.destination}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-stone-900 tracking-tight">
              Thoughtful Journey Scenarios
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-stone-600 font-sans">
              Travel isn’t rigid. Test real-world scenarios to see how Rove adapts budget, timing, and experience quality.
            </p>
          </div>

          {activeSimulation !== 'none' && (
            <button
              onClick={() => applySimulation('none')}
              className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-stone-50 px-3.5 py-1.5 text-xs font-sans font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Active Scenario</span>
            </button>
          )}
        </div>

        {/* 4 Scenario Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {scenarios.map((sc) => {
            const Icon = sc.icon;
            const isActive = activeSimulation === sc.id;

            return (
              <div
                key={sc.id}
                className={`rounded-2xl border p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 font-sans ${
                  isActive
                    ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900 shadow-sm'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 border border-stone-200 text-stone-900">
                      <Icon className="h-4 w-4" />
                    </span>

                    {isActive && (
                      <span className="rounded-full bg-stone-900 px-2.5 py-0.5 text-[10px] font-sans font-semibold text-white">
                        ACTIVE SCENARIO
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-serif font-medium text-stone-900 tracking-tight mb-1">
                    {sc.title}
                  </h4>
                  <p className="text-xs text-stone-500 italic mb-3">&quot;{sc.prompt}&quot;</p>
                  <p className="text-xs text-stone-600 mb-4 leading-relaxed">{sc.description}</p>

                  {/* Impact Matrix */}
                  <div className="space-y-1.5 rounded-xl border border-stone-200 bg-stone-50 p-3 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-stone-500">Budget Impact:</span>
                      <strong className="text-stone-900 text-right font-medium">{sc.budgetImpact}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Pacing:</span>
                      <strong className="text-stone-900 text-right font-medium">{sc.timeImpact}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Balance:</span>
                      <strong className="text-stone-900 text-right font-medium">{sc.scoreImpact}</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-100">
                  <button
                    onClick={() => applySimulation(isActive ? 'none' : sc.id)}
                    className={`w-full flex items-center justify-center gap-1.5 rounded-full py-2 text-xs font-semibold transition active:scale-98 cursor-pointer ${
                      isActive
                        ? 'bg-stone-200 text-stone-800 hover:bg-stone-300'
                        : 'bg-stone-900 text-white hover:bg-stone-800'
                    }`}
                  >
                    <span>{isActive ? 'Deactivate Scenario' : 'Simulate Scenario'}</span>
                    {!isActive && <ArrowRight className="h-3 w-3" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
