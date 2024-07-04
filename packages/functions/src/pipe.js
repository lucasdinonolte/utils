import { compose } from './compose';

/**
 * Pipes a single value into a composition of
 * unary functions.
 *
 * @param {any} value
 * @param {...Function} fns
 * @returns {any}
 *
 * @example
 *   const add1 = x => x + 1;
 *   const double = x => x * 2;
 *
 *   pipe(2, double, add1); // => 5
 *
 *   // This is the same as
 *   add1(double(2));   // => 5
 */
export const pipe = (value, ...fns) => compose(...fns.reverse())(value);
