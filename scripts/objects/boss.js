import {gameState} from '../game.js';

export function createBoss(app) {
    gameState.boss = new PIXI.Sprite(PIXI.Texture.from('assets/images/boss.png'));
    gameState.boss.width = 150;
    gameState.boss.height = 150;
    gameState.boss.x = app.screen.width / 2 - gameState.boss.width / 2;
    gameState.boss.y = 50;


    app.ticker.add(() => {
        gameState.boss.x += (Math.random() > 0.5 ? 1 : -1) * 5;
        if (gameState.boss.x < 0) boss.x = 0;
        if (gameState.boss.x > app.screen.width - gameState.boss.width) gameState.boss.x = app.screen.width - gameState.boss.width;
    });
    
    return gameState.boss;
}