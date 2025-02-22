import {gameState} from '../game.js';
import {setSpaceship} from '../processes/setSpaceship.js';

import { spaceshipBullets } from './spaceshipBullets.js';

export const createSpaceship = (app) => {
     gameState.spaceship = new PIXI.Sprite(PIXI.Texture.from('assets/images/ship.png'));

    gameState.spaceship.width = 150;
    gameState.spaceship.height = 150;
    gameState.spaceship.x = app.screen.width / 2 - 75;
    gameState.spaceship.y = app.screen.height - 250;

    gameState.spaceship.bullets = gameState.bullets;

    app.stage.addChild(gameState.spaceship);

    const moveSpaceship = () => {
        if (gameState.keys["ArrowLeft"]) {
            gameState.spaceship.x = Math.max(gameState.spaceship.x - 10, 0);
        }
        if (gameState.keys["ArrowRight"]) {
            gameState.spaceship.x = Math.min(gameState.spaceship.x + 10, app.screen.width - gameState.spaceship.width);
        }
    };
    app.ticker.add(moveSpaceship);
    gameState.tickerCallbacks.push(() => app.ticker.remove(moveSpaceship));

    setSpaceship(gameState.spaceship);
    spaceshipBullets(gameState.spaceship);
    
};


