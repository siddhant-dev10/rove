'use client';

import React from 'react';
import { MessageSquare, User } from 'lucide-react';

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
      icon: User,
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
      className="fixed bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300"
      aria-label="Trip Dock Navigation"
    >
      <nav
        className="pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-full bg-stone-900/92 text-stone-200 backdrop-blur-xl border border-stone-800/90 shadow-2xl shadow-stone-950/40 ring-1 ring-white/10"
        role="tablist"
      >
        {dockItems.map(({ id, label, icon: Icon, badge }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onTabChange(id)}
              className={`relative flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs font-medium transition-all duration-200 select-none ${
                isActive
                  ? 'bg-white text-stone-900 shadow-md font-semibold scale-[1.02]'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800/80 active:scale-95'
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
                  className={`w-4 h-4 transition-transform ${
                    isActive ? 'text-stone-900 stroke-[2.2]' : 'text-stone-400 stroke-[1.8]'
                  }`}
                />
              )}
              <span className="tracking-tight">{label}</span>

              {badge && !isActive && (
                <span className="flex items-center justify-center px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {badge}
                </span>
              )}

              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-stone-900 animate-pulse ml-0.5" />
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
