import { describe, it, expect } from 'vitest';
import { curryNamed } from '../src/curryNamed';

describe('curryNamed', () => {
  it('works as expected', () => {
    const add = curryNamed(({ a, b }) => a + b, ['a', 'b']);
    const add10 = add({ b: 10 });

    expect(add10({ a: 5 })).toBe(15);
  });

  it('works with multiple arguments', () => {
    const clamp = curryNamed(
      ({ min, max, value }) => Math.min(Math.max(value, min), max),
      ['min', 'max', 'value']
    );

    const clampTo10 = clamp({ max: 10 });
    const clampBetween0and10 = clampTo10({ min: 0 });

    expect(clampBetween0and10({ value: 5 })).toBe(5);
    expect(clampBetween0and10({ value: 50 })).toBe(10);
    expect(clampBetween0and10({ value: -50 })).toBe(0);
  });
});
