import { hitTestRectangle } from "./hitTestRectangle.js";
import { spawnbossBullet } from "../objects/spawnbossBullet.js";
import { endGame } from "./endGame.js";
import { gameState } from "../game.js";
import { createBossHPBar } from "../objects/createBossHPBar.js";
import { moveBossBullets } from "./moveBossBullets.js";

export const manageBossBullets = (app, spaceship, boss, bossBullets) => {
  const bossHPBar = createBossHPBar(app);

  const spawnIntervalBossBullets = setInterval(() => {
    const bullet = spawnbossBullet(app, boss);
    bossBullets.push(bullet);
  
  }, 2000);

  const bossProcesses = () => {
      moveBossBullets(app, bossBullets);

      for(let i = bossBullets.length - 1; i>=0; i--) {
      if (hitTestRectangle(bossBullets[i], gameState.spaceship)) {
      
        app.stage.removeChild(bossBullets[i]);
        endGame(app, "YOU LOSE", "red");
        return;
      }
    }

    // Рух і перевірка колізій куль корабля
    for (let j = gameState.bullets.length - 1; j >= 0; j--) {
      if (!gameState.bullets[j]) continue;

      // Видаляємо кулі, які виходять за межі екрану
      if (gameState.bullets[j].y < 0) {
        
        app.stage.removeChild(gameState.bullets[j]);
        gameState.bullets.splice(j, 1);
        if (gameState.bulletData.shotsFired >= gameState.maxBullets && gameState.bossHP > 0) {
          endGame(app, "YOU LOSE", "red");
          return;
        }
        continue;
      }

      if (typeof gameState.bullets[j].collided === "undefined") {
        gameState.bullets[j].collided = false;
      }
      if (gameState.bullets[j].collided) continue;

      let collidedWithBossBullet = false;
      // 1. Перевірка зіткнення кулі корабля з кулею боса
      for (let i = bossBullets.length - 1; i >= 0; i--) {
        if (hitTestRectangle(gameState.bullets[j], bossBullets[i])) {

          app.stage.removeChild(gameState.bullets[j]);
          app.stage.removeChild(bossBullets[i]);
          gameState.bullets[j].collided = true;
          gameState.bullets.splice(j, 1);
          bossBullets.splice(i, 1);
          collidedWithBossBullet = true;
          break;
        }
      }
      if (collidedWithBossBullet) continue;

      // 2. Перевірка зіткнення кулі корабля з босом
      if (hitTestRectangle(gameState.bullets[j], boss)) {
    
        gameState.bullets[j].collided = true;
        app.stage.removeChild(gameState.bullets[j]);
        gameState.bullets.splice(j, 1);
        gameState.bossHP--;
      
        bossHPBar.text = `Boss HP: ${gameState.bossHP}`;

        if (gameState.bossHP === 0) {
         
          clearInterval(spawnIntervalBossBullets);
          endGame(app, "YOU WIN", "green", true);
          return;
        }
        continue;
      }
    }
  };

  app.ticker.add(bossProcesses);
  gameState.tickerCallbacks.push(() => app.ticker.remove(bossProcesses));
};