import { BaseButton } from '../../../core/BaseButton';
import type { OptionsManager } from '../../options/OptionsManager';

export class SaveButton extends BaseButton {
  constructor(
    protected optionsManager: OptionsManager,
    parent: HTMLElement,
  ) {
    super(optionsManager, 'div', parent, 'options__button--save', 'button');
  }

  protected init() {
    this.element.setText('Save list to file');
    this.element.addEvent('click', () => {
      // Создаём переменную с опциями в формате JSON
      const optionsJson = JSON.stringify(this.optionsManager.options);
      // Создаём виртуальный файл
      const blob = new Blob([optionsJson], { type: 'application/json' });
      // Создаём временную ссылку
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      // Вместо клика по ссылке происходит скачивание файла
      a.download = 'options.json';
      // Эмулируем клик по ссылке
      a.click();
      // Чистим память
      URL.revokeObjectURL(url);
    });
  }
}
