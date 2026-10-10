'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { RoveProvider, useRove } from '@/context/RoveContext';
import { BookingSummaryModal } from '@/components/BookingSummaryModal';
import { CrowdIntelligence } from '@/components/CrowdIntelligence';
import { GuidedDemoTour } from '@/components/GuidedDemoTour';
import { InteractiveMap } from '@/components/InteractiveMap';
import { ItineraryTimeline } from '@/components/ItineraryTimeline';
import { MultiPlanComparison } from '@/components/MultiPlanComparison';
import { PackingChecklistModal } from '@/components/PackingChecklistModal';
import { PopularDestinations } from '@/components/PopularDestinations';
import { RovePassportModal } from '@/components/RovePassportModal';
import { RoveWalletModal } from '@/components/RoveWalletModal';
import { TripDNACard } from '@/components/TripDNACard';
import { TripReplayModal } from '@/components/TripReplayModal';
import { TravelConciergeModal } from '@/components/TravelConciergeModal';
import { WhatIfSimulator } from '@/components/WhatIfSimulator';
import { BudgetIntelligence } from '@/components/BudgetIntelligence';
import { BudgetEditorModal } from '@/components/BudgetEditorModal';
import { DockMenu, DockTab } from '@/components/DockMenu';
import { ProfileSection } from '@/components/ProfileSection';
import { ChatSection } from '@/components/ChatSection';
import { AboutSection } from '@/components/AboutSection';
import { HeroSlideshow } from '@/components/HeroSlideshow';
import {
  ArrowUpRight, CalendarDays, Check, ChevronRight, Compass, CreditCard,
  Map, Menu, MessageCircle, MoreHorizontal, Navigation,
  Sparkles, Wallet, X, LockKeyhole, User, Pencil,
} from 'lucide-react';

type WorkspaceView = 'overview' | 'itinerary' | 'map' | 'budget';

const navItems: { id: WorkspaceView; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: 'Overview', icon: Compass },
  { id: 'itinerary', label: 'Itinerary', icon: CalendarDays },
  { id: 'map', label: 'Map & quiet spots', icon: Map },
  { id: 'budget', label: 'Budget', icon: Wallet },
];

