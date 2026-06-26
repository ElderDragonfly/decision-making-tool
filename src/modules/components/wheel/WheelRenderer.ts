import { BaseComponent } from '../../core/BaseComponent';
import { ElementCreator } from '../../../utils/elementCreator';
import type { OptionsManager } from '../options/OptionsManager';
import { randomInt } from '../../../utils/randomizer';
import type { Option } from '../../../types/option';
import type { SoundButton } from '../buttons/picker buttons/SoundButton';
import type { BackButton } from '../buttons/picker buttons/BackButton';

export class WheelRenderer extends BaseComponent {
  private ctx?: CanvasRenderingContext2D;
  private sectorColors: string[] = [];
  public options: Option[];
  private canvasLineWidth: number = 3;
  constructor(
    protected optionManager: OptionsManager,
    tagName: keyof HTMLElementTagNameMap,
    protected parent: HTMLElement,
    protected helpTitle: ElementCreator,
    protected soundButton: SoundButton,
    protected backButton: BackButton,
    ...classes: string[]
  ) {
    super(tagName, parent, ...classes);
    this.options = [...this.optionManager.options];
    this.init();
    this.helpTitle = helpTitle;
  }

  protected init() {
    this.getElement().style.order = '100';
    this.createCanvas();
    this.drawCircle();
  }

  protected createCanvas() {
    // Создаём холст
    const canvasElement = new ElementCreator(
      'canvas',
      this.getElement(),
      'picker__canvas',
    );
    // Уточняем, что холст это canvas элемент и получаем кисть
    const canvas = canvasElement.getElement() as HTMLCanvasElement;
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    // Кисть должна существовать
    if (ctx) {
      this.ctx = ctx;
    }
  }

