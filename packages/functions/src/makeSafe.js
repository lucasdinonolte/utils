import { always } from "./always";
import { tryCatch } from "./tryCatch";

/**
 * Takes a function and returns a function will try to run the function
 * or return a fallback value if it throws.
 *
 * @param {() => T} fn
 * @param {R} fallback
 * @returns {() => T|R}
 */
export const makeSafe = (fn, fallback) => tryCatch(fn, always(fallback));
