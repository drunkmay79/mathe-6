import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vitest/config'

/**
 * Подпапка, в которой лежит сайт. На GitHub Pages проект живёт по адресу
 * вида https://<логин>.github.io/mathe-6/, а не в корне домена.
 *
 * Отсюда же берутся scope и start_url приложения: если они разойдутся с base,
 * планшет откажется ставить иконку на главный экран.
 */
const BASE = '/mathe-6/'

export default defineConfig({
  // Роутер работает через хеш (#/lesson/...), поэтому хостингу
  // не нужны никакие правила перезаписи адресов.
  base: BASE,
  plugins: [
    react(),
    tailwindcss(),
    /**
     * Превращает сайт в приложение на планшете: своя иконка на главном экране,
     * запуск на весь экран без адресной строки, работа без интернета.
     *
     * Устанавливать ничего не нужно — в браузере это «Добавить на главный экран».
     */
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['apple-touch-icon.png'],
      manifest: {
        name: 'Mathe 6 — рабочая тетрадь',
        short_name: 'Mathe 6',
        description:
          'Математика 6 класса по немецкому учебнику: задание по-немецки, объяснение по-русски.',
        lang: 'ru',
        start_url: BASE,
        scope: BASE,
        display: 'standalone',
        background_color: '#faf9f5',
        theme_color: '#2f5ecb',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icon-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // KaTeX тянет с собой полтора десятка шрифтов — без них формулы
        // офлайн развалятся, поэтому кешируем и их.
        globPatterns: ['**/*.{js,css,html,png,svg,woff,woff2,ttf}'],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
      },
    }),
  ],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
})
