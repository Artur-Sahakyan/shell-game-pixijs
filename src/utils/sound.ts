class SoundManager {
  private moveSound: HTMLAudioElement | null = null;

  constructor() {
    this.loadSounds();
  }

  private loadSounds(): void {
    this.moveSound = new Audio("/sounds/move.mp3");
  }

  startMove(): void {
    if (this.moveSound) {
      this.moveSound.currentTime = 0;
      this.moveSound.play().catch(() => {});
    }
  }

  stopMove(): void {
    if (this.moveSound) {
      this.moveSound.pause();
      this.moveSound.currentTime = 0;
    }
  }
}

const soundManager = new SoundManager();

export function playMoveSound(): void {
  soundManager.startMove();
}

export function stopMoveSound(): void {
  soundManager.stopMove();
}

