import { spawnbossBullet } from '../objects/spawnbossBullet.js';
import { gameState } from '../game.js';

export const spawnIntervalBossBullets = () => {
    return setInterval(() => {
        const bullet = spawnbossBullet();
        if (bullet) {
            gameState.bossBullets.push(bullet);
        }
    }, 2000);
};