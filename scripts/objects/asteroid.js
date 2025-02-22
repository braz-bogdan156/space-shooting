import { gameState } from "../game.js";

export const createAsteroids = (
  app,
  totalAsteroids,
  spawnRate,
  endGame,
  asteroidData
) => {

  let currentSpeed = 0.2; // Початкова швидкість

  

  // Функція для створення групи астероїдів
  const spawnAsteroidGroup = () => {
    const asteroidsToSpawn = Math.min(
      2,
      totalAsteroids - asteroidData.spawnedAsteroids
    ); // Спавнимо максимум 2 астероїди
    for (let i = 0; i < asteroidsToSpawn; i++) {
      spawnAsteroid();
      asteroidData.spawnedAsteroids++;
    }

    // Збільшуємо швидкість астероїдів
    currentSpeed += 0.1;

    // Зупиняємо спаун, якщо всі астероїди створені
    if (asteroidData.spawnedAsteroids >= totalAsteroids) {
      clearInterval(spawnInterval);
    }
  };

  // Спаун астероїдів кожні spawnRate мс
  const spawnInterval = setInterval(spawnAsteroidGroup, spawnRate);

  // Додаємо логіку руху астероїдів у `manageAsteroids`
  app.ticker.add(() => {
    gameState.asteroids.forEach((asteroid) => {
      asteroid.y += currentSpeed;
    });
  });

  return gameState.asteroids;
};
