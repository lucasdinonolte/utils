/**
 * Check if a number is an integer, defaulting to the
 * runtime’s internal implementatoin if available.
 *
 * @param {any} n
 * @returns {boolean}
 */
export const isInteger =
  Number.isInteger ||
  function(n) {
    return n << 0 === n;
  };
