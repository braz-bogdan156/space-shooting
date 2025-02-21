import { hitTestRectangle } from './hitTestRectangle.js';
import { gameState } from '../game.js';



export const manageAsteroids = (app, spaceship, asteroids, endGame) => {
 
    app.ticker.add(() => {
        
        for (let i = gameState.bullets.length - 1; i >= 0; i--) {
            const bullet = gameState.bullets[i];
            if (!bullet) continue;
            bullet.y -= 3; // Рух пуль вгору
            if (bullet.y < 0) {
                app.stage.removeChild(bullet);
                gameState.bullets.splice(i, 1);
            }
        }
        // Оновлення астероїдів
        for (let i = gameState.asteroids.length - 1; i >= 0; i--) {
            const asteroid = gameState.asteroids[i];
            if (!asteroid) continue;
            asteroid.y += 1; // Рух астероїда вниз
            
            // Якщо астероїд виходить за межі екрану
            if (asteroid.y > app.screen.height) {
                app.stage.removeChild(asteroid);
                gameState.asteroids.splice(i, 1);
                endGame( "YOU LOSE", "red");
                return;
            }
            
            // Перевірка колізій астероїда з пулями корабля
            for (let j = gameState.bullets.length - 1; j >= 0; j--) {
                const bullet = gameState.bullets[j];
                if (!bullet) continue;
                if (hitTestRectangle(bullet, asteroid)) {
                    app.stage.removeChild(asteroid);
                    app.stage.removeChild(bullet);
                    gameState.asteroids.splice(i, 1);
                    gameState.bullets.splice(j, 1);
                    break;
                }
            }
            
            // Перевірка колізії астероїда з кораблем
            if (gameState.asteroids[i] && hitTestRectangle(gameState.asteroids[i], gameState.spaceship)) {
                endGame( "YOU LOSE", "red");
                return;
            }
        }
        
        
        
        // Умова програшу, якщо всі снаряди витрачено, але астероїди залишились
        if (gameState.bulletData.shotsFired >= gameState.maxBullets &&
            gameState.bullets.length === 0 &&
            gameState.asteroids.length > 0) {
            endGame( "YOU LOSE", "red");
            return;
        }
        
        // Умова перемоги, якщо всі астероїди знищено
        if (gameState.asteroids.length === 0 &&
            gameState.asteroidData.spawnedAsteroids >= gameState.totalAsteroids) {
            endGame( "YOU WIN", "green", false);
            return;
        }
    });
};