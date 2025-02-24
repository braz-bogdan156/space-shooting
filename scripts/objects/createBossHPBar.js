import {gameState} from '../game.js';

export function createBossHPBar(app) {
  if (gameState.bossHPBar) {
    return gameState.bossHPBar; // Якщо вже існує, повертати існуючий об'єкт
}
    gameState.bossHPBar = new PIXI.Text(`Boss HP: ${gameState.bossHP}`, {
      fontFamily: 'Arial',
      fontSize: 24,
      fill: 'red'
    });
    gameState.bossHPBar.x = 640;
    gameState.bossHPBar.y = 20;
    app.stage.addChild(gameState.bossHPBar);
  
    return gameState.bossHPBar;
}