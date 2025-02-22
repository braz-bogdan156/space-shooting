
export const startGameTimer = (app, duration, endGame) => {
    let timeLeft = duration;

    // Створення тексту таймера
    const timerText = new PIXI.Text(`Time: ${timeLeft}`, {
        fontFamily: "Arial",
        fontSize: 32,
        fill: "white",
    });
    timerText.x = 10;
    timerText.y = 10;
    app.stage.addChild(timerText);

    // Оновлення таймера щосекунди
    const timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timerText.text = `Time: ${timeLeft}`;

        } else {
            clearInterval(timerInterval); // Зупиняємо таймер
            timerText.text = `Time: 0`;
            console.log("Timer reached 0. Ending game with YOU LOSE.");
            endGame(app, 'YOU LOSE', 'red');
        }
    }, 1000);
};