'use client';

import React, { useState } from 'react';
import { useRove } from '@/context/RoveContext';
import {
  Clock,
  MapPin,
  Lock,
  Unlock,
  Users,
  ChevronDown,
  ChevronUp,
  Info,
  AlertCircle,
} from 'lucide-react';

export const ItineraryTimeline: React.FC = () => {
  const {
    trip,
    toggleLockDay,
    toggleLockActivity,
  } = useRove();

  const [expandedWhy, setExpandedWhy] = useState<string | null>(null);

  const toggleWhy = (id: string) => {
    setExpandedWhy(expandedWhy === id ? null : id);
  };

  return (
    <section id="itinerary-section" className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-12">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4 mb-8">
        <div>
          <span className="text-xs uppercase font-sans tracking-widest text-stone-500 font-semibold block mb-1">
            Curated Itinerary
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-medium text-stone-900 tracking-tight">
            Day-by-Day Journey Guide
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-stone-600 font-sans">
            Real coordinates, crowd-calibrated timing, and authentic local experiences.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-stone-500 font-sans">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-3 py-1 border border-stone-200">
            <Lock className="h-3 w-3 text-stone-700" />
            <span>Pin any stop to protect it during re-planning</span>
          </span>
        </div>
      </div>

      {/* Days Stack */}
      <div className="space-y-8">
        {trip.days.map((day) => {
          const isDayLocked = day.locked || trip.locked.dayIds?.includes(day.dayNumber);

          return (
            <div
              key={day.dayNumber}
              className={`rounded-3xl border transition-all duration-300 bg-white ${
                isDayLocked
                  ? 'border-stone-900 shadow-md'
                  : 'border-stone-200 shadow-sm hover:border-stone-300'
              }`}
            >
              {/* Day Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 sm:p-8 border-b border-stone-100 bg-stone-50/50 rounded-t-3xl">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-stone-900 px-3 py-1 text-xs font-serif font-medium text-white">
                      Day {day.dayNumber}
                    </span>
                    <h3 className="text-lg sm:text-xl font-serif font-medium text-stone-900 tracking-tight">
                      {day.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1.5 font-sans">
                    {day.subtitle} · <span className="font-medium text-stone-800">{day.area}</span>
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-[10px] text-stone-500 uppercase font-sans font-semibold block">
                      Estimated Day Cost
                    </span>
                    <span className="text-sm sm:text-base font-serif font-medium text-stone-900">
                      ₹{day.estimatedCost.toLocaleString()}
                    </span>
                  </div>

                  {/* Day Lock Button */}
                  <button
                    onClick={() => toggleLockDay(day.dayNumber)}
                    className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition active:scale-98 border ${
                      isDayLocked
                        ? 'bg-stone-900 border-stone-900 text-white'
                        : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                    title="Lock this entire day"
                  >
                    {isDayLocked ? (
                      <>
                        <Lock className="h-3 w-3 text-stone-200" />
                        <span>Day Pinned</span>
                      </>
                    ) : (
                      <>
                        <Unlock className="h-3 w-3 text-stone-400" />
                        <span>Pin Day</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Activities List */}
              <div className="p-6 sm:p-8 divide-y divide-stone-100 space-y-6">
                {day.activities.map((act) => {
                  const isActLocked = act.locked || trip.locked.activityIds?.includes(act.id);
                  const isWhyExpanded = expandedWhy === act.id;

                  return (
                    <div key={act.id} className="pt-6 first:pt-0 group">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        {/* Left: Thumbnail & Editorial Details */}
                        <div className="flex items-start gap-5">
                          {/* Real Travel Photography */}
                          <div className="relative h-24 w-28 sm:h-28 sm:w-36 shrink-0 overflow-hidden rounded-2xl border border-stone-200 shadow-sm">
                            <img
                              src={act.image}
                              alt={act.title}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-2 left-2 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-sans font-semibold text-stone-800 shadow-sm">
                              {act.time}
                            </div>
                          </div>

                          {/* Text info */}
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1.5">
                              <h4 className="text-base sm:text-lg font-serif font-medium text-stone-900 tracking-tight">
                                {act.title}
                              </h4>
                              {act.isHiddenGem && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-sans font-semibold text-amber-900 border border-amber-200">
                                  💎 Local Secret
                                </span>
                              )}
                              {isActLocked && (
                                <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[10px] font-sans font-semibold text-stone-800 border border-stone-200">
                                  📌 Pinned
                                </span>
                              )}
                            </div>

                            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 font-sans">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5 text-stone-400" />
                                <span>{act.location}</span>
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5 text-stone-400" />
                                <span>{act.duration}</span>
                              </span>
                              <span>•</span>
                              <span className="text-stone-700 font-medium">
                                ★ {act.rating} ({act.reviewCount.toLocaleString()} travelers)
                              </span>
                            </div>

                            {/* Crowd Level Indicator */}
                            <div className="mt-2.5 flex flex-wrap items-center gap-2 font-sans">
                              <div className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-2.5 py-0.5 text-[11px] text-stone-700 border border-stone-200">
                                <Users className="h-3 w-3 text-stone-500" />
                                <span>Estimated Crowd:</span>
                                <strong className={act.crowdLevel > 70 ? 'text-amber-800' : 'text-stone-900'}>
                                  {act.crowdLevel}% capacity
                                </strong>
                              </div>

                              {/* Crowd Alternative Smart Recommendation */}
                              {act.crowdAlternative && (
                                <div className="inline-flex items-center gap-1 rounded-full bg-amber-50/70 px-2.5 py-0.5 text-[11px] text-amber-900 border border-amber-200">
                                  <AlertCircle className="h-3 w-3 text-amber-800" />
                                  <span>Quiet alternative: {act.crowdAlternative.name} ({act.crowdAlternative.crowdLevel}% crowd · Saves {act.crowdAlternative.savingMins}m)</span>
                                </div>
                              )}
                            </div>

                            {/* Hidden gem reason if present */}
                            {act.hiddenGemReason && (
                              <p className="mt-2.5 text-xs text-stone-700 bg-stone-50 p-2.5 rounded-xl border border-stone-200 leading-relaxed font-sans">
                                🌿 <strong className="text-stone-900 font-medium">Local Tip:</strong> {act.hiddenGemReason}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Right: Cost & Actions */}
                        <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-2.5 shrink-0 pt-2 md:pt-0">
                          <div className="text-left md:text-right font-sans">
                            <span className="text-[11px] text-stone-500 block">Cost</span>
                            <span className="text-sm sm:text-base font-serif font-medium text-stone-900">
                              {act.cost === 0 ? <span className="text-stone-700">Free admission</span> : `₹${act.cost.toLocaleString()}`}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 mt-1">
                            {/* Why AI Chose This Toggle */}
                            <button
                              onClick={() => toggleWhy(act.id)}
                              className="rounded-full border border-stone-200 bg-white px-3 py-1 text-[11px] font-sans font-medium text-stone-700 hover:bg-stone-50 transition flex items-center gap-1 shadow-sm"
                              title="Why was this stop chosen?"
                            >
                              <Info className="h-3 w-3 text-stone-500" />
                              <span>Why chosen</span>
                              {isWhyExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                            </button>

                            {/* Lock Activity Button */}
                            <button
                              onClick={() => toggleLockActivity(act.id)}
                              className={`rounded-full p-1.5 text-xs transition border ${
                                isActLocked
                                  ? 'bg-stone-900 border-stone-900 text-white'
                                  : 'bg-white border-stone-200 text-stone-500 hover:bg-stone-50 hover:text-stone-900'
                              }`}
                              title={isActLocked ? 'Unpin activity' : 'Pin activity to protect it'}
                            >
                              {isActLocked ? <Lock className="h-3.5 w-3.5" /> : <Unlock className="h-3.5 w-3.5" />}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Expandable Explanation Box */}
                      {isWhyExpanded && (
                        <div className="mt-4 rounded-2xl border border-stone-200 bg-stone-50 p-4 text-xs text-stone-700 font-sans">
                          <div className="font-semibold text-stone-900 mb-1">
                            Why Rove Selected This Stop
                          </div>
                          <p className="leading-relaxed text-stone-600">{act.whySelected}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
