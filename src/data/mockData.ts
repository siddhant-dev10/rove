import { Trip, NegotiationTradeoff, PassportBadge, PassportStamp } from '@/types/rove';

export const initialGoaTrip: Trip = {
  id: 'trip-goa-hackathon-01',
  title: 'Goa Coastal Odyssey & Adrenaline Rush',
  destination: 'Goa, India',
  tagline: 'High-energy coastal thrill, locked boutique stay & route-optimized beaches',
  heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=80',
  startDate: '12 Dec 2026',
  endDate: '15 Dec 2026',
  nights: 3,
  daysCount: 4,
  travelers: {
    adults: 2,
    children: 0,
    type: 'Couple'
  },
  budget: {
    totalBudget: 15000,
    plannedCost: 14650,
    remaining: 350,
    currency: '₹',
    transportCost: 4200,
    hotelCost: 4500,
    foodCost: 2400,
    activitiesCost: 2000,
    localTransitCost: 1000,
    bufferCost: 550,
    savingsOpportunity: {
      title: 'Swap Jet Ski for Vagator Kayaking Safari',
      amount: 800,
      actionText: 'Save ₹800'
    },
    upgradeOpportunity: {
      title: 'Upgrade to Sunset Yacht Cruise with Sparkling Wine',
      amount: 1400,
      actionText: 'Upgrade for ₹1,400'
    }
  },
  score: {
    overall: 92,
    budgetEfficiency: 96,
    travelEfficiency: 94,
    experienceQuality: 91,
    scheduleBalance: 88,
    critique: 'Outstanding budget adherence. Route optimization grouped North Goa hotspots on Day 1 to prevent 32 km of cross-peninsula cab transit.'
  },
  dna: {
    adventure: 88,
    food: 76,
    luxury: 48,
    nature: 84,
    nightlife: 72,
    culture: 62,
    shopping: 40,
    archetype: 'Coastal Maverick & Adrenaline Nomad',
    description: 'A punchy equilibrium of high-octane aquatic pursuits, sunset cliff music spots, and serene Portuguese heritage alleyways.'
  },
  transport: {
    id: 'trans-01',
    mode: 'flight',
    provider: 'IndiGo Airlines',
    flightOrTrainNumber: '6E-204 (BOM ➔ GOI)',
    departure: 'Mumbai (BOM)',
    departureTime: '06:45 AM',
    arrival: 'Goa Dabolim (GOI)',
    arrivalTime: '08:05 AM',
    duration: '1h 20m',
    cost: 4200,
    locked: false,
    co2Kg: 78,
    whySelected: 'Earliest arrival slot maximizes Day 1 daylight hours while staying strictly within the ₹4,500 transport budget threshold.'
  },
  hotel: {
    id: 'hotel-01',
    name: 'Casa De Vagator Heritage Haven',
    rating: 4.6,
    pricePerNight: 1500,
    nights: 3,
    totalCost: 4500,
    location: 'Vagator, North Goa',
    distanceToHighlights: '12 min walk to Vagator Cliff & 8 min drive to Chapora Fort',
    amenities: ['Poolside Cabanas', 'Artisan Breakfast', 'High-Speed Wi-Fi', 'Scooter Rental Desk'],
    coordinates: { x: 38, y: 35, lat: 15.602, lng: 73.744 },
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    locked: false,
    whySelected: 'Prime central hub for North Goa itinerary; 24% cheaper than beachfront hotels while scoring 4.6+ stars for cleanliness and hospitality.'
  },
  days: [
    {
      dayNumber: 1,
      date: '12 Dec (Day 1)',
      title: 'Arrival & North Goa Coastal Circuit',
      subtitle: 'Touching down, fort cliff vistas & twilight soundscapes',
      area: 'North Goa (Candolim / Vagator)',
      locked: false,
      crowdLevel: 68,
      estimatedCost: 3450,
      activities: [
        {
          id: 'act-101',
          time: '09:30 AM',
          title: 'Airport Touchdown & Pre-booked Electric EV Cab',
          category: 'relax',
          location: 'Dabolim Airport to Vagator',
          coordinates: { x: 50, y: 70, lat: 15.380, lng: 73.831 },
          duration: '50m',
          cost: 850,
          crowdLevel: 45,
          isHiddenGem: false,
          whySelected: 'Pre-negotiated Rove partner transit guarantees zero surge pricing and direct hotel bag drop.',
          rating: 4.9,
          reviewCount: 412,
          image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
          locked: false
        },
        {
          id: 'act-102',
          time: '11:30 AM',
          title: 'Fort Aguada Ramparts & 17th Century Lighthouse',
          category: 'sightseeing',
          location: 'Sinquerim',
          coordinates: { x: 32, y: 55, lat: 15.492, lng: 73.773 },
          duration: '1h 30m',
          cost: 150,
          crowdLevel: 74,
          crowdAlternative: {
            name: 'Reis Magos Fort',
            crowdLevel: 32,
            savingMins: 40,
            description: 'Lesser-known restored river fortress with panoramic Mandovi views and zero tourist buses.'
          },
          isHiddenGem: false,
          whySelected: 'Historic sea-defense bastion offering unobstructed 360-degree Arabian Sea panorama.',
          rating: 4.5,
          reviewCount: 3200,
          image: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&w=600&q=80',
          locked: false
        },
        {
          id: 'act-103',
          time: '02:00 PM',
          title: 'Authentic Goan Thali Lunch at Kokum Bistro',
          category: 'food',
          location: 'Candolim Road',
          coordinates: { x: 35, y: 50, lat: 15.518, lng: 73.766 },
          duration: '1h 15m',
          cost: 650,
          crowdLevel: 55,
          isHiddenGem: true,
          hiddenGemReason: 'Chef-owned coastal culinary tavern celebrated for coconut solkadhi and rawa-fried kingfish.',
          whySelected: 'En-route between Fort Aguada and Vagator, cutting midday transit to under 6 minutes.',
          rating: 4.8,
          reviewCount: 890,
          image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
          locked: false
        },
        {
          id: 'act-104',
          time: '04:30 PM',
          title: 'Vagator Red Cliff Sunset & Soundscape at HillTop Garden',
          category: 'adventure',
          location: 'Ozran / Vagator Beach',
          coordinates: { x: 38, y: 35, lat: 15.601, lng: 73.743 },
          duration: '2h 30m',
          cost: 300,
          crowdLevel: 48,
          crowdAlternative: {
            name: 'Baga Beach Shacks',
            crowdLevel: 94,
            savingMins: 60,
            description: 'Baga beach is running at 94% congestion. Vagator red cliffs offer 5x more open space and higher scenic elevation.'
          },
          isHiddenGem: false,
          whySelected: 'Iconic crimson laterite cliffs glowing at golden hour; ideal for relaxed drinks and couple photography.',
          rating: 4.7,
          reviewCount: 1980,
          image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
          locked: false
        }
      ]
    },
    {
      dayNumber: 2,
      date: '13 Dec (Day 2)',
      title: 'Aquatic Adrenaline & Marine Exploration',
      subtitle: 'Water sports, ocean speedboating & coastal dining',
      area: 'Anjuna & Grand Island Environs',
      locked: false,
      crowdLevel: 58,
      estimatedCost: 3800,
      activities: [
        {
          id: 'act-201',
          time: '08:30 AM',
          title: 'Ocean Speedboat & Snorkeling at Grand Island Reef',
          category: 'adventure',
          location: 'Sinquerim Boat Jetty Launch',
          coordinates: { x: 30, y: 60, lat: 15.485, lng: 73.765 },
          duration: '3h 30m',
          cost: 1600,
          crowdLevel: 62,
          isHiddenGem: false,
          whySelected: 'Combines dolphin sighting, coral reef snorkeling, and boat lunch inside a cost-effective bundled pass.',
          rating: 4.6,
          reviewCount: 1420,
          image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
          locked: false
        },
        {
          id: 'act-202',
          time: '02:00 PM',
          title: 'Fresh Catch Lunch at Gunpowder Coastal Kitchen',
          category: 'food',
          location: 'Assagao Village',
          coordinates: { x: 44, y: 32, lat: 15.592, lng: 73.784 },
          duration: '1h 30m',
          cost: 900,
          crowdLevel: 70,
          isHiddenGem: true,
          hiddenGemReason: 'Nestled in a Portuguese colonial courtyard serving legendary Kerala-Goan slow-cooked curries.',
          whySelected: 'Award-winning hidden oasis rated 4.9 for food quality; matches user preference for culinary authenticity.',
          rating: 4.9,
          reviewCount: 2840,
          image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
          locked: false
        },
        {
          id: 'act-203',
          time: '05:00 PM',
          title: 'Chapora Fort Twilight Ramparts (Dil Chahta Hai Point)',
          category: 'sightseeing',
          location: 'Chapora Village',
          coordinates: { x: 39, y: 30, lat: 15.606, lng: 73.738 },
          duration: '1h 45m',
          cost: 0,
          crowdLevel: 65,
          isHiddenGem: false,
          whySelected: 'Completely free admission, high scenic ROI overlooking the Chapora river mouth and Morjim sandbar.',
          rating: 4.7,
          reviewCount: 4500,
          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
          locked: false
        }
      ]
    },
    {
      dayNumber: 3,
      date: '14 Dec (Day 3)',
      title: 'Hidden Gems & Latin Heritage Discovery',
      subtitle: 'Fontainhas pastel alleys, Divar ferry & river breeze',
      area: 'Panaji Latin Quarter & Mandovi River',
      locked: false,
      crowdLevel: 42,
      estimatedCost: 2600,
      activities: [
        {
          id: 'act-301',
          time: '09:00 AM',
          title: 'Fontainhas Heritage Walk & Pastel Villa Photography',
          category: 'hidden_gem',
          location: 'Panaji Old Latin Quarter',
          coordinates: { x: 48, y: 52, lat: 15.498, lng: 73.829 },
          duration: '2h 00m',
          cost: 200,
          crowdLevel: 38,
          isHiddenGem: true,
          hiddenGemReason: 'Asia’s only intact Portuguese colonial quarter with 18th-century tiled roofs and quaint balconies.',
          whySelected: 'Zero crowded beaches, pristine aesthetic appeal, highly praised by cultural explorers.',
          rating: 4.9,
          reviewCount: 2100,
          image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80',
          locked: false
        },
        {
          id: 'act-302',
          time: '11:45 AM',
          title: 'Artisan Bakery Stop at 31st January Confeitaria',
          category: 'food',
          location: 'Fontainhas Lane',
          coordinates: { x: 48, y: 53, lat: 15.497, lng: 73.830 },
          duration: '45m',
          cost: 250,
          crowdLevel: 35,
          isHiddenGem: true,
          hiddenGemReason: 'One of the oldest wood-fired bakeries in Goa, famous for warm bebinca and traditional bolo de arroz.',
          whySelected: 'Preserves 1930s recipe craftsmanship at unbeatable local price points.',
          rating: 4.8,
          reviewCount: 950,
          image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
          locked: false
        },
        {
          id: 'act-303',
          time: '02:00 PM',
          title: 'Local River Ferry to Divar Island Secret Countryside',
          category: 'hidden_gem',
          location: 'Ribandar Ferry Jetty to Divar',
          coordinates: { x: 55, y: 50, lat: 15.510, lng: 73.880 },
          duration: '2h 30m',
          cost: 150,
          crowdLevel: 22,
          isHiddenGem: true,
          hiddenGemReason: 'Completely uncommercialized island oasis reachable only by river ferry. Lush paddy fields and baroque church spires.',
          whySelected: 'Extremely peaceful contrast to northern beach commotion. 78% lower crowd density.',
          rating: 4.9,
          reviewCount: 620,
          image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
          locked: false
        },
        {
          id: 'act-304',
          time: '06:30 PM',
          title: 'Mandovi Sunset Catamaran Cruise with Live Fado',
          category: 'relax',
          location: 'Panaji Waterfront Pier',
          coordinates: { x: 47, y: 50, lat: 15.502, lng: 73.824 },
          duration: '1h 30m',
          cost: 800,
          crowdLevel: 55,
          isHiddenGem: false,
          whySelected: 'Gentle breeze, acoustic music, and panoramic sunset skyline closing out the final full evening.',
          rating: 4.6,
          reviewCount: 1650,
          image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=600&q=80',
          locked: false
        }
      ]
    },
    {
      dayNumber: 4,
      date: '15 Dec (Day 4)',
      title: 'South Goa Breeze & Smooth Departure',
      subtitle: 'Spice shopping, beach farewell & flight home',
      area: 'South Goa / Airport Transit',
      locked: false,
      crowdLevel: 45,
      estimatedCost: 1800,
      activities: [
        {
          id: 'act-401',
          time: '09:00 AM',
          title: 'Morjim or Ashwem Morning Quiet Walk & Coconut Water',
          category: 'relax',
          location: 'Ashwem Shoreline',
          coordinates: { x: 36, y: 22, lat: 15.654, lng: 73.722 },
          duration: '1h 30m',
          cost: 100,
          crowdLevel: 30,
          isHiddenGem: false,
          whySelected: 'Zero tourist crowds at early morning; gentle white sand surf perfect for quiet contemplation.',
          rating: 4.8,
          reviewCount: 890,
          image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
          locked: false
        },
        {
          id: 'act-402',
          time: '11:30 AM',
          title: 'Traditional Goan Cashew & Spice Guild Emporium',
          category: 'culture',
          location: 'Mapusa Market Perimeter',
          coordinates: { x: 45, y: 38, lat: 15.590, lng: 73.810 },
          duration: '1h 00m',
          cost: 600,
          crowdLevel: 52,
          isHiddenGem: true,
          hiddenGemReason: 'Direct co-op vendor offering single-estate feni, organic peri-peri spices, and roasted whole cashews.',
          whySelected: 'Honest pricing without tourist agency markups.',
          rating: 4.7,
          reviewCount: 740,
          image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
          locked: false
        },
        {
          id: 'act-403',
          time: '01:30 PM',
          title: 'Direct Airport EV Express Transit & Boarding',
          category: 'relax',
          location: 'Dabolim Airport Drop-off',
          coordinates: { x: 50, y: 70, lat: 15.380, lng: 73.831 },
          duration: '1h 00m',
          cost: 850,
          crowdLevel: 40,
          isHiddenGem: false,
          whySelected: 'Timed 2h 15m ahead of scheduled departure with automated flight status monitoring.',
          rating: 4.9,
          reviewCount: 310,
          image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80',
          locked: false
        }
      ]
    }
  ],
  weather: {
    temp: '29°C',
    condition: 'Sunny & Coastal Breeze',
    icon: '☀️',
    forecast: 'Ideal sea conditions for marine water sports; mild humidity at 64% with zero rainfall probability.',
    alert: 'UV index peak between 12:30 PM – 2:30 PM. Sunscreen recommended.'
  },
  locked: {
    hotel: false,
    transport: false,
    dayIds: [],
    activityIds: []
  }
};

