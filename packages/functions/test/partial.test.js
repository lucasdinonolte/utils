import { describe, it, expect } from 'vitest';
import { partial } from '../src/partial';

describe('partial', () => {
  it('partially applies a function', () => {
    const add = (a, b) => a + b;
    const inc = partial(add, 1);

    expect(inc(10)).toBe(11);
  });

  it('partially applies a function with multiple arguments', () => {
    const clamp = (min, max, value) => Math.min(Math.max(value, min), max);

    const clampTo10 = partial(clamp, 0, 10);

    expect(clampTo10(5)).toBe(5);
    expect(clampTo10(12)).toBe(10);
    expect(clampTo10(-12)).toBe(0);
  });
});
