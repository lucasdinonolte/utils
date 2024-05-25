/**
 * Create a custom matcher, discriminating an object
 * based on a specified keys. Useful when working with
 * algebraic data structures.
 *
 * @param {string} key
 * @returns {Function}
 */
export const makeMatcher = (key) =>
  function _matcher(matchers, obj) {
    if (arguments.length === 1) return (_obj) => _matcher(matchers, _obj);

    const value = obj[key];
    if (value === null || value === undefined) return;

    matchers[value]?.(obj);
  };
