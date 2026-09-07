import { defineLesson } from '../../schema'

/**
 * Тема 6 главы: учебник S. 20-22, тетрадь S. 14-16.
 *
 * Сравнение дробей. С одинаковыми знаменателями всё просто, и вся сложность
 * темы в том, чтобы привести к ним разные — тут снова понадобится kgV.
 */
export const lesson = defineLesson({
  id: 'vergleichen-ordnen',
  title: { de: 'Brüche vergleichen und ordnen', ru: 'Сравнение дробей' },
  summary:
    'Если знаменатели одинаковые, сравнивать легко — смотри только на числители. Если разные, сравнивать напрямую нельзя: сначала дроби приводят к одному знаменателю, и только потом сравнивают.',
  terms: ['gleichnamig', 'ungleichnamig', 'gemeinsamer-nenner', 'hauptnenner', 'kgv', 'erweitern'],
  source: { book: 'lb', page: 20 },

  phrases: [
    {
      de: 'Setze < oder > ein.',
      ru: 'Поставь знак < или >.',
      note: 'Острый угол всегда смотрит на меньшее число.',
    },
    {
      de: 'Ordne die Brüche. Beginne mit dem kleinsten.',
      ru: 'Расставь дроби по порядку, начиная с самой маленькой.',
    },
    {
      de: 'Schreibe zuerst gleichnamige Brüche auf.',
      ru: 'Сначала приведи дроби к одному знаменателю.',
      note: 'gleichnamig — «одноимённые», с одинаковым знаменателем.',
    },
    {
      de: 'Suche den Hauptnenner.',
      ru: 'Найди наименьший общий знаменатель.',
      note: 'Hauptnenner — это kgV знаменателей. Вот где снова пригодилось НОК.',
    },
    {
      de: 'Bestätige deine Ergebnisse.',
      ru: 'Подтверди свои ответы.',
      note: 'Просят проверить то, что уже получилось, другим способом.',
    },
  ],

  theory: [
    {
      type: 'text',
      body: {
        de: 'Brüche mit demselben Nenner heißen gleichnamig. Bei gleichnamigen Brüchen vergleicht man nur die Zähler.',
        ru: 'Сравнить 3/8 и 5/8 просто: куски одинаковые, значит побеждает тот, у кого их больше. А вот 2/3 и 3/5 так сравнить нельзя — куски разного размера, и числа сравнивать бессмысленно.',
      },
    },
    {
      type: 'playground',
      toy: 'brueche-vergleichen',
      caption:
        'Покрути обе дроби и следи за полосками. Пока знаменатели одинаковые, всё честно: больше числитель — длиннее полоска. А теперь сделай знаменатели разными и убедись, что по числам угадать уже нельзя: у 1/2 числитель меньше, чем у 3/8, а полоска длиннее.',
    },
    {
      type: 'rule',
      title: { de: 'Merke: gleichnamige Brüche', ru: 'Запомни: одинаковые знаменатели' },
      body: {
        de: 'Bei gleichnamigen Brüchen ist der Bruch größer, der den größeren Zähler hat.',
        ru: 'Если знаменатели совпадают, больше та дробь, у которой больше числитель. Знаменатель при этом вообще не трогаем.',
      },
      expr: '\\frac{5}{8} > \\frac{3}{8}',
    },
    {
      type: 'rule',
      title: { de: 'Merke: ungleichnamige Brüche', ru: 'Запомни: разные знаменатели' },
      body: {
        de: 'Ungleichnamige Brüche muss man erst gleichnamig machen: einen gemeinsamen Nenner finden, auf diesen Nenner erweitern, dann die Zähler vergleichen.',
        ru: 'Разные знаменатели сначала делают одинаковыми. Общий знаменатель — это kgV знаменателей, его называют Hauptnenner. Расширяем обе дроби до него и только потом сравниваем числители.',
      },
      expr: '\\frac{5}{6} \\text{ и } \\frac{7}{8}: \\ \\text{kgV}(6;8)=24 \\rightarrow \\frac{20}{24} < \\frac{21}{24}',
    },
    {
      type: 'playground',
      toy: 'gleichnamig-machen',
      caption:
        'Поставь любые два знаменателя и нажми кнопку. Тренажёр покажет весь путь: какой знаменатель общий, на сколько умножается каждая дробь и что получается. Сравни сам ответ с полосками из предыдущего тренажёра — должно сойтись.',
    },
    {
      type: 'example',
      prompt: {
        de: 'Was ist größer: 2/3 oder 3/5?',
        ru: 'Что больше: 2/3 или 3/5?',
      },
      steps: [
        {
          expr: '\\text{kgV}(3; 5) = 15',
          explain: 'Ищем общий знаменатель. Это наименьшее общее кратное знаменателей.',
        },
        {
          expr: '\\frac{2}{3} = \\frac{2 \\cdot 5}{3 \\cdot 5} = \\frac{10}{15}',
          explain: 'Расширяем первую дробь до знаменателя 15.',
        },
        {
          expr: '\\frac{3}{5} = \\frac{3 \\cdot 3}{5 \\cdot 3} = \\frac{9}{15}',
          explain: 'И вторую тоже.',
        },
        {
          expr: '\\frac{10}{15} > \\frac{9}{15} \\rightarrow \\frac{2}{3} > \\frac{3}{5}',
          explain: 'Теперь знаменатели одинаковые, сравниваем числители: 10 больше 9.',
        },
      ],
    },
    {
      type: 'playground',
      toy: 'bruch-sortierer',
      caption:
        'А это уже проверка себя. Расставь четыре дроби от меньшей к большей. Если сомневаешься — посмотри на полоски внизу, они не врут. Ошибёшься — карточка станет оранжевой, и можно попробовать другую.',
    },
  ],

  exercises: [
    /* ------------------------------------------------- язык задания */
    {
      id: 'sprache-gleichnamig',
      kind: 'choice',
      focus: 'sprache',
      prompt: { de: 'Schreibe zuerst gleichnamige Brüche auf.', ru: 'Что надо сделать сначала?' },
      options: [
        { de: 'Die Brüche sofort vergleichen.', ru: 'Сразу сравнить дроби' },
        { de: 'Die Nenner gleich machen.', ru: 'Сделать знаменатели одинаковыми' },
        { de: 'Die Brüche kürzen.', ru: 'Сократить дроби' },
      ],
      correct: 1,
      hints: ['gleich — одинаковый, Name — имя. У дробей «имя» — это знаменатель.'],
      solution:
        'gleichnamig machen — привести к одному знаменателю. Это всегда первый шаг, если знаменатели разные.',
    },
    {
      id: 'sprache-kleinster',
      kind: 'choice',
      focus: 'sprache',
      prompt: {
        de: 'Ordne die Brüche. Beginne mit dem kleinsten Bruch.',
        ru: 'С какой дроби начинать?',
      },
      options: [
        { de: 'Mit dem größten.', ru: 'С самой большой' },
        { de: 'Mit dem kleinsten.', ru: 'С самой маленькой' },
      ],
      correct: 1,
      hints: ['klein — маленький, kleinste — самый маленький.'],
      solution: 'Beginne mit dem kleinsten — начни с наименьшей. Записывают через знак <.',
    },

    /* ----------------------------------------------------- уровень ▽ */
    {
      id: 'vergleich-3-5-und-2-5',
      kind: 'choice',
      level: 'basis',
      prompt: { de: 'Setze < oder > ein: 3/5 □ 2/5', ru: 'Что больше: 3/5 или 2/5?' },
      options: [
        { de: '3/5 > 2/5', ru: '3/5 больше' },
        { de: '3/5 < 2/5', ru: '2/5 больше' },
      ],
      correct: 0,
      hints: ['Знаменатели одинаковые — значит сравниваем только числители.'],
      solution: '3 пятых больше двух пятых, потому что 3 > 2. Знаменатель тут ни при чём.',
      source: { book: 'ah', page: 14, task: '2a' },
    },
    {
      id: 'vergleich-3-11-und-6-11',
      kind: 'choice',
      level: 'basis',
      prompt: { de: 'Setze < oder > ein: 3/11 □ 6/11', ru: 'Что больше: 3/11 или 6/11?' },
      options: [
        { de: '3/11 > 6/11', ru: '3/11 больше' },
        { de: '3/11 < 6/11', ru: '6/11 больше' },
      ],
      correct: 1,
      hints: ['Одиннадцатые доли одинаковые, шести штук больше, чем трёх.'],
      solution: '3/11 < 6/11.',
      source: { book: 'ah', page: 14, task: '2c' },
    },
    {
      id: 'ordnen-zehntel',
      kind: 'choice',
      level: 'basis',
      prompt: {
        de: 'Ordne die Brüche 4/10; 2/10; 9/10; 5/10. Beginne mit dem kleinsten.',
        ru: 'Расставь дроби 4/10, 2/10, 9/10, 5/10 от меньшей к большей.',
      },
      options: [
        { de: '2/10 < 4/10 < 5/10 < 9/10', ru: '2/10 < 4/10 < 5/10 < 9/10' },
        { de: '9/10 < 5/10 < 4/10 < 2/10', ru: '9/10 < 5/10 < 4/10 < 2/10' },
        { de: '2/10 < 5/10 < 4/10 < 9/10', ru: '2/10 < 5/10 < 4/10 < 9/10' },
      ],
      correct: 0,
      hints: ['Знаменатели одинаковые — расставляй по числителям: 2, 4, 5, 9.'],
      solution: 'Порядок числителей 2, 4, 5, 9 — и порядок дробей такой же.',
      source: { book: 'ah', page: 14, task: '3a' },
    },
    {
      id: 'welcher-groesser-bild',
      kind: 'choice',
      level: 'basis',
      prompt: {
        de: 'Welcher Bruch ist größer: 1/2 oder 1/3?',
        ru: 'Что больше: половина или треть?',
      },
      options: [
        { de: '1/2', ru: 'половина' },
        { de: '1/3', ru: 'треть' },
      ],
      correct: 0,
      hints: [
        'Числители одинаковые — по одному куску и там, и там. Значит решает размер куска.',
        'Чем на большее число частей делят целое, тем каждая часть мельче.',
      ],
      solution:
        'Половина больше трети. Тут работает обратное правило: при одинаковых числителях больше та дробь, у которой знаменатель меньше.',
      source: { book: 'lb', page: 21 },
    },
    {
      id: 'vergleich-8-15',
      kind: 'choice',
      level: 'basis',
      prompt: { de: 'Setze < oder > ein: 8/15 □ 7/15', ru: 'Что больше: 8/15 или 7/15?' },
      options: [
        { de: '8/15 > 7/15', ru: '8/15 больше' },
        { de: '8/15 < 7/15', ru: '7/15 больше' },
      ],
      correct: 0,
      hints: ['Знаменатели совпадают.'],
      solution: '8 > 7, значит 8/15 > 7/15.',
      source: { book: 'ah', page: 14, task: '2e' },
    },

    /* ----------------------------------------------------- уровень ▷ */
    {
      id: 'vergleich-4-5-und-3-10',
      kind: 'choice',
      level: 'mittel',
      prompt: { de: 'Setze < oder > ein: 4/5 □ 3/10', ru: 'Что больше: 4/5 или 3/10?' },
      options: [
        { de: '4/5 > 3/10', ru: '4/5 больше' },
        { de: '4/5 < 3/10', ru: '3/10 больше' },
      ],
      correct: 0,
      hints: [
        'Знаменатели разные — сначала сделай их одинаковыми.',
        '10 делится на 5, значит общий знаменатель уже есть: это 10.',
      ],
      solution: '4/5 = 8/10. Сравниваем 8/10 и 3/10: восемь больше трёх, значит 4/5 > 3/10.',
      source: { book: 'ah', page: 15, task: '4a' },
    },
    {
      id: 'vergleich-2-9-und-1-3',
      kind: 'choice',
      level: 'mittel',
      prompt: { de: 'Setze < oder > ein: 2/9 □ 1/3', ru: 'Что больше: 2/9 или 1/3?' },
      options: [
        { de: '2/9 > 1/3', ru: '2/9 больше' },
        { de: '2/9 < 1/3', ru: '1/3 больше' },
      ],
      correct: 1,
      hints: ['9 делится на 3 — расширь вторую дробь до девятых.'],
      solution: '1/3 = 3/9. Сравниваем 2/9 и 3/9: значит 2/9 < 1/3.',
      source: { book: 'ah', page: 15, task: '4b' },
    },
    {
      id: 'vergleich-5-8-und-7-12',
      kind: 'choice',
      level: 'mittel',
      prompt: { de: 'Setze < oder > ein: 5/8 □ 7/12', ru: 'Что больше: 5/8 или 7/12?' },
      options: [
        { de: '5/8 > 7/12', ru: '5/8 больше' },
        { de: '5/8 < 7/12', ru: '7/12 больше' },
      ],
      correct: 0,
      hints: [
        'Ни один знаменатель не делится на другой — нужен kgV(8; 12).',
        'kgV(8; 12) = 24. Расширь обе дроби до двадцать четвёртых.',
      ],
      solution: '5/8 = 15/24, а 7/12 = 14/24. Пятнадцать больше четырнадцати, значит 5/8 > 7/12.',
      source: { book: 'ah', page: 15, task: '4f' },
    },
    {
      id: 'hauptnenner-6-8',
      kind: 'number',
      level: 'mittel',
      prompt: {
        de: 'Wie heißt der Hauptnenner von 5/6 und 7/8?',
        ru: 'Каким будет наименьший общий знаменатель для 5/6 и 7/8?',
      },
      answer: 24,
      hints: [
        'Hauptnenner — это kgV знаменателей.',
        'Кратные 6: 6, 12, 18, 24… Кратные 8: 8, 16, 24…',
      ],
      solution: 'kgV(6; 8) = 24. Именно поэтому в первой теме учили находить kgV.',
      source: { book: 'lb', page: 22 },
    },
    {
      id: 'ordnen-ungleichnamig',
      kind: 'choice',
      level: 'mittel',
      prompt: {
        de: 'Ordne die Brüche 1/3; 2/5; 4/15. Beginne mit dem kleinsten.',
        ru: 'Расставь дроби 1/3, 2/5, 4/15 от меньшей к большей.',
      },
      options: [
        { de: '4/15 < 1/3 < 2/5', ru: '4/15 < 1/3 < 2/5' },
        { de: '1/3 < 2/5 < 4/15', ru: '1/3 < 2/5 < 4/15' },
        { de: '2/5 < 1/3 < 4/15', ru: '2/5 < 1/3 < 4/15' },
      ],
      correct: 0,
      hints: [
        'Общий знаменатель для 3, 5 и 15 — это 15.',
        '1/3 = 5/15, 2/5 = 6/15, а 4/15 так и остаётся.',
      ],
      solution: 'В пятнадцатых долях получается 5/15, 6/15 и 4/15. Порядок: 4/15 < 1/3 < 2/5.',
      source: { book: 'ah', page: 15, task: '5a' },
    },

    /* ----------------------------------------------------- уровень ⋈ */
    {
      id: 'kgv-12-8',
      kind: 'number',
      level: 'plus',
      prompt: {
        de: 'Bestimme das kleinste gemeinsame Vielfache von 12 und 8.',
        ru: 'Найди наименьшее общее кратное чисел 12 и 8.',
      },
      answer: 24,
      hints: ['Кратные 12: 12, 24, 36… Кратные 8: 8, 16, 24…'],
      solution: 'kgV(12; 8) = 24.',
      source: { book: 'ah', page: 16, task: '1e' },
    },
    {
      id: 'kgv-15-9',
      kind: 'number',
      level: 'plus',
      prompt: {
        de: 'Bestimme das kleinste gemeinsame Vielfache von 15 und 9.',
        ru: 'Найди наименьшее общее кратное чисел 15 и 9.',
      },
      answer: 45,
      hints: ['Кратные 15: 15, 30, 45… Кратные 9: 9, 18, 27, 36, 45…'],
      solution: 'kgV(15; 9) = 45.',
      source: { book: 'ah', page: 16, task: '1g' },
    },
    {
      id: 'vergleich-11-12-und-13-12',
      kind: 'choice',
      level: 'plus',
      prompt: { de: 'Setze < oder > ein: 11/12 □ 13/12', ru: 'Что больше: 11/12 или 13/12?' },
      options: [
        { de: '11/12 > 13/12', ru: '11/12 больше' },
        { de: '11/12 < 13/12', ru: '13/12 больше' },
      ],
      correct: 1,
      hints: [
        'Знаменатели одинаковые, так что правило прежнее.',
        'Не смущайся, что 13/12 больше единицы — такие дроби бывают, они называются unechte Brüche.',
      ],
      solution:
        '11 < 13, значит 11/12 < 13/12. Вторая дробь больше целого: тринадцать двенадцатых — это чуть больше единицы.',
      source: { book: 'ah', page: 16, task: '2a' },
    },
    {
      id: 'vergleich-3-5-und-5-6',
      kind: 'choice',
      level: 'plus',
      prompt: { de: 'Setze < oder > ein: 3/5 □ 5/6', ru: 'Что больше: 3/5 или 5/6?' },
      options: [
        { de: '3/5 > 5/6', ru: '3/5 больше' },
        { de: '3/5 < 5/6', ru: '5/6 больше' },
      ],
      correct: 1,
      hints: ['kgV(5; 6) = 30. Расширь обе дроби до тридцатых.'],
      solution: '3/5 = 18/30, 5/6 = 25/30. Значит 3/5 < 5/6.',
      source: { book: 'ah', page: 16, task: '3a' },
    },
    {
      id: 'vergleich-12-16-und-4-5',
      kind: 'choice',
      level: 'plus',
      prompt: { de: 'Setze < oder > ein: 12/16 □ 4/5', ru: 'Что больше: 12/16 или 4/5?' },
      options: [
        { de: '12/16 > 4/5', ru: '12/16 больше' },
        { de: '12/16 < 4/5', ru: '4/5 больше' },
      ],
      correct: 1,
      hints: [
        'Сначала сократи первую дробь — с маленькими числами работать проще.',
        '12/16 = 3/4. Теперь сравни 3/4 и 4/5 через kgV(4; 5) = 20.',
      ],
      solution:
        '12/16 = 3/4 = 15/20, а 4/5 = 16/20. Значит 12/16 < 4/5. Сокращение перед сравнением экономит кучу времени.',
      source: { book: 'ah', page: 16, task: '3f' },
    },
    {
      id: 'vergleich-gemischt',
      kind: 'choice',
      level: 'plus',
      prompt: {
        de: 'Setze < oder > ein: 13/4 □ 27/9',
        ru: 'Что больше: 13/4 или 27/9?',
      },
      options: [
        { de: '13/4 > 27/9', ru: '13/4 больше' },
        { de: '13/4 < 27/9', ru: '27/9 больше' },
      ],
      correct: 0,
      hints: [
        'Тут проще не приводить к общему знаменателю, а посмотреть, сколько в каждой дроби целых.',
        '27/9 — это ровно 3. А 13/4 — это 3 и ещё одна четверть.',
      ],
      solution:
        '27/9 = 3, а 13/4 = 3 1/4. Значит 13/4 > 27/9. Иногда сравнить целые части быстрее, чем расширять дроби.',
      source: { book: 'ah', page: 16, task: '4d' },
    },
  ],
})
