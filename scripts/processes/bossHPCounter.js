 import { gameState } from "../game";

 export const bossHPCounter = () => {
    gameState.bossHPBar = new PIXI.Text(`Boss HP: ${gameState.bossHP}`, {
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 'red'
    });
    gameState.bossHPBar.x = 640;
    gameState.bossHPBar.y = 20;
    app.stage.addChild(gameState.bossHPBar);
 }
