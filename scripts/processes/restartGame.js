import { setGamePaused } from './setGamePaused.js';
import {startGame} from './startGame.js';
import {gameState} from '../game.js';

 

export const restartGame = (app) => {
    app.stage.removeChildren(); // Видаляємо всі об'єкти зі сцени
    setGamePaused(true); // Встановлюємо гру на паузу
    app.ticker.stop(); // Зупиняємо оновлення гри
    app.ticker.start(); // Запускаємо анімацію знову
    
    gameState.asteroidData.spawnedAsteroids = 0;
    gameState.bulletData.shotsFired = 0;  // Скидаємо лічильник пострілів
    gameState.bullets = [];              // Очищаємо масив пуль
 
    startGame(app); // Запускаємо гру заново
};
