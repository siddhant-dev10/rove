'use client';

import React, { createContext, useContext, useState } from 'react';
import {
  Trip,
  ChatMessage,
  RoveCreditTransaction,
  PassportBadge,
  PassportStamp,
  NegotiationTradeoff,
} from '@/types/rove';
import {
  initialGoaTrip,
  sampleNegotiationTradeoffs,
  initialBadges,
  initialStamps,
} from '@/data/mockData';

interface RoveContextType {
  trip: Trip;
  setTrip: React.Dispatch<React.SetStateAction<Trip>>;
  // Lock system
  isHotelLocked: boolean;
  isTransportLocked: boolean;
  toggleLockHotel: () => void;
  toggleLockTransport: () => void;
  toggleLockDay: (dayNumber: number) => void;
  toggleLockActivity: (activityId: string) => void;
  // Re-optimization engine
  reoptimizeTrip: (targetSavings?: number, customPrompt?: string) => void;
  resetTripToDefault: () => void;
  // Chat engine
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string) => void;
  isAiThinking: boolean;
  // What-If Simulator
  activeSimulation: 'none' | 'rain' | 'cheaper2k' | 'train' | 'budgetUp5k';
  applySimulation: (type: 'none' | 'rain' | 'cheaper2k' | 'train' | 'budgetUp5k') => void;
  // Replay System
  isReplayModalOpen: boolean;
  setIsReplayModalOpen: (open: boolean) => void;
  replayStep: number;
  setReplayStep: (step: number) => void;
  isReplayPlaying: boolean;
  setIsReplayPlaying: (playing: boolean) => void;
  // Modals & Navigation
  isNegotiationOpen: boolean;
  setIsNegotiationOpen: (open: boolean) => void;
  isBookingOpen: boolean;
  setIsBookingOpen: (open: boolean) => void;
  isWalletOpen: boolean;
  setIsWalletOpen: (open: boolean) => void;
  isPassportOpen: boolean;
  setIsPassportOpen: (open: boolean) => void;
  isPackingOpen: boolean;
  setIsPackingOpen: (open: boolean) => void;
  isDemoTourOpen: boolean;
  setIsDemoTourOpen: (open: boolean) => void;
  isConciergeOpen: boolean;
  setIsConciergeOpen: (open: boolean) => void;
  // Travel Mode
  isTravelModeActive: boolean;
  setIsTravelModeActive: (active: boolean) => void;
  // Rewards & Passport
  creditsBalance: number;
  creditTransactions: RoveCreditTransaction[];
  earnCredits: (amount: number, title: string) => void;
  redeemCredits: (amount: number, title: string) => boolean;
  badges: PassportBadge[];
  stamps: PassportStamp[];
  tradeoffs: NegotiationTradeoff[];
  applyTradeoff: (tradeoffId: string) => void;
}

const RoveContext = createContext<RoveContextType | undefined>(undefined);

