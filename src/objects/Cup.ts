import { Container, Graphics } from "pixi.js";

type CupColors = {
  body: number;
  rim: number;
  base: number;
};

const DEFAULT_COLORS: CupColors = {
  body: 0x2a3a6b,
  rim: 0x3b57a3,
  base: 0x1f2c55,
};

export class Cup extends Container {
  readonly content: Container;

  private readonly bodyGfx: Graphics;

  constructor(colors: Partial<CupColors> = {}) {
    super();

    const c = { ...DEFAULT_COLORS, ...colors };

    // 1) content goes first (behind the cup)
    this.content = new Container();
    this.addChild(this.content);

    // 2) cup graphics on top (covers content)
    this.bodyGfx = new Graphics();

    // body (trapezoid)
    this.bodyGfx
      .moveTo(-70, -60)   // top-left
      .lineTo(70, -60)    // top-right
      .lineTo(50, 60)     // bottom-right
      .lineTo(-50, 60)    // bottom-left
      .closePath()
      .fill(c.body);

    // top rim (opening)
    this.bodyGfx.ellipse(0, -60, 70, 18).fill(c.rim);

    // bottom base
    this.bodyGfx.ellipse(0, 60, 50, 14).fill(c.base);

    this.addChild(this.bodyGfx);
  }
}
