import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import 'katex/dist/katex.min.css'
import './index.css'
import { App } from './App'
import { watchForUpdates } from './lib/service-worker'

watchForUpdates()

const container = document.getElementById('root')
if (!container) throw new Error('Не найден #root в index.html')

createRoot(container).render(
  <StrictMode>
    {/*
      HashRouter, а не BrowserRouter: адреса вида #/lesson/… не требуют
      от хостинга правил перезаписи, поэтому тетрадь работает на любом
      статическом хостинге без единой настройки.
    */}
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
