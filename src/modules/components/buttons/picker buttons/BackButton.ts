import { Option } from '../../../../types/option';
import { BaseButton } from '../../../core/BaseButton';
import type { OptionsManager } from '../../options/OptionsManager';

export class BackButton extends BaseButton {
  public clickBack: boolean = false;
  constructor(
    protected optionManager: OptionsManager,
    parent: HTMLElement,
  ) {
    super(optionManager, 'div', parent, 'picker__button--back', 'button');
  }

  protected init() {
    this.element.addEvent('click', () => {
      location.hash = '#/options';
      this.clickBack = true;
    });
  }
}
