import { moveBossBullets } from "../processes/moveBossBullets";

export const bossBulletMovementCallback = () => {
    moveBossBullets(app, bossBullets);
};