import { always } from '../always.js';
import { id } from '../id.js';
import { tagged } from '../tagged.js';

/**
 * A slight variation of the monadic Maybe type.
 * Useful to model nullable functions.
 *
 * @typedef {Object} Option<T>
 */
export const Option = tagged(
  'Option',
  {
    None: [],
    Some: ['value'],
  },
  {
    andThen: (el, fn) =>
      el.match({
        None: always(el),
        Some: (value) => {
          const res = fn(value);
          return Option.is(res) ? res : Option.Some(res);
        },
      }),
    chain: (el, fn) =>
      el.match({
        None: always(el),
        Some: (value) => fn(value),
      }),
    fold: (el, f, g) =>
      el.match({
        None: f,
        Some: g,
      }),
    map: (el, fn) =>
      el.match({
        None: always(el),
        Some: (value) => Option.Some(fn(value)),
      }),
    pipe: (el, ...fns) => fns.reduce((res, fn) => res.andThen(fn), el),
    unwrap: (el) =>
      el.match({
        None: always(null),
        Some: id,
      }),
  }
);

Option.fromNullable = (x) =>
  x !== null && x !== undefined ? Option.Some(x) : Option.None();
