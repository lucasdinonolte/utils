const CURRENT_LISTENER = '__UTILS_CURRENT_LISTENER';

/**
 * A simple signal implementation.
 *
 * @param {T} value
 * @returns {[() => T, (value: T) => void)]}
 */
export const createSignal = (initialValue) => {
  let value = initialValue;
  const listeners = new Set();

  const get = () => {
    if (globalThis[CURRENT_LISTENER] !== undefined) {
      listeners.add(globalThis[CURRENT_LISTENER]);
    }

    return value;
  };

  const set = (newValue) => {
    value = newValue;
    listeners.forEach((fn) => fn());
  };

  return [get, set];
};

/**
 * @param  {() => T} fn
 * @returns {T}
 */
export const createEffect = (fn) => {
  globalThis[CURRENT_LISTENER] = fn;
  const res = fn();
  globalThis[CURRENT_LISTENER] = undefined;
  return res;
};
