import { Container } from "pixi.js";
import type { Renderer } from "pixi.js";
import { Cup } from "../objects/Cup";

export class CupScene extends Container {
  private cup: Cup;

  constructor(private renderer: Renderer) {
    super();

    this.cup = new Cup();
    this.addChild(this.cup);

    this.layout();
  }

  layout() {
    this.cup.position.set(this.renderer.width / 2, this.renderer.height / 2);
  }
}
