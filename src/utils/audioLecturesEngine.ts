import { HeadphoneAmbienceMode } from '../types/philosophy';

/**
 * Spatial binaural / atmospheric synthesizer designed specifically for headphone immersion.
 * Uses pure Web Audio API without needing external network audio assets.
 */
class HeadphoneAmbienceEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private activeNodes: { stop?: () => void; disconnect: () => void }[] = [];
  private currentMode: HeadphoneAmbienceMode = 'none';
  private currentVolume: number = 0.35; // Default 35% comfortable ambient mix

  private initContext(): boolean {
    try {
      if (!this.ctx) {
        const AudioCtxClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtxClass) return false;
        this.ctx = new AudioCtxClass();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      if (!this.masterGain && this.ctx) {
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
      return true;
    } catch (e) {
      console.warn('AudioContext init error:', e);
      return false;
    }
  }

  public setVolume(volume: number) {
    this.currentVolume = Math.max(0, Math.min(1, volume));
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setTargetAtTime(this.currentVolume, this.ctx.currentTime, 0.1);
    }
  }

  public getVolume(): number {
    return this.currentVolume;
  }

  public stop() {
    this.currentMode = 'none';
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.2);
    }
    setTimeout(() => {
      this.activeNodes.forEach((node) => {
        try {
          if (node.stop) node.stop();
          node.disconnect();
        } catch {}
      });
      this.activeNodes = [];
    }, 300);
  }

  public setMode(mode: HeadphoneAmbienceMode) {
    if (this.currentMode === mode && this.activeNodes.length > 0) return;
    this.stop();
    this.currentMode = mode;

    if (mode === 'none') return;
    if (!this.initContext() || !this.ctx || !this.masterGain) return;

    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.masterGain.gain.setTargetAtTime(this.currentVolume, this.ctx.currentTime, 0.5);

    switch (mode) {
      case 'binaural_theta':
        this.startBinauralTheta();
        break;
      case 'agora_wind':
        this.startAgoraWind();
        break;
      case 'rain_library':
        this.startRainLibrary();
        break;
      case 'temple_silence':
        this.startTempleSilence();
        break;
    }
  }

  public getMode(): HeadphoneAmbienceMode {
    return this.currentMode;
  }

  /**
   * 432Hz deep meditative drone with 6Hz binaural difference (432Hz left, 438Hz right)
   * Perfect for headphone relaxation and contemplative focus.
   */
  private startBinauralTheta() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;

    // Channel merger for discrete Left / Right headphone delivery
    const merger = ctx.createChannelMerger(2);

    // Left Ear 432 Hz
    const oscL = ctx.createOscillator();
    const gainL = ctx.createGain();
    oscL.type = 'sine';
    oscL.frequency.setValueAtTime(432, ctx.currentTime);
    gainL.gain.setValueAtTime(0.12, ctx.currentTime);
    oscL.connect(gainL);
    gainL.connect(merger, 0, 0); // channel 0 = Left

    // Right Ear 438 Hz (produces 6Hz theta entrainment in headphones)
    const oscR = ctx.createOscillator();
    const gainR = ctx.createGain();
    oscR.type = 'sine';
    oscR.frequency.setValueAtTime(438, ctx.currentTime);
    gainR.gain.setValueAtTime(0.12, ctx.currentTime);
    oscR.connect(gainR);
    gainR.connect(merger, 0, 1); // channel 1 = Right

    // Warm sub-bass harmonic for acoustic weight (108 Hz)
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(108, ctx.currentTime);
    subGain.gain.setValueAtTime(0.04, ctx.currentTime);
    subOsc.connect(subGain);
    subGain.connect(this.masterGain);

    merger.connect(this.masterGain);

    oscL.start();
    oscR.start();
    subOsc.start();

    this.activeNodes.push(
      { stop: () => oscL.stop(), disconnect: () => oscL.disconnect() },
      { stop: () => oscR.stop(), disconnect: () => oscR.disconnect() },
      { stop: () => subOsc.stop(), disconnect: () => subOsc.disconnect() },
      { disconnect: () => merger.disconnect() }
    );
  }

  /**
   * Ancient Greek Agora breeze - filtered pink noise with subtle low LFO modulation
   */
  private startAgoraWind() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;

    // Generate 5s seamless noise buffer
    const bufferSize = ctx.sampleRate * 5;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      output[i] = (b0 + b1 + b2) * 0.1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    // Filter simulating breeze through marble pillars
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, ctx.currentTime);

    // LFO to create natural wind billows
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(0.18, ctx.currentTime);
    lfoGain.gain.setValueAtTime(250, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.18, ctx.currentTime);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    noise.start();
    lfo.start();

    this.activeNodes.push(
      { stop: () => noise.stop(), disconnect: () => noise.disconnect() },
      { stop: () => lfo.stop(), disconnect: () => lfo.disconnect() },
      { disconnect: () => filter.disconnect() }
    );
  }

  /**
   * Soft rain falling outside ancient library windows
   */
  private startRainLibrary() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;

    const bufferSize = ctx.sampleRate * 4;
    const noiseBuffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);
    const left = noiseBuffer.getChannelData(0);
    const right = noiseBuffer.getChannelData(1);

    for (let i = 0; i < bufferSize; i++) {
      left[i] = (Math.random() * 2 - 1) * 0.08;
      right[i] = (Math.random() * 2 - 1) * 0.08;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(1100, ctx.currentTime);
    bandpass.Q.setValueAtTime(0.8, ctx.currentTime);

    const rainGain = ctx.createGain();
    rainGain.gain.setValueAtTime(0.22, ctx.currentTime);

    noise.connect(bandpass);
    bandpass.connect(rainGain);
    rainGain.connect(this.masterGain);

    noise.start();

    this.activeNodes.push(
      { stop: () => noise.stop(), disconnect: () => noise.disconnect() },
      { disconnect: () => bandpass.disconnect() },
      { disconnect: () => rainGain.disconnect() }
    );
  }

  /**
   * Temple Silence - deep resonant calming drone
   */
  private startTempleSilence() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;

    const freqs = [108, 162, 216];
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(idx === 0 ? 0.08 : 0.03, ctx.currentTime);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start();
      this.activeNodes.push({
        stop: () => osc.stop(),
        disconnect: () => osc.disconnect(),
      });
    });
  }
}

