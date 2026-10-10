import React, { useState, useEffect } from 'react';
import { 
  X, 
  BookOpen, 
  Sparkles, 
  Feather, 
  Check, 
  Calendar, 
  Trash2, 
  RefreshCw, 
  Share2, 
  Smile, 
  Volume2,
  ChevronRight,
  History
} from 'lucide-react';
import { DailyReflectionPrompt, JournalEntry, ReflectionMood } from '../types/philosophy';
import { speakText } from '../utils/notifications';

interface DailyReflectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  prompt: DailyReflectionPrompt;
  todayEntry: JournalEntry | null;
  allEntries: JournalEntry[];
  onSaveEntry: (entry: {
    id?: string;
    date?: string;
    promptQuestion: string;
    promptContext: string;
    sourcePhilosopherName?: string;
    sourceTerm?: string;
    content: string;
    mood?: ReflectionMood;
  }) => void;
  onDeleteEntry: (id: string) => void;
  onShufflePrompt: () => void;
}

const MOODS: { id: ReflectionMood; label: string; emoji: string }[] = [
  { id: 'smiren', label: 'Smiren', emoji: '🌿' },
  { id: 'zahvalan', label: 'Zahvalan', emoji: '✨' },
  { id: 'dubok', label: 'Dubok', emoji: '🌊' },
  { id: 'borben', label: 'Borben', emoji: '⚔️' },
  { id: 'skeptičan', label: 'Skeptičan', emoji: '🦉' },
];

