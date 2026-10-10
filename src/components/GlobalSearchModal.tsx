import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  Users, 
  BookOpen, 
  Quote as QuoteIcon, 
  Sparkles, 
  ArrowRight,
  Heart,
  Volume2,
  Check
} from 'lucide-react';
import { Philosopher, PhilosophicalTerm, Quote, TriviaItem } from '../types/philosophy';
import { speakText } from '../utils/notifications';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  philosophers: Philosopher[];
  terms: PhilosophicalTerm[];
  quotes: Quote[];
  triviaItems: TriviaItem[];
  favoriteQuoteIds: string[];
  onToggleFavoriteQuote: (quoteId: string) => void;
  onSelectPhilosopher: (p: Philosopher) => void;
  onSelectTerm: (t: PhilosophicalTerm) => void;
  onSelectTrivia: (trivia: TriviaItem) => void;
}

type SearchCategoryFilter = 'all' | 'philosophers' | 'terms' | 'quotes' | 'trivia';

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  philosophers,
  terms,
  quotes,
  triviaItems,
  favoriteQuoteIds,
  onToggleFavoriteQuote,
  onSelectPhilosopher,
  onSelectTerm,
  onSelectTrivia,
}) => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<SearchCategoryFilter>('all');
  const [copiedQuoteId, setCopiedQuoteId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setActiveFilter('all');
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const q = query.trim().toLowerCase();

  // Search results calculation
  const matchedPhilosophers = useMemo(() => {
    if (!q) return [];
    return philosophers.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.school.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.keyIdeas.some((idea) => idea.toLowerCase().includes(q))
    );
  }, [philosophers, q]);

  const matchedTerms = useMemo(() => {
    if (!q) return [];
    return terms.filter(
      (t) =>
        t.term.toLowerCase().includes(q) ||
        t.shortDefinition.toLowerCase().includes(q) ||
        t.everydayAnalogy.toLowerCase().includes(q) ||
        (t.greekOrLatin && t.greekOrLatin.toLowerCase().includes(q))
    );
  }, [terms, q]);

  const matchedQuotes = useMemo(() => {
    if (!q) return [];
    return quotes.filter(
      (qt) =>
        qt.text.toLowerCase().includes(q) ||
        qt.philosopherName.toLowerCase().includes(q) ||
        (qt.context && qt.context.toLowerCase().includes(q))
    );
  }, [quotes, q]);

  const matchedTrivia = useMemo(() => {
    if (!q) return [];
    return triviaItems.filter(
      (tr) =>
        tr.title.toLowerCase().includes(q) ||
        tr.content.toLowerCase().includes(q) ||
        tr.philosopherName.toLowerCase().includes(q) ||
        tr.funFactHighlight.toLowerCase().includes(q) ||
        tr.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [triviaItems, q]);

  const totalResults =
    matchedPhilosophers.length +
    matchedTerms.length +
    matchedQuotes.length +
    matchedTrivia.length;

  const handleCopyQuote = (quote: Quote) => {
    const full = `„${quote.text}“ — ${quote.philosopherName}`;
    navigator.clipboard.writeText(full);
    setCopiedQuoteId(quote.id);
    setTimeout(() => setCopiedQuoteId(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-6 pt-12 sm:pt-16 animate-in fade-in duration-150">
      <div className="w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl border border-stone-200 bg-[#fcfbf9] dark:border-stone-800 dark:bg-[#131418] shadow-2xl overflow-hidden">
        {/* Search Input Header */}
        <div className="p-3 sm:p-4 border-b border-stone-200 dark:border-stone-800 flex items-center gap-3 bg-white dark:bg-[#17181d]">
          <Search className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pretraži celu riznicu: npr. Marko Aurelije, ataraksija, smrt, mudrost..."
            className="flex-1 bg-transparent text-sm sm:text-base text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-md"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300"
          >
            ESC
          </button>
        </div>

        {/* Filter Tabs */}
        {query && (
          <div className="flex items-center gap-1.5 p-2.5 px-4 bg-stone-50 dark:bg-[#101114] border-b border-stone-200 dark:border-stone-800 overflow-x-auto no-scrollbar text-xs">
            <button
              onClick={() => setActiveFilter('all')}
              className={`rounded-lg px-2.5 py-1 transition-colors ${
                activeFilter === 'all'
                  ? 'bg-amber-700 text-white font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800'
              }`}
            >
              Sve ({totalResults})
            </button>
            <button
              onClick={() => setActiveFilter('philosophers')}
              className={`rounded-lg px-2.5 py-1 transition-colors ${
                activeFilter === 'philosophers'
                  ? 'bg-amber-700 text-white font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800'
              }`}
            >
              Filozofi ({matchedPhilosophers.length})
            </button>
            <button
              onClick={() => setActiveFilter('terms')}
              className={`rounded-lg px-2.5 py-1 transition-colors ${
                activeFilter === 'terms'
                  ? 'bg-amber-700 text-white font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800'
              }`}
            >
              Pojmovnik ({matchedTerms.length})
            </button>
            <button
              onClick={() => setActiveFilter('quotes')}
              className={`rounded-lg px-2.5 py-1 transition-colors ${
                activeFilter === 'quotes'
                  ? 'bg-amber-700 text-white font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800'
              }`}
            >
              Citati ({matchedQuotes.length})
            </button>
            <button
              onClick={() => setActiveFilter('trivia')}
              className={`rounded-lg px-2.5 py-1 transition-colors ${
                activeFilter === 'trivia'
                  ? 'bg-amber-700 text-white font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800'
              }`}
            >
              Zanimljivosti ({matchedTrivia.length})
            </button>
          </div>
        )}

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
          {!query ? (
            <div className="py-8 text-center space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Search className="h-6 w-6" />
              </div>
              <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
                Upišite bilo koje ime mislioca, pojam ili misao
              </p>
              <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                {['Marko Aurelije', 'Eudaimonija', 'Amor Fati', 'Niče', 'Kategorički imperativ', 'Diogen', 'Smrt'].map(
                  (suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setQuery(suggestion)}
                      className="rounded-lg border border-stone-200 bg-white px-2.5 py-1 text-xs text-stone-600 hover:border-amber-500 hover:text-amber-700 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 transition-colors"
                    >
                      {suggestion}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-12 text-center text-stone-500 dark:text-stone-400 space-y-2">
              <p className="text-base font-editorial font-bold">Nema pronađenih rezultata za „{query}“</p>
              <p className="text-xs">Pokušajte sa nekim drugim pojmom ili skraćenom rečju.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Section 1: Philosophers */}
              {(activeFilter === 'all' || activeFilter === 'philosophers') &&
                matchedPhilosophers.length > 0 && (
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                      <Users className="h-4 w-4" />
                      <span>Filozofi ({matchedPhilosophers.length})</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {matchedPhilosophers.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => {
                            onSelectPhilosopher(p);
                            onClose();
                          }}
                          className="group cursor-pointer rounded-xl border border-stone-200 bg-white p-3 dark:border-stone-800 dark:bg-[#18191f] hover:border-amber-500 transition-all flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="h-10 w-10 shrink-0 rounded-lg overflow-hidden border border-stone-200 dark:border-stone-700 bg-stone-100">
                              <img
                                src={p.portraitUrl}
                                alt={p.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-editorial text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 truncate">
                                {p.name}
                              </h4>
                              <p className="text-[11px] text-stone-500 truncate">
                                {p.era} · {p.school}
                              </p>
                            </div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-stone-400 group-hover:translate-x-0.5 transition-transform shrink-0 ml-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Section 2: Glossary Terms */}
              {(activeFilter === 'all' || activeFilter === 'terms') &&
                matchedTerms.length > 0 && (
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                      <BookOpen className="h-4 w-4" />
                      <span>Pojmovnik ({matchedTerms.length})</span>
                    </div>
                    <div className="space-y-2">
                      {matchedTerms.map((t) => (
                        <div
                          key={t.id}
                          onClick={() => {
                            onSelectTerm(t);
                            onClose();
                          }}
                          className="group cursor-pointer rounded-xl border border-stone-200 bg-white p-3.5 dark:border-stone-800 dark:bg-[#18191f] hover:border-amber-500 transition-all flex items-start justify-between gap-3"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-editorial text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400">
                                {t.term}
                              </span>
                              <span className="text-[10px] text-stone-400">
                                {t.categoryLabel}
                              </span>
                            </div>
                            <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-1">
                              {t.shortDefinition}
                            </p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-stone-400 group-hover:translate-x-0.5 transition-transform shrink-0 mt-1" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Section 3: Quotes */}
              {(activeFilter === 'all' || activeFilter === 'quotes') &&
                matchedQuotes.length > 0 && (
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                      <QuoteIcon className="h-4 w-4" />
                      <span>Citati ({matchedQuotes.length})</span>
                    </div>
                    <div className="space-y-2">
                      {matchedQuotes.map((qt) => {
                        const isFav = favoriteQuoteIds.includes(qt.id);
                        return (
                          <div
                            key={qt.id}
                            className="rounded-xl border border-stone-200 bg-white p-3.5 dark:border-stone-800 dark:bg-[#18191f] space-y-2"
                          >
                            <p className="font-editorial text-sm sm:text-base italic text-stone-900 dark:text-stone-100">
                              „{qt.text}“
                            </p>
                            <div className="flex items-center justify-between text-xs text-stone-500 pt-1.5 border-t border-stone-100 dark:border-stone-800">
                              <span className="font-semibold text-stone-800 dark:text-stone-200">
                                {qt.philosopherName}
                              </span>
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => speakText(`${qt.text}. ${qt.philosopherName}`)}
                                  className="p-1 hover:text-amber-600 rounded-md"
                                  title="Poslušaj"
                                >
                                  <Volume2 className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  onClick={() => handleCopyQuote(qt)}
                                  className="p-1 hover:text-amber-600 rounded-md"
                                  title="Kopiraj"
                                >
                                  {copiedQuoteId === qt.id ? (
                                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                                  ) : (
                                    <QuoteIcon className="h-3.5 w-3.5" />
                                  )}
                                </button>
                                <button
                                  onClick={() => onToggleFavoriteQuote(qt.id)}
                                  className={`p-1 rounded-md ${isFav ? 'text-rose-500' : 'hover:text-rose-500'}`}
                                  title="Omiljeni"
                                >
                                  <Heart
                                    className={`h-3.5 w-3.5 ${isFav ? 'fill-current' : ''}`}
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              {/* Section 4: Trivia */}
              {(activeFilter === 'all' || activeFilter === 'trivia') &&
                matchedTrivia.length > 0 && (
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                      <Sparkles className="h-4 w-4" />
                      <span>Zanimljivosti ({matchedTrivia.length})</span>
                    </div>
                    <div className="space-y-2">
                      {matchedTrivia.map((tr) => (
                        <div
                          key={tr.id}
                          onClick={() => {
                            onSelectTrivia(tr);
                            onClose();
                          }}
                          className="group cursor-pointer rounded-xl border border-stone-200 bg-white p-3.5 dark:border-stone-800 dark:bg-[#18191f] hover:border-amber-500 transition-all space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase text-amber-700 dark:text-amber-400">
                              {tr.categoryLabel} · {tr.philosopherName}
                            </span>
                            <ArrowRight className="h-3.5 w-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                          <h4 className="font-editorial text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400">
                            {tr.title}
                          </h4>
                          <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2">
                            {tr.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
