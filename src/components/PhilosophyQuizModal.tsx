import React, { useState } from 'react';
import { X, Award, CheckCircle2, XCircle, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { QuizQuestion, PHILOSOPHY_QUIZ_QUESTIONS } from '../data/philosophyData';
import confetti from 'canvas-confetti';

interface PhilosophyQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhilosophyQuizModal: React.FC<PhilosophyQuizModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const questions = PHILOSOPHY_QUIZ_QUESTIONS;
  const currentQ: QuizQuestion = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
      try {
        confetti({
          particleCount: 25,
          spread: 50,
          origin: { y: 0.7 },
          colors: ['#f59e0b', '#10b981'],
        });
      } catch {
        // ignore
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-t-3xl sm:rounded-2xl border border-stone-200 bg-[#fcfbf9] p-5 sm:p-6 shadow-2xl dark:border-stone-800 dark:bg-[#141519] pb-safe max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Award className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-editorial text-lg font-bold text-stone-900 dark:text-stone-100">
                Filozofski Kviz Znanja
              </h2>
              <p className="text-xs text-stone-500">
                Pitanje {currentIndex + 1} od {questions.length}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {!isFinished ? (
          <div className="mt-4 space-y-4">
            {/* Question info */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                {currentQ.category}
              </span>
              <h3 className="font-editorial text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 mt-1 leading-snug">
                {currentQ.question}
              </h3>
            </div>

            {/* Options */}
            <div className="space-y-2">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;

                let btnStyles =
                  'border-stone-200 bg-white hover:border-amber-400 dark:border-stone-800 dark:bg-[#18191f] text-stone-800 dark:text-stone-200';

                if (isAnswered) {
                  if (isCorrect) {
                    btnStyles =
                      'border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200 font-semibold';
                  } else if (isSelected) {
                    btnStyles =
                      'border-rose-500 bg-rose-50 text-rose-900 dark:bg-rose-950/40 dark:text-rose-200';
                  } else {
                    btnStyles = 'opacity-50 border-stone-200 bg-stone-50 dark:bg-stone-900 text-stone-400';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-xs sm:text-sm text-left transition-all ${btnStyles}`}
                  >
                    <span>{option}</span>
                    {isAnswered && isCorrect && (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 ml-2" />
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <XCircle className="h-4 w-4 text-rose-600 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box */}
            {isAnswered && (
              <div className="rounded-xl bg-amber-500/10 p-3.5 text-xs text-stone-700 dark:text-stone-300 border border-amber-300/40 dark:border-amber-800/40 animate-in fade-in duration-200">
                <span className="font-bold text-amber-800 dark:text-amber-300 block mb-1">
                  💡 Objašnjenje:
                </span>
                <p className="leading-relaxed">{currentQ.explanation}</p>
              </div>
            )}

            {/* Next button */}
            {isAnswered && (
              <button
                onClick={handleNext}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-700 py-3 text-xs sm:text-sm font-semibold text-white shadow-md hover:bg-amber-800 transition-colors"
              >
                <span>{currentIndex < questions.length - 1 ? 'Sledeće pitanje' : 'Završi kviz'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
              <Sparkles className="h-8 w-8" />
            </div>
            <div>
              <h3 className="font-editorial text-2xl font-bold text-stone-900 dark:text-stone-100">
                Kviz je završen!
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                Tvoj rezultat:{' '}
                <span className="font-bold text-amber-700 dark:text-amber-400 font-mono text-lg">
                  {score} / {questions.length}
                </span>
              </p>
              <p className="text-xs text-stone-500 mt-2">
                {score === questions.length
                  ? 'Čestitamo! Posedujete mudrost pravog antičkog filozofa!'
                  : score >= questions.length / 2
                  ? 'Odlično znanje! Nastavite da čitate i istražujete riznice mislilaca.'
                  : 'Dobar pokušaj! Istražite sekcije „Filozofi“ i „Pojmovnik“ za još dublje razumevanje.'}
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleRestart}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-stone-200 bg-white py-2.5 text-xs font-semibold text-stone-800 hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Pokušaj ponovo</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 rounded-xl bg-amber-700 py-2.5 text-xs font-semibold text-white hover:bg-amber-800"
              >
                Zatvori
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
