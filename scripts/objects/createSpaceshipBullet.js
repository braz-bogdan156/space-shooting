
export const createSpaceshipBullet = () => {
    const bullet = new PIXI.Graphics();
            bullet.beginFill(0xFFFFFF);
            bullet.drawCircle(0, 0, 5);
            bullet.endFill();

            bullet.x = spaceship.x + spaceship.width / 2 - bullet.width / 2;
            bullet.y = spaceship.y - bullet.height;

            app.stage.addChild(bullet);

            return bullet;
}
