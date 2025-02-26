import {app, gameState} from '../game.js';

export const moveBoss = () => {
    // Переконаємося, що gameState.boss не null
    if (!gameState.boss || !gameState.bossShouldMove) return;
      
    gameState.boss.x += (Math.random() > 0.5 ? 1 : -1) * 20;
    if (gameState.boss.x < 0) gameState.boss.x = 0;
    if (gameState.boss.x > app.screen.width - gameState.boss.width) gameState.boss.x = app.screen.width - gameState.boss.width;
};