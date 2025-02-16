import { createBulletCounter } from "../processes/bulletCounter.js";

export const createSpaceship = (app, maxBullets) => {
    const spaceship = new PIXI.Sprite(PIXI.Texture.from('assets/images/ship.png'));

    spaceship.width = 150;
    spaceship.height = 150;

    spaceship.x = app.screen.width / 2 - 75;
    spaceship.y = app.screen.height - 250;
    app.stage.addChild(spaceship);

    const bullets = [];
    let canShoot = true;
    let shotsFired = 0;
    let shooting = false; // Додаємо змінну для перевірки стрільби
    const keys = {}; // Об'єкт для відстеження стану клавіш

    const BulletCounter = createBulletCounter(app, maxBullets);

    window.addEventListener("keydown", (e) => {
        keys[e.key] = true;
        if (e.key === " ") {
            e.preventDefault(); // Запобігаємо прокручуванню сторінки при натисканні пробілу
            if (!shooting) {
                shooting = true; // Встановлюємо стан стрільби
                shoot();
            }
        }
    });

    window.addEventListener("keyup", (e) => {
        keys[e.key] = false;
        if (e.key === " ") {
            shooting = false; // Скидаємо стан стрільби
        }
    });

    const shoot = () => {
        if (canShoot && shotsFired < maxBullets) {
            // Створюємо кулю
            const bullet = new PIXI.Graphics();
            bullet.beginFill(0xFFFFFF); // Білий колір кулі
            bullet.drawCircle(0, 0, 5); // Куля радіусом 5
            bullet.endFill();

            bullet.x = spaceship.x + spaceship.width / 2 - bullet.width / 2;
            bullet.y = spaceship.y - bullet.height;
            app.stage.addChild(bullet);

            bullets.push(bullet);
            shotsFired++; // Збільшуємо лічильник пострілів

            BulletCounter(shotsFired);

            canShoot = false; // Забороняємо стрільбу
            setTimeout(() => {
                canShoot = true; // Дозволяємо стрільбу через 150 мс
            }, 150);
        }
    };

    app.ticker.add(() => {
        // Рух кораблика
        if (keys["ArrowLeft"]) {
            spaceship.x = Math.max(spaceship.x - 10, 0); // Рух ліворуч, не виходимо за межі
        }
        if (keys["ArrowRight"]) {
            spaceship.x = Math.min(spaceship.x + 10, app.screen.width - spaceship.width); // Рух праворуч
        }

        // Оновлюємо позицію куль
        for (let i = bullets.length - 1; i >= 0; i--) {
            bullets[i].y -= 5; // Швидкість кулі
            if (bullets[i].y < 0) {
                app.stage.removeChild(bullets[i]);
                bullets.splice(i, 1);
            }
        }
    });

    spaceship.bullets = bullets; // Додаємо масив куль до об'єкта кораблика

    return spaceship;
}