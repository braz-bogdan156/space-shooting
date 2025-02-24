  export const spawnIntervalBossBullets = setInterval(() => {
        const bullet = spawnbossBullet(app, boss);
        bossBullets.push(bullet);
    }, 2000);