import { spawnbossBullet } from './spawnbossBullet.js';
import { gameState, app } from '../game.js';

// Функція для створення кулі, яка летить рандомно в усі сторони
export const spawnRandomBossBullets = () => {
    const numBullets = Math.floor(Math.random() * 6) + 15; // Рандомне число від 15 до 20
    for (let i = 0; i < numBullets; i++) {
        const randomBossBullet = spawnbossBullet();
        if (randomBossBullet) {
            const angle = Math.random() * 2 * Math.PI; // Рандомний напрямок в радіанах
            randomBossBullet.vx = Math.cos(angle) * 5; // Рух по x
            randomBossBullet.vy = Math.sin(angle) * 5; // Рух по y
            gameState.randomBossBullets.push(randomBossBullet);
            app.stage.addChild(randomBossBullet);
        }
        
    }
    };
