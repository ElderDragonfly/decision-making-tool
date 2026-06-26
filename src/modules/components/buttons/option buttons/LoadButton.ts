import { ElementCreator } from '../../../../utils/elementCreator';
import { BaseButton } from '../../../core/BaseButton';
import type { OptionsManager } from '../../options/OptionsManager';

export class LoadButton extends BaseButton {
  constructor(
    protected optionsManager: OptionsManager,
    parent: HTMLElement,
    protected renderOptionItems: (itemsParent: HTMLElement) => void,
    protected itemsParent: HTMLElement,
  ) {
    super(optionsManager, 'div', parent, 'options__button--load', 'button');
  }

  protected init() {
    this.element.setText('Load list from file');
    this.element.addEvent('click', () => {
      // Создаём не отображаемы на странице элемент input с типом file
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      input.multiple = false;

      input.addEventListener('change', () => {
        // Input.file возвращает нам массив выбранного пользователем или null, поэтому выбираем первый элемент массива если он есть
        const file = input.files?.[0];
        // Если ничего не выбранно, ничего не происходит
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const fileContent = event.target?.result as string;
            const parseOptions = JSON.parse(fileContent);

            // Обновляем options
            this.optionsManager.options = parseOptions;
            // Обновляем Local Storage
            this.optionManager.writeDataToStorage(parseOptions);
            // Отрисовываем блок опций заново
            this.renderOptionItems(this.itemsParent);
          } catch (error) {
            console.log('Произошла ошибка');
          }
        };
        reader.readAsText(file);
      });
      // Виртуально нажимаем на него
      input.click();
    });
  }
}