function RoveWorkspace() {
  const {
    trip,
    isTravelModeActive, setIsTravelModeActive,
    setIsBookingOpen, setIsConciergeOpen, setIsDemoTourOpen,
    toggleLockHotel, reoptimizeTrip, setIsBudgetEditorOpen,
  } = useRove();

  // Bottom dock active tab: 'home' | 'profile' | 'chat'
  const [dockTab, setDockTab] = useState<DockTab>('home');
  const [view, setView] = useState<WorkspaceView>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const formattedBudget = useMemo(() => `₹${trip.budget.plannedCost.toLocaleString('en-IN')}`, [trip.budget.plannedCost]);

  const goToView = (nextView: WorkspaceView) => {
    setDockTab('home');
    setView(nextView);
    setMobileMenuOpen(false);
  };

  const handleDockTabChange = (tab: DockTab) => {
    setDockTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-stone-900 flex flex-col justify-between">
      {/* PERSISTENT HEADER */}
      <header className="site-header">
        <div className="site-header-inner">
          <button
            className="brand"
            onClick={() => handleDockTabChange('home')}
            aria-label="Rove home"
          >
            <img className="brand-logo rove-logo-image" src="rove-logo-header.png" alt="Rove — Move Less, Feel More" />
          </button>

          <div className="header-actions">
            <Link href="/auth" className="header-icon-button hide-mobile" title="Log in or sign up" aria-label="Log in or sign up">
              <User size={17} />
            </Link>

            <button
              className={isTravelModeActive ? 'live-button active' : 'live-button'}
              onClick={() => setIsTravelModeActive(!isTravelModeActive)}
            >
              <span className="live-dot" /> {isTravelModeActive ? 'On trip' : 'Live mode'}
            </button>

            <button
              className="reserve-button hide-mobile"
              onClick={() => setIsBookingOpen(true)}
            >
              Review & reserve <ArrowUpRight size={15} />
            </button>

            <button
              className="header-icon-button mobile-only"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open navigation"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-nav">
            <button
              className="mobile-nav-link"
              onClick={() => {
                setMobileMenuOpen(false);
                handleDockTabChange('profile');
              }}
            >
              <User size={16} /> Traveler Profile & Credits
            </button>
            <button
              className="mobile-nav-link"
              onClick={() => {
                setMobileMenuOpen(false);
                handleDockTabChange('chat');
              }}
            >
              <MessageCircle size={16} /> AI Chat Assistant
            </button>
            <Link href="/auth" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              <User size={16} /> Log in / Sign up
            </Link>
            <button
              className="mobile-nav-link"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsBookingOpen(true);
              }}
            >
              <CreditCard size={16} /> Review & reserve
            </button>
          </div>
        )}
      </header>

      {/* TRAVEL MODE STRIP */}
      {isTravelModeActive && (
        <div className="live-strip">
          <div className="live-strip-inner">
            <div className="live-strip-title">
              <span className="live-dot" /> Active travel mode
            </div>
            <span>Next: Fort Aguada · 11:30 AM</span>
            <span>29°C · Clear</span>
            <span>EV Sedan · 15 min away</span>
            <button onClick={() => setIsConciergeOpen(true)}>
              Need help? <ArrowUpRight size={13} />
            </button>
          </div>
        </div>
      )}

      {/* DYNAMIC SECTION EMERGING BASED ON DOCK SELECTION */}
      <main className="flex-1">
        {/* 1. HOME SECTION */}
        {dockTab === 'home' && (
          <div className="animate-in fade-in duration-300">
            <HeroSlideshow />

            <section className="workspace-shell">
              <div className="workspace-topline">
                <div>
                  <div className="eyebrow">
                    <span className="eyebrow-dot" />{' '}
                    {view === 'overview'
                      ? 'A considered plan'
                      : view === 'itinerary'
                      ? 'Your days, in order'
                      : view === 'map'
                      ? 'Move less, feel more'
                      : 'Every rupee, visible'}
                  </div>
                  <h2>
                    {view === 'overview'
                      ? 'A good trip leaves room for the unexpected.'
                      : view === 'itinerary'
                      ? `Your ${trip.destination.split(',')[0]} days`
                      : view === 'map'
                      ? `The quiet route through ${trip.destination.split(',')[0]}`
                      : 'A plan that respects your limit.'}
                  </h2>
                </div>
                <div className="topline-actions">
                  <button
                    className="quiet-button hide-mobile"
                    onClick={() => setIsDemoTourOpen(true)}
                  >
                    <Sparkles size={15} /> See how Rove thinks
                  </button>
                  <button className="more-button" aria-label="More trip actions">
                    <MoreHorizontal size={19} />
                  </button>
                </div>
              </div>

              <div className="workspace-tabs" role="tablist" aria-label="Trip sections">
                {navItems.map(({ id, label, icon: Icon }) => (
                  <button
                    role="tab"
                    aria-selected={view === id}
                    key={id}
                    onClick={() => goToView(id)}
                    className={view === id ? 'workspace-tab active' : 'workspace-tab'}
                  >
                    <Icon size={15} /> {label}
                  </button>
                ))}
              </div>

              {view === 'overview' && (
                <div className="overview-grid">
                  <div className="main-column">
                    <div className="overview-card next-card">
                      <div className="card-kicker">
                        <span className="status-dot" /> Next up · Today
                      </div>
                      <div className="next-card-body">
                        <div>
                          <div className="time-label">11:30 AM <span>· 1h 30m</span></div>
                          <h3>Fort Aguada Ramparts & 17th Century Lighthouse</h3>
                          <p>Sinquerim <span>·</span> 4.5 ★ <span>·</span> 74% capacity</p>
                        </div>
                        <button
                          className="small-arrow"
                          onClick={() => goToView('itinerary')}
                          aria-label="Open itinerary"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>
                      <div className="next-card-footer">
                        <span><Navigation size={14} /> 18 min from Casa De Vagator</span>
                        <span className="success-note"><Check size={14} /> Route optimized</span>
                      </div>
                    </div>

                    <div className="overview-card stay-card">
                      <div className="card-heading-row">
                        <div>
                          <div className="card-kicker">Your anchor</div>
                          <h3>Casa De Vagator</h3>
                        </div>
                        <button
                          className={trip.locked.hotel ? 'lock-chip active' : 'lock-chip'}
                          onClick={toggleLockHotel}
                        >
                          <LockKeyhole size={14} /> {trip.locked.hotel ? 'Locked' : 'Protect stay'}
                        </button>
                      </div>
                      <div className="stay-content">
                        <img src={trip.hotel.image} alt={trip.hotel.name} />
                        <div className="stay-details">
                          <p className="stay-location">{trip.hotel.location} <span>·</span> {trip.hotel.rating} ★</p>
                          <h4>{trip.hotel.name}</h4>
                          <p>{trip.hotel.distanceToHighlights}. A quiet base for the coast, with breakfast and a poolside pause when you need it.</p>
                          <div className="stay-tags">
                            {trip.hotel.amenities.slice(0, 3).map((amenity) => (
                              <span key={amenity}>{amenity}</span>
                            ))}
                          </div>
                        </div>
                        <div className="stay-price">
                          <strong>₹{trip.hotel.totalCost.toLocaleString('en-IN')}</strong>
                          <span>{trip.hotel.nights} nights</span>
                        </div>
                      </div>
                    </div>

                    <div className="overview-card decision-card">
                      <div className="card-heading-row">
                        <div>
                          <div className="card-kicker">Rove made three decisions for you</div>
                          <h3>Why this plan works</h3>
                        </div>
                        <Sparkles size={17} className="muted-icon" />
                      </div>
                      <div className="decision-list">
                        <div>
                          <span>01</span>
                          <p>
                            {trip.destination.includes('Ladakh') ? (
                              <><strong>Acclimatization first.</strong> Day 1 is dedicated to gentle rest in Leh before ascending Khardung La.</>
                            ) : trip.destination.includes('Bali') ? (
                              <><strong>Split-hub stay.</strong> Ubud jungle highlands first, then Uluwatu cliffs to avoid island traffic.</>
                            ) : (
                              <><strong>North Goa first.</strong> Your first two days stay close to the coast, saving 32 km of backtracking.</>
                            )}
                          </p>
                        </div>
                        <div>
                          <span>02</span>
                          <p><strong>One protected stay.</strong> {trip.hotel.name} is locked, so optimization never touches your anchor.</p>
                        </div>
                        <div>
                          <span>03</span>
                          <p><strong>A little room left.</strong> ₹{trip.budget.remaining.toLocaleString('en-IN')} stays available for a spontaneous yes.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <aside className="side-column">
                    <div className="overview-card budget-card">
                      <div className="card-heading-row">
                        <div>
                          <div className="card-kicker">Trip budget</div>
                          <h3>{formattedBudget} <span>/ ₹{trip.budget.totalBudget.toLocaleString('en-IN')}</span></h3>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setIsBudgetEditorOpen(true)}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-700 bg-stone-100 hover:bg-stone-900 hover:text-white px-2.5 py-1 rounded-full transition cursor-pointer"
                            title="Edit budget cap and allocations"
                          >
                            <Pencil size={11} /> Edit
                          </button>
                          <Wallet size={18} className="muted-icon" />
                        </div>
                      </div>
                      <div className="budget-meter">
                        <span style={{ width: `${Math.min(100, (trip.budget.plannedCost / (trip.budget.totalBudget || 1)) * 100)}%` }} />
                      </div>
                      <div className="budget-foot">
                        <span>{Math.round((trip.budget.plannedCost / (trip.budget.totalBudget || 1)) * 100)}% committed</span>
                        <strong>₹{trip.budget.remaining.toLocaleString('en-IN')} left</strong>
                      </div>
                      <div className="flex items-center justify-between mt-5 pt-3 border-t border-stone-200/60">
                        <button className="text-link !mt-0" onClick={() => goToView('budget')}>
                          Open budget <ArrowUpRight size={14} />
                        </button>
                        <button
                          onClick={() => setIsBudgetEditorOpen(true)}
                          className="text-[11px] font-semibold text-stone-700 hover:text-stone-950 flex items-center gap-1 underline underline-offset-2 cursor-pointer"
                        >
                          <Pencil size={11} /> Edit numbers
                        </button>
                      </div>
                    </div>

                    <div className="overview-card score-card">
                      <div className="card-kicker">Trip score</div>
                      <div className="score-row">
                        <div className="score-number">{trip.score.overall}</div>
                        <div><span>/100</span><p>Balanced, unhurried, within range.</p></div>
                      </div>
                      <div className="score-bars">
                        <span style={{ width: `${trip.score.budgetEfficiency}%` }} />
                        <span style={{ width: `${trip.score.travelEfficiency}%` }} />
                        <span style={{ width: `${trip.score.experienceQuality}%` }} />
                      </div>
                      <div className="score-labels">
                        <span>Budget</span>
                        <span>Transit</span>
                        <span>Experience</span>
                      </div>
                    </div>

                    <div className="overview-card action-card">
                      <div className="card-kicker">Make it yours</div>
                      <h3>Need a different rhythm?</h3>
                      <p>Ask Rove to make this trip cheaper, calmer, or more local.</p>
                      <button className="dark-button" onClick={() => handleDockTabChange('chat')}>
                        Talk to your assistant <MessageCircle size={15} />
                      </button>
                      <button className="outline-button" onClick={() => reoptimizeTrip(2000)}>
                        Find ₹2,000 to save <ArrowUpRight size={15} />
                      </button>
                    </div>
                  </aside>
                </div>
              )}

              {view === 'itinerary' && <div className="workspace-panel"><ItineraryTimeline /></div>}
              {view === 'map' && <div className="workspace-panel map-panel"><InteractiveMap /><CrowdIntelligence /></div>}
              {view === 'budget' && <div className="workspace-panel budget-panel"><BudgetIntelligence /><TripDNACard /><WhatIfSimulator /><MultiPlanComparison /></div>}

              {view === 'overview' && (
                <div className="discovery-section">
                  <div className="discovery-heading">
                    <div>
                      <div className="eyebrow"><span className="eyebrow-dot" /> For the next time</div>
                      <h2>More places worth taking slowly.</h2>
                    </div>
                    <button
                      className="text-link"
                      onClick={() => document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Explore all <ArrowUpRight size={14} />
                    </button>
                  </div>
                  <div id="discover">
                    <PopularDestinations />
                  </div>
                </div>
              )}
            </section>

            {/* DEDICATED ABOUT SECTION AT THE VERY BOTTOM OF HOME */}
          <AboutSection />

        </div>
        )}

        {/* 2. PROFILE SECTION */}
        {dockTab === 'profile' && (
          <div>
            <ProfileSection />
            <AboutSection />
          </div>
        )}

        {/* 3. CHAT SECTION */}
        {dockTab === 'chat' && (
          <div>
            <ChatSection />
          </div>
        )}
      </main>

      {/* FLOATING DOCK MENU AT THE BOTTOM */}
      <DockMenu activeTab={dockTab} onTabChange={handleDockTabChange} />

      {/* MODALS */}
      <BookingSummaryModal />
      <RoveWalletModal />
      <RovePassportModal />
      <PackingChecklistModal />
      <GuidedDemoTour />
      <TripReplayModal />
      <TravelConciergeModal />
      <BudgetEditorModal />
    </div>
  );
}

export default function Home() {
  return (
    <RoveProvider>
      <RoveWorkspace />
    </RoveProvider>
  );
}
