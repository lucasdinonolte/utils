import { describe, it, expect } from 'vitest';
import { always } from '../src/always';

describe('always', () => {
  it('works as expected', () => {
    const fn = always('abc');

    expect(fn(123)).toBe('abc');
    expect(fn(false)).toBe('abc');
  });
});
