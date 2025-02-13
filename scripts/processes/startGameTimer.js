



export const startGameTimer = (app, duration) => {
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
    }

    // Якщо час закінчився і гра ще не завершена
    if (timeLeft <= 0 ) {
       
        clearInterval(timerInterval); // Зупиняємо таймер
        timerText.text = `Time: 0`;
     
    }
}, 1000);
   
};
 