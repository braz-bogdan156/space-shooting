import {gameState} from '../game.js';
// Функція для створення одного астероїда
export const spawnSingleAsteroid = (app) => {
    const asteroid = new PIXI.Sprite(
      PIXI.Texture.from("assets/images/asteroid.png")
    );
    asteroid.width = 100;
    asteroid.height = 100;

    // Рандомне положення по горизонталі
    asteroid.x = Math.random() * (app.screen.width - asteroid.width);
    asteroid.y = -asteroid.height; // Початкова позиція (за межами екрану)

    asteroid.id = gameState.asteroidId++; // Присвоюємо унікальний ID

    app.stage.addChild(asteroid);

    gameState.asteroids.push(asteroid);
  };