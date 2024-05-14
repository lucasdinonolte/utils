/**
* Runs an effect on a value and returns the value.
* Useful for debugging or logging values in the middle
* of a composition or pipe.
* 
* @param {Function} fn - The effect to run on the value
* @returns {Function} - A function that takes a value and runs the effect on it
*/
export const tap = (fn) => (value) => {
  fn(value);
  return value;
}
