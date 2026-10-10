import React, { useState } from 'react';
import {
  Headphones,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Clock,
  Sparkles,
  CheckCircle2,
  BookOpen,
  Feather,
  Sliders,
  Moon,
  ListMusic,
  ArrowRight,
  Eye,
  EyeOff,
  Radio,
  Compass
} from 'lucide-react';
import {
  AudioLesson,
  EraCategory,
  HeadphoneAmbienceMode,
  Philosopher,
  PhilosophicalTerm
} from '../types/philosophy';
import { LectureProgress, lectureSpeechController } from '../utils/audioLecturesEngine';

interface AudioLessonsTabProps {
  audioLessons: AudioLesson[];
  completedAudioLessonIds: string[];
  activeAudioLesson: AudioLesson | null;
  isPlaying: boolean;
  isPaused: boolean;
  progress: LectureProgress | null;
  ambienceMode: HeadphoneAmbienceMode;
  ambienceVolume: number;
  speechRate: number;
  sleepTimerMinutes: number | null;
  sleepTimerRemainingSec: number | null;
  onPlayLesson: (lesson: AudioLesson, fromSectionIndex?: number) => void;
  onPauseLesson: () => void;
  onResumeLesson: () => void;
  onStopLesson: () => void;
  onSkipForward: () => void;
  onSkipBackward: () => void;
  onSeekSection: (sectionIndex: number) => void;
  onSetAmbienceMode: (mode: HeadphoneAmbienceMode) => void;
  onSetAmbienceVolume: (vol: number) => void;
  onSetSpeechRate: (rate: number) => void;
  onSetSleepTimer: (minutes: number | null) => void;
  onMarkCompleted: (lessonId: string) => void;
  onSelectPhilosopherById?: (id: string) => void;
  onSelectTermById?: (id: string) => void;
  onOpenReflection?: (context?: { question: string; context: string; sourcePhil?: string }) => void;
}

const AMBIENCE_OPTIONS: { id: HeadphoneAmbienceMode; label: string; icon: string; desc: string }[] = [
  {
    id: 'binaural_theta',
    label: '432 Hz Binaural (Theta)',
    icon: '🌌',
    desc: 'Binauralni talas od 6Hz za duboko smirenje uma i fokus kroz slušalice',
  },
  {
    id: 'agora_wind',
    label: 'Atinska agora & Povetarac',
    icon: '🏛️',
    desc: 'Blagi vetar i akustika antičkog peristila među maslinama',
  },
  {
    id: 'rain_library',
    label: 'Kiša u Aleksandrijskoj biblioteci',
    icon: '🌧️',
    desc: 'Umirujući zvuk kapljica kiše uz drvene police rukopisa',
  },
  {
    id: 'temple_silence',
    label: 'Tišina i harmonici hrama',
    icon: '🕯️',
    desc: 'Duboki rezonantni ton za večernju kontemplaciju',
  },
  {
    id: 'none',
    label: 'Isključen ambijent',
    icon: '🔇',
    desc: 'Samo čist glas predavača bez pozadinskih frekvencija',
  },
];

const SLEEP_TIMER_OPTIONS = [
  { label: 'Isključen', value: null },
  { label: '5 min', value: 5 },
  { label: '10 min', value: 10 },
  { label: '15 min', value: 15 },
  { label: '30 min', value: 30 },
  { label: '45 min', value: 45 },
];

