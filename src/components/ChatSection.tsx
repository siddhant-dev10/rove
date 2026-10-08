'use client';

import React, { useState } from 'react';
import { useRove } from '@/context/RoveContext';
import {
  Sparkles,
  Send,
  CheckCircle2,
  LockKeyhole,
  Compass,
  Bot,
  User,
  Zap,
  MessageCircle,
  ShieldCheck,
  Clock3,
} from 'lucide-react';

export const ChatSection: React.FC = () => {
  const {
    trip,
    chatMessages,
    sendChatMessage,
    isAiThinking,
    setIsConciergeOpen,
  } = useRove();

  const [inputVal, setInputVal] = useState('');

  const quickPrompts = [
    'Make it ₹2,000 cheaper',
    'Make tomorrow less tiring',
    'What if it rains in Panjim?',
    'Find quiet spots near Vagator',
    'Swap jet ski for kayaking',
    'Add hidden Portuguese heritage gems',
  ];

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim() || isAiThinking) return;
    sendChatMessage(inputVal);
    setInputVal('');
  };

  return (
    <div className="w-full min-h-screen bg-[#f7f5f0] text-stone-900 pt-8 pb-32 animate-in fade-in duration-300">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 space-y-8">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-stone-900 text-white">
                <Sparkles className="h-4 w-4" />
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl text-stone-900 font-medium">
                Your Rove travel assistant
              </h1>
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Ready to help
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Tell Rove what you want to change. It will explain the trade-offs before updating your trip.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsConciergeOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-stone-200 bg-white hover:bg-stone-50 text-xs font-medium text-stone-800 transition shadow-2xs"
            >
              <Compass className="w-3.5 h-3.5 text-stone-600" />
              <span>Talk to Human Concierge</span>
            </button>
          </div>
        </div>

        <div className="rounded-3xl bg-stone-900 p-5 text-white shadow-lg sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-amber-200">
                <MessageCircle className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-300">Start with a simple request</p>
                <h2 className="mt-1 font-serif text-2xl sm:text-3xl">What should we improve?</h2>
                <p className="mt-1 max-w-xl text-xs leading-relaxed text-stone-300 sm:text-sm">Ask for a cheaper route, a slower day, or a different kind of experience. Rove keeps your budget and protected bookings in mind.</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-[10px] text-stone-300 sm:min-w-[280px]">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3"><ShieldCheck className="mb-2 h-4 w-4 text-emerald-300" /><span>Budget aware</span></div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3"><Clock3 className="mb-2 h-4 w-4 text-amber-200" /><span>Less rushing</span></div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3"><Sparkles className="mb-2 h-4 w-4 text-sky-200" /><span>Explained changes</span></div>
            </div>
          </div>
        </div>

        {/* WORKSPACE DUAL COLUMN */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: TRIP CONTEXT & GUARDRAILS */}
          <div className="lg:col-span-4 space-y-5">
            {/* Active trip constraints */}
            <div className="rounded-3xl border border-stone-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider">
                  Active Trip Context
                </span>
                <span className="text-xs font-semibold text-stone-700">
                  {trip.destination.replace(', India', '')}
                </span>
              </div>

              <div className="rounded-2xl bg-[#faf9f5] p-3.5 border border-stone-200/70 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-stone-500">Committed Spend</span>
                  <span className="font-serif font-medium text-stone-900">
                    ₹{trip.budget.plannedCost.toLocaleString('en-IN')} / ₹{trip.budget.totalBudget.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-stone-200 overflow-hidden">
                  <div
                    className="h-full bg-amber-700 rounded-full"
                    style={{ width: `${(trip.budget.plannedCost / trip.budget.totalBudget) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-stone-500">
                  <span>₹{trip.budget.remaining.toLocaleString('en-IN')} uncommitted buffer</span>
                  <span className="text-emerald-700 font-medium">Safe</span>
                </div>
              </div>

              {/* Locked items */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider block">
                  Protected Trip Anchors
                </span>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50 border border-stone-200/60 text-xs">
                  <LockKeyhole className="w-3.5 h-3.5 text-stone-800 shrink-0" />
                  <span className="font-medium text-stone-800 truncate">
                    {trip.hotel.name}
                  </span>
                  <span className="text-[10px] text-stone-500 ml-auto shrink-0">Stay Locked</span>
                </div>
              </div>
            </div>

            {/* Quick Prompt Ideas */}
            <div className="rounded-3xl border border-stone-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-3">
              <span className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider block">
                Suggested Prompts
              </span>
              <p className="text-xs text-stone-500">
                Click any suggestion to immediately recalculate route options:
              </p>
              <div className="flex flex-col gap-2">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendChatMessage(prompt)}
                    disabled={isAiThinking}
                    className="text-left text-xs p-2.5 rounded-xl border border-stone-200/80 bg-stone-50/60 hover:bg-stone-100/90 text-stone-700 hover:text-stone-950 transition flex items-center justify-between group disabled:opacity-40"
                  >
                    <span>{prompt}</span>
                    <Zap className="w-3 h-3 text-stone-400 group-hover:text-amber-700 transition" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: EXPANSIVE CHAT CANVAS */}
          <div className="lg:col-span-8 rounded-3xl border border-stone-200/90 bg-white shadow-xs flex flex-col h-[650px] overflow-hidden">
            <div className="flex items-center justify-between border-b border-stone-100 bg-stone-50/70 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-stone-900 text-white"><Bot className="h-4 w-4" /></span>
                <div><h2 className="text-sm font-semibold text-stone-900">Trip conversation</h2><p className="text-[11px] text-stone-500">Rove remembers your current plan</p></div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-800"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Online</span>
            </div>
            {/* Chat Messages Stream */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {chatMessages.map((msg) => {
                const isAi = msg.sender === 'rove-ai';
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${isAi ? 'items-start' : 'items-start flex-row-reverse'}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs ${
                        isAi ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-800'
                      }`}
                    >
                      {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>

                    <div
                      className={`max-w-[82%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                        isAi
                          ? 'bg-[#FAF9F5] border border-stone-200/80 text-stone-800'
                          : 'bg-stone-900 text-white font-normal'
                      }`}
                    >
                      <p>{msg.text}</p>

                      {/* Diff badge if AI modified structured trip */}
                      {msg.diffSummary && (
                        <div className="mt-3 rounded-xl bg-white border border-stone-200 p-2.5 text-xs text-stone-800 font-medium flex items-center gap-2 shadow-2xs">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                          <span>Itinerary updated: {msg.diffSummary}</span>
                        </div>
                      )}

                      <span className="block text-[10px] text-stone-400 mt-2 font-mono">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}

              {isAiThinking && (
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#FAF9F5] border border-stone-200/80 max-w-[80%] text-xs text-stone-600">
                  <Sparkles className="w-4 h-4 animate-spin text-amber-700" />
                  <span>Rove AI is calculating spatial distances, budget thresholds, and crowd metrics...</span>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSend}
              className="p-4 sm:p-5 border-t border-stone-100 bg-[#FAF9F5]/70 flex items-center gap-3"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask Rove anything... (e.g., 'Save ₹2,000 without losing sunset views')"
                aria-label="Message Rove about your trip"
                className="flex-1 rounded-2xl border border-stone-200 bg-white px-4 py-3 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-500 shadow-2xs"
              />
              <button
                type="submit"
                disabled={!inputVal.trim() || isAiThinking}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition disabled:opacity-40 active:scale-95 shadow-xs"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
