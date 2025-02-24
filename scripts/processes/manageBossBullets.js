import { hitTestRectangle } from "./hitTestRectangle.js";
import { spawnbossBullet } from "../objects/spawnbossBullet.js";
import { endGame } from "./endGame.js";
import { gameState } from "../game.js";
import { createBossHPBar } from "../objects/createBossHPBar.js";
import { bossBulletMovementCallback } from "../tickerCallbacks/bossBulletMovementCallback.js";

export const manageBossBullets = (app, spaceship, boss, bossBullets) => {
    const bossHPBar = createBossHPBar(app);
    
  

    app.ticker.add(bossBulletMovementCallback);
    gameState.tickerCallbacks.push(() => app.ticker.remove(bossBulletMovementCallback));

    

    app.ticker.add(bossProcesses);
    gameState.tickerCallbacks.push(() => app.ticker.remove(bossProcesses));
};
