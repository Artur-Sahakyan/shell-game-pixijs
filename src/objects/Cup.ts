import { Container, Graphics } from "pixi.js";
import { COLORS } from "../config/colors";
import { GAME_CONFIG } from "../config/game";

export class Cup extends Container {
  private readonly cover: Container;
  readonly content: Container;
  private isOpen = false;
  private targetY = 0;
  public index: number = -1;

  constructor() {
    super();
    
    this.content = new Container();
    this.addChild(this.content);
    
    this.cover = this.createCover();
    this.setupClick();
  }

  private createCover(): Container {
    const cover = new Container();
    const graphics = new Graphics();
    
    graphics
      .moveTo(-70, -60)
      .lineTo(70, -60)
      .lineTo(50, 60)
      .lineTo(-50, 60)
      .closePath()
      .fill(COLORS.cup.body);
    
    graphics.ellipse(0, -60, 70, 18).fill(COLORS.cup.rim);
    graphics.ellipse(0, 60, 50, 14).fill(COLORS.cup.base);
    
    cover.addChild(graphics);
    this.addChild(cover);
    return cover;
  }

  private setupClick(): void {
    this.eventMode = "static";
    this.cursor = "pointer";
    this.on("pointerdown", () => this.toggle());
  }

  update(deltaTime: number): void {
    const progress = Math.min(1, (deltaTime / 60) * GAME_CONFIG.cup.animation.speed);
    this.cover.y += (this.targetY - this.cover.y) * progress;
  }

  toggle(): void {
    console.log(this.content, ' content')
    this.isOpen = !this.isOpen;
    this.targetY = this.isOpen ? -GAME_CONFIG.cup.animation.liftDistance : 0;
  }

  getIsOpen(): boolean {
    return this.isOpen;
  }

  close(): void {
    if (this.isOpen) {
      this.toggle();
    }
  }
}
