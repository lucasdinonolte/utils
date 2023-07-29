import { useState, useEffect } from 'react';
import { isBrowser } from './util/browser';

/**
 * useWindowSize hook tracks the size of the browser window
 *
 * @param {number} initialWidth
 * @param {number} initialHeight
 * @return {Object}
 * @example
 * const { width, height } = useWindowSize();
 */
export const useWindowSize = (
  initialWidth = Infinity,
  initialHeight = Infinity
) => {
  const [state, setState] = useState({
    width: isBrowser ? window.innerWidth : initialWidth,
    height: isBrowser ? window.innerHeight : initialHeight,
  });

  useEffect(() => {
    if (isBrowser) {
      const handler = () => {
        window.requestAnimationFrame(() => {
          setState({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        });

        window.addEventListener('resize', handler, { passive: true });

        return () => window.removeEventListener('resize', handler);
      };
    }
  });

  return state;
};
