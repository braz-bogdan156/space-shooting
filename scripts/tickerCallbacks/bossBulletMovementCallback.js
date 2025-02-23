import { moveBossBullets } from "../processes/moveBossBullets.js";

export const bossBulletMovementCallback = () => {
    moveBossBullets(app, bossBullets);
};