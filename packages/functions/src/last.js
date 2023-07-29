/**
 * Returns the last element of an array or string.
 *
 * @param {string|Array<T>} input
 * @returns {string|T|undefined}
 */
export const last = (input) => {
  if (typeof input === 'string') {
    return input[input.length - 1] || '';
  }

  return input[input.length - 1];
}
