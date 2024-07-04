import { describe, it, expect } from 'vitest';
import { flow } from '../src/flow';

describe('flow', () => {
  const add = (a, b) => a + b;
  const inc = (x) => x + 1;
  const double = (x) => x * 2;

  it('flow functions', () => {
    const comp = flow(double, inc);
    expect(comp(2)).toBe(inc(double(2)));
  });

  it('should allow for the first function to be non unary', () => {
    const comp = flow(add, double);
    expect(comp(1, 2)).toBe(double(add(1, 2)));
  });
});
