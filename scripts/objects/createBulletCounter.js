import { updateBulletCounter } from "../processes/updateBulletCounter.js";
import { app, gameState } from "../game.js";

// Функція для створення лічильника куль
export const createBulletCounter = () => {
  gameState.bulletCounterText = new PIXI.Text(
    `Bullets: ${gameState.maxBullets} / 10`,
    {
      fontFamily: "Arial",
      fontSize: 32,
      fill: "white",
    }
  );

  gameState.bulletCounterText.x = app.screen.width - 310; // Відступ справа
  gameState.bulletCounterText.y = 10; // Відступ зверху
  app.stage.addChild(gameState.bulletCounterText);

  updateBulletCounter();

  return updateBulletCounter();
};
