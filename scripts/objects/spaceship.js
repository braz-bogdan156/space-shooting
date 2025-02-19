import {gameState} from '../game.js';
import {setSpaceship} from '../processes/setSpaceship.js';
import { spaceshipBullets } from './spaceshipBullets.js';

export const createSpaceship = (app) => {
     const spaceship = new PIXI.Sprite(PIXI.Texture.from('assets/images/ship.png'));

    spaceship.width = 150;
    spaceship.height = 150;
    spaceship.x = app.screen.width / 2 - 75;
    spaceship.y = app.screen.height - 250;

    spaceship.bullets = gameState.bullets;

    app.stage.addChild(spaceship);

    app.ticker.add(() => {
        if (gameState.keys["ArrowLeft"]) {
            spaceship.x = Math.max(spaceship.x - 10, 0);
        }
        if (gameState.keys["ArrowRight"]) {
            spaceship.x = Math.min(spaceship.x + 10, app.screen.width - spaceship.width);
        }
    })

    setSpaceship(spaceship);
    spaceshipBullets(spaceship);
};


