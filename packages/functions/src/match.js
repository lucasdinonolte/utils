/**
 * Matches a value against a list of predicates and
 * returns the first value that matches. Useful for
 * setting a variable based on a condition without
 * having to use a nested hell of if/else statements.
 *
 * @param {Array<[(T) => boolean, U]>} options
 * @returns {(T) => U|null}
 *
 * @example
 * const matcher = match(
 *  [x => x < 0, 'tiny'],
 *  [x => x >= 0 && x < 10, 'small'],
 *  [x => x >= 10 && x < 100, 'big'],
 *  [x => x >= 100, 'huge']
 * );
 *
 * const res = matcher(200); // 'huge'
 */
export const match =
  (...options) =>
    (val) => {
      for (const [predicate, value] of options) {
        if (predicate(val)) return value;
      }

      return null;
    };
