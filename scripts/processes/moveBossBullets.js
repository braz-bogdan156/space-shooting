import {gameState} from '../game.js';
export const moveBossBullets = (app, bossBullets) => {
     // Рух куль боса
        for (let i = bossBullets.length - 1; i >= 0; i--) {
          if (!bossBullets[i]) continue;
          bossBullets[i].y += 5;
          if (bossBullets[i].y > app.screen.height) {
            
            app.stage.removeChild(bossBullets[i]);
            bossBullets.splice(i, 1);
            continue;
          }
        };
         app.ticker.add(moveBossBullets);
        gameState.tickerCallbacks.push(() => app.ticker.remove(moveBossBullets));
}