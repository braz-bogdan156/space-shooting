import { gameState, app } from "../game.js";
import { createBoss } from "./boss.js";
// Функція для створення однієї пулі боса
export const spawnbossBullet = () => {
  gameState.boss = createBoss(app);
  
 

    const bossBullet = new PIXI.Graphics();
    bossBullet.beginFill(0xff0000);
    bossBullet.drawCircle(0, 0, 10);
    bossBullet.endFill();
    bossBullet.x = gameState.boss.x + gameState.boss.width / 2;
    bossBullet.y = gameState.boss.y + gameState.boss.height;
    app.stage.addChild(bossBullet);

    

    return bossBullet;
};