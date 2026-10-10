import React from 'react';
import { X, Bell, Volume2, VolumeX, Sparkles, Clock, ShieldCheck, AlertCircle } from 'lucide-react';
import { EraCategory } from '../types/philosophy';
import { ERA_CATEGORIES } from '../data/philosophyData';

interface HourlyNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notificationsEnabled: boolean;
  onToggleEnabled: () => void;
  intervalMinutes: number;
  onSelectInterval: (minutes: number) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  browserPermission: NotificationPermission;
  onRequestPermission: () => Promise<NotificationPermission>;
  secondsRemaining: number;
  onTriggerNow: () => void;
  selectedCategories: EraCategory[];
  onToggleCategory: (cat: EraCategory) => void;
}

export const HourlyNotificationModal: React.FC<HourlyNotificationModalProps> = ({
  isOpen,
  onClose,
  notificationsEnabled,
  onToggleEnabled,
  intervalMinutes,
  onSelectInterval,
  soundEnabled,
  onToggleSound,
  browserPermission,
  onRequestPermission,
  secondsRemaining,
  onTriggerNow,
  selectedCategories,
  onToggleCategory,
}) => {
  if (!isOpen) return null;

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const intervalPresets = [
    { label: 'Svakih 60 min (standardno)', value: 60 },
    { label: 'Svakih 30 min', value: 30 },
    { label: 'Svakih 5 min', value: 5 },
    { label: '30 sekundi (test demo)', value: 0.5 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg rounded-t-3xl sm:rounded-2xl border border-stone-200 bg-[#fcfbf9] p-5 sm:p-6 shadow-2xl dark:border-stone-800 dark:bg-[#15161a] max-h-[90vh] overflow-y-auto pb-safe"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Bell className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-editorial text-lg font-bold text-stone-900 dark:text-stone-100">
                Časovna Obaveštenja
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Primajte filozofsku zanimljivost svakih sat vremena
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
            aria-label="Zatvori"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Live Countdown & Instant Trigger */}
        <div className="mt-4 rounded-xl border border-amber-200/70 bg-amber-500/5 p-4 dark:border-amber-900/40 dark:bg-amber-500/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-stone-700 dark:text-stone-300">
              <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <span className="text-xs font-medium">Sledeća zanimljivost za:</span>
            </div>
            <span className="font-mono text-xl font-bold tracking-wider text-amber-700 dark:text-amber-400 tabular-nums">
              {notificationsEnabled ? formattedTime : 'Pauzirano'}
            </span>
          </div>

          <button
            onClick={() => {
              onTriggerNow();
              onClose();
            }}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-amber-700 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-amber-800 transition-colors"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Pošalji mi zanimljivost odmah!
          </button>
        </div>

        {/* Master Toggle */}
        <div className="mt-4 flex items-center justify-between py-2">
          <div>
            <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Aktiviraj časovna obaveštenja
            </span>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Aplikacija će redovno slati fascinantne priče
            </p>
          </div>
          <button
            onClick={onToggleEnabled}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notificationsEnabled ? 'bg-amber-600' : 'bg-stone-300 dark:bg-stone-700'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Interval Selector */}
        <div className="mt-4">
          <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
            Učestalost slanja:
          </label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {intervalPresets.map((preset) => (
              <button
                key={preset.value}
                onClick={() => onSelectInterval(preset.value)}
                className={`flex items-center justify-center rounded-lg border py-2 px-3 text-xs transition-colors ${
                  intervalMinutes === preset.value
                    ? 'border-amber-600 bg-amber-50 font-semibold text-amber-900 dark:border-amber-500 dark:bg-amber-950/40 dark:text-amber-200'
                    : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:bg-stone-800'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Browser Permission status */}
        <div className="mt-4 rounded-xl border border-stone-200 bg-stone-50/50 p-3.5 dark:border-stone-800 dark:bg-stone-900/50">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2">
              {browserPermission === 'granted' ? (
                <ShieldCheck className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
              ) : (
                <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
              )}
              <div>
                <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                  {browserPermission === 'granted'
                    ? 'Sistemska obaveštenja su aktivna'
                    : 'Dozvola za telefon / pretraživač'}
                </span>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                  {browserPermission === 'granted'
                    ? 'Obaveštenja će iskakati i kada je aplikacija u pozadini.'
                    : 'Kliknite ispod da telefon odobri slanje obaveštenja.'}
                </p>
              </div>
            </div>

            {browserPermission !== 'granted' && (
              <button
                onClick={onRequestPermission}
                className="shrink-0 rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
              >
                Dozvoli
              </button>
            )}
          </div>
        </div>

        {/* Sound Chime Toggle */}
        <div className="mt-3 flex items-center justify-between py-2">
          <div className="flex items-center gap-2">
            {soundEnabled ? (
              <Volume2 className="h-4 w-4 text-stone-600 dark:text-stone-400" />
            ) : (
              <VolumeX className="h-4 w-4 text-stone-400" />
            )}
            <span className="text-xs text-stone-700 dark:text-stone-300">
              Zvučni ton hrama prilikom prijema zanimljivosti
            </span>
          </div>
          <button
            onClick={onToggleSound}
            className={`text-xs font-medium ${
              soundEnabled ? 'text-amber-600 dark:text-amber-400' : 'text-stone-400'
            }`}
          >
            {soundEnabled ? 'Uključeno' : 'Isključeno'}
          </button>
        </div>

        {/* Category filters for hourly trivia */}
        <div className="mt-4 pt-3 border-t border-stone-200 dark:border-stone-800">
          <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">
            Teme zanimljivosti:
          </span>
          <p className="text-[11px] text-stone-500 dark:text-stone-400 mb-2">
            Izaberite iz kojih filozofskih pravaca želite zanimljivosti
          </p>
          <div className="flex flex-wrap gap-1.5">
            {ERA_CATEGORIES.map((cat) => {
              const isSelected = selectedCategories.includes(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => onToggleCategory(cat.id)}
                  className={`rounded-lg px-2.5 py-1 text-xs transition-colors ${
                    isSelected
                      ? 'bg-amber-600 text-white font-medium'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
