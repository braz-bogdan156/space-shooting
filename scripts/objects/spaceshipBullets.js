

export const spaceshipBullets = (spaceship) => {
    spaceship.bullets = [];

    app.ticker.add(() => {
        

        for (let i = spaceship.bullets.length - 1; i >= 0; i--) {
            spaceship.bullets[i].y -= 5;
            if (spaceship.bullets[i].y < 0) {
                app.stage.removeChild(spaceship.bullets[i]);
                spaceship.bullets.splice(i, 1);
            }
        }
    });

    spaceship.bullets = bullets;
}

