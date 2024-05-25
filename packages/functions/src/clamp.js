import { curry } from './curry';

/**
 * Clamps a number between a minimum and maximum value.
 *
 * @param {Number} min
 * @param {Number} max
 * @param {Number} value
 * @returns {Number}
 */
export const clamp = curry((min, max, value) => {
  if (min > max) {
    throw new Error(
      'min must not be greater than max in clamp(min, max, value)'
    );
  }
  return value < min ? min : value > max ? max : value;
});
