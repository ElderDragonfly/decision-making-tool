export class HashRouter {
  constructor(
    protected createOptionPage: () => void,
    protected createPickerPage: () => void,
  ) {
    this.init();
  }

  protected init() {
    window.addEventListener('hashchange', () => this.createPage());
    this.checkLocalStorageRoute();
    this.createPage();
  }

  // Проверка пути в localStorage или создание нового пути
  protected checkLocalStorageRoute() {
    const storedRoute = localStorage.getItem('route');
    if (storedRoute === '#/options' || storedRoute === '#/picker') {
      location.hash = storedRoute;
    } else {
      location.hash = '/options';
    }
  }

  // В зависимости от пути рендерим страницу
  protected createPage() {
    // Записываем текущий путь в localStorage
    localStorage.route = location.hash;
    // Очищаем контейнер приложения перед созданием нового
    document.querySelector('.app')?.replaceChildren();
    if (location.hash === '#/options') this.createOptionPage();
    if (location.hash === '#/picker') this.createPickerPage();
  }
}
