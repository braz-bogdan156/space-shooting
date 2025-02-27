import { continueGame } from "./continueGame.js";

// Функція створення кнопки "Next Level"
export function addNextLevelButton(app, endText) {
  // Створюємо графічний об'єкт для кнопки
  const nextLevelButton = new PIXI.Graphics();
  nextLevelButton.beginFill(0x0000ff); // Синій фон кнопки
  nextLevelButton.drawRoundedRect(0, 0, 150, 70, 20); // Закруглений прямокутник
  nextLevelButton.endFill();
  nextLevelButton.x = app.screen.width / 2 - 60; // Центруємо по ширині
  nextLevelButton.y = endText.y + endText.height + 20; // Під повідомленням
  nextLevelButton.interactive = true;
  nextLevelButton.buttonMode = true;

  // Додаємо текст до кнопки
  const nextLevelButtonText = new PIXI.Text("NEXT LEVEL", {
    fontFamily: "Arial",
    fontSize: 16,
    fill: "white",
  });
  nextLevelButtonText.x =
    nextLevelButton.width / 2 - nextLevelButtonText.width / 2; // Центруємо текст
  nextLevelButtonText.y =
    nextLevelButton.height / 2 - nextLevelButtonText.height / 2; // Центруємо текст
  nextLevelButton.addChild(nextLevelButtonText);

  // Обробник натискання
  nextLevelButton.on("pointerdown", () => {
    app.stage.removeChildren();

    app.ticker.start(); // Перезапускаємо оновлення сцени

    continueGame(app);
  });

  // Додаємо кнопку до сцени
  app.stage.addChild(nextLevelButton);
}
