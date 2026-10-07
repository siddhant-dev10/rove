'use client';

import React, { useState } from 'react';
import { useRove } from '@/context/RoveContext';
import {
  MessageSquare,
  Send,
  Sparkles,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';

export const AIChatDrawer: React.FC = () => {
  const { chatMessages, sendChatMessage, isAiThinking } = useRove();
  const [inputText, setInputText] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const quickPrompts = [
    'Make it ₹2,000 cheaper',
    'Make tomorrow less tiring',
    'What if it rains?',
    'Add hidden gems',
    'Replace water sports with free viewpoints',
  ];

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isAiThinking) return;
    sendChatMessage(inputText);
    setInputText('');
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 w-full max-w-sm sm:max-w-md">
      {/* Minimized Pill */}
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="ml-auto flex items-center gap-2.5 rounded-full bg-stone-900 px-4 py-2.5 text-xs font-medium text-white shadow-xl hover:bg-stone-800 transition active:scale-95 border border-stone-800"
          aria-label="Open Trip Assistant"
        >
          <MessageSquare className="h-4 w-4 text-stone-300" />
          <span>Trip Assistant</span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </button>
      ) : (
        /* Full Chat Drawer */
        <div role="dialog" aria-label="Trip assistant" aria-live="polite" className="rounded-2xl border border-stone-200 bg-white shadow-2xl overflow-hidden flex flex-col h-[500px] text-stone-900 animate-in fade-in slide-in-from-bottom-2 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-stone-100 px-4 py-3.5 bg-stone-50/50">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-stone-100 text-stone-700">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-semibold text-stone-900 tracking-tight">Trip Assistant</h4>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-[11px] text-stone-500">Conversational editing in real time</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-stone-400 hover:text-stone-700 p-1.5 rounded-lg hover:bg-stone-100 transition"
              aria-label="Close assistant"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          {/* Quick Prompts Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto px-3.5 py-2.5 border-b border-stone-100 bg-stone-50/30 text-[11px] scrollbar-none">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => sendChatMessage(prompt)}
                disabled={isAiThinking}
                className="whitespace-nowrap rounded-lg border border-stone-200 bg-white px-2.5 py-1 text-stone-600 hover:border-stone-400 hover:text-stone-900 transition disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((msg) => {
              const isAi = msg.sender === 'rove-ai';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isAi ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl p-3 text-xs leading-relaxed ${
                      isAi
                        ? 'bg-stone-50 border border-stone-200/70 text-stone-800'
                        : 'bg-stone-900 text-white font-normal'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* Diff badge if AI modified structured trip */}
                    {msg.diffSummary && (
                      <div className="mt-2 rounded-lg bg-stone-100 border border-stone-200/80 p-2 text-[11px] text-stone-700 font-medium flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-stone-800 shrink-0" />
                        <span>Itinerary updated: {msg.diffSummary}</span>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-stone-400 px-1 mt-1 font-mono">{msg.timestamp}</span>
                </div>
              );
            })}

            {isAiThinking && (
              <div className="flex items-center gap-2 rounded-2xl bg-stone-50 border border-stone-200/70 p-3 text-xs text-stone-600 max-w-[85%]">
                <Sparkles className="h-3.5 w-3.5 animate-spin text-stone-500" />
                <span>Recalculating route constraints and budget...</span>
              </div>
            )}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="border-t border-stone-100 p-3 bg-white flex items-center gap-2">
            <input
              type="text"
              aria-label="Ask your trip assistant"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="e.g. 'Make it ₹2,000 cheaper' or 'Add hidden gems'"
              className="flex-1 rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2 text-xs text-stone-900 placeholder-stone-400 focus:bg-white focus:border-stone-900 focus:outline-none transition"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isAiThinking}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-stone-900 text-white hover:bg-stone-800 transition disabled:opacity-30 active:scale-95 shrink-0"
              aria-label="Send message"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
