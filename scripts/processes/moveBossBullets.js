import { app, gameState } from "../game.js";
export const moveBossBullets = () => {
     // Рух куль боса
        for (let i = gameState.bossBullets.length - 1; i >= 0; i--) {
          if (!gameState.bossBullets[i]) continue;
          gameState.bossBullets[i].y += 7;
          if (gameState.bossBullets[i].y > app.screen.height) {
            
            app.stage.removeChild(gameState.bossBullets[i]);
            gameState.bossBullets.splice(i, 1);
            continue;
          }
        };
      
}