/**
 * Рисует иконки приложения и кладёт их в public/.
 *
 * Иконки генерируются кодом, а не лежат бинарниками: так их видно в истории
 * изменений и можно поправить цвет одной строкой. Знак деления выбран потому,
 * что вся первая глава — про делимость и дроби.
 *
 * Запуск: npm run icons
 */
import { deflateSync } from 'node:zlib'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

/* ------------------------------------------------------------ кодировщик PNG */

const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  return c >>> 0
})

function crc32(buffer) {
  let c = 0xffffffff
  for (const byte of buffer) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const length = Buffer.alloc(4)
  length.writeUInt32BE(data.length)
  const typed = Buffer.concat([Buffer.from(type, 'ascii'), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(typed))
  return Buffer.concat([length, typed, crc])
}

function encodePng(size, pixels) {
  const stride = size * 4
  const raw = Buffer.alloc((stride + 1) * size)
  for (let y = 0; y < size; y++) {
    raw[y * (stride + 1)] = 0 // фильтр строки: без фильтрации
    pixels.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride)
  }

  const header = Buffer.alloc(13)
  header.writeUInt32BE(size, 0)
  header.writeUInt32BE(size, 4)
  header[8] = 8 // бит на канал
  header[9] = 6 // RGBA

  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', header),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

/* -------------------------------------------------------------- рисование */

const BACKGROUND = [47, 94, 203] // тот же синий, что --color-accent в интерфейсе
const FOREGROUND = [255, 255, 255]

/** Мягкий край: доля закраски пикселя по расстоянию до границы фигуры. */
function coverage(distance) {
  return Math.min(1, Math.max(0, 0.5 - distance))
}

/**
 * Знак деления: полоса и две точки.
 * `scale` — доля размера иконки, которую занимает знак. Для maskable-иконки
 * он меньше: Android обрезает её до круга и съедает края.
 */
function drawIcon(size, scale) {
  const pixels = Buffer.alloc(size * size * 4)
  const center = size / 2
  const barHalfWidth = (size * scale) / 2
  const barHalfHeight = size * 0.045
  const dotRadius = size * 0.062
  const dotOffset = size * 0.165

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const px = x + 0.5
      const py = y + 0.5

      // Полоса со скруглёнными концами — это отрезок с толщиной.
      const dx = Math.max(0, Math.abs(px - center) - (barHalfWidth - barHalfHeight))
      const dy = py - center
      const bar = Math.hypot(dx, dy) - barHalfHeight

      const top = Math.hypot(px - center, py - (center - dotOffset)) - dotRadius
      const bottom = Math.hypot(px - center, py - (center + dotOffset)) - dotRadius

      const alpha = Math.max(coverage(bar), coverage(top), coverage(bottom))

      const offset = (y * size + x) * 4
      for (let channel = 0; channel < 3; channel++) {
        pixels[offset + channel] = Math.round(
          BACKGROUND[channel] * (1 - alpha) + FOREGROUND[channel] * alpha,
        )
      }
      pixels[offset + 3] = 255
    }
  }

  return encodePng(size, pixels)
}

/* ------------------------------------------------------------------ запуск */

const publicDir = fileURLToPath(new URL('../public/', import.meta.url))
const icons = [
  ['icon-192.png', 192, 0.52],
  ['icon-512.png', 512, 0.52],
  // maskable: Android обрезает иконку до круга, знак приходится делать мельче
  ['icon-maskable-512.png', 512, 0.4],
  ['apple-touch-icon.png', 180, 0.52],
]

for (const [name, size, scale] of icons) {
  writeFileSync(publicDir + name, drawIcon(size, scale))
  console.log(`${name} — ${size}×${size}`)
}
