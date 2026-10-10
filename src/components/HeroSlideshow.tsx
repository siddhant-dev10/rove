'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Navigation,
  Star,
  SunMedium,
  Pause,
  Play,
} from 'lucide-react';
import { useRove } from '@/context/RoveContext';

export interface HeroSlide {
  id: string;
  destination: string;
  titleScript: string;
  tagline: string;
  dates: string;
  nights: number;
  travelers: number;
  region: string;
  weather: string;
  score: number;
  eyebrow: string;
  image: string;
  accentColor: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'goa',
    destination: 'Goa',
    titleScript: ', slowly discovered.',
    tagline: 'Quiet coastal coves, Portuguese colonial lanes & unhurried bohemian shores.',
    dates: '12 Dec 2026 — 15 Dec 2026',
    nights: 3,
    travelers: 2,
    region: 'North & Central Coast',
    weather: '29°C · Coastal skies',
    score: 92,
    eyebrow: 'Your active trip workspace · Coastal blueprint',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1800&q=85',
    accentColor: '#14B8A6',
  },
  {
    id: 'jaipur',
    destination: 'Jaipur',
    titleScript: ', timelessly unhurried.',
    tagline: 'Terracotta archways, tranquil heritage havelis & golden desert courtyards.',
    dates: '18 Jan 2027 — 22 Jan 2027',
    nights: 4,
    travelers: 2,
    region: 'Amber Fort & Pink City',
    weather: '22°C · Golden desert skies',
    score: 95,
    eyebrow: 'Featured blueprint · Royal heritage',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1800&q=85',
    accentColor: '#FFB74D',
  },
  {
    id: 'manali',
    destination: 'Manali',
    titleScript: ', peacefully elevated.',
    tagline: 'Misty Himalayan pine forests, glacial river trails & secluded cedar cabins.',
    dates: '05 Feb 2027 — 10 Feb 2027',
    nights: 5,
    travelers: 2,
    region: 'Solang & Old Pine Ridge',
    weather: '8°C · Alpine mountain air',
    score: 94,
    eyebrow: 'Mountain retreat · Alpine sanctuary',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1800&q=85',
    accentColor: '#8BC34A',
  },
  {
    id: 'kerala',
    destination: 'Kerala',
    titleScript: ', serenely drifted.',
    tagline: 'Quiet palm backwaters, emerald tea plantations & slow houseboat mornings.',
    dates: '20 Feb 2027 — 25 Feb 2027',
    nights: 5,
    travelers: 2,
    region: 'Alleppey & Munnar Hills',
    weather: '27°C · Tropical afternoon breeze',
    score: 96,
    eyebrow: 'Backwater haven · Tropical sanctuary',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1800&q=85',
    accentColor: '#10B981',
  },
  {
    id: 'udaipur',
    destination: 'Udaipur',
    titleScript: ', floating in gold.',
    tagline: 'Lakeside marble palaces, calm candlelit ghats & silent boat crossings.',
    dates: '04 Mar 2027 — 08 Mar 2027',
    nights: 4,
    travelers: 2,
    region: 'Lake Pichola & City Palace',
    weather: '24°C · Sunset over water',
    score: 97,
    eyebrow: 'City of lakes · Heritage romance',
    image: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=1800&q=85',
    accentColor: '#F59E0B',
  },
  {
    id: 'kashmir',
    destination: 'Kashmir',
    titleScript: ', breathlessly still.',
    tagline: 'Mirror shikaras on Dal Lake, snow-dusted chinars & silent valley meadows.',
    dates: '15 Apr 2027 — 20 Apr 2027',
    nights: 5,
    travelers: 2,
    region: 'Srinagar & Gulmarg Valley',
    weather: '12°C · Crisp mountain thaw',
    score: 98,
    eyebrow: 'Paradise valley · Pristine escape',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1800&q=85',
    accentColor: '#38BDF8',
  },
];

const SLIDE_DURATION_MS = 5000;

