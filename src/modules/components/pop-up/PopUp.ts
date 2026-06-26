import { BaseComponent } from '../../core/BaseComponent';
import { ElementCreator } from '../../../utils/elementCreator';
import type { OptionsManager } from '../options/OptionsManager';

export class PopUp extends BaseComponent {
  public popUpOverlay?: ElementCreator;
  constructor(protected optionsManager: OptionsManager) {
    super('div', document.body, 'pop-up');
    this.init();
  }

  protected init() {
    this.popUpOverlay = new ElementCreator(
      'div',
      this.getElement(),
      'pop-up__overlay',
    );
    // Добавляем body специальный класс, чтобы нельзя было скроллить
    document.querySelector('body')?.classList.add('body-modal');
    this.popUpOverlay.addEvent('click', () => {
      this.closePopUp();
    });
  }

  public closePopUp() {
    // Событие закрытия pop up
    this.removeElement();
    document.querySelector('body')?.classList.remove('body-modal');
  }
}