export const headphoneAmbience = new HeadphoneAmbienceEngine();

/**
 * Audio Lecture speech synthesizer manager using Web Speech API.
 * Breaks lectures into digestible sentences and emits progress callbacks.
 */
export interface LectureProgress {
  sectionIndex: number;
  sentenceIndex: number;
  totalSentences: number;
  progressPercent: number;
  currentSentenceText: string;
}

export class LectureSpeechController {
  private sentences: string[] = [];
  private sectionMap: { sectionIndex: number; sentenceIndexInSection: number }[] = [];
  private currentIndex: number = 0;
  private isPlaying: boolean = false;
  private isPaused: boolean = false;
  private speechRate: number = 0.90; // Slower, clearer philosophical cadence
  private selectedVoiceName: string = '';
  private onProgressCallback?: (progress: LectureProgress) => void;
  private onEndCallback?: () => void;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    this.loadVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
    }
  }

  private loadVoices() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.voices = window.speechSynthesis.getVoices();
    }
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    if (this.voices.length === 0) {
      this.loadVoices();
    }
    return this.voices;
  }

  public setSelectedVoice(name: string) {
    this.selectedVoiceName = name;
  }

  public getSelectedVoiceName(): string {
    return this.selectedVoiceName;
  }

  public testVoice(name?: string, customText?: string) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const testText = customText || 'Pozdrav. Dobrodošli u filozofsku audio lekciju. Mudrost je put ka unutrašnjem miru.';
    const utterance = new SpeechSynthesisUtterance(testText);
    utterance.rate = this.speechRate;
    utterance.pitch = 0.98;

    const voices = this.getAvailableVoices();
    const targetName = name || this.selectedVoiceName;
    const voice = voices.find((v) => v.name === targetName) || this.findBestVoice();
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = 'sr-RS';
    }
    window.speechSynthesis.speak(utterance);
  }

  public setRate(rate: number) {
    this.speechRate = Math.max(0.6, Math.min(2.0, rate));
  }

  public getRate(): number {
    return this.speechRate;
  }

  public prepareLesson(
    sections: { text: string }[],
    onProgress: (p: LectureProgress) => void,
    onEnd: () => void
  ) {
    this.stop();
    this.onProgressCallback = onProgress;
    this.onEndCallback = onEnd;
    this.sentences = [];
    this.sectionMap = [];
    this.currentIndex = 0;

    sections.forEach((sec, secIdx) => {
      // Split text into meaningful spoken units (sentence boundaries, colons, or em-dashes)
      const rawSentences = sec.text
        .replace(/([.?!])\s*(?=[A-ZŠĐČĆŽА-Я0-9„"“])/g, '$1|')
        .split('|')
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      rawSentences.forEach((sentence, sIdx) => {
        this.sentences.push(sentence);
        this.sectionMap.push({ sectionIndex: secIdx, sentenceIndexInSection: sIdx });
      });
    });
  }

  public play(fromSentenceIndex = 0) {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser');
      return;
    }
    if (this.sentences.length === 0) return;

    window.speechSynthesis.cancel();
    this.currentIndex = Math.max(0, Math.min(fromSentenceIndex, this.sentences.length - 1));
    this.isPlaying = true;
    this.isPaused = false;
    this.speakCurrent();
  }

  public pause() {
    if (!this.isPlaying) return;
    this.isPaused = true;
    this.isPlaying = false;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public resume() {
    if (this.isPaused) {
      this.isPlaying = true;
      this.isPaused = false;
      this.speakCurrent();
    } else {
      this.play(this.currentIndex);
    }
  }

  public stop() {
    this.isPlaying = false;
    this.isPaused = false;
    this.currentIndex = 0;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public skipForward() {
    if (this.sentences.length === 0) return;
    const target = Math.min(this.sentences.length - 1, this.currentIndex + 2);
    this.seekSentence(target);
  }

  public skipBackward() {
    if (this.sentences.length === 0) return;
    const target = Math.max(0, this.currentIndex - 2);
    this.seekSentence(target);
  }

  public seekSentence(index: number) {
    const wasPlaying = this.isPlaying;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.currentIndex = Math.max(0, Math.min(index, this.sentences.length - 1));
    if (wasPlaying) {
      this.speakCurrent();
    } else {
      this.notifyProgress();
    }
  }

  public seekSection(sectionIndex: number) {
    const foundIndex = this.sectionMap.findIndex((m) => m.sectionIndex === sectionIndex);
    if (foundIndex !== -1) {
      this.seekSentence(foundIndex);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getIsPaused(): boolean {
    return this.isPaused;
  }

  public getCurrentIndex(): number {
    return this.currentIndex;
  }

  private findBestVoice(): SpeechSynthesisVoice | null {
    if (this.voices.length === 0) {
      this.loadVoices();
    }
    if (this.selectedVoiceName) {
      const explicit = this.voices.find((v) => v.name === this.selectedVoiceName);
      if (explicit) return explicit;
    }

    // 1. Strict Priority: Serbian voices ('sr', 'serbian', 'srpski')
    const serbianVoice = this.voices.find(
      (v) =>
        v.lang.toLowerCase().includes('sr') ||
        v.name.toLowerCase().includes('serbian') ||
        v.name.toLowerCase().includes('srpski')
    );
    if (serbianVoice) return serbianVoice;

    // 2. Priority: Croatian or Bosnian voices ('hr', 'bs', 'sh', 'croatian', 'hrvatski')
    const croatianBosnianVoice = this.voices.find(
      (v) =>
        v.lang.toLowerCase().includes('hr') ||
        v.lang.toLowerCase().includes('bs') ||
        v.lang.toLowerCase().includes('sh') ||
        v.name.toLowerCase().includes('croatian') ||
        v.name.toLowerCase().includes('hrvatski')
    );
    if (croatianBosnianVoice) return croatianBosnianVoice;

    // 3. Priority: Any Neural / Natural voice available in browser
    const anyNeural = this.voices.find(
      (v) =>
        v.name.toLowerCase().includes('neural') ||
        v.name.toLowerCase().includes('natural') ||
        v.name.toLowerCase().includes('online')
    );
    if (anyNeural) return anyNeural;

    // Fallback: Default system voice
    return this.voices.find((v) => v.default) || this.voices[0] || null;
  }

  private notifyProgress() {
    if (this.onProgressCallback && this.sentences.length > 0) {
      const currentMap = this.sectionMap[this.currentIndex] || {
        sectionIndex: 0,
        sentenceIndexInSection: 0,
      };
      const percent = Math.round(((this.currentIndex + 1) / this.sentences.length) * 100);
      this.onProgressCallback({
        sectionIndex: currentMap.sectionIndex,
        sentenceIndex: this.currentIndex,
        totalSentences: this.sentences.length,
        progressPercent: percent,
        currentSentenceText: this.sentences[this.currentIndex] || '',
      });
    }
  }

  private speakCurrent() {
    if (!this.isPlaying || this.currentIndex >= this.sentences.length) {
      this.isPlaying = false;
      this.isPaused = false;
      if (this.currentIndex >= this.sentences.length && this.onEndCallback) {
        this.onEndCallback();
      }
      return;
    }

    const textToSpeak = this.sentences[this.currentIndex];
    this.notifyProgress();

    try {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = this.speechRate;
      utterance.pitch = 0.98; // Calm, deep professorial tone

      const voice = this.findBestVoice();
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      } else {
        utterance.lang = 'sr-RS';
      }

      utterance.onend = () => {
        if (!this.isPlaying) return;
        this.currentIndex++;
        // Natural contemplative pause between sentences (300ms)
        setTimeout(() => {
          if (this.isPlaying) {
            this.speakCurrent();
          }
        }, 320);
      };

      utterance.onerror = (e) => {
        console.warn('Utterance error:', e);
        if (this.isPlaying) {
          this.currentIndex++;
          setTimeout(() => this.speakCurrent(), 300);
        }
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('SpeechSynthesis speak failed:', err);
      this.isPlaying = false;
    }
  }
}

export const lectureSpeechController = new LectureSpeechController();
