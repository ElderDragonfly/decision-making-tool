import { ElementCreator } from '../../../utils/elementCreator';
import type { OptionsManager } from '../options/OptionsManager';
import { PopUp } from '../pop-up/PopUp';
import { ConfirmButton } from '../buttons/option buttons/ConfirmButton';
import { CancelButton } from '../buttons/option buttons/CancelButton';

export class PasteModal {
  protected popUp: PopUp;
  constructor(
    protected optionsManager: OptionsManager,
    protected renderOptionItems: (itemsParent: HTMLElement) => void,
    protected itemsParent: HTMLElement,
  ) {
    this.popUp = new PopUp(this.optionsManager);
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
    // Создаём поле ввода модального окна
    const popUpInput = new ElementCreator(
      'textarea',
      popUpModalContainer.getElement(),
      'modal__textarea',
    );
    const popUpInputElement = popUpInput.getElement() as HTMLTextAreaElement;
    popUpInputElement.name = 'modal-textarea';
    // popUpInputElement.cols = 64;
    // popUpInputElement.rows = 12;
    popUpInputElement.placeholder = `Paste a list of new options in a CSV-like format:
    title, 1                  -> | title                  | 1 |
    title with whitespace, 2  -> | title with whitespace  | 2 |
    title , with , commas, 3  -> | title , with , commas  | 3 |
    title with "quotes", 4    -> | title with "quotes";   | 4 |`;
    // Создаём контейнер для кнопок управления модальным окном
    const popUpControlsContainer = new ElementCreator(
      'div',
      popUpModalContainer.getElement(),
      'modal__controls',
    );
    // Кнопка "принять" в модальном окне
    const popUpConfirmButton = new ConfirmButton(
      this.optionsManager,
      popUpControlsContainer.getElement(),
      this.popUp.getElement(),
      popUpInput.getElement() as HTMLInputElement,
      this.renderOptionItems,
      this.itemsParent,
    );
    // Кнопка "отмена" в модальном окне
    const popUpCacelButton = new CancelButton(
      this.optionsManager,
      popUpControlsContainer.getElement(),
      this.popUp.getElement(),
      'Cancel',
      this.popUp,
    );
  }
}
