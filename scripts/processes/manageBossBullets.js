import { hitTestRectangle } from './hitTestRectangle.js';
import { spawnbossBullet } from '../objects/spawnbossBullet.js';
import { endGame } from './endGame.js';
import { gameState } from '../game.js';
import { createBossHPBar } from '../objects/createBossHPBar.js';

export const manageBossBullets = (app, spaceship, boss, bossBullets) => {
  // Створюємо індикатор HP боса за допомогою окремої функції
  const bossHPBar = createBossHPBar(app);

  // Запускаємо інтервал для спауну куль боса кожні 2000 мс
  const spawnIntervalBossBullets = setInterval(() => {
    const bullet = spawnbossBullet(app, boss);
    bossBullets.push(bullet);
  }, 2000);

  // Додаємо ticker-колбек, який оновлює рух куль і перевіряє колізії
  app.ticker.add(() => {
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
      // Перевірка зіткнення куль боса з кораблем
      if (hitTestRectangle(bossBullet, gameState.spaceship)) {
        app.stage.removeChild(bossBullet);
        endGame(app, "YOU LOSE", "red");
      }
    }

    // Рух і перевірка колізій куль корабля
    for (let j = gameState.bullets.length - 1; j >= 0; j--) {
      let playerBullet = gameState.bullets[j];
      if (!playerBullet) continue;

      if (playerBullet.y < 0) {
        app.stage.removeChild(playerBullet);
        gameState.bullets.splice(j, 1);
        continue;
      }

     
      // Якщо властивість 'collided' не визначена, встановлюємо її
      if (typeof playerBullet.collided === "undefined") {
        playerBullet.collided = false;
      }
      // Якщо ця пуля вже була оброблена, пропускаємо її
      if (playerBullet.collided) continue;

      let collidedWithBossBullet = false;
      // 1. Перевірка зіткнення кулі корабля з кулею боса
      for (let i = bossBullets.length - 1; i >= 0; i--) {
        const bossBullet = bossBullets[i];
        if (hitTestRectangle(playerBullet, bossBullet)) {
          // Видаляємо обидві кулі
          app.stage.removeChild(playerBullet);
          app.stage.removeChild(bossBullet);
          // Позначаємо, що пуля була оброблена
          playerBullet.collided = true;
          // Видаляємо елементи з масивів
          gameState.bullets.splice(j, 1);
          bossBullets.splice(i, 1);
          collidedWithBossBullet = true;
          break;
        }
      }
      if (collidedWithBossBullet) continue;

      // 2. Перевірка зіткнення кулі корабля з босом
      if (hitTestRectangle(playerBullet, boss)) {
        playerBullet.collided = true;
        app.stage.removeChild(playerBullet);
        gameState.bullets.splice(j, 1);
        gameState.bossHP--;
        bossHPBar.text = `Boss HP: ${gameState.bossHP}`;
       
        if(gameState.bossHP !==0 && 
          gameState.bullets.length ===0 && 
          gameState.bulletData.shotsFired >= gameState.maxBullets ) {
            endGame( app, "YOU LOSE", "red");
            return;
        }
        if (gameState.bossHP === 0) {
          clearInterval(spawnIntervalBossBullets);
          endGame(app, "YOU WIN", "green", true);
          return;
        }
        continue;
      }
    }
  });
};