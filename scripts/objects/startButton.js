// Функція створення кнопки
export function createStartButton(app, onClick) {
    const startButton = new PIXI.Graphics();
    startButton.beginFill(0x0000FF); // Синій фон кнопки
    startButton.drawRoundedRect(0, 0, 250, 70, 20);
    startButton.endFill();
    startButton.x = app.screen.width / 2 - 100;
    startButton.y = app.screen.height - 80;
    startButton.interactive = true;
    startButton.buttonMode = true;

    // Додавання тексту до кнопки
    const buttonText = new PIXI.Text('START GAME', {
        fontFamily: 'Arial',
        fontSize: 32,
        fill: 'white',
    });
    buttonText.x = startButton.width / 2 - buttonText.width / 2;
    buttonText.y = startButton.height / 2 - buttonText.height / 2;
    startButton.addChild(buttonText);

    // Ефекти наведення
    startButton.on('pointerover', () => {
        startButton.scale.set(1.05);
        startButton.tint = 0x00FFFF; // Бірюзовий ефект
    });

    startButton.on('pointerout', () => {
        startButton.scale.set(1);
        startButton.tint = 0xFFFFFF;
    });

    // Обробник натискання
    startButton.on('pointerdown', onClick);

    return startButton;
}