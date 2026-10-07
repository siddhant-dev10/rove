'use client';

import React, { useState } from 'react';
import { useRove } from '@/context/RoveContext';
import {
  Compass,
  Send,
  X,
  Utensils,
  Wallet,
  CloudSun,
  MapPin,
  Sparkles,
} from 'lucide-react';

export const TravelConciergeModal: React.FC = () => {
  const { isConciergeOpen, setIsConciergeOpen, trip } = useRove();
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{ sender: 'user' | 'concierge'; text: string; time: string }[]>([
    {
      sender: 'concierge',
      text: `Welcome to your journey in ${trip.destination}. I am on standby to assist with nearby culinary tables, live timing adjustments, budget oversight, or gentle itinerary re-routes.`,
      time: '11:00 AM',
    },
  ]);

  if (!isConciergeOpen) return null;

  const handleAsk = (questionText: string) => {
    const q = questionText.toLowerCase();
    const newMsgs = [...messages, { sender: 'user' as const, text: questionText, time: 'Just now' }];
    setMessages(newMsgs);
    setQuery('');

    setTimeout(() => {
      let reply = '';
      if (q.includes('eat') || q.includes('food') || q.includes('restaurant')) {
        reply = `For lunch nearby right now, I highly recommend Kokum Bistro on Candolim Road (₹650 for an authentic seasonal thali, 4.8★). If you are closer to Assagao, Gunpowder Coastal Kitchen serves exceptional slow-simmered regional curries inside a breezy heritage courtyard.`;
      } else if (q.includes('next') || q.includes('schedule') || q.includes('stop')) {
        reply = `Next on your timeline: Fort Aguada Ramparts at 11:30 AM (approx. 1h 30m visit, ₹150 ticket). Following that, a 15-minute scenic coastal drive brings you to Kokum Bistro for a relaxed lunch.`;
      } else if (q.includes('budget') || q.includes('money') || q.includes('cost')) {
        reply = `Your planned spend is ₹${trip.budget.plannedCost.toLocaleString()} against your allocated ₹${trip.budget.totalBudget.toLocaleString()} limit. You have a comfortable ₹${trip.budget.remaining.toLocaleString()} uncommitted liquidity buffer.`;
      } else if (q.includes('rain') || q.includes('weather')) {
        reply = `Should unexpected showers arrive, tap the 'What-If Simulator' on your travel dashboard. We will seamlessly transition open-water sports into a curated visit to the Mario Miranda Gallery and an artisanal tasting at the Cazulo Feni Vault.`;
      } else {
        reply = `Understood: "${questionText}". Your North Goa timeline is synchronized, and your confirmed stay at Casa De Vagator Heritage Haven remains firmly locked and protected.`;
      }

      setMessages((prev) => [...prev, { sender: 'concierge', text: reply, time: 'Just now' }]);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 p-4 sm:p-6 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-2xl flex flex-col h-[580px] text-stone-900">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-stone-100 pb-5 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-stone-100 text-stone-700">
                <Compass className="h-4 w-4" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                On-Trip Advisory
              </span>
            </div>
            <h3 className="font-serif text-2xl text-stone-900 tracking-tight">
              Personal Travel Concierge
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Context-aware assistant attuned to your active route, dietary preferences, and timeline
            </p>
          </div>

          <button
            onClick={() => setIsConciergeOpen(false)}
            className="rounded-full p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-stone-100 text-xs scrollbar-none">
          <button
            onClick={() => handleAsk('Where should I eat right now?')}
            className="flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-stone-700 hover:bg-stone-100 hover:border-stone-300 transition"
          >
            <Utensils className="h-3.5 w-3.5 text-stone-500" />
            <span>Where to dine nearby?</span>
          </button>
          <button
            onClick={() => handleAsk('What is next on my schedule?')}
            className="flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-stone-700 hover:bg-stone-100 hover:border-stone-300 transition"
          >
            <MapPin className="h-3.5 w-3.5 text-stone-500" />
            <span>Next scheduled stop?</span>
          </button>
          <button
            onClick={() => handleAsk('How much budget remains?')}
            className="flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-stone-700 hover:bg-stone-100 hover:border-stone-300 transition"
          >
            <Wallet className="h-3.5 w-3.5 text-stone-500" />
            <span>Remaining balance?</span>
          </button>
          <button
            onClick={() => handleAsk('What should I do if it rains?')}
            className="flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-stone-700 hover:bg-stone-100 hover:border-stone-300 transition"
          >
            <CloudSun className="h-3.5 w-3.5 text-stone-500" />
            <span>Rain contingency plan</span>
          </button>
        </div>

        {/* Conversation Stream */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1">
          {messages.map((m, idx) => {
            const isUser = m.sender === 'user';
            return (
              <div key={idx} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                    isUser
                      ? 'bg-stone-900 text-white font-normal'
                      : 'bg-stone-50 border border-stone-200/70 text-stone-800'
                  }`}
                >
                  {!isUser && (
                    <div className="flex items-center gap-1 text-[10px] uppercase font-semibold tracking-wider text-stone-400 mb-1.5">
                      <Sparkles className="h-3 w-3 text-stone-500" />
                      <span>Rove Concierge</span>
                    </div>
                  )}
                  <p>{m.text}</p>
                </div>
                <span className="text-[10px] text-stone-400 px-1 mt-1 font-mono">{m.time}</span>
              </div>
            );
          })}
        </div>

        {/* Input Box */}
        <div className="pt-3 border-t border-stone-100 flex items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && query.trim() && handleAsk(query)}
            placeholder="Ask your concierge anything about your destination or route..."
            className="flex-1 rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:bg-white focus:border-stone-900 focus:outline-none transition"
          />
          <button
            onClick={() => query.trim() && handleAsk(query)}
            disabled={!query.trim()}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-900 text-white hover:bg-stone-800 transition disabled:opacity-30 active:scale-95 shrink-0"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
