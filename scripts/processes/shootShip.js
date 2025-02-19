import {createBulletCounter} from './bulletCounter.js';
import {gameState} from '../game.js';
import {createSpaceshipBullet} from '../objects/createSpaceshipBullet.js';
export function shootShip(app, spaceship) {
    
    const BulletCounter = createBulletCounter(app, gameState.maxBullets);
        if (gameState.canShoot && gameState.bulletData.shotsFired < gameState.maxBullets) {

            const spaceshipBullet = createSpaceshipBullet(gameState.spaceship);
            

            spaceship.bullets.push(spaceshipBullet);
            gameState.bulletData.shotsFired++;
            BulletCounter(gameState.bulletData.shotsFired);

            canShoot = false;
            setTimeout(() => {
                canShoot = true;
            }, 150);
        }
    }