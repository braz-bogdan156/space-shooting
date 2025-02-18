import {createBulletCounter} from './bulletCounter.js';
import {bulletData, maxBullets, canShoot} from '../game.js';

export function shootShip(app, spaceship) {
    
    const BulletCounter = createBulletCounter(app, maxBullets);
        if (canShoot && bulletData.shotsFired < maxBullets) {
            const bullet = new PIXI.Graphics();
            bullet.beginFill(0xFFFFFF);
            bullet.drawCircle(0, 0, 5);
            bullet.endFill();

            bullet.x = spaceship.x + spaceship.width / 2 - bullet.width / 2;
            bullet.y = spaceship.y - bullet.height;
            app.stage.addChild(bullet);

            spaceship.bullets.push(bullet);
            bulletData.shotsFired++;
            BulletCounter(bulletData.shotsFired);

            canShoot = false;
            setTimeout(() => {
                canShoot = true;
            }, 150);
        }
    }