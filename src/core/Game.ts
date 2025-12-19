import { Application } from "pixi.js";
import { CupScene } from "../scenes/CupScene";

export class Game {
  private readonly app: Application;
  private readonly scene: CupScene;

  constructor(app: Application) {
    this.app = app;
    this.scene = new CupScene(app.renderer);
    this.app.stage.addChild(this.scene);
    this.setup();
  }

  private setup(): void {
    window.addEventListener("resize", () => this.scene.layout());
    
    this.app.ticker.add((ticker) => {
      this.scene.update(ticker.deltaTime);
    });
  }
}

