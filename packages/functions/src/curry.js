/**
 * Returns the curried version of a function.
 *
 * @param {Function} fn
 * @returns {Function}
 */
export const curry = (fn) => {
  const arity = fn.length;

  return function $curry(...args) {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }

    return fn.call(null, ...args);
  };
};
