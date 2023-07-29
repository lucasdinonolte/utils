import { useRef } from 'react';

/**
 * Counts how often a component has been rendered, including the first render
 *
 * @return {number}
 * @example
 * const renderCount = useRenderCount();
 */
export const useRenderCount = () => {
  const countRef = useRef(0);
  return ++countRef.current;
};
