import { Container, type Renderer } from "pixi.js";
import { GAME_CONFIG } from "../config/game";
import { randomInt } from "../utils/random";
import { Button } from "../ui/Button";
import { Cup } from "../objects/Cup";
import { Dot } from "../objects/Dot";

type Pos = { x: number; y: number };

export class CupScene extends Container {
  private cups: Cup[] = [];
  private dotIndex = -1;

  private restartButton: Button | null = null;
  private shuffleButton: Button | null = null;

  private slots: Pos[] = [];
  private cupSlotIndex: number[] = [];

  private cupTargets: { cup: Cup; targetX: number; targetY: number }[] = [];
  private readonly renderer: Renderer;

  private isShuffling = false;
  private shuffleLeftMs = 0;
  private stepLeftMs = 0;

  private readonly stepIntervalMs = 400;
  private readonly totalShuffleMs = 2000;

  constructor(renderer: Renderer) {
    super();
    this.renderer = renderer;
    this.sortableChildren = true;

    this.createCups();
    this.layout();
    this.placeDot();
    this.showShuffleButton();
  }

  private createCups(): void {
    for (let i = 0; i < GAME_CONFIG.cup.count; i++) {
      const cup = new Cup();
      cup.index = i;
      cup.disable();
      cup.on("pointerdown", () => this.handleCupClick(cup));

      this.cups.push(cup);
      this.addChild(cup);

      this.cupSlotIndex[i] = i;
    }
  }

  private startShuffle(): void {
    if (this.isShuffling) return;

    this.isShuffling = true;
    this.shuffleLeftMs = this.totalShuffleMs;
    this.stepLeftMs = 0;

    this.rotateOnce();

    this.cups.forEach((c) => c.disable());
  }

  private rotateOnce(): void {
    if (this.slots.length !== this.cups.length) this.layout();

    if (this.cups.length === 3) {
      const [a, b, c] = this.cupSlotIndex;
      this.cupSlotIndex = Math.random() < 0.5 ? [c, a, b] : [b, c, a];
    }

    this.applyCupPositions();
  }

  private applyCupPositions(): void {
    if (this.slots.length !== this.cups.length) return;

    this.cupTargets = this.cups.map((cup, cupIndex) => {
      const slotIndex = this.cupSlotIndex[cupIndex] ?? cupIndex;
      const p = this.slots[slotIndex];
      return { cup, targetX: p.x, targetY: p.y };
    });
  }

  private async handleCupClick(cup: Cup): Promise<void> {
    console.log(cup, ' cup');
    if (this.isShuffling) return;
    this.shuffleButton?.disable();

    const openCupsTimeMs = 1000;

    window.setTimeout(() => {
      this.cups.forEach((c) => c.open());
      this.endGame();
      this.showRestartButton();
  
    }, openCupsTimeMs);
  }

  private placeDot(): void {
    const dot = new Dot();
    this.dotIndex = randomInt(0, this.cups.length - 1);
    this.cups[this.dotIndex].content.addChild(dot);
  }

  private showShuffleButton(): void {
    if (this.shuffleButton) return;

    this.shuffleButton = new Button({
      text: "Shuffleee",
      onClick: () => this.startShuffle(),
    });

    if (this.shuffleButton) {
      this.shuffleButton.position.set(
      this.renderer.width / 2 - GAME_CONFIG.button.width / 2,
      this.renderer.height / 2 + GAME_CONFIG.button.offsetY + 70
    );
  }

    this.addChild(this.shuffleButton);
  }

  private showRestartButton(): void {
    if (this.restartButton) return;

    this.restartButton = new Button({
      text: "Restart",
      onClick: () => this.restart(),
    });

    this.restartButton.position.set(
      this.renderer.width / 2 - GAME_CONFIG.button.width / 2,
      this.renderer.height / 2 + GAME_CONFIG.button.offsetY + 70
    );

    this.addChild(this.restartButton);
  }

  private restart(): void {
    this.cups.forEach((cup) => {
      cup.content.removeChildren();
      cup.disable();
      cup.close();
    });

    this.restartButton?.destroy();
    this.restartButton = null;
    this.shuffleButton?.enable();

    this.placeDot();
  }

  private endGame(): void {
    this.cups.forEach((cup) => cup.disable());
  }

  public layout(): void {
    const spacing = GAME_CONFIG.cup.spacing;
    const startX = this.renderer.width / 2 - spacing;
    const centerY = this.renderer.height / 2;

    this.slots = this.cups.map((_, index) => ({
      x: startX + index * spacing,
      y: centerY,
    }));

    this.applyCupPositions();
  }

  update(deltaTime: number): void {
    this.cups.forEach((cup) => cup.update(deltaTime));
    this.moveCups(deltaTime);

    if (this.isShuffling) {
      const deltaMs = (deltaTime / 60) * 1000;

      this.shuffleLeftMs -= deltaMs;
      this.stepLeftMs -= deltaMs;

      if (this.stepLeftMs <= 0) {
        this.rotateOnce();
        this.stepLeftMs = this.stepIntervalMs;
      }

      if (this.shuffleLeftMs <= 0) {
        this.isShuffling = false;
        this.cups.forEach((c) => c.enable());
      }
    }
  }

  private moveCups(deltaTime: number): void {
    const speed = 10;
    const progress = Math.min(1, (deltaTime / 60)) * speed;

    this.cupTargets.forEach(({ cup, targetX, targetY }) => {
      cup.x += (targetX - cup.x) * progress;
      cup.y += (targetY - cup.y) * progress;
    });
  }
}
