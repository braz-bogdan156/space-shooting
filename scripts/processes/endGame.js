
import {initiateBossLevel} from './initiateBossLevel.js'

export const endGame = (app, message, color) => {
    const endText = new PIXI.Text(message, {
        fontFamily: "Arial",
        fontSize: 64,
        fill: color,
        align: "center",
    });

    endText.x = app.screen.width / 2 - endText.width / 2;
    endText.y = app.screen.height / 2 - endText.height / 2;

    app.stage.addChild(endText);

    app.ticker.stop(); // Зупиняємо оновлення сцени

    if (message === "YOU WIN") {
        
        initiateBossLevel(app, endText, color);
    }
};