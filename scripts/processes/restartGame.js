import {startGame, isGamePaused} from '../game.js';
// Функція для очищення сцени та перезапуску гри
export const restartGame = (app) => {
    app.stage.removeChildren(); // Видаляємо всі об'єкти зі сцени
    isGamePaused = true; 
    app.ticker.start(); // Запускаємо анімацію знову
    startGame(app); // Запускаємо гру заново
};