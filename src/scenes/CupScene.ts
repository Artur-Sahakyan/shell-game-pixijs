import { Container, type Renderer } from "pixi.js";
import { Cup } from "../objects/Cup";

export class CupScene extends Container {
  private readonly cup: Cup;

  constructor(private readonly renderer: Renderer) {
    super();

    this.cup = new Cup();
    this.addChild(this.cup);
    this.centerCup();
  }

  private centerCup(): void {
    const centerX = this.renderer.width / 2;
    const centerY = this.renderer.height / 2;
    this.cup.position.set(centerX, centerY);
  }

  update(deltaTime: number): void {
    this.cup.update(deltaTime);
  }

  layout(): void {
    this.centerCup();
  }
}
