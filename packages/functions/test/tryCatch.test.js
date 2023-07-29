import { vi, describe, it, expect } from 'vitest';
import { tryCatch } from '../src/tryCatch';
import { always } from '../src/always';

describe('tryCatch', () => {
  it('works as expected', () => {
    const willFail = tryCatch(() => {
      throw new Error('error');
    }, always(null));

    const willPass = tryCatch((x) => x / 2, always(null));

    expect(willFail(10)).toBe(null);
    expect(willPass(10)).toBe(5);
  });

  it('sends the error to the catch handler', () => {
    const catcher = vi.fn();
    const willFail = tryCatch(() => {
      throw new Error('error');
    }, catcher);

    willFail(10);

    expect(catcher).toHaveBeenCalled();
    expect(catcher).toHaveBeenCalledWith(new Error('error'), 10);
  });
});
