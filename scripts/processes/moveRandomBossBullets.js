import {app, gameState} from '../game.js';

// Оновимо рух куль
export const moveRandomBossBullets = () => {
    for (let i = gameState.randomBossBullets.length - 1; i >= 0; i--) {
        gameState.randomBossBullets[i].x += gameState.randomBossBullets[i].vx;
        gameState.randomBossBullets[i].y += gameState.randomBossBullets[i].vy;
        if (gameState.randomBossBullets[i].x < 0 || gameState.randomBossBullets[i].x > app.screen.width ||
            gameState.randomBossBullets[i].y < 0 || gameState.randomBossBullets[i].y > app.screen.height) {
            app.stage.removeChild(gameState.randomBossBullets[i]);
            gameState.randomBossBullets.splice(i, 1);
        }
    }
};