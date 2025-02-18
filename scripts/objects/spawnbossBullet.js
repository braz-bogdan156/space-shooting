

// Функція для створення однієї пулі боса
 export const spawnbossBullet = (app , boss) => {
    
    
    const bossBullet = new PIXI.Graphics();
    bossBullet.beginFill(0xff0000);
    bossBullet.drawCircle(0, 0, 10);
    bossBullet.endFill();
    bossBullet.x = boss.x + boss.width / 2;
    bossBullet.y = boss.y + boss.height;
    app.stage.addChild(bossBullet);
   
return bossBullet;
  
}