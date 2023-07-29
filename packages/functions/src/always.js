/**
 * The always function takes a value and returnts a function
 * that always returns that value.
 *
 * @param {T} value
 * @returns {() => T}
 */
export const always = (value) => (_) => value;
