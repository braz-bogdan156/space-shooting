import {gameState, app} from '../game.js';
  
export const moveSpaceship = () => {
  if (gameState.keys["ArrowLeft"]) {
      gameState.spaceshipSpeed = Math.min(gameState.spaceshipSpeed + gameState.spaceshipAcceleration, gameState.maxSpaceshipSpeed);
      gameState.spaceship.x = Math.max(gameState.spaceship.x - gameState.spaceshipSpeed, 0);
  } else if (gameState.keys["ArrowRight"]) {
      gameState.spaceshipSpeed = Math.min(gameState.spaceshipSpeed + gameState.spaceshipAcceleration, gameState.maxSpaceshipSpeed);
      gameState.spaceship.x = Math.min(gameState.spaceship.x + gameState.spaceshipSpeed, app.screen.width - gameState.spaceship.width);
  } else {
      gameState.spaceshipSpeed = 10; // Повертаємо швидкість до початкового значення при відпусканні клавіш
  }
};
