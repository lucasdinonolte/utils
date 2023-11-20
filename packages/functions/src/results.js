import { compose } from './compose';
import { id } from './id';

/**
 * @typedef {Object} Result<T, E>
 * @property {boolean} ok
 * @property {T} value
 * @property {E} error
 */

/**
 * @param {T} value
 * @returns {Result<T, undefined>}
 * @sig a -> Result a
 *
 * @example
 * const result = fromData(10); // { ok: true, value: 10 }
 */
export const fromData = (value) => ({ ok: true, value });

/**
 * @param {E} error
 * @returns {Result<undefined, E>}
 * @sig a -> Result a
 *
 * @example
 * const result = fromError('error'); // { ok: false, error: 'error' }
 */
export const fromError = (error) => ({ ok: false, error });

/**
 * Pattern matches a result
 *
 * @param {{ data: Function, error: Function }} matchers
 * @returns {Function}
 * @sig { data: (a -> b), error: (a -> b) } -> Result a -> b
 */
export const matchResult =
  ({ data = id, error = id }) =>
    (result) =>
      result.ok ? data(result) : error(result);

/**
 * @param {Function} fn
 * @returns {Function}
 * @sig (a -> b) -> Result a -> b
 */
export const withData = (fn) => matchResult({ data: ({ value }) => fn(value) });

/**
 * @param {Function} fn
 * @returns {Function}
 * @sig (a -> b) -> Result a -> b
 */
export const withError = (fn) =>
  matchResult({ error: ({ error }) => fn(error) });

/**
 * aka `map`
 *
 * @param {Function} fn
 * @returns {Function}
 * @sig (a -> b) -> Result a -> Result b
 *
 * @example
 * const inc = x => x + 1;
 * const result = mapResult(inc, fromData(10)); // { ok: true, value: 11 }
 * const error = mapResult(inc, fromError('error')); // { ok: false, error: 'error' }
 */
export const mapResult = (fn) => withData(compose(fromData, fn));

/**
 * aka `flatMap`
 *
 * @param {Function} fn
 * @returns {Function}
 * @sig (a -> Result b) -> Result a -> Result b
 *
 * @example
 * const inc = x => fromData(x + 1);
 * const result = chainResult(inc, fromData(10)); // { ok: true, value: 11 }
 * const error = mapResult(inc, fromError('error')); // { ok: false, error: 'error' }
 */
export const chainResult = (fn) => withData(fn);

/**
 * @param {Function} fn
 * @returns {Function}
 * @sig (a -> b) -> a -> Result b
 *
 * @example
 * const readFileSafe = encaseInResult(fs.readFileSync);
 * const result = readFileSafe('package.json', 'utf-8'); // { ok: true, value: { ... } }
 */
export const encaseInResult =
  (fn) =>
    (...args) => {
      try {
        return fromData(fn(...args));
      } catch (error) {
        return fromError(error);
      }
    };

/**
 * @param {Result<T, E>} result
 * @returns {T}
 * @sig Result a -> a
 * @throws {E}
 *
 * @example
 * const result = fromData(10);
 * const value = unwrapResult(result); // 10
 */
export const unwrapResult = (result) => {
  if (result.ok) return result.value;
  throw result.error;
};
