import { createApp } from "./core/createApp";
import { Game } from "./core/Game";

async function main() {
  const container = document.getElementById("app") ?? document.body;
  const app = await createApp(container);
  new Game(app);
}

main();
