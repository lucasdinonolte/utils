import { useEffect, useRef } from 'react';

/**
 * useUnmount hook only runs when a component is unmounted.
 *
 * @param {Function} callback
 * @return {void}
 * @example
 * useUnmount(() => {
 *  console.log('unmounted');
 * });
 */
export const useUnmount = (callback) => {
  const callbackRef = useRef(callback);

  // Ensure we always get the latest version of the callback
  callbackRef.current = callback;

  useEffect(() => () => callbackRef.current(), []);
};
