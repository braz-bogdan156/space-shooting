import {gameState} from '../game.js';

export function createBossHPBar(app) {
    const bossHPBar = new PIXI.Text(`Boss HP: ${gameState.bossHP}`, {
      fontFamily: 'Arial',
      fontSize: 24,
      fill: 'red'
    });
    bossHPBar.x = 640;
    bossHPBar.y = 20;
    app.stage.addChild(bossHPBar);
  
    return bossHPBar;
}