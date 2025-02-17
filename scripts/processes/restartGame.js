import {setGamePaused} from './gameState.js';
import {startGame} from './startGame.js';
import {asteroidData, bulletData} from '../game.js'

export const restartGame = (app) => {
    app.stage.removeChildren(); // Видаляємо всі об'єкти зі сцени
    setGamePaused(true); // Встановлюємо гру на паузу
    app.ticker.start(); // Запускаємо анімацію знову

    // Скидаємо дані про астероїди
    asteroidData.spawnedAsteroids = 0;
    bulletData.shotsFired = 0;
    
    startGame(app); // Запускаємо гру заново
}