export const sampleNegotiationTradeoffs: NegotiationTradeoff[] = [
  {
    id: 'plan-flight-budget',
    title: 'Option A: Swift Flight + Vagator Heritage Boutique',
    summary: 'The AI-recommended gold standard. Fastest travel time, maximum daylight hours, strict budget alignment.',
    totalCost: 14650,
    budgetDelta: -350,
    hotelTier: '3-Star Heritage Haven (4.6★)',
    transportMode: 'IndiGo Flight (1h 20m)',
    vibe: 'Balanced & High Energy',
    pros: ['Saves 10+ hours transit time', 'Enables full Day 1 afternoon exploration', 'Keeps ₹350 buffer'],
    cons: ['Flight luggage restricted to 15kg', 'Standard boutique room instead of luxury suite'],
    recommended: true
  },
  {
    id: 'plan-train-resort',
    title: 'Option B: Vande Bharat Express + 4-Star Beachfront Resort',
    summary: 'Trade 6 hours of travel time for a luxury 4-star stay with private beach access and breakfast feast.',
    totalCost: 13900,
    budgetDelta: -1100,
    hotelTier: '4-Star Beachfront Palms (4.8★)',
    transportMode: 'Vande Bharat Executive Train (7h 45m)',
    vibe: 'Scenic Luxury Leisure',
    pros: ['Saves ₹1,100 overall budget', 'Upgrades to 4-star infinity pool resort', 'Includes lavish breakfast buffet'],
    cons: ['Day 1 begins at 4:00 PM due to train duration', 'Less morning activity time'],
    recommended: false
  },
  {
    id: 'plan-plus-budget',
    title: 'Option C: Stretch Budget by ₹2,000 (Total ₹17,000)',
    summary: 'Unlocks VIP private scuba diving speed boat and private sunset yacht cruise without compromising hotel.',
    totalCost: 16800,
    budgetDelta: 1800,
    hotelTier: 'Casa De Vagator + Poolside Suite',
    transportMode: 'IndiGo Flight + VIP Airport Lounge',
    vibe: 'Premium Adventure VIP',
    pros: ['Private boat charter instead of group tour', 'Room upgraded to private balcony Jacuzzi', 'VIP lounge access'],
    cons: ['Requires +₹1,800 out-of-pocket budget expansion'],
    recommended: false
  }
];

