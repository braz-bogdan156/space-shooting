// createAsteroids.js
import { gameState } from "../game.js";
import { spawnAsteroidsGroup } from "./spawnAsteroidsGroup.js";

export function createAsteroids(app, totalAsteroids, spawnRate, asteroidData) {
  // Задаємо початкову швидкість
  let currentSpeed = 0.2;

  // Інтервал для групового спауну
  const spawnInterval = setInterval(() => {
    spawnAsteroidsGroup(app, totalAsteroids, asteroidData);

    // Збільшуємо швидкість після кожного виклику
    currentSpeed += 0.1;

    // Якщо створено достатньо астероїдів, зупиняємо інтервал
    if (asteroidData.spawnedAsteroids >= totalAsteroids) {
      clearInterval(spawnInterval);
    }
  }, spawnRate);

  // Рух астероїдів у ticker
  const moveAsteroids = () => {
    gameState.asteroids.forEach((asteroid) => {
      asteroid.y += currentSpeed;
    });
  };
  app.ticker.add(moveAsteroids);
  gameState.tickerCallbacks.push(() => app.ticker.remove(moveAsteroids));
}