import { createSpaceship } from "../objects/spaceship.js";
import { createBoss } from "../objects/boss.js";
import { startGameTimer } from "./startGameTimer.js";
import { endGame } from "./endGame.js";
import { manageBossBullets } from "./manageBossBullets.js";
import { gameState, background } from "../game.js";
import { createBulletCounter } from "../objects/createBulletCounter.js";
import { clearTickers } from "./clearTickers.js";
import { handleKeyDown } from "./handleKeyDown.js";
import { handleKeyUp } from "./handleKeyUp.js";

export function continueGame(app) {
  clearTickers();

  app.stage.removeChildren();

  window.removeEventListener("keydown", handleKeyDown);
  window.removeEventListener("keyup", handleKeyUp);

  gameState.bulletData.shotsFired = 0;

  app.stage.addChild(background);

  //створюємо лічильник пострілів
  createBulletCounter(app);

  const spaceship = createSpaceship(app, gameState.maxBullets);
  const boss = createBoss(app);
  app.stage.addChild(boss);
  gameState.bossBullets = [];

  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);

  // Запуск таймера гри
  const timerId = startGameTimer(app, 60, (message, color) => {
    endGame(app, message, color);
  });

  gameState.timerInterval = timerId;

  manageBossBullets(app, spaceship, boss, gameState.bossBullets);
}
