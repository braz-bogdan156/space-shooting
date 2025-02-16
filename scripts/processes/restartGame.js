import {setGamePaused} from './gameState.js';
import {startGame} from './startGame.js';

export const restartGame = (app) => {
    app.stage.removeChildren(); // Видаляємо всі об'єкти зі сцени
    setGamePaused(true); // Встановлюємо гру на паузу
    app.ticker.start(); // Запускаємо анімацію знову
    startGame(app); // Запускаємо гру заново
}