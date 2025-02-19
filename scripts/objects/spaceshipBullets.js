import {gameState} from '../game.js';

export const spaceshipBullets = (spaceship) => {
    

    app.ticker.add(() => {
        

        for (let i = gameState.bullets.length - 1; i >= 0; i--) {
            gameState.bullets[i].y -= 5;
            if (gameState.bullets[i].y < 0) {
                app.stage.removeChild(gameState.bullets[i]);
                gameState.bullets.splice(i, 1);
            }
        }
    });

    gameState.bullets = bullets;
}

