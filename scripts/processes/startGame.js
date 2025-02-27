import { createSpaceship } from "../objects/spaceship.js";
import { getGamePaused } from "../processes/getGamePaused.js";
import { setGamePaused } from "../processes/setGamePaused.js";
import { createAsteroids } from "../objects/createAsteroids.js";
import { startGameTimer } from "./startGameTimer.js";
import { manageAsteroids } from "./manageAsteroids.js";
import { endGame } from "./endGame.js";
import { gameState, background } from "../game.js";
import { handleKeyDown } from "./handleKeyDown.js";
import { handleKeyUp } from "./handleKeyUp.js";
import { createBulletCounter } from "../objects/createBulletCounter.js";
import { clearTickers } from "./clearTickers.js";

// === ЛОГІКА ГРИ (Оновлюється лише після натискання кнопки) ===
export function startGame(app) {
  if (!getGamePaused()) return; // Якщо гра вже йде, нічого не робити

  setGamePaused(false); // Знімаємо паузу

  clearTickers();

  // Додаємо фон заново
  app.stage.addChild(background);

  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);

  //створюємо лічильник пострілів
  createBulletCounter(app);

  // Створюємо корабель
  const spaceship = createSpaceship(app, gameState.maxBullets);

  // Створення астероїдів
  const asteroids = createAsteroids(
    app,
    gameState.totalAsteroids,
    3000,
    gameState.asteroidData
  );

  // Запуск таймера гри
  const timerId = startGameTimer(app, 60, (message, color) => {
    endGame(app, message, color);
  });

  gameState.timerInterval = timerId;

  // Анімація та обробка астероїдів тепер активна
  manageAsteroids(app, spaceship, asteroids, (message, color) =>
    endGame(app, message, color)
  );
}
