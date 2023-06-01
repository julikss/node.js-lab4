# Laboratory work 4 - Node.js

Лабораторна робота №4 студенток групи ІП-04, Легенької Юлії, Васильєвої Марини, Саніної Анастасії.

http://localhost:8000/api-docs/#/

**_1. Чому REST називається саме так?_**
<br/>
REST означає "Representational State Transfer" (передача стану представлення). "Representation" - для позначення даних, що передаються між клієнтом і сервером. "State" вказує на те, що кожен запит клієнта повинен містити достатню кількість інформації, щоб сервер міг розуміти, що клієнт хоче зробити з цими даними. "Transfer" означає передачу даних з клієнта на сервер і навпаки. У контексті REST це передача стану представлення даних між клієнтом і сервером.
<br/>
Основна ідея REST-архітектури полягає у тому, що сервер надає ресурси (наприклад, дані або функціональність), а клієнт здійснює запити до цих ресурсів, використовуючи стандартні протоколи, такі як HTTP.

**_2. Опишіть поняття ідемпотентності в REST API._**
<br/>
Ідемпотентність в REST API вказує на властивість запитів, що можуть бути виконані повторно без зміни стану сервера після першого виконання. Запит є ідемпотентним, якщо він не має побічних ефектів при повторному виконанні, окрім зміни стану самого клієнта.
<br/>
Ідемпотентні запити **можуть бути виконані у будь-якому порядку без впливу на кінцевий результат**. Наприклад, якщо клієнт відправляє один і той же запит кілька разів, сервер повинен обробляти його однаково і повертати однакові результати.
<br/>
Ідемпотентні запити **підлягають кешуванню**. Це означає, що проміжні проксі-сервери можуть кешувати відповіді запитів і повторно використовувати їх для подальших запитів з тими самими параметрами.

**_3. Опишіть особливості (параметри, кешування, що передається в тілі) кожного з
використаних в лабораторній методів HTTP._**
<br/>
```
router.delete('/api/v1/:name/:id', controller.deleteObject);
router.post('/api/v1/:name', controller.addObject);
router.get('/api/v1/:name', controller.getAllObjects);
router.get('/api/v1/:name/:id', controller.getObject);
router.put('/api/v1/:name/:id', controller.updateObject);

http://localhost:8000/api/v1/authors?page=1&items_per_page=2
```

**_4. Опишіть різницю методів PUT та POST в REST API._**
<br/>
- Метод PUT використовується для створення або оновлення ресурсу зазначеного шляху (URI). Коли виконується запит PUT, клієнт надсилає повне представлення ресурсу із зазначенням його шляху. **PUT є ідемпотентним методом**, тобто повторне виконання запиту не змінює результату, якщо ті самі дані надсилаються.
- Наприклад, якщо у вас є ресурс "користувач" з URI "/users/1", то запит PUT до "/users/1" оновить існуючого користувача з ідентифікатором 1 або створить нового користувача з цим ідентифікатором, якщо його ще немає.
- Метод POST використовується для створення нового ресурсу на сервері. Клієнт не повинен зазначати шлях до ресурсу, оскільки сервер сам визначає URI для нового ресурсу. Кожний запит POST створює новий ресурс з унікальним ідентифікатором. **POST не є ідемпотентним методом**, тому кожний новий запит POST створює новий ресурс незалежно від того, скільки разів він був виконаний з тими самими даними.
- Наприклад, якщо у вас є ресурс "користувачі" з URI "/users", то запит POST до "/users" створить нового користувача з новим унікальним ідентифікатором, який буде визначений сервером.


**_5. На які дії доречно використовувати кешування._**
<br/>
Кешування є важливим механізмом для збереження копії даних або результатів обчислень для подальшого використання без необхідності повторного виконання витратних операцій. Деякі з дій, для яких доречно використовувати кешування, включають:

1. Запити на часто використовувані дані: Якщо у вашому додатку є запити, які часто виконуються і повертають однакові дані для однакових параметрів, ви можете кешувати результати цих запитів. 

2. Статичні ресурси: Статичні ресурси, такі як зображення, CSS-файли або JavaScript-скрипти, рідко змінюються.

3. Результати обчислень: Якщо ваша програма виконує складні обчислення або операції, результати яких не змінюються з часом, ви можете кешувати ці результати.

4. API-відповіді: Якщо ви надаєте публічне API, можливо, що деякі запити повертають однакові результати для одних і тих самих параметрів.

