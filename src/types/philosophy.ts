export type EraCategory = 
  | 'antička' 
  | 'stoicizam' 
  | 'istočna' 
  | 'racionalizam' 
  | 'prosvetiteljstvo' 
  | 'egzistencijalizam' 
  | 'etika_i_um'
  | 'nise_i_paradoksi';

export type TriviaCategory = 
  | 'anegdote' 
  | 'bizarno' 
  | 'istorija' 
  | 'paradoksi' 
  | 'svakodnevica'
  | 'misaoni_eksperimenti';

export interface Quote {
  id: string;
  text: string;
  context?: string;
  philosopherId: string;
  philosopherName: string;
  category: EraCategory;
  isNiche?: boolean;
}

export interface Philosopher {
  id: string;
  name: string;
  nativeName?: string;
  era: string; // npr. "Antička Grčka (470–399 p.n.e.)"
  category: EraCategory;
  categoryLabel: string;
  portraitUrl: string;
  location: string;
  lifeDates: string;
  school: string; // npr. "Sokratovska metoda / Klasična etika"
  summary: string;
  bioDetails: string;
  keyIdeas: string[];
  famousQuotes: Quote[];
  keyTerms: string[]; // ids of related terms
  anecdoteIds: string[]; // ids of related trivia
  isNiche?: boolean;
  nicheSpecialty?: string;
}

export interface PhilosophicalTerm {
  id: string;
  term: string;
  greekOrLatin?: string;
  pronunciation?: string;
  category: EraCategory;
  categoryLabel: string;
  shortDefinition: string;
  inDepthExplanation: string;
  everydayAnalogy: string; // "Kako ovo izgleda u svakodnevnom životu?"
  historicalContext: string;
  relatedPhilosophers: string[];
  sampleQuote?: string;
  isNiche?: boolean;
}

export interface TriviaItem {
  id: string;
  title: string;
  content: string;
  category: TriviaCategory;
  categoryLabel: string;
  philosopherId?: string;
  philosopherName: string;
  eraCategory: EraCategory;
  funFactHighlight: string;
  historicalContext: string;
  tags: string[];
  isNiche?: boolean;
}

export interface NotificationPreferences {
  enabled: boolean;
  intervalMinutes: number; // default 60
  soundEnabled: boolean;
  selectedCategories: EraCategory[];
  browserNotificationGranted: boolean;
}

export interface DeliveredNotification {
  id: string;
  triviaId: string;
  title: string;
  previewText: string;
  deliveredAt: string;
}

export interface DailyEngagement {
  date: string; // YYYY-MM-DD
  count: number;
  dayLabel: string; // npr. "Pon", "Uto", "Sre"...
}

export interface UserLearningStats {
  exploredPhilosophers: string[];
  exploredTerms: string[];
  readQuotes: string[];
  exploredTrivia: string[];
  quizCompleted: number;
  quizHighScore: number;
  streakDays: number;
  lastActiveDate: string;
  dailyHistory: DailyEngagement[];
}

export type ReflectionMood = 'smiren' | 'zahvalan' | 'dubok' | 'borben' | 'skeptičan';

export interface DailyReflectionPrompt {
  id: string;
  question: string;
  philosophicalContext: string;
  sourcePhilosopherId?: string;
  sourcePhilosopherName?: string;
  sourceTermId?: string;
  sourceTerm?: string;
  category: EraCategory;
  suggestedAction?: string;
}

export interface JournalEntry {
  id: string;
  date: string; // YYYY-MM-DD
  timestamp: number;
  promptQuestion: string;
  promptContext: string;
  sourcePhilosopherName?: string;
  sourceTerm?: string;
  content: string;
  mood?: ReflectionMood;
  wordCount: number;
}

export type HeadphoneAmbienceMode = 
  | 'none' 
  | 'binaural_theta' 
  | 'agora_wind' 
  | 'rain_library' 
  | 'temple_silence';

export interface AudioLessonSection {
  id: string;
  title: string;
  durationSec: number;
  text: string;
  quoteHighlight?: string;
}

export interface AudioLesson {
  id: string;
  title: string;
  subtitle: string;
  category: EraCategory;
  categoryLabel: string;
  durationMinutes: number;
  narratorTitle: string; // npr. "Profesor antičke filozofije", "Stoik vodič"
  description: string;
  keyTakeaways: string[];
  associatedPhilosopherIds: string[];
  associatedPhilosopherNames: string[];
  associatedTermIds: string[];
  associatedTermNames: string[];
  sections: AudioLessonSection[];
  reflectionQuestion: string;
  bgAtmosphereRecommendation: HeadphoneAmbienceMode;
}

