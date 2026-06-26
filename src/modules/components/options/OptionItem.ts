import { BaseComponent } from '../../core/BaseComponent';
import type { Option } from '../../../types/option';
import { ElementCreator } from '../../../utils/elementCreator';
import { DeleteButton } from '../buttons/option buttons/DeleteButton';
import type { OptionsManager } from './OptionsManager';

export class OptionItem extends BaseComponent {
  constructor(
    protected optionManager: OptionsManager,
    protected currentOption: Option,
    protected options: Option[],
    tagName: keyof HTMLElementTagNameMap,
    parent: HTMLElement,
    private renderOptionItems: () => void,
    ...classes: string[]
  ) {
    super(tagName, parent, ...classes);
    this.optionManager = optionManager;
    this.currentOption = currentOption;
    this.options = options;
    this.init();
  }

  protected init() {
    this.renderOption(this.currentOption);
  }

  protected renderOption(option: Option) {
    // Создаём элемент содержащий ID в элементе option item
    const optionItemIdBox = new ElementCreator(
      'div',
      this.element.getElement(),
      'options__id',
    );
    optionItemIdBox.setText(option.id);
    // Создаём поле ввода опции
    const optionItemInputTitle = new ElementCreator(
      'input',
      this.element.getElement(),
      'options__input--title',
      'options__input',
    );
    const optionItemInputTitleElement =
      optionItemInputTitle.getElement() as HTMLInputElement;
    optionItemInputTitleElement.name = 'input_title';
    optionItemInputTitleElement.value = this.currentOption.title;
    // При изменении поля ввода title всё записывается в LocalStorage
    optionItemInputTitle.addEvent('input', (event: Event) =>
      this.optionManager.writeInputValueToStorage(
        event,
        this.currentOption,
        'title',
      ),
    );
    // Создаём поле ввода веса опции
    const optionItemInputWeight = new ElementCreator(
      'input',
      this.element.getElement(),
      'options__input--weight',
      'options__input',
    );
    const optionItemInputWeightElement =
      optionItemInputWeight.getElement() as HTMLInputElement;
    optionItemInputWeightElement.value = this.currentOption.weight.toString();
    optionItemInputWeightElement.name = 'input_weight';
    // При изменении поля ввода weight символ фильтруется, и, если это число, записывается в LocalStorage
    optionItemInputWeight.addEvent('input', (event: Event) =>
      this.optionManager.writeInputValueToStorage(
        event,
        this.currentOption,
        'weight',
      ),
    );
    // Создаём кнопку отмены
    const optionItemDeleteButton = new DeleteButton(
      this.currentOption,
      this.element.getElement(),
      this.optionManager,
      this.renderOptionItems,
    );
  }
}
