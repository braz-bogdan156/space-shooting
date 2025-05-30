import { gameState, app } from "../game.js";

// Функція для створення однієї пулі боса
export const spawnbossBullet = () => {
  if (!gameState.boss) {
    return null; // Якщо бос не існує, нічого не робимо
  }

  const bossBullet = new PIXI.Graphics();
  bossBullet.beginFill(0xff0000);
  bossBullet.drawCircle(0, 0, 10);
  bossBullet.endFill();
  bossBullet.x = gameState.boss.x + gameState.boss.width / 2;
  bossBullet.y = gameState.boss.y + gameState.boss.height;
  app.stage.addChild(bossBullet);

  return bossBullet;
};
