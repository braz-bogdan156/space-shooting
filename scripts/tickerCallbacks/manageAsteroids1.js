import { hitTestRectangle } from "../processes/hitTestRectangle.js";
import { app, gameState } from "../game.js";
import { endGame } from "../processes/endGame.js";


export const manageAsteroids1 = () => {
        
    for (let i = gameState.bullets.length - 1; i >= 0; i--) {
        
        if (! gameState.bullets[i]) continue;
        gameState.bullets[i].y -= 3; // Рух пуль вгору
        if ( gameState.bullets[i].y < 0) {
            app.stage.removeChild( gameState.bullets[i]);
            gameState.bullets.splice(i, 1);
        }
    }
    // Оновлення астероїдів
    for (let i = gameState.asteroids.length - 1; i >= 0; i--) {
        if (!gameState.asteroids[i]) continue;
        gameState.asteroids[i].y += 1; // Рух астероїда вниз
        
        // Якщо астероїд виходить за межі екрану
        if (gameState.asteroids[i].y > app.screen.height) {
            app.stage.removeChild(gameState.asteroids[i]);
            gameState.asteroids.splice(i, 1);
            endGame( "YOU LOSE", "red");
            return;
        }
        
        // Перевірка колізій астероїда з пулями корабля
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
};