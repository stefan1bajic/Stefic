/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { usePhilosophyStore } from './hooks/usePhilosophyStore';
import { HeaderBar } from './components/HeaderBar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { TodayTab } from './components/TodayTab';
import { PhilosophersTab } from './components/PhilosophersTab';
import { GlossaryTab } from './components/GlossaryTab';
import { TriviaTab } from './components/TriviaTab';
import { FavoritesTab } from './components/FavoritesTab';
import { HourlyNotificationModal } from './components/HourlyNotificationModal';
import { HourlyTriviaToast } from './components/HourlyTriviaToast';
import { PhilosopherDetailModal } from './components/PhilosopherDetailModal';
import { TermDetailModal } from './components/TermDetailModal';
import { PWAInstallGuideModal } from './components/PWAInstallGuideModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { PhilosophyQuizModal } from './components/PhilosophyQuizModal';
import { LearningProgressDashboard } from './components/LearningProgressDashboard';
import { DailyReflectionModal } from './components/DailyReflectionModal';
import { AudioLessonsTab } from './components/AudioLessonsTab';
import { GlobalAudioFloatingBar } from './components/GlobalAudioFloatingBar';

export default function App() {
  const store = usePhilosophyStore();

  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isReflectionModalOpen, setIsReflectionModalOpen] = useState(false);
  const [deferredInstallPrompt, setDeferredInstallPrompt] = useState<any>(null);

  // Catch beforeinstallprompt on supported browsers
  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  // Keyboard shortcut Cmd+K or Ctrl+K for Global Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNativeInstallPrompt = async () => {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      const choice = await deferredInstallPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setDeferredInstallPrompt(null);
      }
    }
  };

  // Find featured philosopher & term for today
  const featuredPhilosopher = store.philosophers[1]; // Marko Aurelije
  const quoteOfTheDay = store.allQuotes[1]; // Marko Aurelije quote
  const termOfTheDay = store.terms[0]; // Eudaimonija

  const handleSelectPhilosopherByName = (name: string) => {
    const found = store.philosophers.find(
      (p) => p.name.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(p.name.toLowerCase())
    );
    if (found) {
      store.setSelectedPhilosopher(found);
    }
  };

  const handleSelectPhilosopherById = (id: string) => {
    const found = store.philosophers.find((p) => p.id === id);
    if (found) {
      store.setSelectedPhilosopher(found);
    }
  };

  const handleSelectTermById = (termId: string) => {
    const found = store.terms.find((t) => t.id === termId);
    if (found) {
      store.setSelectedTerm(found);
    }
  };

  // Overall mastery percentage for quick indicators
  const totalPossiblePoints = store.philosophers.length + store.terms.length + 10;
  const currentPoints =
    store.exploredPhilosopherIds.length +
    store.exploredTermIds.length +
    store.favoriteQuoteIds.length +
    store.quizStats.completed * 2;
  const overallMastery = Math.min(100, Math.round((currentPoints / totalPossiblePoints) * 100));

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#1e2022] dark:bg-[#0f1013] dark:text-[#f2f2f3] flex flex-col font-sans transition-colors duration-200">
      {/* Top Application Bar with Search & Quiz */}
      <HeaderBar
        darkMode={store.darkMode}
        onToggleDarkMode={() => store.setDarkMode(!store.darkMode)}
        onOpenNotifications={() => setIsNotificationModalOpen(true)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenQuiz={() => setIsQuizModalOpen(true)}
        onOpenProgress={() => store.setActiveTab('progress')}
        onOpenReflection={() => setIsReflectionModalOpen(true)}
        onOpenAudio={() => store.setActiveTab('audio')}
        isPlayingAudio={store.isPlayingAudioLesson}
        hasWrittenToday={!!store.todayJournalEntry}
        activeTab={store.activeTab}
        notificationsEnabled={store.notificationsEnabled}
        browserPermission={store.browserPermission}
        onInstallClick={() => setIsInstallModalOpen(true)}
        isInstallable={true}
      />

      {/* Main Content Area */}
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 sm:px-6 pt-5 pb-24">
        {store.activeTab === 'today' && (
          <TodayTab
            currentTrivia={store.currentTrivia}
            secondsRemaining={store.secondsRemaining}
            notificationsEnabled={store.notificationsEnabled}
            onTriggerTriviaNow={() => store.deliverTrivia()}
            onOpenNotifications={() => setIsNotificationModalOpen(true)}
            onOpenSearch={() => setIsSearchModalOpen(true)}
            onOpenQuiz={() => setIsQuizModalOpen(true)}
            quoteOfTheDay={quoteOfTheDay}
            favoriteQuoteIds={store.favoriteQuoteIds}
            onToggleFavoriteQuote={store.toggleFavoriteQuote}
            termOfTheDay={termOfTheDay}
            onSelectTerm={(t) => store.setSelectedTerm(t)}
            featuredPhilosopher={featuredPhilosopher}
            onSelectPhilosopher={(p) => store.setSelectedPhilosopher(p)}
            onNavigateTab={(tab) => store.setActiveTab(tab)}
            exploredPhilosophersCount={store.exploredPhilosopherIds.length}
            totalPhilosophersCount={store.philosophers.length}
            exploredTermsCount={store.exploredTermIds.length}
            totalTermsCount={store.terms.length}
            overallMastery={overallMastery}
            dailyPrompt={store.currentDailyPrompt}
            todayJournalEntry={store.todayJournalEntry}
            totalJournalEntriesCount={store.journalEntries.length}
            onOpenReflectionModal={() => setIsReflectionModalOpen(true)}
            onShuffleReflectionPrompt={store.shuffleReflectionPrompt}
          />
        )}

        {store.activeTab === 'philosophers' && (
          <PhilosophersTab
            philosophers={store.philosophers}
            onSelectPhilosopher={(p) => store.setSelectedPhilosopher(p)}
          />
        )}

        {store.activeTab === 'glossary' && (
          <GlossaryTab
            terms={store.terms}
            favoriteTermIds={store.favoriteTermIds}
            onToggleFavoriteTerm={store.toggleFavoriteTerm}
            onSelectTerm={(t) => store.setSelectedTerm(t)}
          />
        )}

        {store.activeTab === 'audio' && (
          <AudioLessonsTab
            audioLessons={store.audioLessons}
            completedAudioLessonIds={store.completedAudioLessonIds}
            activeAudioLesson={store.activeAudioLesson}
            isPlaying={store.isPlayingAudioLesson}
            isPaused={store.isPausedAudioLesson}
            progress={store.audioLessonProgress}
            ambienceMode={store.audioAmbienceMode}
            ambienceVolume={store.audioAmbienceVolume}
            speechRate={store.audioSpeechRate}
            sleepTimerMinutes={store.sleepTimerMinutes}
            sleepTimerRemainingSec={store.sleepTimerRemainingSec}
            onPlayLesson={store.playAudioLesson}
            onPauseLesson={store.pauseAudioLesson}
            onResumeLesson={store.resumeAudioLesson}
            onStopLesson={store.stopAudioLesson}
            onSkipForward={store.skipAudioLessonForward}
            onSkipBackward={store.skipAudioLessonBackward}
            onSeekSection={store.seekAudioLessonSection}
            onSetAmbienceMode={store.setAudioAmbienceMode}
            onSetAmbienceVolume={store.setAudioAmbienceVolume}
            onSetSpeechRate={store.setAudioSpeechRate}
            onSetSleepTimer={store.setSleepTimer}
            onMarkCompleted={store.markAudioLessonCompleted}
            onSelectPhilosopherById={handleSelectPhilosopherById}
            onSelectTermById={handleSelectTermById}
            onOpenReflection={(context) => {
              if (context) {
                // If context provided, store or prefill daily reflection
              }
              setIsReflectionModalOpen(true);
            }}
          />
        )}

        {store.activeTab === 'trivia' && (
          <TriviaTab
            triviaItems={store.triviaItems}
            secondsRemaining={store.secondsRemaining}
            notificationsEnabled={store.notificationsEnabled}
            intervalMinutes={store.intervalMinutes}
            onSelectInterval={(m) => store.setIntervalMinutes(m)}
            onToggleEnabled={() => store.setNotificationsEnabled(!store.notificationsEnabled)}
            onTriggerNow={() => store.deliverTrivia()}
            onOpenNotificationModal={() => setIsNotificationModalOpen(true)}
            onSelectPhilosopherById={handleSelectPhilosopherById}
          />
        )}

        {store.activeTab === 'progress' && (
          <LearningProgressDashboard
            philosophers={store.philosophers}
            terms={store.terms}
            exploredPhilosopherIds={store.exploredPhilosopherIds}
            exploredTermIds={store.exploredTermIds}
            exploredQuoteIds={store.exploredQuoteIds}
            favoriteQuoteIds={store.favoriteQuoteIds}
            quizStats={store.quizStats}
            dailyActivity={store.dailyActivity}
            journalEntriesCount={store.journalEntries.length}
            completedAudioLessonIds={store.completedAudioLessonIds}
            totalAudioLessonsCount={store.audioLessons.length}
            onSelectPhilosopher={(p) => store.setSelectedPhilosopher(p)}
            onSelectTerm={(t) => store.setSelectedTerm(t)}
            onOpenQuiz={() => setIsQuizModalOpen(true)}
            onOpenReflection={() => setIsReflectionModalOpen(true)}
            onNavigateAudio={() => store.setActiveTab('audio')}
          />
        )}

        {store.activeTab === 'favorites' && (
          <FavoritesTab
            favoriteQuotes={store.favoriteQuotesList}
            favoriteTerms={store.favoriteTermsList}
            onToggleFavoriteQuote={store.toggleFavoriteQuote}
            onToggleFavoriteTerm={store.toggleFavoriteTerm}
            selectedCategories={store.selectedCategories}
            onToggleCategory={store.toggleCategory}
            onSelectTerm={(t) => store.setSelectedTerm(t)}
            allQuotes={store.allQuotes}
          />
        )}
      </main>

      {/* Persistent Floating Audio Player Bar */}
      <GlobalAudioFloatingBar
        lesson={store.activeAudioLesson}
        isPlaying={store.isPlayingAudioLesson}
        isPaused={store.isPausedAudioLesson}
        progress={store.audioLessonProgress}
        sleepTimerRemainingSec={store.sleepTimerRemainingSec}
        onPlayResume={store.resumeAudioLesson}
        onPause={store.pauseAudioLesson}
        onStop={store.stopAudioLesson}
        onExpand={() => store.setActiveTab('audio')}
      />

      {/* Global Application Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        philosophers={store.philosophers}
        terms={store.terms}
        quotes={store.allQuotes}
        triviaItems={store.triviaItems}
        favoriteQuoteIds={store.favoriteQuoteIds}
        onToggleFavoriteQuote={store.toggleFavoriteQuote}
        onSelectPhilosopher={(p) => store.setSelectedPhilosopher(p)}
        onSelectTerm={(t) => store.setSelectedTerm(t)}
        onSelectTrivia={(trivia) => store.setIncomingTriviaAlert(trivia)}
      />

      {/* Philosophy Quiz / Flashcard Challenge Modal */}
      <PhilosophyQuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
      />

      {/* Daily Reflection Philosophical Journal Modal */}
      <DailyReflectionModal
        isOpen={isReflectionModalOpen}
        onClose={() => setIsReflectionModalOpen(false)}
        prompt={store.currentDailyPrompt}
        todayEntry={store.todayJournalEntry}
        allEntries={store.journalEntries}
        onSaveEntry={store.saveJournalEntry}
        onDeleteEntry={store.deleteJournalEntry}
        onShufflePrompt={store.shuffleReflectionPrompt}
      />

      {/* Floating Incoming Hourly Trivia Toast */}
      <HourlyTriviaToast
        trivia={store.incomingTriviaAlert}
        onDismiss={() => store.setIncomingTriviaAlert(null)}
        onSelectPhilosopher={handleSelectPhilosopherById}
      />

      {/* Philosopher Modal Details */}
      <PhilosopherDetailModal
        philosopher={store.selectedPhilosopher}
        onClose={() => store.setSelectedPhilosopher(null)}
        favoriteQuoteIds={store.favoriteQuoteIds}
        onToggleFavoriteQuote={store.toggleFavoriteQuote}
        onSelectTerm={handleSelectTermById}
      />

      {/* Term Modal Details */}
      <TermDetailModal
        term={store.selectedTerm}
        onClose={() => store.setSelectedTerm(null)}
        isBookmarked={store.selectedTerm ? store.favoriteTermIds.includes(store.selectedTerm.id) : false}
        onToggleBookmark={store.toggleFavoriteTerm}
        onSelectPhilosopher={handleSelectPhilosopherByName}
      />

      {/* Hourly Notification Settings Modal */}
      <HourlyNotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        notificationsEnabled={store.notificationsEnabled}
        onToggleEnabled={() => store.setNotificationsEnabled(!store.notificationsEnabled)}
        intervalMinutes={store.intervalMinutes}
        onSelectInterval={(m) => store.setIntervalMinutes(m)}
        soundEnabled={store.soundEnabled}
        onToggleSound={() => store.setSoundEnabled(!store.soundEnabled)}
        browserPermission={store.browserPermission}
        onRequestPermission={store.handleRequestPermission}
        secondsRemaining={store.secondsRemaining}
        onTriggerNow={() => store.deliverTrivia()}
        selectedCategories={store.selectedCategories}
        onToggleCategory={store.toggleCategory}
      />

      {/* Phone Install Guide Modal */}
      <PWAInstallGuideModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
        onNativeInstallPrompt={handleNativeInstallPrompt}
        isInstallable={!!deferredInstallPrompt}
      />

      {/* Ergonomic Mobile Bottom Nav Bar */}
      <MobileBottomNav
        activeTab={store.activeTab}
        onSelectTab={(tab) => store.setActiveTab(tab)}
        favoritesCount={store.favoriteQuoteIds.length + store.favoriteTermIds.length}
        isPlayingAudio={store.isPlayingAudioLesson}
      />
    </div>
  );
}
