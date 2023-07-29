/**
 * Returns the first element of an array or string.
 *
 * @param {string|Array<T>} input
 * @returns {string|T|undefined}
 */
export const head = (input) => {
  if (typeof input === 'string') {
    return input[0] || '';
  }

  return input[0];
}
