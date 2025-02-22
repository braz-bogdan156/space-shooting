import { gameState } from "../game.js";
import { spawnAsteroidsGroup } from "./spawnAsteroidsGroup.js";

export function createAsteroids(app, totalAsteroids, spawnRate, asteroidData) {
  // Задаємо початкову швидкість
  gameState.currentSpeed = 0.8;


  // Інтервал для групового спауну
  const spawnInterval = setInterval(() => {
    spawnAsteroidsGroup(app, totalAsteroids, asteroidData);

    // Збільшуємо швидкість після кожного виклику
    gameState.currentSpeed += 0.2;

    // Якщо створено достатньо астероїдів, зупиняємо інтервал
    if (asteroidData.spawnedAsteroids >= totalAsteroids) {
      clearInterval(spawnInterval);
    }
  }, spawnRate);

  // Рух астероїдів у ticker
  const moveAsteroids = () => {
    gameState.asteroids.forEach((asteroid) => {
      asteroid.y += gameState.currentSpeed;
    });
  };
  app.ticker.add(moveAsteroids);
  gameState.tickerCallbacks.push(() => app.ticker.remove(moveAsteroids));
}
