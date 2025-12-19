import { Application } from "pixi.js";
import { COLORS } from "../config/colors";

export async function createApp(container: HTMLElement): Promise<Application> {
  const app = new Application();

  await app.init({
    background: COLORS.background,
    antialias: true,
    resizeTo: container,
  });

  container.appendChild(app.canvas);
  return app;
}
