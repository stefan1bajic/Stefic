import React, { useState } from 'react';
import { X, Heart, Volume2, Quote as QuoteIcon, Lightbulb, MapPin, Calendar, BookOpen, Share2, Check } from 'lucide-react';
import { Philosopher } from '../types/philosophy';
import { TRIVIA_ITEMS } from '../data/philosophyData';
import { speakText } from '../utils/notifications';

interface PhilosopherDetailModalProps {
  philosopher: Philosopher | null;
  onClose: () => void;
  favoriteQuoteIds: string[];
  onToggleFavoriteQuote: (quoteId: string) => void;
  onSelectTerm?: (termId: string) => void;
}

export const PhilosopherDetailModal: React.FC<PhilosopherDetailModalProps> = ({
  philosopher,
  onClose,
  favoriteQuoteIds,
  onToggleFavoriteQuote,
  onSelectTerm,
}) => {
  const [speakingQuoteId, setSpeakingQuoteId] = useState<string | null>(null);
  const [copiedQuoteId, setCopiedQuoteId] = useState<string | null>(null);

  if (!philosopher) return null;

  const relatedTrivia = TRIVIA_ITEMS.filter((t) => t.philosopherId === philosopher.id);

  const handleSpeak = (quoteId: string, text: string) => {
    setSpeakingQuoteId(quoteId);
    speakText(text);
    setTimeout(() => setSpeakingQuoteId(null), 4000);
  };

  const handleCopyQuote = (quoteId: string, text: string) => {
    const full = `"${text}" — ${philosopher.name}`;
    navigator.clipboard.writeText(full);
    setCopiedQuoteId(quoteId);
    setTimeout(() => setCopiedQuoteId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl border border-stone-200 bg-[#fcfbf9] dark:border-stone-800 dark:bg-[#121316] shadow-2xl pb-safe">
        
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-stone-200/80 bg-[#fcfbf9]/95 px-5 py-3.5 backdrop-blur-md dark:border-stone-800/80 dark:bg-[#121316]/95">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              {philosopher.categoryLabel}
            </span>
            <span className="text-stone-300 dark:text-stone-700">·</span>
            <span className="text-xs text-stone-500 dark:text-stone-400 font-serif">
              {philosopher.school}
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-stone-400 hover:text-stone-800 dark:hover:text-stone-100"
            aria-label="Zatvori"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 sm:p-7 space-y-6">
          {/* Hero Profile Block */}
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <div className="relative h-28 w-28 sm:h-32 sm:w-32 shrink-0 rounded-2xl overflow-hidden border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-900 shadow-md">
              <img
                src={philosopher.portraitUrl}
                alt={philosopher.name}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-baseline gap-2.5">
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-950 dark:text-stone-50">
                  {philosopher.name}
                </h2>
                {philosopher.nativeName && (
                  <span className="text-sm text-stone-400 dark:text-stone-500 font-serif italic">
                    ({philosopher.nativeName})
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 dark:text-stone-400">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                  {philosopher.lifeDates}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                  {philosopher.location}
                </span>
              </div>

              <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed pt-1">
                {philosopher.summary}
              </p>
            </div>
          </div>

          {/* Detailed Biography / Context */}
          <div className="rounded-xl border border-stone-200/90 bg-stone-50/60 p-4 sm:p-5 dark:border-stone-800/80 dark:bg-stone-900/40">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-200 mb-2">
              Život i učenje
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              {philosopher.bioDetails}
            </p>
          </div>

          {/* Key Ideas */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-200 mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              Glavna učenja i ideje
            </h3>
            <div className="space-y-2">
              {philosopher.keyIdeas.map((idea, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-lg border border-stone-200/60 bg-white p-3 text-xs sm:text-sm text-stone-700 dark:border-stone-800/60 dark:bg-[#16171b] dark:text-stone-300"
                >
                  <span className="font-mono text-xs font-bold text-amber-700 dark:text-amber-400 shrink-0 mt-0.5">
                    {String(idx + 1).padStart(2, '0')}.
                  </span>
                  <p className="leading-normal">{idea}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Famous Quotes with Bookmark & Audio */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-200 mb-3 flex items-center gap-2">
              <QuoteIcon className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              Omiljeni citati ({philosopher.famousQuotes.length})
            </h3>
            <div className="space-y-3">
              {philosopher.famousQuotes.map((q) => {
                const isFav = favoriteQuoteIds.includes(q.id);
                return (
                  <div
                    key={q.id}
                    className="relative rounded-xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-[#16171b] shadow-xs"
                  >
                    <p className="font-editorial text-base sm:text-lg italic text-stone-900 dark:text-stone-100 leading-relaxed">
                      „{q.text}“
                    </p>
                    {q.context && (
                      <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                        Izvor: {q.context}
                      </p>
                    )}

                    <div className="mt-3 flex items-center justify-end gap-2 pt-2 border-t border-stone-100 dark:border-stone-800/60">
                      <button
                        onClick={() => handleSpeak(q.id, q.text)}
                        className={`flex h-8 w-8 items-center justify-center rounded-lg text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 ${
                          speakingQuoteId === q.id ? 'text-amber-600' : ''
                        }`}
                        title="Pročitaj naglas"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => handleCopyQuote(q.id, q.text)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800"
                        title="Kopiraj citat"
                      >
                        {copiedQuoteId === q.id ? (
                          <Check className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <Share2 className="h-4 w-4" />
                        )}
                      </button>

                      <button
                        onClick={() => onToggleFavoriteQuote(q.id)}
                        className={`flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium transition-colors ${
                          isFav
                            ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400'
                            : 'text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800'
                        }`}
                        title={isFav ? 'Ukloni iz omiljenih' : 'Dodaj u omiljene citate'}
                      >
                        <Heart
                          className={`h-4 w-4 ${isFav ? 'fill-rose-600 text-rose-600 dark:fill-rose-400 dark:text-rose-400' : ''}`}
                        />
                        <span>{isFav ? 'Sačuvano' : 'Omiljeni'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Related Anecdotes / Trivia */}
          {relatedTrivia.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-200 mb-3 flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                Anegdote i zanimljivosti ({relatedTrivia.length})
              </h3>
              <div className="space-y-3">
                {relatedTrivia.map((trivia) => (
                  <div
                    key={trivia.id}
                    className="rounded-xl border border-amber-200/60 bg-amber-50/30 p-4 dark:border-amber-900/40 dark:bg-amber-950/20"
                  >
                    <h4 className="font-editorial text-base font-bold text-stone-900 dark:text-stone-100">
                      {trivia.title}
                    </h4>
                    <p className="mt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                      {trivia.content}
                    </p>
                    <div className="mt-2 text-[11px] font-medium text-amber-800 dark:text-amber-300">
                      💡 {trivia.funFactHighlight}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Terms */}
          {philosopher.keyTerms.length > 0 && onSelectTerm && (
            <div className="pt-2">
              <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                Povezani pojmovi iz rečnika:
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {philosopher.keyTerms.map((termId) => (
                  <button
                    key={termId}
                    onClick={() => {
                      onSelectTerm(termId);
                      onClose();
                    }}
                    className="rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-800 hover:border-amber-500 hover:text-amber-700 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200 dark:hover:text-amber-400 transition-colors"
                  >
                    {termId.replace('-', ' ').toUpperCase()} →
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
