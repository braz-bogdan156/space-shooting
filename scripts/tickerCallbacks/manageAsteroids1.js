import { hitTestRectangle } from "../processes/hitTestRectangle.js";
import { app, gameState } from "../game.js";
import { endGame } from "../processes/endGame.js";
import { moveSpaceshipBullets } from "./moveSpaceshipBullets.js";
import { moveAsteroids } from "./moveAsteroids.js";

export const manageAsteroids1 = () => {
    gameState.bulletId = 0;
    gameState.asteroidId = 0;

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

        bullet.id = bullet.id || gameState.bulletId++;
        
        for (const asteroid of gameState.asteroids) {
            if (!asteroid) continue;

            asteroid.id = asteroid.id || gameState.asteroidId++;

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