export const sampleDestinations = [
  {
    id: 'goa',
    name: 'Goa',
    subtitle: 'Sun-drenched beaches, forts & vibrant nightlife',
    country: 'India',
    averageCost: '₹14,500',
    duration: '3-5 Days',
    bestSeason: 'Nov – Feb',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    tags: ['Adventure', 'Beaches', 'Nightlife', 'Food'],
    crowdIndex: 'Moderate (AI reroutes)'
  },
  {
    id: 'manali',
    name: 'Manali',
    subtitle: 'Snow-capped peaks, pine valleys & mountain passes',
    country: 'India',
    averageCost: '₹18,200',
    duration: '4-6 Days',
    bestSeason: 'Oct – May',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
    tags: ['Mountains', 'Trekking', 'Snow', 'Romantic'],
    crowdIndex: 'Low in Solang Valley'
  },
  {
    id: 'bali',
    name: 'Bali',
    subtitle: 'Emerald rice terraces, spiritual temples & coastal surf',
    country: 'Indonesia',
    averageCost: '₹45,000',
    duration: '5-7 Days',
    bestSeason: 'Apr – Oct',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    tags: ['Culture', 'Luxury', 'Surfing', 'Nature'],
    crowdIndex: 'Moderate (Ubud secret gems)'
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    subtitle: 'Futuristic neon skyline, ancient shrines & Michelin ramen',
    country: 'Japan',
    averageCost: '₹115,000',
    duration: '6-8 Days',
    bestSeason: 'Mar – May / Oct – Nov',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    tags: ['Urban', 'Food', 'Culture', 'Shopping'],
    crowdIndex: 'High (Smart subway route)'
  },
  {
    id: 'paris',
    name: 'Paris',
    subtitle: 'Haute couture, bohemian cafés & timeless architecture',
    country: 'France',
    averageCost: '₹135,000',
    duration: '5-7 Days',
    bestSeason: 'May – Sep',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    tags: ['Art', 'Romance', 'Fine Dining', 'History'],
    crowdIndex: 'High (Museum pass skip-line)'
  }
];

