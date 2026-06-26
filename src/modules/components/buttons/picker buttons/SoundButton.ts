import { BaseButton } from '../../../core/BaseButton';
import type { OptionsManager } from '../../options/OptionsManager';
import sound from '../../../../assets/audio/звук_финиша.mp3';

export class SoundButton extends BaseButton {
  protected soundOn: boolean = true;
  public audio: HTMLAudioElement;
  constructor(
    protected optionManager: OptionsManager,
    parent: HTMLElement,
  ) {
    super(optionManager, 'div', parent, 'picker__button--sound', 'button');
    this.audio = new Audio(sound);
    this.audio.volume = 0.25;
  }

  protected init(): void {
    this.element.addEvent('click', () => {
      this.soundOn = !this.soundOn;
      this.getElement().classList.toggle('picker__button--sound-off');
    });
  }

  public playSound() {
    if (this.soundOn) {
      this.audio.play();
    }
  }
}
