import { hitTestRectangle } from './hitTestRectangle.js';
import { spawnbossBullet } from '../objects/spawnbossBullet.js';
import { endGame } from './endGame.js';
import { gameState } from '../game.js';

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
            const bossBullet = bossBullets[i];
            if (!bossBullet) continue;
            bossBullet.y += 5;
            if (bossBullet.y > app.screen.height) {
                app.stage.removeChild(bossBullet);
                bossBullets.splice(i, 1);
                continue;
            }
            // Перевірка зіткнення куль боса з кораблем
            if (hitTestRectangle(bossBullet, gameState.spaceship)) {
                app.stage.removeChild(bossBullet);
                endGame(app, "YOU LOSE", "red");
            }
        }

        // Рух і перевірка зіткнень куль корабля
        for (let j = gameState.bullets.length - 1; j >= 0; j--) {
            let playerBullet = gameState.bullets[j];
            // Якщо ця куля вже була оброблена, пропускаємо її
            if (playerBullet.collided) continue;
            
            let collidedWithBossBullet = false;
            // 1. Перевірка зіткнення кулі корабля з кулею боса
            for (let i = bossBullets.length - 1; i >= 0; i--) {
                const bossBullet = bossBullets[i];
                if (hitTestRectangle(playerBullet, bossBullet)) {

                    // Видаляємо обидві кулі
                    app.stage.removeChild(playerBullet);
                    app.stage.removeChild(bossBullet);
                    // Позначаємо постріл як оброблений
                    playerBullet.collided = true;
                    // Видаляємо з масивів
                    gameState.bullets.splice(j, 1);
                    bossBullets.splice(i, 1);
                    collidedWithBossBullet = true;
                    break;
                }
            }
            if (collidedWithBossBullet) continue;

            // 2. Перевірка зіткнення кулі корабля з босом
            if (hitTestRectangle(playerBullet, boss)) {
                
                // Позначаємо, що ця куля вже оброблена
                playerBullet.collided = true;
                app.stage.removeChild(playerBullet);
                gameState.bullets.splice(j, 1);
                bossHP--;
                
                bossHPBar.text = `Boss HP: ${bossHP}`;
                if (bossHP === 0) {
                    clearInterval(spawnIntervalBossBullets);
                    endGame(app, "YOU WIN", "green", true);
                    return;
                }
                continue;
            }
        }
    });
};