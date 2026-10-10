'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRove } from '@/context/RoveContext';
import {
  Wallet,
  X,
  Check,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Bed,
  Plane,
  Utensils,
  Ticket,
  Car,
  ShieldAlert,
} from 'lucide-react';

export const BudgetEditorModal: React.FC = () => {
  const {
    isBudgetEditorOpen,
    setIsBudgetEditorOpen,
    trip,
    updateTripBudget,
  } = useRove();

  const { budget } = trip;

  // Local editable state
  const [totalBudget, setTotalBudget] = useState(budget.totalBudget);
  const [hotelCost, setHotelCost] = useState(budget.hotelCost);
  const [transportCost, setTransportCost] = useState(budget.transportCost);
  const [foodCost, setFoodCost] = useState(budget.foodCost);
  const [activitiesCost, setActivitiesCost] = useState(budget.activitiesCost);
  const [localTransitCost, setLocalTransitCost] = useState(budget.localTransitCost);
  const [bufferCost, setBufferCost] = useState(budget.bufferCost);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync when modal opens or trip changes
  useEffect(() => {
    if (isBudgetEditorOpen) {
      setTotalBudget(budget.totalBudget);
      setHotelCost(budget.hotelCost);
      setTransportCost(budget.transportCost);
      setFoodCost(budget.foodCost);
      setActivitiesCost(budget.activitiesCost);
      setLocalTransitCost(budget.localTransitCost);
      setBufferCost(budget.bufferCost);
      setSaveSuccess(false);
    }
  }, [isBudgetEditorOpen, budget]);

  const plannedTotal = useMemo(() => {
    return (
      (Number(hotelCost) || 0) +
      (Number(transportCost) || 0) +
      (Number(foodCost) || 0) +
      (Number(activitiesCost) || 0) +
      (Number(localTransitCost) || 0) +
      (Number(bufferCost) || 0)
    );
  }, [hotelCost, transportCost, foodCost, activitiesCost, localTransitCost, bufferCost]);

  const remaining = totalBudget - plannedTotal;
  const isOverBudget = remaining < 0;
  const percentageUsed = totalBudget > 0 ? Math.min(100, Math.round((plannedTotal / totalBudget) * 100)) : 100;

  if (!isBudgetEditorOpen) return null;

  const handleQuickBudgetChange = (delta: number) => {
    setTotalBudget((prev) => Math.max(5000, prev + delta));
  };

  const handleAutoBalance = () => {
    const categoriesWithoutBuffer =
      (Number(hotelCost) || 0) +
      (Number(transportCost) || 0) +
      (Number(foodCost) || 0) +
      (Number(activitiesCost) || 0) +
      (Number(localTransitCost) || 0);

    const neededBuffer = Math.max(0, totalBudget - categoriesWithoutBuffer);
    setBufferCost(neededBuffer);
  };

  const handleResetToCurrent = () => {
    setTotalBudget(budget.totalBudget);
    setHotelCost(budget.hotelCost);
    setTransportCost(budget.transportCost);
    setFoodCost(budget.foodCost);
    setActivitiesCost(budget.activitiesCost);
    setLocalTransitCost(budget.localTransitCost);
    setBufferCost(budget.bufferCost);
  };

  const handleSave = () => {
    updateTripBudget({
      totalBudget: Number(totalBudget),
      hotelCost: Number(hotelCost),
      transportCost: Number(transportCost),
      foodCost: Number(foodCost),
      activitiesCost: Number(activitiesCost),
      localTransitCost: Number(localTransitCost),
      bufferCost: Number(bufferCost),
      plannedCost: plannedTotal,
      remaining,
    });

    setSaveSuccess(true);
    setTimeout(() => {
      setIsBudgetEditorOpen(false);
      setSaveSuccess(false);
    }, 700);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 p-4 sm:p-6 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="budget-editor-title"
    >
      <div className="relative w-full max-w-2xl rounded-3xl border border-stone-200 bg-[#FAF9F5] p-6 sm:p-8 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200/80 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-900 text-white">
              <Wallet className="h-4 w-4" />
            </span>
            <div>
              <h3 id="budget-editor-title" className="text-xl font-serif font-medium text-stone-900 tracking-tight">
                Customize Trip Money & Financial Cap
              </h3>
              <p className="text-xs text-stone-500 font-sans mt-0.5">
                Adjust your spending limit and category allocations for {trip.destination.split(',')[0]}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsBudgetEditorOpen(false)}
            className="rounded-full bg-stone-100 p-2 text-stone-600 hover:bg-stone-200 hover:text-stone-900 transition"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-6 font-sans">
          {/* Total Budget Cap Input & Quick Steppers */}
          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <label htmlFor="total-budget-input" className="text-xs font-semibold uppercase tracking-wider text-stone-500 block">
                  Total Journey Budget Cap
                </label>
                <span className="text-[11px] text-stone-500">
                  The maximum amount Rove respects across all suppliers
                </span>
              </div>

              {/* Quick Steppers */}
              <div className="flex items-center gap-1.5 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => handleQuickBudgetChange(-5000)}
                  className="rounded-lg border border-stone-200 bg-stone-50 px-2 py-1 text-[11px] font-medium text-stone-700 hover:bg-stone-100 transition"
                  title="Subtract ₹5,000"
                >
                  -5k
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickBudgetChange(-1000)}
                  className="rounded-lg border border-stone-200 bg-stone-50 px-2 py-1 text-[11px] font-medium text-stone-700 hover:bg-stone-100 transition"
                  title="Subtract ₹1,000"
                >
                  -1k
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickBudgetChange(1000)}
                  className="rounded-lg border border-stone-200 bg-stone-50 px-2 py-1 text-[11px] font-medium text-stone-700 hover:bg-stone-100 transition"
                  title="Add ₹1,000"
                >
                  +1k
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickBudgetChange(5000)}
                  className="rounded-lg border border-stone-200 bg-stone-50 px-2 py-1 text-[11px] font-medium text-stone-700 hover:bg-stone-100 transition"
                  title="Add ₹5,000"
                >
                  +5k
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 border-b-2 border-stone-900 pb-1">
              <span className="text-2xl font-serif text-stone-500">₹</span>
              <input
                id="total-budget-input"
                type="number"
                min={1000}
                step={500}
                value={totalBudget}
                onChange={(e) => setTotalBudget(Math.max(0, Number(e.target.value)))}
                className="w-full bg-transparent text-2xl sm:text-3xl font-serif font-medium text-stone-900 focus:outline-none"
              />
            </div>
          </div>

          {/* Allocation Health & Live Progress */}
          <div className="rounded-2xl border border-stone-200 bg-stone-50/80 p-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs gap-2">
              <div className="flex items-center gap-2">
                <span className="text-stone-600 font-medium">Planned Sum:</span>
                <strong className="text-stone-900 text-sm font-semibold">
                  ₹{plannedTotal.toLocaleString()}
                </strong>
                <span className="text-stone-400">/</span>
                <span className="text-stone-600">Cap: ₹{totalBudget.toLocaleString()}</span>
              </div>

              {/* Status Indicator */}
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium self-start sm:self-auto ${
                  isOverBudget
                    ? 'bg-amber-100 text-amber-900 border border-amber-200'
                    : 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                }`}
              >
                {isOverBudget ? (
                  <>
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-700" />
                    <span>Over Cap by ₹{Math.abs(remaining).toLocaleString()}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" />
                    <span>₹{remaining.toLocaleString()} Available Buffer</span>
                  </>
                )}
              </div>
            </div>

            {/* Allocation Bar */}
            <div className="h-3 w-full rounded-full bg-stone-200 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 rounded-full ${
                  isOverBudget ? 'bg-amber-600' : 'bg-stone-900'
                }`}
                style={{ width: `${Math.min(100, (plannedTotal / (totalBudget || 1)) * 100)}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
              <span>{percentageUsed}% of cap committed</span>
              <button
                type="button"
                onClick={handleAutoBalance}
                className="inline-flex items-center gap-1 text-stone-800 font-semibold hover:text-stone-950 underline underline-offset-2"
              >
                <Sparkles className="h-3 w-3 text-amber-600" />
                <span>AI Auto-balance buffer</span>
              </button>
            </div>
          </div>

          {/* Individual Category Allocations */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase font-sans tracking-widest text-stone-500 font-semibold block">
                Line-by-Line Breakdown
              </span>
              <span className="text-[11px] text-stone-500">Edit amounts directly</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Hotel */}
              <div className="rounded-2xl border border-stone-200 bg-white p-3.5 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#A88B74]/20 text-[#A88B74]">
                    <Bed className="h-4 w-4 text-stone-800" />
                  </span>
                  <div>
                    <span className="font-medium text-stone-800 block text-xs">Accommodation</span>
                    <span className="text-[10px] text-stone-500">Boutique Stays</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-stone-400 font-serif">₹</span>
                  <input
                    type="number"
                    min={0}
                    step={100}
                    value={hotelCost}
                    onChange={(e) => setHotelCost(Math.max(0, Number(e.target.value)))}
                    className="w-20 text-right font-medium text-stone-900 bg-stone-50 border border-stone-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>

              {/* Flights / Inbound */}
              <div className="rounded-2xl border border-stone-200 bg-white p-3.5 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#5C7182]/20 text-[#5C7182]">
                    <Plane className="h-4 w-4 text-stone-800" />
                  </span>
                  <div>
                    <span className="font-medium text-stone-800 block text-xs">Flights / Travel</span>
                    <span className="text-[10px] text-stone-500">Inbound Transit</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-stone-400 font-serif">₹</span>
                  <input
                    type="number"
                    min={0}
                    step={100}
                    value={transportCost}
                    onChange={(e) => setTransportCost(Math.max(0, Number(e.target.value)))}
                    className="w-20 text-right font-medium text-stone-900 bg-stone-50 border border-stone-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>

              {/* Dining */}
              <div className="rounded-2xl border border-stone-200 bg-white p-3.5 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#C27D56]/20 text-[#C27D56]">
                    <Utensils className="h-4 w-4 text-stone-800" />
                  </span>
                  <div>
                    <span className="font-medium text-stone-800 block text-xs">Curated Dining</span>
                    <span className="text-[10px] text-stone-500">Meals & Cafes</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-stone-400 font-serif">₹</span>
                  <input
                    type="number"
                    min={0}
                    step={50}
                    value={foodCost}
                    onChange={(e) => setFoodCost(Math.max(0, Number(e.target.value)))}
                    className="w-20 text-right font-medium text-stone-900 bg-stone-50 border border-stone-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>

              {/* Activities */}
              <div className="rounded-2xl border border-stone-200 bg-white p-3.5 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#768763]/20 text-[#768763]">
                    <Ticket className="h-4 w-4 text-stone-800" />
                  </span>
                  <div>
                    <span className="font-medium text-stone-800 block text-xs">Activities & Passes</span>
                    <span className="text-[10px] text-stone-500">Excursions & Entry</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-stone-400 font-serif">₹</span>
                  <input
                    type="number"
                    min={0}
                    step={50}
                    value={activitiesCost}
                    onChange={(e) => setActivitiesCost(Math.max(0, Number(e.target.value)))}
                    className="w-20 text-right font-medium text-stone-900 bg-stone-50 border border-stone-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>

              {/* Local Transit */}
              <div className="rounded-2xl border border-stone-200 bg-white p-3.5 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#8F8D88]/20 text-[#8F8D88]">
                    <Car className="h-4 w-4 text-stone-800" />
                  </span>
                  <div>
                    <span className="font-medium text-stone-800 block text-xs">Local Transfers</span>
                    <span className="text-[10px] text-stone-500">Cabs & Shuttles</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-stone-400 font-serif">₹</span>
                  <input
                    type="number"
                    min={0}
                    step={50}
                    value={localTransitCost}
                    onChange={(e) => setLocalTransitCost(Math.max(0, Number(e.target.value)))}
                    className="w-20 text-right font-medium text-stone-900 bg-stone-50 border border-stone-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>

              {/* Emergency Buffer */}
              <div className="rounded-2xl border border-stone-200 bg-white p-3.5 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#D6C7B2]/30 text-amber-900">
                    <ShieldAlert className="h-4 w-4 text-stone-800" />
                  </span>
                  <div>
                    <span className="font-medium text-stone-800 block text-xs">Reserved Buffer</span>
                    <span className="text-[10px] text-stone-500">Uncommitted Buffer</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-stone-400 font-serif">₹</span>
                  <input
                    type="number"
                    min={0}
                    step={50}
                    value={bufferCost}
                    onChange={(e) => setBufferCost(Math.max(0, Number(e.target.value)))}
                    className="w-20 text-right font-medium text-stone-900 bg-stone-50 border border-stone-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-5 pt-4 border-t border-stone-200/80 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleResetToCurrent}
            className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-4 py-2.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition active:scale-98"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
            <span className="sm:hidden">Reset</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsBudgetEditorOpen(false)}
              className="rounded-full border border-stone-300 bg-white px-4 py-2.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition active:scale-98"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={saveSuccess}
              className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-xs font-semibold text-white transition active:scale-98 shadow-sm ${
                saveSuccess ? 'bg-emerald-700' : 'bg-stone-900 hover:bg-stone-800'
              }`}
            >
              {saveSuccess ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Save & Apply Budget</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
