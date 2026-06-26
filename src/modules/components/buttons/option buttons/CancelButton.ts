import { BaseButton } from '../../../core/BaseButton';
import type { OptionsManager } from '../../options/OptionsManager';
import type { PopUp } from '../../pop-up/PopUp';

export class CancelButton extends BaseButton {
  constructor(
    protected optionManager: OptionsManager,
    parent: HTMLElement,
    protected replaceChildrenThisElement: HTMLElement,
    protected buttonText: string,
    protected popUp: PopUp,
  ) {
    super(
      optionManager,
      'div',
      parent,
      'modal__button--cancel',
      'modal__button',
      'button',
    );
    this.element.setText(`${this.buttonText}`);
  }

  protected init() {
    this.element.addEvent('click', () => {
      this.popUp.closePopUp();
    });
  }
}
