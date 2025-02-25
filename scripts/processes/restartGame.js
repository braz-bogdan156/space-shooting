import { setGamePaused } from './setGamePaused.js';
import {startGame} from './startGame.js';
import {gameState} from '../game.js';
import {handleKeyUp} from './handleKeyUp.js';
import {handleKeyDown} from './handleKeyDown.js';
import { clearTickers } from './clearTickers.js';
import { spawnIntervalBossBullets } from './spawnIntervalBossBullets.js';
 
export const restartGame = (app) => {
    
    app.stage.removeChildren(); // Видаляємо всі об'єкти зі сцени
    setGamePaused(true); // Встановлюємо гру на паузу
    app.ticker.stop(); // Зупиняємо оновлення гри

      // Якщо існує старий інтервал, очищуємо його
  if (gameState.timerInterval) {
    clearInterval(gameState.timerInterval);
    gameState.timerInterval = null;
  }

  if (gameState.spawnBossInterval) {
    clearInterval(gameState.spawnBossInterval);
    gameState.spawnBossInterval = null;
  }

  if (gameState.spawnAsteroidsInterval) {
    clearInterval(gameState.spawnAsteroidsInterval);
    gameState.spawnAsteroidsInterval = null;
  }

    // Очищення стану гри
    gameState.asteroids = [];
    gameState.bullets = [];
    gameState.spaceship = null;
    gameState.asteroidData.spawnedAsteroids = 0;
    gameState.bulletData.shotsFired = 0;
    gameState.isGamePaused = true;
    gameState.boss = null;
    gameState.bossBullets = [];
    gameState.bossHP = 4;
    gameState.bossHPBar = null,
    clearTickers();

    gameState.spawnBossInterval = spawnIntervalBossBullets();

    // Видаляємо старі обробники клавіш перед їх повторним додаванням
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);

    // Перезапуск гри з невеликою затримкою
    setTimeout(() => {
        app.ticker.start(); // Запускаємо анімацію знову
        startGame(app);
       }, 100);
};
