import { Application } from "pixi.js";

export async function createApp(container: HTMLElement) {
  const app = new Application();

  await app.init({
    background: "#0b1020",
    antialias: true,
    resizeTo: container,
  });

  container.appendChild(app.canvas);
  return app;
}
