// Web Audio API lightweight sound synthesizer
// Audio is strictly MUTED by default and requires explicit user enablement
class SoundController {
  constructor() {
    this.enabled = false;
    this.audioCtx = null;
  }

  init() {
    if (!this.audioCtx && typeof window !== "undefined") {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.init();
      this.playBeep(880, 0.08, "sine");
    }
    return this.enabled;
  }

  playBeep(freq = 800, duration = 0.05, type = "sine", volume = 0.03) {
    if (!this.enabled || !this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(volume, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch {
      // Ignore audio synthesis errors
    }
  }

  playClick() {
    this.playBeep(1200, 0.03, "triangle", 0.02);
  }

  playDock() {
    if (!this.enabled || !this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(1040, now + 0.15);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(now + 0.25);
    } catch {
      // Ignore
    }
  }

  playTerminalKey() {
    this.playBeep(700 + Math.random() * 200, 0.02, "sine", 0.015);
  }
}

export const soundFx = new SoundController();
