import type { Option } from '../../../types/option';

export class OptionsManager {
  public options: Option[];
  constructor() {
    this.options = this.initOptions();
  }

  // Проверяем, если ли в LocalStorage options, если нет, создаём список
  private initOptions() {
    const storedOptions = localStorage.getItem('options');
    if (storedOptions && JSON.parse(storedOptions)) {
      return JSON.parse(storedOptions);
    }
    const newOptions = [
      { id: '#1', title: '', weight: 1, startAngle: 0, endAngle: 0 },
      { id: '#2', title: '', weight: 1, startAngle: 0, endAngle: 0 },
      { id: '#3', title: '', weight: 1, startAngle: 0, endAngle: 0 },
    ];
    return newOptions;
  }
  // Записывает массив options в localStorage
  public writeDataToStorage(data: Option[]) {
    localStorage.setItem('options', JSON.stringify(data));
  }
  // Записываем данные при изменении полей ввода в options
  public writeInputValueToStorage(
    event: Event,
    currentOption: Option,
    input: 'title' | 'weight',
  ) {
    if (input === 'title') {
      currentOption.title = (event.target as HTMLInputElement).value;
      this.writeDataToStorage(this.options);
    } else if (input === 'weight') {
      let inputOptionWeightData = (
        event.target as HTMLInputElement
      ).value.replace(/[^0-9]/g, '');
      (event.target as HTMLInputElement).value = inputOptionWeightData;
      currentOption.weight = +inputOptionWeightData;
      this.writeDataToStorage(this.options);
    }
  }

  // Удаляем из массива options объект
  public removeOptionFromList(parent: HTMLElement, currentOption: Option) {
    this.options = this.options.filter((item) => currentOption.id != item.id);
    this.writeDataToStorage(this.options);
  }

  // Добавляем пустую опцию в массив options: Option[]
  public addOption(title: string = '', optionValue: number = 1) {
    let nextId: number = 1;
    if (this.options.length !== 0) {
      nextId = +this.options[this.options.length - 1].id.replace(/[^0-9]/g, '');
    }
    this.options.push({
      id: `#${++nextId}`,
      title: `${title}`,
      weight: optionValue,
      startAngle: 0,
      endAngle: 0,
    });
    this.writeDataToStorage(this.options);
  }

  // Сброс массива до минимального
  public resetOptions() {
    this.options = [
      { id: '#1', title: '', weight: 1, startAngle: 0, endAngle: 0 },
      { id: '#2', title: '', weight: 1, startAngle: 0, endAngle: 0 },
    ];
    this.writeDataToStorage(this.options);
  }
}
