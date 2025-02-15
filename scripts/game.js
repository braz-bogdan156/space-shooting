import { createSpaceship } from './objects/spaceship.js';
import { createAsteroids } from './objects/asteroid.js';
import { manageAsteroids } from './processes/manageAsteroids.js';
import { startGameTimer } from './processes/startGameTimer.js';
import { endGame } from './processes/endGame.js';
import { createStartButton } from './objects/startButton.js';

import {manageBossBullets} from './processes/manageBossBullets.js';
import { createBoss } from './objects/boss.js';




const app = new PIXI.Application({
    width: 1280,
    height: 720,
});

document.body.appendChild(app.view);

// === ІНІЦІАЛІЗАЦІЯ ГРИ (Об'єкти створені, але гра на паузі) ===

// Фон
const backgroundTexture = PIXI.Texture.from('assets/images/stairs.png');
const background = new PIXI.Sprite(backgroundTexture);
background.width = app.screen.width;
background.height = app.screen.height;
app.stage.addChild(background);

// Таймер гри та змінна для контролю паузи
export let isGamePaused = true;

export const maxBullets = 10; // Встановлюємо максимальну кількість куль


// Параметри астероїдів
const asteroidData = { spawnedAsteroids: 0 };
const totalAsteroids = 2;




// Кнопка старту гри
export const startButton = createStartButton(app, startGame);
app.stage.addChild(startButton);

// === ЛОГІКА ГРИ (Оновлюється лише після натискання кнопки) ===
export function startGame() {
    if (!isGamePaused) return; // Якщо гра вже йде, нічого не робити

    isGamePaused = false; // Знімаємо паузу
    

    // Створюємо корабель
    const spaceship = createSpaceship(app, maxBullets);

    // Створення астероїдів
    const asteroids = createAsteroids(app, totalAsteroids, 3000, (message, color) => endGame(app, message, color), asteroidData);


    // Запуск таймера гри
    startGameTimer(app, 15, (message) => {
        endGame(app, message, 'red');
    });

    // Анімація та обробка астероїдів тепер активна
    manageAsteroids(app, spaceship, asteroids,
        (message, color) => endGame(app, message, color), asteroidData, totalAsteroids);
        // === Головний цикл гри (оновлюється тільки якщо гра активна) ===
        
        

}

export function continueGame(app) {
   
    const backgroundTexture = PIXI.Texture.from('assets/images/stairs.png');
    const background = new PIXI.Sprite(backgroundTexture);
    background.width = app.screen.width;
    background.height = app.screen.height;
    app.stage.addChild(background);

    
    const spaceship = createSpaceship(app, maxBullets);
    const boss = createBoss(app);
    app.stage.addChild(boss);
    const bossBullets = [];


    // Запуск таймера гри
    startGameTimer(app, 15, (message) => {
        endGame(app, message, 'red');
    });

    
   
        
       manageBossBullets(app, spaceship, boss, bossBullets);
}