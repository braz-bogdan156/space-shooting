import { hitTestRectangle } from "./hitTestRectangle.js";
import { spawnbossBullet } from "../objects/spawnbossBullet.js";
import { endGame } from "./endGame.js";
import { gameState } from "../game.js";
import { createBossHPBar } from "../objects/createBossHPBar.js";

export const manageBossBullets = (app, spaceship, boss, bossBullets) => {
  const bossHPBar = createBossHPBar(app);

  const spawnIntervalBossBullets = setInterval(() => {
    const bullet = spawnbossBullet(app, boss);
    bossBullets.push(bullet);
  }, 2000);

   const bossProcesses = () => {
    // Рух куль боса
    for (let i = bossBullets.length - 1; i >= 0; i--) {
      const bossBullet = bossBullets[i];
      if (!bossBullet) continue;
      bossBullet.y += 5;
      if (bossBullet.y > app.screen.height) {
        app.stage.removeChild(bossBullet);
        bossBullets.splice(i, 1);
        continue;
      }
      if (hitTestRectangle(bossBullet, gameState.spaceship)) {
        app.stage.removeChild(bossBullet);
        endGame(app, "YOU LOSE", "red");
        return;
      }
    }

    // Рух і перевірка колізій куль корабля
    for (let j = gameState.bullets.length - 1; j >= 0; j--) {
      const playerBullet = gameState.bullets[j];
      if (!playerBullet) continue;

      // Видаляємо кулі, які виходять за межі екрану, та збільшуємо лічильник пострілів
      if (playerBullet.y < 0) {
        app.stage.removeChild(playerBullet);
        gameState.bullets.splice(j, 1);
       
        
        // Перевірка умови програшу, якщо всі кулі вистріляні, а у боса ще залишились HP
        if (gameState.bulletData.shotsFired >= gameState.maxBullets && gameState.bossHP > 0) {
          endGame(app, "YOU LOSE", "red");
          return;
        }
        continue;
      }

      if (typeof playerBullet.collided === "undefined") {
        playerBullet.collided = false;
      }
      if (playerBullet.collided) continue;

      let collidedWithBossBullet = false;
      for (let i = bossBullets.length - 1; i >= 0; i--) {
        const bossBullet = bossBullets[i];
        if (hitTestRectangle(playerBullet, bossBullet)) {
          app.stage.removeChild(playerBullet);
          app.stage.removeChild(bossBullet);
          playerBullet.collided = true;
          gameState.bullets.splice(j, 1);
          bossBullets.splice(i, 1);
          collidedWithBossBullet = true;
          break;
        }
      }
      if (collidedWithBossBullet) continue;

      if (hitTestRectangle(playerBullet, boss)) {
        playerBullet.collided = true;
        app.stage.removeChild(playerBullet);
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
