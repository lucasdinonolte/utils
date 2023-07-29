import { describe, it, expect } from 'vitest';
import { last } from '../src/last';

describe('last', () => {
  it('works for strings', () => {
    expect(last('abc')).toBe('c');
  });

  it('returns an empty string for an empty string', () => {
    expect(last('')).toBe('');
  });

  it('works on arrays', () => {
    expect(last([1, 2, 3])).toBe(3);
  });

  it('returns undefined for an empty array', () => {
    expect(last([])).toBe(undefined);
  });
});
