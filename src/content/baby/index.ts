import colors from './colors.json'
import letters from './letters.json'
import numbers from './numbers.json'
import animals from './animals.json'
import emotions from './emotions.json'
import type { Lesson } from '../types'

export const babyContent: Record<string, Lesson[]> = {
  colors:   colors   as Lesson[],
  letters:  letters  as Lesson[],
  numbers:  numbers  as Lesson[],
  animals:  animals  as Lesson[],
  emotions: emotions as Lesson[],
}