export const HeroSlideshow: React.FC = () => {
  const { setIsBookingOpen } = useRove();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = useCallback((index: number) => {
    setCurrentIdx((index + HERO_SLIDES.length) % HERO_SLIDES.length);
    setProgress(0);
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide(currentIdx + 1);
  }, [currentIdx, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentIdx - 1);
  }, [currentIdx, goToSlide]);

  // Continuous auto-play cycle
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const startTime = Date.now();
    const intervalTick = 50;

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / SLIDE_DURATION_MS) * 100);
      setProgress(pct);
    }, intervalTick);

    timerRef.current = setTimeout(() => {
      nextSlide();
    }, SLIDE_DURATION_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [currentIdx, isPaused, nextSlide]);

  const currentSlide = HERO_SLIDES[currentIdx];

  return (
    <section
      className="workspace-hero"
      aria-roledescription="carousel"
      aria-label="Featured Travel Destinations Slideshow"
    >
      <div className="workspace-hero-image group relative">
        {/* All 6 Slide Background Images with Smooth Cross-Fade & Gentle Ken-Burns */}
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentIdx;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out ${
                isActive
                  ? 'opacity-100 scale-100 z-0'
                  : 'opacity-0 scale-105 pointer-events-none z-[-1]'
              }`}
              style={{ backgroundImage: `url(${slide.image})` }}
              aria-hidden={!isActive}
            />
          );
        })}

        {/* Cinematic Gradient Overlays */}
        <div className="workspace-hero-overlay" />

        {/* Top Continuous Progress Bar */}
        <div className="absolute top-0 left-0 right-0 z-20 h-1 bg-white/15 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-400 via-amber-300 to-emerald-400 transition-[width] duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Content Container */}
        <div className="workspace-hero-content relative z-10 flex flex-col justify-between min-h-[470px] p-6 sm:p-10 lg:p-14 text-white">
          {/* Top Row: Clean Eyebrow + Minimalist Slide Dots & Counter */}
          <div className="flex items-center justify-between gap-4">
            <div className="eyebrow light flex items-center gap-2">
              <span
                className="eyebrow-dot"
                style={{ backgroundColor: currentSlide.accentColor }}
              />
              <span className="tracking-widest uppercase font-semibold text-[11px]">
                {currentSlide.eyebrow}
              </span>
            </div>

            {/* Subtle Minimalist Indicators (Dots + Number) */}
            <div className="flex items-center gap-2.5 bg-black/35 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
              <div className="flex items-center gap-1.5">
                {HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => goToSlide(idx)}
                    className={`transition-all duration-300 rounded-full ${
                      idx === currentIdx
                        ? 'w-5 h-1.5 bg-white'
                        : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
                    }`}
                    aria-label={`Jump to slide ${idx + 1}`}
                  />
                ))}
              </div>
              <span className="text-[11px] font-mono text-white/80 border-l border-white/20 pl-2">
                0{currentIdx + 1} / 0{HERO_SLIDES.length}
              </span>
            </div>
          </div>

          {/* Center / Hero Title, Tagline & Booking CTA */}
          <div className="my-auto py-6 sm:py-8">
            <div className="hero-title-row flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-3xl space-y-3">
                <h1 className="transition-all duration-500 ease-out font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.92]">
                  {currentSlide.destination}
                  <span className="hero-title-script font-serif italic text-amber-100">
                    {currentSlide.titleScript}
                  </span>
                </h1>

                <p className="text-white/85 text-xs sm:text-sm font-normal max-w-xl leading-relaxed">
                  {currentSlide.tagline}
                </p>

                <p className="text-white/70 text-xs tracking-wide">
                  {currentSlide.dates} <span className="text-white/40">·</span>{' '}
                  {currentSlide.nights} nights <span className="text-white/40">·</span>{' '}
                  {currentSlide.travelers} travelers
                </p>
              </div>

              {/* Action Button */}
              <div className="shrink-0">
                <button
                  type="button"
                  className="hero-continue shadow-lg"
                  onClick={() => setIsBookingOpen(true)}
                >
                  Continue to reserve <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Footer Row: Meta Information & Subtle Arrow Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/15 pt-4">
            <div className="hero-meta-row flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-white/80">
              <span className="inline-flex items-center gap-1.5">
                <Navigation size={14} className="text-teal-300" />
                {currentSlide.region}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <SunMedium size={14} className="text-amber-300" />
                {currentSlide.weather}
              </span>
              <span className="inline-flex items-center gap-1.5 text-amber-200">
                <Star size={14} fill="currentColor" />
                {currentSlide.score}/100 trip score
              </span>
            </div>

            {/* Prev/Next Chevrons & Play/Pause */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                className="w-8 h-8 rounded-full bg-black/35 hover:bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all text-xs"
                title={isPaused ? 'Resume auto-slideshow' : 'Pause slideshow'}
                aria-label={isPaused ? 'Resume auto-slideshow' : 'Pause slideshow'}
              >
                {isPaused ? <Play size={12} fill="currentColor" /> : <Pause size={12} fill="currentColor" />}
              </button>

              <button
                type="button"
                onClick={prevSlide}
                className="w-8 h-8 rounded-full bg-black/35 hover:bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all hover:scale-105"
                title="Previous slide"
                aria-label="Previous slide"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                className="w-8 h-8 rounded-full bg-black/35 hover:bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all hover:scale-105"
                title="Next slide"
                aria-label="Next slide"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
