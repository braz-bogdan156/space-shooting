import { app, gameState } from "../game.js";
import { moveSpaceshipBullets } from "../tickerCallbacks/moveSpaceshipBullets.js";

export const spaceshipBullets = () => {
  app.ticker.add(moveSpaceshipBullets);
  gameState.tickerCallbacks.push(() => app.ticker.remove(moveSpaceshipBullets));
};
