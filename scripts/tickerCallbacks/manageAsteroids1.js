import { hitTestRectangle } from "../processes/hitTestRectangle.js";
import { app, gameState } from "../game.js";
import { endGame } from "../processes/endGame.js";

let bulletId = 0;
let asteroidId = 0;

export const manageAsteroids1 = () => {
    // Оновлення положення куль
    for (let i = gameState.bullets.length - 1; i >= 0; i--) {
        if (!gameState.bullets[i]) continue;
        gameState.bullets[i].y -= 3; // Рух пуль вгору
        if (gameState.bullets[i].y < 0) {
            app.stage.removeChild(gameState.bullets[i]);
            gameState.bullets.splice(i, 1);
        }
    }
    
    // Оновлення положення астероїдів
    for (let i = gameState.asteroids.length - 1; i >= 0; i--) {
        if (!gameState.asteroids[i]) continue;
        gameState.asteroids[i].y += 1; // Рух астероїда вниз
        
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
    
    // Створення масиву знищених астероїдів
    gameState.destroyedAsteroids = new Set();
    gameState.destroyedBullets = new Set();

    // Обробка колізій: для кожної кулі перевіряємо всі астероїди
    for (const bullet of gameState.bullets) {
        if (!bullet) continue;

        bullet.id = bullet.id || bulletId++;
        
        for (const asteroid of gameState.asteroids) {
            if (!asteroid) continue;

            asteroid.id = asteroid.id || asteroidId++;

            if (
                hitTestRectangle(bullet, asteroid) &&
                !gameState.destroyedAsteroids.has(asteroid.id) &&
                !gameState.destroyedBullets.has(bullet.id)
            ) {
                // Видаляємо астероїд, який зіткнувся з кулею
                app.stage.removeChild(asteroid);
                gameState.destroyedAsteroids.add(asteroid.id);
                
                // Видаляємо кулю, яка спричинила колізію
                app.stage.removeChild(bullet);
                gameState.destroyedBullets.add(bullet.id);
                
                // Завершуємо цикл для цієї кулі, щоб вона знищила лише один астероїд
                break;
            }
        }
    }
    
    // Видалення знищених астероїдів з масиву
    gameState.asteroids = gameState.asteroids.filter(asteroid => !gameState.destroyedAsteroids.has(asteroid.id));
    gameState.bullets = gameState.bullets.filter(bullet => !gameState.destroyedBullets.has(bullet.id));
    
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
};
