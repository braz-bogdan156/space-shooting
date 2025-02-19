
import { createStartButton } from '../objects/startButton.js';
import { restartGame } from './restartGame.js';
import { addNextLevelButton } from './addNextLevelButton.js';
import { setGamePaused } from './setGamePaused.js';

export const endGame = (app, message, color, isBossLevel = false) => {
    const endText = new PIXI.Text(message, {
        fontFamily: "Arial",
        fontSize: 64,
        fill: color,
        align: "center",
    });

    endText.x = app.screen.width / 2 - endText.width / 2;
    endText.y = app.screen.height / 2 - endText.height / 2;

    app.stage.addChild(endText);

    app.ticker.stop(); // Зупиняємо оновлення гри
    setGamePaused(true); // Встановлюємо стан паузи

    if (message === "YOU WIN") {
        if (isBossLevel) {
            const restartButton = createStartButton(app);
            app.stage.addChild(restartButton);
            restartButton.on('pointerdown', () => {
                restartGame(app); // Перезапуск гри
            });
        } else {
            addNextLevelButton(app, endText, false);
        }
    }
}