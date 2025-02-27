 ## Гра Space Shooter
 
   **Опис :**
   Запрошую до гри Space Shooter, захоплюючої та складної гри, де ви керуєте космічним кораблем, щоб знищувати астероїди та боротися з Босом. Ця гра створена з використанням HTML + CSS, JavaScript та PIXI.js, що забезпечує плавний і інтерактивний ігровий досвід.

   **Особливості :**
1. Рівень з астероїдами:

- Корабель гравця рухається горизонтально і залишається в межах екрану.

- Керування кораблем здійснюється за допомогою клавіш "вліво" та "вправо".

- Стрільба здійснюється за допомогою клавіші "пробіл".

- Кулі створюються за допомогою графічних об'єктів PIXI.js.

- Астероїди випадково розташовані і знищуються при попаданні в них куль.

- Дозволено максимум 10 куль.

- Показ повідомлення "YOU WIN" після знищення всіх астероїдів. Далі відбувається перехід на наступний рівень (рівень з Босом).

- Показ повідомлення "YOU LOSE" у випадку, якщо кулі закінчились або час вийшов.

2. Рівень з Босом:

- Перехід до рівня з Босом після знищення всіх астероїдів.

- У Боса 4 хітпоінти (HP), які відображаються за допомогою HP бару.

- Бос - то стоїть на місці, то  рухається горизонтально в межах екрану.

- Бос стріляє кожні 2 секунди.

- Показ повідомлення "YOU LOSE" у випадку, якщо корабель гравця потрапив під кулю Боса або кулі закінчились.

- Показ повідомлення "YOU WIN" після зниження HP Боса до нуля.

3. Кнопка рестарту гри

- Вдалось розширити функціонал гри, тепер неважливо програш чи виграш й на 1 чи 2 сценкі . Кнопка старту буде завжди з'являтися й при кліці на неї гра перезапускатиметься заново, без необхідності перезапускати сторінку браузера.

   **Використані технології :**
- HTML + CSS;

- JavaScript;

- PIXI.js.

   **Найкращі практики та якість коду :**
- Модульний код: Код організований у кілька модулів, що забезпечує розподіл завдань та повторне використання.
- Чистота та структурованість: Код слідує чистому та структурованому підходу, що робить його легким для читання та підтримки.
- Геттери та сеттери: Використання геттерів та сеттерів для управління станом гри та властивостями.
- Обробка подій: Ефективна обробка подій для керування клавішами та діями гри.
- Коментарі та документація: Код добре документований з коментарями, що пояснюють функціональність кожної частини.

## Для перегляду гри зробіть локальний клон(git clone [https://github.com/braz-bogdan156/space-shooting] ) в терміналі та запустіть її через Live Server в index.html й відповідно запуститься локалхост гри. Або ж можна просто зразу розгорнути деплой проекту за посиланням :  [https://braz-bogdan156.github.io/space-shooting/]