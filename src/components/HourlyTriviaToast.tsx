import React, { useState } from 'react';
import { X, Sparkles, Volume2, Share2, Check } from 'lucide-react';
import { TriviaItem } from '../types/philosophy';
import { speakText } from '../utils/notifications';

interface HourlyTriviaToastProps {
  trivia: TriviaItem | null;
  onDismiss: () => void;
  onSelectPhilosopher?: (philosopherId: string) => void;
}

export const HourlyTriviaToast: React.FC<HourlyTriviaToastProps> = ({
  trivia,
  onDismiss,
  onSelectPhilosopher,
}) => {
  const [copied, setCopied] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  if (!trivia) return null;

  const handleSpeak = () => {
    setSpeaking(true);
    speakText(`${trivia.title}. ${trivia.content}`);
    setTimeout(() => setSpeaking(false), 5000);
  };

  const handleShare = () => {
    const text = `🏛️ Filozofska Zanimljivost: ${trivia.title}\n\n${trivia.content}\n\n— Podeljeno iz aplikacije Filozofia`;
    if (navigator.share) {
      navigator.share({
        title: trivia.title,
        text: text,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-20 z-50 px-4 sm:px-6 pointer-events-none flex justify-center">
      <div className="pointer-events-auto w-full max-w-lg rounded-2xl border border-amber-300/80 bg-[#fefdfa] p-4 shadow-2xl dark:border-amber-700/60 dark:bg-[#1a1b20] animate-in slide-in-from-bottom-5 duration-300">
        {/* Header kicker */}
        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400">
            <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-spin" />
            <span>NOVA ČASOVNA ZANIMLJIVOST</span>
            <span className="text-stone-300 dark:text-stone-600">·</span>
            <span className="text-stone-500 dark:text-stone-400 font-normal">{trivia.categoryLabel}</span>
          </div>
          <button
            onClick={onDismiss}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
            aria-label="Zatvori"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Title */}
        <h3 className="font-editorial text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 leading-snug">
          {trivia.title}
        </h3>

        {/* Content */}
        <p className="mt-1.5 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3">
          {trivia.content}
        </p>

        {/* Actions bar */}
        <div className="mt-3 flex items-center justify-between pt-2 border-t border-stone-200/60 dark:border-stone-800/60">
          {trivia.philosopherId && onSelectPhilosopher ? (
            <button
              onClick={() => {
                onSelectPhilosopher(trivia.philosopherId!);
                onDismiss();
              }}
              className="text-xs font-medium text-amber-700 dark:text-amber-400 hover:underline"
            >
              Upoznaj filozofa: {trivia.philosopherName} →
            </button>
          ) : (
            <span className="text-xs text-stone-500 dark:text-stone-400">
              {trivia.philosopherName}
            </span>
          )}

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleSpeak}
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800 transition-colors ${
                speaking ? 'text-amber-600 bg-amber-50 dark:bg-amber-950/40' : ''
              }`}
              title="Poslušaj glasom"
            >
              <Volume2 className="h-4 w-4" />
            </button>

            <button
              onClick={handleShare}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800 transition-colors"
              title="Podeli zanimljivost"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Share2 className="h-4 w-4" />}
            </button>

            <button
              onClick={onDismiss}
              className="rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 ml-1"
            >
              Zatvori
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
