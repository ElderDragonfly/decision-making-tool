export class ElementCreator {
  private element: HTMLElement;
  private classes: string[];
  private events: {}[];

  constructor(
    tagName: keyof HTMLElementTagNameMap,
    parent: HTMLElement,
    ...classes: string[]
  ) {
    this.element = document.createElement(tagName);
    this.classes = classes;
    this.events = [];

    parent.appendChild(this.element);
    if (classes.length > 0) {
      this.addClasses(...classes);
    }
  }

  addClasses(...classes: string[]) {
    this.classes.push(...classes);
    this.element.classList.add(...classes);
    return this;
  }

  addEvent(events: string | string[], callback: EventListener) {
    if (typeof events === 'string') {
      events = [events];
    }
    events.forEach((event) => {
      this.events.push(event);
      this.element.addEventListener(event, callback);
    });
    return this;
  }

  setText(content: string): ElementCreator {
    this.element.textContent = content;
    return this;
  }

  getElement(): HTMLElement {
    return this.element;
  }
}
