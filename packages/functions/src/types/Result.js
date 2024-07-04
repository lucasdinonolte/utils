import { always } from '../always';
import { id } from '../id';
import { tagged } from '../tagged';

/**
 * A slight variation of the monadic Either type.
 * Useful to model the results of IO (such as API
 * calls or file system reads).
 *
 * @typedef {Object} Result<T, E>
 */
export const Result = tagged(
  'Result',
  {
    Data: ['data'],
    Error: ['error'],
  },
  {
    andThen: (el, fn) =>
      el.match({
        Data: (value) => {
          const res = fn(value);
          return Result.is(res) ? res : Result.Data(res);
        },
        Error: always(el),
      }),
    chain: (el, fn) =>
      el.match({
        Data: (data) => fn(data),
        Error: always(el),
      }),
    fold: (el, f, g) =>
      el.match({
        Data: g,
        Error: f,
      }),
    map: (el, fn) =>
      el.match({
        Data: (data) => Result.Data(fn(data)),
        Error: always(el),
      }),
    unwrap: (el) =>
      el.match({
        Data: id,
        Error: (error) => {
          throw error;
        },
      }),
  }
);
