import { Container, type Renderer } from "pixi.js";
import { GAME_CONFIG } from "../config/game";
import { randomInt } from "../utils/random";
import { COLORS } from "../config/colors";
import { Button } from "../ui/Button";
import { Cup } from "../objects/Cup";
import { Dot } from "../objects/Dot";


export class CupScene extends Container {
  private cups: Cup[] = [];
  private dotIndex: number = -1;
  private restartButton: Button | null = null;

  constructor(private readonly renderer: Renderer) {
    super();
    this.createCups();
    this.placeDot();
    this.layout();
  }

  private createCups(): void {
    for (let i = 0; i < GAME_CONFIG.cup.count; i++) {
      const cup = new Cup();
      cup.index = i;

      cup.on("pointerdown", () => this.handleCupClick(cup));

      this.cups.push(cup);
      this.addChild(cup);
    }
  }

  private handleCupClick(cup: Cup): void {
    console.log(cup, ' cup')
    this.endGame();
    this.showRestartButton();
  }

  private placeDot(): void {
    const dot = new Dot();

    this.dotIndex = randomInt(0, this.cups.length - 1);
    this.cups[this.dotIndex].content.addChild(dot);
  }

  private showRestartButton(): void {
    if (this.restartButton) return;

    this.restartButton = new Button({
      text: "Restart",
      width: GAME_CONFIG.button.width,
      height: GAME_CONFIG.button.height,
      bgColor: COLORS.button.bg,
      textColor: COLORS.button.text,
      fontSize: GAME_CONFIG.button.fontSize,
      borderRadius: GAME_CONFIG.button.borderRadius,
      onClick: () => this.restart(),
    });

    this.restartButton.position.set(
      this.renderer.width / 2 - GAME_CONFIG.button.width / 2,
      this.renderer.height / 2 + GAME_CONFIG.button.offsetY
    );

    this.addChild(this.restartButton);
  }

  private restart(): void {
    this.cups.forEach((cup) => {
      cup.content.removeChildren();
      cup.enable();
      cup.close();
    });

    this.restartButton?.destroy();
    this.restartButton = null;

    this.placeDot();
  }

  private endGame(): void {
    this.cups.forEach((cup) => {cup.disable()});
  }

  public layout(): void {
    const spacing = GAME_CONFIG.cup.spacing;
    const startX = this.renderer.width / 2 - spacing;
    const centerY = this.renderer.height / 2;

    this.cups.forEach((cup, index) => {
      cup.position.set(startX + index * spacing, centerY);
    });
  }

  update(deltaTime: number): void {
    this.cups.forEach((cup) => cup.update(deltaTime));
  }
}
