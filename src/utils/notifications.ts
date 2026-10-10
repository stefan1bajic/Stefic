import { TriviaItem } from '../types/philosophy';

// Web Audio API pure synthesized chime (harmonic temple bell)
export function playChimeSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;
    
    // 3 layered harmonic frequencies for an ancient bronze bell chime
    const freqs = [523.25, 659.25, 783.99]; // C5, E5, G5
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.12, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 1.25);
    });
  } catch (e) {
    console.warn('Audio chime failed to play:', e);
  }
}

// Web Speech API for reading philosophical quotes aloud
export function speakText(text: string, lang = 'sr-RS') {
  if (!('speechSynthesis' in window)) {
    return false;
  }
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95; // calm, contemplative philosophical cadence
    utterance.pitch = 1.0;
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.warn('Speech synthesis error:', err);
    return false;
  }
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

// Browser Web Notification API helper
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    return 'denied';
  }
  if (Notification.permission === 'granted') {
    return 'granted';
  }
  try {
    const perm = await Notification.requestPermission();
    return perm;
  } catch {
    return 'denied';
  }
}

export function sendBrowserNotification(trivia: TriviaItem): boolean {
  if (!('Notification' in window) || Notification.permission !== 'granted') {
    return false;
  }
  try {
    const options: NotificationOptions = {
      body: `${trivia.funFactHighlight}\n${trivia.content.slice(0, 140)}...`,
      icon: '/icon.svg',
      badge: '/icon.svg',
      tag: `philosophy-trivia-${trivia.id}`,
    };
    new Notification(`🏛️ Filozofska zanimljivost: ${trivia.philosopherName}`, options);
    return true;
  } catch (e) {
    console.warn('Failed to send browser notification:', e);
    return false;
  }
}
