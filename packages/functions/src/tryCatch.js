/**
 * Takes two functions, a try and catch and returns a function that
 * will try to run the try function and if it throws the catch function
 * will be called to handle the error.
 *
 * @param {() => T} tryFn
 * @param {() => {}} catchFn
 */
export const tryCatch = (tryFn, catchFn) => (...args) => {
  try {
    return tryFn(...args);
  } catch (e) {
    return catchFn(e, ...args);
  }
}
