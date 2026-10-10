import React from 'react';
import { Compass, Users, BookMarked, Sparkles, Heart, TrendingUp, Headphones } from 'lucide-react';
import { TabType } from '../hooks/usePhilosophyStore';

interface MobileBottomNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  favoritesCount: number;
  isPlayingAudio?: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onSelectTab,
  favoritesCount,
  isPlayingAudio = false,
}) => {
  const tabs = [
    { id: 'today' as TabType, label: 'Danas', icon: Compass },
    { id: 'philosophers' as TabType, label: 'Filozofi', icon: Users },
    {
      id: 'audio' as TabType,
      label: 'Lekcije',
      icon: Headphones,
      isPulsing: isPlayingAudio,
    },
    { id: 'glossary' as TabType, label: 'Pojmovnik', icon: BookMarked },
    { id: 'trivia' as TabType, label: 'Zanimljivo', icon: Sparkles },
    { id: 'progress' as TabType, label: 'Napredak', icon: TrendingUp },
    { id: 'favorites' as TabType, label: 'Omiljeno', icon: Heart, badge: favoritesCount },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-stone-200/80 bg-[#fcfbf9]/95 backdrop-blur-lg dark:border-stone-800/80 dark:bg-[#0f1013]/95 pb-safe">
      <div className="mx-auto grid max-w-xl grid-cols-7 items-center h-16 px-0.5 sm:px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`relative flex min-h-[48px] flex-col items-center justify-center rounded-xl py-1 transition-colors ${
                isActive
                  ? 'text-amber-700 dark:text-amber-400 font-semibold'
                  : 'text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 font-medium'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`h-5 w-5 transition-transform duration-150 ${
                    isActive ? 'scale-110 stroke-[2.2]' : 'stroke-[1.8]'
                  } ${tab.isPulsing ? 'text-amber-600 animate-pulse' : ''}`}
                />
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-amber-600 px-1 text-[10px] font-bold text-white tabular-nums">
                    {tab.badge}
                  </span>
                )}
                {tab.isPulsing && (
                  <span className="absolute -top-1 -right-1 flex h-2 w-2 rounded-full bg-amber-500 animate-ping" />
                )}
              </div>
              <span className="mt-1 text-[9px] sm:text-[10px] tracking-tight leading-none truncate max-w-[46px]">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
