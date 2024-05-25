import { describe, it, expect } from 'vitest';
import { isInteger } from '../src/isInteger';

describe('isInteger', () => {
  it('works as expected', () => {
    expect(isInteger(12)).toBe(true);
    expect(isInteger(0)).toBe(true);
    expect(isInteger(-12)).toBe(true);
    expect(isInteger(0.24)).toBe(false);
    expect(isInteger(-0.24)).toBe(false);
    expect(isInteger(true)).toBe(false);
    expect(isInteger(false)).toBe(false);
    expect(isInteger(null)).toBe(false);
    expect(isInteger(undefined)).toBe(false);
    expect(isInteger('')).toBe(false);
    expect(isInteger('hello')).toBe(false);
    expect(isInteger([1, 2, 3])).toBe(false);
    expect(isInteger([])).toBe(false);
    expect(isInteger({ foo: 1 })).toBe(false);
    expect(isInteger({})).toBe(false);
  });
});
