import { describe, it, expect } from 'vitest';
import { tail } from '../src/tail';

describe('tail', () => {
  it('works for strings', () => {
    expect(tail('abc')).toBe('bc');
  });

  it('works on arrays', () => {
    expect(tail([1, 2, 3])).toEqual([2, 3]);
  });
});
