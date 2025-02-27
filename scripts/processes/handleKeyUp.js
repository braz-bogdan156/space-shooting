import { gameState } from "../game.js";

export function handleKeyUp(e) {
  gameState.keys[e.key] = false;
  if (e.key === " ") {
    gameState.shootingState.shooting = false;
    clearInterval(gameState.shootingState.interval); // Зупиняємо інтервал стрільби
  }
}
