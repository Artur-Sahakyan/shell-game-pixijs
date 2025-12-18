import { createApp } from "./core/createApp";
import { CupScene } from "./scenes/CupScene";

async function main() {
  const container = document.getElementById("app") ?? document.body;

  const app = await createApp(container);

  const scene = new CupScene(app.renderer);
  app.stage.addChild(scene);
  // app.stage.addChild(scene);

  window.addEventListener("resize", () => scene.layout());
}

main();
