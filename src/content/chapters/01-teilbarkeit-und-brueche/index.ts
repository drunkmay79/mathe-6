import { defineChapter } from '../../schema'
import { lesson as teilerUndVielfache } from './01-teiler-und-vielfache'
import { lesson as teilbarkeit2510 } from './02-teilbarkeit-2-5-10'
import { lesson as quersumme } from './03-quersumme'
import { lesson as brueecheAlsTeile } from './04-brueche-als-teile'
import { lesson as kuerzenErweitern } from './05-kuerzen-erweitern'
import { lesson as vergleichenOrdnen } from './06-vergleichen-ordnen'
import { lesson as zahlenstrahl } from './07-zahlenstrahl'

/**
 * Глава 1 учебника Parallelo 6 (NRW): «Teilbarkeit und Brüche», S. 6-35.
 *
 * Порядок тем - как в учебнике. Каждая тема лежит своим файлом:
 * глава большая, и одним файлом в ней невозможно ориентироваться.
 */
export const chapter = defineChapter({
  id: 'teilbarkeit-und-brueche',
  number: 1,
  title: { de: 'Teilbarkeit und Brüche', ru: 'Делимость и дроби' },
  lessons: [
    teilerUndVielfache,
    teilbarkeit2510,
    quersumme,
    brueecheAlsTeile,
    kuerzenErweitern,
    vergleichenOrdnen,
    zahlenstrahl,
  ],
})
