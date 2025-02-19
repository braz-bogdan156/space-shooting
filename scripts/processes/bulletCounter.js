import { updateBulletCounter } from "./updateBulletCounter.js";
import { app, gameState } from "../game.js";
// Функція для створення лічильника куль
export const createBulletCounter = () => {
    const bulletCounterText = new PIXI.Text(`Bullets: ${gameState.maxBullets} / 10`, {
        fontFamily: "Arial",
        fontSize: 32,
        fill: "white",
    });

    bulletCounterText.x = app.screen.width - 310; // Відступ справа
    bulletCounterText.y = 10;  // Відступ зверху
    app.stage.addChild(bulletCounterText);

    

    return (shotsFired) => updateBulletCounter(bulletCounterText, gameState.maxBullets, gameState.bulletData.shotsFired);
};