import { BaseComponent } from './BaseComponent';
import type { OptionsManager } from '../components/options/OptionsManager';
import type { Option } from '../../types/option';

export abstract class BaseButton extends BaseComponent {
  protected options: Option[];

  constructor(
    protected optionManager: OptionsManager,
    tagName: keyof HTMLElementTagNameMap,
    parent: HTMLElement,
    ...classes: string[]
  ) {
    super(tagName, parent, ...classes);
    this.options = this.optionManager.options;
    this.init();
  }

  protected abstract init(): void;
}
