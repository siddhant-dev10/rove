'use client';

import React, { useState } from 'react';
import { useRove } from '@/context/RoveContext';
import {
  Wallet,
  BookOpen,
  Luggage,
  Film,
  Gem,
  Award,
  Globe,
  CheckCircle2,
  LockKeyhole,
  ArrowUpRight,
  Plane,
  Plus,
  Compass,
  Check,
} from 'lucide-react';

export const ProfileSection: React.FC = () => {
  const {
    trip,
    creditsBalance,
    creditTransactions,
    setIsWalletOpen,
    setIsPassportOpen,
    setIsPackingOpen,
    setIsReplayModalOpen,
    setIsBookingOpen,
    badges,
    stamps,
  } = useRove();

  // Local checklist interactive state inside Profile
  const [packingItems, setPackingItems] = useState([
    { id: '1', text: 'SPF 50+ mineral sunscreen (Goa 29°C midday)', checked: true, category: 'Weather' },
    { id: '2', text: 'Waterproof phone dry-bag (Snorkeling & backwaters)', checked: true, category: 'Activity' },
    { id: '3', text: 'Linen shirts & breathable trousers (Assagao cafés)', checked: false, category: 'Apparel' },
    { id: '4', text: 'Quick-drying swimwear & lightweight Turkish towel', checked: false, category: 'Beach' },
    { id: '5', text: 'Treaded walking sandals (Fort Aguada ramparts)', checked: true, category: 'Footwear' },
    { id: '6', text: 'Original Government Photo ID (Hotel check-in)', checked: true, category: 'Essentials' },
    { id: '7', text: 'Portable power bank 10,000 mAh (Navigation & photography)', checked: true, category: 'Gear' },
    { id: '8', text: 'Natural mosquito balm for outdoor evening dining', checked: false, category: 'Wellness' },
  ]);

  const [newItemText, setNewItemText] = useState('');

  const toggleItem = (id: string) => {
    setPackingItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, checked: !it.checked } : it))
    );
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    setPackingItems((prev) => [
      ...prev,
      { id: Date.now().toString(), text: newItemText.trim(), checked: false, category: 'Custom' },
    ]);
    setNewItemText('');
  };

  const packedCount = packingItems.filter((i) => i.checked).length;
  const packedPercentage = Math.round((packedCount / packingItems.length) * 100);

  return (
    <div className="w-full min-h-screen bg-[#f7f5f0] text-stone-900 pt-8 pb-32 animate-in fade-in duration-300">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 space-y-10">
        {/* TRAVELER PROFILE HERO BANNER */}
        <section className="relative overflow-hidden rounded-3xl border border-stone-200/90 bg-white p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-stone-100">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-stone-900 text-white flex items-center justify-center font-serif text-2xl font-semibold shadow-md">
                  SS
                </div>
                <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-white">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="font-serif text-2xl sm:text-3xl text-stone-900 font-medium">
                    Siddhant Shrivastava
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-stone-100 text-stone-700 border border-stone-200">
                    Verified Nomad #ROV-8821
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  Archetype:{' '}
                  <span className="font-semibold text-stone-800">
                    {trip.dna.archetype}
                  </span>{' '}
                  · Tier 4 Slow Voyager
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsWalletOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-stone-200 bg-stone-50 hover:bg-stone-100 text-xs font-medium text-stone-800 transition"
              >
                <Gem className="w-3.5 h-3.5 text-amber-700" />
                <span>{creditsBalance.toLocaleString('en-IN')} RC</span>
              </button>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900 hover:bg-stone-800 text-xs font-semibold text-white shadow-xs transition"
              >
                <span>Current Trip</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
            <div className="rounded-2xl bg-stone-50/70 p-4 border border-stone-100 text-center sm:text-left">
              <span className="text-[10px] uppercase font-semibold text-stone-400 block tracking-wider">
                Distance Traveled
              </span>
              <span className="font-serif text-xl sm:text-2xl font-medium text-stone-900 mt-1 block">
                4,820 km
              </span>
            </div>
            <div className="rounded-2xl bg-stone-50/70 p-4 border border-stone-100 text-center sm:text-left">
              <span className="text-[10px] uppercase font-semibold text-stone-400 block tracking-wider">
                Regions Explored
              </span>
              <span className="font-serif text-xl sm:text-2xl font-medium text-stone-900 mt-1 block">
                3 Regions
              </span>
            </div>
            <div className="rounded-2xl bg-stone-50/70 p-4 border border-stone-100 text-center sm:text-left">
              <span className="text-[10px] uppercase font-semibold text-stone-400 block tracking-wider">
                Completed Trips
              </span>
              <span className="font-serif text-xl sm:text-2xl font-medium text-stone-900 mt-1 block">
                3 Journeys
              </span>
            </div>
            <div className="rounded-2xl bg-stone-50/70 p-4 border border-stone-100 text-center sm:text-left">
              <span className="text-[10px] uppercase font-semibold text-stone-400 block tracking-wider">
                AI Budget Saved
              </span>
              <span className="font-serif text-xl sm:text-2xl font-medium text-emerald-700 mt-1 block">
                ₹3,400 Saved
              </span>
            </div>
          </div>
        </section>

        {/* 4 CORE SECTION HUBS: CREDS, PASSPORT, PACKAGING LIST, TRIP REPLAY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 1. ROVE CREDITS & WALLET (CREDS) */}
          <div className="rounded-3xl border border-stone-200/90 bg-white p-6 sm:p-7 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center">
                    <Wallet className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-medium text-stone-900">
                      Rove Credits (Creds)
                    </h3>
                    <p className="text-[11px] text-stone-500">
                      Direct travel currency & ecosystem loyalty perks
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                  Active Wallet
                </span>
              </div>

              <div className="rounded-2xl bg-[#faf9f5] border border-stone-200/80 p-5 my-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-stone-500">Available Balance</span>
                  <span className="text-[11px] text-stone-400">1 RC = ₹1.00</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Gem className="w-5 h-5 text-amber-700" />
                  <span className="font-serif text-3xl font-medium text-stone-900">
                    {creditsBalance.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-stone-500 font-semibold">RC</span>
                </div>
                <p className="text-xs text-stone-600 mt-2">
                  Redeemable for hotel upgrades, private yacht cruises, or taxi transit credits.
                </p>
              </div>

              {/* Recent activity snippet */}
              <div className="space-y-2 mt-4">
                <span className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider">
                  Recent Activity
                </span>
                {creditTransactions.slice(0, 2).map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between text-xs py-1.5 border-b border-stone-100 last:border-0"
                  >
                    <span className="text-stone-700 truncate max-w-[200px]">{tx.title}</span>
                    <span className="font-semibold text-emerald-700">+{tx.amount} RC</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-stone-100 flex items-center gap-3">
              <button
                onClick={() => setIsWalletOpen(true)}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-stone-900 py-2.5 px-4 text-xs font-semibold text-white hover:bg-stone-800 transition"
              >
                <Wallet className="w-3.5 h-3.5" />
                <span>Open Credits Wallet</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
              </button>
            </div>
          </div>

          {/* 2. DIGITAL PASSPORT */}
          <div className="rounded-3xl border border-stone-200/90 bg-white p-6 sm:p-7 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-stone-100 text-stone-800 flex items-center justify-center">
                    <Globe className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-medium text-stone-900">
                      Rove Digital Passport
                    </h3>
                    <p className="text-[11px] text-stone-500">
                      Regional stamps, wanderer achievements & trail logs
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-stone-100 text-stone-700 border border-stone-200">
                  {stamps.length} Stamps
                </span>
              </div>

              {/* Passport Stamps Visual */}
              <div className="grid grid-cols-3 gap-3 my-4">
                {stamps.slice(0, 3).map((stamp) => (
                  <div
                    key={stamp.id}
                    className="rounded-2xl border border-dashed border-stone-300 bg-[#FAF9F5] p-3 text-center flex flex-col items-center justify-center relative overflow-hidden"
                  >
                    <div className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center text-xs font-serif text-stone-700 mb-1">
                      {stamp.destination.slice(0, 3).toUpperCase()}
                    </div>
                    <span className="text-[11px] font-semibold text-stone-800 truncate w-full">
                      {stamp.destination}
                    </span>
                    <span className="text-[9px] text-stone-400 font-mono mt-0.5">
                      {stamp.date}
                    </span>
                  </div>
                ))}
              </div>

              {/* Badges preview */}
              <div className="space-y-2 mt-4">
                <span className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider">
                  Earned Badges
                </span>
                <div className="flex flex-wrap gap-2">
                  {badges.slice(0, 3).map((b) => (
                    <span
                      key={b.id}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] bg-stone-100 text-stone-700 font-medium"
                    >
                      <Award className="w-3 h-3 text-amber-700" />
                      <span>{b.title}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-stone-100">
              <button
                onClick={() => setIsPassportOpen(true)}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white py-2.5 px-4 text-xs font-semibold text-stone-800 hover:bg-stone-50 transition"
              >
                <BookOpen className="w-3.5 h-3.5 text-stone-600" />
                <span>View Full Passport Book</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
              </button>
            </div>
          </div>

          {/* 3. PACKAGING LIST (PACKING CHECKLIST) */}
          <div className="rounded-3xl border border-stone-200/90 bg-white p-6 sm:p-7 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
                    <Luggage className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-medium text-stone-900">
                      Packing Checklist
                    </h3>
                    <p className="text-[11px] text-stone-500">
                      Weather-aware luggage & travel gear readiness
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-800">
                  {packedCount}/{packingItems.length} Packed ({packedPercentage}%)
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 rounded-full bg-stone-100 overflow-hidden mb-4">
                <div
                  className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
                  style={{ width: `${packedPercentage}%` }}
                />
              </div>

              {/* Interactive Checklist list */}
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {packingItems.slice(0, 5).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-stone-50 transition text-left group"
                  >
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition ${
                        item.checked
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-stone-300 group-hover:border-stone-500'
                      }`}
                    >
                      {item.checked && <Check className="h-3 w-3 stroke-[3]" />}
                    </span>
                    <span
                      className={`text-xs flex-1 truncate ${
                        item.checked ? 'text-stone-400 line-through' : 'text-stone-800'
                      }`}
                    >
                      {item.text}
                    </span>
                    <span className="text-[10px] text-stone-400 font-medium">
                      {item.category}
                    </span>
                  </button>
                ))}
              </div>

              {/* Add item inline */}
              <form onSubmit={handleAddItem} className="mt-3 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Add item..."
                  value={newItemText}
                  onChange={(e) => setNewItemText(e.target.value)}
                  className="flex-1 rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-stone-400"
                />
                <button
                  type="submit"
                  disabled={!newItemText.trim()}
                  className="p-1.5 rounded-lg bg-stone-900 text-white disabled:opacity-40 hover:bg-stone-800 transition"
                  aria-label="Add item"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            <div className="pt-6 mt-4 border-t border-stone-100">
              <button
                onClick={() => setIsPackingOpen(true)}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white py-2.5 px-4 text-xs font-semibold text-stone-800 hover:bg-stone-50 transition"
              >
                <Luggage className="w-3.5 h-3.5 text-stone-600" />
                <span>Open Full Packing Assistant</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
              </button>
            </div>
          </div>

          {/* 4. TRIP REPLAY & MEMORIES */}
          <div className="rounded-3xl border border-stone-200/90 bg-white p-6 sm:p-7 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-800 flex items-center justify-center">
                    <Film className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-medium text-stone-900">
                      Trip Replay & Storybook
                    </h3>
                    <p className="text-[11px] text-stone-500">
                      Interactive route memory playback & visual highlights
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-800 border border-indigo-200/60">
                  4 Days Mapped
                </span>
              </div>

              {/* Replay Preview Card */}
              <div className="relative rounded-2xl overflow-hidden border border-stone-200 my-4 aspect-video bg-stone-900">
                <img
                  src={trip.heroImage}
                  alt={trip.title}
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                  <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-amber-300">
                    <Compass className="w-3 h-3" />
                    <span>Goa Coastal Route Preview</span>
                  </div>
                  <h4 className="font-serif text-sm font-medium mt-0.5">
                    {trip.destination} · {trip.daysCount} Days Replayable
                  </h4>
                  <p className="text-[11px] text-stone-300 line-clamp-1 mt-0.5">
                    Day-by-day GPS path, timing benchmarks, audio memories & crowd metrics
                  </p>
                </div>
              </div>

              <div className="space-y-1 text-xs text-stone-600">
                <div className="flex items-center justify-between py-1 border-b border-stone-100">
                  <span>Day 1: Fort Aguada & Candolim Coast</span>
                  <span className="text-stone-400">11:30 AM</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span>Day 2: Casa De Vagator & Anjuna Sunset</span>
                  <span className="text-stone-400">05:45 PM</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-stone-100">
              <button
                onClick={() => setIsReplayModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-stone-900 py-2.5 px-4 text-xs font-semibold text-white hover:bg-stone-800 transition shadow-xs"
              >
                <Film className="w-3.5 h-3.5" />
                <span>Launch Interactive Trip Replay</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
              </button>
            </div>
          </div>
        </div>

        {/* ACTIVE BOOKINGS & TRAVEL ANCHORS */}
        <section className="rounded-3xl border border-stone-200/90 bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-serif text-xl font-medium text-stone-900">
                Active Itinerary Anchors
              </h3>
              <p className="text-xs text-stone-500">
                Confirmed reservations, locked boutique stays, and transit passes
              </p>
            </div>
            <button
              onClick={() => setIsBookingOpen(true)}
              className="text-xs font-semibold text-stone-900 hover:text-amber-800 transition flex items-center gap-1"
            >
              <span>Manage all reservations</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Stay Anchor */}
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-stone-200 bg-[#FAF9F5]">
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                <img
                  src={trip.hotel.image}
                  alt={trip.hotel.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                  <LockKeyhole className="w-3 h-3" />
                  <span>Locked Anchor Stay</span>
                </div>
                <h4 className="font-serif text-sm font-medium text-stone-900 truncate">
                  {trip.hotel.name}
                </h4>
                <p className="text-[11px] text-stone-500 truncate">
                  {trip.hotel.location} · {trip.hotel.nights} Nights (₹{trip.hotel.totalCost.toLocaleString('en-IN')})
                </p>
              </div>
            </div>

            {/* Flight Anchor */}
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-stone-200 bg-[#FAF9F5]">
              <div className="w-16 h-16 rounded-xl bg-stone-100 flex items-center justify-center shrink-0 text-stone-800">
                <Plane className="w-7 h-7" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-stone-700">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Scheduled Flight</span>
                </div>
                <h4 className="font-serif text-sm font-medium text-stone-900 truncate">
                  {trip.transport.provider} · {trip.transport.flightOrTrainNumber}
                </h4>
                <p className="text-[11px] text-stone-500 truncate">
                  {trip.transport.departure} ➔ {trip.transport.arrival} (₹{trip.transport.cost.toLocaleString('en-IN')})
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
