import type { Option } from '../types/option';
import { randomInt } from './randomizer';

// Выбираем опцию случайно с учётом её веса
export function weightedRandomSelector(options: Option[]) {
  // Общий вес всех опций
  let totalWeight = options.reduce(
    (accumulator, obj) => accumulator + obj.weight,
    0,
  );
  const result = randomInt(1, totalWeight);
  let acc = 0;
  for (let i = 0; i < options.length; i++) {
    if (options[i].weight + acc >= result) {
      // return options[i].midAngle;
      // Возвращаем случайный угол в пределах сектора победителя
      try {
        return randomInt(options[i].startAngle, options[i].endAngle);
      } catch {
        console.log('Ошибка в рандомайзере');
      }
    }
    acc += options[i].weight;
  }
}
