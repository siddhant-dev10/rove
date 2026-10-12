'use client';

import React, { useState } from 'react';
import { useRove } from '@/context/RoveContext';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Wallet,
  Calendar,
  MapPin,
  ChevronRight,
  Clock,
  Info,
} from 'lucide-react';

export const EditorialLandingSections: React.FC = () => {
  const {
    switchTrip,
    setIsTicketHubOpen,
    setIsAiPlanModalOpen,
  } = useRove();

  // Search Bar State
  const [searchDest, setSearchDest] = useState('Goa');
  const [searchDays, setSearchDays] = useState('4');
  const [searchBudget, setSearchBudget] = useState('20000');
  const [activeFilter, setActiveFilter] = useState<'all' | 'coastal' | 'mountains' | 'heritage' | 'island'>('all');

  const escapeCards = [
    {
      id: 'goa',
      title: 'Goa Coastal Odyssey',
      category: 'coastal',
      tagline: 'Quiet coves, Portuguese colonial lanes & secluded sunsets.',
      cost: '₹14,650 for 2',
      duration: '4 Days / 3 Nights',
      season: 'Oct – Mar',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
      badge: 'Most Popular',
    },
    {
      id: 'jaipur',
      title: 'Jaipur Royal Heritage',
      category: 'heritage',
      tagline: 'Terracotta archways, tranquil havelis & desert courtyards.',
      cost: '₹13,200 for 2',
      duration: '4 Days / 3 Nights',
      season: 'Nov – Feb',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
      badge: 'Cultural Landmark',
    },
    {
      id: 'manali',
      title: 'Manali Alpine Sanctuary',
      category: 'mountains',
      tagline: 'Snow-dusted cedar forests, glacial streams & riverside cabins.',
      cost: '₹16,400 for 2',
      duration: '5 Days / 4 Nights',
      season: 'Apr – Jun & Dec – Feb',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
      badge: 'Mountain Escape',
    },
    {
      id: 'kerala',
      title: 'Kerala Emerald Backwaters',
      category: 'coastal',
      tagline: 'Serene canoe lagoons, coastal spice estates & Ayurvedic healing.',
      cost: '₹15,800 for 2',
      duration: '4 Days / 3 Nights',
      season: 'Sep – Mar',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
      badge: 'Slow Living',
    },
    {
      id: 'bali',
      title: 'Bali Island Immersion',
      category: 'island',
      tagline: 'Ubud jungle terraces, clifftop shrines & surf breaks.',
      cost: '₹34,500 for 2',
      duration: '6 Days / 5 Nights',
      season: 'May – Sep',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
      badge: 'International Island',
    },
    {
      id: 'ladakh',
      title: 'Ladakh High-Altitude Silence',
      category: 'mountains',
      tagline: 'Pangong cobalt shores, Nubra dunes & ancient monasteries.',
      cost: '₹22,000 for 2',
      duration: '5 Days / 4 Nights',
      season: 'Jun – Sep',
      image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80',
      badge: 'Adventure Frontier',
    },
  ];

  const filteredEscapes = escapeCards.filter((c) => activeFilter === 'all' || c.category === activeFilter);

  const weekendGetaways = [
    {
      destination: 'Jaipur from Delhi',
      mode: 'Vande Bharat Express (4h 15m)',
      cost: '₹4,800 per person',
      vibe: 'Royal Forts & Artisan Baolis',
      tripId: 'jaipur',
    },
    {
      destination: 'Goa from Mumbai',
      mode: 'Volvo 9600 Luxury Sleeper (11h)',
      cost: '₹3,950 per person',
      vibe: 'Quiet North Coast & Beach Cabanas',
      tripId: 'goa',
    },
    {
      destination: 'Udaipur from Ahmedabad',
      mode: 'Superfast Scenic Rail (4h 50m)',
      cost: '₹4,200 per person',
      vibe: 'Lake Pichola Sunset Dining',
      tripId: 'udaipur',
    },
  ];

  const experiences = [
    { title: 'Authentic Coastal Seafood & Cellars', category: 'Food & Wine', icon: '🍽️', count: '48 verified spots' },
    { title: 'Portuguese Heritage & Azulejos', category: 'Art & Architecture', icon: '🏛️', count: '32 historic gems' },
    { title: 'Secret Lagoon & Backwater Kayaking', category: 'Nature & Wildlife', icon: '🌿', count: '19 zero-crowd routes' },
    { title: 'Cliffside Sunset Jazz & Sundowners', category: 'Music & Atmosphere', icon: '🌅', count: '24 prime terraces' },
  ];

  const travelStories = [
    {
      title: 'How to Spend 4 Days in Goa Without Backtracking Once',
      excerpt: 'Why grouping coastal hotspots by geography saves 32 km in cab fares and lets you actually enjoy the sea breeze.',
      readTime: '4 min read',
      destination: 'Goa',
      tripId: 'goa',
    },
    {
      title: 'The Silent High Passes: Acclimatizing Gently in Leh',
      excerpt: 'Why Rove schedules a full 24 hours of rest in Leh before ascending Khardung La, protecting both safety and stamina.',
      readTime: '6 min read',
      destination: 'Ladakh',
      tripId: 'ladakh',
    },
    {
      title: 'From Street Kachoris to Sunset Havelis: Jaipur in Slow Motion',
      excerpt: 'An insider guide to skipping crowded afternoon tour buses in favor of tranquil morning stepwells and heritage courtyards.',
      readTime: '5 min read',
      destination: 'Jaipur',
      tripId: 'jaipur',
    },
  ];

  return (
    <div className="w-full space-y-24 py-16">
      {/* 1. HERO INSPIRATION & INTERACTIVE SEARCH */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="rounded-3xl bg-stone-900 p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.15),transparent_60%)]" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-200 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Somewhere wonderful is waiting.
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
              Tell Rove what you’re dreaming of.
            </h1>
            <p className="text-stone-300 text-sm sm:text-base max-w-xl leading-relaxed">
              Discover destinations, build your itinerary, and organize your next adventure with your personal AI travel concierge.
            </p>
          </div>

          {/* Conversational Interactive Search Bar */}
          <div className="relative z-10 mt-10 rounded-2xl bg-white p-3 sm:p-4 text-stone-900 shadow-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center">
            <div className="p-2 sm:border-r sm:border-stone-200">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-600" /> Destination
              </label>
              <select
                value={searchDest}
                onChange={(e) => setSearchDest(e.target.value)}
                className="w-full font-serif font-medium text-sm text-stone-900 bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="Goa">Goa, India</option>
                <option value="Jaipur">Jaipur, Rajasthan</option>
                <option value="Manali">Manali, Himachal</option>
                <option value="Kerala">Kerala Backwaters</option>
                <option value="Udaipur">Udaipur, Rajasthan</option>
                <option value="Kashmir">Srinagar, Kashmir</option>
                <option value="Ladakh">Leh Ladakh</option>
                <option value="Bali">Bali, Indonesia</option>
              </select>
            </div>

            <div className="p-2 sm:border-r sm:border-stone-200">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-amber-600" /> Duration
              </label>
              <select
                value={searchDays}
                onChange={(e) => setSearchDays(e.target.value)}
                className="w-full font-serif font-medium text-sm text-stone-900 bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="3">3 Days (Weekend Escape)</option>
                <option value="4">4 Days (Standard Trip)</option>
                <option value="5">5 Days (Relaxed Flow)</option>
                <option value="7">7 Days (Full Holiday)</option>
              </select>
            </div>

            <div className="p-2 lg:border-r lg:border-stone-200">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1 flex items-center gap-1">
                <Wallet className="w-3 h-3 text-amber-600" /> Target Budget
              </label>
              <select
                value={searchBudget}
                onChange={(e) => setSearchBudget(e.target.value)}
                className="w-full font-serif font-medium text-sm text-stone-900 bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="12000">₹12,000 (Smart Budget)</option>
                <option value="20000">₹20,000 (Comfortable)</option>
                <option value="35000">₹35,000 (Premium Luxury)</option>
              </select>
            </div>

            <div className="p-1">
              <button
                onClick={() => {
                  switchTrip(searchDest.toLowerCase());
                  setIsAiPlanModalOpen(true);
                }}
                className="w-full h-full py-3.5 px-6 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span>Plan my journey</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DISCOVER YOUR NEXT ESCAPE */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60 inline-block mb-2">
              Curated Itineraries
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900">
              Discover Your Next Escape
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Balanced, route-clustered journeys designed by AI to prevent travel fatigue.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-white border border-stone-200 text-xs">
            {(['all', 'coastal', 'mountains', 'heritage', 'island'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1.5 rounded-lg capitalize transition cursor-pointer font-medium ${
                  activeFilter === cat ? 'bg-stone-900 text-white shadow-2xs' : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Escapes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEscapes.map((esc) => (
            <div
              key={esc.id}
              className="rounded-3xl border border-stone-200 bg-white overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={esc.image}
                    alt={esc.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-stone-950/70 text-white backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold">
                    {esc.badge}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-white/90 text-stone-900 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-serif font-bold">
                    {esc.cost}
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-amber-900 transition">
                    {esc.title}
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed">{esc.tagline}</p>
                  <div className="pt-2 flex items-center justify-between text-[11px] text-stone-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-stone-500" /> {esc.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-stone-500" /> Best: {esc.season}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-stone-100 flex items-center justify-between">
                <button
                  onClick={() => {
                    switchTrip(esc.id);
                    setIsTicketHubOpen(true);
                  }}
                  className="text-xs font-semibold text-stone-900 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore Tickets & Stays</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. WEEKEND GETAWAYS UNDER ₹5,000 / ₹10,000 */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 space-y-6">
        <div>
          <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60 inline-block mb-2">
            Budget Smart
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900">
            Weekend Getaways Under ₹5,000
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Carefully calculated mini-breaks utilizing high-speed rail and sleeper buses to cut hotel nights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {weekendGetaways.map((wk, i) => (
            <div
              key={i}
              className="rounded-3xl border border-stone-200 bg-white p-6 space-y-4 shadow-xs hover:border-stone-400 transition"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-stone-900">{wk.destination}</h3>
                <span className="font-serif text-sm font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {wk.cost}
                </span>
              </div>
              <p className="text-xs text-stone-500">{wk.vibe}</p>
              <div className="p-3 rounded-2xl bg-[#faf9f5] border border-stone-200/70 text-[11px] text-stone-700 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{wk.mode}</span>
              </div>
              <button
                onClick={() => {
                  switchTrip(wk.tripId);
                  setIsTicketHubOpen(true);
                }}
                className="w-full py-2.5 rounded-xl border border-stone-200 hover:border-stone-900 text-xs font-semibold text-stone-800 hover:text-stone-950 transition cursor-pointer"
              >
                Inspect Itinerary & Fares
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. HOW ROVE WORKS */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-500">
            The Rove System
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900">
            How Rove Plans & Books Your Journey
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Three disciplined steps from inspiration to confirmed tickets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-3xl border border-stone-200/80 bg-white p-6 space-y-3 shadow-xs">
            <span className="font-serif text-4xl text-amber-800/40 font-bold block">01</span>
            <h3 className="font-serif text-xl font-bold text-stone-900">Tell Rove Your Vision</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Input destination, dates, travel party, and exact budget limit. Specify whether you want high-energy water sports, quiet cultural havelis, or slower mornings.
            </p>
          </div>

          <div className="rounded-3xl border border-stone-200/80 bg-white p-6 space-y-3 shadow-xs">
            <span className="font-serif text-4xl text-amber-800/40 font-bold block">02</span>
            <h3 className="font-serif text-xl font-bold text-stone-900">AI Balances & Clusters</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Our multi-agent system calculates OSRM driving routes, monitors Open-Meteo weather patterns, protects your anchor hotel, and groups highlights geographically to kill backtrack transit.
            </p>
          </div>

          <div className="rounded-3xl border border-stone-200/80 bg-white p-6 space-y-3 shadow-xs">
            <span className="font-serif text-4xl text-amber-800/40 font-bold block">03</span>
            <h3 className="font-serif text-xl font-bold text-stone-900">Lock In with Verified PNRs</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Review passenger details and cancellation policies. Authorize multi-modal booking to generate legitimate bus berths, rail quotas, flight PNRs, hotel vouchers, and dining passes.
            </p>
          </div>
        </div>
      </section>

      {/* 5. POPULAR EXPERIENCES */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 space-y-6">
        <div>
          <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60 inline-block mb-2">
            Curated Passions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900">
            Popular Experiences
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            From spice distillery tours to high-altitude pass crossings.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="rounded-2xl border border-stone-200 bg-white p-5 space-y-2 shadow-xs hover:border-stone-400 transition"
            >
              <div className="text-2xl">{exp.icon}</div>
              <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">{exp.category}</span>
              <h4 className="font-serif text-base font-bold text-stone-900">{exp.title}</h4>
              <p className="text-[11px] text-stone-500">{exp.count}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. SPONSORED TRAVEL SPOTLIGHT (CLEARLY LABELED) */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="rounded-3xl border border-amber-200/70 bg-gradient-to-r from-amber-50/60 via-stone-50 to-orange-50/40 p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded border border-amber-300">
              Sponsored Placement
            </span>
            <span className="text-[11px] text-stone-400 flex items-center gap-1">
              <Info className="w-3 h-3" /> Transparent Partner Campaign
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-2">
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                W Goa Luxury Oceanfront Retreat · Exclusive Weekend Package
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Enjoy priority Rock Pool sundowner reservations, complimentary airport EV transfer, and daily Ayurvedic breakfast on the Vagator cliff.
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end justify-center gap-2">
              <span className="text-xs text-stone-500">Starting from ₹4,800 / night</span>
              <button
                onClick={() => {
                  switchTrip('goa');
                  setIsTicketHubOpen(true);
                }}
                className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition cursor-pointer"
              >
                View Partner Availability
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TRAVEL STORIES & EDITORIAL GUIDES */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 space-y-6">
        <div>
          <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-500">
            Editorial Perspectives
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900">
            Travel Stories & Route Guides
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Field reports and route optimization studies written for unhurried wanderers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {travelStories.map((st, i) => (
            <div
              key={i}
              className="rounded-3xl border border-stone-200 bg-white p-6 space-y-3 shadow-xs hover:border-stone-400 transition flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                  {st.readTime}
                </span>
                <h3 className="font-serif text-lg font-bold text-stone-900 leading-snug">{st.title}</h3>
                <p className="text-xs text-stone-500 leading-relaxed">{st.excerpt}</p>
              </div>
              <button
                onClick={() => {
                  switchTrip(st.tripId);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="pt-3 border-t border-stone-100 text-xs font-semibold text-stone-900 hover:text-amber-800 flex items-center justify-between cursor-pointer"
              >
                <span>Load {st.destination} Workspace</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 8. TRUST, TRANSPARENCY & DISCLOSURE */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="rounded-3xl border border-stone-200 bg-white p-8 sm:p-12 space-y-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            <h2 className="font-serif text-2xl font-bold text-stone-900">Trust & Transparency Principles</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-stone-600 leading-relaxed">
            <div className="space-y-2">
              <h4 className="font-semibold text-stone-900 text-sm">Provider Relationships</h4>
              <p>
                Rove connects with authorized booking pathways (IRCTC rail partners, GDS airline inventories, and licensed intercity bus fleets). We never scrape or bypass official access controls.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-stone-900 text-sm">Transparent Pricing</h4>
              <p>
                Estimates include known baseline fares. No unexpected convenience surcharges are added at checkout without explicit line-item disclosure.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-stone-900 text-sm">Confirmation Disclosures</h4>
              <p>
                We only mark a reservation as “Confirmed” when legitimate provider references (PNRs or voucher codes) are verified. Unsupported flows are clearly routed to official checkout.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
