import { hitTestRectangle } from './hitTestRectangle.js';

export const manageAsteroids = (app, spaceship, asteroids, endGame, asteroidData, totalAsteroids) => {

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
            for (let j = spaceship.bullets.length - 1; j >= 0; j--) {
                if (hitTestRectangle(spaceship.bullets[j], asteroids[i])) {
                    app.stage.removeChild(asteroids[i]);
                    app.stage.removeChild(spaceship.bullets[j]);
                    asteroids.splice(i, 1);
                    spaceship.bullets.splice(j, 1);

                    break;
                }

            }

            // Перевірка зіткнення астероїда з кораблем
            if (asteroids[i] && hitTestRectangle(asteroids[i], spaceship)) {
                endGame("YOU LOSE", "red");
                return; // Завершуємо гру
            }
          
           

            if (asteroids.length === 0 && spaceship.bullets.length === 0 && asteroidData.spawnedAsteroids >= totalAsteroids) {
                endGame("YOU WIN", "green");

                return;
            }
        }

    });
}

