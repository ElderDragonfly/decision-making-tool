import { BaseButton } from '../../../core/BaseButton';
import type { OptionsManager } from '../../options/OptionsManager';

export class ConfirmButton extends BaseButton {
  constructor(
    protected optionsManager: OptionsManager,
    parent: HTMLElement,
    protected popUp: HTMLElement,
    protected popUpInput: HTMLInputElement,
    protected renderOptionItems: (itemsParent: HTMLElement) => void,
    protected itemsParent: HTMLElement,
  ) {
    super(
      optionsManager,
      'div',
      parent,
      'modal__button--confirm',
      'modal__button',
      'button',
    );
  }

  protected init() {
    this.element.setText('Confirm');
    // Событие проверяет введённое в input и рендерит,если соответствует требованиям
    this.element.addEvent('click', () => {
      // Введённое в поле value
      const modalInputValue = this.popUpInput.value;
      // Собираем данные в массив разделяя по переносу строки
      const modalInputValueArray = modalInputValue.split(/\r\n|\n|\r/);
      modalInputValueArray.forEach((element) => {
        // Проверяем, что есть запятая и значение после неё числовое
        if (
          element.includes(',') &&
          Number.isFinite(parseInt(element.slice(element.lastIndexOf(',') + 1)))
        ) {
          this.getOptionsFromValue(element, ',');
        } else console.log('please, write in correct format!');
      });
    });
  }

  protected getOptionsFromValue(value: string, separator: string) {
    // Вырезаем подстроку, которая будет title от начала до разделителя
    const titleSubString = value.slice(0, value.lastIndexOf(separator));
    // Вырезаем подстроку, которая будет weight от начала до разделителя
    const weightSubString = parseInt(
      value.slice(value.lastIndexOf(separator) + 1),
    );
    this.optionsManager.addOption(titleSubString, weightSubString);
    this.popUp.remove();
    this.renderOptionItems(this.itemsParent);
  }
}

function getValueFromCSVFormat() {}
