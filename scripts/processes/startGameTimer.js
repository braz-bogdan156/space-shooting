import { gameState } from "../game.js";

export const startGameTimer = (app, duration) => {
  let timeLeft = duration;

  const timerText = new PIXI.Text(`Time: ${timeLeft}`, {
    fontFamily: "Arial",
    fontSize: 32,
    fill: "white",
  });
  timerText.x = 10;
  timerText.y = 10;
  app.stage.addChild(timerText);

  if (gameState.timerInterval) {
    clearInterval(gameState.timerInterval);
  }

  gameState.timerFinished = false;

  const timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      timerText.text = `Time: ${timeLeft}`;
    } else {
      clearInterval(timerInterval);
      timerText.text = `Time: 0`;

      // ❗ Позначаємо, що час закінчився, але не викликаємо endGame тут
      gameState.timerFinished = true;
    }
  }, 1000);

  gameState.timerInterval = timerInterval;
  return timerInterval;
};