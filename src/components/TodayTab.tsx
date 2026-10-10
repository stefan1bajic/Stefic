import React, { useState } from 'react';
import { 
  Sparkles, 
  Clock, 
  Volume2, 
  Heart, 
  Share2, 
  Check, 
  ArrowRight, 
  BookOpen, 
  Users, 
  Compass,
  Bell,
  Search,
  Award,
  TrendingUp,
  Headphones
} from 'lucide-react';
import { 
  Philosopher, 
  PhilosophicalTerm, 
  TriviaItem, 
  Quote,
  DailyReflectionPrompt,
  JournalEntry
} from '../types/philosophy';
import { BANNER_AGORA } from '../data/philosophyData';
import { speakText } from '../utils/notifications';
import { TabType } from '../hooks/usePhilosophyStore';
import { DailyReflectionCard } from './DailyReflectionCard';

interface TodayTabProps {
  currentTrivia: TriviaItem;
  secondsRemaining: number;
  notificationsEnabled: boolean;
  onTriggerTriviaNow: () => void;
  onOpenNotifications: () => void;
  onOpenSearch?: () => void;
  onOpenQuiz?: () => void;
  quoteOfTheDay: Quote;
  favoriteQuoteIds: string[];
  onToggleFavoriteQuote: (quoteId: string) => void;
  termOfTheDay: PhilosophicalTerm;
  onSelectTerm: (term: PhilosophicalTerm) => void;
  featuredPhilosopher: Philosopher;
  onSelectPhilosopher: (philosopher: Philosopher) => void;
  onNavigateTab: (tab: TabType) => void;
  exploredPhilosophersCount?: number;
  totalPhilosophersCount?: number;
  exploredTermsCount?: number;
  totalTermsCount?: number;
  overallMastery?: number;
  dailyPrompt?: DailyReflectionPrompt;
  todayJournalEntry?: JournalEntry | null;
  totalJournalEntriesCount?: number;
  onOpenReflectionModal?: () => void;
  onShuffleReflectionPrompt?: () => void;
}

