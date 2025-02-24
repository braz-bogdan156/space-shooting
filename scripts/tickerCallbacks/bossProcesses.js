import { spawnIntervalBossBullets } from '../processes/spawnIntervalBossBullets.js';
import { endGame } from '../processes/endGame.js';
import { hitTestRectangle } from '../processes/hitTestRectangle.js';
import { gameState, app } from '../game.js';
import { createBossHPBar } from '../objects/createBossHPBar.js';

let spawnInterval;

export const bossProcesses = () => {
    const bossHPBar = createBossHPBar(app);
    
    if (!gameState.boss) {
        console.error("Boss object is null");
        return;
    }

    if (!spawnInterval) {
        spawnInterval = spawnIntervalBossBullets();
    }

    for (let i = gameState.bossBullets.length - 1; i >= 0; i--) {
        if (hitTestRectangle(gameState.bossBullets[i], gameState.spaceship)) {
            app.stage.removeChild(gameState.bossBullets[i]);
            endGame(app, "YOU LOSE", "red");
            clearInterval(spawnInterval);
            return;
        }
    }

    // Рух і перевірка колізій куль корабля
    for (let j = gameState.bullets.length - 1; j >= 0; j--) {
        if (!gameState.bullets[j]) continue;

        if (gameState.bullets[j].y < 0) {
            app.stage.removeChild(gameState.bullets[j]);
            gameState.bullets.splice(j, 1);
            if (gameState.bulletData.shotsFired >= gameState.maxBullets && gameState.bossHP > 0) {
                endGame(app, "YOU LOSE", "red");
                clearInterval(spawnInterval);
                return;
            }
            continue;
        }

        if (typeof gameState.bullets[j].collided === "undefined") {
            gameState.bullets[j].collided = false;
        }
        if (gameState.bullets[j].collided) continue;

        let collidedWithBossBullet = false;

        // Перевірка зіткнення кулі корабля з кулею боса
        for (let i = gameState.bossBullets.length - 1; i >= 0; i--) {
            if (hitTestRectangle(gameState.bullets[j], gameState.bossBullets[i])) {
                app.stage.removeChild(gameState.bullets[j]);
                app.stage.removeChild(gameState.bossBullets[i]);
                gameState.bullets[j].collided = true;
                gameState.bullets.splice(j, 1);
                gameState.bossBullets.splice(i, 1);
                collidedWithBossBullet = true;
                break;
            }
        }

        if (collidedWithBossBullet) continue;

        // Перевірка зіткнення кулі корабля з босом
        if (hitTestRectangle(gameState.bullets[j], gameState.boss)) {
            gameState.bullets[j].collided = true;
            app.stage.removeChild(gameState.bullets[j]);
            gameState.bullets.splice(j, 1);
            gameState.bossHP--;
           
            gameState.bossHPBar.text = `Boss HP: ${gameState.bossHP}`;
            if (gameState.bossHP === 0) {
                clearInterval(spawnInterval);
                endGame(app, "YOU WIN", "green", true);
                return;
            }
            continue;
        }
    }
};
