import { hitTestRectangle } from './hitTestRectangle.js';
import {gameState} from '../game.js';

export const manageAsteroids = (app, spaceship, asteroids, endGame) => {

    app.ticker.add(() => {
        for (let i = gameState.asteroids.length - 1; i >= 0; i--) {
            if (!gameState.asteroids[i]) continue; // Перевірка на наявність астероїда

            gameState.asteroids[i].y += 1; // Рух астероїда вниз

            // Видаляємо астероїд, якщо він виходить за межі екрану
            if (gameState.asteroids[i].y > app.screen.height) {
                app.stage.removeChild(gameState.asteroids[i]);
                gameState.asteroids.splice(i, 1);

                endGame("YOU LOSE", "red");
                return;
            }


            // Перевірка зіткнення астероїда з кулями корабля
            for (let j = gameState.bullets.length - 1; j >= 0; j--) {
                if (!gameState.bullets[j]) continue; 
                
                if (hitTestRectangle(gameState.bullets[j], gameState.asteroids[i])) {
                    app.stage.removeChild(gameState.asteroids[i]);
                    app.stage.removeChild(gameState.bullets[j]);
                    gameState.asteroids.splice(i, 1);
                    gameState.bullets.splice(j, 1);

                    break;
                }

            }

            // Перевірка зіткнення астероїда з кораблем
            if (gameState.asteroids[i] && hitTestRectangle(gameState.asteroids[i], gameState.spaceship)) {
                endGame("YOU LOSE", "red");
                return; // Завершуємо гру
            }
          
           

            if (gameState.asteroids.length === 0 && gameState.asteroidData.spawnedAsteroids >= gameState.totalAsteroids) {
                endGame("YOU WIN", "green", false);

                return;
            }
        }

    });
}