export const DailyReflectionModal: React.FC<DailyReflectionModalProps> = ({
  isOpen,
  onClose,
  prompt,
  todayEntry,
  allEntries,
  onSaveEntry,
  onDeleteEntry,
  onShufflePrompt,
}) => {
  const [activeView, setActiveView] = useState<'write' | 'history'>('write');
  const [text, setText] = useState<string>('');
  const [selectedMood, setSelectedMood] = useState<ReflectionMood>('smiren');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sync current entry if already exists
  useEffect(() => {
    if (todayEntry) {
      setText(todayEntry.content);
      if (todayEntry.mood) setSelectedMood(todayEntry.mood);
    } else {
      setText('');
      setSelectedMood('smiren');
    }
  }, [todayEntry, isOpen, prompt.id]);

  if (!isOpen) return null;

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  const handleSave = () => {
    if (!text.trim()) return;
    onSaveEntry({
      id: todayEntry ? todayEntry.id : undefined,
      promptQuestion: prompt.question,
      promptContext: prompt.philosophicalContext,
      sourcePhilosopherName: prompt.sourcePhilosopherName,
      sourceTerm: prompt.sourceTerm,
      content: text,
      mood: selectedMood,
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  const handleCopyEntry = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeakPrompt = () => {
    speakText(`${prompt.question}. ${prompt.philosophicalContext}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-3xl border border-stone-200 bg-[#fcfbf9] text-stone-900 shadow-2xl dark:border-stone-800 dark:bg-[#121317] dark:text-stone-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-600/15 text-amber-700 dark:text-amber-400">
              <Feather className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-editorial text-lg font-bold">
                Dnevna Filozofska Refleksija
              </h3>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                Lični dnevnik mudrosti sačuvan na tvom uređaju
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* View switch: Write vs History */}
            <button
              onClick={() => setActiveView(activeView === 'write' ? 'history' : 'write')}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                activeView === 'history'
                  ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300'
                  : 'text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800'
              }`}
              title="Istorija zapisa"
            >
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">
                {activeView === 'history' ? 'Pisanje' : `Zapisi (${allEntries.length})`}
              </span>
            </button>

            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {activeView === 'write' ? (
            <>
              {/* Daily Philosophical Prompt Box */}
              <div className="rounded-2xl border border-amber-300/80 bg-linear-to-br from-amber-500/10 via-amber-500/5 to-transparent p-4 sm:p-5 dark:border-amber-700/60 dark:from-amber-950/30 dark:via-stone-900 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-600 text-white shadow-2xs">
                      <Sparkles className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
                      Pitanje dana za promišljanje
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={handleSpeakPrompt}
                      className="flex h-7 w-7 items-center justify-center rounded-md text-stone-500 hover:bg-amber-200/50 dark:hover:bg-stone-800 transition-colors"
                      title="Poslušaj pitanje"
                    >
                      <Volume2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={onShufflePrompt}
                      className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold text-amber-800 hover:bg-amber-200/50 dark:text-amber-300 dark:hover:bg-stone-800 transition-colors"
                      title="Zameni sa drugim filozofskim pitanjem"
                    >
                      <RefreshCw className="h-3 w-3" />
                      <span>Drugo pitanje</span>
                    </button>
                  </div>
                </div>

                <h4 className="font-editorial text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 leading-snug">
                  „{prompt.question}“
                </h4>

                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 italic border-l-2 border-amber-400 pl-3 py-0.5">
                  {prompt.philosophicalContext}
                </p>

                {prompt.suggestedAction && (
                  <div className="text-[11px] font-medium text-amber-900 dark:text-amber-200/90 flex items-center gap-1.5 pt-1">
                    <span>💡 Predlog za kontemplaciju:</span>
                    <span className="font-semibold">{prompt.suggestedAction}</span>
                  </div>
                )}
              </div>

              {/* Mood / Tone Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                  <Smile className="h-3.5 w-3.5" />
                  <span>Kakav ti je unutrašnji ton dok pišeš?</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {MOODS.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSelectedMood(m.id)}
                      className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                        selectedMood === m.id
                          ? 'bg-amber-600 text-white shadow-xs font-semibold scale-105'
                          : 'border border-stone-200 bg-white text-stone-700 hover:border-amber-400 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300'
                      }`}
                    >
                      <span>{m.emoji}</span>
                      <span>{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Reflection Journal Text Area */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    Tvoj Zapis u Dnevniku
                  </label>
                  <span className="text-[11px] font-mono text-stone-400 tabular-nums">
                    {wordCount} reči · {charCount} karaktera
                  </span>
                </div>

                <div className="relative">
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={7}
                    placeholder="Piši iskreno i bez cenzure. Šta ti je donelo mir, šta te je poljuljalo, i šta si iz toga naučio..."
                    className="w-full rounded-2xl border border-stone-300 bg-amber-50/20 p-4 font-sans text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-600 focus:outline-none dark:border-stone-700 dark:bg-stone-900/40 dark:text-stone-100 dark:placeholder:text-stone-500 leading-relaxed transition-all shadow-inner"
                  />
                </div>
              </div>
            </>
          ) : (
            /* History of Journal Entries */
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
                <h4 className="font-editorial text-base sm:text-lg font-bold">
                  Svi tvoji filozofski zapisi ({allEntries.length})
                </h4>
                <button
                  onClick={() => setActiveView('write')}
                  className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
                >
                  <span>Napiši novi zapis</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {allEntries.length === 0 ? (
                <div className="text-center py-12 text-stone-400">
                  <BookOpen className="h-10 w-10 mx-auto stroke-1 opacity-50 mb-2" />
                  <p className="text-sm">Još uvek nema sačuvanih unosa.</p>
                  <p className="text-xs text-stone-500 mt-1">
                    Odgovori na današnje pitanje i započni svoju zbirku misli.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {allEntries.map((entry) => {
                    const moodObj = MOODS.find((m) => m.id === entry.mood);
                    return (
                      <div
                        key={entry.id}
                        className="rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900 shadow-2xs space-y-2.5 transition-all"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 text-stone-400">
                            <Calendar className="h-3.5 w-3.5" />
                            <span className="font-mono text-[11px] font-semibold text-stone-600 dark:text-stone-300">
                              {entry.date}
                            </span>
                            {moodObj && (
                              <span className="rounded-full bg-stone-100 dark:bg-stone-800 px-2 py-0.5 text-[10px] font-medium text-stone-700 dark:text-stone-300">
                                {moodObj.emoji} {moodObj.label}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleCopyEntry(entry.content, entry.id)}
                              className="flex h-7 w-7 items-center justify-center rounded-lg text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-600"
                              title="Kopiraj zapis"
                            >
                              {copiedId === entry.id ? (
                                <Check className="h-3.5 w-3.5 text-emerald-600" />
                              ) : (
                                <Share2 className="h-3.5 w-3.5" />
                              )}
                            </button>
                            <button
                              onClick={() => onDeleteEntry(entry.id)}
                              className="flex h-7 w-7 items-center justify-center rounded-lg text-stone-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600"
                              title="Obriši zapis"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="rounded-lg bg-stone-50 dark:bg-stone-800/60 p-2.5 text-xs text-stone-600 dark:text-stone-300 font-serif italic border-l-2 border-amber-500">
                          „{entry.promptQuestion}“
                        </div>

                        <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 whitespace-pre-line leading-relaxed">
                          {entry.content}
                        </p>

                        <div className="pt-1 text-[10px] text-stone-400 text-right">
                          {entry.wordCount} reči
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Bottom Action Footer */}
        {activeView === 'write' && (
          <div className="flex items-center justify-between p-4 px-6 border-t border-stone-200 bg-stone-50 dark:border-stone-800 dark:bg-stone-900/60">
            <span className="text-[11px] text-stone-500 dark:text-stone-400">
              {todayEntry ? 'Ažuriraš današnji unos' : 'Zapis se čuva u memoriji telefona'}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-200/60 dark:text-stone-300 dark:hover:bg-stone-800 transition-colors"
              >
                Odustani
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={!text.trim()}
                className={`flex items-center gap-1.5 rounded-xl px-5 py-2 text-xs font-semibold text-white shadow-xs transition-all ${
                  text.trim()
                    ? 'bg-amber-700 hover:bg-amber-800 cursor-pointer'
                    : 'bg-stone-300 dark:bg-stone-800 text-stone-400 cursor-not-allowed'
                }`}
              >
                {savedSuccess ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Sačuvano!</span>
                  </>
                ) : (
                  <>
                    <Feather className="h-4 w-4" />
                    <span>{todayEntry ? 'Sačuvaj izmene' : 'Zapiši u Dnevnik'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
