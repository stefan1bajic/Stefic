import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Search, 
  X, 
  Clock, 
  Volume2, 
  Share2, 
  Check, 
  Bell, 
  Settings,
  ArrowRight
} from 'lucide-react';
import { TriviaItem, TriviaCategory } from '../types/philosophy';
import { TRIVIA_CATEGORIES } from '../data/philosophyData';
import { speakText } from '../utils/notifications';

interface TriviaTabProps {
  triviaItems: TriviaItem[];
  secondsRemaining: number;
  notificationsEnabled: boolean;
  intervalMinutes: number;
  onSelectInterval: (mins: number) => void;
  onToggleEnabled: () => void;
  onTriggerNow: () => void;
  onOpenNotificationModal: () => void;
  onSelectPhilosopherById?: (id: string) => void;
}

export const TriviaTab: React.FC<TriviaTabProps> = ({
  triviaItems,
  secondsRemaining,
  notificationsEnabled,
  intervalMinutes,
  onSelectInterval,
  onToggleEnabled,
  onTriggerNow,
  onOpenNotificationModal,
  onSelectPhilosopherById,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TriviaCategory | 'all'>('all');
  const [speakingTriviaId, setSpeakingTriviaId] = useState<string | null>(null);
  const [copiedTriviaId, setCopiedTriviaId] = useState<string | null>(null);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedCountdown = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const filteredTrivia = useMemo(() => {
    return triviaItems.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.philosopherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.funFactHighlight.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCategory === 'all' || item.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [triviaItems, searchQuery, selectedCategory]);

  const handleSpeak = (item: TriviaItem) => {
    setSpeakingTriviaId(item.id);
    speakText(`${item.title}. ${item.content}`);
    setTimeout(() => setSpeakingTriviaId(null), 5000);
  };

  const handleShare = (item: TriviaItem) => {
    const text = `🏛️ ${item.title}\n\n${item.content}\n\n— Aplikacija Filozofia`;
    if (navigator.share) {
      navigator.share({ title: item.title, text: text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setCopiedTriviaId(item.id);
      setTimeout(() => setCopiedTriviaId(null), 2000);
    }
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Title */}
      <div>
        <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
          Zanimljivosti i Anegdote
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
          Bizarni trenuci, istorijski susreti i anegdote iz stvarnog života velikih mislilaca.
        </p>
      </div>

      {/* Hourly Notification Quick Controller Box */}
      <div className="rounded-2xl border border-amber-300/80 bg-linear-to-r from-amber-500/10 via-[#fcfbf9] to-amber-500/5 p-4 sm:p-5 dark:border-amber-800/60 dark:from-amber-950/20 dark:via-[#141518] dark:to-stone-900 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-amber-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200">
                Slanje zanimljivosti svakog sata
              </span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-300">
              Sledeća automatska priča stiže za:{' '}
              <span className="font-mono font-bold text-amber-700 dark:text-amber-400 tabular-nums">
                {notificationsEnabled ? formattedCountdown : 'Pauzirano'}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onTriggerNow}
              className="flex items-center gap-1.5 rounded-lg bg-amber-700 px-3 py-1.5 text-xs font-semibold text-white shadow-2xs hover:bg-amber-800 transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Pošalji odmah</span>
            </button>
            <button
              onClick={onOpenNotificationModal}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-200 bg-white text-stone-700 hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300"
              title="Podešavanja obaveštenja"
            >
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Quick interval switcher pills */}
        <div className="mt-3.5 flex flex-wrap items-center gap-1.5 pt-3 border-t border-amber-200/50 dark:border-amber-900/40 text-xs">
          <span className="text-stone-500 text-[11px] mr-1">Interval:</span>
          {[
            { label: '60 min (standard)', val: 60 },
            { label: '30 min', val: 30 },
            { label: '5 min', val: 5 },
            { label: '30 sek (demo)', val: 0.5 },
          ].map((item) => (
            <button
              key={item.val}
              onClick={() => onSelectInterval(item.val)}
              className={`rounded-md px-2 py-0.5 text-[11px] transition-colors ${
                intervalMinutes === item.val
                  ? 'bg-amber-600 text-white font-semibold'
                  : 'bg-white/80 text-stone-600 hover:bg-stone-100 dark:bg-stone-900 dark:text-stone-400'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Pretraži zanimljivosti (npr. Diogen, kafa, pasulj, Sizif)..."
          className="w-full rounded-xl border border-stone-200 bg-white py-2.5 pl-10 pr-10 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:outline-hidden dark:border-stone-800 dark:bg-[#15161a] dark:text-stone-100 dark:placeholder:text-stone-500"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category Filters */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
            selectedCategory === 'all'
              ? 'bg-amber-700 text-white shadow-2xs font-semibold'
              : 'border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 dark:border-stone-800 dark:bg-[#15161a] dark:text-stone-300 dark:hover:bg-stone-800'
          }`}
        >
          Sve zanimljivosti ({triviaItems.length})
        </button>
        {TRIVIA_CATEGORIES.map((cat) => {
          const count = triviaItems.filter((t) => t.category === cat.id).length;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-amber-700 text-white shadow-2xs font-semibold'
                  : 'border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 dark:border-stone-800 dark:bg-[#15161a] dark:text-stone-300 dark:hover:bg-stone-800'
              }`}
            >
              {cat.label} {count > 0 && `(${count})`}
            </button>
          );
        })}
      </div>

      {/* Trivia Cards List */}
      {filteredTrivia.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-300 p-8 text-center dark:border-stone-800">
          <p className="text-sm text-stone-500">Nema pronađenih zanimljivosti za vašu pretragu.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-2 text-xs font-medium text-amber-700 dark:text-amber-400 underline"
          >
            Poništi filtere
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTrivia.map((trivia) => (
            <div
              key={trivia.id}
              className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 dark:border-stone-800 dark:bg-[#15161a] shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                    <span>{trivia.categoryLabel}</span>
                    <span className="text-stone-300 dark:text-stone-700">·</span>
                    <span className="text-stone-500 dark:text-stone-400 font-normal">
                      {trivia.philosopherName}
                    </span>
                  </div>
                  <h3 className="font-editorial text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 leading-snug">
                    {trivia.title}
                  </h3>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleSpeak(trivia)}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 ${
                      speakingTriviaId === trivia.id ? 'text-amber-600' : ''
                    }`}
                    title="Poslušaj glasom"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleShare(trivia)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800"
                    title="Podeli zanimljivost"
                  >
                    {copiedTriviaId === trivia.id ? (
                      <Check className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <Share2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                {trivia.content}
              </p>

              {/* Highlight takeaway */}
              <div className="rounded-xl bg-amber-50/70 p-3 text-xs text-amber-950 dark:bg-amber-950/30 dark:text-amber-200 border border-amber-200/50 dark:border-amber-900/30 font-medium">
                💡 <span className="font-semibold">Poenta:</span> {trivia.funFactHighlight}
              </div>

              {/* Footer info & link */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800/60 text-xs">
                <span className="text-[11px] text-stone-400">
                  {trivia.historicalContext}
                </span>

                {trivia.philosopherId && onSelectPhilosopherById && (
                  <button
                    onClick={() => onSelectPhilosopherById(trivia.philosopherId!)}
                    className="flex items-center gap-1 text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline"
                  >
                    <span>Profil mislioca</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
