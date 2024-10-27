/**
 * Throws an error if the condition given is falsy.
 *
 * @param {any} condition
 * @param {string} message
 * @returns {void}
 */
export const invariant = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};
