import { bossProcesses } from "../tickerCallbacks/bossProcesses.js";
import { gameState } from "../game.js";
import { bossBulletMovementCallback } from "../tickerCallbacks/bossBulletMovementCallback.js";

export const manageBossBullets = (app, spaceship, boss, bossBullets) => {
   
  

    app.ticker.add(bossBulletMovementCallback);
    gameState.tickerCallbacks.push(() => app.ticker.remove(bossBulletMovementCallback));

    

    app.ticker.add(bossProcesses);
    gameState.tickerCallbacks.push(() => app.ticker.remove(bossProcesses));
};
