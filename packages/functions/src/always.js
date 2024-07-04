/**
 * The always function takes a value and returnts a function
 * that always returns that value.
 *
 * @param {T} value
 * @returns {() => T}
 */
export const always = (value) => (_) => value;

/**
 * Preloaded version of always, returning false.
 *
 * @returns {false}
 */
export const F = always(false);

/**
 * Preloaded version of always, returning true.
 *
 * @returns {true}
 */
export const T = always(true);