  protected drawCircle(angle: number = -Math.PI / 2) {
    // Проверяем, существует ли холст
    if (!this.ctx) return;
    const ctx = this.ctx;

    // Высчитываем положение центра, радиус с отступом
    const { width, height } = this.ctx.canvas;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 15;

    // Высчитываем общий вес всех опций
    let totalWeight = this.optionManager.options.reduce(
      (accumulator, obj) => accumulator + obj.weight,
      0,
    );
    // Генерируем случайные цвета по количеству секторов только один раз
    if (this.sectorColors.length === 0) {
      this.sectorColors = this.optionManager.options.map(() => {
        return `rgba(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
      });
    }
    // Накопитель для начальной позиции сектора
    let currentAngle = angle;
    // Проходим по всем опциям (изменено: проходим по опциям копии) и отрисовываем их
    this.options.forEach((option, index) => {
      // Вычисляем угол для каждого сектора
      const fraction = option.weight / totalWeight;
      const segmentAngle = fraction * 2 * Math.PI;
      const startAngle = currentAngle;
      const endAngle = startAngle + segmentAngle;
      currentAngle = endAngle;
      // Вычисляем угол середины сектора для последующего размещения там надписи
      const midAngle = (startAngle + endAngle) / 2;
      // Заполняем копию массива соответствующим углом середины сектора, чтобы использовать его при вращении колеса
      // Так же сохраняем в options начало угла сектора и конец угла сектора для вывода названия текущего сектора
      option.midAngle = midAngle;
      option.startAngle = startAngle;
      option.endAngle = endAngle;

      // Берём цвет из массива
      const color = this.sectorColors[index];
      // Определяем процент каждой опции
      const percent = (fraction * 100).toFixed(1);
      // Текст подписи
      let text = `${option.title}`;
      let textPercent = `${percent}%`;

      // Рисуем сектор
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle, false);
      ctx.lineTo(centerX, centerY);
      ctx.closePath();

      ctx.lineWidth = this.canvasLineWidth;
      ctx.strokeStyle = '#000';
      ctx.stroke();

      ctx.fillStyle = color;
      ctx.fill();

      // Рисуем текст

      // Сохраняет состояние контекста
      ctx.save();
      // Переносим систему координат в центр круга
      ctx.translate(centerX, centerY);
      // Поворачиваем ось Х в направлении середины сектора
      ctx.rotate(midAngle);
      // Настройки текста
      ctx.font = '14px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      // Позиция, с которой будет начинаться текст
      const textDistance = radius * 0.2;
      // Максимально допустимая длинна текста
      const maxTextWidth = radius * 0.7;
      // Измеряем ширину текста
      let textWidth = ctx.measureText(text).width;
      // Обрезаем текст, если он выше максимально допустимой, и добавляем многоточие
      if (textWidth > maxTextWidth) {
        while (
          text.length > 0 &&
          ctx.measureText(text + '...').width > maxTextWidth
        ) {
          text = text.slice(0, -1);
        }
        text += '...';
      }
      // Отрисовка самой надписи
      ctx.fillText(text, textDistance, 0);
      // Восстанавливаем состояние контекста, чтобы следующий сектор рисовался правильно
      ctx.restore();
    });
    // Рисуем центральный круг
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius / 10, 0, Math.PI * 2);
    ctx.closePath();

    ctx.lineWidth = this.canvasLineWidth;
    ctx.strokeStyle = '#000';
    ctx.stroke();

    ctx.fillStyle = '#9ca069';
    ctx.fill();
    // Рисуем стрелочку
    ctx.beginPath();
    ctx.moveTo(centerX + 1, centerY * 0.18);
    ctx.lineTo(centerX - 15, 2);
    ctx.lineTo(centerX, centerY * 0.03);
    ctx.lineTo(centerX + 15, 2);
    ctx.lineTo(centerX + 1, centerY * 0.18);
    ctx.closePath();

    ctx.lineWidth = this.canvasLineWidth;
    ctx.strokeStyle = '#000';
    ctx.stroke();

    ctx.fillStyle = '#9ca069';
    ctx.fill();
  }

  // Функция для анимации вращения колеса, принимает в себя количество вращений
  public startRotationAnimation(spinNumber: number, winnerAngle: number) {
    // Проверяем, что холст существует
    if (!this.ctx) return;
    let ctx = this.ctx;
    let startTime: number | null = null;
    const duration = spinNumber * 1000;

    const fullTurns = Math.PI * 2 * spinNumber - Math.PI / 2;
    const finalAngle = fullTurns - winnerAngle;

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    // const totalRotation = Math.PI * 2 * spinNumber - winnerAngle - Math.PI / 2;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapset = timestamp - startTime;

      const progress = Math.min(elapset / duration, 1);

      const eased = easeInOutCubic(progress);

      const angle = finalAngle * eased;

      // Выводим сектор под стрелкой на экран
      const current = this.getSectorByAngle();
      if (current) this.helpTitle.setText(current?.title);

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      // Рисуем колесо, повернув его на текущий угол, - Math.PI / 2 компенсирует поворот, чтобы колесо начиналось с 12.00
      this.drawCircle(angle - Math.PI / 2);
      // Если анимация не завершена, запрашиваем ещё один кадр
      if (progress < 1) {
        // Звук начинает проигрываться незадолго до конца вращения колеса
        // if ((progress > .85) && this.soundButton.audio.paused) {
        //   this.soundButton.playSound();
        // }
        requestAnimationFrame(animate);
      } else {
        document
          // Меняем класс у кнопки запускающей вращение на тот, что делает её кликабельной
          .querySelector('.picker__button--start')
          ?.classList.remove('running');
        // Проигрываем звук, если не было клика по кнопке "вернуться"
        if (!this.backButton.clickBack) {
          this.soundButton.playSound();
        }
      }
    };
    // Запускаем функцию
    requestAnimationFrame(animate);
  }

  protected normalize(angle: number): number {
    const twoPi = Math.PI * 2;
    return ((angle % twoPi) + twoPi) % twoPi;
  }

  protected getSectorByAngle() {
    const pointer = -Math.PI / 2;

    return this.options.find((option) => {
      const start = this.normalize(option.startAngle!);
      const end = this.normalize(option.endAngle!);
      const p = this.normalize(pointer);

      if (start > end) {
        return p >= start || p < end;
      }
      return p >= start && p < end;
    });
  }

  // Заново отрисовываем колесо перед каждым его запуском
  public resetAndRedraw() {
    this.ctx?.clearRect(0, 0, 400, 400);
    this.drawCircle();
  }
}
