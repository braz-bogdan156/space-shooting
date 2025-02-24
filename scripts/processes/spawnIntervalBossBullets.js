  import {spawnbossBullet} from '../objects/spawnbossBullet.js';
  import { gameState } from '../game.js';
  
  export const spawnIntervalBossBullets = setInterval(() => {
        const bullet = spawnbossBullet(gameState.app, gameState.boss);
        bossBullets.push(bullet);
    }, 2000);