export const RoveProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trip, setTrip] = useState<Trip>(initialGoaTrip);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);
  const [activeSimulation, setActiveSimulation] = useState<'none' | 'rain' | 'cheaper2k' | 'train' | 'budgetUp5k'>('none');

  // Modal Visibility
  const [isNegotiationOpen, setIsNegotiationOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const [isPackingOpen, setIsPackingOpen] = useState(false);
  const [isDemoTourOpen, setIsDemoTourOpen] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [isTravelModeActive, setIsTravelModeActive] = useState(false);

  // Replay
  const [isReplayModalOpen, setIsReplayModalOpen] = useState(false);
  const [replayStep, setReplayStep] = useState(0);
  const [isReplayPlaying, setIsReplayPlaying] = useState(false);

  // Rewards & Passport
  const [creditsBalance, setCreditsBalance] = useState(1450);
  const [creditTransactions, setCreditTransactions] = useState<RoveCreditTransaction[]>([
    { id: 'tx-1', title: 'Trip Generated (Goa Hackathon)', amount: 250, type: 'earn', date: 'Just now' },
    { id: 'tx-2', title: 'Unlocked Constraint Optimizer', amount: 400, type: 'earn', date: 'Today' },
    { id: 'tx-3', title: 'Rove Early Member Welcome Bonus', amount: 800, type: 'earn', date: 'Yesterday' },
  ]);
  const [badges] = useState<PassportBadge[]>(initialBadges);
  const [stamps] = useState<PassportStamp[]>(initialStamps);
  const [tradeoffs] = useState<NegotiationTradeoff[]>(sampleNegotiationTradeoffs);

  // Initial chat history showcasing AI understanding
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'rove-ai',
      text: 'Welcome to Rove. I analyzed your Goa preferences: 3 Nights, 2 Travelers, strict ₹15,000 budget. I built a route-clustered itinerary that saves 32 km in cab rides, selected Casa De Vagator (₹4,500 total), and locked in a ₹350 emergency buffer.',
      timestamp: '10:42 AM',
      actions: [
        { label: 'Lock Hotel', actionKey: 'lock-hotel' },
        { label: 'Make ₹2,000 cheaper', actionKey: 'make-cheaper' },
        { label: 'Run Trip Replay', actionKey: 'trip-replay' },
      ],
    },
  ]);

  // Lock toggles
  const isHotelLocked = trip.locked.hotel ?? false;
  const isTransportLocked = trip.locked.transport ?? false;

  const toggleLockHotel = () => {
    setTrip((prev) => ({
      ...prev,
      locked: { ...prev.locked, hotel: !prev.locked.hotel },
      hotel: { ...prev.hotel, locked: !prev.hotel.locked },
    }));
  };

  const toggleLockTransport = () => {
    setTrip((prev) => ({
      ...prev,
      locked: { ...prev.locked, transport: !prev.locked.transport },
      transport: { ...prev.transport, locked: !prev.transport.locked },
    }));
  };

  const toggleLockDay = (dayNumber: number) => {
    setTrip((prev) => {
      const currentDayIds = prev.locked.dayIds || [];
      const isLocked = currentDayIds.includes(dayNumber);
      const newDayIds = isLocked
        ? currentDayIds.filter((id) => id !== dayNumber)
        : [...currentDayIds, dayNumber];

      return {
        ...prev,
        locked: { ...prev.locked, dayIds: newDayIds },
        days: prev.days.map((d) =>
          d.dayNumber === dayNumber ? { ...d, locked: !isLocked } : d
        ),
      };
    });
  };

  const toggleLockActivity = (activityId: string) => {
    setTrip((prev) => {
      const currentActIds = prev.locked.activityIds || [];
      const isLocked = currentActIds.includes(activityId);
      const newActIds = isLocked
        ? currentActIds.filter((id) => id !== activityId)
        : [...currentActIds, activityId];

      return {
        ...prev,
        locked: { ...prev.locked, activityIds: newActIds },
        days: prev.days.map((day) => ({
          ...day,
          activities: day.activities.map((act) =>
            act.id === activityId ? { ...act, locked: !isLocked } : act
          ),
        })),
      };
    });
  };

  // RE-OPTIMIZATION ENGINE (Lock & Re-Optimize signature feature)
  const reoptimizeTrip = (targetSavings: number = 2000) => {
    setIsAiThinking(true);

    setTimeout(() => {
      setTrip((prev) => {
        // Respect locked items: if hotel is locked, keep hotel cost intact!
        const hotelIsLocked = prev.locked.hotel;

        // Optimize activities and transit
        const updatedDays = prev.days.map((day) => {
          if (prev.locked.dayIds?.includes(day.dayNumber)) {
            return day; // Locked day untouched
          }

          const updatedActivities = day.activities.map((act) => {
            if (prev.locked.activityIds?.includes(act.id)) {
              return act; // Locked activity untouched
            }

            // If Day 2 marine sports: swap expensive speed boat package with cliffside kayak & scenic trek
            if (act.id === 'act-201') {
              return {
                ...act,
                title: 'Vagator Coastal Sea Kayaking & Hidden Sea Caves',
                cost: 600, // was 1600 -> saved 1000
                whySelected: 'Re-optimized for budget: swapped high-fuel speedboat for scenic sea kayaking. Saves ₹1,000 with 4.8★ thrill rating.',
              };
            }

            // Optimize high-cost lunches or dining
            if (act.id === 'act-202') {
              return {
                ...act,
                cost: 650, // was 900 -> saved 250
                whySelected: 'Re-optimized: switched from chef tasting menu to authentic traditional Goan thali pairing. Saves ₹250.',
              };
            }

            // Optimize catamaran cruise
            if (act.id === 'act-304') {
              return {
                ...act,
                cost: 450, // was 800 -> saved 350
                title: 'Riverfront Boardwalk Live Jazz & Acoustic Session',
                whySelected: 'Re-optimized: replaced ticketed catamaran with open-air riverside live music terrace. Saves ₹350.',
              };
            }

            return act;
          });

          const newDayCost = updatedActivities.reduce((acc, curr) => acc + curr.cost, 0);
          return {
            ...day,
            activities: updatedActivities,
            estimatedCost: newDayCost,
          };
        });

        // Savings:
        // Act 201: -1000
        // Act 202: -250
        // Act 304: -350
        // Local transit pooled pass: -400 (was 1000 -> 600)
        const finalPlanned = prev.budget.plannedCost - targetSavings;
        const remainingBudget = prev.budget.totalBudget - finalPlanned;

        return {
          ...prev,
          budget: {
            ...prev.budget,
            plannedCost: finalPlanned,
            remaining: remainingBudget,
            activitiesCost: Math.max(1000, prev.budget.activitiesCost - 1000),
            localTransitCost: 600,
            bufferCost: 450,
          },
          score: {
            ...prev.score,
            overall: 96,
            budgetEfficiency: 99,
            critique: `Re-optimization complete. ${
              hotelIsLocked ? 'Locked hotel (Casa De Vagator @ ₹4,500) strictly preserved.' : 'Hotel re-matched.'
            } Trimmed ₹${targetSavings.toLocaleString()} by substituting fuel-heavy marine excursions with scenic sea kayaking and consolidating local transit passes.`,
          },
          days: updatedDays,
        };
      });

      // Earn reward credits for optimizing
      earnCredits(150, 'Smart Lock & Re-Optimization Triggered');

      // AI response
      const lockNote = isHotelLocked
        ? '🔒 Kept your hotel Casa De Vagator Heritage Haven locked at ₹4,500.'
        : 'Adjusted hotel & activities.';
      const newAiMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        sender: 'rove-ai',
        text: `✨ Re-optimization executed successfully! ${lockNote} I reduced the trip total by ₹${targetSavings.toLocaleString()}, lowering your total cost from ₹14,650 to ₹12,650. Your remaining budget is now ₹2,350. You also earned +150 Rove Credits!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        diffSummary: `Saved ₹${targetSavings.toLocaleString()} | Hotel Locked | 3 Activities Swapped | Trip Score surged to 96/100`,
        savingsApplied: targetSavings,
      };

      setChatMessages((prev) => [...prev, newAiMessage]);
      setIsAiThinking(false);
    }, 1200);
  };

  const resetTripToDefault = () => {
    setTrip(initialGoaTrip);
    setActiveSimulation('none');
  };

  // Chat engine
  const sendChatMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setIsAiThinking(true);

    const lower = text.toLowerCase();

    setTimeout(() => {
      let replyText = '';
      let diff = '';
      const savings = 0;

      if (lower.includes('cheaper') || lower.includes('save') || lower.includes('2000') || lower.includes('2,000')) {
        reoptimizeTrip(2000);
        return;
      } else if (lower.includes('rain') || lower.includes('weather')) {
        applySimulation('rain');
        replyText =
          '🌧️ Rain scenario activated! I relocated outdoor morning water sports to indoor Goan Portuguese Azulejo Art Tile Studio & Mario Miranda Gallery, preserving your schedule without weather disruption.';
        diff = 'Outdoor water sports ➔ Indoor cultural tile atelier & craft brewery tasting';
      } else if (lower.includes('tiring') || lower.includes('less tiring') || lower.includes('relaxed')) {
        setTrip((prev) => ({
          ...prev,
          dna: { ...prev.dna, adventure: 65, archetype: 'Leisure & Coastal Serenity Nomad' },
          days: prev.days.map((d, idx) =>
            idx === 1
              ? {
                  ...d,
                  subtitle: 'Soft morning brunch, shaded palm grove & sunset beach lounge',
                  activities: d.activities.slice(0, 2),
                }
              : d
          ),
        }));
        replyText =
          '😌 Adjusted Day 2 to Relaxed Mode: removed early 08:30 AM speedboating, shifted wake-up call to 10:30 AM, and replaced intense walking with a shaded hammock garden at Assagao.';
        diff = 'Removed 2 strenuous morning hours | Pushed start time to 10:30 AM';
      } else if (lower.includes('gem') || lower.includes('hidden') || lower.includes('local')) {
        replyText =
          '💎 Added 2 high-conviction hidden gems: Secret Chorão Island Bird Sanctuary Kayak (4.9★, zero tourist crowds) and a 1928 heritage bakery run by fourth-generation Goan artisans.';
        diff = 'Injected 2 verified local spots | Crowd index reduced by 34%';
      } else {
        replyText = `Understood: "${text}". I have cross-checked your ₹15,000 budget and geographic coordinates. The itinerary is re-aligned with minimum transit overhead.`;
        diff = 'AI validated routes & budget alignment';
      }

      const aiReply: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        sender: 'rove-ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        diffSummary: diff || undefined,
        savingsApplied: savings > 0 ? savings : undefined,
      };

      setChatMessages((prev) => [...prev, aiReply]);
      setIsAiThinking(false);
    }, 900);
  };

  // What-If Simulator
  const applySimulation = (type: 'none' | 'rain' | 'cheaper2k' | 'train' | 'budgetUp5k') => {
    setActiveSimulation(type);

    if (type === 'rain') {
      setTrip((prev) => ({
        ...prev,
        weather: {
          temp: '25°C',
          condition: 'Monsoon Showers Expected (85% Rain)',
          icon: '🌧️',
          forecast: 'Heavy showers predicted between 10:00 AM – 03:00 PM. High sea surge warning.',
          alert: 'Active Monsoon Protocol: AI has substituted open-sea activities with indoor heritage and art experiences.',
        },
        days: prev.days.map((day) =>
          day.dayNumber === 2
            ? {
                ...day,
                title: 'Indoor Goan Arts, Distilleries & Culinary Heritage',
                subtitle: 'Adapted for rain: Museums, spice kitchen & craft feni tasting',
                activities: [
                  {
                    id: 'act-rain-1',
                    time: '10:00 AM',
                    title: 'Mario Miranda Cartoon Gallery & Portuguese Azulejos',
                    category: 'culture',
                    location: 'Porvorim Gallery Space',
                    coordinates: { x: 42, y: 46, lat: 15.535, lng: 73.818 },
                    duration: '2h 00m',
                    cost: 300,
                    crowdLevel: 25,
                    isHiddenGem: true,
                    hiddenGemReason: 'Cozy indoor gallery celebrating Goa’s greatest satirist and illustrator.',
                    whySelected: 'Weatherproof indoor cultural retreat. Completely immune to coastal rainstorms.',
                    rating: 4.8,
                    reviewCount: 1100,
                    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
                    locked: false,
                  },
                  {
                    id: 'act-rain-2',
                    time: '01:00 PM',
                    title: 'Artisan Cashew Feni Distilling & Secret Kitchen Pairing',
                    category: 'food',
                    location: 'Cazulo Cellars, Cuelim',
                    coordinates: { x: 46, y: 58, lat: 15.352, lng: 73.868 },
                    duration: '2h 30m',
                    cost: 850,
                    crowdLevel: 30,
                    isHiddenGem: true,
                    hiddenGemReason: 'World’s only floating feni tasting room inside a lush botanical cellar.',
                    whySelected: 'Protected indoor cellar atmosphere with world-class craft spirits storytelling.',
                    rating: 4.9,
                    reviewCount: 780,
                    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80',
                    locked: false,
                  },
                  ...day.activities.slice(2),
                ],
              }
            : day
        ),
      }));
    } else if (type === 'cheaper2k') {
      reoptimizeTrip(2000);
    } else if (type === 'train') {
      setTrip((prev) => ({
        ...prev,
        transport: {
          id: 'trans-train-01',
          mode: 'train',
          provider: 'Vande Bharat Superfast Express',
          flightOrTrainNumber: '22229 (CSMT ➔ MAO)',
          departure: 'Mumbai CSMT',
          departureTime: '05:25 AM',
          arrival: 'Madgaon Junction',
          arrivalTime: '01:10 PM',
          duration: '7h 45m',
          cost: 2900, // saved 1300 vs flight
          locked: false,
          co2Kg: 18, // 75% lower carbon footprint!
          whySelected: 'Executive scenic vista train through Konkan ghats. Reduces emissions by 77% and saves ₹1,300 in transport.',
        },
        budget: {
          ...prev.budget,
          transportCost: 2900,
          plannedCost: prev.budget.plannedCost - 1300,
          remaining: prev.budget.remaining + 1300,
        },
      }));
    } else if (type === 'budgetUp5k') {
      setTrip((prev) => ({
        ...prev,
        budget: {
          ...prev.budget,
          totalBudget: 20000,
          remaining: prev.budget.remaining + 5000,
        },
      }));
    } else {
      resetTripToDefault();
    }
  };

  // Trade-off application
  const applyTradeoff = (tradeoffId: string) => {
    if (tradeoffId === 'plan-train-resort') {
      applySimulation('train');
    } else if (tradeoffId === 'plan-plus-budget') {
      applySimulation('budgetUp5k');
    } else {
      resetTripToDefault();
    }
    setIsNegotiationOpen(false);
  };

  // Credits engine
  const earnCredits = (amount: number, title: string) => {
    setCreditsBalance((prev) => prev + amount);
    setCreditTransactions((prev) => [
      {
        id: `tx-${Date.now()}`,
        title,
        amount,
        type: 'earn',
        date: 'Just now',
      },
      ...prev,
    ]);
  };

  const redeemCredits = (amount: number, title: string) => {
    if (creditsBalance < amount) return false;
    setCreditsBalance((prev) => prev - amount);
    setCreditTransactions((prev) => [
      {
        id: `tx-${Date.now()}`,
        title,
        amount,
        type: 'redeem',
        date: 'Just now',
      },
      ...prev,
    ]);
    return true;
  };

  return (
    <RoveContext.Provider
      value={{
        trip,
        setTrip,
        isHotelLocked,
        isTransportLocked,
        toggleLockHotel,
        toggleLockTransport,
        toggleLockDay,
        toggleLockActivity,
        reoptimizeTrip,
        resetTripToDefault,
        chatMessages,
        sendChatMessage,
        isAiThinking,
        activeSimulation,
        applySimulation,
        isReplayModalOpen,
        setIsReplayModalOpen,
        replayStep,
        setReplayStep,
        isReplayPlaying,
        setIsReplayPlaying,
        isNegotiationOpen,
        setIsNegotiationOpen,
        isBookingOpen,
        setIsBookingOpen,
        isWalletOpen,
        setIsWalletOpen,
        isPassportOpen,
        setIsPassportOpen,
        isPackingOpen,
        setIsPackingOpen,
        isDemoTourOpen,
        setIsDemoTourOpen,
        isConciergeOpen,
        setIsConciergeOpen,
        isTravelModeActive,
        setIsTravelModeActive,
        creditsBalance,
        creditTransactions,
        earnCredits,
        redeemCredits,
        badges,
        stamps,
        tradeoffs,
        applyTradeoff,
      }}
    >
      {children}
    </RoveContext.Provider>
  );
};

export const useRove = () => {
  const context = useContext(RoveContext);
  if (!context) {
    throw new Error('useRove must be used within a RoveProvider');
  }
  return context;
};
