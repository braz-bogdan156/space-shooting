import { gameState } from "../game.js";
import { shootShip } from "./shootShip.js";

export function handleKeyDown(e) {
    if (e.key === " ") {
        e.preventDefault();  // Запобігає стандартній поведінці пробілу (прокручування)
        shootShip();  // Безпосередньо викликаємо стрільбу при натисканні пробілу
    }
    
    gameState.keys[e.key] = true;
    if (e.key === " " && !gameState.shootingState.shooting) {
        gameState.shootingState.shooting = true;
        gameState.shootingState.interval = setInterval(shootShip, 150);  // Починаємо стрільбу з інтервалом у 150 мс
    }
}