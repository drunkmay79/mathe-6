import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import 'katex/dist/katex.min.css'
import './index.css'
import { App } from './App'

const container = document.getElementById('root')
if (!container) throw new Error('Не найден #root в index.html')

createRoot(container).render(
  <StrictMode>
    {/*
      HashRouter, а не BrowserRouter: собранную папку dist можно открыть
      прямо с диска или флешки двойным кликом, без веб-сервера и без
      настройки перезаписи адресов на хостинге.
    */}
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
