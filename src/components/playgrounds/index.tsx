import type { ReactElement } from 'react'
import {
  AnteilMalen,
  BruchAmStrahl,
  BruchAnatomie,
  BruchSortierer,
  BruchZoom,
  BruecheVergleichen,
  GanzesWechseln,
  GemischteZahlStrahl,
  GleichnamigMachen,
  KuerzenJagd,
  KuerzenSchieber,
  StrahlLupe,
} from './brueche'
import { GgtKgvRechner, TeilerRechteckBauer, VielfacheHuepfer } from './teiler'
import {
  EndzifferLampen,
  GeradePaare,
  QuersummeMaschine,
  QuersummeTreppe,
  ZahlenSieb,
  ZiffernMischer,
} from './teilbarkeit'

/**
 * Реестр интерактивных тренажёров.
 *
 * Тренажёр — не задание: тут нечего сдавать и не за что получать галочку.
 * Это игрушка, в которой правило можно покрутить руками и увидеть, откуда оно
 * берётся. Ребёнку, который отстал, «покрути и посмотри» помогает сильнее,
 * чем ещё одно объяснение теми же словами.
 *
 * На каждую тему их три, и они разные по складу: один показывает механизм,
 * второй даёт поиграть с числами, третий обычно ломает какое-нибудь неверное
 * ожидание.
 */
export const PLAYGROUNDS: Record<string, () => ReactElement> = {
  // Teiler und Vielfache
  'vielfache-huepfer': VielfacheHuepfer,
  'teiler-rechteck-bauer': TeilerRechteckBauer,
  'ggt-kgv-rechner': GgtKgvRechner,

  // Teilbarkeit durch 2, 5 und 10
  'endziffer-lampen': EndzifferLampen,
  'zahlen-sieb': ZahlenSieb,
  'gerade-paare': GeradePaare,

  // Quersumme und Teilbarkeit
  'quersumme-maschine': QuersummeMaschine,
  'ziffern-mischer': ZiffernMischer,
  'quersumme-treppe': QuersummeTreppe,

  // Brüche als Teile vom Ganzen
  'anteil-malen': AnteilMalen,
  'bruch-anatomie': BruchAnatomie,
  'ganzes-wechseln': GanzesWechseln,

  // Brüche kürzen und erweitern
  'kuerzen-schieber': KuerzenSchieber,
  'bruch-zoom': BruchZoom,
  'kuerzen-jagd': KuerzenJagd,

  // Brüche vergleichen und ordnen
  'brueche-vergleichen': BruecheVergleichen,
  'gleichnamig-machen': GleichnamigMachen,
  'bruch-sortierer': BruchSortierer,

  // Brüche am Zahlenstrahl
  'bruch-am-strahl': BruchAmStrahl,
  'strahl-lupe': StrahlLupe,
  'gemischte-zahl-strahl': GemischteZahlStrahl,
}

export function hasPlayground(id: string): boolean {
  return id in PLAYGROUNDS
}
