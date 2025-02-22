import {createSpaceship} from '../objects/spaceship.js';
import {createBoss} from '../objects/boss.js';
import {startGameTimer} from './startGameTimer.js';
import {endGame} from './endGame.js';
import { manageBossBullets } from './manageBossBullets.js';
import { gameState, background } from '../game.js';
import {createBulletCounter} from './bulletCounter.js';
import {clearTickers} from './clearTickers.js';
import { handleKeyDown } from './handleKeyDown.js';
import { handleKeyUp } from './handleKeyUp.js';

export function continueGame(app) {
     
    clearTickers();

    app.stage.removeChildren();

    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
   

    gameState.bulletData.shotsFired = 0;
   
    
   
    
    app.stage.addChild(background);

       //створюємо лічильник пострілів
        createBulletCounter(app);
    
    const spaceship = createSpaceship(app, gameState.maxBullets);
    const boss = createBoss(app);
    app.stage.addChild(boss);
    gameState.bossBullets = [];

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Запуск таймера гри
    startGameTimer(app, 60, (message) => {
        endGame(app, message, 'red');
    });

    
   manageBossBullets(app, spaceship, boss, gameState.bossBullets);
    
   
}