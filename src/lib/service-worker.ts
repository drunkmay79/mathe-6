/**
 * Обновление приложения на планшете.
 *
 * Тетрадь работает офлайн: все файлы лежат в кеше, и браузер берёт их оттуда,
 * не спрашивая сервер. Обратная сторона — после публикации новой версии
 * планшет ещё какое-то время показывает старую. Выглядит это хуже всего:
 * тему добавили, а на экране ничего не изменилось.
 *
 * Поэтому: при каждом открытии тетради спрашиваем сервер, нет ли новой версии,
 * и как только она вступила в силу — перезагружаем страницу сами.
 */
export function watchForUpdates(): void {
  if (!('serviceWorker' in navigator)) return

  // На самом первом визите управление появляется впервые — это не обновление,
  // перезагружать нечего.
  const hadController = Boolean(navigator.serviceWorker.controller)
  let reloading = false

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!hadController || reloading) return
    reloading = true
    window.location.reload()
  })

  void navigator.serviceWorker.ready.then((registration) => {
    const check = () => {
      // Проверяем только когда тетрадь на экране: фоновые вкладки не трогаем.
      if (document.visibilityState === 'visible') void registration.update()
    }
    document.addEventListener('visibilitychange', check)
    check()
  })
}
