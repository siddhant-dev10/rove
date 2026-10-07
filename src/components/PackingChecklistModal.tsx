'use client';

import React, { useState } from 'react';
import { useRove } from '@/context/RoveContext';
import {
  Luggage,
  Check,
  X,
  Plus,
  Sun,
  ShieldCheck,
} from 'lucide-react';

export const PackingChecklistModal: React.FC = () => {
  const { isPackingOpen, setIsPackingOpen } = useRove();

  const [items, setItems] = useState([
    { id: '1', text: 'SPF 50+ mineral sunscreen (Goa 29°C midday UV index 9)', checked: true, category: 'Weather' },
    { id: '2', text: 'Waterproof phone dry-bag (Snorkeling & backwaters)', checked: true, category: 'Activity' },
    { id: '3', text: 'Breathable linen shirts & easy trousers (Assagao & Candolim cafés)', checked: false, category: 'Apparel' },
    { id: '4', text: 'Quick-drying swimwear and lightweight Turkish towel', checked: false, category: 'Beach' },
    { id: '5', text: 'Treaded walking sandals or light sneakers (Fort Aguada ramparts)', checked: true, category: 'Footwear' },
    { id: '6', text: 'Original Government Photo ID (Hotel check-in & maritime permits)', checked: true, category: 'Essentials' },
    { id: '7', text: 'Portable power bank 10,000 mAh (Navigation & photography)', checked: false, category: 'Gear' },
    { id: '8', text: 'Natural citronella / mosquito balm for outdoor evening dining', checked: false, category: 'Wellness' },
  ]);

  const [newItem, setNewItem] = useState('');

  if (!isPackingOpen) return null;

  const toggleCheck = (id: string) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, checked: !it.checked } : it))
    );
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    setItems((prev) => [
      ...prev,
      { id: Date.now().toString(), text: newItem.trim(), checked: false, category: 'Personal' },
    ]);
    setNewItem('');
  };

  const checkedCount = items.filter((i) => i.checked).length;
  const percentage = Math.round((checkedCount / items.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 p-4 sm:p-6 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-2xl flex flex-col max-h-[88vh] text-stone-900">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-stone-100 pb-5 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-stone-100 text-stone-700">
                <Luggage className="h-4 w-4" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Trip Preparation
              </span>
            </div>
            <h3 className="font-serif text-2xl text-stone-900 tracking-tight">
              Packing Ledger
            </h3>
            <p className="text-xs text-stone-500 mt-1 flex items-center gap-1.5">
              <Sun className="h-3.5 w-3.5 text-stone-400" />
              <span>Calibrated for North Goa: 29°C sunny, coastal trails & maritime activities</span>
            </p>
          </div>

          <button
            onClick={() => setIsPackingOpen(false)}
            className="rounded-full p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Progress Metric */}
        <div className="mb-5 bg-stone-50 rounded-xl p-4 border border-stone-100">
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="font-medium text-stone-600">Readiness Progress</span>
            <span className="font-mono text-stone-900 font-semibold">
              {checkedCount} of {items.length} packed ({percentage}%)
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-stone-200 overflow-hidden">
            <div
              className="h-full bg-stone-900 transition-all duration-300 rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-stone-500">
            <ShieldCheck className="h-3.5 w-3.5 text-stone-600" />
            <span>Essential documents and sun safety items are prioritized</span>
          </div>
        </div>

        {/* List items */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 divide-y divide-stone-50">
          {items.map((it) => (
            <div
              key={it.id}
              onClick={() => toggleCheck(it.id)}
              className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition select-none ${
                it.checked
                  ? 'bg-stone-50 text-stone-400'
                  : 'hover:bg-stone-50/80 text-stone-800'
              }`}
            >
              <div
                className={`mt-0.5 h-4 w-4 rounded border flex items-center justify-center transition shrink-0 ${
                  it.checked
                    ? 'bg-stone-900 border-stone-900 text-white'
                    : 'border-stone-300 bg-white'
                }`}
              >
                {it.checked && <Check className="h-3 w-3 stroke-[2.5]" />}
              </div>
              <div className="flex-1 text-xs leading-relaxed">
                <span className={it.checked ? 'line-through text-stone-400' : 'text-stone-800 font-normal'}>
                  {it.text}
                </span>
                <span className="ml-2 inline-block rounded bg-stone-100 px-1.5 py-0.5 text-[10px] font-medium text-stone-500">
                  {it.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Add custom item */}
        <form onSubmit={addItem} className="pt-4 border-t border-stone-100 flex items-center gap-2 mt-3">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add an item to your packing list..."
            className="flex-1 rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:bg-white focus:border-stone-900 focus:outline-none transition"
          />
          <button
            type="submit"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-900 text-white hover:bg-stone-800 transition active:scale-95 shrink-0"
            aria-label="Add item"
          >
            <Plus className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
