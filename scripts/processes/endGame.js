
// import {initiateBossLevel} from './initiateBossLevel.js'
import {createStartButton} from '../objects/startButton.js';
import {restartGame} from './restartGame.js';
import {addNextLevelButton} from './addNextLevelButton.js';
import { setGamePaused } from '../processes/gameState.js'; // імпорт функції для скидання

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

    // app.ticker.stop(); 
    setGamePaused(true); // Встановлюємо гру на паузу

    if (message === "YOU WIN"){
    if(isBossLevel){
        const restartButton = createStartButton(app, () => {
            restartGame(app)
        });
        restartButton.y = endText.y + endText.height + 20;
        app.stage.addChild(restartButton);
        
    }
    else {
         // Якщо це не бос, додаємо кнопку наступного рівня
         addNextLevelButton(app, endText, false);
    }
}
};