import { moveBossBullets } from "../processes/moveBossBullets.js";
import { moveRandomBossBullets } from "../processes/moveRandomBossBullets.js";


export const bossBulletMovementCallback = () => {
    moveBossBullets();
    moveRandomBossBullets();
};