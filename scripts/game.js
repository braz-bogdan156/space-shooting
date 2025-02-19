import { createStartButton } from './objects/startButton.js';
import {startGame} from './processes/startGame.js';



export const app = new PIXI.Application({
    width: 1280,
    height: 720,
});

document.body.appendChild(app.view);

// === ІНІЦІАЛІЗАЦІЯ ГРИ (Об'єкти створені, але гра на паузі) ===

// Фон
export const backgroundTexture = PIXI.Texture.from('assets/images/stairs.png');
const background = new PIXI.Sprite(backgroundTexture);
background.width = app.screen.width;
background.height = app.screen.height;
app.stage.addChild(background);

 export const  gameState = {
 spaceship : null,
isGamePaused : true,
// Параметри астероїдів
asteroidData : { spawnedAsteroids: 0 },
 totalAsteroids : 2,
 bulletData : { shotsFired : 0 },
  maxBullets : 100, // Встановлюємо максимальну кількість куль
   keys : {},
 shootingState : {
    shooting : false
},
 canShoot : true 
}






// Кнопка старту гри
 const startButton = createStartButton(app, startGame);
app.stage.addChild(startButton);


