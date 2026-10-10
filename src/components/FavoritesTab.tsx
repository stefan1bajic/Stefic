import React, { useState } from 'react';
import { 
  Heart, 
  Bookmark, 
  Volume2, 
  Share2, 
  Check, 
  Trash2, 
  SlidersHorizontal, 
  Sparkles, 
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { Quote, PhilosophicalTerm, EraCategory } from '../types/philosophy';
import { ERA_CATEGORIES } from '../data/philosophyData';
import { speakText } from '../utils/notifications';

interface FavoritesTabProps {
  favoriteQuotes: Quote[];
  favoriteTerms: PhilosophicalTerm[];
  onToggleFavoriteQuote: (quoteId: string) => void;
  onToggleFavoriteTerm: (termId: string) => void;
  selectedCategories: EraCategory[];
  onToggleCategory: (cat: EraCategory) => void;
  onSelectTerm: (term: PhilosophicalTerm) => void;
  allQuotes: Quote[];
}

export const FavoritesTab: React.FC<FavoritesTabProps> = ({
  favoriteQuotes,
  favoriteTerms,
  onToggleFavoriteQuote,
  onToggleFavoriteTerm,
  selectedCategories,
  onToggleCategory,
  onSelectTerm,
  allQuotes,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'quotes' | 'categories' | 'terms'>('quotes');
  const [speakingQuoteId, setSpeakingQuoteId] = useState<string | null>(null);
  const [copiedQuoteId, setCopiedQuoteId] = useState<string | null>(null);

  const handleSpeak = (quote: Quote) => {
    setSpeakingQuoteId(quote.id);
    speakText(`${quote.text}. Rekao: ${quote.philosopherName}`);
    setTimeout(() => setSpeakingQuoteId(null), 4000);
  };

  const handleCopy = (quote: Quote) => {
    const text = `„${quote.text}“ — ${quote.philosopherName}`;
    navigator.clipboard.writeText(text);
    setCopiedQuoteId(quote.id);
    setTimeout(() => setCopiedQuoteId(null), 2000);
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Title */}
      <div>
        <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
          Tvoje Teme i Omiljeno
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
          Upravljaj omiljenim citatima i izaberi filozofske kategorije za časovna obaveštenja.
        </p>
      </div>

      {/* Segmented Sub Tabs */}
      <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800">
        <button
          onClick={() => setActiveSubTab('quotes')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeSubTab === 'quotes'
              ? 'bg-white text-stone-900 shadow-xs dark:bg-stone-800 dark:text-stone-100'
              : 'text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200'
          }`}
        >
          <Heart className="h-3.5 w-3.5" />
          <span>Citati ({favoriteQuotes.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('categories')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeSubTab === 'categories'
              ? 'bg-white text-stone-900 shadow-xs dark:bg-stone-800 dark:text-stone-100'
              : 'text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200'
          }`}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span>Kategorije ({selectedCategories.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('terms')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeSubTab === 'terms'
              ? 'bg-white text-stone-900 shadow-xs dark:bg-stone-800 dark:text-stone-100'
              : 'text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200'
          }`}
        >
          <Bookmark className="h-3.5 w-3.5" />
          <span>Pojmovi ({favoriteTerms.length})</span>
        </button>
      </div>

      {/* Subtab 1: Quotes */}
      {activeSubTab === 'quotes' && (
        <div className="space-y-4">
          {favoriteQuotes.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-stone-300 p-8 text-center dark:border-stone-800 space-y-3">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-rose-50 text-rose-500 dark:bg-rose-950/40">
                <Heart className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-editorial text-lg font-bold text-stone-900 dark:text-stone-100">
                  Još uvek nemaš sačuvanih citata
                </h3>
                <p className="mt-1 text-xs text-stone-500 max-w-sm mx-auto">
                  Dodirni ikonicu srca na bilo kom citatu u sekcijama „Danas“ ili „Filozofi“ da ga sačuvaš ovde.
                </p>
              </div>

              {/* Sample inspiration */}
              <div className="pt-2">
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wide block mb-2">
                  Predlog za dodavanje:
                </span>
                <button
                  onClick={() => onToggleFavoriteQuote(allQuotes[0].id)}
                  className="rounded-xl border border-stone-200 bg-white p-3 text-left hover:border-amber-500 dark:border-stone-800 dark:bg-[#15161a] transition-colors w-full"
                >
                  <p className="font-editorial text-xs italic text-stone-800 dark:text-stone-200">
                    „{allQuotes[0].text}“
                  </p>
                  <span className="mt-1 text-[11px] text-amber-700 dark:text-amber-400 font-semibold block">
                    + Sačuvaj: {allQuotes[0].philosopherName}
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {favoriteQuotes.map((quote) => (
                <div
                  key={quote.id}
                  className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 dark:border-stone-800 dark:bg-[#15161a] shadow-xs space-y-3"
                >
                  <p className="font-editorial text-base sm:text-lg italic text-stone-900 dark:text-stone-100 leading-relaxed">
                    „{quote.text}“
                  </p>

                  <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 pt-2 border-t border-stone-100 dark:border-stone-800/60">
                    <div>
                      <span className="font-semibold text-stone-800 dark:text-stone-200">
                        {quote.philosopherName}
                      </span>
                      {quote.context && (
                        <span className="text-[11px] text-stone-400 block">
                          {quote.context}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleSpeak(quote)}
                        className={`flex h-8 w-8 items-center justify-center rounded-lg text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 ${
                          speakingQuoteId === quote.id ? 'text-amber-600' : ''
                        }`}
                        title="Pročitaj naglas"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => handleCopy(quote)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800"
                        title="Kopiraj"
                      >
                        {copiedQuoteId === quote.id ? (
                          <Check className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <Share2 className="h-4 w-4" />
                        )}
                      </button>

                      <button
                        onClick={() => onToggleFavoriteQuote(quote.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                        title="Ukloni iz omiljenih"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Subtab 2: Customize Categories for Notifications */}
      {activeSubTab === 'categories' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-amber-300/80 bg-amber-500/10 p-4 dark:border-amber-800/60 dark:bg-amber-950/20">
            <h3 className="font-editorial text-base font-bold text-amber-950 dark:text-amber-200 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              Izaberi svoje omiljene kategorije
            </h3>
            <p className="mt-1 text-xs text-stone-700 dark:text-stone-300">
              Časovna obaveštenja će vam slati zanimljivosti isključivo iz pravaca koje označite aktivnim ispod.
            </p>
          </div>

          <div className="space-y-2.5">
            {ERA_CATEGORIES.map((cat) => {
              const isSelected = selectedCategories.includes(cat.id);
              return (
                <div
                  key={cat.id}
                  onClick={() => onToggleCategory(cat.id)}
                  className={`cursor-pointer rounded-2xl border p-4 transition-all flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'border-amber-600 bg-amber-50/50 dark:border-amber-500 dark:bg-amber-950/30'
                      : 'border-stone-200 bg-white hover:border-stone-300 dark:border-stone-800 dark:bg-[#15161a]'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-editorial text-base font-bold text-stone-900 dark:text-stone-100">
                        {cat.label}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-400">
                      {cat.description}
                    </p>
                  </div>

                  <div
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition-colors mt-0.5 ${
                      isSelected
                        ? 'border-amber-600 bg-amber-600 text-white'
                        : 'border-stone-300 bg-white dark:border-stone-700 dark:bg-stone-900'
                    }`}
                  >
                    {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Subtab 3: Saved Glossary Terms */}
      {activeSubTab === 'terms' && (
        <div className="space-y-3">
          {favoriteTerms.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-stone-300 p-8 text-center dark:border-stone-800">
              <BookOpen className="mx-auto h-8 w-8 text-stone-400 mb-2" />
              <p className="text-sm text-stone-500">Nema sačuvanih pojmova iz rečnika.</p>
              <p className="text-xs text-stone-400 mt-1">
                U sekciji „Pojmovnik“ kliknite na ikonicu obeleživača pored pojma da ga dodate ovde.
              </p>
            </div>
          ) : (
            favoriteTerms.map((term) => (
              <div
                key={term.id}
                onClick={() => onSelectTerm(term)}
                className="group cursor-pointer rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-[#15161a] shadow-xs hover:border-amber-400 transition-all flex items-center justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                    {term.categoryLabel}
                  </span>
                  <h4 className="font-editorial text-lg font-bold text-stone-900 dark:text-stone-100">
                    {term.term}
                  </h4>
                  <p className="text-xs text-stone-500 line-clamp-1">
                    {term.shortDefinition}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavoriteTerm(term.id);
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-amber-600 hover:bg-stone-100 dark:hover:bg-stone-800"
                    title="Ukloni pojam"
                  >
                    <Bookmark className="h-4 w-4 fill-current" />
                  </button>
                  <ArrowRight className="h-4 w-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
