import {createBulletCounter} from './bulletCounter.js';
import {bulletData, maxBullets, canShoot} from '../game.js';
import {createSpaceshipBullet} from '../objects/createSpaceshipBullet.js';
export function shootShip(app, spaceship) {
    
    const BulletCounter = createBulletCounter(app, maxBullets);
        if (canShoot && bulletData.shotsFired < maxBullets) {

            const spaceshipBullet = createSpaceshipBullet(spaceship);
            

            spaceship.bullets.push(spaceshipBullet);
            bulletData.shotsFired++;
            BulletCounter(bulletData.shotsFired);

            canShoot = false;
            setTimeout(() => {
                canShoot = true;
            }, 150);
        }
    }