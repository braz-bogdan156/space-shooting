import { manageAsteroids1 } from "../tickerCallbacks/manageAsteroids1.js";
import { gameState } from "../game.js";

export const manageAsteroids = (app, spaceship, asteroids, endGame) => {
  app.ticker.add(manageAsteroids1);
  gameState.tickerCallbacks.push(() => app.ticker.remove(manageAsteroids1));
};
