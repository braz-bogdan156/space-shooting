import {createBulletCounter} from './bulletCounter.js';
import {gameState} from '../game.js';
import {createSpaceshipBullet} from '../objects/createSpaceshipBullet.js';
export function shootShip(app) {
    
    const BulletCounter = createBulletCounter(app, gameState.maxBullets);
        if (gameState.canShoot && gameState.bulletData.shotsFired < gameState.maxBullets) {

            const spaceshipBullet = createSpaceshipBullet(gameState.spaceship);
            

            gameState.bullets.push(spaceshipBullet);
            gameState.bulletData.shotsFired++;
            BulletCounter(gameState.bulletData.shotsFired);

            gameState.canShoot = false;
            setTimeout(() => {
                gameState.canShoot = true;
            }, 150);
        }
    }