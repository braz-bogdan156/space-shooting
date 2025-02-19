import { hitTestRectangle } from './hitTestRectangle.js';
import {gameState} from '../game.js';

export const manageAsteroids = (app, spaceship, asteroids, endGame) => {

    app.ticker.add(() => {
        for (let i = asteroids.length - 1; i >= 0; i--) {
            if (!asteroids[i]) continue; // Перевірка на наявність астероїда

            asteroids[i].y += 1; // Рух астероїда вниз

            // Видаляємо астероїд, якщо він виходить за межі екрану
            if (asteroids[i].y > app.screen.height) {
                app.stage.removeChild(asteroids[i]);
                asteroids.splice(i, 1);

                endGame("YOU LOSE", "red");
                return;
            }


            // Перевірка зіткнення астероїда з кулями корабля
            for (let j = gameState.bullets.length - 1; j >= 0; j--) {
                if (hitTestRectangle(gameState.bullets[j], asteroids[i])) {
                    app.stage.removeChild(asteroids[i]);
                    app.stage.removeChild(gameState.bullets[j]);
                    asteroids.splice(i, 1);
                    gameState.bullets.splice(j, 1);

                    break;
                }

            }

            // Перевірка зіткнення астероїда з кораблем
            if (asteroids[i] && hitTestRectangle(asteroids[i], spaceship)) {
                endGame("YOU LOSE", "red");
                return; // Завершуємо гру
            }
          
           

            if (asteroids.length === 0 && gameState.bullets.length === 0 && gameState.asteroidData.spawnedAsteroids >= gameState.totalAsteroids) {
                endGame("YOU WIN", "green", false);

                return;
            }
        }

    });
}

