import React from 'react';
import { X, Smartphone, Share, PlusSquare, Sparkles } from 'lucide-react';

interface PWAInstallGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNativeInstallPrompt?: () => void;
  isInstallable: boolean;
}

export const PWAInstallGuideModal: React.FC<PWAInstallGuideModalProps> = ({
  isOpen,
  onClose,
  onNativeInstallPrompt,
  isInstallable,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-t-3xl sm:rounded-2xl border border-stone-200 bg-[#fcfbf9] p-6 shadow-2xl dark:border-stone-800 dark:bg-[#15161a] pb-safe">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Smartphone className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-editorial text-lg font-bold text-stone-900 dark:text-stone-100">
                Instaliraj na telefon
              </h2>
              <p className="text-xs text-stone-500">
                Koristite kao pravu aplikaciju na početnom ekranu
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

        <div className="mt-4 space-y-4">
          {isInstallable && onNativeInstallPrompt ? (
            <button
              onClick={() => {
                onNativeInstallPrompt();
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-700 py-3 text-xs sm:text-sm font-semibold text-white shadow-md hover:bg-amber-800 transition-colors"
            >
              <Sparkles className="h-4 w-4" />
              Dodaj na početni ekran (Brza instalacija)
            </button>
          ) : null}

          {/* iOS Safari Guide */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-[#121316] space-y-2 text-xs text-stone-700 dark:text-stone-300">
            <span className="font-bold text-stone-900 dark:text-stone-100 block text-xs">
              Uputstvo za iPhone / iPad (Safari):
            </span>
            <div className="flex items-start gap-2.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 font-bold text-[11px] shrink-0 mt-0.5">
                1
              </span>
              <p>
                Dodirnite dugme <Share className="inline h-3.5 w-3.5 mx-0.5" /> <strong>Deli (Share)</strong> na dnu Safari pretraživača.
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 font-bold text-[11px] shrink-0 mt-0.5">
                2
              </span>
              <p>
                Pronađite i izaberite <PlusSquare className="inline h-3.5 w-3.5 mx-0.5" /> <strong>Dodaj na početni ekran (Add to Home Screen)</strong>.
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 font-bold text-[11px] shrink-0 mt-0.5">
                3
              </span>
              <p>
                Aplikacija „Filozofia“ će se pojaviti kao ikonica na vašem telefonu sa punim ekranom i časovnim obaveštenjima!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full rounded-xl bg-stone-100 py-2.5 text-xs font-semibold text-stone-800 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700 transition-colors"
          >
            Razumem, zatvori
          </button>
        </div>
      </div>
    </div>
  );
};
