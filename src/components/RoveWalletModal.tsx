'use client';

import React, { useState } from 'react';
import { useRove } from '@/context/RoveContext';
import {
  Wallet,
  TrendingUp,
  Gift,
  CheckCircle2,
  X,
  Share2,
} from 'lucide-react';

export const RoveWalletModal: React.FC = () => {
  const {
    isWalletOpen,
    setIsWalletOpen,
    creditsBalance,
    creditTransactions,
    redeemCredits,
    earnCredits,
  } = useRove();

  const [redeemedNotice, setRedeemedNotice] = useState<string | null>(null);

  if (!isWalletOpen) return null;

  const perks = [
    {
      title: '₹500 Direct Hotel Booking Credit',
      cost: 500,
      description: 'Instant ₹500 discount coupon applied at checkout on Casa De Vagator or any partner stay.',
      badge: 'Popular',
    },
    {
      title: 'Complimentary Room Tier Upgrade',
      cost: 750,
      description: 'Upgrade your standard boutique room to a Private Poolside Cabana Suite.',
      badge: 'High Value',
    },
    {
      title: 'Airport VIP Lounge Fast-Track Pass',
      cost: 400,
      description: 'Complimentary food, coffee & quiet Wi-Fi lounge entry at Goa Dabolim terminal.',
      badge: 'Comfort',
    },
    {
      title: 'Rove Concierge Pro 24/7 Priority',
      cost: 300,
      description: 'Unlocks dedicated human-in-the-loop travel agent escalation via WhatsApp.',
      badge: 'Concierge',
    },
  ];

  const handleRedeem = (cost: number, title: string) => {
    const success = redeemCredits(cost, title);
    if (success) {
      setRedeemedNotice(`Successfully claimed: ${title}!`);
      setTimeout(() => setRedeemedNotice(null), 3500);
    } else {
      alert('Insufficient Rove Credits! Complete more journeys or share your itinerary to earn.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 p-4 sm:p-6 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl rounded-3xl border border-stone-200 bg-[#FAF9F5] p-6 sm:p-8 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200/80 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-900 text-white">
              <Wallet className="h-4 w-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-serif font-medium text-stone-900 tracking-tight">
                  Rove Credits Rewards Wallet
                </h3>
                <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[10px] font-sans font-semibold text-stone-700 border border-stone-200">
                  Member Loyalty
                </span>
              </div>
              <p className="text-xs text-stone-500 font-sans">Earn credits on every trip plan, review, and smart optimization</p>
            </div>
          </div>

          <button
            onClick={() => setIsWalletOpen(false)}
            className="rounded-full bg-stone-100 p-2 text-stone-600 hover:bg-stone-200 hover:text-stone-900 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Notice Toast */}
        {redeemedNotice && (
          <div className="mb-4 rounded-2xl border border-stone-300 bg-white p-3.5 text-xs text-stone-800 flex items-center gap-2 shadow-sm">
            <CheckCircle2 className="h-4 w-4 text-stone-900" />
            <span className="font-sans font-medium">{redeemedNotice}</span>
          </div>
        )}

        {/* Clean Balance Showcase */}
        <div className="rounded-3xl border border-stone-200 bg-white p-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm font-sans">
          <div>
            <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold block mb-1">
              Available Reward Balance
            </span>
            <div className="text-3xl sm:text-4xl font-serif font-medium text-stone-900 flex items-baseline gap-2">
              <span>{creditsBalance.toLocaleString()}</span>
              <span className="text-sm font-sans font-medium text-amber-800">Rove Credits (RC)</span>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              Redeemable power: <strong className="text-stone-800 font-semibold">~₹{creditsBalance.toLocaleString()} in room upgrades & flight credits</strong>
            </p>
          </div>

          <button
            onClick={() => {
              earnCredits(200, 'Shared Itinerary with Friends');
              alert('+200 Rove Credits added to your wallet!');
            }}
            className="flex items-center gap-1.5 rounded-full border border-stone-300 bg-stone-50 px-4 py-2 text-xs font-semibold text-stone-800 hover:bg-stone-100 transition shadow-sm"
          >
            <Share2 className="h-3.5 w-3.5 text-stone-600" />
            <span>Share Trip (+200 RC)</span>
          </button>
        </div>

        {/* Content Tabs: Redeem Perks & Activity History */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-1 font-sans">
          {/* Redeem Perks Section */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
              <Gift className="h-3.5 w-3.5 text-stone-700" />
              <span>Available Perks & Upgrades</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {perks.map((perk, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-stone-200 bg-white p-5 flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-medium mb-1">
                      <span className="text-stone-900 font-serif text-base">{perk.title}</span>
                      <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] text-stone-700 font-mono font-semibold">
                        {perk.cost} RC
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed mb-4">{perk.description}</p>
                  </div>

                  <button
                    onClick={() => handleRedeem(perk.cost, perk.title)}
                    disabled={creditsBalance < perk.cost}
                    className="w-full rounded-full bg-stone-900 py-2 text-xs font-semibold text-white hover:bg-stone-800 transition disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Redeem for {perk.cost} RC
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Transaction Activity Log */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-stone-700" />
              <span>Credits Activity History</span>
            </h4>

            <div className="rounded-2xl border border-stone-200 bg-white divide-y divide-stone-100">
              {creditTransactions.map((tx) => (
                <div key={tx.id} className="p-4 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-medium text-stone-900 block">{tx.title}</span>
                    <span className="text-[10px] text-stone-400">{tx.date}</span>
                  </div>
                  <span
                    className={`font-mono font-semibold ${
                      tx.type === 'earn' ? 'text-amber-900' : 'text-stone-600'
                    }`}
                  >
                    {tx.type === 'earn' ? `+${tx.amount}` : `-${tx.amount}`} RC
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
