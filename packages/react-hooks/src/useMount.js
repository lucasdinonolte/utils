import { useEffect } from 'react';

/**
 * useMount hook only runs when a component is first mounted.
 *
 * @param {Function} callback
 * @return {void}
 * @example
 * useMount(() => {
 *   console.log('mounted');
 * });
 */
export const useMount = (callback) => {
  useEffect(() => callback(), []);
};
