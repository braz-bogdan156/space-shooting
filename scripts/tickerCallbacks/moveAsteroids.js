import {gameState} from '../game.js';

export const moveAsteroids = () => {

  if (gameState.currentSpeed < 0.8) {
    gameState.currentSpeed = 0.8; // Мінімальна швидкість, щоб уникнути зависання
}

    gameState.asteroids.forEach((asteroid) => {
      asteroid.y += gameState.currentSpeed;
    });
  };