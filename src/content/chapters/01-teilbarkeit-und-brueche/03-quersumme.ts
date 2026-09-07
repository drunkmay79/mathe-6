import { defineLesson } from '../../schema'

/**
 * Тема 3 главы: учебник S. 11-13, тетрадь S. 8-10.
 *
 * Признак делимости на 3 и на 9. В отличие от предыдущей темы, последней
 * цифры тут мало — смотреть надо на сумму всех цифр.
 */
export const lesson = defineLesson({
  id: 'quersumme',
  title: { de: 'Quersumme und Teilbarkeit', ru: 'Сумма цифр и делимость на 3 и 9' },
  summary:
    'На 3 и на 9 по последней цифре не угадаешь: 12 делится на 3, а 22 нет, хотя обе оканчиваются на двойку. Тут работает другой приём — сложить все цифры числа.',
  terms: ['quersumme', 'ziffer', 'teilbar', 'einerziffer'],
  source: { book: 'lb', page: 11 },

  phrases: [
    {
      de: 'Berechne die Quersumme.',
      ru: 'Вычисли сумму цифр.',
      note: 'Quersumme — сумма всех цифр числа. У 436 это 4 + 3 + 6 = 13.',
    },
    {
      de: 'Rechne im Kopf.',
      ru: 'Считай в уме.',
      note: 'Просят не расписывать столбиком.',
    },
    {
      de: 'Kreuze an, wenn du die Zahl durch 3 teilen kannst.',
      ru: 'Поставь галочку, если число делится на 3.',
    },
    {
      de: 'Bilde dreistellige Zahlen aus den Ziffern.',
      ru: 'Составь из этих цифр трёхзначные числа.',
      note: 'dreistellig — трёхзначное, из трёх цифр. Zweistellig — двузначное.',
    },
    {
      de: 'Finde alle Zahlen, die nicht durch 3 teilbar sind.',
      ru: 'Найди все числа, которые не делятся на 3.',
      note: 'nicht — «не». Легко пропустить и найти ровно наоборот.',
    },
    {
      de: 'Ergänze den Satz.',
      ru: 'Дополни предложение.',
    },
    {
      de: 'Was meinst du dazu?',
      ru: 'Что ты об этом думаешь?',
      note: 'Спрашивают твоё мнение о чужом решении — обычно там ошибка.',
    },
  ],

  theory: [
    {
      type: 'text',
      body: {
        de: 'Für die Teilbarkeit durch 3 und durch 9 hilft die Endziffer nicht. Hier zählt die Quersumme.',
        ru: 'С тройкой прошлый приём не работает. Смотри: 12 делится на 3, а 22 — нет, хотя обе оканчиваются на двойку. Значит последняя цифра тут ничего не решает, и нужен другой признак.',
      },
    },
    {
      type: 'playground',
      toy: 'quersumme-maschine',
      caption:
        'Собери любое число и смотри на лампочки. Верхняя пара говорит про сумму цифр, нижняя — про само число. Заметь: они всегда загораются вместе. Никогда не бывает так, чтобы сумма делилась на 3, а число нет. Это и есть правило.',
    },
    {
      type: 'rule',
      title: { de: 'Merke: Quersummen-Regel', ru: 'Запомни: правило суммы цифр' },
      body: {
        de: 'Addiert man alle Ziffern einer Zahl, dann heißt das Ergebnis Quersumme. Eine Zahl ist durch 3 teilbar, wenn ihre Quersumme durch 3 teilbar ist. Dasselbe gilt für die 9.',
        ru: 'Сложи все цифры числа — получится Quersumme. Если она делится на 3, то и само число делится на 3. То же самое с девяткой. Огромное число проверяется в уме за пару секунд.',
      },
      expr: '2517 \\rightarrow 2+5+1+7 = 15 \\rightarrow 15 : 3 = 5 \\rightarrow 2517 : 3 = 839',
    },
    {
      type: 'playground',
      toy: 'ziffern-mischer',
      caption:
        'Жми «Перемешать» сколько хочешь. Число каждый раз новое, а сумма цифр всё та же — цифры-то те же самые, просто в другом порядке. Поэтому и ответ про делимость на 3 не меняется. Хороший способ проверить себя: если переставила цифры и ответ изменился, где-то ошибка.',
    },
    {
      type: 'example',
      prompt: {
        de: 'Ist 3654 durch 9 teilbar?',
        ru: 'Делится ли 3654 на 9?',
      },
      steps: [
        {
          expr: '3 + 6 + 5 + 4 = 18',
          explain: 'Складываем все цифры. Получилось 18.',
        },
        {
          expr: '18 : 9 = 2',
          explain: '18 делится на 9 без остатка — значит и всё число делится на 9.',
        },
        {
          expr: '3654 : 9 = 406',
          explain: 'Проверка сходится. И заодно: раз делится на 9, то делится и на 3.',
        },
      ],
    },
    {
      type: 'playground',
      toy: 'quersumme-treppe',
      caption:
        'Если число большое и сумма цифр получилась тоже большой — сложи цифры ещё раз. И ещё, пока не останется одна цифра. Если в конце вышло 3, 6 или 9 — исходное число делится на 3. Возьми случайное число и проверь: работает всегда.',
    },
  ],

  exercises: [
    /* ------------------------------------------------- язык задания */
    {
      id: 'sprache-dreistellig',
      kind: 'choice',
      focus: 'sprache',
      prompt: {
        de: 'Bilde dreistellige Zahlen aus den Ziffern 1, 3 und 5.',
        ru: 'Какие числа просят составить?',
      },
      options: [
        { de: 'Zahlen aus drei Ziffern.', ru: 'Числа из трёх цифр: 135, 153, 315 …' },
        { de: 'Zahlen, die durch 3 teilbar sind.', ru: 'Числа, которые делятся на 3' },
        { de: 'Drei beliebige Zahlen.', ru: 'Любые три числа' },
      ],
      correct: 0,
      hints: ['drei — три, Stelle — разряд, место цифры.'],
      solution:
        'dreistellig — трёхзначное, то есть из трёх цифр. Про делимость тут ничего не сказано.',
    },
    {
      id: 'sprache-nicht',
      kind: 'choice',
      focus: 'sprache',
      prompt: {
        de: 'Finde alle Zahlen, die nicht durch 3 teilbar sind.',
        ru: 'Какие числа надо найти?',
      },
      options: [
        { de: 'Zahlen, die durch 3 teilbar sind.', ru: 'Которые делятся на 3' },
        { de: 'Zahlen, die nicht durch 3 teilbar sind.', ru: 'Которые НЕ делятся на 3' },
      ],
      correct: 1,
      hints: ['Всё решает одно короткое слово посередине.'],
      solution:
        'nicht переворачивает смысл задания. На таких «не» теряют баллы чаще всего — стоит подчёркивать это слово карандашом.',
    },

    /* ----------------------------------------------------- уровень ▽ */
    {
      id: 'quersumme-5436',
      kind: 'number',
      level: 'basis',
      prompt: { de: 'Berechne die Quersumme von 5436.', ru: 'Найди сумму цифр числа 5436.' },
      answer: 18,
      hints: ['Складывай по порядку: 5 + 4, потом прибавь 3, потом 6.'],
      solution: '5 + 4 + 3 + 6 = 18. Заодно: 18 делится на 3, значит и 5436 делится на 3.',
      source: { book: 'ah', page: 8, task: '1a' },
    },
    {
      id: 'quersumme-6390',
      kind: 'number',
      level: 'basis',
      prompt: { de: 'Berechne die Quersumme von 6390.', ru: 'Найди сумму цифр числа 6390.' },
      answer: 18,
      hints: ['Ноль ничего не добавляет, его можно просто пропустить.'],
      solution: '6 + 3 + 9 + 0 = 18.',
      source: { book: 'ah', page: 8, task: '1c' },
    },
    {
      id: 'quersumme-9387',
      kind: 'number',
      level: 'basis',
      prompt: { de: 'Berechne die Quersumme von 9387.', ru: 'Найди сумму цифр числа 9387.' },
      answer: 27,
      hints: ['9 + 3 = 12, дальше прибавляй по одной.'],
      solution: '9 + 3 + 8 + 7 = 27. Число делится и на 3, и на 9: 27 делится на оба.',
      source: { book: 'ah', page: 8, task: '1i' },
    },
    {
      id: 'durch-3-auswaehlen',
      kind: 'pick',
      level: 'basis',
      prompt: {
        de: 'Berechne die Quersumme. Kreuze an, welche Zahlen durch 3 teilbar sind.',
        ru: 'Отметь числа, которые делятся на 3.',
      },
      options: ['456', '275', '1623', '5701', '8046', '7145'],
      correct: [0, 2, 4],
      hints: [
        'Для каждого числа сначала сложи цифры.',
        'Суммы получаются такие: 15, 14, 12, 13, 18, 17. Какие из них делятся на 3?',
      ],
      solution:
        '456 → 15, 1623 → 12, 8046 → 18 — все три суммы делятся на 3. У остальных суммы 14, 13 и 17, они на 3 не делятся.',
      source: { book: 'ah', page: 8, task: '4' },
    },
    {
      id: 'nicht-durch-3',
      kind: 'pick',
      level: 'basis',
      prompt: {
        de: 'Finde alle Zahlen, die nicht durch 3 teilbar sind.',
        ru: 'Отметь числа, которые НЕ делятся на 3.',
      },
      options: ['456', '789', '123', '554', '990', '454'],
      correct: [3, 5],
      hints: [
        'Не забудь про «nicht»: отмечать надо те, что НЕ делятся.',
        'Суммы цифр: 15, 24, 6, 14, 18, 13.',
      ],
      solution: 'Не делятся 554 (сумма 14) и 454 (сумма 13). У остальных суммы делятся на 3.',
      source: { book: 'ah', page: 8, task: '5' },
    },
    {
      id: 'quersumme-9-bilden',
      kind: 'number',
      level: 'basis',
      prompt: {
        de: 'Bilde aus den Ziffern 1, 3 und 5 eine dreistellige Zahl mit der Quersumme 9.',
        ru: 'Составь из цифр 1, 3 и 5 трёхзначное число, у которого сумма цифр равна 9. Запиши любое.',
      },
      answer: 135,
      tolerance: 0,
      hints: [
        '1 + 3 + 5 = 9 — сумма подходит при любом порядке цифр.',
        'Впиши, например, самое маленькое из таких чисел.',
      ],
      solution:
        'Подходят все шесть: 135, 153, 315, 351, 513, 531. Порядок цифр на сумму не влияет — впиши 135.',
      source: { book: 'ah', page: 8, task: '2' },
    },

    /* ----------------------------------------------------- уровень ▷ */
    {
      id: 'quersumme-48285',
      kind: 'number',
      level: 'mittel',
      prompt: { de: 'Berechne die Quersumme von 48 285.', ru: 'Найди сумму цифр числа 48 285.' },
      answer: 27,
      hints: ['4 + 8 = 12, 12 + 2 = 14, дальше прибавь 8 и 5.'],
      solution: '4 + 8 + 2 + 8 + 5 = 27. Делится и на 3, и на 9.',
      source: { book: 'ah', page: 9, task: '1e' },
    },
    {
      id: 'quersumme-66166',
      kind: 'number',
      level: 'mittel',
      prompt: { de: 'Berechne die Quersumme von 66 166.', ru: 'Найди сумму цифр числа 66 166.' },
      answer: 25,
      hints: ['Четыре шестёрки и единица.'],
      solution: '6 + 6 + 1 + 6 + 6 = 25. На 3 не делится: 25 на 3 не делится.',
      source: { book: 'ah', page: 9, task: '1n' },
    },
    {
      id: 'durch-3-gross',
      kind: 'pick',
      level: 'mittel',
      prompt: {
        de: 'Kreuze an, welche der Zahlen durch 3 teilbar sind.',
        ru: 'Отметь числа, которые делятся на 3.',
      },
      options: ['3645', '7621', '58 971', '89 654', '67 143', '253 408'],
      correct: [0, 2, 4],
      hints: [
        'Сначала сумма цифр, потом проверка. Само число делить не нужно.',
        'Суммы: 18, 16, 30, 32, 21, 22.',
      ],
      solution: 'Делятся 3645 (18), 58 971 (30) и 67 143 (21). Остальные суммы на 3 не делятся.',
      source: { book: 'ah', page: 9, task: '3' },
    },
    {
      id: 'nicht-durch-3-gross',
      kind: 'pick',
      level: 'mittel',
      prompt: {
        de: 'Finde alle Zahlen, die nicht durch 3 teilbar sind.',
        ru: 'Отметь числа, которые НЕ делятся на 3.',
      },
      options: ['4626', '71 289', '6578', '91 920', '2461', '23 276'],
      correct: [2, 4, 5],
      hints: ['Суммы цифр: 18, 27, 26, 21, 13, 20.'],
      solution: 'Не делятся 6578 (26), 2461 (13) и 23 276 (20).',
      source: { book: 'ah', page: 9, task: '4' },
    },
    {
      id: 'quersumme-9-vierziffern',
      kind: 'pick',
      level: 'mittel',
      prompt: {
        de: 'Aus den Ziffern 4, 2, 3 und 1 sollen dreistellige Zahlen mit der Quersumme 9 gebildet werden. Welche passen?',
        ru: 'Из цифр 4, 2, 3 и 1 составляют трёхзначные числа с суммой цифр 9. Какие подходят?',
      },
      options: ['234', '124', '423', '341', '342', '213'],
      correct: [0, 2, 4],
      hints: [
        'Сумма 9 получается только из троек цифр 2, 3 и 4.',
        'Проверь каждое: 2 + 3 + 4 = 9, а 1 + 2 + 4 = 7.',
      ],
      solution:
        'Подходят 234, 423 и 342 — все составлены из 2, 3 и 4. В остальных участвует единица, и сумма выходит меньше 9.',
      source: { book: 'ah', page: 9, task: '2' },
    },

    /* ----------------------------------------------------- уровень ⋈ */
    {
      id: 'quersumme-6236478',
      kind: 'number',
      level: 'plus',
      prompt: {
        de: 'Berechne die Quersumme von 6 236 478.',
        ru: 'Найди сумму цифр числа 6 236 478.',
      },
      answer: 36,
      hints: ['Складывай парами, так проще: 6 + 2, 3 + 6, 4 + 7, потом 8.'],
      solution: '6 + 2 + 3 + 6 + 4 + 7 + 8 = 36. Делится и на 3, и на 9.',
      source: { book: 'ah', page: 10, task: '1k' },
    },
    {
      id: 'durch-3-und-9',
      kind: 'match',
      level: 'plus',
      prompt: {
        de: 'Berechne die Quersumme und kreuze an: durch 3 teilbar, durch 9 teilbar?',
        ru: 'Отметь для каждого числа, на что оно делится. Может подходить и то, и другое.',
      },
      left: [
        { id: 'a', label: '57 438' },
        { id: 'b', label: '69 267' },
        { id: 'c', label: '27 316' },
        { id: 'd', label: '87 975' },
      ],
      right: [
        { id: 'd3', label: 'на 3' },
        { id: 'd9', label: 'на 9' },
      ],
      pairs: [
        ['a', 'd3'],
        ['a', 'd9'],
        ['b', 'd3'],
        ['d', 'd3'],
        ['d', 'd9'],
      ],
      hints: [
        'Суммы цифр: 27, 30, 19 и 36.',
        'Если сумма делится на 9, она обязательно делится и на 3 — значит отмечать надо оба.',
      ],
      solution:
        '57 438 → 27: на 3 и на 9. 69 267 → 30: только на 3. 27 316 → 19: ни на что. 87 975 → 36: на 3 и на 9.',
      source: { book: 'ah', page: 10, task: '2' },
    },
    {
      id: 'durch-9-also-durch-3',
      kind: 'choice',
      level: 'plus',
      prompt: {
        de: 'Ergänze den Satz: Wenn eine Zahl durch 9 teilbar ist, dann ist sie …',
        ru: 'Дополни: если число делится на 9, то оно …',
      },
      options: [
        { de: '… auch durch 3 teilbar.', ru: '… делится и на 3' },
        { de: '… auch durch 2 teilbar.', ru: '… делится и на 2' },
        { de: '… nicht durch 3 teilbar.', ru: '… не делится на 3' },
      ],
      correct: 0,
      hints: [
        'Посмотри на предыдущее задание: там у чисел, делящихся на 9, всегда стояла и галочка «на 3».',
        'Подумай, почему: девятка сама делится на три.',
      ],
      solution:
        'Девятка состоит из трёх троек. Значит всё, что делится на 9, разбивается и на тройки. Обратное неверно: 6 делится на 3, но не на 9.',
      source: { book: 'ah', page: 10, task: '3' },
    },
    {
      id: 'jana-fehler',
      kind: 'open',
      level: 'plus',
      prompt: {
        de: 'Jana hat die Zahl 15 642 auf Teilbarkeit durch 3 untersucht. Sie schreibt: «Quersumme: 18. Ja, die Zahl ist durch 3 teilbar. Probe: 15 642 : 3 = 521 Rest 2. Das stimmt nicht!» Was meinst du dazu?',
        ru: 'Яна проверяла, делится ли 15 642 на 3. Она написала: «Сумма цифр 18. Да, число делится на 3. Проверка: 15 642 : 3 = 521 и остаток 2. Что-то не сходится!» Что ты об этом думаешь?',
      },
      reference:
        'Сумма цифр посчитана правильно: 1 + 5 + 6 + 4 + 2 = 18, и вывод про делимость на 3 верный. Ошибка в проверке — Яна просто неправильно поделила. На самом деле 15 642 : 3 = 5214, и это легко проверить обратно: 5214 · 3 = 15 642. Так что правило работает, подвело деление в столбик.',
      referenceDe:
        'Die Quersumme ist richtig berechnet. Sie hat die Probe falsch gerechnet: 15 642 : 3 = 5214, denn 5214 · 3 = 15 642.',
      hints: [
        'Сначала проверь саму сумму цифр — она посчитана верно?',
        'Теперь посмотри на её деление. Число 521 — это вообще похоже на треть от 15 642?',
      ],
      source: { book: 'ah', page: 10, task: '4a' },
    },
    {
      id: 'jana-weitere-teiler',
      kind: 'pick',
      level: 'plus',
      prompt: {
        de: 'Durch welche 2 Zahlen kann Jana die Zahl 15 642 noch teilen? Begründe.',
        ru: 'На что ещё, кроме 3, делится число 15 642? Отметь два варианта.',
      },
      options: ['на 2', 'на 5', 'на 9', 'на 10'],
      correct: [0, 2],
      hints: [
        'Посмотри на последнюю цифру — что она разрешает?',
        'Сумма цифр 18. На что делится 18, кроме тройки?',
      ],
      solution:
        'Последняя цифра 2 — значит число делится на 2. Сумма цифр 18 делится на 9 — значит и число делится на 9. На 5 и на 10 не делится: для них нужен 0 или 5 в конце.',
      source: { book: 'ah', page: 10, task: '4b' },
    },
  ],
})
