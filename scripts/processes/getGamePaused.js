import {gameState} from '../game.js';

export const getGamePaused = () => {
    return gameState.isGamePaused;
}