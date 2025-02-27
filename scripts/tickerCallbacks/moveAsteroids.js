import { gameState } from "../game.js";

export const moveAsteroids = () => {
  gameState.asteroids.forEach((asteroid) => {
    asteroid.y += gameState.currentSpeed;
  });
};
