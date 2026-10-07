export type TravelPace = 'relaxed' | 'balanced' | 'packed';
export type TravelStyle = 'Adventure' | 'Food' | 'Luxury' | 'Budget' | 'Romantic' | 'Family' | 'Backpacking' | 'Cultural' | 'Nightlife' | 'Nature' | 'Shopping';

export interface TravelerConfig {
  adults: number;
  children: number;
  type: 'Solo' | 'Couple' | 'Friends' | 'Family' | 'Group';
}

export interface ActivityItem {
  id: string;
  time: string;
  title: string;
  category: 'sightseeing' | 'adventure' | 'beach' | 'food' | 'culture' | 'nightlife' | 'hidden_gem' | 'relax';
  location: string;
  coordinates: { x: number; y: number; lat: number; lng: number };
  duration: string;
  cost: number;
  crowdLevel: number; // 0 - 100%
  crowdAlternative?: {
    name: string;
    crowdLevel: number;
    savingMins: number;
    description: string;
  };
  isHiddenGem: boolean;
  hiddenGemReason?: string;
  whySelected: string;
  rating: number;
  reviewCount: number;
  image: string;
  locked: boolean;
}

export interface ItineraryDay {
  dayNumber: number;
  date: string;
  title: string;
  subtitle: string;
  area: string;
  locked: boolean;
  crowdLevel: number;
  estimatedCost: number;
  activities: ActivityItem[];
}

export interface HotelItem {
  id: string;
  name: string;
  rating: number;
  pricePerNight: number;
  nights: number;
  totalCost: number;
  location: string;
  distanceToHighlights: string;
  amenities: string[];
  coordinates: { x: number; y: number; lat: number; lng: number };
  image: string;
  locked: boolean;
  whySelected: string;
}

export interface TransportItem {
  id: string;
  mode: 'flight' | 'train' | 'bus' | 'car';
  provider: string;
  flightOrTrainNumber: string;
  departure: string;
  departureTime: string;
  arrival: string;
  arrivalTime: string;
  duration: string;
  cost: number;
  locked: boolean;
  co2Kg: number;
  whySelected: string;
}

export interface TripDNA {
  adventure: number; // 0 - 100
  food: number;
  luxury: number;
  nature: number;
  nightlife: number;
  culture: number;
  shopping: number;
  archetype: string;
  description: string;
}

export interface BudgetBreakdown {
  totalBudget: number;
  plannedCost: number;
  remaining: number;
  currency: string;
  transportCost: number;
  hotelCost: number;
  foodCost: number;
  activitiesCost: number;
  localTransitCost: number;
  bufferCost: number;
  savingsOpportunity: {
    title: string;
    amount: number;
    actionText: string;
  };
  upgradeOpportunity: {
    title: string;
    amount: number;
    actionText: string;
  };
}

export interface TripScore {
  overall: number; // 0 - 100
  budgetEfficiency: number;
  travelEfficiency: number;
  experienceQuality: number;
  scheduleBalance: number;
  critique: string;
}

export interface Trip {
  id: string;
  title: string;
  destination: string;
  tagline: string;
  heroImage: string;
  startDate: string;
  endDate: string;
  nights: number;
  daysCount: number;
  travelers: TravelerConfig;
  budget: BudgetBreakdown;
  score: TripScore;
  dna: TripDNA;
  transport: TransportItem;
  hotel: HotelItem;
  days: ItineraryDay[];
  weather: {
    temp: string;
    condition: string;
    icon: string;
    forecast: string;
    alert?: string;
  };
  locked: {
    hotel?: boolean;
    transport?: boolean;
    dayIds?: number[];
    activityIds?: string[];
  };
}

export interface NegotiationTradeoff {
  id: string;
  title: string;
  summary: string;
  totalCost: number;
  budgetDelta: number; // e.g. -1500 or +2000
  hotelTier: string;
  transportMode: string;
  vibe: string;
  pros: string[];
  cons: string[];
  recommended?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'rove-ai' | 'system';
  text: string;
  timestamp: string;
  diffSummary?: string;
  savingsApplied?: number;
  actions?: {
    label: string;
    actionKey: string;
  }[];
}

export interface RoveCreditTransaction {
  id: string;
  title: string;
  amount: number;
  type: 'earn' | 'redeem';
  date: string;
}

export interface PassportBadge {
  id: string;
  title: string;
  icon: string;
  description: string;
  dateEarned: string;
}

export interface PassportStamp {
  id: string;
  destination: string;
  country: string;
  date: string;
  days: number;
  badge: string;
}
