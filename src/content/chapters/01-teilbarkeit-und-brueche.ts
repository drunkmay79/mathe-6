import { defineChapter } from '../schema'

/**
 * Глава 1 учебника Parallelo 6 (NRW): «Teilbarkeit und Brüche», S. 6–35.
 *
 * Порядок тем — как в учебнике:
 *   1. Teiler und Vielfache            LB 8–10,  AH 2–4    ← сделано
 *   2. Teilbarkeitsregeln (2, 5, 10)   LB 11–13, AH 5–7
 *   3. Teilbarkeitsregeln (Quersumme)  LB 11–13, AH 8–10
 *   4. Brüche als Teile vom Ganzen     LB 14–16  (в тетради этой темы нет)
 *   5. Brüche erweitern und kürzen     LB 17–19, AH 11–13
 *   6. Brüche vergleichen und ordnen   LB 20–22, AH 14–16
 *   7. Brüche am Zahlenstrahl          LB 23–25, AH 17–19
 *
 * Внутри урока порядок тоже учебника: сначала язык задания (phrases),
 * потом Merke и Beispiele (theory), потом задания по трём уровням.
 */
export const chapter = defineChapter({
  id: 'teilbarkeit-und-brueche',
  number: 1,
  title: { de: 'Teilbarkeit und Brüche', ru: 'Делимость и дроби' },
  lessons: [
    {
      id: 'teiler-und-vielfache',
      title: { de: 'Teiler und Vielfache', ru: 'Делители и кратные' },
      summary:
        'Тут всего два новых слова, и оба несложные: кратные получаются умножением, делители — делением. Разобраться стоит спокойно и до конца: без них потом не сократить ни одной дроби, а дроби — это вся остальная глава.',
      terms: [
        'teiler',
        'vielfaches',
        'teilbar',
        'teiler-menge',
        'vielfachen-menge',
        'ggt',
        'kgv',
        'ziffer',
      ],
      source: { book: 'lb', page: 8 },

      phrases: [
        {
          de: 'Finde die Teiler von 32.',
          ru: 'Найди делители числа 32.',
        },
        {
          de: 'Nenne die ersten fünf Vielfachen der Zahl.',
          ru: 'Назови первые пять кратных числа.',
          note: 'Nenne — просто назови. Расписывать решение не требуют.',
        },
        {
          de: 'Gib die Teiler-Menge an.',
          ru: 'Укажи множество делителей.',
          note: 'Menge записывают в фигурных скобках через точку с запятой: T₂₈ = {1; 2; 4; 7; 14; 28}.',
        },
        {
          de: 'Ist 6 ein Teiler von 54?',
          ru: 'Является ли 6 делителем числа 54?',
        },
        {
          de: 'Bestimme das kleinste gemeinsame Vielfache.',
          ru: 'Найди наименьшее общее кратное (НОК).',
          note: 'В немецком это kgV. Наибольший общий делитель — ggT. Оба пишутся с маленькой первой буквы.',
        },
        {
          de: 'Begründe deine Antwort.',
          ru: 'Обоснуй ответ.',
          note: 'Ждут предложение со словом weil, а не просто «да» или «нет».',
        },
        {
          de: 'Verbinde die Zahl mit ihren Vielfachen.',
          ru: 'Соедини число с его кратными.',
        },
        {
          de: 'Übertrage und ergänze im Heft.',
          ru: 'Перепиши в тетрадь и дополни.',
        },
      ],

      theory: [
        {
          type: 'text',
          body: {
            de: 'Vielfache und Teiler gehören zusammen. Vielfache bekommt man durch Multiplizieren, Teiler durch Dividieren.',
            ru: 'Во всей теме всего два новых слова: Vielfache и Teiler. Кратные получаются умножением, делители — делением. Больше здесь ничего нет, дальше — только про них.',
          },
        },
        {
          type: 'visual',
          art: 'vielfache-spruenge',
          caption:
            'Представь, что ты прыгаешь по числовой прямой от нуля и каждый прыжок ровно на три. Все точки, куда ты попадаешь — 3, 6, 9, 12 и дальше, — это и есть кратные тройки. Прыгать можно сколько угодно, поэтому кратные никогда не заканчиваются.',
        },
        {
          type: 'rule',
          title: { de: 'Merke: Vielfachen-Menge', ru: 'Запомни: множество кратных' },
          body: {
            de: 'Die Vielfachen einer Zahl gibt man als Vielfachen-Menge an.',
            ru: 'Кратные записывают вот так: буква V, снизу мелко само число, дальше в фигурных скобках все прыжки через точку с запятой. Многоточие в конце ставят обязательно — оно и значит «и так далее без конца».',
          },
          expr: 'V_{6} = \\{6;\\ 12;\\ 18;\\ 24;\\ 30;\\ \\dots\\}',
        },
        {
          type: 'visual',
          art: 'teiler-rechtecke',
          caption:
            'С делителями фокус другой. Возьми 12 квадратиков и складывай из них прямоугольники — целиком, без дырок и без лишних квадратиков. Получится ровно три разных. Числа на их сторонах и есть делители числа 12: 1 и 12, 2 и 6, 3 и 4. Заметила, что они выходят парами? Это не случайность, а самое полезное их свойство.',
        },
        {
          type: 'rule',
          title: { de: 'Merke: Teiler', ru: 'Запомни: делители' },
          body: {
            de: 'Die Zahlen, durch die man ohne Rest dividieren kann, nennt man Teiler. Alle Teiler gibt man als Teiler-Menge an.',
            ru: 'Делители — числа, на которые делится без остатка. И тут главное отличие от кратных: делителей у числа всегда конечное количество, их можно выписать все до одного.',
          },
          expr: 'T_{4} = \\{1;\\ 2;\\ 4\\}',
        },
        {
          type: 'example',
          prompt: {
            de: 'Finde alle Teiler von 18.',
            ru: 'Найди все делители числа 18.',
          },
          steps: [
            {
              expr: '18 : 1 = 18',
              explain:
                'Делим по порядку, начиная с единицы. Одно деление — сразу два делителя: 1 и 18.',
            },
            {
              expr: '18 : 2 = 9',
              explain:
                'Снова пара: 2 и 9. Как на картинке с прямоугольниками — стороны всегда ходят вдвоём.',
            },
            {
              expr: '18 : 3 = 6',
              explain: 'Ещё пара: 3 и 6.',
            },
            {
              expr: '18 : 4 \\rightarrow \\text{Rest} \\qquad 18 : 5 \\rightarrow \\text{Rest}',
              explain:
                'На 4 и на 5 без остатка не делится — они не делители, просто пропускаем их.',
            },
            {
              expr: 'T_{18} = \\{1;\\ 2;\\ 3;\\ 6;\\ 9;\\ 18\\}',
              explain:
                'Дальше идёт 6 — но она уже записана, в паре с тройкой. Числа пошли по второму кругу, значит найдено всё. Вот зачем нужны пары: они сами говорят, когда можно остановиться.',
            },
          ],
        },
        {
          type: 'visual',
          art: 'kgv-treffen',
          caption:
            'Теперь прыгают двое: синий по четыре, оранжевый по шесть. Стартуют из нуля — и первый раз оказываются в одной точке на числе 12. Это и есть kgV(4; 6). Встретятся они и потом, на 24 и на 36, но спрашивают самую первую встречу. Поэтому в названии и стоит kleinste — «наименьшее».',
        },
        {
          type: 'rule',
          title: { de: 'Merke: ggT und kgV', ru: 'Запомни: ggT и kgV' },
          body: {
            de: 'Der größte gemeinsame Teiler heißt ggT. Das kleinste gemeinsame Vielfache heißt kgV.',
            ru: 'ggT — наибольший общий делитель, по-нашему НОД. kgV — наименьшее общее кратное, НОК. Немцы пишут их именно так, с маленькой буквы в начале, и в заданиях они встречаются постоянно.',
          },
          expr: '\\text{ggT}(6;\\ 20) = 2 \\qquad \\text{kgV}(2;\\ 3) = 6',
        },
        {
          type: 'visual',
          art: 'ggt-pakete',
          caption:
            'А ggT проще всего представить так. У тебя 12 конфет и 18 наклеек, надо разложить всё по одинаковым пакетам и ничего не оставить. Больше шести пакетов никак не выйдет: в каждом окажется по 2 конфеты и по 3 наклейки. Значит ggT(12; 18) = 6 — самое большое число, на которое делятся оба.',
        },
        {
          type: 'example',
          prompt: {
            de: 'Bestimme das kgV von 4 und 6.',
            ru: 'Найди наименьшее общее кратное чисел 4 и 6.',
          },
          steps: [
            {
              expr: 'V_{4} = \\{4;\\ 8;\\ 12;\\ 16;\\ 20;\\ 24;\\ \\dots\\}',
              explain:
                'Если картинку рисовать некогда, делают так: выписывают прыжки первого числа.',
            },
            {
              expr: 'V_{6} = \\{6;\\ 12;\\ 18;\\ 24;\\ 30;\\ \\dots\\}',
              explain: 'Потом прыжки второго.',
            },
            {
              expr: '12;\\ 24;\\ 36;\\ \\dots',
              explain: 'И смотрят, какие числа попали в оба списка. Это и есть места встречи.',
            },
            {
              expr: '\\text{kgV}(4;\\ 6) = 12',
              explain: 'Берут самое маленькое — 12. Готово.',
            },
          ],
        },
      ],

      exercises: [
        /* ------------------------------------------------- язык задания */
        {
          id: 'sprache-nenne',
          kind: 'choice',
          focus: 'sprache',
          level: 'basis',
          prompt: {
            de: 'Nenne die ersten fünf Vielfachen der Zahl 7.',
            ru: 'Что от тебя просят в этом задании?',
          },
          options: [
            { de: 'Die Teiler von 7 finden.', ru: 'Найти делители числа 7' },
            { de: 'Die ersten fünf Vielfachen von 7 nennen.', ru: 'Назвать первые пять кратных 7' },
            { de: 'Prüfen, ob 7 eine Primzahl ist.', ru: 'Проверить, простое ли число 7' },
          ],
          correct: 1,
          hints: ['Ключевое слово — Vielfache. Кратные или делители?'],
          solution:
            'Vielfache — кратные: 7, 14, 21, 28, 35. Делители по-немецки Teiler, это другое слово.',
        },
        {
          id: 'sprache-teiler-lueckentext',
          kind: 'text',
          focus: 'sprache',
          level: 'basis',
          prompt: {
            de: 'Ergänze: Die Zahlen, durch die man ohne Rest dividieren kann, nennt man ___.',
            ru: 'Дополни фразу из правила: числа, на которые делится без остатка, называются ___.',
          },
          accept: ['Teiler', 'die Teiler'],
          hints: ['Это слово стоит в рамке Merke чуть выше.'],
          solution: 'Teiler — делители. Ohne Rest значит «без остатка».',
          source: { book: 'lb', page: 8 },
        },
        {
          id: 'sprache-begruende',
          kind: 'choice',
          focus: 'sprache',
          level: 'basis',
          prompt: {
            de: 'Begründe deine Antwort.',
            ru: 'Что нужно написать, если в задании стоит эта фраза?',
          },
          options: [
            { de: 'Nur das Ergebnis.', ru: 'Только ответ' },
            { de: 'Einen Satz mit „weil“.', ru: 'Предложение с «weil» — почему именно так' },
            { de: 'Eine Zeichnung.', ru: 'Чертёж' },
          ],
          correct: 1,
          hints: ['Begründen — обосновывать. Чем это отличается от berechnen?'],
          solution:
            'Begründe ждёт объяснение словами: «56 ist ein Vielfaches von 7, weil 8 · 7 = 56». Без weil ответ считается неполным.',
        },
        {
          id: 'sprache-mengenschreibweise',
          kind: 'choice',
          focus: 'sprache',
          level: 'basis',
          prompt: {
            de: 'Schreibe in der Mengenschreibweise.',
            ru: 'Как выглядит правильно оформленный ответ?',
          },
          options: [
            { de: '1, 2, 4, 8', ru: '1, 2, 4, 8' },
            { de: 'T₈ = {1; 2; 4; 8}', ru: 'T₈ = {1; 2; 4; 8}' },
            { de: '8 : 1 = 8', ru: '8 : 1 = 8' },
          ],
          correct: 1,
          hints: ['Mengenschreibweise — запись множеством. Что там обязательно есть?'],
          solution:
            'Фигурные скобки, точка с запятой между числами и подпись слева: T₈ = {1; 2; 4; 8}.',
        },

        /* ----------------------------------------------------- уровень ▽ */
        {
          id: 'teiler-32',
          kind: 'set',
          level: 'basis',
          prompt: { de: 'Finde die Teiler von 32.', ru: 'Найди делители числа 32.' },
          label: 'T_{32} =',
          values: [1, 2, 4, 8, 16, 32],
          hints: [
            'Делители всегда находятся парами: 32 : 1 = 32 — значит 1 и 32 оба делители.',
            'Проверь по порядку 2, 3, 4… Как только числа начнут повторяться, можно останавливаться.',
          ],
          solution:
            '32 : 1 = 32, 32 : 2 = 16, 32 : 4 = 8. Дальше пары повторяются. T₃₂ = {1; 2; 4; 8; 16; 32}.',
          source: { book: 'ah', page: 2, task: '1' },
        },
        {
          id: 'vielfache-4',
          kind: 'set',
          level: 'basis',
          prompt: {
            de: 'Nenne die ersten fünf Vielfachen der Zahl 4.',
            ru: 'Назови первые пять кратных числа 4.',
          },
          label: 'V_{4} =',
          values: [4, 8, 12, 16, 20],
          hints: ['Умножай 4 на 1, 2, 3, 4, 5.'],
          solution: 'V₄ = {4; 8; 12; 16; 20; …}. Это просто таблица умножения на 4.',
          source: { book: 'lb', page: 9, task: '2' },
        },
        {
          id: 'ist-5-teiler-von-45',
          kind: 'choice',
          level: 'basis',
          prompt: {
            de: 'Ist 5 ein Teiler von 45? Begründe.',
            ru: 'Является ли 5 делителем числа 45?',
          },
          options: [
            { de: 'Ja', ru: 'Да' },
            { de: 'Nein', ru: 'Нет' },
          ],
          correct: 0,
          hints: ['Раздели 45 на 5. Остаток есть?'],
          solution:
            '45 : 5 = 9, без остатка — значит 5 делитель. По-немецки: 5 ist ein Teiler von 45, weil 9 · 5 = 45.',
          source: { book: 'lb', page: 10, task: '9a' },
        },
        {
          id: 'kgv-4-10',
          kind: 'number',
          level: 'basis',
          prompt: {
            de: 'Bestimme das kleinste gemeinsame Vielfache von 4 und 10.',
            ru: 'Найди наименьшее общее кратное чисел 4 и 10.',
          },
          answer: 20,
          hints: [
            'Выпиши кратные каждого числа: V₄ = {4; 8; 12; 16; 20; …}, V₁₀ = {10; 20; 30; …}.',
            'Найди первое число, которое встретилось в обоих списках.',
          ],
          solution: 'Общие кратные: 20, 40, 60… Самое маленькое — 20. kgV(4; 10) = 20.',
          source: { book: 'lb', page: 9, task: '6b' },
        },
        {
          id: 'gemeinsame-teiler-12-16',
          kind: 'set',
          level: 'basis',
          prompt: {
            de: 'Finde die gemeinsamen Teiler von 12 und 16.',
            ru: 'Найди общие делители чисел 12 и 16.',
          },
          values: [1, 2, 4],
          hints: [
            'Сначала выпиши делители каждого числа отдельно.',
            'T₁₂ = {1; 2; 3; 4; 6; 12}, T₁₆ = {1; 2; 4; 8; 16}. Какие числа есть в обоих?',
          ],
          solution: 'Общие делители: 1, 2 и 4. Самый большой из них — 4, значит ggT(12; 16) = 4.',
          source: { book: 'ah', page: 2, task: '2a' },
        },
        {
          id: 'verbinde-vielfache',
          kind: 'match',
          level: 'basis',
          prompt: {
            de: 'Verbinde die Zahl mit ihren Vielfachen.',
            ru: 'Соедини каждое число с его кратными. У одного числа кратных может быть несколько.',
          },
          left: [
            { id: 'l8', label: '8' },
            { id: 'l12', label: '12' },
          ],
          right: [
            { id: 'r24', label: '24' },
            { id: 'r36', label: '36' },
            { id: 'r40', label: '40' },
            { id: 'r64', label: '64' },
          ],
          pairs: [
            ['l8', 'r24'],
            ['l8', 'r40'],
            ['l8', 'r64'],
            ['l12', 'r24'],
            ['l12', 'r36'],
          ],
          hints: [
            'Число кратно 8, если оно делится на 8 без остатка.',
            '24 делится и на 8, и на 12 — значит связей у него две.',
          ],
          solution: 'Кратные 8: 24, 40, 64. Кратные 12: 24, 36. Число 24 — общее кратное обоих.',
          source: { book: 'ah', page: 2, task: '3' },
        },

        /* ----------------------------------------------------- уровень ▷ */
        {
          id: 'teiler-50',
          kind: 'set',
          level: 'mittel',
          prompt: {
            de: 'Finde die Teiler und ergänze die Teiler-Menge.',
            ru: 'Найди делители и дополни множество.',
          },
          label: 'T_{50} =',
          values: [1, 2, 5, 10, 25, 50],
          hints: ['50 оканчивается на 0 — значит делится на 2, на 5 и на 10.'],
          solution: '50 : 1 = 50, 50 : 2 = 25, 50 : 5 = 10. T₅₀ = {1; 2; 5; 10; 25; 50}.',
          source: { book: 'ah', page: 3, task: '1a' },
        },
        {
          id: 'teiler-63',
          kind: 'set',
          level: 'mittel',
          prompt: {
            de: 'Gib die Teiler-Menge von 63 an.',
            ru: 'Укажи множество делителей числа 63.',
          },
          label: 'T_{63} =',
          values: [1, 3, 7, 9, 21, 63],
          hints: [
            '63 — нечётное, на 2 не делится. Начни с 3.',
            '63 = 7 · 9. Значит 7 и 9 тоже делители, а с ними 21 и 63.',
          ],
          solution: 'T₆₃ = {1; 3; 7; 9; 21; 63}. Пары: 1 и 63, 3 и 21, 7 и 9.',
          source: { book: 'ah', page: 3, task: '1b' },
        },
        {
          id: 'ggt-18-40',
          kind: 'number',
          level: 'mittel',
          prompt: {
            de: 'Bestimme den größten gemeinsamen Teiler von 18 und 40.',
            ru: 'Найди наибольший общий делитель чисел 18 и 40.',
          },
          answer: 2,
          hints: [
            'T₁₈ = {1; 2; 3; 6; 9; 18}, T₄₀ = {1; 2; 4; 5; 8; 10; 20; 40}.',
            'Общих делителей всего два. Какой из них больше?',
          ],
          solution: 'Общие делители: 1 и 2. Наибольший — 2, значит ggT(18; 40) = 2.',
          source: { book: 'ah', page: 3, task: '2a' },
        },
        {
          id: 'kgv-4-6',
          kind: 'number',
          level: 'mittel',
          prompt: {
            de: 'Bestimme das kgV von 4 und 6.',
            ru: 'Найди наименьшее общее кратное чисел 4 и 6.',
          },
          answer: 12,
          hints: ['Общие кратные 4 и 6 — это 12, 24, 36. Какое из них наименьшее?'],
          solution: 'kgV(4; 6) = 12. Обрати внимание: 24 тоже общее кратное, но не наименьшее.',
          source: { book: 'ah', page: 3, task: '3' },
        },
        {
          id: 'aussagen-teiler',
          kind: 'truefalse',
          level: 'mittel',
          prompt: {
            de: 'Sind die Aussagen richtig? Berichtige die falschen.',
            ru: 'Верны ли утверждения? Отметь каждую строку.',
          },
          statements: [
            {
              de: '5 ist ein Teiler von 25.',
              ru: '5 — делитель числа 25.',
              correct: true,
              why: '25 : 5 = 5, без остатка.',
            },
            {
              de: '8 ist ein Teiler von 84.',
              ru: '8 — делитель числа 84.',
              correct: false,
              why: '84 : 8 = 10 и остаток 4. Значит нет.',
            },
            {
              de: '15 ist ein Teiler von 60.',
              ru: '15 — делитель числа 60.',
              correct: true,
              why: '60 : 15 = 4.',
            },
            {
              de: '12 ist ein Teiler von 106.',
              ru: '12 — делитель числа 106.',
              correct: false,
              why: '106 : 12 = 8 и остаток 10.',
            },
          ],
          hints: ['Проверяй делением: остаток есть — значит не делитель.'],
          solution:
            'Верны первое и третье. В немецком это записывают так: 5 | 25 (5 teilt 25) и 8 ∤ 84 (8 teilt 84 nicht).',
          source: { book: 'lb', page: 10, task: '10' },
        },
        {
          id: 'teiler-24-ergaenzen',
          kind: 'set',
          level: 'mittel',
          prompt: {
            de: 'Übertrage und ergänze im Heft: T₂₄ = {■; ■; 3; ■; 8; ■; ■}',
            ru: 'Выпиши множество делителей числа 24 полностью.',
          },
          label: 'T_{24} =',
          values: [1, 2, 3, 4, 6, 8, 12, 24],
          hints: [
            'В задании уже даны 3 и 8 — значит их пары 8 и 3 тоже на месте, ищи остальные.',
            'Начни с 1 и иди по порядку: 1, 2, 3, 4… до момента, когда пары начнут повторяться.',
          ],
          solution: 'T₂₄ = {1; 2; 3; 4; 6; 8; 12; 24}. Восемь делителей, четыре пары.',
          source: { book: 'lb', page: 10, task: '12c' },
        },
        {
          id: 'ist-56-vielfaches-von-7',
          kind: 'choice',
          level: 'mittel',
          prompt: {
            de: 'Ist 56 ein Vielfaches von 7? Begründe.',
            ru: 'Является ли 56 кратным числа 7?',
          },
          options: [
            { de: 'Ja', ru: 'Да' },
            { de: 'Nein', ru: 'Нет' },
          ],
          correct: 0,
          hints: ['Есть ли такое число, которое при умножении на 7 даёт 56?'],
          solution:
            '8 · 7 = 56, значит да. Обоснование по-немецки: 56 ist ein Vielfaches von 7, weil 8 · 7 = 56.',
          source: { book: 'lb', page: 9, task: '4a' },
        },

        /* ----------------------------------------------------- уровень ⋈ */
        {
          id: 'teiler-76',
          kind: 'set',
          level: 'plus',
          prompt: { de: 'Finde die Teiler von 76.', ru: 'Найди делители числа 76.' },
          label: 'T_{76} =',
          values: [1, 2, 4, 19, 38, 76],
          hints: [
            '76 чётное: 76 : 2 = 38. Значит 2 и 38 — делители.',
            'Дальше 76 : 4 = 19. А 19 — простое число, новых делителей уже не будет.',
          ],
          solution:
            'T₇₆ = {1; 2; 4; 19; 38; 76}. Проверять числа больше 8 не нужно: 8 · 8 = 64, а 9 · 9 = 81 уже больше 76, значит все пары найдены.',
          source: { book: 'ah', page: 4, task: '1a' },
        },
        {
          id: 'vielfache-15-zwischen-50-100',
          kind: 'set',
          level: 'plus',
          prompt: {
            de: 'Schreibe die Vielfachen der Zahl 15 auf, die zwischen 50 und 100 liegen.',
            ru: 'Выпиши кратные числа 15, которые лежат между 50 и 100.',
          },
          values: [60, 75, 90],
          hints: [
            'Считай кратные 15 подряд: 15, 30, 45, 60…',
            'Нужны только те, что больше 50 и меньше 100.',
          ],
          solution: '15 · 4 = 60, 15 · 5 = 75, 15 · 6 = 90. Дальше 105 — это уже больше 100.',
          source: { book: 'lb', page: 9, task: '2a' },
        },
        {
          id: 'ggt-14-35',
          kind: 'number',
          level: 'plus',
          prompt: {
            de: 'Benenne den größten gemeinsamen Teiler von 14 und 35.',
            ru: 'Найди наибольший общий делитель чисел 14 и 35.',
          },
          answer: 7,
          hints: ['T₁₄ = {1; 2; 7; 14}, T₃₅ = {1; 5; 7; 35}.'],
          solution: 'Общие делители: 1 и 7. ggT(14; 35) = 7.',
          source: { book: 'ah', page: 4, task: '3' },
        },
        {
          id: 'kgv-14-35',
          kind: 'number',
          level: 'plus',
          prompt: {
            de: 'Benenne das kleinste gemeinsame Vielfache von 14 und 35.',
            ru: 'Найди наименьшее общее кратное чисел 14 и 35.',
          },
          answer: 70,
          hints: [
            'V₁₄ = {14; 28; 42; 56; 70; …}, V₃₅ = {35; 70; 105; …}.',
            'Первое совпадение и есть ответ.',
          ],
          solution:
            'kgV(14; 35) = 70. Полезная проверка: 14 · 35 = 490, а 490 : ggT = 490 : 7 = 70 — сходится.',
          source: { book: 'ah', page: 4, task: '3' },
        },
        {
          id: 'busse-gleichzeitig',
          kind: 'number',
          level: 'plus',
          prompt: {
            de: 'Karl fährt mit dem Bus der Linie 8101, der ab 8:00 alle 8 Minuten fährt. Carla fährt mit der Linie 8102, die ab 8:00 alle 5 Minuten fährt. Alle wie viel Minuten steigen die Kinder gleichzeitig in ihre Busse ein?',
            ru: 'Карл ездит автобусом 8101: с 8:00 он ходит каждые 8 минут. Карла ездит автобусом 8102: с 8:00 каждые 5 минут. Через сколько минут они снова садятся в автобусы одновременно?',
          },
          answer: 40,
          unit: { de: 'Minuten', ru: 'минут' },
          hints: [
            'Через сколько минут после 8:00 уедет Карл? А Карла? Выпиши оба ряда.',
            'Нужно число, которое есть и среди кратных 8, и среди кратных 5 — и самое маленькое из таких.',
          ],
          solution:
            'Карл уезжает через 8, 16, 24, 32, 40 минут; Карла — через 5, 10, …, 35, 40. Первое общее число — kgV(8; 5) = 40. Значит одновременно они садятся в 8:40, 9:20, 10:00 и дальше каждые 40 минут. В самой тетради задание идёт дальше: с 12:00 расписание меняется на 12 и 8 минут, и там интервал совпадений уже kgV(12; 8) = 24 минуты.',
          source: { book: 'ah', page: 4, task: '4' },
        },
        {
          id: 'alle-teiler-gefunden',
          kind: 'open',
          level: 'plus',
          prompt: {
            de: 'Kim sucht alle Teiler von 18 und rechnet: 18 : 1 = 18, 18 : 2 = 9, 18 : 3 = 6. Dann hört sie auf. Woran erkennt Kim, dass sie schon alle Teiler gefunden hat? Beschreibe ihr Vorgehen mit eigenen Worten.',
            ru: 'Ким ищет все делители числа 18 и считает: 18 : 1 = 18, 18 : 2 = 9, 18 : 3 = 6. После этого она останавливается. По какому признаку Ким поняла, что нашла уже все делители? Объясни своими словами.',
          },
          reference:
            'Каждое деление даёт сразу пару делителей: 1 и 18, 2 и 9, 3 и 6. Следующим числом для проверки было бы 4, потом 5 — они не подходят, а 6 уже встретилось в паре с тройкой. Как только очередное число оказывается справа от знака равенства в предыдущих строках, пары пошли по второму кругу, и новых делителей больше не будет.',
          referenceDe: 'Die Teiler wiederholen sich ab jetzt. Also ist Kim fertig.',
          hints: [
            'Посмотри, сколько делителей даёт каждая строка деления.',
            'Что произошло бы, если бы Ким проверила 6? Какое число получилось бы в ответе?',
          ],
          source: { book: 'lb', page: 10, task: '11' },
        },
      ],
    },
  ],
})
