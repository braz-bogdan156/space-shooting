export function createBoss(app) {
    const boss = new PIXI.Sprite(PIXI.Texture.from('assets/images/boss.png'));
    boss.width = 150;
    boss.height = 150;
    boss.x = app.screen.width / 2 - boss.width / 2;
    boss.y = 50;


    app.ticker.add(() => {
        boss.x += (Math.random() > 0.5 ? 1 : -1) * 20;
        if (boss.x < 0) boss.x = 0;
        if (boss.x > app.screen.width - boss.width) boss.x = app.screen.width - boss.width;
    });
    
    return boss;
}