import React, { useMemo } from 'react';
import { 
  Award, 
  Flame, 
  Compass, 
  BookOpen, 
  Users, 
  Quote as QuoteIcon, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Brain,
  Feather,
  Headphones
} from 'lucide-react';
import { Philosopher, PhilosophicalTerm } from '../types/philosophy';
import { ERA_CATEGORIES } from '../data/philosophyData';

interface LearningProgressDashboardProps {
  philosophers: Philosopher[];
  terms: PhilosophicalTerm[];
  exploredPhilosopherIds: string[];
  exploredTermIds: string[];
  exploredQuoteIds: string[];
  favoriteQuoteIds: string[];
  quizStats: { completed: number; highScore: number };
  dailyActivity: Record<string, number>;
  journalEntriesCount?: number;
  completedAudioLessonIds?: string[];
  totalAudioLessonsCount?: number;
  onSelectPhilosopher: (p: Philosopher) => void;
  onSelectTerm: (t: PhilosophicalTerm) => void;
  onOpenQuiz: () => void;
  onOpenReflection?: () => void;
  onNavigateAudio?: () => void;
}

export const LearningProgressDashboard: React.FC<LearningProgressDashboardProps> = ({
  philosophers,
  terms,
  exploredPhilosopherIds,
  exploredTermIds,
  exploredQuoteIds,
  favoriteQuoteIds,
  quizStats,
  dailyActivity,
  journalEntriesCount = 0,
  completedAudioLessonIds = [],
  totalAudioLessonsCount = 6,
  onSelectPhilosopher,
  onSelectTerm,
  onOpenQuiz,
  onOpenReflection,
  onNavigateAudio,
}) => {
  // Compute overall exploration metrics
  const totalPhilosophers = philosophers.length;
  const exploredPhilCount = exploredPhilosopherIds.length;
  const philPercentage = Math.round((exploredPhilCount / totalPhilosophers) * 100);

  const totalTerms = terms.length;
  const exploredTermCount = exploredTermIds.length;
  const termPercentage = Math.round((exploredTermCount / totalTerms) * 100);

  const audioCount = completedAudioLessonIds.length;
  const audioPercentage = totalAudioLessonsCount > 0 ? Math.round((audioCount / totalAudioLessonsCount) * 100) : 0;

  const totalPossiblePoints = totalPhilosophers + totalTerms + totalAudioLessonsCount * 3 + 12;
  const currentPoints =
    exploredPhilCount +
    exploredTermCount +
    favoriteQuoteIds.length +
    audioCount * 3 +
    quizStats.completed * 2 +
    (journalEntriesCount || 0) * 2;
  const overallMastery = Math.min(100, Math.round((currentPoints / totalPossiblePoints) * 100));

  // Determine wisdom title based on mastery
  const wisdomRank = useMemo(() => {
    if (overallMastery >= 85) return { title: 'Majstor Kosmosa i Agore', subtitle: 'Postigli ste najviši stepen filozofskog razumevanja' };
    if (overallMastery >= 65) return { title: 'Filozofski Mislilac', subtitle: 'Duboko vladate etikom, logikom i egzistencijalizmom' };
    if (overallMastery >= 45) return { title: 'Stoički Praktikant', subtitle: 'Aktivno primenjujete ataraksiju i vrlinu uma' };
    if (overallMastery >= 25) return { title: 'Učenik u Likeju', subtitle: 'Redovno istražujete učenja velikih mislilaca' };
    return { title: 'Radoznali Posmatrač', subtitle: 'Vaše putovanje kroz antičku i modernu mudrost tek počinje' };
  }, [overallMastery]);

  // Last 7 days chart data
  const chartDays = useMemo(() => {
    const days = [];
    const dayNames = ['Ned', 'Pon', 'Uto', 'Sre', 'Čet', 'Pet', 'Sub'];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      const count = dailyActivity[key] || 0;
      days.push({
        date: key,
        dayName: dayNames[d.getDay()],
        count: count,
        isToday: i === 0,
      });
    }
    return days;
  }, [dailyActivity]);

  const maxDailyCount = Math.max(1, ...chartDays.map((d) => d.count));

  // School breakdown
  const categoryBreakdown = useMemo(() => {
    return ERA_CATEGORIES.map((cat) => {
      const catPhil = philosophers.filter((p) => p.category === cat.id);
      const catTerms = terms.filter((t) => t.category === cat.id);
      const totalInCat = catPhil.length + catTerms.length;

      const exploredInCat =
        catPhil.filter((p) => exploredPhilosopherIds.includes(p.id)).length +
        catTerms.filter((t) => exploredTermIds.includes(t.id)).length;

      const percentage = totalInCat > 0 ? Math.round((exploredInCat / totalInCat) * 100) : 0;

      return {
        category: cat,
        total: totalInCat,
        explored: exploredInCat,
        percentage,
      };
    });
  }, [philosophers, terms, exploredPhilosopherIds, exploredTermIds]);

  // Achievements / Wisdom Badges
  const badges = [
    {
      id: 'b-sokrat',
      title: 'Sokratov Sagovornik',
      desc: 'Istraži 4 antička filozofa',
      unlocked: philosophers.filter((p) => p.category === 'antička' && exploredPhilosopherIds.includes(p.id)).length >= 4,
    },
    {
      id: 'b-stoic',
      title: 'Stoička Tvrđava',
      desc: 'Savladao učenja Marka Aurelija i Epikteta',
      unlocked: exploredPhilosopherIds.includes('marko-aurelije') && exploredPhilosopherIds.includes('epiktet'),
    },
    {
      id: 'b-niche',
      title: 'Tragač za Nišama',
      desc: 'Otkrio radikalne mislioce i paradokse (Majnlender, Sioran, Zapfe, Zenon)',
      unlocked: exploredPhilosopherIds.some((id) => ['mainlander', 'zenon-elejski', 'hrisip', 'bataj', 'cioran', 'zapffe', 'pyrrho', 'bruno'].includes(id)),
    },
    {
      id: 'b-terms',
      title: 'Poliglota Pojmova',
      desc: 'Istražio i savladao 6 ili više filozofskih pojmova',
      unlocked: exploredTermIds.length >= 6,
    },
    {
      id: 'b-quotes',
      title: 'Čuvar Mudrosti',
      desc: 'Sačuvao 3 ili više omiljenih citata u riznici',
      unlocked: favoriteQuoteIds.length >= 3,
    },
    {
      id: 'b-quiz',
      title: 'Mudra Glava Kvizova',
      desc: 'Osvoji preko 6 poena na kvizu znanja',
      unlocked: quizStats.highScore >= 6,
    },
    {
      id: 'b-journal',
      title: 'Filozofski Dnevničar',
      desc: 'Zapisao bar jedan unos u svoj lični filozofski dnevnik',
      unlocked: (journalEntriesCount || 0) >= 1,
    },
    {
      id: 'b-audio',
      title: 'Slušalac sa Slušalicama',
      desc: 'Odslušao filozofsko predavanje uz binauralni ambijentalni zvuk',
      unlocked: audioCount >= 1,
    },
  ];

  // Recommended next item
  const nextUnexploredPhil = philosophers.find((p) => !exploredPhilosopherIds.includes(p.id));
  const nextUnexploredTerm = terms.find((t) => !exploredTermIds.includes(t.id));

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div>
        <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
          Napredak Učenja
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
          Prati svoju aktivnost, savladane koncepte i nivo filozofskog majstorstva.
        </p>
      </div>

      {/* Main Mastery Card */}
      <div className="rounded-3xl border border-stone-200 bg-linear-to-br from-amber-500/10 via-white to-stone-50 p-5 sm:p-6 dark:border-stone-800 dark:from-amber-950/20 dark:via-[#141519] dark:to-stone-950 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-600 text-white shadow-xs">
                <Brain className="h-4 w-4" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                Tvoj Filozofski Rang
              </span>
            </div>
            <h3 className="font-editorial text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
              {wisdomRank.title}
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 max-w-md">
              {wisdomRank.subtitle}
            </p>
          </div>

          {/* Circular progress visual */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative flex h-20 w-20 items-center justify-center">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-stone-200 dark:text-stone-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-amber-600 transition-all duration-700 ease-out"
                  strokeDasharray={`${overallMastery}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-base font-bold font-mono text-stone-900 dark:text-stone-100 tabular-nums">
                  {overallMastery}%
                </span>
                <span className="text-[9px] uppercase tracking-wider text-stone-400">Mudrost</span>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Core Quantitative KPIs */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-5 border-t border-stone-200/60 dark:border-stone-800/60">
          <div 
            onClick={onNavigateAudio}
            className={`rounded-xl border border-stone-200/80 bg-white p-3 dark:border-stone-800 dark:bg-[#18191f] ${
              onNavigateAudio ? 'cursor-pointer hover:border-amber-400 transition-colors' : ''
            }`}
          >
            <div className="flex items-center gap-1.5 text-stone-400 mb-1">
              <Headphones className="h-3.5 w-3.5 text-amber-600" />
              <span className="text-[10px] uppercase font-bold tracking-wider">Audio Lekcije</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold font-mono text-stone-900 dark:text-stone-100 tabular-nums">
                {audioCount}
              </span>
              <span className="text-xs text-stone-400">/ {totalAudioLessonsCount}</span>
            </div>
            <div className="w-full bg-stone-100 dark:bg-stone-800 h-1 rounded-full mt-2 overflow-hidden">
              <div className="bg-amber-600 h-full rounded-full" style={{ width: `${audioPercentage}%` }} />
            </div>
          </div>

          <div className="rounded-xl border border-stone-200/80 bg-white p-3 dark:border-stone-800 dark:bg-[#18191f]">
            <div className="flex items-center gap-1.5 text-stone-400 mb-1">
              <Users className="h-3.5 w-3.5 text-amber-600" />
              <span className="text-[10px] uppercase font-bold tracking-wider">Mislioci</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold font-mono text-stone-900 dark:text-stone-100 tabular-nums">
                {exploredPhilCount}
              </span>
              <span className="text-xs text-stone-400">/ {totalPhilosophers}</span>
            </div>
            <div className="w-full bg-stone-100 dark:bg-stone-800 h-1 rounded-full mt-2 overflow-hidden">
              <div className="bg-amber-600 h-full rounded-full" style={{ width: `${philPercentage}%` }} />
            </div>
          </div>

          <div className="rounded-xl border border-stone-200/80 bg-white p-3 dark:border-stone-800 dark:bg-[#18191f]">
            <div className="flex items-center gap-1.5 text-stone-400 mb-1">
              <BookOpen className="h-3.5 w-3.5 text-amber-600" />
              <span className="text-[10px] uppercase font-bold tracking-wider">Pojmovnik</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold font-mono text-stone-900 dark:text-stone-100 tabular-nums">
                {exploredTermCount}
              </span>
              <span className="text-xs text-stone-400">/ {totalTerms}</span>
            </div>
            <div className="w-full bg-stone-100 dark:bg-stone-800 h-1 rounded-full mt-2 overflow-hidden">
              <div className="bg-amber-600 h-full rounded-full" style={{ width: `${termPercentage}%` }} />
            </div>
          </div>

          <div className="rounded-xl border border-stone-200/80 bg-white p-3 dark:border-stone-800 dark:bg-[#18191f]">
            <div className="flex items-center gap-1.5 text-stone-400 mb-1">
              <QuoteIcon className="h-3.5 w-3.5 text-amber-600" />
              <span className="text-[10px] uppercase font-bold tracking-wider">Citati</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold font-mono text-stone-900 dark:text-stone-100 tabular-nums">
                {favoriteQuoteIds.length}
              </span>
              <span className="text-xs text-stone-400">omiljenih</span>
            </div>
            <span className="text-[10px] text-stone-500 block mt-1">
              {exploredQuoteIds.length} saslušano
            </span>
          </div>

          <div className="rounded-xl border border-stone-200/80 bg-white p-3 dark:border-stone-800 dark:bg-[#18191f]">
            <div className="flex items-center gap-1.5 text-stone-400 mb-1">
              <Award className="h-3.5 w-3.5 text-amber-600" />
              <span className="text-[10px] uppercase font-bold tracking-wider">Kviz</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold font-mono text-stone-900 dark:text-stone-100 tabular-nums">
                {quizStats.highScore}
              </span>
              <span className="text-xs text-stone-400">/ 8 rekord</span>
            </div>
            <span className="text-[10px] text-stone-500 block mt-1">
              {quizStats.completed} rešeno
            </span>
          </div>

          <div 
            onClick={onOpenReflection}
            className={`rounded-xl border border-stone-200/80 bg-white p-3 dark:border-stone-800 dark:bg-[#18191f] ${
              onOpenReflection ? 'cursor-pointer hover:border-amber-400 transition-colors' : ''
            }`}
          >
            <div className="flex items-center gap-1.5 text-stone-400 mb-1">
              <Feather className="h-3.5 w-3.5 text-amber-600" />
              <span className="text-[10px] uppercase font-bold tracking-wider">Dnevnik</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold font-mono text-stone-900 dark:text-stone-100 tabular-nums">
                {journalEntriesCount}
              </span>
              <span className="text-xs text-stone-400">zapisa</span>
            </div>
            <span className="text-[10px] text-amber-700 dark:text-amber-400 block mt-1 font-medium">
              Refleksije
            </span>
          </div>
        </div>
      </div>

      {/* Engagement Activity Chart over Time */}
      <div className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-[#15161a] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <h3 className="font-editorial text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100">
              Aktivnost u poslednjih 7 dana
            </h3>
          </div>
          <div className="flex items-center gap-1 text-xs text-amber-700 dark:text-amber-400 font-semibold">
            <Flame className="h-4 w-4 fill-amber-500 text-amber-500" />
            <span>Redovno učenje</span>
          </div>
        </div>

        {/* Vector Bar Chart */}
        <div className="pt-2">
          <div className="flex items-end justify-between gap-2 h-36 border-b border-stone-200 dark:border-stone-800 pb-2">
            {chartDays.map((d, idx) => {
              const heightPercent = Math.max(12, Math.round((d.count / maxDailyCount) * 100));
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[10px] font-mono text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity tabular-nums">
                    {d.count}
                  </span>
                  <div
                    className={`w-full max-w-[28px] rounded-t-lg transition-all duration-300 ${
                      d.isToday
                        ? 'bg-amber-600 dark:bg-amber-500 shadow-xs'
                        : 'bg-stone-200 hover:bg-amber-400 dark:bg-stone-800 dark:hover:bg-amber-600'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                  <span className={`text-[11px] font-medium ${d.isToday ? 'font-bold text-amber-700 dark:text-amber-400' : 'text-stone-500'}`}>
                    {d.dayName}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-[11px] text-stone-400 mt-2 text-right">
            Ukupno interakcija ove nedelje: <span className="font-bold font-mono text-stone-700 dark:text-stone-300 tabular-nums">{chartDays.reduce((acc, c) => acc + c.count, 0)}</span>
          </p>
        </div>
      </div>

      {/* School Mastery Breakdown */}
      <div className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-[#15161a] shadow-xs space-y-4">
        <h3 className="font-editorial text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <Compass className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          Istraženost po pravcima i tradicijama
        </h3>

        <div className="space-y-3">
          {categoryBreakdown.map((item) => (
            <div key={item.category.id} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-800 dark:text-stone-200">
                  {item.category.label}
                </span>
                <span className="font-mono text-stone-500 text-[11px] tabular-nums">
                  {item.explored} / {item.total} ({item.percentage}%)
                </span>
              </div>
              <div className="w-full bg-stone-100 dark:bg-stone-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-600 dark:bg-amber-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wisdom Badges Grid */}
      <div className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-[#15161a] shadow-xs space-y-4">
        <h3 className="font-editorial text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          Filozofska Priznanja (Zvanja)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`rounded-xl border p-3.5 flex items-start gap-3 transition-colors ${
                b.unlocked
                  ? 'border-amber-300 bg-amber-50/60 dark:border-amber-900/60 dark:bg-amber-950/20'
                  : 'border-stone-200 bg-stone-50/50 dark:border-stone-800 dark:bg-stone-900/30 opacity-70'
              }`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  b.unlocked
                    ? 'bg-amber-600 text-white shadow-2xs'
                    : 'bg-stone-200 dark:bg-stone-800 text-stone-400'
                }`}
              >
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-stone-900 dark:text-stone-100 block">
                  {b.title}
                </span>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                  {b.desc}
                </p>
                <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-400 block mt-1">
                  {b.unlocked ? '✓ Otključano' : 'Zaključano'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Next Step for Learning */}
      <div className="rounded-2xl border border-amber-300/80 bg-amber-500/10 p-5 dark:border-amber-800/60 dark:bg-amber-950/30 space-y-3">
        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
          Preporuka za sledeći korak
        </span>
        <h4 className="font-editorial text-lg font-bold text-stone-900 dark:text-stone-100">
          Produbi svoje razumevanje
        </h4>
        <div className="flex flex-col sm:flex-row gap-2.5">
          {nextUnexploredPhil && (
            <button
              onClick={() => onSelectPhilosopher(nextUnexploredPhil)}
              className="flex-1 rounded-xl border border-stone-200 bg-white p-3 text-left hover:border-amber-500 dark:border-stone-800 dark:bg-[#18191f] transition-all flex items-center justify-between"
            >
              <div>
                <span className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold block">
                  Neistraženi mislilac
                </span>
                <span className="font-editorial text-sm font-bold text-stone-900 dark:text-stone-100">
                  {nextUnexploredPhil.name}
                </span>
              </div>
              <ArrowRight className="h-4 w-4 text-stone-400" />
            </button>
          )}

          {nextUnexploredTerm && (
            <button
              onClick={() => onSelectTerm(nextUnexploredTerm)}
              className="flex-1 rounded-xl border border-stone-200 bg-white p-3 text-left hover:border-amber-500 dark:border-stone-800 dark:bg-[#18191f] transition-all flex items-center justify-between"
            >
              <div>
                <span className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold block">
                  Novi pojam
                </span>
                <span className="font-editorial text-sm font-bold text-stone-900 dark:text-stone-100">
                  {nextUnexploredTerm.term}
                </span>
              </div>
              <ArrowRight className="h-4 w-4 text-stone-400" />
            </button>
          )}

          <button
            onClick={onOpenQuiz}
            className="flex-1 rounded-xl bg-amber-700 p-3 text-white text-center font-semibold text-xs hover:bg-amber-800 transition-colors flex items-center justify-center gap-1.5"
          >
            <Award className="h-4 w-4" />
            <span>Reši Kviz Znanja</span>
          </button>
        </div>
      </div>
    </div>
  );
};
