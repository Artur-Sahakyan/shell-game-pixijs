import { Container, Graphics } from "pixi.js";

const CUP_COLORS = {
  body: 0x2a3a6b,
  rim: 0x3b57a3,
  base: 0x1f2c55,
};

const ANIMATION = {
  liftDistance: 120,
  speed: 10,
  snapThreshold: 0.2,
};

export class Cup extends Container {
  private readonly cover: Container;
  private isOpen = false;
  private targetY = 0;

  constructor() {
    super();
    
    this.cover = this.createCup();
    this.setupClick();
  }

  private createCup(): Container {
    const cover = new Container();
    const graphics = new Graphics();
    
    graphics
      .moveTo(-70, -60)
      .lineTo(70, -60)
      .lineTo(50, 60)
      .lineTo(-50, 60)
      .closePath()
      .fill(CUP_COLORS.body);
    graphics.ellipse(0, -60, 70, 18).fill(CUP_COLORS.rim);    
    graphics.ellipse(0, 60, 50, 14).fill(CUP_COLORS.base);
    
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
    const progress = Math.min(1, (deltaTime / 60) * ANIMATION.speed);
    
    this.cover.y += (this.targetY - this.cover.y) * progress;
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
    this.targetY = this.isOpen ? -ANIMATION.liftDistance : 0;
  }
}
