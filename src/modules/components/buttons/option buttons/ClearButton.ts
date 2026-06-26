import { BaseButton } from '../../../core/BaseButton';
import type { OptionsManager } from '../../options/OptionsManager';

export class ClearButton extends BaseButton {
  constructor(
    protected optionsManager: OptionsManager,
    parent: HTMLElement,
    protected renderOptionItems: (itemsParent: HTMLElement) => void,
    protected itemsParent: HTMLElement,
  ) {
    super(optionsManager, 'div', parent, 'options__button--clear', 'button');
  }

  protected init() {
    this.element.setText('Clear list');
    // Событие очищения опций
    this.element.addEvent('click', () => {
      this.optionsManager.resetOptions();
      this.renderOptionItems(this.itemsParent);
    });
  }
}
