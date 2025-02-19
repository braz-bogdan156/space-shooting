import {gameState} from '../game.js';

// Функція для оновлення лічильника
export const updateBulletCounter = () => {
    gameState.bulletCounterText.text = `Bullets: ${gameState.maxBullets - gameState.bulletData.shotsFired} / 10`;
};