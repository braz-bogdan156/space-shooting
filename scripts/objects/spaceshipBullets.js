import {app, gameState} from '../game.js';


export const spaceshipBullets = () => {
    
   
    const moveSpaceshipBullets = () => {
       

        for (let i = gameState.bullets.length - 1; i >= 0; i--) {
            if(gameState.bullets[i]){
           gameState.bullets[i].y -= 3;
            if (gameState.bullets[i].y < 0) {
                app.stage.removeChild(gameState.bullets[i]);
                gameState.bullets.splice(i, 1);
            }
        }
        }
    };
    app.ticker.add(moveSpaceshipBullets);
    gameState.tickerCallbacks.push(() => app.ticker.remove(moveSpaceshipBullets));
    
}



