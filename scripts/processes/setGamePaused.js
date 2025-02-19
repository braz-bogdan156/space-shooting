import {gameState} from '../game.js';

export const setGamePaused = (value) => {
   
     gameState.isGamePaused = value;
};