import { ElementCreator } from '../../../utils/elementCreator';

export class WheelInput {
  public spinNumber: number = 10;
  constructor(protected container: HTMLElement) {
    this.init();
  }

  protected init() {
    const spinInput: ElementCreator = new ElementCreator(
      'input',
      this.container,
      'picker__input',
    );

    const spinInputElement = spinInput.getElement() as HTMLInputElement;
    spinInputElement.name = 'spin_number';
    // Устанавливаем значение по умолчанию
    spinInputElement.value = '10';
    spinInputElement.placeholder = '5-20';

    // Фильтруем ввод для количества вращений, чтобы туда попадали только цифры
    spinInput.addEvent('input', (event: Event) => {
      (event.target as HTMLInputElement).value = (
        event.target as HTMLInputElement
      ).value.replace(/[^0-9]/g, '');
      if ((event.target as HTMLInputElement).value) {
        this.spinNumber = parseInt((event.target as HTMLInputElement).value);
      }
    });

    spinInput.addEvent('blur', (event: Event) => {
      // Задаём границы количества вращений
      const input = event.target as HTMLInputElement;
      const value = Number(input.value);
      if ((value && value < 5) || !value) {
        (event.target as HTMLInputElement).value = '5';
        this.spinNumber = 5;
      }
      if (value && value > 20) {
        (event.target as HTMLInputElement).value = '20';
        this.spinNumber = 20;
      }
    });
  }
}