5. Веб-сторінки: Кешування веб-сторінок дозволяє швидше відтворення сторінок для повторних запитів, особливо якщо вони залежать від даних, які змінюються рідко.

**_6. Опишіть як в REST API виглядає адреса для пошуку в списку обʼктів однієї з
сутностей. Наприклад, всі предмети, які вивчаються учнем._**
<br/>
В REST API адреса для пошуку в списку об'єктів однієї з сутностей може бути створена за допомогою шляху (URI) і параметрів запиту (query parameters).

```
GET /students/{student_id}/subjects
```
У цьому шляху - {student_id} представляє ідентифікатор учня, для якого проводиться пошук предметів. 
Параметри запиту (query parameters) можуть бути додані до цього шляху для додаткового фільтрування, сортування або обмеження результатів. Наприклад:
```
GET /students/{student_id}/subjects?year=2023
```

**_7. Опишіть яку роль відіграють статуси HTTP(2XX, 3XX, 4XX) в REST API._**
<br/>
**2XX (Успіх)**: Ці статуси позначають успішні запити і вказують, що сервер успішно обробив запит клієнта. 
- 200 OK: Запит був успішно оброблений, і відповідь містить необхідні дані.
- 201 Created: Новий ресурс був успішно створений на сервері.
- 204 No Content: Запит був успішно оброблений, але відповідь не містить додаткових даних.

**3XX (Перенаправлення)**: Ці статуси позначають, що клієнт повинен виконати додаткові кроки для завершення запиту. 
- 301 Moved Permanently: Ресурс був переміщений на нове місце, і клієнт повинен оновити свої посилання.
- 302 Found: Ресурс тимчасово переміщений, і клієнт повинен звернутися до нового розташування.
- 303 See Other: Клієнт повинен звернутися до іншого ресурсу для отримання результату запиту.

**4XX (Помилка клієнта)**: Ці статуси позначають, що запит був сформований некоректно або сервер не може обробити запит клієнта. 
- 400 Bad Request: Запит містить некоректні дані або параметри.
- 401 Unauthorized: Клієнт не має дозволу на доступ до запитуваного ресурсу.
- 404 Not Found: Запитуваний ресурс не знайдений на сервері.

**_8. Опишіть підхід HATEOAS._**
<br/>
**HATEOAS** (Hypermedia as the Engine of Application State) - це архітектурний принцип, що використовується в дизайні RESTful API. За допомогою HATEOAS, клієнт може ефективно взаємодіяти з RESTful API, без необхідності заздалегідь знати URL-адреси або структуру API.

*Основні принципи HATEOAS:*

- Гіперпосилання на пов'язані ресурси: Відповідь сервера містить гіперпосилання на ресурси, пов'язані з поточним запитом. Це дозволяє клієнту легко навігувати між різними ресурсами, не залежно від знання URL-адреси або структури API.
- Гіперпосилання на дозволені дії: Крім гіперпосилань на пов'язані ресурси, сервер також надає гіперпосилання на дозволені дії, які клієнт може виконати з поточним ресурсом. Це дозволяє клієнту взаємодіяти з ресурсами, виконуючи відповідні дії (наприклад, створення, оновлення або видалення ресурсу).
- Динамічне визначення можливих дій: Клієнт отримує від сервера інформацію про можливі дії, які можна виконати з поточним ресурсом, замість передбачати їх заздалегідь. Це дозволяє API змінюватись без впливу на клієнтський код, оскільки клієнт динамічно визначає, що можна робити з ресурсом, використовуючи надані гіперпосилання.

**_9. Опишіть інші підходи для реалізації API._**
- SOAP (Simple Object Access Protocol): SOAP є протоколом обміну повідомленнями, який дозволяє програмним компонентам взаємодіяти через мережу. SOAP використовує XML для структурування повідомлень та підтримує різні протоколи транспорту, такі як HTTP, SMTP та інші. SOAP підходить для побудови великих і складних систем, але може бути важким для використання і має великий обсяг протоколу.

- GraphQL: GraphQL є запитовою мовою та середовищем виконання запитів для отримання та зміни даних. Замість того, щоб отримувати повний набір даних, як у REST, клієнт може вказати точні дані, які йому потрібні. GraphQL надає гнучкість та ефективність у взаємодії з API, а також дозволяє описувати схему даних. Він особливо корисний для великих та складних додатків з багатими потребами в отриманні даних.