export const TodayTab: React.FC<TodayTabProps> = ({
  currentTrivia,
  secondsRemaining,
  notificationsEnabled,
  onTriggerTriviaNow,
  onOpenNotifications,
  onOpenSearch,
  onOpenQuiz,
  quoteOfTheDay,
  favoriteQuoteIds,
  onToggleFavoriteQuote,
  termOfTheDay,
  onSelectTerm,
  featuredPhilosopher,
  onSelectPhilosopher,
  onNavigateTab,
  exploredPhilosophersCount,
  totalPhilosophersCount,
  exploredTermsCount,
  totalTermsCount,
  overallMastery,
  dailyPrompt,
  todayJournalEntry,
  totalJournalEntriesCount = 0,
  onOpenReflectionModal,
  onShuffleReflectionPrompt,
}) => {
  const [copiedQuote, setCopiedQuote] = useState(false);
  const [speakingTrivia, setSpeakingTrivia] = useState(false);
  const [speakingQuote, setSpeakingQuote] = useState(false);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedCountdown = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const isQuoteFav = favoriteQuoteIds.includes(quoteOfTheDay.id);

  const handleSpeakTrivia = () => {
    setSpeakingTrivia(true);
    speakText(`${currentTrivia.title}. ${currentTrivia.content}`);
    setTimeout(() => setSpeakingTrivia(false), 5000);
  };

  const handleSpeakQuote = () => {
    setSpeakingQuote(true);
    speakText(`${quoteOfTheDay.text}. Izrekao: ${quoteOfTheDay.philosopherName}`);
    setTimeout(() => setSpeakingQuote(false), 4000);
  };

  const handleCopyQuote = () => {
    const text = `„${quoteOfTheDay.text}“ — ${quoteOfTheDay.philosopherName}`;
    navigator.clipboard.writeText(text);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Editorial Hero Visual Banner */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-stone-200 dark:border-stone-800 bg-stone-900 shadow-lg">
        <div className="relative h-44 sm:h-56 w-full">
          <img
            src={BANNER_AGORA}
            alt="Atinska agora i stubovi mermera"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center filter brightness-90"
          />
          {/* Measured Scrim for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
          
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-300">
              Dnevni portal mudrosti
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
              Razum, Vrlina i Spokoj Uma
            </h2>
            <p className="text-xs sm:text-sm text-stone-200 max-w-lg line-clamp-2">
              Dobrodošli u tvoju ličnu riznicu. Upoznaj antičke i moderne mislioce, savladaj duboke pojmove i primaj mudrost svakog sata.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Search Bar Trigger */}
      {onOpenSearch && (
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-[#15161a] shadow-xs hover:border-amber-400 transition-all text-left group cursor-pointer"
        >
          <div className="flex items-center gap-2.5 text-stone-400 group-hover:text-amber-600 transition-colors">
            <Search className="h-4 w-4" />
            <span className="text-xs sm:text-sm text-stone-600 dark:text-stone-300">
              Brza pretraga: mislioci, pojmovi, citati i zanimljivosti...
            </span>
          </div>
          <kbd className="hidden sm:inline-block rounded-md bg-stone-100 dark:bg-stone-800 px-2 py-0.5 text-[11px] font-mono text-stone-500">
            ⌘K
          </kbd>
        </button>
      )}

      {/* Daily Reflection Philosophical Journal Card */}
      {dailyPrompt && onOpenReflectionModal && (
        <DailyReflectionCard
          prompt={dailyPrompt}
          todayEntry={todayJournalEntry || null}
          totalEntriesCount={totalJournalEntriesCount}
          onOpenModal={onOpenReflectionModal}
          onShufflePrompt={onShuffleReflectionPrompt || (() => {})}
        />
      )}

      {/* Interactive Philosophy Quiz Card */}
      {onOpenQuiz && (
        <div
          onClick={onOpenQuiz}
          className="group cursor-pointer rounded-2xl border border-stone-200 bg-linear-to-r from-amber-500/10 via-white to-amber-500/5 p-4 dark:border-stone-800 dark:bg-linear-to-r dark:from-amber-950/20 dark:via-[#15161a] dark:to-stone-900 shadow-xs hover:border-amber-400 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-600 text-white shadow-xs">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Interaktivno učenje
              </span>
              <h4 className="font-editorial text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100">
                Dnevni Filozofski Izazov (Kviz Znanja)
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1">
                Testiraj svoje razumevanje stoicizma, velikih mislilaca i ključnih reči.
              </p>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-amber-700 dark:text-amber-400 group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
        </div>
      )}

      {/* Interactive Learning Progress Card */}
      <div
        onClick={() => onNavigateTab('progress')}
        className="group cursor-pointer rounded-2xl border border-stone-200 bg-linear-to-r from-amber-500/10 via-white to-stone-50 p-4 dark:border-stone-800 dark:bg-linear-to-r dark:from-amber-950/20 dark:via-[#15161a] dark:to-stone-900 shadow-xs hover:border-amber-400 transition-all flex items-center justify-between"
      >
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-600 text-white shadow-xs">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Kontrolna tabla napretka
              </span>
              {overallMastery !== undefined && (
                <span className="rounded-full bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:text-amber-300">
                  {overallMastery}% savladano
                </span>
              )}
            </div>
            <h4 className="font-editorial text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100">
              Praćenje Učenja, Rang & Grafikoni
            </h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1">
              {exploredPhilosophersCount !== undefined && totalPhilosophersCount !== undefined
                ? `Istraženo ${exploredPhilosophersCount}/${totalPhilosophersCount} mislilaca i ${exploredTermsCount || 0}/${totalTermsCount || 0} pojmova.`
                : 'Pogledaj 7-dnevni grafikon aktivnosti, otključana zvanja i preporuke.'}
            </p>
          </div>
        </div>
        <ArrowRight className="h-4 w-4 text-amber-700 dark:text-amber-400 group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
      </div>

      {/* Featured Audio Masterclass Card (Za slušalice) */}
      <div
        onClick={() => onNavigateTab('audio')}
        className="group cursor-pointer rounded-2xl border border-amber-600/30 bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950/80 p-4 text-white shadow-md hover:border-amber-500 transition-all flex items-center justify-between"
      >
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Headphones className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Audio Lekcije za Slušalice
              </span>
              <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[9px] font-semibold text-amber-300 border border-amber-500/30">
                432Hz Binaural
              </span>
            </div>
            <h4 className="font-serif text-base sm:text-lg font-bold text-white group-hover:text-amber-200 transition-colors">
              Umetnost nepokolebljivosti: Stoicizam u haosu
            </h4>
            <p className="text-xs text-stone-300 line-clamp-1">
              Stavite slušalice i poslušajte predavanje sa zvučnom atmosferom hrama i agore.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 ml-2 rounded-xl bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white group-hover:bg-amber-500 transition-colors">
          <span>Slušaj</span>
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>

      {/* Hourly Trivia Highlight Card (User's main core request!) */}
      <div className="rounded-2xl border border-amber-300/80 bg-linear-to-br from-amber-500/10 via-[#fcfbf9] to-amber-500/5 p-4 sm:p-5 dark:border-amber-700/60 dark:from-amber-950/30 dark:via-[#141518] dark:to-stone-900 shadow-sm">
        {/* Top bar with live countdown */}
        <div className="flex items-center justify-between pb-3 border-b border-amber-200/50 dark:border-amber-900/40">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-600 text-white shadow-xs">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider">
                Časovna Zanimljivost
              </span>
              <span className="text-[10px] text-stone-500 dark:text-stone-400 block">
                {currentTrivia.categoryLabel}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenNotifications}
              className="flex items-center gap-1.5 rounded-lg border border-amber-300 bg-white/80 px-2 py-1 text-xs font-mono font-medium text-amber-900 dark:border-amber-700 dark:bg-stone-900 dark:text-amber-300 tabular-nums shadow-2xs hover:bg-amber-50"
              title="Podešavanja obaveštenja"
            >
              <Clock className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
              <span>{notificationsEnabled ? formattedCountdown : 'Pauzirano'}</span>
            </button>
          </div>
        </div>

        {/* Trivia Story Content */}
        <div className="pt-3.5 space-y-2">
          <h3 className="font-editorial text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 leading-snug">
            {currentTrivia.title}
          </h3>
          <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
            {currentTrivia.content}
          </p>
          <div className="rounded-lg bg-amber-100/70 p-2.5 text-xs text-amber-950 dark:bg-amber-950/40 dark:text-amber-200 font-medium">
            💡 {currentTrivia.funFactHighlight}
          </div>
        </div>

        {/* Bottom Actions: Instant refresh & listen */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-amber-200/40 dark:border-amber-900/30">
          <button
            onClick={onTriggerTriviaNow}
            className="flex items-center gap-1.5 rounded-lg bg-amber-700 px-3 py-1.5 text-xs font-semibold text-white shadow-2xs hover:bg-amber-800 transition-colors"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Pošalji mi novu zanimljivost odmah!</span>
          </button>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleSpeakTrivia}
              className={`flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-100 dark:border-stone-800 dark:text-stone-300 dark:hover:bg-stone-800 ${
                speakingTrivia ? 'text-amber-600 border-amber-500' : ''
              }`}
              title="Pročitaj naglas"
            >
              <Volume2 className="h-4 w-4" />
            </button>
            <button
              onClick={onOpenNotifications}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-100 dark:border-stone-800 dark:text-stone-300 dark:hover:bg-stone-800"
              title="Podešavanja učestalosti"
            >
              <Bell className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quote of the Day Card */}
      <div className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-[#15161a] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            Dnevna misao za promišljanje
          </span>
          <span className="text-xs text-stone-400">
            {quoteOfTheDay.philosopherName}
          </span>
        </div>

        <p className="font-editorial text-lg sm:text-xl italic text-stone-900 dark:text-stone-100 leading-relaxed">
          „{quoteOfTheDay.text}“
        </p>

        {quoteOfTheDay.context && (
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Izvor: {quoteOfTheDay.context}
          </p>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800/60">
          <button
            onClick={() => onToggleFavoriteQuote(quoteOfTheDay.id)}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
              isQuoteFav
                ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400'
                : 'text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            <Heart
              className={`h-4 w-4 ${isQuoteFav ? 'fill-rose-600 text-rose-600 dark:fill-rose-400 dark:text-rose-400' : ''}`}
            />
            <span>{isQuoteFav ? 'Omiljeno' : 'Sačuvaj citat'}</span>
          </button>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleSpeakQuote}
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 ${
                speakingQuote ? 'text-amber-600' : ''
              }`}
              title="Poslušaj citat"
            >
              <Volume2 className="h-4 w-4" />
            </button>
            <button
              onClick={handleCopyQuote}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800"
              title="Kopiraj"
            >
              {copiedQuote ? <Check className="h-4 w-4 text-emerald-600" /> : <Share2 className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Featured Philosopher & Term of the Day */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Featured Philosopher Card */}
        <div
          onClick={() => onSelectPhilosopher(featuredPhilosopher)}
          className="group cursor-pointer rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-[#15161a] shadow-xs hover:border-amber-400/80 dark:hover:border-amber-600/60 transition-colors"
        >
          <div className="flex items-start gap-3.5">
            <div className="h-16 w-16 shrink-0 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-900">
              <img
                src={featuredPhilosopher.portraitUrl}
                alt={featuredPhilosopher.name}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Mislilac u fokusu
              </span>
              <h4 className="font-editorial text-lg font-bold text-stone-900 dark:text-stone-100 truncate">
                {featuredPhilosopher.name}
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                {featuredPhilosopher.lifeDates} · {featuredPhilosopher.school}
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs text-stone-600 dark:text-stone-300 line-clamp-2">
            {featuredPhilosopher.summary}
          </p>
          <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-amber-700 dark:text-amber-400 group-hover:translate-x-0.5 transition-transform">
            <span>Pogledaj profil i učenje</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </div>

        {/* Term of the Day Card */}
        <div
          onClick={() => onSelectTerm(termOfTheDay)}
          className="group cursor-pointer rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-[#15161a] shadow-xs hover:border-amber-400/80 dark:hover:border-amber-600/60 transition-colors flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Pojam dana iz rečnika
              </span>
              <BookOpen className="h-4 w-4 text-stone-400" />
            </div>
            <h4 className="font-editorial text-lg font-bold text-stone-900 dark:text-stone-100 mt-1">
              {termOfTheDay.term}
            </h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-serif italic">
              {termOfTheDay.greekOrLatin}
            </p>
            <p className="mt-2 text-xs text-stone-600 dark:text-stone-300 line-clamp-2">
              {termOfTheDay.shortDefinition}
            </p>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-amber-700 dark:text-amber-400 group-hover:translate-x-0.5 transition-transform pt-2 border-t border-stone-100 dark:border-stone-800">
            <span>Saznaj šta znači u običnom životu</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>

      {/* Quick Navigation Short-cuts */}
      <div className="rounded-2xl border border-stone-200 bg-stone-50/60 p-4 dark:border-stone-800 dark:bg-stone-900/30">
        <span className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
          Istraži po sekcijama
        </span>
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-6 gap-2">
          <button
            onClick={() => onNavigateTab('philosophers')}
            className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white p-3 text-left hover:border-amber-500 dark:border-stone-800 dark:bg-[#15161a] transition-colors"
          >
            <Users className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <div>
              <span className="text-xs font-bold text-stone-900 dark:text-stone-100 block">Filozofi</span>
              <span className="text-[10px] text-stone-500">Mislioci i škole</span>
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('audio')}
            className="flex items-center gap-2 rounded-xl border border-amber-300/80 bg-amber-50/50 p-3 text-left hover:border-amber-500 dark:border-amber-900/40 dark:bg-amber-950/20 transition-colors"
          >
            <Headphones className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <div>
              <span className="text-xs font-bold text-stone-900 dark:text-stone-100 block">Audio Lekcije</span>
              <span className="text-[10px] text-amber-700 dark:text-amber-400 font-medium">Za slušalice 🎧</span>
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('glossary')}
            className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white p-3 text-left hover:border-amber-500 dark:border-stone-800 dark:bg-[#15161a] transition-colors"
          >
            <BookOpen className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <div>
              <span className="text-xs font-bold text-stone-900 dark:text-stone-100 block">Pojmovnik</span>
              <span className="text-[10px] text-stone-500">Objašnjenja reči</span>
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('trivia')}
            className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white p-3 text-left hover:border-amber-500 dark:border-stone-800 dark:bg-[#15161a] transition-colors"
          >
            <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <div>
              <span className="text-xs font-bold text-stone-900 dark:text-stone-100 block">Zanimljivosti</span>
              <span className="text-[10px] text-stone-500">Anegdote i tajne</span>
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('progress')}
            className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white p-3 text-left hover:border-amber-500 dark:border-stone-800 dark:bg-[#15161a] transition-colors"
          >
            <TrendingUp className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <div>
              <span className="text-xs font-bold text-stone-900 dark:text-stone-100 block">Napredak</span>
              <span className="text-[10px] text-stone-500">Grafici i rang</span>
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('favorites')}
            className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white p-3 text-left hover:border-amber-500 dark:border-stone-800 dark:bg-[#15161a] transition-colors"
          >
            <Compass className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <div>
              <span className="text-xs font-bold text-stone-900 dark:text-stone-100 block">Tvoje Teme</span>
              <span className="text-[10px] text-stone-500">Omiljeni citati</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
