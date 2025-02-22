import {gameState} from '../game.js';
// Функція для створення одного астероїда
const spawnSingleAsteroid = () => {
    const asteroid = new PIXI.Sprite(
      PIXI.Texture.from("assets/images/asteroid.png")
    );
    asteroid.width = 100;
    asteroid.height = 100;

    // Рандомне положення по горизонталі
    asteroid.x = Math.random() * (app.screen.width - asteroid.width);
    asteroid.y = -asteroid.height; // Початкова позиція (за межами екрану)
    app.stage.addChild(asteroid);

    gameState.asteroids.push(asteroid);
  };