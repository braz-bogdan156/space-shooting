export const startGameTimer = (app, duration, endGame) => {
    let timeLeft = duration;

    const timerText = new PIXI.Text(`Time: ${timeLeft}`, {
        fontFamily: "Arial",
        fontSize: 32,
        fill: "white",
    });
    timerText.x = 10;
    timerText.y = 10;
    app.stage.addChild(timerText);

    const timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timerText.text = `Time: ${timeLeft}`;
            console.log("Time left:", timeLeft);
        } else {
            clearInterval(timerInterval);
            timerText.text = `Time: 0`;
            console.log("Timer reached 0, calling endGame with delay...");
            setTimeout(() => {
                endGame(app, 'YOU LOSE', 'red');
            }, 100);
        }
    }, 1000);
};