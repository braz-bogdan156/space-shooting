 import { keys, shootingState } from "../game.js";
import { shootShip } from "./shootShip.js";

 
 export function handleKeyDown(e) {
        keys[e.key] = true;
        if (e.key === " " && !shootingState.shooting) {
            e.preventDefault();
            shootingState.shooting = true;
            shootShip();
        }
    }