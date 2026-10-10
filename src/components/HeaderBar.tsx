import React from 'react';
import { Bell, Moon, Sun, Download, Sparkles, Search, Award, TrendingUp, Feather, Headphones } from 'lucide-react';

interface HeaderBarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenNotifications: () => void;
  onOpenSearch: () => void;
  onOpenQuiz: () => void;
  onOpenProgress?: () => void;
  onOpenReflection?: () => void;
  onOpenAudio?: () => void;
  isPlayingAudio?: boolean;
  hasWrittenToday?: boolean;
  activeTab?: string;
  notificationsEnabled: boolean;
  browserPermission: NotificationPermission;
  onInstallClick: () => void;
  isInstallable: boolean;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  darkMode,
  onToggleDarkMode,
  onOpenNotifications,
  onOpenSearch,
  onOpenQuiz,
  onOpenProgress,
  onOpenReflection,
  onOpenAudio,
  isPlayingAudio,
  hasWrittenToday,
  activeTab,
  notificationsEnabled,
  browserPermission,
  onInstallClick,
  isInstallable,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-stone-200/80 bg-[#fcfbf9]/90 backdrop-blur-md dark:border-stone-800/80 dark:bg-[#0f1013]/90">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-3 sm:px-6">
        {/* Brand Zone */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-600/10 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h1 className="font-editorial text-lg font-bold tracking-wider text-stone-900 dark:text-stone-100 sm:text-xl">
              FILOZOFIA
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {/* Global Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex h-10 items-center gap-1.5 rounded-lg px-2 sm:px-2.5 text-xs font-medium text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800 transition-colors"
            title="Pretraži celu aplikaciju (Ctrl+K)"
            aria-label="Pretraga"
          >
            <Search className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <span className="hidden sm:inline">Pretraži</span>
            <kbd className="hidden md:inline rounded bg-stone-200/60 dark:bg-stone-800 px-1.5 py-0.5 text-[10px] text-stone-500">
              ⌘K
            </kbd>
          </button>

          {/* Daily Reflection Journal Quick Trigger */}
          {onOpenReflection && (
            <button
              onClick={onOpenReflection}
              className="relative flex h-10 items-center gap-1 rounded-lg px-2 sm:px-2.5 text-xs font-medium text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800 transition-colors"
              title="Dnevna filozofska refleksija i lični dnevnik"
              aria-label="Dnevnik"
            >
              <Feather className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <span className="hidden sm:inline">Dnevnik</span>
              {hasWrittenToday && (
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              )}
            </button>
          )}

          {/* Audio Lessons Quick Trigger */}
          {onOpenAudio && (
            <button
              onClick={onOpenAudio}
              className={`relative flex h-10 items-center gap-1 rounded-lg px-2 sm:px-2.5 text-xs font-medium transition-colors ${
                activeTab === 'audio'
                  ? 'bg-amber-500/15 text-amber-800 dark:text-amber-300 font-bold'
                  : 'text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800'
              }`}
              title="Filozofska audio predavanja za slušalice"
              aria-label="Audio Lekcije"
            >
              <Headphones
                className={`h-4 w-4 ${
                  isPlayingAudio
                    ? 'text-amber-500 animate-pulse'
                    : 'text-amber-600 dark:text-amber-400'
                }`}
              />
              <span className="hidden sm:inline">Lekcije</span>
              {isPlayingAudio && (
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping" />
              )}
            </button>
          )}

          {/* Learning Progress Quick Button */}
          {onOpenProgress && (
            <button
              onClick={onOpenProgress}
              className={`flex h-10 items-center gap-1 rounded-lg px-2 sm:px-2.5 text-xs font-medium transition-colors ${
                activeTab === 'progress'
                  ? 'bg-amber-500/15 text-amber-800 dark:text-amber-300 font-bold'
                  : 'text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800'
              }`}
              title="Tvoj napredak učenja i rang"
              aria-label="Napredak"
            >
              <TrendingUp className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <span className="hidden sm:inline">Napredak</span>
            </button>
          )}

          {/* Philosophy Quiz Challenge */}
          <button
            onClick={onOpenQuiz}
            className="flex h-10 items-center gap-1 rounded-lg px-2 sm:px-2.5 text-xs font-medium text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800 transition-colors"
            title="Filozofski kviz znanja"
            aria-label="Kviz"
          >
            <Award className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <span className="hidden sm:inline">Kviz</span>
          </button>

          {/* In-app install button if available */}
          {isInstallable && (
            <button
              onClick={onInstallClick}
              className="flex h-10 items-center gap-1.5 rounded-lg px-2 text-xs font-medium text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800 transition-colors"
              title="Instaliraj na telefon"
            >
              <Download className="h-4 w-4" />
            </button>
          )}

          {/* Notification hourly reminder button */}
          <button
            onClick={onOpenNotifications}
            className={`relative flex h-10 w-10 items-center justify-center rounded-lg text-stone-700 transition-colors hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800`}
            title="Podešavanje časovnih zanimljivosti"
            aria-label="Obaveštenja"
          >
            <Bell className="h-5 w-5" />
            {notificationsEnabled && browserPermission === 'granted' && (
              <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-amber-500" />
            )}
          </button>

          {/* Dark / Light Mode */}
          <button
            onClick={onToggleDarkMode}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-stone-700 transition-colors hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800"
            title={darkMode ? 'Prebaci na svetlu temu' : 'Prebaci na tamnu temu'}
            aria-label="Prebaci temu"
          >
            {darkMode ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-stone-700" />}
          </button>
        </div>
      </div>
    </header>
  );
};
