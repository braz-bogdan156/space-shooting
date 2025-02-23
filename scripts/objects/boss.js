import {gameState} from '../game.js';
import {moveBoss} from '../tickerCallbacks/moveBoss.js';

export function createBoss(app) {
    gameState.boss = new PIXI.Sprite(PIXI.Texture.from('assets/images/boss.png'));
    gameState.boss.width = 150;
    gameState.boss.height = 150;
    gameState.boss.x = app.screen.width / 2 - gameState.boss.width / 2;
    gameState.boss.y = 50;

    app.ticker.add(moveBoss);
    gameState.tickerCallbacks.push(() => app.ticker.remove(moveBoss));
    
    return gameState.boss;
}