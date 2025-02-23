  import {gameState, app} from '../game.js';
  
  export const moveSpaceship = () => {
        if (gameState.keys["ArrowLeft"]) {
            gameState.spaceship.x = Math.max(gameState.spaceship.x - 10, 0);
        }
        if (gameState.keys["ArrowRight"]) {
            gameState.spaceship.x = Math.min(gameState.spaceship.x + 10, app.screen.width - gameState.spaceship.width);
        }
    };