import { moveBossBullets } from "../processes/moveBossBullets.js";
import { app, gameState } from "../game.js";

export const bossBulletMovementCallback = () => {
    moveBossBullets(app, gameState.bossBullets);
};