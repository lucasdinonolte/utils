import { compose } from "./compose"

/**
 * Composes a list of unary functions from left to right.
 *
 * @param {...Function} fns ths functions to compose
 * @returns {Function} the composed function
 * @example
 *   const add1 = x => x + 1;
 *   const double = x => x * 2;
 *
 *   const add1ThenDouble = flow(double, add1);
 *
 *   doubleThenAdd1(2); // => 5
 *
 *   // This is the same as
 *   add1(double(2));   // => 5
 */
export const flow = (...fns) => compose(...fns.reverse()); 
