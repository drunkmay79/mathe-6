import { defineLesson } from '../../schema'

/**
 * Тема 4 главы: учебник S. 14-16.
 *
 * Единственная тема главы, которой нет в рабочей тетради — задания только
 * из учебника. Здесь появляется сама дробь: что такое Zähler и Nenner
 * и почему части обязаны быть одинаковыми.
 */
export const lesson = defineLesson({
  id: 'brueche-als-teile',
  title: { de: 'Brüche als Teile vom Ganzen', ru: 'Дробь как часть целого' },
  summary:
    'Дробь появляется там, где целое разрезали на равные части и взяли несколько. Два числа в ней отвечают за разное: нижнее говорит, на сколько частей резали, верхнее — сколько взяли.',
  terms: ['bruch', 'bruchstrich', 'zaehler', 'nenner', 'das-ganze', 'echter-bruch'],
  source: { book: 'lb', page: 14 },

  phrases: [
    {
      de: 'Wie heißt der Bruch?',
      ru: 'Как называется эта дробь?',
      note: 'Просят и записать цифрами, и назвать словами: 2/3 — zwei Drittel.',
    },
    {
      de: 'Male den Anteil bunt.',
      ru: 'Закрась эту часть.',
      note: 'der Anteil — доля, часть. bunt — цветной.',
    },
    {
      de: 'Übertrage die Rechtecke ins Heft.',
      ru: 'Перечерти прямоугольники в тетрадь.',
    },
    {
      de: 'Schreibe den Bruch mit Zahlen und in Wörtern.',
      ru: 'Запиши дробь цифрами и словами.',
    },
    {
      de: 'Finde die Fehler und verbessere sie.',
      ru: 'Найди ошибки и исправь их.',
      note: 'verbessern — исправлять. Значит в задании специально что-то неверно.',
    },
    {
      de: 'Beschreibe dein Vorgehen.',
      ru: 'Опиши, как ты действовала.',
      note: 'Нужен рассказ по шагам, а не только ответ.',
    },
  ],

  theory: [
    {
      type: 'text',
      body: {
        de: 'Das Ganze wird in gleich große Teile geteilt. Diesen Anteil nennt man einen Bruch.',
        ru: 'Целое разрезают на равные части и берут несколько из них. Вот это «несколько из скольких-то» и есть дробь. Слово «равные» тут главное: если куски разного размера, никакой дроби не получится.',
      },
    },
    {
      type: 'playground',
      toy: 'anteil-malen',
      caption:
        'Выбери, на сколько частей резать, и нажимай на кусочки. Внизу сразу видно, какая дробь получилась. Обрати внимание: нижнее число меняется, только когда меняешь количество частей, а верхнее — когда закрашиваешь.',
    },
    {
      type: 'rule',
      title: { de: 'Merke: Zähler und Nenner', ru: 'Запомни: числитель и знаменатель' },
      body: {
        de: 'Der Nenner gibt an, in wie viele gleich große Teile geteilt wird. Der Zähler gibt an, wie viele gleich große Teile man nimmt.',
        ru: 'Nenner (нижнее) — на сколько равных частей разрезали. Zähler (верхнее) — сколько таких частей взяли. Черта между ними называется Bruchstrich.',
      },
      expr: '\\frac{2}{3} \\quad \\text{Zähler} = 2, \\ \\text{Nenner} = 3',
    },
    {
      type: 'playground',
      toy: 'bruch-anatomie',
      caption:
        'Нажми на Zähler — подсветится закрашенная часть, та самая, которую взяли. Нажми на Nenner — картинка станет пустой, и останутся только линии разреза: знаменатель отвечает именно за них.',
    },
    {
      type: 'example',
      prompt: {
        de: 'Ein Kuchen wurde in drei gleich große Teile geteilt. Zwei von drei Stücken sind noch da.',
        ru: 'Пирог разрезали на три равные части. Два куска из трёх ещё на месте.',
      },
      steps: [
        {
          expr: '\\frac{\\square}{3}',
          explain: 'Резали на 3 части — значит внизу тройка. Это решается первым.',
        },
        {
          expr: '\\frac{2}{3}',
          explain: 'Осталось 2 куска — это верхнее число.',
        },
        {
          explain: 'Читается «zwei Drittel». По-русски — две трети.',
        },
      ],
    },
    {
      type: 'playground',
      toy: 'ganzes-wechseln',
      caption:
        'А теперь важное. Одна и та же дробь от разного целого даёт разное количество. Треть круга, треть полоски и треть от 12 конфет — доля называется одинаково, а «сколько это» каждый раз своё. Поэтому дробь всегда говорит «часть от чего-то», и это «что-то» надо держать в голове.',
    },
    {
      type: 'rule',
      title: { de: 'Merke: Ganze als Brüche', ru: 'Запомни: целое тоже дробь' },
      body: {
        de: 'Ganze kann man auch als Brüche darstellen. Ein Bruchstrich kann auch als Division gelesen werden.',
        ru: 'Если взять все части, получится целое: 5/5 = 1. А дробная черта — это просто знак деления, поэтому 8/4 = 8 : 4 = 2.',
      },
      expr: '\\frac{5}{5} = 1 \\qquad \\frac{8}{4} = 2 \\qquad \\frac{9}{3} = 3',
    },
  ],

  exercises: [
    /* ------------------------------------------------- язык задания */
    {
      id: 'sprache-male-bunt',
      kind: 'choice',
      focus: 'sprache',
      prompt: { de: 'Male den Anteil bunt.', ru: 'Что просят сделать?' },
      options: [
        { de: 'Die ganze Figur anmalen.', ru: 'Закрасить всю фигуру' },
        { de: 'Nur den genannten Anteil anmalen.', ru: 'Закрасить только названную часть' },
        { de: 'Die Figur abzeichnen.', ru: 'Перерисовать фигуру' },
      ],
      correct: 1,
      hints: ['der Anteil — доля, часть. Значит красить надо не всё.'],
      solution: 'Male den Anteil bunt — закрась ровно ту часть, которая указана в задании.',
    },
    {
      id: 'sprache-in-woertern',
      kind: 'choice',
      focus: 'sprache',
      prompt: {
        de: 'Schreibe den Bruch mit Zahlen und in Wörtern.',
        ru: 'Сколько ответов ждут?',
      },
      options: [
        { de: 'Nur die Zahlen.', ru: 'Только цифрами: 2/3' },
        { de: 'Zahlen und Wörter.', ru: 'И цифрами, и словами: 2/3 и zwei Drittel' },
      ],
      correct: 1,
      hints: ['und — «и». Значит нужно и то, и другое.'],
      solution:
        'Нужны обе записи. Немецкие названия долей строятся просто: Drittel, Viertel, Fünftel, Sechstel — от числительных.',
    },

    /* ----------------------------------------------------- уровень ▽ */
    {
      id: 'bruch-benennen-kreis',
      kind: 'fraction',
      level: 'basis',
      prompt: { de: 'Wie heißt der Bruch?', ru: 'Какая дробь закрашена?' },
      figure: { shape: 'circle', total: 8, shaded: 3 },
      numerator: 3,
      denominator: 8,
      hints: [
        'Сначала посчитай, на сколько всего частей разрезан круг — это нижнее число.',
        'Потом посчитай закрашенные — это верхнее.',
      ],
      solution: 'Круг поделён на 8 частей, закрашено 3. Получается 3/8 — drei Achtel.',
      source: { book: 'lb', page: 15, task: '2' },
    },
    {
      id: 'bruch-benennen-gitter',
      kind: 'fraction',
      level: 'basis',
      prompt: { de: 'Wie heißt der Bruch?', ru: 'Какая дробь закрашена?' },
      figure: { shape: 'grid', total: 8, cols: 4, shaded: 5 },
      numerator: 5,
      denominator: 8,
      hints: ['Считай клетки: сколько всего и сколько закрашено.'],
      solution: 'Всего 8 клеток, закрашено 5 — это 5/8, fünf Achtel.',
      source: { book: 'lb', page: 15, task: '2' },
    },
    {
      id: 'male-2-drittel',
      kind: 'shade',
      level: 'basis',
      prompt: { de: 'Male den Anteil bunt: 2/3', ru: 'Закрась две трети.' },
      shape: 'grid',
      total: 3,
      cols: 3,
      target: 2,
      hints: ['Знаменатель 3 — фигура уже разрезана на 3 части. Осталось выбрать нужное число.'],
      solution: 'Закрасить надо 2 части из 3.',
      source: { book: 'lb', page: 15, task: '3a' },
    },
    {
      id: 'male-7-achtel',
      kind: 'shade',
      level: 'basis',
      prompt: { de: 'Male den Anteil bunt: 7/8', ru: 'Закрась семь восьмых.' },
      shape: 'grid',
      total: 8,
      cols: 8,
      target: 7,
      hints: ['Восемь частей, закрасить семь — незакрашенной останется всего одна.'],
      solution:
        '7 из 8. Полезная привычка: когда закрашивать почти всё, проще считать, сколько останется пустым.',
      source: { book: 'lb', page: 15, task: '3b' },
    },
    {
      id: 'nenner-benennen',
      kind: 'text',
      level: 'basis',
      prompt: {
        de: 'Wie heißt die Zahl unter dem Bruchstrich?',
        ru: 'Как по-немецки называется число под чертой?',
      },
      accept: ['Nenner', 'der Nenner'],
      hints: ['От слова nennen — «называть». Оно называет, на сколько частей поделили.'],
      solution: 'Nenner — знаменатель. Сверху стоит Zähler, а сама черта — Bruchstrich.',
      source: { book: 'lb', page: 15, task: '1' },
    },
    {
      id: 'fuenf-fuenftel',
      kind: 'number',
      level: 'basis',
      prompt: { de: 'Berechne: 5/5 = ?', ru: 'Сколько будет 5/5?' },
      answer: 1,
      hints: ['Взяли все пять частей из пяти. Сколько это целых?'],
      solution: '5/5 = 1: взяли всё целиком. И через деление то же самое: 5 : 5 = 1.',
      source: { book: 'lb', page: 14 },
    },

    /* ----------------------------------------------------- уровень ▷ */
    {
      id: 'male-13-sechzehntel',
      kind: 'shade',
      level: 'mittel',
      prompt: { de: 'Male den Anteil bunt: 13/16', ru: 'Закрась тринадцать шестнадцатых.' },
      shape: 'grid',
      total: 16,
      cols: 4,
      target: 13,
      hints: ['16 клеток. Закрасить 13 — значит оставить пустыми 3.'],
      solution: '13 из 16 закрашено, 3 остались пустыми.',
      source: { book: 'lb', page: 15, task: '3a' },
    },
    {
      id: 'male-3-achtel-kreis',
      kind: 'shade',
      level: 'mittel',
      prompt: { de: 'Male den Anteil bunt: 3/8', ru: 'Закрась три восьмых круга.' },
      shape: 'circle',
      total: 8,
      target: 3,
      hints: ['Круг уже поделён на 8 секторов.'],
      solution: 'Три сектора из восьми — drei Achtel.',
      source: { book: 'lb', page: 15, task: '3b' },
    },
    {
      id: 'zwei-drittel-schreiben',
      kind: 'fraction',
      level: 'mittel',
      prompt: {
        de: 'Schreibe „zwei Drittel" als Bruch.',
        ru: 'Запиши дробью то, что по-немецки называется zwei Drittel.',
      },
      numerator: 2,
      denominator: 3,
      hints: ['Drittel — треть, значит знаменатель 3.', 'zwei — два, это числитель.'],
      solution:
        '2/3. Немецкие названия читаются в том же порядке: сначала числитель словом, потом доля — Drittel, Viertel, Fünftel.',
      source: { book: 'lb', page: 15, task: '2' },
    },
    {
      id: 'acht-viertel',
      kind: 'number',
      level: 'mittel',
      prompt: { de: 'Berechne: 8/4 = ?', ru: 'Сколько будет 8/4?' },
      answer: 2,
      hints: ['Дробная черта — это знак деления.'],
      solution: '8/4 = 8 : 4 = 2. Восемь четвертинок складываются в два целых.',
      source: { book: 'lb', page: 14 },
    },
    {
      id: 'bruch-benennen-sechstel',
      kind: 'fraction',
      level: 'mittel',
      prompt: { de: 'Wie heißt der Bruch?', ru: 'Какая дробь закрашена?' },
      figure: { shape: 'circle', total: 6, shaded: 4 },
      numerator: 4,
      denominator: 6,
      hints: ['Шесть секторов, четыре закрашены.'],
      solution:
        '4/6 — vier Sechstel. Эту дробь можно ещё и сократить до 2/3, но об этом будет следующая тема.',
      source: { book: 'lb', page: 15, task: '2' },
    },

    /* ----------------------------------------------------- уровень ⋈ */
    {
      id: 'male-5-24stel',
      kind: 'shade',
      level: 'plus',
      prompt: { de: 'Male den Anteil bunt: 5/24', ru: 'Закрась пять двадцать четвёртых.' },
      shape: 'grid',
      total: 24,
      cols: 6,
      target: 5,
      hints: ['24 клетки — это 4 ряда по 6.'],
      solution: '5 клеток из 24.',
      source: { book: 'lb', page: 15, task: '5a' },
    },
    {
      id: 'male-14-36stel',
      kind: 'shade',
      level: 'plus',
      prompt: {
        de: 'Zeichne ein Rechteck aus 36 Kästchen. Male den Anteil bunt: 14/36',
        ru: 'В прямоугольнике из 36 клеток закрась четырнадцать тридцать шестых.',
      },
      shape: 'grid',
      total: 36,
      cols: 6,
      target: 14,
      hints: ['36 клеток — 6 рядов по 6. Закрась 14 из них.'],
      solution: '14 из 36. Считать удобнее рядами: два полных ряда — это 12, плюс ещё две клетки.',
      source: { book: 'lb', page: 15, task: '5a' },
    },
    {
      id: 'neun-drittel',
      kind: 'number',
      level: 'plus',
      prompt: { de: 'Berechne: 9/3 = ?', ru: 'Сколько будет 9/3?' },
      answer: 3,
      hints: ['Девять третей — сколько это целых?'],
      solution: '9/3 = 9 : 3 = 3. Каждые три трети дают одно целое, а их тут три раза по три.',
      source: { book: 'lb', page: 14 },
    },
    {
      id: 'fehler-finden-bruch',
      kind: 'fraction',
      level: 'plus',
      prompt: {
        de: 'Cem sagt, die Zeichnung zeigt 1/4. Finde den Fehler und verbessere ihn: Wie heißt der Bruch richtig?',
        ru: 'Джем говорит, что на картинке 1/4. Найди ошибку: какая дробь на самом деле?',
      },
      figure: { shape: 'grid', total: 5, cols: 5, shaded: 1 },
      numerator: 1,
      denominator: 5,
      hints: [
        'Пересчитай все части, а не только закрашенные.',
        'Частей пять, а Джем написал четыре — вот и ошибка.',
      ],
      solution:
        'На самом деле 1/5. Джем посчитал только незакрашенные клетки и забыл про закрашенную. Знаменатель — это всегда общее число частей.',
      source: { book: 'lb', page: 15, task: '4' },
    },
    {
      id: 'vorgehen-beschreiben',
      kind: 'open',
      level: 'plus',
      prompt: {
        de: 'Du sollst 7/12 von einem Rechteck aus 36 Kästchen bunt malen. Beschreibe dein Vorgehen.',
        ru: 'Нужно закрасить 7/12 прямоугольника из 36 клеток. Опиши, как ты будешь действовать.',
      },
      reference:
        'Сначала надо понять, из скольких клеток состоит одна двенадцатая. Всего клеток 36, делим на 12 — получается 3 клетки в каждой доле. Значит семь долей это 7 · 3 = 21 клетка. Закрашиваем 21 клетку из 36.',
      referenceDe:
        'Ich teile 36 Kästchen durch 12. Ein Zwölftel sind also 3 Kästchen. Sieben Zwölftel sind 7 · 3 = 21 Kästchen.',
      hints: [
        'Сколько клеток приходится на одну двенадцатую часть?',
        'Раз одна доля — это 3 клетки, сколько клеток в семи долях?',
      ],
      source: { book: 'lb', page: 15, task: '5' },
    },
  ],
})
