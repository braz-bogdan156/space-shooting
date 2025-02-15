import { startGame } from '../game.js';
import { setGamePaused } from '../processes/gameState.js';

// Функція для очищення сцени та перезапуску гри
export const restartGame = (app) => {
    app.stage.removeChildren(); // Видаляємо всі об'єкти зі сцени
    setGamePaused(true); 
    app.ticker.start(); // Запускаємо анімацію знову
    startGame(app); // Запускаємо гру заново
}