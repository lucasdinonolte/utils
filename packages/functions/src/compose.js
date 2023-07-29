/**
 * Composes a list of unary functions from right to left.
 *
 * @param {...Function} fns ths functions to compose
 * @returns {Function} the composed function
 * @example
 *   const add1 = x => x + 1;
 *   const double = x => x * 2;
 *
 *   const add1ThenDouble = compose(double, add1);
 *
 *   add1ThenDouble(2); // => 6
 *
 *   // This is the same as
 *   double(add1(2));   // => 6
 */
export const compose =
  (...fns) =>
    (...args) =>
      fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];