export const AudioLessonsTab: React.FC<AudioLessonsTabProps> = ({
  audioLessons,
  completedAudioLessonIds,
  activeAudioLesson,
  isPlaying,
  isPaused,
  progress,
  ambienceMode,
  ambienceVolume,
  speechRate,
  sleepTimerMinutes,
  sleepTimerRemainingSec,
  onPlayLesson,
  onPauseLesson,
  onResumeLesson,
  onStopLesson,
  onSkipForward,
  onSkipBackward,
  onSeekSection,
  onSetAmbienceMode,
  onSetAmbienceVolume,
  onSetSpeechRate,
  onSetSleepTimer,
  onMarkCompleted,
  onSelectPhilosopherById,
  onSelectTermById,
  onOpenReflection,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isZenMode, setIsZenMode] = useState<boolean>(false);
  const [showSettingsDrawer, setShowSettingsDrawer] = useState<boolean>(false);
  const [selectedVoice, setSelectedVoice] = useState<string>(() => lectureSpeechController.getSelectedVoiceName());
  const availableVoices = lectureSpeechController.getAvailableVoices();

  const categories = [
    { id: 'all', label: 'Sve lekcije' },
    { id: 'stoicizam', label: 'Stoicizam' },
    { id: 'antička', label: 'Antička mudrost' },
    { id: 'egzistencijalizam', label: 'Egzistencijalizam' },
    { id: 'istočna', label: 'Istočna misao' },
    { id: 'nise_i_paradoksi', label: 'Misaoni paradoksi' },
  ];

  const filteredLessons = audioLessons.filter(
    (l) => selectedCategory === 'all' || l.category === selectedCategory
  );

  const currentLesson = activeAudioLesson || audioLessons[0];
  const isCurrentActivePlaying = isPlaying && activeAudioLesson?.id === currentLesson?.id;
  const isCurrentActivePaused = isPaused && activeAudioLesson?.id === currentLesson?.id;

  const currentSectionIdx = progress?.sectionIndex ?? 0;
  const activeSection = currentLesson?.sections[currentSectionIdx] || currentLesson?.sections[0];

  const formatSeconds = (sec: number | null) => {
    if (sec === null) return '';
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Headphone Audio Masterclass Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-amber-950/90 to-stone-900 p-6 text-white shadow-xl border border-amber-800/40">
        <div className="absolute -top-12 -right-12 h-44 w-44 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-orange-600/10 blur-2xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300 border border-amber-500/30">
              <Headphones className="h-3.5 w-3.5 animate-pulse text-amber-400" />
              <span>Optimizovano za slušalice i unutrašnji mir</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-white">
              Filozofska Audio Predavanja
            </h1>
            <p className="text-sm text-stone-300 leading-relaxed">
              Zatvorite oči, stavite slušalice i prepustite se dubokim lekcijama o životu, slobodi i
              nepokolebljivosti. Sa prostornim binauralnim zvukom (432 Hz) i atmosferom antičkog hrama.
            </p>
          </div>

          {/* Quick Headphone Stat Pill */}
          <div className="flex sm:flex-col items-center justify-between sm:justify-center bg-stone-900/80 backdrop-blur-md rounded-2xl p-4 border border-stone-800 shrink-0">
            <div className="text-center">
              <span className="block text-2xl font-bold font-serif text-amber-400 tabular-nums">
                {completedAudioLessonIds.length} / {audioLessons.length}
              </span>
              <span className="text-[11px] font-medium text-stone-400 uppercase tracking-wider">
                Odslušano lekcija
              </span>
            </div>
            {sleepTimerRemainingSec !== null && (
              <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-800/40">
                <Moon className="h-3 w-3" />
                <span>Tajmer: {formatSeconds(sleepTimerRemainingSec)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ACTIVE IMMERSIVE PLAYER CARD */}
      {currentLesson && (
        <div className="rounded-3xl border border-stone-200/90 bg-white p-5 sm:p-7 shadow-lg dark:border-stone-800 dark:bg-stone-900/90 transition-all">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300 shadow-inner">
                <Headphones className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  {currentLesson.categoryLabel} • {currentLesson.durationMinutes} min
                </span>
                <h2 className="text-lg sm:text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
                  {currentLesson.title}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsZenMode(!isZenMode)}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-colors ${
                  isZenMode
                    ? 'bg-amber-600 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300'
                }`}
                title="Zen režim bez ometanja za slušanje sa zatvorenim očima"
              >
                {isZenMode ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                <span className="hidden sm:inline">Zen režim</span>
              </button>

              <button
                onClick={() => setShowSettingsDrawer(!showSettingsDrawer)}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-colors ${
                  showSettingsDrawer
                    ? 'bg-stone-800 text-white dark:bg-stone-700'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300'
                }`}
                title="Podešavanje ambijenta za slušalice, brzine i tajmera"
              >
                <Sliders className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Ambijent & Zvuk</span>
              </button>
            </div>
          </div>

          {/* Sound Ambience Drawer */}
          {showSettingsDrawer && (
            <div className="mb-6 rounded-2xl bg-stone-50 p-4 sm:p-5 border border-stone-200/80 dark:bg-stone-950 dark:border-stone-800 animate-slide-down space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <Radio className="h-4 w-4 text-amber-600" />
                  Pozadinska atmosfera za slušalice
                </h3>
                <span className="text-xs text-stone-500">Web Audio sintetizator</span>
              </div>

              {/* Ambience Modes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {AMBIENCE_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => onSetAmbienceMode(opt.id)}
                    className={`flex items-start gap-2.5 p-3 rounded-xl border text-left transition-all ${
                      ambienceMode === opt.id
                        ? 'border-amber-600 bg-amber-500/10 text-amber-900 dark:text-amber-200 font-medium'
                        : 'border-stone-200 bg-white hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-900 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <span className="text-xl shrink-0">{opt.icon}</span>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold">{opt.label}</div>
                      <div className="text-[10px] text-stone-500 dark:text-stone-400 line-clamp-2 leading-snug">
                        {opt.desc}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Voice Selection & Clarity */}
              <div className="space-y-1.5 pt-2 border-t border-stone-200/60 dark:border-stone-800 mb-4">
                <div className="flex justify-between items-center text-xs text-stone-600 dark:text-stone-400">
                  <span className="font-semibold text-stone-800 dark:text-stone-200">Izbor glasa za predavanje (Srpski / Jezici):</span>
                  <button
                    onClick={() => lectureSpeechController.testVoice(selectedVoice)}
                    className="text-amber-600 dark:text-amber-400 hover:underline font-semibold flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/20"
                  >
                    <span>🔊 Testiraj glas</span>
                  </button>
                </div>
                <select
                  value={selectedVoice}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSelectedVoice(val);
                    lectureSpeechController.setSelectedVoice(val);
                  }}
                  className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-xs text-stone-900 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 shadow-sm"
                >
                  <option value="">Automatski (Preporučeni srpski / evropski glas)</option>
                  {availableVoices.map((v) => (
                    <option key={v.name} value={v.name}>
                      {v.name} ({v.lang}) {v.default ? '⭐' : ''}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-stone-500 dark:text-stone-400">
                  Ako se glas ne čuje jasno ili zvuči strano, izaberite drugi glas sa liste (npr. hrvatski, bosanski ili evropski). Brzina je podešena na 0.90x za kristalno jasnu dikciju.
                </p>
              </div>

              {/* Sliders: Ambience Volume & Speech Rate & Sleep Timer */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-stone-200/60 dark:border-stone-800">
                {/* Ambience Volume */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-stone-600 dark:text-stone-400">
                    <span>Glasnoća ambijenta:</span>
                    <span className="font-semibold text-stone-800 dark:text-stone-200">
                      {Math.round(ambienceVolume * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={ambienceVolume}
                    onChange={(e) => onSetAmbienceVolume(parseFloat(e.target.value))}
                    className="w-full accent-amber-600"
                  />
                </div>

                {/* Speech rate */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-stone-600 dark:text-stone-400">
                    <span>Brzina naratora:</span>
                    <span className="font-semibold text-stone-800 dark:text-stone-200">
                      {speechRate}x
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {[0.8, 1.0, 1.25, 1.5].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => onSetSpeechRate(rate)}
                        className={`flex-1 py-1 rounded-lg text-xs font-medium border transition-colors ${
                          speechRate === rate
                            ? 'bg-amber-600 text-white border-amber-600 font-bold'
                            : 'border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900 text-stone-700 dark:text-stone-300'
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sleep timer */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-stone-600 dark:text-stone-400">
                    <span>Tajmer za spavanje:</span>
                    <span className="font-semibold text-amber-600 dark:text-amber-400">
                      {sleepTimerMinutes ? `${sleepTimerMinutes}m` : 'Isključen'}
                    </span>
                  </div>
                  <div className="flex gap-1 overflow-x-auto pb-1">
                    {SLEEP_TIMER_OPTIONS.map((opt) => (
                      <button
                        key={String(opt.value)}
                        onClick={() => onSetSleepTimer(opt.value)}
                        className={`px-2 py-1 rounded-lg text-[11px] whitespace-nowrap font-medium border transition-colors ${
                          sleepTimerMinutes === opt.value
                            ? 'bg-amber-600 text-white border-amber-600 font-bold'
                            : 'border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900 text-stone-700 dark:text-stone-300'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Zen Contemplation Mode Visualizer */}
          {isZenMode && (
            <div className="mb-6 rounded-2xl bg-gradient-to-b from-stone-950 to-stone-900 p-8 text-center text-white border border-stone-800 shadow-inner flex flex-col items-center justify-center">
              <div className="relative mb-4 flex h-24 w-24 items-center justify-center">
                <div
                  className={`absolute inset-0 rounded-full border border-amber-500/20 ${
                    isCurrentActivePlaying ? 'animate-ping opacity-30' : 'opacity-10'
                  }`}
                />
                <div
                  className={`absolute h-20 w-20 rounded-full bg-amber-500/10 blur-md ${
                    isCurrentActivePlaying ? 'scale-110' : 'scale-90'
                  } transition-transform duration-1000`}
                />
                <Headphones className="relative z-10 h-10 w-10 text-amber-400" />
              </div>
              <h3 className="text-lg font-serif font-bold text-amber-200 mb-1">
                {activeSection?.title || currentLesson.title}
              </h3>
              <p className="text-xs text-stone-400 max-w-md italic">
                Zatvorite oči i usmerite pažnju na dah. Neka vas glas i ambijent vode kroz misli.
              </p>
            </div>
          )}

          {/* Section Selector Tabs */}
          <div className="mb-5 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {currentLesson.sections.map((sec, idx) => {
              const isSecActive = currentSectionIdx === idx;
              return (
                <button
                  key={sec.id}
                  onClick={() => {
                    if (activeAudioLesson?.id === currentLesson.id) {
                      onSeekSection(idx);
                    } else {
                      onPlayLesson(currentLesson, idx);
                    }
                  }}
                  className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium whitespace-nowrap transition-all border ${
                    isSecActive
                      ? 'border-amber-600 bg-amber-600 text-white font-semibold shadow-sm'
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300'
                  }`}
                >
                  <span>{sec.title}</span>
                </button>
              );
            })}
          </div>

          {/* Narration Live Content Box with Quote Highlight */}
          {activeSection && !isZenMode && (
            <div className="mb-6 rounded-2xl bg-[#faf8f5] dark:bg-stone-950 p-5 border border-stone-200/70 dark:border-stone-800/80 space-y-4">
              {activeSection.quoteHighlight && (
                <div className="border-l-4 border-amber-600 pl-4 py-1 italic font-serif text-sm text-amber-950 dark:text-amber-200 bg-amber-500/5 rounded-r-xl">
                  {activeSection.quoteHighlight}
                </div>
              )}

              <p className="text-sm sm:text-base text-stone-800 dark:text-stone-200 leading-relaxed font-sans">
                {activeSection.text}
              </p>

              {progress?.currentSentenceText && isCurrentActivePlaying && (
                <div className="text-xs text-amber-800 dark:text-amber-300 bg-amber-500/10 px-3 py-2 rounded-xl border border-amber-500/20 flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-amber-600 animate-ping" />
                  <span className="font-medium italic line-clamp-1">
                    „{progress.currentSentenceText}“
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Player Timeline Progress */}
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-xs text-stone-500 dark:text-stone-400 font-medium">
              <span>Sekcija {currentSectionIdx + 1} od {currentLesson.sections.length}</span>
              <span>{progress?.progressPercent ? `${progress.progressPercent}% završeno` : 'Spremno za slušanje'}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800">
              <div
                className="h-full bg-gradient-to-r from-amber-600 to-amber-500 transition-all duration-300 rounded-full"
                style={{ width: `${progress?.progressPercent || 0}%` }}
              />
            </div>
          </div>

          {/* Big Interactive Audio Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-stone-100 dark:border-stone-800">
            <div className="flex items-center gap-3">
              {/* Skip backward 15s */}
              <button
                onClick={onSkipBackward}
                disabled={!isCurrentActivePlaying && !isCurrentActivePaused}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300 disabled:opacity-40 transition-colors"
                title="Premotaj unazad"
              >
                <RotateCcw className="h-5 w-5" />
              </button>

              {/* Main Play / Pause Button */}
              {isCurrentActivePlaying ? (
                <button
                  onClick={onPauseLesson}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-600 text-white hover:bg-amber-700 shadow-md transition-transform active:scale-95"
                  title="Pauziraj predavanje"
                >
                  <Pause className="h-6 w-6 fill-current" />
                </button>
              ) : isCurrentActivePaused ? (
                <button
                  onClick={onResumeLesson}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-600 text-white hover:bg-amber-700 shadow-md transition-transform active:scale-95"
                  title="Nastavi predavanje"
                >
                  <Play className="h-6 w-6 fill-current ml-0.5" />
                </button>
              ) : (
                <button
                  onClick={() => onPlayLesson(currentLesson)}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-600 text-white hover:bg-amber-700 shadow-md transition-transform active:scale-95"
                  title="Pokreni predavanje"
                >
                  <Play className="h-6 w-6 fill-current ml-0.5" />
                </button>
              )}

              {/* Skip forward 15s */}
              <button
                onClick={onSkipForward}
                disabled={!isCurrentActivePlaying && !isCurrentActivePaused}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300 disabled:opacity-40 transition-colors"
                title="Premotaj unapred"
              >
                <RotateCw className="h-5 w-5" />
              </button>
            </div>

            {/* Complete / Journal Trigger Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onMarkCompleted(currentLesson.id)}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-colors ${
                  completedAudioLessonIds.includes(currentLesson.id)
                    ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300'
                }`}
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>
                  {completedAudioLessonIds.includes(currentLesson.id)
                    ? 'Odslušano'
                    : 'Označi kao poslušano'}
                </span>
              </button>

              {onOpenReflection && (
                <button
                  onClick={() =>
                    onOpenReflection({
                      question: currentLesson.reflectionQuestion,
                      context: `Iz audio lekcije: „${currentLesson.title}“`,
                      sourcePhil: currentLesson.associatedPhilosopherNames[0],
                    })
                  }
                  className="flex items-center gap-1.5 rounded-xl bg-amber-500/10 px-3.5 py-2 text-xs font-semibold text-amber-900 hover:bg-amber-500/20 dark:text-amber-200 border border-amber-500/30 transition-colors"
                >
                  <Feather className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <span>Dnevnik refleksije</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FILTER CATEGORIES TABS */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === cat.id
                ? 'bg-amber-700 text-white dark:bg-amber-600 shadow-sm'
                : 'bg-stone-200/70 text-stone-700 hover:bg-stone-300/80 dark:bg-stone-800 dark:text-stone-300'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* ALL AUDIO LESSONS CATALOG */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredLessons.map((lesson) => {
          const isSelected = activeAudioLesson?.id === lesson.id;
          const isCompleted = completedAudioLessonIds.includes(lesson.id);
          const isPlayingThis = isPlaying && isSelected;

          return (
            <div
              key={lesson.id}
              className={`rounded-2xl border p-5 transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-amber-600/70 bg-amber-500/5 shadow-md dark:border-amber-500/50 dark:bg-amber-950/20'
                  : 'border-stone-200 bg-white hover:border-stone-300 dark:border-stone-800 dark:bg-stone-900'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                    {lesson.categoryLabel}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{lesson.durationMinutes} min</span>
                    {isCompleted && (
                      <span className="ml-1 inline-flex items-center text-emerald-600 dark:text-emerald-400" title="Odslušano">
                        <CheckCircle2 className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
                    {lesson.title}
                  </h3>
                  <p className="mt-1 text-xs text-stone-600 dark:text-stone-300 line-clamp-2">
                    {lesson.subtitle}
                  </p>
                </div>

                {/* Key takeaways bullet points */}
                <div className="space-y-1 bg-stone-50 dark:bg-stone-950/60 p-2.5 rounded-xl border border-stone-200/50 dark:border-stone-800/60 text-[11px] text-stone-600 dark:text-stone-400">
                  {lesson.keyTakeaways.slice(0, 2).map((takeaway, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold">•</span>
                      <span className="line-clamp-1">{takeaway}</span>
                    </div>
                  ))}
                </div>

                {/* Related philosophers and terms badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {lesson.associatedPhilosopherNames.map((name, idx) => (
                    <button
                      key={name}
                      onClick={() => {
                        const pid = lesson.associatedPhilosopherIds[idx];
                        if (pid && onSelectPhilosopherById) onSelectPhilosopherById(pid);
                      }}
                      className="rounded-md bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 px-2 py-0.5 text-[10px] font-medium text-stone-700 dark:text-stone-300 transition-colors"
                    >
                      🏛️ {name}
                    </button>
                  ))}
                  {lesson.associatedTermNames.map((term, idx) => (
                    <button
                      key={term}
                      onClick={() => {
                        const tid = lesson.associatedTermIds[idx];
                        if (tid && onSelectTermById) onSelectTermById(tid);
                      }}
                      className="rounded-md bg-amber-500/10 hover:bg-amber-500/20 px-2 py-0.5 text-[10px] font-medium text-amber-800 dark:text-amber-300 transition-colors"
                    >
                      📖 {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="mt-5 pt-3 border-t border-stone-100 dark:border-stone-800/70 flex items-center justify-between">
                <span className="text-[11px] text-stone-500 italic">
                  {lesson.sections.length} poglavlja
                </span>

                <button
                  onClick={() => onPlayLesson(lesson)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold shadow-sm transition-all ${
                    isPlayingThis
                      ? 'bg-amber-600 text-white hover:bg-amber-700'
                      : 'bg-stone-900 text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white'
                  }`}
                >
                  {isPlayingThis ? (
                    <>
                      <Pause className="h-3.5 w-3.5 fill-current" />
                      <span>Slušaš trenutno</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5 fill-current" />
                      <span>Slušaj lekciju</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
