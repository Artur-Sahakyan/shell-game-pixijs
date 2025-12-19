import { Container, Graphics, type Renderer } from "pixi.js";
import { Cup } from "../objects/Cup";

export class CupScene extends Container {
  private readonly cups: Cup[] = [];
  
  constructor(private readonly renderer: Renderer) {
    super();

    this.createCups();
    this.placeDot();
    this.layout();
  }

  private createCups(): void {
    for (let i = 0; i < 3; i++) {
      const cup = new Cup();
      this.cups.push(cup);
      this.addChild(cup);
    }
  }

  private placeDot(): void {
    const dot = new Graphics().circle(0, 0, 15).fill(0xffcc00);
    dot.position.set(0, 20);
    
    const randomIndex = Math.floor(Math.random() * 3);
    this.cups[randomIndex].content.addChild(dot);
  }

  public layout(): void {
    const spacing = 200;
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
