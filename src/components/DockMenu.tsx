'use client';

import React from 'react';
import { MessageSquare, User, Compass } from 'lucide-react';

export type DockTab = 'home' | 'profile' | 'chat';

interface DockMenuProps {
  activeTab: DockTab;
  onTabChange: (tab: DockTab) => void;
  unreadCount?: number;
}

export const DockMenu: React.FC<DockMenuProps> = ({
  activeTab,
  onTabChange,
}) => {
  const dockItems: { id: DockTab; label: string; icon: React.ElementType; badge?: string }[] = [
    {
      id: 'home',
      label: 'Home',
      icon: Compass,
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
    },
    {
      id: 'chat',
      label: 'Assistant',
      icon: MessageSquare,
      badge: 'AI',
    },
  ];

  return (
    <aside
      className="fixed bottom-3.5 sm:bottom-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300"
      aria-label="Trip Dock Navigation"
    >
      <nav
        className="pointer-events-auto flex items-center gap-1 p-1 rounded-full bg-stone-900/90 text-stone-200 backdrop-blur-md border border-stone-800/80 shadow-lg shadow-stone-950/30 ring-1 ring-white/10"
        role="tablist"
      >
        {dockItems.map(({ id, label, icon: Icon, badge }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              role="tab"
              aria-selected={isActive}
              aria-label={`Switch to ${label} tab`}
              onClick={() => onTabChange(id)}
              className={`relative flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-medium transition-all duration-200 select-none touch-manipulation cursor-pointer ${
                isActive
                  ? 'bg-white text-stone-900 shadow-sm font-semibold scale-[1.02]'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800/70 active:scale-95'
              }`}
            >
              {id === 'home' ? (
                <img
                  src={isActive ? "rove-logo.png" : "rove-logo-dark-mode.png"}
                  alt="Home"
                  className="h-4 w-4 object-contain"
                />
              ) : (
                <Icon
                  className={`w-3.5 h-3.5 transition-transform ${
                    isActive ? 'text-stone-900 stroke-[2.2]' : 'text-stone-400 stroke-[1.8]'
                  }`}
                />
              )}
              <span className="tracking-tight">{label}</span>

              {badge && !isActive && (
                <span className="flex items-center justify-center px-1.5 py-0.2 rounded-full text-[8px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {badge}
                </span>
              )}

              {isActive && (
                <span className="w-1 h-1 rounded-full bg-stone-900 animate-pulse ml-0.5" />
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
