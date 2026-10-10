import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { 
  EraCategory, 
  Philosopher, 
  PhilosophicalTerm, 
  TriviaItem, 
  Quote,
  JournalEntry,
  DailyReflectionPrompt,
  AudioLesson,
  HeadphoneAmbienceMode
} from '../types/philosophy';
import { 
  PHILOSOPHERS, 
  PHILOSOPHICAL_TERMS, 
  TRIVIA_ITEMS 
} from '../data/philosophyData';
import { AUDIO_LESSONS } from '../data/audioLessonsData';
import { getDailyReflectionPrompt } from '../data/reflectionPrompts';
import { 
  playChimeSound, 
  requestNotificationPermission, 
  sendBrowserNotification 
} from '../utils/notifications';
import { 
  headphoneAmbience, 
  lectureSpeechController, 
  LectureProgress 
} from '../utils/audioLecturesEngine';
import confetti from 'canvas-confetti';

const STORAGE_FAVORITE_QUOTES = 'filozofia_fav_quotes_v1';
const STORAGE_FAVORITE_TERMS = 'filozofia_fav_terms_v1';
const STORAGE_NOTIF_ENABLED = 'filozofia_notif_enabled_v1';
const STORAGE_NOTIF_INTERVAL = 'filozofia_notif_interval_v1';
const STORAGE_SELECTED_CATEGORIES = 'filozofia_selected_cats_v1';
const STORAGE_DARK_MODE = 'filozofia_dark_mode_v1';

// Learning Progress keys
const STORAGE_EXPLORED_PHILOSOPHERS = 'filozofia_exp_phil_v1';
const STORAGE_EXPLORED_TERMS = 'filozofia_exp_terms_v1';
const STORAGE_EXPLORED_QUOTES = 'filozofia_exp_quotes_v1';
const STORAGE_EXPLORED_TRIVIA = 'filozofia_exp_trivia_v1';
const STORAGE_QUIZ_STATS = 'filozofia_quiz_stats_v1';
const STORAGE_DAILY_ACTIVITY = 'filozofia_daily_act_v1';
const STORAGE_JOURNAL_ENTRIES = 'filozofia_journal_entries_v1';
const STORAGE_COMPLETED_AUDIO_LESSONS = 'filozofia_audio_completed_v1';

const DEFAULT_JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: 'je-sample-1',
    date: '2026-10-09',
    timestamp: Date.now() - 86400000,
    promptQuestion: 'Koji događaj dana te je najviše uznemirio, i da li je on bio pod tvojom kontrolom ili u tvojoj percepciji?',
    promptContext: 'Marko Aurelije u "Samom sebi": „Imaš vlast nad svojim umom, ne nad spoljašnjim stvarima.“',
    sourcePhilosopherName: 'Marko Aurelije',
    sourceTerm: 'Dihotomija kontrole',
    content: 'Danas je došlo do zastoja i nesporazuma u toku obaveza. U prvom momentu sam osetio frustraciju i ljutnju. Zatim sam se setio dihotomije kontrole: ponašanje drugih nije pod mojom kontrolom, ali moj smiren odgovor i priprema rešenja jesu. Fokusirao sam se samo na svoj deo i tenzija je ubrzo nestala.',
    mood: 'smiren',
    wordCount: 58,
  },
];

export type TabType = 'today' | 'philosophers' | 'glossary' | 'audio' | 'trivia' | 'favorites' | 'progress';


