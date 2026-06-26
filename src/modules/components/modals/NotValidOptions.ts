import { ElementCreator } from '../../../utils/elementCreator';
import type { OptionsManager } from '../options/OptionsManager';
import { PopUp } from '../pop-up/PopUp';
import { CancelButton } from '../buttons/option buttons/CancelButton';

export class NotValidOptions {
  protected popUp: PopUp;
  constructor(protected optionsManager: OptionsManager) {
    this.popUp = new PopUp(optionsManager);
    this.init();
  }

  protected init() {
    if (!this.popUp.popUpOverlay) return;
    // Создание модального окна внутри pop up
    const popUpModalContainer = new ElementCreator(
      'div',
      this.popUp.popUpOverlay.getElement(),
      'pop-up__modal',
      'modal',
    );
    // Предотвращаем всплытие закрывания pop up по клику на дочерние элементы
    popUpModalContainer.addEvent('click', (event) => {
      event.stopPropagation();
    });

    // Создаём подсказку валидации options
    const hintModal = new ElementCreator(
      'div',
      popUpModalContainer.getElement(),
      'modal__hint',
    );
    hintModal.setText(
      `Please add at least 2 valid options. An option is considered valid if its title is not empty and its weight is greater than 0`,
    );

    // Создаём контейнер для кнопок управления модальным окном
    const popUpControlsContainer = new ElementCreator(
      'div',
      popUpModalContainer.getElement(),
      'modal__controls',
    );
    // Кнопка "отмена" в модальном окне
    const popUpCacelButton = new CancelButton(
      this.optionsManager,
      popUpControlsContainer.getElement(),
      this.popUp.getElement(),
      'Close',
      this.popUp,
    );
  }
}
