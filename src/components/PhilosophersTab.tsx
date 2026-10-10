import React, { useState, useMemo } from 'react';
import { Search, X, Calendar, MapPin, ArrowRight, Quote as QuoteIcon } from 'lucide-react';
import { Philosopher, EraCategory } from '../types/philosophy';
import { ERA_CATEGORIES } from '../data/philosophyData';

interface PhilosophersTabProps {
  philosophers: Philosopher[];
  onSelectPhilosopher: (p: Philosopher) => void;
}

export const PhilosophersTab: React.FC<PhilosophersTabProps> = ({
  philosophers,
  onSelectPhilosopher,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EraCategory | 'all'>('all');

  const filteredPhilosophers = useMemo(() => {
    return philosophers.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.keyIdeas.some((idea) => idea.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'all' || p.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [philosophers, searchQuery, selectedCategory]);

  return (
    <div className="space-y-5 pb-12">
      {/* Title & Introduction */}
      <div>
        <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
          Veliki Filozofi
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
          Upoznajte mislioce koji su oblikovali civilizaciju, od Sokratove Atine do Ničeovih Alpa.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Pretraži filozofa po imenu, učenju ili ideji..."
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

      {/* Category Filter Buttons (Functional Buttons, No pill badges) */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
            selectedCategory === 'all'
              ? 'bg-amber-700 text-white shadow-2xs font-semibold'
              : 'border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 dark:border-stone-800 dark:bg-[#15161a] dark:text-stone-300 dark:hover:bg-stone-800'
          }`}
        >
          Sve epohe ({philosophers.length})
        </button>
        {ERA_CATEGORIES.map((cat) => {
          const count = philosophers.filter((p) => p.category === cat.id).length;
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

      {/* Grid of Philosophers */}
      {filteredPhilosophers.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-300 p-8 text-center dark:border-stone-800">
          <p className="text-sm text-stone-500">Nema pronađenih filozofa za traženi pojam.</p>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredPhilosophers.map((philosopher) => {
            const firstQuote = philosopher.famousQuotes[0];
            return (
              <div
                key={philosopher.id}
                onClick={() => onSelectPhilosopher(philosopher)}
                className="group cursor-pointer rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 dark:border-stone-800 dark:bg-[#15161a] shadow-xs hover:border-amber-400/80 dark:hover:border-amber-600/60 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-900 shadow-2xs">
                      <img
                        src={philosopher.portraitUrl}
                        alt={philosopher.name}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-[10px] text-amber-700 dark:text-amber-400 font-semibold uppercase tracking-wider">
                        <span>{philosopher.categoryLabel}</span>
                      </div>
                      <h3 className="font-editorial text-xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors">
                        {philosopher.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {philosopher.lifeDates}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {philosopher.location}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-1 italic font-serif">
                        {philosopher.school}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 text-xs sm:text-sm text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
                    {philosopher.summary}
                  </p>

                  {firstQuote && (
                    <div className="mt-3 rounded-lg bg-stone-50 p-2.5 text-xs italic text-stone-700 dark:bg-stone-900/60 dark:text-stone-300 border border-stone-100 dark:border-stone-800/60">
                      <QuoteIcon className="inline h-3 w-3 text-amber-600 mr-1 -mt-0.5" />
                      „{firstQuote.text}“
                    </div>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between pt-2.5 border-t border-stone-100 dark:border-stone-800/80 text-xs font-medium text-amber-700 dark:text-amber-400">
                  <span className="text-[11px] text-stone-400">
                    {philosopher.famousQuotes.length} citata · {philosopher.keyIdeas.length} učenja
                  </span>
                  <div className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform font-semibold">
                    <span>Detalji</span>
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
