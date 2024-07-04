import { Result } from './types/Result';

/**
 * A more approachable – less monadic – version of
 * the result data type.
 */

/**
 * @param {T} value
 * @returns {Result<T, undefined>}
 * @sig a -> Result a
 *
 * @example
 * const result = fromData(10);
 */
export const fromData = (value) => Result.Data(value);

/**
 * @param {E} error
 * @returns {Result<undefined, E>}
 * @sig a -> Result a
 *
 * @example
 * const result = fromError('error');
 */
export const fromError = (error) => Result.Error(error);

/**
 * Pattern matches a result
 *
 * @param {{ data: Function, error: Function }} matchers
 * @returns {Function}
 * @sig { data: (a -> b), error: (a -> b) } -> Result a -> b
 */
export const matchResult =
  ({ data, error }) =>
    (result) =>
      result.match({
        Data: data ?? ((...args) => Result.Data(...args)),
        Error: error ?? ((...args) => Result.Error(...args)),
      });

/**
 * @param {Function} fn
 * @returns {Function}
 * @sig (a -> b) -> Result a -> b
 */
export const withData = (fn) => matchResult({ data: (...args) => fn(...args) });

/**
 * @param {Function} fn
 * @returns {Function}
 * @sig (a -> b) -> Result a -> b
 */
export const withError = (fn) =>
  matchResult({ error: (...args) => fn(...args) });

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
export const mapResult = (fn) => (res) => res.map(fn);

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
export const chainResult = (fn) => (res) => res.chain(fn);

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
export const unwrapResult = (result) => result.unwrap();
