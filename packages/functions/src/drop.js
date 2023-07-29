/**
 * Removes the first n elements from a string or array.
 *
 * @param {number} n
 * @param {string|Array<T>} input
 * @returns {string|Array<T>}
 */
export const drop = (n, input = null) => {
  if (input === null) return (_input) => drop(n, _input);

  return input.slice(n > 0 ? n : 0);
};
