import { BaseButton } from '../../../core/BaseButton';
import type { OptionsManager } from '../../options/OptionsManager';

export class AddButton extends BaseButton {
  constructor(
    protected optionsManager: OptionsManager,
    parent: HTMLElement,
    protected renderOptionItems: (itemsParent: HTMLElement) => void,
    protected itemsParent: HTMLElement,
  ) {
    super(optionsManager, 'div', parent, 'options__button--add', 'button');
  }

  protected init() {
    this.element.setText('Add Option');
    // Событие добавление option
    this.element.addEvent('click', () => {
      this.optionsManager.addOption();
      this.renderOptionItems(this.itemsParent);
    });
  }
}
