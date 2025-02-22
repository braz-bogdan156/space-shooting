import {gameState} from '../game.js';

export function clearTickers() {
    gameState.tickerCallbacks.forEach(removeCallback => removeCallback());
    gameState.tickerCallbacks.length = 0; // Очищення списку колбеків
}