export const initialBadges: PassportBadge[] = [
  {
    id: 'b-01',
    title: 'Constraint Conqueror',
    icon: '⚡',
    description: 'Successfully planned a multi-day trip with zero budget overflow.',
    dateEarned: '12 Dec 2026'
  },
  {
    id: 'b-02',
    title: 'Hidden Gem Pioneer',
    icon: '💎',
    description: 'Visited 3+ local secrets recommended by the Rove AI Engine.',
    dateEarned: '13 Dec 2026'
  },
  {
    id: 'b-03',
    title: 'Crowd Dodger',
    icon: '🛡️',
    description: 'Saved over 90 minutes of queue time through live crowd redirection.',
    dateEarned: '14 Dec 2026'
  },
  {
    id: 'b-04',
    title: 'Carbon Conscious',
    icon: '🌱',
    description: 'Opted for Electric EV airport transfers saving 28kg of CO2.',
    dateEarned: '15 Dec 2026'
  }
];

export const initialStamps: PassportStamp[] = [
  {
    id: 's-01',
    destination: 'Goa Coastline',
    country: 'India',
    date: 'Dec 2026',
    days: 4,
    badge: '🌴 Coastal Explorer'
  },
  {
    id: 's-02',
    destination: 'Jaipur Pink City',
    country: 'India',
    date: 'Oct 2026',
    days: 3,
    badge: '🏰 Heritage Seeker'
  },
  {
    id: 's-03',
    destination: 'Ubud Highlands',
    country: 'Indonesia',
    date: 'Jul 2026',
    days: 6,
    badge: '🌋 Island Wanderer'
  }
];
