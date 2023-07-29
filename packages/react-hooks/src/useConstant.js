import { useRef } from 'react';

/**
 * A hook for creating a value only once, as useMemo does not give this
 * guarantee. This is useful for creating expensive objects.
 *
 * @param {() => T} fn
 * @return {T}
 * @see https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily
 * @example
 * const MyComponent = () => {
 *   const myConstantValue = useConstant(() => 42);
 * }
 */
export const useConstant = (fn) => {
  const ref = useRef(null);
  if (ref.current === null) ref.current = fn();
  return ref.current;
};
