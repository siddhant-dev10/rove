'use client';

import React, { useState, useEffect } from 'react';
import { useRove } from '@/context/RoveContext';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  MapPin,
  Clock,
  Compass,
  Users,
  X,
  Volume2,
  VolumeX,
} from 'lucide-react';

export const TripReplayModal: React.FC = () => {
  const { isReplayModalOpen, setIsReplayModalOpen, earnCredits } = useRove();

  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState<number>(1);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const steps = [
    {
      stopNumber: 1,
      title: 'Touchdown at Dabolim Airport',
      time: 'Day 1 · 09:30 AM',
      type: 'Transit & Bag Drop',
      location: 'Dabolim Runway',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
      description: 'Flight IndiGo 6E-204 touches down smoothly. Pre-paid electric EV cab waits at bay 4 with zero surge charge.',
      cost: '₹850 EV Pass',
      crowd: '38% capacity',
      coords: { x: 50, y: 72 },
    },
    {
      stopNumber: 2,
      title: 'Fort Aguada Ramparts & Lighthouse',
      time: 'Day 1 · 11:30 AM',
      type: 'Coastal Portuguese Bastion',
      location: 'Sinquerim Cliffs',
      image: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&w=800&q=80',
      description: 'Massive 17th-century laterite ramparts overlooking the vast Arabian Sea. Timed to arrive before midday tour coaches.',
      cost: '₹150 Entry',
      crowd: '72% capacity',
      coords: { x: 32, y: 55 },
    },
    {
      stopNumber: 3,
      title: 'Coastal Thali at Kokum Bistro',
      time: 'Day 1 · 02:00 PM',
      type: 'Curated Local Gastronomy',
      location: 'Candolim Corridor',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
      description: 'Coconut-infused solkadhi and spiced rawa fish fry. Route-aligned to avoid crossing congested river bridges.',
      cost: '₹650',
      crowd: '55% capacity',
      coords: { x: 35, y: 50 },
    },
    {
      stopNumber: 4,
      title: 'Check-in: Casa De Vagator Haven',
      time: 'Day 1 · 04:00 PM',
      type: 'Boutique Sanctuary (Pinned)',
      location: 'Vagator Village',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      description: 'Your pinned boutique sanctuary at ₹1,500/night. Restored Portuguese courtyard with private pool cabana.',
      cost: '₹4,500 (3 Nights)',
      crowd: 'Quiet & Private',
      coords: { x: 38, y: 35 },
    },
    {
      stopNumber: 5,
      title: 'Vagator Red Cliff Twilight Sunset',
      time: 'Day 1 · 05:45 PM',
      type: 'Nature & Soundscape',
      location: 'Ozran / Vagator Cliff',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      description: 'Crimson laterite cliffs bathed in golden dusk. 94% crowded Baga successfully bypassed for panoramic coastal serenity.',
      cost: 'Free Admission',
      crowd: '48% capacity',
      coords: { x: 38, y: 34 },
    },
    {
      stopNumber: 6,
      title: 'Grand Island Snorkeling & Dolphins',
      time: 'Day 2 · 09:00 AM',
      type: 'Marine Ocean Excursion',
      location: 'Sinquerim Jetty Launch',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
      description: 'Speedboat into open Arabian waters with certified marine guide, coral reef dive, and coastal lunch.',
      cost: '₹1,600 Pass',
      crowd: '60% capacity',
      coords: { x: 28, y: 62 },
    },
    {
      stopNumber: 7,
      title: 'Gunpowder Courtyard Kitchen',
      time: 'Day 2 · 02:30 PM',
      type: 'Culinary Icon',
      location: 'Assagao Cultural Village',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      description: 'Secret Portuguese garden serving slow-simmered coastal curries and warm appams under lush mango trees.',
      cost: '₹900',
      crowd: '68% capacity',
      coords: { x: 44, y: 32 },
    },
    {
      stopNumber: 8,
      title: 'Fontainhas Alleys & Divar River Ferry',
      time: 'Day 3 · 10:00 AM',
      type: 'Hidden Cultural Gem',
      location: 'Panaji & Divar Island',
      image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
      description: 'Pastel yellow and indigo colonial villas followed by free river ferry into tranquil island paddies.',
      cost: '₹350 Ferry & Walk',
      crowd: '28% capacity',
      coords: { x: 52, y: 50 },
    },
  ];

  // Auto playback effect
  useEffect(() => {
    if (!isReplayModalOpen || !isPlaying) return;

    const intervalTime = 3000 / speed;
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          earnCredits(50, 'Completed Journey Storybook Route Preview');
          return prev;
        }
        return prev + 1;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isReplayModalOpen, isPlaying, speed, steps.length, earnCredits]);

  if (!isReplayModalOpen) return null;

  const current = steps[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 p-4 sm:p-6 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl rounded-3xl border border-stone-200 bg-[#FAF9F5] p-6 sm:p-8 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-stone-200/80 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-900 text-white">
              <Compass className="h-4 w-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-serif font-medium text-stone-900 tracking-tight">
                  Journey Storybook · Animated Route Preview
                </h3>
                <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[10px] font-sans font-semibold text-stone-700 border border-stone-200">
                  {currentStep + 1} of {steps.length}
                </span>
              </div>
              <p className="text-xs text-stone-500 font-sans">Visualizing your day-by-day physical journey across Goa</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="text-stone-400 hover:text-stone-700 transition p-1"
              title="Toggle Audio Feedback"
            >
              {soundEnabled ? <Volume2 className="h-4 w-4 text-stone-700" /> : <VolumeX className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setIsReplayModalOpen(false)}
              className="rounded-full bg-stone-100 p-2 text-stone-600 hover:bg-stone-200 hover:text-stone-900 transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Center Stage: Parchment Map + Photography Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0 overflow-y-auto">
          {/* Left Canvas: Parchment Map */}
          <div className="lg:col-span-7 relative h-72 sm:h-96 rounded-2xl border border-stone-200 bg-[#F4EFEB] overflow-hidden p-4">
            {/* Background Coastline & Rivers */}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path
                d="M 0,0 L 25,0 Q 28,30 35,50 Q 42,70 52,100 L 0,100 Z"
                fill="#E8EFF2"
              />
              <path
                d="M 25,0 Q 28,30 35,50 Q 42,70 52,100"
                fill="none"
                stroke="#B8CBD4"
                strokeWidth="1.2"
              />
              <path
                d="M 35,50 Q 55,51 85,48"
                fill="none"
                stroke="#B8CBD4"
                strokeWidth="1.2"
              />

              {/* Traced route path */}
              <polyline
                points={steps
                  .slice(0, currentStep + 1)
                  .map((s) => `${s.coords.x},${s.coords.y}`)
                  .join(' ')}
                fill="none"
                stroke="#292524"
                strokeWidth="1.2"
                strokeDasharray="2 2"
              />
            </svg>

            {/* Render all step nodes */}
            {steps.map((s, idx) => {
              const isPast = idx < currentStep;
              const isCurrent = idx === currentStep;

              return (
                <div
                  key={idx}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                  style={{ left: `${s.coords.x}%`, top: `${s.coords.y}%` }}
                >
                  <div
                    onClick={() => {
                      setCurrentStep(idx);
                      setIsPlaying(false);
                    }}
                    className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border shadow-sm text-xs font-semibold transition-transform ${
                      isCurrent
                        ? 'bg-stone-900 border-stone-900 text-white scale-120'
                        : isPast
                        ? 'bg-stone-200 border-stone-300 text-stone-700'
                        : 'bg-white border-stone-300 text-stone-400'
                    }`}
                  >
                    {s.stopNumber}
                  </div>
                </div>
              );
            })}

            {/* Floating Live Traveler Avatar Tracking Position */}
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-700 ease-out z-20"
              style={{ left: `${current.coords.x}%`, top: `${current.coords.y}%` }}
            >
              <div className="flex items-center gap-1.5 rounded-full bg-stone-900 px-3 py-1 text-[11px] font-semibold text-white shadow-md -mt-10">
                <Compass className="h-3 w-3 animate-spin" />
                <span>{current.title}</span>
              </div>
            </div>
          </div>

          {/* Right Stage: Photographic Editorial Card */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 shadow-sm">
            <div>
              <div className="relative h-48 w-full overflow-hidden rounded-xl border border-stone-200 mb-4">
                <img
                  src={current.image}
                  alt={current.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-2.5 left-2.5 rounded-full bg-white/95 px-2.5 py-0.5 text-[11px] font-semibold text-stone-800 shadow-sm">
                  Stop {current.stopNumber} of {steps.length}
                </div>
                <div className="absolute bottom-2.5 right-2.5 rounded-full bg-stone-900/90 px-2.5 py-0.5 text-[11px] font-mono text-white backdrop-blur-sm">
                  {current.cost}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-stone-500 font-sans mb-1">
                <Clock className="h-3.5 w-3.5 text-stone-400" />
                <span>{current.time}</span>
                <span>•</span>
                <span className="font-medium text-stone-700">{current.type}</span>
              </div>

              <h4 className="text-xl font-serif font-medium text-stone-900 tracking-tight">
                {current.title}
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                {current.description}
              </p>
            </div>

            <div className="mt-5 pt-3.5 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-sans">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-stone-400" />
                <span className="text-stone-800 font-medium">{current.location}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-stone-400" />
                <span>Crowd: <strong className="text-stone-900">{current.crowd}</strong></span>
              </span>
            </div>
          </div>
        </div>

        {/* Player Controls Dock */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-200/80 pt-4">
          {/* Progress scrubber */}
          <div className="w-full sm:w-auto flex-1 flex items-center gap-3">
            <span className="text-xs text-stone-500 font-sans">1</span>
            <input
              type="range"
              min={0}
              max={steps.length - 1}
              value={currentStep}
              onChange={(e) => {
                setCurrentStep(Number(e.target.value));
                setIsPlaying(false);
              }}
              className="w-full accent-stone-900 cursor-pointer"
            />
            <span className="text-xs text-stone-500 font-sans">{steps.length}</span>
          </div>

          {/* Buttons: Prev, Play/Pause, Next */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setCurrentStep((prev) => Math.max(0, prev - 1));
                setIsPlaying(false);
              }}
              disabled={currentStep === 0}
              className="rounded-full border border-stone-200 bg-white p-2 text-stone-700 hover:bg-stone-50 disabled:opacity-30"
            >
              <SkipBack className="h-4 w-4" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 rounded-full bg-stone-900 px-5 py-2 text-xs font-semibold text-white hover:bg-stone-800 transition active:scale-98"
            >
              {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-white" />}
              <span>{isPlaying ? 'Pause' : 'Play Journey'}</span>
            </button>

            <button
              onClick={() => {
                setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1));
                setIsPlaying(false);
              }}
              disabled={currentStep === steps.length - 1}
              className="rounded-full border border-stone-200 bg-white p-2 text-stone-700 hover:bg-stone-50 disabled:opacity-30"
            >
              <SkipForward className="h-4 w-4" />
            </button>

            <button
              onClick={() => {
                setCurrentStep(0);
                setIsPlaying(true);
              }}
              className="rounded-full border border-stone-200 bg-white p-2 text-stone-700 hover:bg-stone-50"
              title="Restart from beginning"
            >
              <RotateCcw className="h-4 w-4" />
            </button>

            {/* Speed toggle */}
            <button
              onClick={() => setSpeed(speed === 1 ? 2 : 1)}
              className="rounded-full border border-stone-200 bg-stone-100 px-3 py-1.5 text-xs font-sans font-semibold text-stone-700"
            >
              {speed}x
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
