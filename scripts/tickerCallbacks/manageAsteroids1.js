import { hitTestRectangle } from "../processes/hitTestRectangle.js";
import { app, gameState } from "../game.js";
import { endGame } from "../processes/endGame.js";
import { moveSpaceshipBullets } from "./moveSpaceshipBullets.js";
import { moveAsteroids } from "./moveAsteroids.js";

export const manageAsteroids1 = () => {
  moveSpaceshipBullets();

  // Оновлення положення астероїдів
  for (let i = gameState.asteroids.length - 1; i >= 0; i--) {
    if (!gameState.asteroids[i]) continue;
    moveAsteroids();

    // Якщо астероїд виходить за межі екрану
    if (gameState.asteroids[i].y > app.screen.height) {
      app.stage.removeChild(gameState.asteroids[i]);
      gameState.asteroids.splice(i, 1);

      endGame(app, "YOU LOSE", "red");
      return;
    }

    // Перевірка колізії астероїда з кораблем
    if (hitTestRectangle(gameState.asteroids[i], gameState.spaceship)) {
      endGame(app, "YOU LOSE", "red");
      return;
    }
  }

  gameState.destroyedAsteroids = new Set();
  gameState.destroyedBullets = new Set();

  // Обробка колізій: для кожної кулі перевіряємо всі астероїди
  for (const bullet of gameState.bullets) {
    if (!bullet) continue;

    for (const asteroid of gameState.asteroids) {
      if (!asteroid) continue;

      if (
        hitTestRectangle(bullet, asteroid) &&
        !gameState.destroyedAsteroids.has(asteroid) &&
        !gameState.destroyedBullets.has(bullet)
      ) {
        // Видаляємо астероїд
        app.stage.removeChild(asteroid);
        gameState.destroyedAsteroids.add(asteroid);

        // Видаляємо кулю
        app.stage.removeChild(bullet);
        gameState.destroyedBullets.add(bullet);

        break;
      }
    }
  }

  // Видалення знищених астероїдів з масиву
  gameState.asteroids = gameState.asteroids.filter(
    (asteroid) => !gameState.destroyedAsteroids.has(asteroid)
  );
  gameState.bullets = gameState.bullets.filter(
    (bullet) => !gameState.destroyedBullets.has(bullet)
  );

  // Умова програшу: якщо всі снаряди витрачено, але астероїди залишились
  if (
    gameState.bulletData.shotsFired >= gameState.maxBullets &&
    gameState.bullets.length === 0 &&
    gameState.asteroids.length > 0
  ) {
    endGame(app, "YOU LOSE", "red");
    return;
  }

  // Умова перемоги: якщо всі астероїди знищено
  if (
    gameState.asteroids.length === 0 &&
    gameState.asteroidData.spawnedAsteroids >= gameState.totalAsteroids
  ) {
    endGame(app, "YOU WIN", "green", false);
    return;
  }
  if (gameState.timerFinished) {
    endGame(app, "YOU LOSE", "red");
    return;
  }
};
