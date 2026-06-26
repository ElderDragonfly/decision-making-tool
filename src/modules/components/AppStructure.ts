import { BaseComponent } from '../core/BaseComponent';
import { ElementCreator } from '../../utils/elementCreator';
import { OptionItem } from '../components/options/OptionItem';
import { OptionsManager } from './options/OptionsManager';
import { AddButton } from './buttons/option buttons/AddButton';
import { ClearButton } from './buttons/option buttons/ClearButton';
import { PasteButton } from './buttons/option buttons/PasteButton';
import { StartButton } from './buttons/option buttons/StartButton';
import { SaveButton } from './buttons/option buttons/SaveButton';
import { LoadButton } from './buttons/option buttons/LoadButton';
import { HashRouter } from './hashRouter/HashRouter';
import { BackButton } from './buttons/picker buttons/BackButton';
import { SoundButton } from './buttons/picker buttons/SoundButton';
import { StartSpin } from './buttons/picker buttons/StartSpin';
import { WheelRenderer } from './wheel/WheelRenderer';
import { WheelInput } from './inputs/Input';

export class AppStructure extends BaseComponent {
  protected optionsManager: OptionsManager;

  constructor() {
    super('div', document.body, 'app');
    this.optionsManager = new OptionsManager();
    this.createRoute();
  }

  // Проверяем сохранённый в localStorage путь или создаём новый и рендерим страницу
  protected createRoute() {
    const router = new HashRouter(
      () => this.createOptionPage(),
      () => this.createPickerPage(),
    );
  }

  // Создаём структуру страницы выбора опций
  protected createOptionPage() {
    // Создаём основной контейнер
    const appContainer = new ElementCreator(
      'div',
      this.element.getElement(),
      'options',
    );
    // Создаём контейнер для опций
    const optionItemContainer = new ElementCreator(
      'div',
      appContainer.getElement(),
      'options__list',
    );
    // Создаём опции
    this.renderOptionItems(optionItemContainer.getElement());

    // Создаём контейнер для кнопок управления опциями
    const optionControlsContainer = new ElementCreator(
      'div',
      appContainer.getElement(),
      'options__controls',
    );
    // Создаём кнопку для добавления опций
    const optionControlAddButton = new AddButton(
      this.optionsManager,
      optionControlsContainer.getElement(),
      this.renderOptionItems,
      optionItemContainer.getElement(),
    );
    // Создаём кнопку для вставки опций
    const optionControlPaste = new PasteButton(
      this.optionsManager,
      optionControlsContainer.getElement(),
      document.body,
      this.renderOptionItems,
      optionItemContainer.getElement(),
    );

    // Создаём кнопку для очищеия опций
    const optionControlClearButton = new ClearButton(
      this.optionsManager,
      optionControlsContainer.getElement(),
      this.renderOptionItems,
      optionItemContainer.getElement(),
    );

    //Создаём блок с кнопками сохранить и загрузить
    const SaveLoadContainer = new ElementCreator(
      'div',
      optionControlsContainer.getElement(),
      'options__save-load',
    );
    const saveButton = new SaveButton(
      this.optionsManager,
      SaveLoadContainer.getElement(),
    );
    const loadButton = new LoadButton(
      this.optionsManager,
      SaveLoadContainer.getElement(),
      this.renderOptionItems,
      optionItemContainer.getElement(),
    );

    // Создаём кнопку Старт
    const startButton = new StartButton(
      this.optionsManager,
      optionControlsContainer.getElement(),
    );
  }

  // Создаём структуру страницы кручения барабана
  protected createPickerPage() {
    // Создаём основной контейнер
    const appContainer = new ElementCreator(
      'div',
      this.element.getElement(),
      'picker',
    );

    // Создаём заголовок
    const title = new ElementCreator(
      'h1',
      appContainer.getElement(),
      'picker__title',
    );
    title.setText('Decision Making Tool');

    // Создаём контейнер для кнопок управления
    const pickerControlsContainer = new ElementCreator(
      'div',
      appContainer.getElement(),
      'picker__controls',
    );

    // Создаём кнопку 'вернуться'
    const backButton = new BackButton(
      this.optionsManager,
      pickerControlsContainer.getElement(),
    );
    // Создаём кнопку включения/выключения звука
    const soundButton = new SoundButton(
      this.optionsManager,
      pickerControlsContainer.getElement(),
    );
    // Создаём ввод количества вращений
    const wheelInput = new WheelInput(pickerControlsContainer.getElement());
    // Создаём заголовок - подсказку
    const helpTitle = new ElementCreator(
      'h2',
      appContainer.getElement(),
      'picker__help-title',
    );
    helpTitle.setText('PRESS START BUTTON');
    helpTitle.getElement().style.order = '2';
    // Создаём колесо выбора
    const wheel = new WheelRenderer(
      this.optionsManager,
      'div',
      appContainer.getElement(),
      helpTitle,
      soundButton,
      backButton,
      'picker__wheel',
    ); // Создаём кнопку начала вращения ПОСЛЕ создания колеса выбора, чтобы использовать его метод
    const startSpin = new StartSpin(
      this.optionsManager,
      appContainer.getElement(),
      wheel,
      wheelInput,
      wheel.options,
    );
  }

  protected renderOptionItems(parent: HTMLElement) {
    parent.replaceChildren();
    this.optionsManager.options.forEach((option, index) => {
      const optionItem = new OptionItem(
        this.optionsManager,
        option,
        this.optionsManager.options,
        'div',
        parent,
        () => this.renderOptionItems(parent),
        'options__item',
      );
    });
  }
}
