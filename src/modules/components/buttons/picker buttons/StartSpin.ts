import { BaseButton } from '../../../core/BaseButton';
import type { WheelInput } from '../../inputs/Input';
import type { OptionsManager } from '../../options/OptionsManager';
import type { WheelRenderer } from '../../wheel/WheelRenderer';
import { weightedRandomSelector } from '../../../../utils/weightedRandomSelector';
import type { Option } from '../../../../types/option';

export class StartSpin extends BaseButton {
  constructor(
    protected optionManager: OptionsManager,
    parent: HTMLElement,
    protected wheelRenderer: WheelRenderer,
    protected wheelInput: WheelInput,
    protected options: Option[],
  ) {
    super(optionManager, 'div', parent, 'picker__button--start', 'button');
  }

  protected init() {
    // this.element.setText('Start spinning');
    this.element.addEvent('click', () => {
      // Делаем невозможным кликнуть по кнопке во время вращения
      this.element.addClasses('running');
      this.wheelRenderer.resetAndRedraw();
      const winnerAngle = weightedRandomSelector(this.options);
      if (winnerAngle) {
        this.wheelRenderer.startRotationAnimation(
          this.wheelInput.spinNumber,
          winnerAngle,
        );
      }
    });
  }
}
