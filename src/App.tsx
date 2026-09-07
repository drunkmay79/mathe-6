import { Link, NavLink, Route, Routes } from 'react-router-dom'
import { GlossaryPage } from './pages/GlossaryPage'
import { HomePage } from './pages/HomePage'
import { LessonPage } from './pages/LessonPage'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-3 py-1.5 text-sm transition ${
    isActive ? 'bg-slate-900 text-white' : 'hover:bg-slate-100'
  }`

export function App() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
      <nav className="mb-8 flex items-center gap-2">
        <Link to="/" className="mr-auto font-semibold">
          Mathe&nbsp;6
        </Link>
        <NavLink to="/" end className={navLinkClass}>
          Оглавление
        </NavLink>
        <NavLink to="/glossar" className={navLinkClass}>
          Словарь
        </NavLink>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lesson/:lessonId" element={<LessonPage />} />
          <Route path="/glossar" element={<GlossaryPage />} />
          <Route
            path="*"
            element={
              <p>
                Страница не найдена.{' '}
                <Link to="/" className="text-accent underline underline-offset-2">
                  К оглавлению
                </Link>
              </p>
            }
          />
        </Routes>
      </main>

      <footer className="mt-16 border-t border-slate-200 pt-6 text-sm text-ink-soft">
        Прогресс хранится только в этом браузере, на этом компьютере.
      </footer>
    </div>
  )
}
