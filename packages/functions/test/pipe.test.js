import { describe, it, expect } from 'vitest';
import { pipe } from '../src/pipe';

describe('pipe', () => {
  const inc = (x) => x + 1;
  const double = (x) => x * 2;

  it('works as expected', () => {
    expect(pipe(2, double, inc)).toBe(inc(double(2)));
  });
});
