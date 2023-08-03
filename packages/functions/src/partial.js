/**
 * Partially applies a function
 *
 * @param {Function} fn
 * @param {...any} args
 * @returns {Function}
 *
 * @example
 * const add = (a, b) => a + b;
 * const add1 = partial(add, 1);
 * add1(2); // => 3
 */
export const partial = (fn, ...args) => {
  const arity = fn.length;

  return (...rest) => {
    if (args.length + rest.length >= arity) {
      return fn.call(null, ...args, ...rest);
    }

    return partial(fn, ...[...args, ...rest]);
  };
};
