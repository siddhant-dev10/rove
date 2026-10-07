'use client';

import React from 'react';
import { useRove } from '@/context/RoveContext';

export const TripDNACard: React.FC = () => {
  const { trip } = useRove();
  const { dna, score } = trip;

  const attributes = [
    { label: 'Outdoor Adventure', value: dna.adventure, color: 'bg-stone-900' },
    { label: 'Nature & Shoreline', value: dna.nature, color: 'bg-[#5C7182]' },
    { label: 'Culinary Authenticity', value: dna.food, color: 'bg-[#C27D56]' },
    { label: 'Twilight & Music', value: dna.nightlife, color: 'bg-[#8F8D88]' },
    { label: 'Heritage & History', value: dna.culture, color: 'bg-[#A88B74]' },
    { label: 'Luxury & Comfort', value: dna.luxury, color: 'bg-[#768763]' },
  ];

  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-10 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 border-b border-stone-100 pb-6 mb-8">
        <div>
          <span className="text-xs uppercase font-sans tracking-widest text-stone-500 font-semibold block mb-1">
            Journey Character
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-medium text-stone-900 tracking-tight">
            The Spirit of This Journey
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 font-sans mt-1">
            Algorithmic personality fingerprint calibrated to your stated pace and tastes.
          </p>
        </div>

        {/* Archetype Badge */}
        <div className="rounded-full bg-stone-100 px-4 py-1.5 text-xs font-serif font-medium text-stone-900 border border-stone-200 self-start sm:self-auto">
          Archetype: <span className="italic">{dna.archetype}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Attributes Bars */}
        <div className="lg:col-span-7 space-y-4">
          <p className="text-sm text-stone-700 leading-relaxed font-sans mb-4">
            {dna.description}
          </p>

          <div className="space-y-3.5 pt-2">
            {attributes.map((attr, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center text-xs text-stone-700 mb-1 font-sans">
                  <span className="font-medium">{attr.label}</span>
                  <span className="font-semibold text-stone-900">{attr.value}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${attr.color} transition-all duration-700 ease-out`}
                    style={{ width: `${attr.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Score & Human Critique */}
        <div className="lg:col-span-5 rounded-2xl border border-stone-200 bg-stone-50/80 p-6 flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-sans font-semibold tracking-wider text-stone-500 block mb-1">
              Journey Balance Index
            </span>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl sm:text-5xl font-serif font-medium text-stone-900">
                {score.overall}
              </span>
              <span className="text-sm font-sans text-stone-500">/ 100</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-xs font-sans">
              <div className="rounded-xl bg-white border border-stone-200/80 p-2.5">
                <span className="text-stone-500 text-[10px] block">Budget Adherence</span>
                <strong className="text-stone-900 text-sm font-semibold">{score.budgetEfficiency}%</strong>
              </div>
              <div className="rounded-xl bg-white border border-stone-200/80 p-2.5">
                <span className="text-stone-500 text-[10px] block">Transit Efficiency</span>
                <strong className="text-stone-900 text-sm font-semibold">{score.travelEfficiency}%</strong>
              </div>
              <div className="rounded-xl bg-white border border-stone-200/80 p-2.5">
                <span className="text-stone-500 text-[10px] block">Experience Quality</span>
                <strong className="text-stone-900 text-sm font-semibold">{score.experienceQuality}%</strong>
              </div>
              <div className="rounded-xl bg-white border border-stone-200/80 p-2.5">
                <span className="text-stone-500 text-[10px] block">Daily Schedule Balance</span>
                <strong className="text-stone-900 text-sm font-semibold">{score.scheduleBalance}%</strong>
              </div>
            </div>
          </div>

          <p className="mt-5 text-xs text-stone-600 bg-white p-3.5 rounded-xl border border-stone-200 leading-relaxed font-sans">
            💡 <strong className="text-stone-900 font-semibold">Curator Critique:</strong> {score.critique}
          </p>
        </div>
      </div>
    </div>
  );
};
