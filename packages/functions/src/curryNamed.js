/**
 * Curry a function with named parameters.
 *
 * @param {Function} fn
 * @param {Array<string>} names
 * @returns {Function}
 * @example
 * const add = curryNamed({ a, b }) => a + b;
 * const add10 = add({ b: 10 });
 * add10({ a: 5 }); // => 15
 */
export const curryNamed = (fn, names) => {
  const arity = names.length;

  function $nextCurriedNamed(prevArgs) {
    return function $curryNamed(nextArgs = {}) {
      const allArgs = { ...prevArgs, ...nextArgs };

      if (Object.keys(allArgs).length >= arity) {
        return fn.call(null, allArgs);
      }

      return $nextCurriedNamed(allArgs);
    };
  };

  return $nextCurriedNamed({});
};
