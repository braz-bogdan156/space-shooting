import { setGamePaused } from './setGamePaused.js';
import {startGame} from './startGame.js';
import {gameState} from '../game.js';

 

export const restartGame = (app) => {
    app.stage.removeChildren(); // Видаляємо всі об'єкти зі сцени
    setGamePaused(true); // Встановлюємо гру на паузу
    app.ticker.stop(); // Зупиняємо оновлення гри
    

    //  Видаляємо всі кулі зі сцени
    gameState.bulletData.shotsFired = 0;
    gameState.asteroidData.spawnedAsteroids = 0;

    app.ticker.start(); // Запускаємо анімацію знову
    startGame(app); // Запускаємо гру заново
};
