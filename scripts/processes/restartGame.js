import { setGamePaused } from './setGamePaused.js';
import {startGame} from './startGame.js';
import {asteroidData, bulletData} from '../game.js';

 

export const restartGame = (app) => {
    app.stage.removeChildren(); // Видаляємо всі об'єкти зі сцени
    setGamePaused(true); // Встановлюємо гру на паузу
    app.ticker.stop(); // Зупиняємо оновлення гри
    

    // ❌ Видаляємо всі кулі зі сцени
    bulletData.shotsFired = 0;
    asteroidData.spawnedAsteroids = 0;

    app.ticker.start(); // Запускаємо анімацію знову
    startGame(app); // Запускаємо гру заново
};
