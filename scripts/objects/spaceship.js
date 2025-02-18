
import {  keys} from '../game.js';
import { app } from '../game.js';
import {shootShip} from '../processes/shootShip.js';

export const createSpaceship = () => {
    const spaceship = new PIXI.Sprite(PIXI.Texture.from('assets/images/ship.png'));

    spaceship.width = 150;
    spaceship.height = 150;
    spaceship.x = app.screen.width / 2 - 75;
    spaceship.y = app.screen.height - 250;
    app.stage.addChild(spaceship);

    spaceship.bullets = [];
    
    app.ticker.add(() => {
        if (keys["ArrowLeft"]) {
            spaceship.x = Math.max(spaceship.x - 10, 0);
        }
        if (keys["ArrowRight"]) {
            spaceship.x = Math.min(spaceship.x + 10, app.screen.width - spaceship.width);
        }

        for (let i = spaceship.bullets.length - 1; i >= 0; i--) {
            spaceship.bullets[i].y -= 5;
            if (spaceship.bullets[i].y < 0) {
                app.stage.removeChild(spaceship.bullets[i]);
                spaceship.bullets.splice(i, 1);
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