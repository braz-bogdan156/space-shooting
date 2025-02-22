import { spawnSingleAsteroid } from "./spawnSingleAsteroid.js";


export function spawnAsteroidsGroup(app, totalAsteroids, asteroidData) {
  // Спавнимо максимум 2 астероїди за раз
  const asteroidsToSpawn = Math.min(2, totalAsteroids - asteroidData.spawnedAsteroids);

  for (let i = 0; i < asteroidsToSpawn; i++) {
    spawnSingleAsteroid(app);
    asteroidData.spawnedAsteroids++;
  }
}