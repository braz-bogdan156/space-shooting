import { hitTestRectangle } from './hitTestRectangle.js';
import { spawnbossBullet } from './spawnbossBullet.js';
import {endGame} from './endGame.js';
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

    }, 2000)
    app.ticker.add(() => {
        

        for (let i = bossBullets.length - 1; i >= 0; i--) {
            if (!bossBullets[i]) continue; // Перевіряємо, що куля існує
            bossBullets[i].y += 5;
            if (bossBullets[i].y > app.screen.height) {
                app.stage.removeChild(bossBullets[i]);
                bossBullets.splice(i, 1);
                continue; // Уникаємо подальшої обробки для видаленого об'єкта
            }


            if (hitTestRectangle(bossBullets[i], spaceship)) {
                app.stage.removeChild(bossBullets[i]);
                endGame(app, "YOU LOSE", "red");
            }
        }



        for (let j = spaceship.bullets.length - 1; j >= 0; j--) {
            if (hitTestRectangle(spaceship.bullets[j], boss)) {
                app.stage.removeChild(spaceship.bullets[j]);
                spaceship.bullets.splice(j, 1);
                --bossHP;
                bossHPBar.text = `Boss HP: ${bossHP}`;
            }
        }
        if (bossHP === 0) {
            clearInterval(spawnIntervalBossBullets);
            endGame(app, "YOU WIN", "green");
            return
        }
    });
}