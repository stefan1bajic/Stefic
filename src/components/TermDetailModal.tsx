import React, { useState } from 'react';
import { X, Bookmark, Volume2, BookOpen, Users, Compass, Share2, Check } from 'lucide-react';
import { PhilosophicalTerm } from '../types/philosophy';
import { speakText } from '../utils/notifications';

interface TermDetailModalProps {
  term: PhilosophicalTerm | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (termId: string) => void;
  onSelectPhilosopher?: (philosopherName: string) => void;
}

export const TermDetailModal: React.FC<TermDetailModalProps> = ({
  term,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onSelectPhilosopher,
}) => {
  const [speaking, setSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!term) return null;

  const handleSpeak = () => {
    setSpeaking(true);
    speakText(`${term.term}. ${term.shortDefinition}. ${term.inDepthExplanation}`);
    setTimeout(() => setSpeaking(false), 5000);
  };

  const handleCopy = () => {
    const text = `📖 ${term.term}\n\nDefinicija: ${term.shortDefinition}\n\nU svakodnevnom životu: ${term.everydayAnalogy}\n\n— Aplikacija Filozofia`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl border border-stone-200 bg-[#fcfbf9] dark:border-stone-800 dark:bg-[#121316] shadow-2xl pb-safe">
        
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-stone-200/80 bg-[#fcfbf9]/95 px-5 py-3.5 backdrop-blur-md dark:border-stone-800/80 dark:bg-[#121316]/95">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              {term.categoryLabel}
            </span>
            {term.pronunciation && (
              <>
                <span className="text-stone-300 dark:text-stone-700">·</span>
                <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">
                  /{term.pronunciation}/
                </span>
              </>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-stone-400 hover:text-stone-800 dark:hover:text-stone-100"
            aria-label="Zatvori"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 sm:p-7 space-y-5">
          {/* Term Title & Origin */}
          <div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-950 dark:text-stone-50">
              {term.term}
            </h2>
            {term.greekOrLatin && (
              <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 font-serif italic">
                Etimologija: {term.greekOrLatin}
              </p>
            )}
          </div>

          {/* Short Definition */}
          <div className="rounded-xl border border-amber-200/70 bg-amber-50/40 p-4 dark:border-amber-900/40 dark:bg-amber-950/20">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
              Kratka suština
            </span>
            <p className="mt-1 text-sm font-medium text-stone-900 dark:text-stone-100 leading-relaxed">
              {term.shortDefinition}
            </p>
          </div>

          {/* Everyday Analogy (Key user requirement: "objašnjavanje reči") */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 sm:p-5 dark:border-stone-800 dark:bg-[#16171b] shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-200 mb-2 flex items-center gap-2">
              <Compass className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              Kako ovo izgleda u svakodnevnom životu?
            </h3>
            <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              {term.everydayAnalogy}
            </p>
          </div>

          {/* In-depth explanation */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-200 mb-2 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              Detaljno filozofsko objašnjenje
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              {term.inDepthExplanation}
            </p>
          </div>

          {/* Sample Quote */}
          {term.sampleQuote && (
            <div className="rounded-xl border border-stone-200/70 bg-stone-50/70 p-4 dark:border-stone-800 dark:bg-stone-900/40">
              <p className="font-editorial text-sm italic text-stone-800 dark:text-stone-200">
                „{term.sampleQuote}“
              </p>
            </div>
          )}

          {/* Related philosophers */}
          {term.relatedPhilosophers.length > 0 && (
            <div>
              <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 flex items-center gap-1.5 mb-2">
                <Users className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                Filozofi povezani sa ovim pojmom:
              </span>
              <div className="flex flex-wrap gap-2">
                {term.relatedPhilosophers.map((pName) => (
                  <button
                    key={pName}
                    onClick={() => {
                      if (onSelectPhilosopher) onSelectPhilosopher(pName);
                      onClose();
                    }}
                    className="rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-800 hover:border-amber-500 hover:text-amber-700 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200 dark:hover:text-amber-400 transition-colors"
                  >
                    {pName} →
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-200 dark:border-stone-800">
            <button
              onClick={() => onToggleBookmark(term.id)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                isBookmarked
                  ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/40 dark:text-amber-300'
                  : 'border border-stone-200 text-stone-700 hover:bg-stone-100 dark:border-stone-800 dark:text-stone-300 dark:hover:bg-stone-800'
              }`}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
              <span>{isBookmarked ? 'Sačuvano u rečniku' : 'Sačuvaj pojam'}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSpeak}
                className={`flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-100 dark:border-stone-800 dark:text-stone-300 dark:hover:bg-stone-800 transition-colors ${
                  speaking ? 'text-amber-600 border-amber-500' : ''
                }`}
                title="Pročitaj naglas"
              >
                <Volume2 className="h-4 w-4" />
              </button>

              <button
                onClick={handleCopy}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-100 dark:border-stone-800 dark:text-stone-300 dark:hover:bg-stone-800 transition-colors"
                title="Podeli / Kopiraj"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Share2 className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
