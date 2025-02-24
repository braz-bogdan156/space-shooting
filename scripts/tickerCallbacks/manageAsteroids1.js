import { hitTestRectangle } from "../processes/hitTestRectangle.js";
import { app, gameState } from "../game.js";
import { endGame } from "../processes/endGame.js";

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
    const destroyedAsteroids = new Set();

    // Обробка колізій: для кожної кулі перевіряємо всі астероїди
    for (const bullet of gameState.bullets) {
        if (!bullet) continue;
        
        for (const asteroid of gameState.asteroids) {
            if (!asteroid) continue;

            if (hitTestRectangle(bullet, asteroid) && !destroyedAsteroids.has(asteroid)) {
                // Видаляємо астероїд, який зіткнувся з кулею
                app.stage.removeChild(asteroid);
                destroyedAsteroids.add(asteroid);
                
                // Видаляємо кулю, яка спричинила колізію
                app.stage.removeChild(bullet);
                gameState.bullets.splice(gameState.bullets.indexOf(bullet), 1);
                
                // Завершуємо цикл для цієї кулі, щоб вона знищила лише один астероїд
                break;
            }
        }
    }
    
    // Видалення знищених астероїдів з масиву
    gameState.asteroids = gameState.asteroids.filter(asteroid => !destroyedAsteroids.has(asteroid));
    
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
