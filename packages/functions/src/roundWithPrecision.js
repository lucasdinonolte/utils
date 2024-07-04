/**
 * Rounds a number to a specified number of decimal places.
 *
 * @param {number} num - The number to be rounded.
 * @param {number} [decimalPlaces=0] - The number of decimal places to round to (default is 0).
 * @returns {number} The rounded number.
 */
export const roundWithPrecision = (num, decimalPlaces = 0) => {
  const p = Math.pow(10, decimalPlaces);
  return Math.round(num * p) / p;
};
