import {createSpaceship} from '../objects/spaceship.js';
import {createBoss} from '../objects/boss.js';
import {startGameTimer} from './startGameTimer.js';
import {endGame} from './endGame.js';
import { manageBossBullets } from './manageBossBullets.js';
import { gameState } from '../game.js';
import {createBulletCounter} from './bulletCounter.js';
import { setGamePaused } from './setGamePaused.js';

export function continueGame(app) {
     

    // Видаляємо всі ticker-колбеки (без збереження callback‑ів)
    app.ticker.removeAll();
    
    // Очищення сцени
    app.stage.removeChildren();

    // Знімаємо паузу
    setGamePaused(false);

    gameState.bulletData.shotsFired = 0;
   
    
   
    const backgroundTexture = PIXI.Texture.from('assets/images/stairs.png');
    const background = new PIXI.Sprite(backgroundTexture);
    background.width = app.screen.width;
    background.height = app.screen.height;
    app.stage.addChild(background);

       //створюємо лічильник пострілів
        createBulletCounter(app);
    
    const spaceship = createSpaceship(app, gameState.maxBullets);
    const boss = createBoss(app);
    app.stage.addChild(boss);
    gameState.bossBullets = [];

     

    // Запуск таймера гри
    startGameTimer(app, 15, (message) => {
        endGame(app, message, 'red');
    });

    
   manageBossBullets(app, spaceship, boss, gameState.bossBullets);
    
   
}