import { useReducer } from 'react';

/**
 * useRerender returns a function that when called forces the current component
 * to rerender.
 *
 * @return {Function}
 * @example
 *
 * const rerender = useRerender();
 *
 * return (
 *   <div>
 *    <div>{new Date().toString()}</div>
 *    <button onClick={rerender}>Rerender</button>
 *  </div>
 * );
 */
export const useRerender = () => useReducer((state) => !state, false)[1];
