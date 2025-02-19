
import { gameState } from '../game.js';
import { app } from '../game.js';

export const createSpaceshipBullet = () => {
    if (gameState.bullets.length >= gameState.maxBullets) return;

    const bullet = new PIXI.Graphics();
            bullet.beginFill(0xFFFFFF);
            bullet.drawCircle(0, 0, 5);
            bullet.endFill();

            bullet.x = spaceship.x + spaceship.width / 2 - bullet.width / 2;
            bullet.y = spaceship.y - bullet.height;

            app.stage.addChild(bullet);

            gameState.bullets.push(bullet);

            return bullet;
}
