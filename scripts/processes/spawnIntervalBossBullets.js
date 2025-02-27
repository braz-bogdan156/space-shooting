import { spawnbossBullet } from "../objects/spawnbossBullet.js";
import { gameState } from "../game.js";
import { spawnRandomBossBullets } from "../objects/spawnRandomBossBullets.js";

export const spawnIntervalBossBullets = () => {
  return setInterval(() => {
    if (gameState.alternate) {
      const bullet = spawnbossBullet();
      if (bullet) {
        gameState.bossBullets.push(bullet);
      }
    } else {
      spawnRandomBossBullets();
    }
    gameState.alternate = !gameState.alternate; // Чергування кожні 2 секунди
  }, 2000);
};
