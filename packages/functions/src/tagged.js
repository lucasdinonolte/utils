const TYPE = '__type';
const TAG = '__tag';

/**
 * Reduces boilerplate code when creating algebraic
 * data types (like Maybe or Either).
 *
 * Creates constructors for all subtypes on the sum type
 * and provides a match method to work with them.
 *
 * Optionally allows to specify methods on the subtypes,
 * to make creating monads and functors and such easier.
 *
 * @param {string} typename
 * @param {Reccord<string, Array<string>>} constructors
 * @param {Record<string, Function>} methods
 * @returns {Object}
 */
export const tagged = (typename, constructors, methods = {}) => {
  const res = {
    toString: typename,
    [TYPE]: typename,
    is: (comparison) => comparison[TYPE] === typename,
  };

  const tags = Object.keys(constructors);

  tags.forEach((tag) => {
    const fields = constructors[tag];
    res[tag] = (...args) => {
      if (args.length !== fields.length) {
        throw new Error(
          `${typename}.${tag} expected ${fields.length} arguments. Got ${args.length} instead.`
        );
      }

      const payload = fields.reduce((acc, cur, idx) => {
        return {
          ...acc,
          [cur]: args[idx],
        };
      }, {});

      return {
        payload,
        ...Object.entries(methods).reduce((acc, [name, fn]) => {
          return {
            ...acc,
            [name]: function(...args) {
              return fn(this, ...args);
            },
          };
        }, {}),
        [TAG]: tag,
        [TYPE]: typename,
        is: (comparison) => comparison === tag,
        match: (matchers) => {
          for (let i = 0; i < tags.length; i++) {
            const tag = tags[i];
            if (!matchers[tag]) {
              throw new Error(
                `match does not include ${tag}, which is included on ${typename}`
              );
            }
          }

          return matchers[tag](...args);
        },
        toString: () =>
          `${typename}.${tag}(${JSON.stringify(args.join(', '))})`,
      };
    };

    res[tag].is = (comparison) => comparison[TAG] === tag;
  });

  return res;
};
