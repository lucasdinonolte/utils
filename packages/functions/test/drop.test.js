import { describe, it, expect } from 'vitest';
import { drop } from '../src/drop';

describe('tail', () => {
  it('works for strings', () => {
    expect(drop(1, 'abc')).toBe('bc');
    expect(drop(2, 'abc')).toBe('c');
  });

  it('works on arrays', () => {
    expect(drop(1, [1, 2, 3])).toEqual([2, 3]);
    expect(drop(2, [1, 2, 3])).toEqual([3]);
  });

  it('works curried', () => {
    expect(drop(2)('abc')).toBe('c');
    expect(drop(1)([1, 2, 3])).toEqual([2, 3]);
  });
});
