import React, { useState, useMemo } from 'react';
import { Search, X, BookOpen, Volume2, Bookmark, Compass, ArrowRight } from 'lucide-react';
import { PhilosophicalTerm, EraCategory } from '../types/philosophy';
import { ERA_CATEGORIES } from '../data/philosophyData';
import { speakText } from '../utils/notifications';

interface GlossaryTabProps {
  terms: PhilosophicalTerm[];
  favoriteTermIds: string[];
  onToggleFavoriteTerm: (termId: string) => void;
  onSelectTerm: (term: PhilosophicalTerm) => void;
}

export const GlossaryTab: React.FC<GlossaryTabProps> = ({
  terms,
  favoriteTermIds,
  onToggleFavoriteTerm,
  onSelectTerm,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EraCategory | 'all'>('all');
  const [speakingTermId, setSpeakingTermId] = useState<string | null>(null);

  const filteredTerms = useMemo(() => {
    return terms.filter((t) => {
      const matchesSearch =
        t.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.shortDefinition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.everydayAnalogy.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.greekOrLatin && t.greekOrLatin.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat =
        selectedCategory === 'all' || t.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [terms, searchQuery, selectedCategory]);

  const handleSpeak = (e: React.MouseEvent, term: PhilosophicalTerm) => {
    e.stopPropagation();
    setSpeakingTermId(term.id);
    speakText(`${term.term}. ${term.shortDefinition}`);
    setTimeout(() => setSpeakingTermId(null), 4000);
  };

  const handleToggleBookmark = (e: React.MouseEvent, termId: string) => {
    e.stopPropagation();
    onToggleFavoriteTerm(termId);
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Title */}
      <div>
        <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
          Filozofski Rečnik
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
          Jasna objašnjenja ključnih filozofskih reči sa praktičnim primerima iz svakodnevnog života.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Pretraži pojam (npr. eudaimonija, ataraksija, solipsizam)..."
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

      {/* Category Filter Buttons */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
            selectedCategory === 'all'
              ? 'bg-amber-700 text-white shadow-2xs font-semibold'
              : 'border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 dark:border-stone-800 dark:bg-[#15161a] dark:text-stone-300 dark:hover:bg-stone-800'
          }`}
        >
          Svi pojmovi ({terms.length})
        </button>
        {ERA_CATEGORIES.map((cat) => {
          const count = terms.filter((t) => t.category === cat.id).length;
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

      {/* Terms List */}
      {filteredTerms.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-300 p-8 text-center dark:border-stone-800">
          <p className="text-sm text-stone-500">Nema pronađenih pojmova u rečniku.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-2 text-xs font-medium text-amber-700 dark:text-amber-400 underline"
          >
            Poništi pretragu
          </button>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredTerms.map((term) => {
            const isBookmarked = favoriteTermIds.includes(term.id);
            return (
              <div
                key={term.id}
                onClick={() => onSelectTerm(term)}
                className="group cursor-pointer rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 dark:border-stone-800 dark:bg-[#15161a] shadow-xs hover:border-amber-400/80 dark:hover:border-amber-600/60 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                        {term.categoryLabel}
                      </span>
                      {term.pronunciation && (
                        <>
                          <span className="text-stone-300 dark:text-stone-700">·</span>
                          <span className="text-[11px] font-mono text-stone-400">
                            /{term.pronunciation}/
                          </span>
                        </>
                      )}
                    </div>
                    <h3 className="font-editorial text-xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors">
                      {term.term}
                    </h3>
                    {term.greekOrLatin && (
                      <p className="text-xs text-stone-400 dark:text-stone-500 font-serif italic">
                        {term.greekOrLatin}
                      </p>
                    )}
                  </div>

                  {/* Top Right Bookmark button */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => handleSpeak(e, term)}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors ${
                        speakingTermId === term.id ? 'text-amber-600' : ''
                      }`}
                      title="Pročitaj naglas"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => handleToggleBookmark(e, term.id)}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                        isBookmarked
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
                      }`}
                      title={isBookmarked ? 'Ukloni pojam' : 'Sačuvaj u omiljene'}
                    >
                      <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Short definition */}
                <p className="mt-2.5 text-xs sm:text-sm text-stone-700 dark:text-stone-200 leading-relaxed font-medium">
                  {term.shortDefinition}
                </p>

                {/* Everyday analogy box */}
                <div className="mt-3 rounded-xl border border-stone-100 bg-stone-50/80 p-3 text-xs text-stone-600 dark:border-stone-800/60 dark:bg-stone-900/40 dark:text-stone-300 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-stone-800 dark:text-stone-200 text-[11px] uppercase tracking-wide">
                    <Compass className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                    <span>U svakodnevnom životu:</span>
                  </div>
                  <p className="leading-relaxed line-clamp-2">
                    {term.everydayAnalogy}
                  </p>
                </div>

                {/* Footer Link */}
                <div className="mt-3 flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800/80 text-xs">
                  <span className="text-[11px] text-stone-400">
                    Povezano sa: {term.relatedPhilosophers.join(', ')}
                  </span>
                  <div className="flex items-center gap-1 text-amber-700 dark:text-amber-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                    <span>Opširnije</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
