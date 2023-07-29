import { drop } from './drop';

/**
 * Returns all but the first element of input
 *
 * @param {string|Array<T>} input
 * @returns {string|Array<T>}
 */
export const tail = (input) => drop(1, input);
