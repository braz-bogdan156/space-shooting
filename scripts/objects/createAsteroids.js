import { gameState } from "../game.js";
import { spawnAsteroidsGroup } from "./spawnAsteroidsGroup.js";
import {moveAsteroids} from '../tickerCallbacks/moveAsteroids.js';

export function createAsteroids(app, totalAsteroids, spawnRate, asteroidData) {
  // Задаємо початкову швидкість
  gameState.currentSpeed = 0.8;


  // Інтервал для групового спауну
  gameState.spawnAsteroidsInterval = setInterval(() => {
    spawnAsteroidsGroup(app, totalAsteroids, asteroidData);

    // Збільшуємо швидкість після кожного виклику
    gameState.currentSpeed += 0.1;

    // Якщо створено достатньо астероїдів, зупиняємо інтервал
    if (asteroidData.spawnedAsteroids >= totalAsteroids) {
      clearInterval(gameState.spawnAsteroidsInterval);
    }
  }, spawnRate);

  
  app.ticker.add(moveAsteroids);
  gameState.tickerCallbacks.push(() => app.ticker.remove(moveAsteroids));
}
