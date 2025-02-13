import { updateBulletCounter } from "./updateBulletCounter.js";
// Функція для створення лічильника куль
export const createBulletCounter = (app, maxBullets) => {
    const bulletCounterText = new PIXI.Text(`Bullets: ${maxBullets} / 10`, {
        fontFamily: "Arial",
        fontSize: 32,
        fill: "white",
    });

    bulletCounterText.x = app.screen.width - 310; // Відступ справа
    bulletCounterText.y = 10;  // Відступ зверху
    app.stage.addChild(bulletCounterText);

    

    return (shotsFired) => updateBulletCounter(bulletCounterText, maxBullets, shotsFired);
};