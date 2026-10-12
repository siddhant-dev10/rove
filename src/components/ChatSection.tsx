'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRove } from '@/context/RoveContext';
import { AgentUiCard, BookedTicket } from '@/types/rove';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Send,
  CheckCircle2,
  LockKeyhole,
  Compass,
  Bot,
  User,
  Zap,
  ShieldCheck,
  Ticket,
  Plane,
  Train,
  Bus,
  Hotel,
  Utensils,
  Sun,
  Navigation,
  Check,
  Copy,
  ExternalLink,
} from 'lucide-react';

export const ChatSection: React.FC = () => {
  const {
    trip,
    chatMessages,
    sendChatMessage,
    isAiThinking,
    setIsConciergeOpen,
    setIsTicketHubOpen,
    addBookedTickets,
  } = useRove();

  const [inputVal, setInputVal] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [authorizingBookingId, setAuthorizingBookingId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Find a train and hotel for my trip',
    'What if it rains in our destination?',
    'Find flights that fit our budget',
    'Show vegetarian dining near my hotel',
    'Make my itinerary less tiring',
    'Review booking summary for checkout',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isAiThinking]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim() || isAiThinking) return;
    sendChatMessage(inputVal);
    setInputVal('');
  };

  const copyToClipboard = (text: string, msgId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(msgId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Handle interactive card actions (e.g. Authorize Booking or Select Service)
  const handleCardAction = async (card: AgentUiCard) => {
    if (card.type === 'booking_review') {
      setAuthorizingBookingId(card.id);
      try {
        const payload = card.actionPayload || {};
        const items = (payload.items as unknown[]) || [];

        const res = await fetch('/api/agent/book', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            destination: trip.destination,
            passenger: {
              name: 'Siddhant Sharma',
              email: 'siddhant@rove.ai',
              phone: '+91 98201 55432',
              count: 2,
            },
            items,
          }),
        });

        if (res.ok) {
          const result = await res.json();
          if (result.success && result.bookedTickets) {
            addBookedTickets(result.bookedTickets);
            confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
            sendChatMessage('All items authorized and locked in. Show my confirmed digital tickets.');
          }
        }
      } catch (err) {
        console.error('Failed to commit booking from chat:', err);
      } finally {
        setAuthorizingBookingId(null);
      }
    } else if (card.type === 'bus' || card.type === 'flight' || card.type === 'train' || card.type === 'hotel' || card.type === 'dining') {
      // Direct single booking action from card
      try {
        const payload = card.actionPayload || {};
        const res = await fetch('/api/agent/book', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            destination: trip.destination,
            passenger: { name: 'Siddhant Sharma', email: 'siddhant@rove.ai', phone: '+91 98201 55432', count: 2 },
            items: [
              {
                category: card.type,
                itemId: payload.itemId || card.id,
                title: card.title,
                cost: card.price || 0,
                preferredSlotOrSeat: (payload.preferredSlotOrSeat as string) || 'Standard Confirmed',
              },
            ],
          }),
        });

        if (res.ok) {
          const result = await res.json();
          if (result.success && result.bookedTickets) {
            addBookedTickets(result.bookedTickets as BookedTicket[]);
            confetti({ particleCount: 50, spread: 50 });
            sendChatMessage(`I have booked ${card.title}. Can you show the updated status?`);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
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
                Your Rove Travel Concierge
              </h1>
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Multi-Agent Ready
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Conversational travel OS backed by Open-Meteo, OSRM road routing, and multi-modal booking agents.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsTicketHubOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-stone-800 bg-stone-900 hover:bg-stone-800 text-xs font-semibold text-white transition shadow-sm cursor-pointer"
            >
              <Ticket className="w-3.5 h-3.5 text-amber-300" />
              <span>Ticket Studio</span>
            </button>
            <button
              onClick={() => setIsConciergeOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-stone-200 bg-white hover:bg-stone-50 text-xs font-medium text-stone-800 transition shadow-2xs cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-stone-600" />
              <span>Human Advisor</span>
            </button>
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
                  Active Context
                </span>
                <span className="text-xs font-semibold text-stone-800">
                  {trip.destination}
                </span>
              </div>

              <div className="rounded-2xl bg-[#faf9f5] p-3.5 border border-stone-200/70 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-stone-500">Planned Cost</span>
                  <span className="font-serif font-medium text-stone-900">
                    ₹{trip.budget.plannedCost.toLocaleString('en-IN')} / ₹{trip.budget.totalBudget.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-stone-200 overflow-hidden">
                  <div
                    className="h-full bg-amber-700 rounded-full"
                    style={{ width: `${Math.min(100, (trip.budget.plannedCost / (trip.budget.totalBudget || 1)) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-stone-500">
                  <span>₹{trip.budget.remaining.toLocaleString('en-IN')} buffer uncommitted</span>
                  <span className="text-emerald-700 font-medium">Safe</span>
                </div>
              </div>

              {/* Locked items */}
              <div className="space-y-2 pt-1">
                <span className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider block">
                  Protected Stay Anchor
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

            {/* Quick Prompt Suggestions */}
            <div className="rounded-3xl border border-stone-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-3">
              <span className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider block">
                Suggested Prompts
              </span>
              <div className="flex flex-col gap-2">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendChatMessage(prompt)}
                    disabled={isAiThinking}
                    className="text-left text-xs p-2.5 rounded-xl border border-stone-200/80 bg-stone-50/60 hover:bg-stone-100/90 text-stone-700 hover:text-stone-950 transition flex items-center justify-between group disabled:opacity-40 cursor-pointer"
                  >
                    <span>{prompt}</span>
                    <Zap className="w-3 h-3 text-stone-400 group-hover:text-amber-700 transition shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Agent Guardrails */}
            <div className="rounded-3xl border border-stone-200/90 bg-stone-900 p-5 text-white space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200">
                  Integrity Guarantee
                </h4>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Rove agents never simulate completed checkouts without verification. High-speed rail and airlines use verified partner booking paths.
              </p>
            </div>
          </div>

          {/* RIGHT: EXPANSIVE CHAT CANVAS */}
          <div className="lg:col-span-8 rounded-3xl border border-stone-200/90 bg-white shadow-xs flex flex-col h-[700px] overflow-hidden">
            {/* Chat Canvas Header */}
            <div className="flex items-center justify-between border-b border-stone-100 bg-stone-50/70 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-stone-900 text-white">
                  <Bot className="h-4 w-4" />
                </span>
                <div>
                  <h2 className="text-sm font-semibold text-stone-900">Conversational Workspace</h2>
                  <p className="text-[11px] text-stone-500">Coordinates, budget caps, and providers synchronized</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-800">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Multi-Agent Active
              </span>
            </div>

            {/* Chat Messages Stream */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
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
                      className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed space-y-3 ${
                        isAi
                          ? 'bg-[#FAF9F5] border border-stone-200/80 text-stone-800 shadow-2xs'
                          : 'bg-stone-900 text-white font-normal'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{msg.text}</div>

                      {/* STRUCTURED AGENT CARDS */}
                      {msg.cards && msg.cards.length > 0 && (
                        <div className="space-y-3 pt-2">
                          {msg.cards.map((card) => (
                            <div
                              key={card.id}
                              className="rounded-2xl border border-stone-200 bg-white p-3.5 shadow-2xs space-y-2 text-stone-900"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  {card.type === 'flight' && <Plane className="w-4 h-4 text-sky-600" />}
                                  {card.type === 'train' && <Train className="w-4 h-4 text-amber-700" />}
                                  {card.type === 'bus' && <Bus className="w-4 h-4 text-emerald-700" />}
                                  {card.type === 'hotel' && <Hotel className="w-4 h-4 text-stone-700" />}
                                  {card.type === 'dining' && <Utensils className="w-4 h-4 text-rose-600" />}
                                  {card.type === 'weather' && <Sun className="w-4 h-4 text-amber-500" />}
                                  {card.type === 'route' && <Navigation className="w-4 h-4 text-indigo-600" />}
                                  {card.type === 'booking_review' && <ShieldCheck className="w-4 h-4 text-emerald-600" />}
                                  <h4 className="font-semibold text-xs sm:text-sm text-stone-900">{card.title}</h4>
                                </div>
                                {card.price != null && (
                                  <span className="font-serif font-bold text-xs sm:text-sm text-amber-950">
                                    ₹{card.price.toLocaleString('en-IN')}
                                  </span>
                                )}
                              </div>

                              <p className="text-[11px] text-stone-500 leading-snug">{card.subtitle}</p>

                              {card.badge && (
                                <span className="inline-block text-[10px] font-semibold text-amber-900 bg-amber-50 border border-amber-200/60 rounded px-1.5 py-0.5">
                                  {card.badge}
                                </span>
                              )}

                              {card.actionLabel && (
                                <div className="pt-2 border-t border-stone-100 flex justify-end">
                                  <button
                                    onClick={() => handleCardAction(card)}
                                    disabled={authorizingBookingId === card.id}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-[11px] font-semibold transition cursor-pointer disabled:opacity-50"
                                  >
                                    <span>{authorizingBookingId === card.id ? 'Processing...' : card.actionLabel}</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Diff badge if AI modified structured trip */}
                      {msg.diffSummary && (
                        <div className="rounded-xl bg-white border border-stone-200 p-2 text-xs text-stone-800 font-medium flex items-center gap-2 shadow-2xs">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                          <span className="text-[11px]">Updated: {msg.diffSummary}</span>
                        </div>
                      )}

                      {/* Message Actions */}
                      <div className="flex items-center justify-between pt-1 border-t border-stone-200/40 text-[10px] text-stone-400">
                        <span className="font-mono">{msg.timestamp}</span>
                        {isAi && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => copyToClipboard(msg.text, msg.id)}
                              className="hover:text-stone-700 flex items-center gap-1 cursor-pointer"
                              title="Copy response"
                            >
                              {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {isAiThinking && (
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#FAF9F5] border border-stone-200/80 max-w-[80%] text-xs text-stone-600 animate-pulse">
                  <Sparkles className="w-4 h-4 animate-spin text-amber-700 shrink-0" />
                  <span>Travel Orchestrator querying Open-Meteo weather, OSRM routing & multi-modal agents...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
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
                placeholder="Ask Rove... (e.g. 'Find a train and hotel for my trip' or 'Check weather in Goa')"
                aria-label="Message Rove about your trip"
                className="flex-1 rounded-2xl border border-stone-200 bg-white px-4 py-3 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-500 shadow-2xs"
              />
              <button
                type="submit"
                disabled={!inputVal.trim() || isAiThinking}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition disabled:opacity-40 active:scale-95 shadow-xs cursor-pointer"
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
