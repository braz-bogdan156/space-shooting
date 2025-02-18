import {keys, shootingState} from '../game.js';


export function handleKeyUp(e) {
    keys[e.key] = false;
    if (e.key === " ") {
        shootingState.shooting = false;
    }
}