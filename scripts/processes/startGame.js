import {createSpaceship} from '../objects/spaceship.js';
import {setGamePaused, getGamePaused} from './gameState.js';
import {createAsteroids} from '../objects/asteroid.js';
import {startGameTimer} from './startGameTimer.js';
import { manageAsteroids } from './manageAsteroids.js';
import { endGame } from './endGame.js';
import { maxBullets, totalAsteroids, asteroidData} from '../game.js'

// === ЛОГІКА ГРИ (Оновлюється лише після натискання кнопки) ===
export function startGame(app) {
    
   
    if (!getGamePaused()) return; // Якщо гра вже йде, нічого не робити

    setGamePaused(false); // Знімаємо паузу
    

    // Додаємо фон заново
    const backgroundTexture = PIXI.Texture.from('assets/images/stairs.png');
    const background = new PIXI.Sprite(backgroundTexture);
    background.width = app.screen.width;
    background.height = app.screen.height;
    app.stage.addChild(background);
    
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
