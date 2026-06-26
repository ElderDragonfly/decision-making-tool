import { ElementCreator } from '../../utils/elementCreator';

export abstract class BaseComponent {
  protected element: ElementCreator;

  constructor(
    tagName: keyof HTMLElementTagNameMap,
    parent: HTMLElement,
    ...classes: string[]
  ) {
    this.element = new ElementCreator(tagName, parent, ...classes);
  }

  removeElement(): void {
    this.element.getElement().remove();
  }

  getElement(): HTMLElement {
    return this.element.getElement();
  }
}
