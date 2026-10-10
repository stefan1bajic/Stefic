import React from 'react';
import { Headphones, Play, Pause, X, Maximize2, Moon } from 'lucide-react';
import { AudioLesson } from '../types/philosophy';
import { LectureProgress } from '../utils/audioLecturesEngine';

interface GlobalAudioFloatingBarProps {
  lesson: AudioLesson | null;
  isPlaying: boolean;
  isPaused: boolean;
  progress: LectureProgress | null;
  sleepTimerRemainingSec: number | null;
  onPlayResume: () => void;
  onPause: () => void;
  onStop: () => void;
  onExpand: () => void;
}

export const GlobalAudioFloatingBar: React.FC<GlobalAudioFloatingBarProps> = ({
  lesson,
  isPlaying,
  isPaused,
  progress,
  sleepTimerRemainingSec,
  onPlayResume,
  onPause,
  onStop,
  onExpand,
}) => {
  if (!lesson || (!isPlaying && !isPaused)) return null;

  const currentSectionIdx = progress?.sectionIndex ?? 0;
  const currentSection = lesson.sections[currentSectionIdx] || lesson.sections[0];

  return (
    <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-40 sm:w-96 animate-slide-up">
      <div className="rounded-2xl border border-amber-600/40 bg-stone-900/95 text-white p-3.5 shadow-2xl backdrop-blur-md">
        {/* Progress line */}
        <div className="mb-2 h-1 w-full overflow-hidden rounded-full bg-stone-800">
          <div
            className="h-full bg-amber-500 transition-all duration-300"
            style={{ width: `${progress?.progressPercent || 0}%` }}
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          {/* Animated headphone icon */}
          <button
            onClick={onExpand}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-colors"
            title="Otvori puni audio plejer"
          >
            <Headphones className={`h-5 w-5 ${isPlaying ? 'animate-pulse' : ''}`} />
          </button>

          {/* Title & Section info */}
          <div
            onClick={onExpand}
            className="min-w-0 flex-1 cursor-pointer hover:opacity-90 transition-opacity"
          >
            <h4 className="truncate text-xs font-bold text-white font-serif">
              {lesson.title}
            </h4>
            <div className="flex items-center gap-2 text-[10px] text-stone-300">
              <span className="truncate">{currentSection?.title || 'Audio predavanje'}</span>
              {sleepTimerRemainingSec !== null && (
                <span className="flex items-center gap-0.5 text-amber-300 shrink-0">
                  <Moon className="h-2.5 w-2.5" />
                  <span>{Math.ceil(sleepTimerRemainingSec / 60)}m</span>
                </span>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            {isPlaying ? (
              <button
                onClick={onPause}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-stone-900 hover:bg-amber-400 transition-colors"
                title="Pauza"
              >
                <Pause className="h-4 w-4 fill-current" />
              </button>
            ) : (
              <button
                onClick={onPlayResume}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-stone-900 hover:bg-amber-400 transition-colors"
                title="Nastavi"
              >
                <Play className="h-4 w-4 fill-current ml-0.5" />
              </button>
            )}

            <button
              onClick={onExpand}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              title="Povećaj plejer"
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={onStop}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-stone-400 hover:text-red-400 hover:bg-stone-800 transition-colors"
              title="Zaustavi audio"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
