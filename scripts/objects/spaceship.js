
import {  keys, bullets } from '../game.js';
import { app } from '../game.js';
import {shootShip} from '../processes/shootShip.js';

export const createSpaceship = () => {
    const spaceship = new PIXI.Sprite(PIXI.Texture.from('assets/images/ship.png'));

    spaceship.width = 150;
    spaceship.height = 150;
    spaceship.x = app.screen.width / 2 - 75;
    spaceship.y = app.screen.height - 250;
    app.stage.addChild(spaceship);

    
    
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

    // Додаємо слухач подій для стрільби
    window.addEventListener("keydown", (e) => {
        if (e.key === " ") {
            shootShip(app, spaceship); // Передаємо змінну spaceship
        }
    

    return spaceship;
});

}