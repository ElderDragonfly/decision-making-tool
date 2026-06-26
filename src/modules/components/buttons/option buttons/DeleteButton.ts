import type { Option } from '../../../../types/option';
import { BaseButton } from '../../../core/BaseButton';
import type { OptionsManager } from '../../options/OptionsManager';

export class DeleteButton extends BaseButton {
  constructor(
    protected currentOption: Option,
    protected parent: HTMLElement,
    protected optionManager: OptionsManager,
    private renderOptionItems: () => void,
  ) {
    super(optionManager, 'div', parent, 'options__button--delete', 'button');
    this.options = optionManager.options;
    this.parent = parent;
  }

  protected init() {
    this.element.setText('Delete');
    // Событие удаляет из массива options объект, удаляем элемент из DOM-дерева
    this.element.addEvent('click', () => {
      this.optionManager.removeOptionFromList(this.parent, this.currentOption);
      this.renderOptionItems();
    });
  }
}
