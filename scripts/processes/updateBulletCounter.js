// Функція для оновлення лічильника
export const updateBulletCounter = (bulletCounterText, maxBullets, shotsFired) => {
    bulletCounterText.text = `Bullets: ${maxBullets - shotsFired} / 10`;
};