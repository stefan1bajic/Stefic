import React from 'react';
import { Feather, Sparkles, RefreshCw, CheckCircle2, ArrowRight, BookOpen, Volume2 } from 'lucide-react';
import { DailyReflectionPrompt, JournalEntry } from '../types/philosophy';
import { speakText } from '../utils/notifications';

interface DailyReflectionCardProps {
  prompt: DailyReflectionPrompt;
  todayEntry: JournalEntry | null;
  totalEntriesCount: number;
  onOpenModal: () => void;
  onShufflePrompt: () => void;
}

export const DailyReflectionCard: React.FC<DailyReflectionCardProps> = ({
  prompt,
  todayEntry,
  totalEntriesCount,
  onOpenModal,
  onShufflePrompt,
}) => {
  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakText(`${prompt.question}. ${prompt.philosophicalContext}`);
  };

  const handleShuffle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShufflePrompt();
  };

  return (
    <div 
      onClick={onOpenModal}
      className="group cursor-pointer rounded-2xl border border-amber-300/80 bg-linear-to-br from-amber-500/10 via-[#fcfbf9] to-amber-500/5 p-4 sm:p-5 dark:border-amber-700/60 dark:from-amber-950/25 dark:via-[#141518] dark:to-stone-900 shadow-xs hover:border-amber-400 transition-all space-y-3"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2 border-b border-amber-200/50 dark:border-amber-900/40">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-600 text-white shadow-2xs">
            <Feather className="h-4 w-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider block">
              Dnevna Refleksija
            </span>
            <span className="text-[10px] text-stone-500 dark:text-stone-400 block truncate max-w-[200px] sm:max-w-xs">
              {prompt.sourcePhilosopherName ? `Inspirisano: ${prompt.sourcePhilosopherName}` : 'Filozofsko preispitivanje'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleSpeak}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-stone-500 hover:bg-amber-100 dark:hover:bg-stone-800 transition-colors"
            title="Poslušaj pitanje"
          >
            <Volume2 className="h-3.5 w-3.5" />
          </button>
          {!todayEntry && (
            <button
              onClick={handleShuffle}
              className="flex items-center gap-1 rounded-lg border border-amber-300 bg-white/80 px-2 py-1 text-[11px] font-medium text-amber-900 dark:border-amber-800 dark:bg-stone-900 dark:text-amber-300 shadow-2xs hover:bg-amber-50 transition-colors"
              title="Drugo filozofsko pitanje"
            >
              <RefreshCw className="h-3 w-3" />
              <span className="hidden sm:inline">Drugo pitanje</span>
            </button>
          )}
        </div>
      </div>

      {/* Thought-Provoking Question */}
      <div className="space-y-1.5">
        <h3 className="font-editorial text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 leading-snug">
          „{prompt.question}“
        </h3>
        <p className="text-xs text-stone-600 dark:text-stone-300 italic line-clamp-2">
          {prompt.philosophicalContext}
        </p>
      </div>

      {/* Entry Status Box */}
      {todayEntry ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3 dark:border-emerald-900/60 dark:bg-emerald-950/20 space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold text-emerald-800 dark:text-emerald-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>Zapisano za danas ({todayEntry.wordCount} reči)</span>
            </div>
            <span className="text-[11px] text-stone-400 font-normal">Klikni za pregled</span>
          </div>
          <p className="text-xs text-stone-700 dark:text-stone-300 line-clamp-2 italic font-serif">
            „{todayEntry.content}“
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-stone-500 dark:text-stone-400">
            {totalEntriesCount > 0 
              ? `${totalEntriesCount} sačuvanih zapisa u tvom dnevniku` 
              : 'Iskoristi trenutak tišine i zabeleži svoje misli'}
          </span>
          <div className="flex items-center gap-1 text-xs font-semibold text-amber-700 dark:text-amber-400 group-hover:translate-x-0.5 transition-transform">
            <span>Zapiši u dnevnik</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </div>
      )}
    </div>
  );
};
