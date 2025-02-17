import { createBulletCounter } from "../processes/bulletCounter.js";
import { bulletData } from '../game.js';

export const createSpaceship = (app, maxBullets) => {
    const spaceship = new PIXI.Sprite(PIXI.Texture.from('assets/images/ship.png'));

    spaceship.width = 150;
    spaceship.height = 150;
    spaceship.x = app.screen.width / 2 - 75;
    spaceship.y = app.screen.height - 250;
    app.stage.addChild(spaceship);

    const bullets = [];
    let canShoot = true;
    let shooting = false;
    const keys = {};

    const BulletCounter = createBulletCounter(app, maxBullets);

    // Очищуємо старі обробники перед додаванням нових
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);

    function handleKeyDown(e) {
        keys[e.key] = true;
        if (e.key === " " && !shooting) {
            e.preventDefault();
            shooting = true;
            shoot();
        }
    }

    function handleKeyUp(e) {
        keys[e.key] = false;
        if (e.key === " ") {
            shooting = false;
        }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    function shoot() {
        if (canShoot && bulletData.shotsFired < maxBullets) {
            const bullet = new PIXI.Graphics();
            bullet.beginFill(0xFFFFFF);
            bullet.drawCircle(0, 0, 5);
            bullet.endFill();

            bullet.x = spaceship.x + spaceship.width / 2 - bullet.width / 2;
            bullet.y = spaceship.y - bullet.height;
            app.stage.addChild(bullet);

            bullets.push(bullet);
            bulletData.shotsFired++;
            BulletCounter(bulletData.shotsFired);

            canShoot = false;
            setTimeout(() => {
                canShoot = true;
            }, 150);
        }
    }

    app.ticker.add(() => {
        if (keys["ArrowLeft"]) {
            spaceship.x = Math.max(spaceship.x - 10, 0);
        }
        if (keys["ArrowRight"]) {
            spaceship.x = Math.min(spaceship.x + 10, app.screen.width - spaceship.width);
        }

        for (let i = bullets.length - 1; i >= 0; i--) {
            bullets[i].y -= 5;
            if (bullets[i].y < 0) {
                app.stage.removeChild(bullets[i]);
                bullets.splice(i, 1);
            }
        }
    });

    spaceship.bullets = bullets;

    return spaceship;
}