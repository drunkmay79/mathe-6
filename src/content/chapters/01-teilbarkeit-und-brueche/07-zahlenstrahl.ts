import { defineLesson } from '../../schema'

/**
 * Тема 7 главы: учебник S. 23-25, тетрадь S. 17-19.
 *
 * Последняя тема главы. Дробь получает своё место на числовой прямой,
 * и здесь же становится видно, почему равные дроби — действительно одно
 * и то же число: они стоят в одной точке.
 */
export const lesson = defineLesson({
  id: 'zahlenstrahl',
  title: { de: 'Brüche am Zahlenstrahl', ru: 'Дроби на числовой прямой' },
  summary:
    'У каждой дроби есть своё место на числовой прямой. Чтобы его найти, отрезок от 0 до 1 делят на столько частей, сколько написано в знаменателе. Здесь же видно, что равные дроби стоят в одной точке.',
  terms: ['zahlenstrahl', 'gleichwertig', 'echter-bruch', 'unechter-bruch', 'gemischte-zahl'],
  source: { book: 'lb', page: 23 },

  phrases: [
    {
      de: 'Beschrifte den Zahlenstrahl mit Brüchen.',
      ru: 'Подпиши числовую прямую дробями.',
      note: 'beschriften — подписывать.',
    },
    {
      de: 'Ergänze die Brüche bei den Pfeilen.',
      ru: 'Впиши дроби там, куда показывают стрелки.',
    },
    {
      de: 'Teile den Zahlenstrahl passend ein.',
      ru: 'Раздели числовую прямую подходящим образом.',
      note: 'die Einteilung — разметка, деления. Сколько делений нужно, подсказывает знаменатель.',
    },
    {
      de: 'Trage den Bruch am Zahlenstrahl ein.',
      ru: 'Отметь дробь на числовой прямой.',
    },
    {
      de: 'Achte darauf, Brüche zu kürzen.',
      ru: 'Не забудь сократить дроби.',
      note: 'Achte darauf — «обрати внимание», то есть об этом легко забыть.',
    },
    {
      de: 'Zahlenstrahlen müssen nicht mit null beginnen.',
      ru: 'Числовая прямая не обязана начинаться с нуля.',
    },
  ],

  theory: [
    {
      type: 'text',
      body: {
        de: 'Um einen Bruch am Zahlenstrahl einzutragen, muss man die Strecke von 0 bis 1 in so viele Teile teilen, wie der Nenner vorgibt.',
        ru: 'Дробь — это не только кусок пирога, это ещё и число. А у каждого числа есть своё место на прямой. Найти его просто: отрезок от 0 до 1 делят на столько частей, сколько стоит в знаменателе, и отсчитывают столько делений, сколько в числителе.',
      },
    },
    {
      type: 'playground',
      toy: 'bruch-am-strahl',
      caption:
        'Выбери, на сколько долей делить, и тыкай по штрихам. Внизу появляется дробь этого места. Поставь 4 доли и найди точку 2/4 — приложение сразу покажет, что это половина.',
    },
    {
      type: 'rule',
      title: { de: 'Merke: Einteilung', ru: 'Запомни: разметка' },
      body: {
        de: 'Der Nenner gibt an, in wie viele gleich große Teile der Abschnitt zwischen 0 und 1 eingeteilt wird. Der Zähler gibt die Anzahl der Teilstriche nach 0 an.',
        ru: 'Знаменатель говорит, на сколько частей резать отрезок от 0 до 1. Числитель — сколько делений отсчитать от нуля. Всё, больше ничего знать не нужно.',
      },
      expr: '\\frac{4}{9}: \\ \\text{9 Teile, davon 4 nach der Null}',
    },
    {
      type: 'playground',
      toy: 'strahl-lupe',
      caption:
        'Стрелка стоит на одном и том же месте, а мы делим прямую всё мельче — и точка каждый раз получает новое имя: 1/2, 2/4, 4/8, 8/16. Все эти дроби равны, они называются gleichwertig. Вот почему сокращение ничего не портит: точка на прямой не двигается.',
    },
    {
      type: 'rule',
      title: { de: 'Merke: gleichwertige Brüche', ru: 'Запомни: равные дроби' },
      body: {
        de: 'Gleichwertige Brüche stehen an derselben Stelle am Zahlenstrahl.',
        ru: 'Равные дроби стоят в одной и той же точке. Это самая честная проверка: если два ответа оказались в одной точке, они одинаковые, как бы по-разному ни выглядели.',
      },
      expr: '\\frac{1}{2} = \\frac{2}{4} = \\frac{4}{8} = \\frac{8}{16}',
    },
    {
      type: 'example',
      prompt: {
        de: 'Trage 3/4 am Zahlenstrahl ein.',
        ru: 'Отметь 3/4 на числовой прямой.',
      },
      steps: [
        {
          expr: '\\text{Nenner } 4 \\rightarrow \\text{4 gleiche Teile}',
          explain: 'Знаменатель 4 — делим отрезок от 0 до 1 на четыре равные части.',
        },
        {
          expr: '\\text{Zähler } 3 \\rightarrow \\text{3 Striche nach der Null}',
          explain: 'Числитель 3 — отсчитываем три деления от нуля.',
        },
        {
          explain: 'Попали в точку между 1/2 и 1 — как раз посередине. Это и есть три четверти.',
        },
      ],
    },
    {
      type: 'playground',
      toy: 'gemischte-zahl-strahl',
      caption:
        'Прямая не заканчивается на единице. Пройди за неё и посмотри, что происходит: 7/4 — это то же самое, что 1 целая и 3/4. Первая запись называется unechter Bruch, вторая — gemischte Zahl. Это одно число, просто записанное двумя способами.',
    },
    {
      type: 'rule',
      title: { de: 'Merke: echte und unechte Brüche', ru: 'Запомни: правильные и неправильные' },
      body: {
        de: 'Bei echten Brüchen ist der Zähler kleiner als der Nenner. Bei unechten Brüchen ist er größer oder gleich.',
        ru: 'Если числитель меньше знаменателя — дробь echter Bruch, правильная, и стоит она левее единицы. Если больше или столько же — unechter Bruch, и она уже за единицей. Такую можно записать смешанным числом.',
      },
      expr: '\\frac{3}{4} \\text{ echt} \\qquad \\frac{7}{4} = 1\\tfrac{3}{4} \\text{ unecht}',
    },
  ],

  exercises: [
    /* ------------------------------------------------- язык задания */
    {
      id: 'sprache-einteilen',
      kind: 'choice',
      focus: 'sprache',
      prompt: {
        de: 'Teile den Zahlenstrahl passend ein.',
        ru: 'Что определяет, на сколько частей делить прямую?',
      },
      options: [
        { de: 'Der Zähler.', ru: 'Числитель — верхнее число' },
        { de: 'Der Nenner.', ru: 'Знаменатель — нижнее число' },
      ],
      correct: 1,
      hints: ['Вспомни, за что вообще отвечает знаменатель.'],
      solution:
        'Знаменатель говорит, на сколько частей делят целое, — значит и делений на прямой столько же.',
    },
    {
      id: 'sprache-achte-darauf',
      kind: 'choice',
      focus: 'sprache',
      prompt: {
        de: 'Achte darauf, Brüche zu kürzen.',
        ru: 'Что означает эта приписка в задании?',
      },
      options: [
        { de: 'Es ist verboten zu kürzen.', ru: 'Сокращать нельзя' },
        { de: 'Vergiss das Kürzen nicht.', ru: 'Не забудь сократить' },
      ],
      correct: 1,
      hints: ['Achte darauf — «обрати внимание на это».'],
      solution:
        'Это напоминание: ответ надо записать сокращённой дробью. Без него легко написать 2/10 вместо 1/5.',
    },

    /* ----------------------------------------------------- уровень ▽ */
    {
      id: 'strahl-2-4',
      kind: 'numberline',
      level: 'basis',
      prompt: {
        de: 'Trage 2/4 am Zahlenstrahl ein.',
        ru: 'Отметь на прямой дробь две четвёртых.',
      },
      from: 0,
      to: 1,
      parts: 4,
      target: 2,
      label: '\\frac{2}{4}',
      hints: [
        'Отрезок уже поделён на 4 части. Отсчитай от нуля две.',
        'Заметь, куда попала точка — прямо в середину.',
      ],
      solution: 'Второй штрих от нуля. Это ровно середина, ведь 2/4 — это половина.',
      source: { book: 'ah', page: 17, task: '1' },
    },
    {
      id: 'strahl-3-6',
      kind: 'numberline',
      level: 'basis',
      prompt: { de: 'Trage 3/6 am Zahlenstrahl ein.', ru: 'Отметь на прямой три шестых.' },
      from: 0,
      to: 1,
      parts: 6,
      target: 3,
      label: '\\frac{3}{6}',
      hints: ['Шесть частей, отсчитай три.'],
      solution: 'Снова середина: 3/6 — это тоже половина. Разные дроби, одна точка.',
      source: { book: 'ah', page: 17, task: '2' },
    },
    {
      id: 'strahl-lesen-5-8',
      kind: 'fraction',
      level: 'basis',
      prompt: {
        de: 'Ergänze den Bruch bei dem Pfeil.',
        ru: 'Какая дробь стоит там, куда показывает стрелка?',
      },
      figure: { shape: 'numberline', from: 0, to: 1, parts: 8, marks: [5] },
      numerator: 5,
      denominator: 8,
      hints: [
        'Сначала посчитай, на сколько частей разделён отрезок от 0 до 1.',
        'Потом посчитай штрихи от нуля до стрелки.',
      ],
      solution: 'Восемь частей, стрелка на пятом штрихе — это 5/8.',
      source: { book: 'ah', page: 17, task: '2b' },
    },
    {
      id: 'strahl-3-4',
      kind: 'numberline',
      level: 'basis',
      prompt: { de: 'Trage 3/4 am Zahlenstrahl ein.', ru: 'Отметь на прямой три четверти.' },
      from: 0,
      to: 1,
      parts: 4,
      target: 3,
      label: '\\frac{3}{4}',
      hints: ['Три деления от нуля из четырёх.'],
      solution: 'Третий штрих — между серединой и единицей.',
      source: { book: 'ah', page: 17, task: '1a' },
    },

    /* ----------------------------------------------------- уровень ▷ */
    {
      id: 'strahl-lesen-kuerzen',
      kind: 'fraction',
      level: 'mittel',
      prompt: {
        de: 'Ergänze den Bruch bei dem Pfeil. Achte darauf, den Bruch zu kürzen.',
        ru: 'Какая дробь у стрелки? Ответ запиши сокращённым.',
      },
      figure: { shape: 'numberline', from: 0, to: 1, parts: 10, marks: [2] },
      numerator: 1,
      denominator: 5,
      requireReduced: true,
      hints: [
        'Сначала прочитай как есть: сколько всего делений и на каком стоит стрелка.',
        'Получилось 2/10 — а теперь сократи.',
      ],
      solution: '2/10 = 1/5. Задание прямо просило сократить, иначе ответ считается неполным.',
      source: { book: 'ah', page: 18, task: '3' },
    },
    {
      id: 'strahl-7-9',
      kind: 'numberline',
      level: 'mittel',
      prompt: { de: 'Trage 7/9 am Zahlenstrahl ein.', ru: 'Отметь на прямой семь девятых.' },
      from: 0,
      to: 1,
      parts: 9,
      target: 7,
      label: '\\frac{7}{9}',
      hints: ['Девять делений, отсчитай семь.'],
      solution: 'Седьмой штрих из девяти — почти у самой единицы.',
      source: { book: 'ah', page: 18, task: '1b' },
    },
    {
      id: 'gleichwertig-erkennen',
      kind: 'pick',
      level: 'mittel',
      prompt: {
        de: 'Welche Brüche stehen an derselben Stelle wie 1/2?',
        ru: 'Какие дроби стоят на прямой в той же точке, что и 1/2?',
      },
      options: ['3/12', '6/12', '4/8', '5/6', '2/4'],
      correct: [1, 2, 4],
      hints: [
        'Сократи каждую дробь и посмотри, что получится.',
        '6/12 = 1/2, 4/8 = 1/2, а 3/12 = 1/4 — это другое место.',
      ],
      solution: 'В точке 1/2 стоят 6/12, 4/8 и 2/4. Дробь 3/12 равна 1/4, а 5/6 почти у единицы.',
      source: { book: 'ah', page: 18, task: '2' },
    },
    {
      id: 'strahl-lesen-drittel',
      kind: 'fraction',
      level: 'mittel',
      prompt: {
        de: 'Ergänze den Bruch bei dem Pfeil. Kürze so weit wie möglich.',
        ru: 'Какая дробь у стрелки? Сократи её до конца.',
      },
      figure: { shape: 'numberline', from: 0, to: 1, parts: 12, marks: [4] },
      numerator: 1,
      denominator: 3,
      requireReduced: true,
      hints: ['Двенадцать делений, стрелка на четвёртом: сначала получится 4/12.'],
      solution: '4/12 = 1/3, потому что и 4, и 12 делятся на 4.',
      source: { book: 'ah', page: 18, task: '3' },
    },

    /* ----------------------------------------------------- уровень ⋈ */
    {
      id: 'strahl-unechter-bruch',
      kind: 'numberline',
      level: 'plus',
      prompt: {
        de: 'Trage 7/4 am Zahlenstrahl ein.',
        ru: 'Отметь на прямой дробь семь четвёртых.',
      },
      from: 0,
      to: 2,
      parts: 4,
      target: 7,
      label: '\\frac{7}{4}',
      hints: [
        'Семь четвертей больше единицы — точка будет правее.',
        'Отсчитывай штрихи подряд, не сбрасывая счёт на единице.',
      ],
      solution: 'Седьмой штрих от нуля. Это 1 целая и ещё 3/4, то есть 1 3/4.',
      source: { book: 'ah', page: 19, task: '1' },
    },
    {
      id: 'gemischt-in-bruch',
      kind: 'fraction',
      level: 'plus',
      prompt: {
        de: 'Schreibe die gemischte Zahl 2 1/4 als unechten Bruch.',
        ru: 'Запиши смешанное число 2 1/4 неправильной дробью.',
      },
      numerator: 9,
      denominator: 4,
      requireExact: true,
      hints: [
        'В одном целом четыре четверти. Сколько четвертей в двух целых?',
        'Восемь четвертей плюс ещё одна — сколько всего?',
      ],
      solution: '2 целых — это 8/4, плюс 1/4 получается 9/4.',
      source: { book: 'ah', page: 19, task: '1c' },
    },
    {
      id: 'strahl-lesen-gemischt',
      kind: 'fraction',
      level: 'plus',
      prompt: {
        de: 'Ergänze den Bruch bei dem Pfeil.',
        ru: 'Какая дробь стоит у стрелки? Запиши неправильной дробью.',
      },
      figure: { shape: 'numberline', from: 0, to: 2, parts: 5, marks: [8] },
      numerator: 8,
      denominator: 5,
      hints: [
        'Каждое целое поделено на 5 частей. Считай штрихи от самого нуля.',
        'Стрелка стоит за единицей: 5 делений это единица, дальше ещё три.',
      ],
      solution: '8/5. Смешанным числом это 1 3/5.',
      source: { book: 'ah', page: 19, task: '1b' },
    },
    {
      id: 'strahl-13-6',
      kind: 'numberline',
      level: 'plus',
      prompt: {
        de: 'Trage 13/6 am Zahlenstrahl ein.',
        ru: 'Отметь на прямой тринадцать шестых.',
      },
      from: 0,
      to: 3,
      parts: 6,
      target: 13,
      label: '\\frac{13}{6}',
      hints: [
        'Двенадцать шестых — это ровно 2 целых. Значит нужен ещё один штрих после двойки.',
        'Смешанным числом это 2 1/6.',
      ],
      solution: 'Тринадцатый штрих от нуля, сразу за двойкой. Это 2 1/6.',
      source: { book: 'ah', page: 19, task: '1c' },
    },
    {
      id: 'echt-oder-unecht',
      kind: 'pick',
      level: 'plus',
      prompt: {
        de: 'Welche Brüche sind unechte Brüche?',
        ru: 'Какие из этих дробей неправильные, то есть больше или равны единице?',
      },
      options: ['3/4', '7/5', '9/9', '2/7', '11/4'],
      correct: [1, 2, 4],
      hints: [
        'Неправильная дробь — та, у которой числитель не меньше знаменателя.',
        'Не забудь про 9/9: числитель равен знаменателю, значит это ровно единица.',
      ],
      solution:
        'Неправильные: 7/5, 9/9 и 11/4. У 3/4 и 2/7 числитель меньше знаменателя — это echte Brüche, они левее единицы.',
      source: { book: 'lb', page: 25 },
    },
    {
      id: 'warum-gleiche-stelle',
      kind: 'open',
      level: 'plus',
      prompt: {
        de: 'Begründe durch Kürzen oder Erweitern, warum 4/12 und 1/3 an derselben Stelle am Zahlenstrahl stehen.',
        ru: 'Объясни через сокращение или расширение, почему 4/12 и 1/3 стоят в одной точке.',
      },
      reference:
        'Потому что это одна и та же величина, записанная по-разному. Если 4/12 сократить на 4, получится ровно 1/3. Или наоборот: расширить 1/3 на 4 — получится 4/12. Сокращение и расширение не двигают точку по прямой, они только меняют, насколько мелко она размечена.',
      referenceDe: '4/12 = 1/3, denn 4 : 4 = 1 und 12 : 4 = 3.',
      hints: [
        'Попробуй сократить 4/12. На что делятся и 4, и 12?',
        'Вспомни тренажёр с лупой: что происходило с точкой, когда прямую делили мельче?',
      ],
      source: { book: 'ah', page: 18, task: '2c' },
    },
  ],
})
