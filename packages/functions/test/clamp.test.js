import { describe, it, expect } from 'vitest';
import { clamp } from '../src/clamp';

describe('clamp', () => {
  it('correctly clamps a number', () => {
    expect(clamp(0, 10, 5)).toBe(5);
    expect(clamp(0, 10, 0)).toBe(0);
    expect(clamp(0, 10, -100)).toBe(0);
    expect(clamp(0, 10, 10)).toBe(10);
    expect(clamp(0, 10, 100)).toBe(10);
  });

  it('is curried', () => {
    const fn = clamp(0, 10);
    expect(fn(5)).toBe(5);
    expect(fn(0)).toBe(0);
    expect(fn(-100)).toBe(0);
    expect(fn(10)).toBe(10);
    expect(fn(100000)).toBe(10);
  });
});
