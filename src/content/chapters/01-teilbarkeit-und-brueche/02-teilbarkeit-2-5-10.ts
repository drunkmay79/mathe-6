import { defineLesson } from '../../schema'

/**
 * Тема 2 главы: учебник S. 11-13, тетрадь S. 5-7.
 *
 * Первое правило, которое экономит время: чтобы узнать, делится ли число
 * на 2, 5 или 10, смотреть надо только на последнюю цифру. Всё остальное
 * число не важно вообще — и это самое сильное место темы.
 */
export const lesson = defineLesson({
  id: 'teilbarkeit-2-5-10',
  title: { de: 'Teilbarkeit durch 2, 5 und 10', ru: 'Делимость на 2, 5 и 10' },
  summary:
    'Чтобы понять, делится ли число на 2, 5 или 10, делить его не нужно. Достаточно посмотреть на последнюю цифру — остальное число можно закрыть рукой. Работает даже для огромных чисел.',
  terms: ['teilbar', 'einerziffer', 'ziffer', 'gerade', 'ungerade', 'teiler'],
  source: { book: 'lb', page: 11 },

  phrases: [
    {
      de: 'Markiere die Einerziffer der Zahl.',
      ru: 'Отметь последнюю цифру числа.',
      note: 'Einerziffer — цифра в разряде единиц, то есть самая последняя.',
    },
    {
      de: 'Kreuze in den Spalten an.',
      ru: 'Поставь крестик в нужных столбцах.',
      note: 'Spalte — столбец таблицы. Zeile — строка.',
    },
    {
      de: 'Verbinde die Zahlen mit ihren Teilern.',
      ru: 'Соедини числа с их делителями.',
    },
    {
      de: 'Färbe alle Kästchen, in denen … stehen.',
      ru: 'Закрась все клетки, в которых стоят …',
      note: 'Kästchen — клеточка. Färben — красить.',
    },
    {
      de: 'Ist die Zahl durch 5 teilbar?',
      ru: 'Делится ли число на 5?',
    },
    {
      de: 'Bilde alle möglichen Zahlen.',
      ru: 'Составь все возможные числа.',
      note: 'Bilden — образовывать, составлять. Просят перебрать все варианты.',
    },
    {
      de: 'Kreuze an, ob die Aussage wahr oder falsch ist.',
      ru: 'Отметь, верно утверждение или нет.',
      note: 'die Aussage — утверждение, wahr — правда, falsch — неправда.',
    },
  ],

  theory: [
    {
      type: 'text',
      body: {
        de: 'Teilbarkeit durch 2, 5 oder 10 kannst du an der Einerziffer der Zahl erkennen.',
        ru: 'Смотри, какая тут экономия. Чтобы проверить, делится ли 3 748 926 на 2, делить ничего не надо — достаточно взглянуть на последнюю цифру. Всё остальное число можно закрыть рукой.',
      },
    },
    {
      type: 'playground',
      toy: 'endziffer-lampen',
      caption:
        'Меняй последнюю цифру и смотри на лампочки. Первые две цифры всё время одни и те же — а ответ меняется. Значит решает только последняя цифра, и правило можно просто запомнить.',
    },
    {
      type: 'rule',
      title: { de: 'Merke: Endziffern-Regeln', ru: 'Запомни: правило последней цифры' },
      body: {
        de: 'Eine Zahl ist durch 2 teilbar, wenn die letzte Ziffer eine 0, 2, 4, 6 oder 8 ist. Eine Zahl ist durch 5 teilbar, wenn die letzte Ziffer eine 0 oder 5 ist. Eine Zahl ist durch 10 teilbar, wenn die letzte Ziffer eine 0 ist.',
        ru: 'На 2 — если последняя цифра 0, 2, 4, 6 или 8. На 5 — если 0 или 5. На 10 — только если 0. Обрати внимание: ноль в конце подходит сразу под все три.',
      },
      expr: '\\text{Endziffer } 0,2,4,6,8 \\rightarrow :2 \\qquad 0,5 \\rightarrow :5 \\qquad 0 \\rightarrow :10',
    },
    {
      type: 'playground',
      toy: 'gerade-paare',
      caption:
        'Делимость на 2 — это про то, получится ли разбиться на пары без остатка. Прибавляй и убавляй точки: при чётном числе пары складываются ровно, при нечётном одна точка всегда остаётся лишней. Такие числа называют gerade и ungerade.',
    },
    {
      type: 'playground',
      toy: 'zahlen-sieb',
      caption:
        'А это вид сверху. Включи «делится на 2» — подсветятся все чётные, и видно, что они идут через одну. Включи вместе «на 2» и «на 5» — останутся только числа, оканчивающиеся нулём. Это и есть ответ на вопрос, почему такие числа всегда делятся на 10.',
    },
    {
      type: 'example',
      prompt: {
        de: 'Ist die Zahl durch 2, durch 5 oder durch 10 teilbar?',
        ru: 'Делится ли число на 2, на 5, на 10?',
      },
      steps: [
        {
          expr: '736 \\rightarrow \\text{Endziffer } 6',
          explain:
            'Последняя цифра 6 — она есть в списке для двойки. Значит 736 делится на 2. На 5 и на 10 не делится: там нужен 0 или 5.',
        },
        {
          expr: '5245 \\rightarrow \\text{Endziffer } 5',
          explain: 'Пятёрка в конце — делится на 5. На 2 не делится: 5 нечётная.',
        },
        {
          expr: '8370 \\rightarrow \\text{Endziffer } 0',
          explain:
            'Ноль в конце — делится сразу на 2, на 5 и на 10. Так всегда: ноль в конце даёт все три.',
        },
      ],
    },
  ],

  exercises: [
    /* ------------------------------------------------- язык задания */
    {
      id: 'sprache-einerziffer',
      kind: 'choice',
      focus: 'sprache',
      prompt: {
        de: 'Markiere die Einerziffer der Zahl 4 073.',
        ru: 'Какую цифру просят отметить?',
      },
      options: [
        { de: 'die 4', ru: 'четвёрку — она первая' },
        { de: 'die 3', ru: 'тройку — она последняя' },
        { de: 'die 0', ru: 'ноль — он в середине' },
      ],
      correct: 1,
      hints: ['Einer — единицы. В каком разряде стоят единицы?'],
      solution: 'Einerziffer — цифра единиц, то есть самая последняя. У числа 4 073 это 3.',
    },
    {
      id: 'sprache-faerbe',
      kind: 'choice',
      focus: 'sprache',
      prompt: {
        de: 'Färbe alle Kästchen, in denen gerade Zahlen stehen.',
        ru: 'Что нужно сделать?',
      },
      options: [
        { de: 'Alle Kästchen färben.', ru: 'Закрасить все клетки подряд' },
        {
          de: 'Nur Kästchen mit geraden Zahlen färben.',
          ru: 'Закрасить только клетки с чётными числами',
        },
        { de: 'Die Zahlen aufschreiben.', ru: 'Выписать числа в тетрадь' },
      ],
      correct: 1,
      hints: ['in denen … stehen — «в которых стоят». Значит красить надо не все.'],
      solution:
        'Färbe … in denen gerade Zahlen stehen — закрась те клетки, где стоят чётные числа.',
    },

    /* ----------------------------------------------------- уровень ▽ */
    {
      id: 'tabelle-2-5-10',
      kind: 'match',
      level: 'basis',
      prompt: {
        de: 'Kreuze an: Wodurch ist die Zahl teilbar?',
        ru: 'Отметь, на что делится каждое число. У числа может подходить сразу несколько.',
      },
      left: [
        { id: 'n12', label: '12' },
        { id: 'n55', label: '55' },
        { id: 'n300', label: '300' },
        { id: 'n178', label: '178' },
      ],
      right: [
        { id: 'd2', label: 'на 2' },
        { id: 'd5', label: 'на 5' },
        { id: 'd10', label: 'на 10' },
      ],
      pairs: [
        ['n12', 'd2'],
        ['n55', 'd5'],
        ['n300', 'd2'],
        ['n300', 'd5'],
        ['n300', 'd10'],
        ['n178', 'd2'],
      ],
      hints: [
        'Смотри только на последнюю цифру каждого числа.',
        'У 300 последняя цифра 0 — а ноль подходит сразу под все три правила.',
      ],
      solution:
        '12 → на 2 (последняя 2). 55 → на 5. 300 → на 2, на 5 и на 10, потому что оканчивается нулём. 178 → на 2 (последняя 8).',
      source: { book: 'ah', page: 5, task: '1' },
    },
    {
      id: 'ballons-platzen',
      kind: 'pick',
      level: 'basis',
      prompt: {
        de: 'Lass die Luftballons platzen, deren Zahlen nicht durch 2, durch 5 oder durch 10 teilbar sind.',
        ru: 'Лопни шарики: отметь числа, которые не делятся ни на 2, ни на 5, ни на 10.',
      },
      options: ['23', '88', '57', '245', '16', '69', '636', '291'],
      correct: [0, 2, 5, 7],
      hints: [
        'Число не делится ни на 2, ни на 5, ни на 10, если последняя цифра — нечётная и не 5.',
        'То есть подходят числа, оканчивающиеся на 1, 3, 7 или 9.',
      ],
      solution:
        'Лопаются 23, 57, 69 и 291: они оканчиваются на 3, 7, 9 и 1. Остальные делятся хотя бы на что-то одно.',
      source: { book: 'ah', page: 5, task: '3' },
    },
    {
      id: 'faerbe-durch-10',
      kind: 'pick',
      level: 'basis',
      prompt: {
        de: 'Färbe alle Kästchen mit Zahlen, die durch 2, durch 5 und durch 10 teilbar sind.',
        ru: 'Отметь числа, которые делятся сразу и на 2, и на 5, и на 10.',
      },
      options: ['805', '120', '800', '531', '770', '635', '80', '99'],
      correct: [1, 2, 4, 6],
      hints: ['Сразу на все три делятся только числа с одной определённой последней цифрой.'],
      solution:
        'Подходят 120, 800, 770 и 80 — все оканчиваются нулём. Это и есть находка задания: делится на 2 и на 5 одновременно ровно то, что делится на 10.',
      source: { book: 'ah', page: 5, task: '4' },
    },
    {
      id: 'ist-45-durch-5',
      kind: 'choice',
      level: 'basis',
      prompt: {
        de: 'Ist 45 durch 5 teilbar? Begründe.',
        ru: 'Делится ли 45 на 5?',
      },
      options: [
        { de: 'Ja, die letzte Ziffer ist eine 5.', ru: 'Да, последняя цифра 5' },
        { de: 'Nein, 45 ist ungerade.', ru: 'Нет, 45 нечётное' },
      ],
      correct: 0,
      hints: ['Нечётность мешает делению на 2, а не на 5.'],
      solution:
        'Да: последняя цифра 5. То, что число нечётное, для пятёрки роли не играет — это разные правила.',
      source: { book: 'lb', page: 12 },
    },

    /* ----------------------------------------------------- уровень ▷ */
    {
      id: 'tabelle-154-260-315',
      kind: 'match',
      level: 'mittel',
      prompt: {
        de: 'Markiere die Einerziffer und kreuze an, wodurch die Zahl teilbar ist.',
        ru: 'Отметь, на что делится каждое число.',
      },
      left: [
        { id: 'n154', label: '154' },
        { id: 'n260', label: '260' },
        { id: 'n315', label: '315' },
      ],
      right: [
        { id: 'd2', label: 'на 2' },
        { id: 'd5', label: 'на 5' },
        { id: 'd10', label: 'на 10' },
      ],
      pairs: [
        ['n154', 'd2'],
        ['n260', 'd2'],
        ['n260', 'd5'],
        ['n260', 'd10'],
        ['n315', 'd5'],
      ],
      hints: ['Последние цифры: 4, 0 и 5.'],
      solution: '154 → на 2. 260 → на 2, 5 и 10. 315 → только на 5.',
      source: { book: 'ah', page: 6, task: '1' },
    },
    {
      id: 'verbinde-teiler-mittel',
      kind: 'match',
      level: 'mittel',
      prompt: {
        de: 'Verbinde die Zahlen mit ihren Teilern.',
        ru: 'Соедини числа с их делителями. У некоторых чисел подходящих делителей нет совсем.',
      },
      left: [
        { id: 'n245', label: '245' },
        { id: 'n396', label: '396' },
        { id: 'n470', label: '470' },
        { id: 'n421', label: '421' },
      ],
      right: [
        { id: 'd2', label: 'на 2' },
        { id: 'd5', label: 'на 5' },
        { id: 'd10', label: 'на 10' },
      ],
      pairs: [
        ['n245', 'd5'],
        ['n396', 'd2'],
        ['n470', 'd2'],
        ['n470', 'd5'],
        ['n470', 'd10'],
      ],
      hints: [
        'У 421 последняя цифра 1 — она не подходит ни под одно из трёх правил.',
        'Не бойся оставить строку пустой: в задании прямо сказано, что так бывает.',
      ],
      solution: '245 → на 5. 396 → на 2. 470 → на 2, 5 и 10. У 421 связей нет.',
      source: { book: 'ah', page: 6, task: '2' },
    },
    {
      id: 'einerziffern-ungerade',
      kind: 'set',
      level: 'mittel',
      prompt: {
        de: 'Notiere die Einerziffern von ungeraden Zahlen.',
        ru: 'Выпиши все последние цифры, которые бывают у нечётных чисел.',
      },
      values: [1, 3, 5, 7, 9],
      hints: ['Чётные оканчиваются на 0, 2, 4, 6, 8. Какие цифры остались?'],
      solution:
        'Нечётные оканчиваются на 1, 3, 5, 7 или 9 — это ровно те цифры, которых нет у чётных.',
      source: { book: 'ah', page: 6, task: '4a' },
    },
    {
      id: 'gerade-ungerade-sortieren',
      kind: 'match',
      level: 'mittel',
      prompt: {
        de: 'Verbinde passende Kästchen: gerade Zahl oder ungerade Zahl?',
        ru: 'Разложи числа: чётное или нечётное?',
      },
      left: [
        { id: 'n1347', label: '1347' },
        { id: 'n3404', label: '3404' },
        { id: 'n2653', label: '2653' },
        { id: 'n8030', label: '8030' },
      ],
      right: [
        { id: 'g', label: 'gerade' },
        { id: 'u', label: 'ungerade' },
      ],
      pairs: [
        ['n1347', 'u'],
        ['n3404', 'g'],
        ['n2653', 'u'],
        ['n8030', 'g'],
      ],
      hints: ['Смотри только на последнюю цифру, длина числа ничего не меняет.'],
      solution: '1347 и 2653 оканчиваются на 7 и 3 — нечётные. 3404 и 8030 — чётные.',
      source: { book: 'ah', page: 6, task: '4b' },
    },
    {
      id: 'clara-fehler',
      kind: 'pick',
      level: 'mittel',
      prompt: {
        de: 'Clara hat diese Luftballons durchgekreuzt, weil sie angeblich nicht durch 2, 5 oder 10 teilbar sind. Welche hat sie falsch durchgekreuzt?',
        ru: 'Клара зачеркнула эти шарики, решив, что они не делятся ни на 2, ни на 5, ни на 10. Отметь те, которые она зачеркнула зря.',
      },
      options: ['853', '655', '981', '786', '677'],
      correct: [1, 3],
      hints: [
        'Проверь каждое число сама, по последней цифре.',
        'Число 655 оканчивается на 5, а 786 — на 6. Оба на что-то делятся.',
      ],
      solution:
        'Зря зачёркнуты 655 (делится на 5) и 786 (делится на 2). Остальные — 853, 981, 677 — действительно не делятся ни на что из трёх.',
      source: { book: 'ah', page: 6, task: '3' },
    },

    /* ----------------------------------------------------- уровень ⋈ */
    {
      id: 'gerade-und-durch-5',
      kind: 'choice',
      level: 'plus',
      prompt: {
        de: 'Ist eine Zahl durch 2 und auch durch 5 teilbar, dann ist an der Einerstelle die Ziffer …',
        ru: 'Если число делится и на 2, и на 5 — какая цифра стоит у него в конце?',
      },
      options: [
        { de: 'die Ziffer 5', ru: 'пятёрка' },
        { de: 'die Ziffer 0', ru: 'ноль' },
        { de: 'eine gerade Ziffer', ru: 'любая чётная цифра' },
      ],
      correct: 1,
      hints: [
        'Для двойки нужна цифра 0, 2, 4, 6 или 8. Для пятёрки — 0 или 5.',
        'Какая цифра есть в обоих списках?',
      ],
      solution:
        'Только ноль встречается в обоих правилах. Поэтому число, делящееся и на 2, и на 5, всегда делится и на 10.',
      source: { book: 'ah', page: 7, task: '1' },
    },
    {
      id: 'ziffernkaertchen-durch-2',
      kind: 'number',
      level: 'plus',
      prompt: {
        de: 'Du hast die Ziffernkärtchen 3, 0, 7 und 4. Bilde mit allen vier Kärtchen alle möglichen Zahlen, die durch 2 teilbar sind. Wie viele sind es?',
        ru: 'У тебя карточки с цифрами 3, 0, 7 и 4. Составь из всех четырёх все числа, которые делятся на 2. Сколько их получилось?',
      },
      answer: 10,
      hints: [
        'Число делится на 2, если в конце стоит 0 или 4. Больше чётных цифр среди карточек нет.',
        'Если в конце 0, оставшиеся три цифры можно переставить 6 способами. Если в конце 4, ноль нельзя ставить в начало — вариантов останется 4.',
      ],
      solution:
        'С нулём в конце: 6 вариантов. С четвёркой в конце: 6 перестановок минус 2, где ноль оказался бы первым, — остаётся 4. Всего 10.',
      source: { book: 'ah', page: 7, task: '2a' },
    },
    {
      id: 'ziffernkaertchen-durch-5',
      kind: 'number',
      level: 'plus',
      prompt: {
        de: 'Bilde mit denselben Kärtchen 3, 0, 7 und 4 alle Zahlen, die durch 5 teilbar sind. Wie viele sind es?',
        ru: 'Из тех же карточек 3, 0, 7 и 4 составь все числа, которые делятся на 5. Сколько их?',
      },
      answer: 6,
      hints: [
        'Для делимости на 5 в конце должен стоять 0 или 5. Пятёрки среди карточек нет.',
        'Значит в конце обязательно ноль, а три оставшиеся цифры переставляются свободно.',
      ],
      solution: 'В конце всегда 0, остальные три цифры дают 3 · 2 · 1 = 6 вариантов.',
      source: { book: 'ah', page: 7, task: '2b' },
    },
    {
      id: 'durch-4-gerade',
      kind: 'open',
      level: 'plus',
      prompt: {
        de: 'Eine Zahl ist durch 4 teilbar. Ist sie auch gerade? Begründe.',
        ru: 'Число делится на 4. Обязательно ли оно чётное? Обоснуй.',
      },
      reference:
        'Да, обязательно. Если число делится на 4, его можно разложить на группы по 4. А каждую четвёрку легко разбить на две пары — значит и всё число разбивается на пары без остатка. А это и есть чётность.',
      referenceDe: 'Ja, sie ist eine gerade Zahl, denn sie ist auch durch 2 teilbar.',
      hints: [
        'Попробуй на примерах: 12, 20, 36 — все делятся на 4. Есть среди них нечётные?',
        'Подумай, что такое «делится на 4»: это группы по четыре. А четыре — это две пары.',
      ],
      source: { book: 'ah', page: 7, task: '3a' },
    },
    {
      id: 'aussagen-teilbarkeit',
      kind: 'truefalse',
      level: 'plus',
      prompt: {
        de: 'Kreuze an, ob die Aussage jeweils wahr oder falsch ist.',
        ru: 'Отметь, верно каждое утверждение или нет.',
      },
      statements: [
        {
          de: 'Wenn eine Zahl durch 10 teilbar ist, dann ist sie auch durch 2 und 5 teilbar.',
          ru: 'Если число делится на 10, то оно делится и на 2, и на 5.',
          correct: true,
          why: 'В конце стоит ноль, а он подходит под все три правила.',
        },
        {
          de: 'Wenn eine Zahl gerade ist, dann ist sie auch durch 4 teilbar.',
          ru: 'Если число чётное, то оно делится и на 4.',
          correct: false,
          why: 'Например 6 или 10: чётные, но на 4 не делятся.',
        },
        {
          de: 'Wenn eine Zahl durch 4 teilbar ist, kann sie die Einerstelle 0 haben.',
          ru: 'Число, делящееся на 4, может оканчиваться нулём.',
          correct: true,
          why: 'Например 20 или 40 — оба делятся на 4.',
        },
        {
          de: 'Wenn eine Zahl durch 5 teilbar ist, dann ist sie auch durch 10 teilbar.',
          ru: 'Если число делится на 5, то оно делится и на 10.',
          correct: false,
          why: 'Например 25 или 35: делятся на 5, а на 10 нет.',
        },
      ],
      hints: [
        'На каждое утверждение попробуй найти пример, который его опровергает.',
        'Одного контрпримера достаточно, чтобы утверждение было falsch.',
      ],
      solution:
        'Верны первое и третье. Полезное правило: чтобы опровергнуть утверждение, хватает одного примера, а чтобы доказать — нужно рассуждение.',
      source: { book: 'ah', page: 7, task: '4' },
    },
  ],
})
