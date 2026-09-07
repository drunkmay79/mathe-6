import { defineLesson } from '../../schema'

/**
 * Тема 5 главы: учебник S. 17-19, тетрадь S. 11-13.
 *
 * Главная мысль темы: величина не меняется, меняется только запись.
 * Отсюда и два действия — kürzen (числа мельче) и erweitern (числа крупнее).
 */
export const lesson = defineLesson({
  id: 'kuerzen-erweitern',
  title: { de: 'Brüche kürzen und erweitern', ru: 'Сокращение и расширение дробей' },
  summary:
    'Одну и ту же величину можно записать разными дробями: 1/2, 2/4, 5/10 — это одно и то же. Сокращать значит делить числитель и знаменатель на одно число, расширять — умножать. Величина при этом не меняется никогда.',
  terms: ['kuerzen', 'erweitern', 'kuerzungszahl', 'erweiterungszahl', 'zaehler', 'nenner', 'ggt'],
  source: { book: 'lb', page: 17 },

  phrases: [
    {
      de: 'Kürze so weit wie möglich.',
      ru: 'Сократи как можно сильнее.',
      note: 'so weit wie möglich — «насколько возможно». Одного шага обычно мало.',
    },
    {
      de: 'Erweitere den Bruch auf den Nenner 20.',
      ru: 'Расширь дробь до знаменателя 20.',
      note: 'auf den Nenner … — до знаменателя такого-то. Знаменатель задан заранее.',
    },
    {
      de: 'Beschrifte die Pfeile mit der Kürzungszahl.',
      ru: 'Подпиши стрелки числом, на которое сокращали.',
      note: 'die Kürzungszahl — то число, на которое поделили. Erweiterungszahl — на которое умножили.',
    },
    {
      de: 'Mit welcher Zahl wurde gekürzt?',
      ru: 'На какое число сократили?',
    },
    {
      de: 'Kreuze an, ob gekürzt oder erweitert wurde.',
      ru: 'Отметь, сокращали или расширяли.',
    },
    {
      de: 'Notiere die beiden Brüche.',
      ru: 'Запиши обе дроби.',
    },
  ],

  theory: [
    {
      type: 'text',
      body: {
        de: 'Der Wert des Bruches bleibt beim Erweitern und Kürzen gleich.',
        ru: 'Половина пиццы не станет больше, если разрезать её на восемь кусков вместо двух. Кусков больше, а еды столько же. Ровно это и происходит с дробью, когда её сокращают или расширяют: меняются числа, величина остаётся.',
      },
    },
    {
      type: 'playground',
      toy: 'kuerzen-schieber',
      caption:
        'Выбери дробь и умножай её. Верхняя полоска не меняется вообще, нижняя нарезается всё мельче — но закрашенная часть остаётся той же длины. Числа растут, величина стоит на месте.',
    },
    {
      type: 'rule',
      title: { de: 'Merke: Erweitern', ru: 'Запомни: расширение' },
      body: {
        de: 'Erweitern: Zähler und Nenner werden mit derselben Zahl multipliziert.',
        ru: 'Расширить — умножить и числитель, и знаменатель на одно и то же число. Число это называется Erweiterungszahl. Главное слово тут «оба»: умножить только сверху нельзя.',
      },
      expr: '\\frac{3}{4} = \\frac{3 \\cdot 5}{4 \\cdot 5} = \\frac{15}{20}',
    },
    {
      type: 'rule',
      title: { de: 'Merke: Kürzen', ru: 'Запомни: сокращение' },
      body: {
        de: 'Kürzen: Zähler und Nenner werden durch dieselbe Zahl dividiert.',
        ru: 'Сократить — поделить и числитель, и знаменатель на одно число, Kürzungszahl. Получится, только если оба делятся на него без остатка.',
      },
      expr: '\\frac{6}{8} = \\frac{6 : 2}{8 : 2} = \\frac{3}{4}',
    },
    {
      type: 'playground',
      toy: 'bruch-zoom',
      caption:
        'Тут видно, что это одно действие в две стороны. Режешь каждую часть пополам — это erweitern, числа удваиваются. Склеиваешь по две — это kürzen, числа уменьшаются. Закрашенная часть полоски не шелохнулась ни разу.',
    },
    {
      type: 'example',
      prompt: {
        de: 'Kürze den Bruch 18/24 so weit wie möglich.',
        ru: 'Сократи дробь 18/24 как можно сильнее.',
      },
      steps: [
        {
          expr: '\\frac{18 : 2}{24 : 2} = \\frac{9}{12}',
          explain: 'Можно шагами. Оба числа чётные — делим на 2.',
        },
        {
          expr: '\\frac{9 : 3}{12 : 3} = \\frac{3}{4}',
          explain: 'Теперь оба делятся на 3. Получилось 3/4.',
        },
        {
          expr: '\\text{ggT}(18; 24) = 6 \\rightarrow \\frac{18 : 6}{24 : 6} = \\frac{3}{4}',
          explain:
            'А можно сразу: наибольший общий делитель 18 и 24 равен 6. Вот зачем в первой теме нужен был ggT — он сокращает дробь за один шаг.',
        },
      ],
    },
    {
      type: 'playground',
      toy: 'kuerzen-jagd',
      caption:
        'Попробуй сократить 18/24 сама. Кнопки, на которые делится только одно из двух чисел, не нажимаются — это и есть главное правило: делить надо оба сразу. Дойди до зелёной лампочки двумя способами: мелкими шагами и сразу на 6.',
    },
  ],

  exercises: [
    /* ------------------------------------------------- язык задания */
    {
      id: 'sprache-so-weit-wie-moeglich',
      kind: 'choice',
      focus: 'sprache',
      prompt: { de: 'Kürze so weit wie möglich.', ru: 'Что значит это задание?' },
      options: [
        { de: 'Einmal kürzen reicht.', ru: 'Сократить один раз и остановиться' },
        { de: 'Kürzen, bis es nicht mehr geht.', ru: 'Сокращать, пока это вообще возможно' },
      ],
      correct: 1,
      hints: ['möglich — возможно. so weit wie möglich — «настолько, насколько возможно».'],
      solution:
        'Сокращать надо до конца. Ответ 6/8 на такое задание не засчитают, даже если исходная дробь была 12/16.',
    },
    {
      id: 'sprache-auf-den-nenner',
      kind: 'choice',
      focus: 'sprache',
      prompt: { de: 'Erweitere 2/5 auf den Nenner 20.', ru: 'Каким должен быть ответ?' },
      options: [
        { de: '2/5', ru: '2/5 — это же то же самое число' },
        { de: '8/20', ru: '8/20' },
        { de: '20/5', ru: '20/5' },
      ],
      correct: 1,
      hints: ['auf den Nenner 20 — знаменатель в ответе должен быть ровно 20.'],
      solution:
        '20 : 5 = 4, значит умножаем оба числа на 4: получается 8/20. Написать 2/5 нельзя — задание просило другую запись того же числа.',
    },

    /* ----------------------------------------------------- уровень ▽ */
    {
      id: 'kuerze-4-6',
      kind: 'fraction',
      level: 'basis',
      prompt: { de: 'Kürze so weit wie möglich.', ru: 'Сократи дробь до конца.' },
      expr: '\\frac{4}{6}',
      numerator: 2,
      denominator: 3,
      requireReduced: true,
      hints: ['Оба числа чётные — на что их можно поделить?'],
      solution: '4 : 2 = 2, 6 : 2 = 3. Получается 2/3, дальше не сокращается.',
      source: { book: 'ah', page: 11, task: '1a' },
    },
    {
      id: 'kuerze-6-9',
      kind: 'fraction',
      level: 'basis',
      prompt: { de: 'Kürze so weit wie möglich.', ru: 'Сократи дробь до конца.' },
      expr: '\\frac{6}{9}',
      numerator: 2,
      denominator: 3,
      requireReduced: true,
      hints: ['На 2 не выйдет: 9 нечётное. Попробуй 3.'],
      solution: '6 : 3 = 2, 9 : 3 = 3. Снова 2/3 — эта дробь встречается очень часто.',
      source: { book: 'ah', page: 11, task: '1c' },
    },
    {
      id: 'kuerzungszahl-6-8',
      kind: 'number',
      level: 'basis',
      prompt: {
        de: 'Aus 6/8 wurde 3/4. Mit welcher Zahl wurde gekürzt?',
        ru: 'Из 6/8 получилось 3/4. На какое число сократили?',
      },
      answer: 2,
      hints: ['Во сколько раз уменьшился числитель: с 6 до 3?'],
      solution: '6 : 2 = 3 и 8 : 2 = 4 — сокращали на 2. Это и есть Kürzungszahl.',
      source: { book: 'ah', page: 11, task: '2a' },
    },
    {
      id: 'erweitere-1-4',
      kind: 'fraction',
      level: 'basis',
      prompt: {
        de: 'Erweitere den Bruch mit 4.',
        ru: 'Расширь дробь, умножив на 4.',
      },
      expr: '\\frac{1}{4}',
      numerator: 4,
      denominator: 16,
      requireExact: true,
      hints: ['Умножай оба числа: и верхнее, и нижнее.'],
      solution: '1 · 4 = 4, 4 · 4 = 16. Получается 4/16 — то же самое число, записанное иначе.',
      source: { book: 'ah', page: 11, task: '3a' },
    },
    {
      id: 'erweitere-3-4',
      kind: 'fraction',
      level: 'basis',
      prompt: { de: 'Erweitere den Bruch mit 3.', ru: 'Расширь дробь, умножив на 3.' },
      expr: '\\frac{3}{4}',
      numerator: 9,
      denominator: 12,
      requireExact: true,
      hints: ['3 · 3 = 9, а что станет со знаменателем?'],
      solution: '3 · 3 = 9 и 4 · 3 = 12. Ответ 9/12.',
      source: { book: 'ah', page: 11, task: '3b' },
    },
    {
      id: 'gekuerzt-oder-erweitert',
      kind: 'choice',
      level: 'basis',
      prompt: {
        de: 'Aus 8/10 wurde 4/5. Wurde gekürzt oder erweitert?',
        ru: 'Из 8/10 получилось 4/5. Сокращали или расширяли?',
      },
      options: [
        { de: 'gekürzt', ru: 'сокращали — числа стали меньше' },
        { de: 'erweitert', ru: 'расширяли — числа стали больше' },
      ],
      correct: 0,
      hints: ['Посмотри, числа стали крупнее или мельче.'],
      solution: 'Числа уменьшились вдвое — значит делили, то есть сокращали. Kürzungszahl здесь 2.',
      source: { book: 'ah', page: 12, task: '5' },
    },

    /* ----------------------------------------------------- уровень ▷ */
    {
      id: 'kuerze-12-16',
      kind: 'fraction',
      level: 'mittel',
      prompt: { de: 'Kürze so weit wie möglich.', ru: 'Сократи дробь до конца.' },
      expr: '\\frac{12}{16}',
      numerator: 3,
      denominator: 4,
      requireReduced: true,
      hints: [
        'Можно шагами: сначала на 2, получится 6/8, потом ещё на 2.',
        'А можно сразу: ggT(12; 16) = 4.',
      ],
      solution: '12 : 4 = 3, 16 : 4 = 4. Ответ 3/4.',
      source: { book: 'ah', page: 12, task: '1a' },
    },
    {
      id: 'kuerze-10-15',
      kind: 'fraction',
      level: 'mittel',
      prompt: { de: 'Kürze so weit wie möglich.', ru: 'Сократи дробь до конца.' },
      expr: '\\frac{10}{15}',
      numerator: 2,
      denominator: 3,
      requireReduced: true,
      hints: ['Оба числа оканчиваются на 0 и 5 — значит оба делятся на 5.'],
      solution: '10 : 5 = 2, 15 : 5 = 3. Ответ 2/3.',
      source: { book: 'ah', page: 12, task: '1b' },
    },
    {
      id: 'kuerzungszahl-7-14',
      kind: 'number',
      level: 'mittel',
      prompt: {
        de: 'Aus 7/14 wurde 1/2. Mit welcher Zahl wurde gekürzt?',
        ru: 'Из 7/14 получилось 1/2. На какое число сократили?',
      },
      answer: 7,
      hints: ['Числитель был 7, стал 1. Во сколько раз он уменьшился?'],
      solution: '7 : 7 = 1 и 14 : 7 = 2. Сокращали на 7.',
      source: { book: 'ah', page: 12, task: '2' },
    },
    {
      id: 'erweitere-2-9',
      kind: 'fraction',
      level: 'mittel',
      prompt: { de: 'Erweitere den Bruch mit 2.', ru: 'Расширь дробь, умножив на 2.' },
      expr: '\\frac{2}{9}',
      numerator: 4,
      denominator: 18,
      requireExact: true,
      hints: ['Оба числа умножаются на 2.'],
      solution: '2 · 2 = 4, 9 · 2 = 18. Ответ 4/18.',
      source: { book: 'ah', page: 12, task: '2' },
    },
    {
      id: 'erweitere-3-7',
      kind: 'fraction',
      level: 'mittel',
      prompt: { de: 'Erweitere den Bruch mit 4.', ru: 'Расширь дробь, умножив на 4.' },
      expr: '\\frac{3}{7}',
      numerator: 12,
      denominator: 28,
      requireExact: true,
      hints: ['3 · 4 = 12, 7 · 4 = ?'],
      solution: '3 · 4 = 12 и 7 · 4 = 28. Ответ 12/28.',
      source: { book: 'ah', page: 12, task: '2' },
    },
    {
      id: 'erweitert-oder-gekuerzt-2',
      kind: 'choice',
      level: 'mittel',
      prompt: {
        de: 'Aus 1/3 wurde 6/18. Wurde gekürzt oder erweitert?',
        ru: 'Из 1/3 получилось 6/18. Сокращали или расширяли?',
      },
      options: [
        { de: 'gekürzt', ru: 'сокращали' },
        { de: 'erweitert', ru: 'расширяли' },
      ],
      correct: 1,
      hints: ['Числа стали больше — значит умножали.'],
      solution: 'Умножили оба числа на 6: расширяли. Erweiterungszahl здесь 6.',
      source: { book: 'ah', page: 12, task: '5' },
    },
    {
      id: 'erweitere-auf-nenner-20',
      kind: 'fraction',
      level: 'mittel',
      prompt: {
        de: 'Erweitere 2/5 auf den Nenner 20.',
        ru: 'Расширь дробь 2/5 до знаменателя 20.',
      },
      numerator: 8,
      denominator: 20,
      requireExact: true,
      hints: [
        'Сначала пойми, во сколько раз вырос знаменатель: 20 : 5 = ?',
        'На то же число умножь и числитель.',
      ],
      solution: '20 : 5 = 4, значит 2 · 4 = 8. Ответ 8/20.',
      source: { book: 'lb', page: 19 },
    },

    /* ----------------------------------------------------- уровень ⋈ */
    {
      id: 'kuerze-30-45',
      kind: 'fraction',
      level: 'plus',
      prompt: { de: 'Kürze so weit wie möglich.', ru: 'Сократи дробь до конца.' },
      expr: '\\frac{30}{45}',
      numerator: 2,
      denominator: 3,
      requireReduced: true,
      hints: ['Оба делятся на 5, потом ещё на 3. Или сразу на 15.'],
      solution: '30 : 15 = 2, 45 : 15 = 3. Ответ 2/3. ggT(30; 45) = 15.',
      source: { book: 'ah', page: 13, task: '3a' },
    },
    {
      id: 'kuerze-42-60',
      kind: 'fraction',
      level: 'plus',
      prompt: { de: 'Kürze so weit wie möglich.', ru: 'Сократи дробь до конца.' },
      expr: '\\frac{42}{60}',
      numerator: 7,
      denominator: 10,
      requireReduced: true,
      hints: ['Оба чётные — начни с 2, получится 21/30. Дальше оба делятся на 3.'],
      solution: '42 : 6 = 7, 60 : 6 = 10. Ответ 7/10.',
      source: { book: 'ah', page: 13, task: '3b' },
    },
    {
      id: 'kuerze-39-78',
      kind: 'fraction',
      level: 'plus',
      prompt: { de: 'Kürze so weit wie möglich.', ru: 'Сократи дробь до конца.' },
      expr: '\\frac{39}{78}',
      numerator: 1,
      denominator: 2,
      requireReduced: true,
      hints: ['Приглядись: 78 — это ровно 39 · 2.'],
      solution:
        '39 : 39 = 1, 78 : 39 = 2. Ответ 1/2. Когда знаменатель вдвое больше числителя, дробь всегда равна половине.',
      source: { book: 'ah', page: 13, task: '3c' },
    },
    {
      id: 'kuerze-95-150',
      kind: 'fraction',
      level: 'plus',
      prompt: { de: 'Kürze so weit wie möglich.', ru: 'Сократи дробь до конца.' },
      expr: '\\frac{95}{150}',
      numerator: 19,
      denominator: 30,
      requireReduced: true,
      hints: [
        'Оба оканчиваются на 5 и 0 — значит оба делятся на 5.',
        '95 : 5 = 19, а 19 — простое число, дальше сокращать будет нечем.',
      ],
      solution: '95 : 5 = 19, 150 : 5 = 30. Ответ 19/30.',
      source: { book: 'ah', page: 13, task: '3d' },
    },
    {
      id: 'erweitere-2-5-mit-9',
      kind: 'fraction',
      level: 'plus',
      prompt: { de: 'Erweitere 2/5 mit 9.', ru: 'Расширь дробь 2/5, умножив на 9.' },
      numerator: 18,
      denominator: 45,
      requireExact: true,
      hints: ['2 · 9 = 18, 5 · 9 = ?'],
      solution: '18/45. Проверить легко: сократи обратно на 9 и получишь исходные 2/5.',
      source: { book: 'ah', page: 13, task: '4' },
    },
    {
      id: 'kuerzungszahl-20-24',
      kind: 'number',
      level: 'plus',
      prompt: {
        de: 'Aus 20/24 wurde 5/6. Mit welcher Zahl wurde gekürzt?',
        ru: 'Из 20/24 получилось 5/6. На какое число сократили?',
      },
      answer: 4,
      hints: ['20 : ? = 5'],
      solution: '20 : 4 = 5 и 24 : 4 = 6. Сокращали на 4.',
      source: { book: 'ah', page: 13, task: '1' },
    },
    {
      id: 'warum-gleich',
      kind: 'open',
      level: 'plus',
      prompt: {
        de: 'Warum ändert sich der Wert eines Bruches beim Kürzen und Erweitern nicht? Begründe.',
        ru: 'Почему при сокращении и расширении величина дроби не меняется? Обоснуй.',
      },
      reference:
        'Потому что меняется только то, как мы режем целое, а не сколько от него взяли. Когда расширяем, каждый кусок делится на несколько мелких: кусков становится больше во столько же раз, во сколько мельче каждый. Одно уравновешивает другое, и закрашенная часть остаётся той же. При сокращении происходит обратное — мелкие куски склеиваются в крупные.',
      referenceDe:
        'Der Wert bleibt gleich, weil Zähler und Nenner mit derselben Zahl multipliziert oder durch dieselbe Zahl dividiert werden.',
      hints: [
        'Вспомни полоску из тренажёра: что менялось, а что оставалось на месте?',
        'Подумай про пиццу: если каждый кусок разрезать пополам, кусков станет вдвое больше, но и каждый вдвое меньше.',
      ],
      source: { book: 'lb', page: 17 },
    },
  ],
})
