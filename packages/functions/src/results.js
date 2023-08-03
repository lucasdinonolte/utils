import { id } from './id';

/**
 * @typedef {Object} Result
 * @property {boolean} ok
 * @property {any} value
 * @property {any} error
 */

/**
 * @param {any} value
 * @returns {Result}
 * @sig a -> Result a
 */
export const ok = (value) => ({ ok: true, value });

/**
 * @param {any} error
 * @returns {Result}
 * @sig a -> Result a
 */
export const err = (error) => ({ ok: false, error });

/**
 * aka `map`
 *
 * @param {Function} fn
 * @returns {Function}
 * @sig (a -> b) -> Result a -> Result b
 */
export const mapResult = (fn) => (result) =>
  result.ok ? ok(fn(result.value)) : result;

/**
 * aka `flatMap`
 *
 * @param {Function} fn
 * @returns {Function}
 * @sig (a -> Result b) -> Result a -> Result b
 */
export const chainResult = (fn) => (result) =>
  result.ok ? fn(result.value) : result;

export const matchResult =
  ({
    ok = id,
    err = (msg) => {
      throw msg;
    },
  }) =>
    (result) =>
      result.ok ? ok(result.value) : err(result.error);

export const encaseInResult =
  (fn) =>
    (...args) => {
      try {
        return ok(fn(...args));
      } catch (error) {
        return err(error);
      }
    };

export const unwrapResult = (result) => {
  if (result.ok) return result.error;
  throw result.error;
};
