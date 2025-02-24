import { createStartButton } from './objects/startButton.js';
import {startGame} from './processes/startGame.js';

export const app = new PIXI.Application({
    width: 1280,
    height: 720,
});

document.body.appendChild(app.view);

// === ІНІЦІАЛІЗАЦІЯ ГРИ (Об'єкти створені, але гра на паузі) ===

// Фон
const backgroundTexture = PIXI.Texture.from('assets/images/stairs.png');
 export const background = new PIXI.Sprite(backgroundTexture);
background.width = app.screen.width;
background.height = app.screen.height;
app.stage.addChild(background);

 export const  gameState = {
 spaceship : null,
 bullets : [],
isGamePaused : true,
// Параметри астероїдів
asteroidData : { spawnedAsteroids: 0 },
 totalAsteroids : 10,
 asteroids: [],
 currentSpeed: 0.2, 
 bulletId: 0,
 asteroidId: 0,
 destroyedAsteroids : new Set(),
 destroyedBullets: new Set(),
   bulletData : { shotsFired : 0 },
  maxBullets : 10, // Встановлюємо максимальну кількість куль
   keys : {},
 shootingState : {
    shooting : false
},
 canShoot : true,
 bulletCounterText : null ,
    boss: null,
    bossBullets : [],
     bossHP : 4,
     bossHPBar : null,
     spawnBossInterval : null,
     collidedWithBossBullet: false,
   tickerCallbacks: [],
   timerInterval: null 
 }

// Кнопка старту гри
 const startButton = createStartButton(app, startGame);
app.stage.addChild(startButton);


