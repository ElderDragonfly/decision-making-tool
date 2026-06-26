import type { Option } from '../../../../types/option';
import { BaseButton } from '../../../core/BaseButton';
import { NotValidOptions } from '../../modals/NotValidOptions';
import type { OptionsManager } from '../../options/OptionsManager';

export class StartButton extends BaseButton {
  constructor(
    protected optionManager: OptionsManager,
    parent: HTMLElement,
  ) {
    super(optionManager, 'div', parent, 'options__button--start', 'button');
  }

  protected init() {
    this.element.setText('Start');
    this.element.addEvent('click', () => {
      if (this.checkValidOptions(this.optionManager.options)) {
        const hintModal = new NotValidOptions(this.optionManager);
      } else {
        location.hash = '/picker';
      }
    });
  }

  protected checkValidOptions(options: Option[]) {
    if (options.length < 2) return true;
    for (const option of options) {
      if (!option.title || !option.weight) return true;
    }
  }
}
