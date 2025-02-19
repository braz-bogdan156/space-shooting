 import { gameState } from "../game.js";
import { shootShip } from "./shootShip.js";

 
 export function handleKeyDown(e) {
        gameState.keys[e.key] = true;
        if (e.key === " " && !gameState.shootingState.shooting) {
            e.preventDefault();
            gameState.shootingState.shooting = true;
            shootShip();
        }
    }