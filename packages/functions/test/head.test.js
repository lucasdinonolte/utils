import { describe, it, expect } from 'vitest';
import { head } from '../src/head';

describe('head', () => {
  it('works for strings', () => {
    expect(head('abc')).toBe('a');
  });

  it('returns an empty string for an empty string', () => {
    expect(head('')).toBe('');
  });

  it('works on arrays', () => {
    expect(head([1, 2, 3])).toBe(1);
  });

  it('returns undefined for an empty array', () => {
    expect(head([])).toBe(undefined);
  });
});
