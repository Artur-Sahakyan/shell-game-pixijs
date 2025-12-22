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

  public enable(): void {
    this.eventMode = "static";
    this.cursor = "pointer";
  }

  public disable(): void {
    this.eventMode = "none";
    this.cursor = "default";
  }

  update(deltaTime: number): void {
    const progress = Math.min(1, (deltaTime / 60) * GAME_CONFIG.cup.animation.speed);
    this.cover.y += (this.targetY - this.cover.y) * progress;
  }

  public get isOpened(): boolean {
    return this.isOpen;
  }

  public open(): void {
    if (this.isOpen) return;
    this.isOpen = true;
    this.targetY = -GAME_CONFIG.cup.animation.liftDistance;
  }

  public close(): void {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.targetY = 0;
  }

  public toggle(): void {
    if (this.isOpen) this.close();
    else this.open();
  }

}
