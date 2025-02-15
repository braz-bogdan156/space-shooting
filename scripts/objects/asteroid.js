export const createAsteroids = (
  app,
  totalAsteroids = 10,
  spawnRate = 3000,
  endGame,
  asteroidData
) => {
  const asteroids = [];
  let currentSpeed = 1; // Початкова швидкість

  // Функція для створення одного астероїда
  const spawnAsteroid = () => {
    const asteroid = new PIXI.Sprite(
      PIXI.Texture.from("assets/images/asteroid.png")
    );
    asteroid.width = 100;
    asteroid.height = 100;

    // Рандомне положення по горизонталі
    asteroid.x = Math.random() * (app.screen.width - asteroid.width);
    asteroid.y = -asteroid.height; // Початкова позиція (за межами екрану)
    app.stage.addChild(asteroid);
    asteroids.push(asteroid);
  };

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
    asteroids.forEach((asteroid) => {
      asteroid.y += currentSpeed;
    });
  });

  return asteroids;
};
