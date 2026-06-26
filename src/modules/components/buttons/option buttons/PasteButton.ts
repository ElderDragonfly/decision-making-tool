import { BaseButton } from '../../../core/BaseButton';
import { PasteModal } from '../../modals/PasteModal';
import type { OptionsManager } from '../../options/OptionsManager';

export class PasteButton extends BaseButton {
  constructor(
    protected optionManager: OptionsManager,
    parent: HTMLElement,
    protected popUpParent: HTMLElement,
    protected renderOptionItems: (itemsParent: HTMLElement) => void,
    protected itemsParent: HTMLElement,
  ) {
    super(
      optionManager,
      'div',
      parent,
      'options__button--paste',
      'options__button',
      'button',
    );
  }

  protected init() {
    this.element.setText('Paste list');
    this.element.addEvent('click', () => {
      new PasteModal(
        this.optionManager,
        this.renderOptionItems,
        this.itemsParent,
      );
    });
  }
}