export function usePhilosophyStore() {
  const [activeTab, setActiveTab] = useState<TabType>('today');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_DARK_MODE);
    if (saved !== null) return saved === 'true';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Selected philosopher/term for modal details
  const [selectedPhilosopher, setSelectedPhilosopher] = useState<Philosopher | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<PhilosophicalTerm | null>(null);

  // Favorites
  const [favoriteQuoteIds, setFavoriteQuoteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_FAVORITE_QUOTES);
      return saved ? JSON.parse(saved) : ['ma-1', 'fn-1', 'sq-1'];
    } catch {
      return ['ma-1', 'fn-1'];
    }
  });

  const [favoriteTermIds, setFavoriteTermIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_FAVORITE_TERMS);
      return saved ? JSON.parse(saved) : ['amor-fati', 'eudaimonija', 'epohe'];
    } catch {
      return ['amor-fati', 'eudaimonija'];
    }
  });

  // Category preferences for hourly trivia (all by default)
  const [selectedCategories, setSelectedCategories] = useState<EraCategory[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SELECTED_CATEGORIES);
      return saved ? JSON.parse(saved) : ['antička', 'stoicizam', 'egzistencijalizam', 'istočna', 'prosvetiteljstvo', 'racionalizam', 'nise_i_paradoksi'];
    } catch {
      return ['antička', 'stoicizam', 'egzistencijalizam', 'nise_i_paradoksi'];
    }
  });

  // Learning Progress Tracking State
  const [exploredPhilosopherIds, setExploredPhilosopherIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_EXPLORED_PHILOSOPHERS);
      return saved ? JSON.parse(saved) : ['sokrat', 'marko-aurelije', 'nice', 'cioran'];
    } catch {
      return ['sokrat', 'marko-aurelije'];
    }
  });

  const [exploredTermIds, setExploredTermIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_EXPLORED_TERMS);
      return saved ? JSON.parse(saved) : ['eudaimonija', 'ataraksija', 'amor-fati', 'epohe'];
    } catch {
      return ['eudaimonija', 'ataraksija'];
    }
  });

  const [exploredQuoteIds, setExploredQuoteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_EXPLORED_QUOTES);
      return saved ? JSON.parse(saved) : ['ma-1', 'fn-1', 'sq-1', 'cio-1'];
    } catch {
      return ['ma-1', 'fn-1'];
    }
  });

  const [exploredTriviaIds, setExploredTriviaIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_EXPLORED_TRIVIA);
      return saved ? JSON.parse(saved) : ['t-diogen-aleksandar', 't-cioran-bicikl'];
    } catch {
      return ['t-diogen-aleksandar'];
    }
  });

  const [quizStats, setQuizStats] = useState<{ completed: number; highScore: number }>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_QUIZ_STATS);
      return saved ? JSON.parse(saved) : { completed: 1, highScore: 7 };
    } catch {
      return { completed: 0, highScore: 0 };
    }
  });

  const [dailyActivity, setDailyActivity] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_DAILY_ACTIVITY);
      if (saved) return JSON.parse(saved);
      // Realistic engagement history for charts
      const today = new Date();
      const initial: Record<string, number> = {};
      const seedWeights = [6, 8, 4, 11, 7, 9, 14];
      for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const key = d.toISOString().split('T')[0];
        initial[key] = seedWeights[6 - i];
      }
      return initial;
    } catch {
      return {};
    }
  });

  // Audio Lessons & Headphone State
  const [completedAudioLessonIds, setCompletedAudioLessonIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_COMPLETED_AUDIO_LESSONS);
      return saved ? JSON.parse(saved) : ['audio-stoicizam-nepokolebljivost'];
    } catch {
      return ['audio-stoicizam-nepokolebljivost'];
    }
  });

  const [activeAudioLesson, setActiveAudioLesson] = useState<AudioLesson | null>(() => AUDIO_LESSONS[0]);
  const [isPlayingAudioLesson, setIsPlayingAudioLesson] = useState<boolean>(false);
  const [isPausedAudioLesson, setIsPausedAudioLesson] = useState<boolean>(false);
  const [audioLessonProgress, setAudioLessonProgress] = useState<LectureProgress | null>(null);
  const [audioAmbienceMode, setAudioAmbienceMode] = useState<HeadphoneAmbienceMode>('binaural_theta');
  const [audioAmbienceVolume, setAudioAmbienceVolume] = useState<number>(0.35);
  const [audioSpeechRate, setAudioSpeechRate] = useState<number>(1.0);
  const [sleepTimerMinutes, setSleepTimerMinutes] = useState<number | null>(null);
  const [sleepTimerRemainingSec, setSleepTimerRemainingSec] = useState<number | null>(null);

  // Notification configuration
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_NOTIF_ENABLED);
    return saved !== null ? saved === 'true' : true;
  });

  const [intervalMinutes, setIntervalMinutes] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_NOTIF_INTERVAL);
    return saved ? Number(saved) : 60; // 60 minutes default
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [browserPermission, setBrowserPermission] = useState<NotificationPermission>(() => {
    return 'Notification' in window ? Notification.permission : 'denied';
  });

  // Countdown timer for next trivia
  const [secondsRemaining, setSecondsRemaining] = useState<number>(() => intervalMinutes * 60);

  // Current active trivia (shown on Today tab and Toast)
  const [currentTrivia, setCurrentTrivia] = useState<TriviaItem>(() => TRIVIA_ITEMS[0]);
  const [incomingTriviaAlert, setIncomingTriviaAlert] = useState<TriviaItem | null>(null);

  // Sync dark mode class on document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_DARK_MODE, String(darkMode));
  }, [darkMode]);

  // Persist favorites
  useEffect(() => {
    localStorage.setItem(STORAGE_FAVORITE_QUOTES, JSON.stringify(favoriteQuoteIds));
  }, [favoriteQuoteIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_FAVORITE_TERMS, JSON.stringify(favoriteTermIds));
  }, [favoriteTermIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_SELECTED_CATEGORIES, JSON.stringify(selectedCategories));
  }, [selectedCategories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_NOTIF_ENABLED, String(notificationsEnabled));
  }, [notificationsEnabled]);

  useEffect(() => {
    localStorage.setItem(STORAGE_NOTIF_INTERVAL, String(intervalMinutes));
    setSecondsRemaining(Math.round(intervalMinutes * 60));
  }, [intervalMinutes]);

  // Log activity helper
  const logActivity = useCallback(() => {
    const todayKey = new Date().toISOString().split('T')[0];
    setDailyActivity((prev) => {
      const updated = {
        ...prev,
        [todayKey]: (prev[todayKey] || 0) + 1,
      };
      localStorage.setItem(STORAGE_DAILY_ACTIVITY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Mark exploration actions
  const markPhilosopherExplored = useCallback((id: string) => {
    setExploredPhilosopherIds((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      localStorage.setItem(STORAGE_EXPLORED_PHILOSOPHERS, JSON.stringify(next));
      return next;
    });
    logActivity();
  }, [logActivity]);

  const markTermExplored = useCallback((id: string) => {
    setExploredTermIds((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      localStorage.setItem(STORAGE_EXPLORED_TERMS, JSON.stringify(next));
      return next;
    });
    logActivity();
  }, [logActivity]);

  const markQuoteExplored = useCallback((id: string) => {
    setExploredQuoteIds((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      localStorage.setItem(STORAGE_EXPLORED_QUOTES, JSON.stringify(next));
      return next;
    });
    logActivity();
  }, [logActivity]);

  const markTriviaExplored = useCallback((id: string) => {
    setExploredTriviaIds((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      localStorage.setItem(STORAGE_EXPLORED_TRIVIA, JSON.stringify(next));
      return next;
    });
    logActivity();
  }, [logActivity]);

  const recordQuizScore = useCallback((score: number, _total: number) => {
    setQuizStats((prev) => {
      const updated = {
        completed: prev.completed + 1,
        highScore: Math.max(prev.highScore, score),
      };
      localStorage.setItem(STORAGE_QUIZ_STATS, JSON.stringify(updated));
      return updated;
    });
    logActivity();
  }, [logActivity]);

  // Deliver trivia function
  const deliverTrivia = useCallback((forceItem?: TriviaItem) => {
    let item: TriviaItem;
    if (forceItem) {
      item = forceItem;
    } else {
      // Pick based on user's preferred categories
      const pool = TRIVIA_ITEMS.filter(t => 
        selectedCategories.length === 0 || selectedCategories.includes(t.eraCategory)
      );
      const candidates = pool.length > 0 ? pool : TRIVIA_ITEMS;
      const nextIdx = Math.floor(Math.random() * candidates.length);
      item = candidates[nextIdx];
    }

    setCurrentTrivia(item);
    setIncomingTriviaAlert(item);
    markTriviaExplored(item.id);

    // Audio chime
    if (soundEnabled) {
      playChimeSound();
    }

    // Browser system notification
    sendBrowserNotification(item);

    // Mini confetti burst for discovery
    try {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#d97706', '#f59e0b', '#b45309']
      });
    } catch {
      // ignore
    }

    // Reset countdown
    setSecondsRemaining(Math.round(intervalMinutes * 60));
  }, [selectedCategories, soundEnabled, intervalMinutes, markTriviaExplored]);

  // Timer tick for hourly countdown
  const deliverTriviaRef = useRef(deliverTrivia);
  useEffect(() => {
    deliverTriviaRef.current = deliverTrivia;
  }, [deliverTrivia]);

  useEffect(() => {
    if (!notificationsEnabled) return;

    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          deliverTriviaRef.current();
          return Math.round(intervalMinutes * 60);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [notificationsEnabled, intervalMinutes]);

  // Request notification permission
  const handleRequestPermission = async () => {
    const res = await requestNotificationPermission();
    setBrowserPermission(res);
    return res;
  };

  // Toggle favorite quote
  const toggleFavoriteQuote = (quoteId: string) => {
    setFavoriteQuoteIds(prev => {
      const exists = prev.includes(quoteId);
      if (!exists) {
        markQuoteExplored(quoteId);
        try {
          confetti({
            particleCount: 20,
            spread: 45,
            origin: { y: 0.85 },
            colors: ['#f59e0b', '#ec4899', '#8b5cf6']
          });
        } catch {
          // ignore
        }
        return [...prev, quoteId];
      }
      return prev.filter(id => id !== quoteId);
    });
  };

  // Toggle favorite term
  const toggleFavoriteTerm = (termId: string) => {
    setFavoriteTermIds(prev => {
      if (!prev.includes(termId)) {
        markTermExplored(termId);
        return [...prev, termId];
      }
      return prev.filter(id => id !== termId);
    });
  };

  // Toggle category in user preferences
  const toggleCategory = (cat: EraCategory) => {
    setSelectedCategories(prev => {
      if (prev.includes(cat)) {
        if (prev.length === 1) return prev; // keep at least 1
        return prev.filter(c => c !== cat);
      }
      return [...prev, cat];
    });
  };

  // Gather all quotes across philosophers
  const allQuotes: Quote[] = PHILOSOPHERS.flatMap(p => p.famousQuotes);

  // Favorite quotes objects
  const favoriteQuotesList = allQuotes.filter(q => favoriteQuoteIds.includes(q.id));

  // Favorite terms objects
  const favoriteTermsList = PHILOSOPHICAL_TERMS.filter(t => favoriteTermIds.includes(t.id));

  // Daily Reflection & Philosophical Journaling
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_JOURNAL_ENTRIES);
      return saved ? JSON.parse(saved) : DEFAULT_JOURNAL_ENTRIES;
    } catch {
      return DEFAULT_JOURNAL_ENTRIES;
    }
  });

  const [reflectionShuffleOffset, setReflectionShuffleOffset] = useState<number>(0);

  const shuffleReflectionPrompt = useCallback(() => {
    setReflectionShuffleOffset((prev) => prev + 1);
  }, []);

  const currentDailyPrompt = useMemo(() => {
    return getDailyReflectionPrompt(
      exploredPhilosopherIds,
      exploredTermIds,
      favoriteQuoteIds,
      reflectionShuffleOffset
    );
  }, [exploredPhilosopherIds, exploredTermIds, favoriteQuoteIds, reflectionShuffleOffset]);

  const todayDateStr = new Date().toISOString().split('T')[0];
  const todayJournalEntry = useMemo(() => {
    return journalEntries.find((e) => e.date === todayDateStr) || null;
  }, [journalEntries, todayDateStr]);

  const saveJournalEntry = useCallback(
    (input: {
      id?: string;
      date?: string;
      promptQuestion: string;
      promptContext: string;
      sourcePhilosopherName?: string;
      sourceTerm?: string;
      content: string;
      mood?: any;
    }) => {
      const targetDate = input.date || todayDateStr;
      const trimmed = input.content.trim();
      const words = trimmed ? trimmed.split(/\s+/).length : 0;
      const newEntryId = input.id || `je-${Date.now()}`;

      setJournalEntries((prev) => {
        const filtered = prev.filter((e) => e.id !== newEntryId && e.date !== targetDate);
        const updatedEntry: JournalEntry = {
          id: newEntryId,
          date: targetDate,
          timestamp: Date.now(),
          promptQuestion: input.promptQuestion,
          promptContext: input.promptContext,
          sourcePhilosopherName: input.sourcePhilosopherName,
          sourceTerm: input.sourceTerm,
          content: input.content,
          mood: input.mood,
          wordCount: words,
        };
        const nextList = [updatedEntry, ...filtered];
        localStorage.setItem(STORAGE_JOURNAL_ENTRIES, JSON.stringify(nextList));
        return nextList;
      });

      try {
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#d97706', '#10b981', '#f59e0b'],
        });
      } catch {}

      logActivity();
    },
    [todayDateStr, logActivity]
  );

  const deleteJournalEntry = useCallback((id: string) => {
    setJournalEntries((prev) => {
      const nextList = prev.filter((e) => e.id !== id);
      localStorage.setItem(STORAGE_JOURNAL_ENTRIES, JSON.stringify(nextList));
      return nextList;
    });
  }, []);

  // Mark audio lesson as completed
  const markAudioLessonCompleted = useCallback(
    (lessonId: string) => {
      setCompletedAudioLessonIds((prev) => {
        if (prev.includes(lessonId)) return prev;
        const next = [...prev, lessonId];
        localStorage.setItem(STORAGE_COMPLETED_AUDIO_LESSONS, JSON.stringify(next));
        return next;
      });

      const lesson = AUDIO_LESSONS.find((l) => l.id === lessonId);
      if (lesson) {
        lesson.associatedPhilosopherIds.forEach((pid) => markPhilosopherExplored(pid));
        lesson.associatedTermIds.forEach((tid) => markTermExplored(tid));
      }

      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.75 },
          colors: ['#f59e0b', '#3b82f6', '#10b981'],
        });
      } catch {}

      logActivity();
    },
    [markPhilosopherExplored, markTermExplored, logActivity]
  );

  const playAudioLesson = useCallback(
    (lesson: AudioLesson, fromSectionIndex = 0) => {
      setActiveAudioLesson(lesson);
      lectureSpeechController.setRate(audioSpeechRate);
      lectureSpeechController.prepareLesson(
        lesson.sections,
        (progress) => {
          setAudioLessonProgress(progress);
          setIsPlayingAudioLesson(true);
          setIsPausedAudioLesson(false);
        },
        () => {
          setIsPlayingAudioLesson(false);
          setIsPausedAudioLesson(false);
          markAudioLessonCompleted(lesson.id);
          headphoneAmbience.stop();
        }
      );

      if (audioAmbienceMode !== 'none') {
        headphoneAmbience.setMode(audioAmbienceMode);
        headphoneAmbience.setVolume(audioAmbienceVolume);
      }

      if (fromSectionIndex > 0) {
        lectureSpeechController.seekSection(fromSectionIndex);
      } else {
        lectureSpeechController.play(0);
      }
      setIsPlayingAudioLesson(true);
      setIsPausedAudioLesson(false);
      logActivity();
    },
    [audioSpeechRate, audioAmbienceMode, audioAmbienceVolume, markAudioLessonCompleted, logActivity]
  );

  const pauseAudioLesson = useCallback(() => {
    lectureSpeechController.pause();
    setIsPlayingAudioLesson(false);
    setIsPausedAudioLesson(true);
  }, []);

  const resumeAudioLesson = useCallback(() => {
    lectureSpeechController.resume();
    setIsPlayingAudioLesson(true);
    setIsPausedAudioLesson(false);
    if (audioAmbienceMode !== 'none') {
      headphoneAmbience.setMode(audioAmbienceMode);
    }
  }, [audioAmbienceMode]);

  const stopAudioLesson = useCallback(() => {
    lectureSpeechController.stop();
    headphoneAmbience.stop();
    setIsPlayingAudioLesson(false);
    setIsPausedAudioLesson(false);
    setAudioLessonProgress(null);
    setSleepTimerMinutes(null);
    setSleepTimerRemainingSec(null);
  }, []);

  const skipAudioLessonForward = useCallback(() => {
    lectureSpeechController.skipForward();
  }, []);

  const skipAudioLessonBackward = useCallback(() => {
    lectureSpeechController.skipBackward();
  }, []);

  const seekAudioLessonSection = useCallback((sectionIndex: number) => {
    lectureSpeechController.seekSection(sectionIndex);
  }, []);

  const handleSetAudioAmbienceMode = useCallback((mode: HeadphoneAmbienceMode) => {
    setAudioAmbienceMode(mode);
    headphoneAmbience.setMode(mode);
  }, []);

  const handleSetAudioAmbienceVolume = useCallback((vol: number) => {
    setAudioAmbienceVolume(vol);
    headphoneAmbience.setVolume(vol);
  }, []);

  const handleSetAudioSpeechRate = useCallback((rate: number) => {
    setAudioSpeechRate(rate);
    lectureSpeechController.setRate(rate);
  }, []);

  const handleSetSleepTimer = useCallback((minutes: number | null) => {
    setSleepTimerMinutes(minutes);
    if (minutes === null) {
      setSleepTimerRemainingSec(null);
    } else {
      setSleepTimerRemainingSec(minutes * 60);
    }
  }, []);

  // Sleep timer countdown effect
  useEffect(() => {
    if (sleepTimerRemainingSec === null || !isPlayingAudioLesson) return;
    const interval = setInterval(() => {
      setSleepTimerRemainingSec((prev) => {
        if (prev === null || prev <= 1) {
          stopAudioLesson();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [sleepTimerRemainingSec, isPlayingAudioLesson, stopAudioLesson]);

  return {
    activeTab,
    setActiveTab,
    darkMode,
    setDarkMode,
    selectedPhilosopher,
    setSelectedPhilosopher: (p: Philosopher | null) => {
      if (p) markPhilosopherExplored(p.id);
      setSelectedPhilosopher(p);
    },
    selectedTerm,
    setSelectedTerm: (t: PhilosophicalTerm | null) => {
      if (t) markTermExplored(t.id);
      setSelectedTerm(t);
    },
    favoriteQuoteIds,
    toggleFavoriteQuote,
    favoriteTermIds,
    toggleFavoriteTerm,
    selectedCategories,
    toggleCategory,
    setSelectedCategories,
    notificationsEnabled,
    setNotificationsEnabled,
    intervalMinutes,
    setIntervalMinutes,
    soundEnabled,
    setSoundEnabled,
    browserPermission,
    handleRequestPermission,
    secondsRemaining,
    currentTrivia,
    incomingTriviaAlert,
    setIncomingTriviaAlert,
    deliverTrivia,
    favoriteQuotesList,
    favoriteTermsList,
    allQuotes,
    philosophers: PHILOSOPHERS,
    terms: PHILOSOPHICAL_TERMS,
    triviaItems: TRIVIA_ITEMS,
    // Learning progress stats
    exploredPhilosopherIds,
    exploredTermIds,
    exploredQuoteIds,
    exploredTriviaIds,
    quizStats,
    dailyActivity,
    markPhilosopherExplored,
    markTermExplored,
    markQuoteExplored,
    markTriviaExplored,
    recordQuizScore,
    // Daily Reflection & Philosophical Journal
    journalEntries,
    todayJournalEntry,
    currentDailyPrompt,
    saveJournalEntry,
    deleteJournalEntry,
    shuffleReflectionPrompt,
    // Audio Lessons & Headphone Immersion
    audioLessons: AUDIO_LESSONS,
    completedAudioLessonIds,
    activeAudioLesson,
    setActiveAudioLesson,
    isPlayingAudioLesson,
    isPausedAudioLesson,
    audioLessonProgress,
    audioAmbienceMode,
    audioAmbienceVolume,
    audioSpeechRate,
    sleepTimerMinutes,
    sleepTimerRemainingSec,
    playAudioLesson,
    pauseAudioLesson,
    resumeAudioLesson,
    stopAudioLesson,
    skipAudioLessonForward,
    skipAudioLessonBackward,
    seekAudioLessonSection,
    setAudioAmbienceMode: handleSetAudioAmbienceMode,
    setAudioAmbienceVolume: handleSetAudioAmbienceVolume,
    setAudioSpeechRate: handleSetAudioSpeechRate,
    setSleepTimer: handleSetSleepTimer,
    markAudioLessonCompleted,
  };
}
