import { useRef, useEffect } from "react";

/**
 * Debounces a callback function. Useful for handling expensive
 * operations.
 *
 * @param {Function} callback
 * @param {number} timeout
 * @return {Function}
 * @example
 * const handleSearch = useDebouncedCallback((searchTerm) => {
 *   performAPICall(searchTerm).then(setResults);
 * }, 200);
 */
export const useDebouncedCallback = (callback, timeout) => {
  const timerRef = useRef(null);

  const clear = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  // If the component using this hook gets unmounted we
  // want to make sure to also clear any pending callback
  useEffect(() => () => clear(), []);

  return (...args) => {
    clear();

    timerRef.current = setTimeout(() => {
      callback(...args);
    }, timeout);
  };
};
