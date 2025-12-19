import { Container, Graphics } from "pixi.js";
import { COLORS } from "../config/colors";
import { GAME_CONFIG } from "../config/game";

export class Dot extends Container {
  constructor() {
    super();

    const graphics = new Graphics()
      .circle(0, 0, GAME_CONFIG.dot.radius)
      .fill(COLORS.dot);

    graphics.position.set(0, GAME_CONFIG.dot.offsetY);
    this.addChild(graphics);
  }
}
