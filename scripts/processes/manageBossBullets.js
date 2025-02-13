import { hitTestRectangle } from './hitTestRectangle.js';
import { spawnbossBullet } from './spawnbossBullet.js';
import { endGame } from './endGame.js';

export const manageBossBullets = (app, spaceship, boss, bossBullets) => {
    let bossHP = 4;
    const bossHPBar = new PIXI.Text(`Boss HP: ${bossHP}`, {
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 'red'
    });
    bossHPBar.x = 640;
    bossHPBar.y = 20;
    app.stage.addChild(bossHPBar);

    const spawnIntervalBossBullets = setInterval(() => {
        const bullet = spawnbossBullet(app, boss);
        bossBullets.push(bullet);
    }, 2000);

    app.ticker.add(() => {
        // Рух куль боса
        for (let i = bossBullets.length - 1; i >= 0; i--) {
            if (!bossBullets[i]) continue;
            bossBullets[i].y += 5;
            if (bossBullets[i].y > app.screen.height) {
                app.stage.removeChild(bossBullets[i]);
                bossBullets.splice(i, 1);
                continue;
            }

            // Перевірка зіткнення з кораблем
            if (hitTestRectangle(bossBullets[i], spaceship)) {
                app.stage.removeChild(bossBullets[i]);
                endGame(app, "YOU LOSE", "red");
            }
        }

        // Рух і перевірка зіткнень куль корабля
        for (let j = spaceship.bullets.length - 1; j >= 0; j--) {
            let playerBullet = spaceship.bullets[j];

            // Перевірка зіткнення з босом
            if (hitTestRectangle(playerBullet, boss)) {
                app.stage.removeChild(playerBullet);
                spaceship.bullets.splice(j, 1);
                --bossHP;
                bossHPBar.text = `Boss HP: ${bossHP}`;

                if (bossHP === 0) {
                    clearInterval(spawnIntervalBossBullets);
                    endGame(app, "YOU WIN", "green");
                    return;
                }
                continue; // Пропускаємо інші перевірки, якщо вже є влучання по босу
            }

            // Перевірка зіткнення кулі корабля з кулею боса
            for (let i = bossBullets.length - 1; i >= 0; i--) {
                let bossBullet = bossBullets[i];

                if (hitTestRectangle(playerBullet, bossBullet)) {
                    app.stage.removeChild(playerBullet);
                    app.stage.removeChild(bossBullet);
                    spaceship.bullets.splice(j, 1);
                    bossBullets.splice(i, 1);
                    break; // Виходимо з внутрішнього циклу після видалення
                }
            }
        }
    });
};