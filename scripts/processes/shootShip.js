import {updateBulletCounter} from './updateBulletCounter.js';
import {gameState} from '../game.js';
import {createSpaceshipBullet} from '../objects/createSpaceshipBullet.js';
export function shootShip() {
    
    
        if (gameState.canShoot && gameState.bulletData.shotsFired < gameState.maxBullets) {

            const spaceshipBullet = createSpaceshipBullet(gameState.spaceship);
            

            gameState.bullets.push(spaceshipBullet);
            gameState.bulletData.shotsFired++;

            updateBulletCounter();

            gameState.canShoot = false;
            setTimeout(() => {
                gameState.canShoot = true;
            }, 150);
        }
    }