import { describe, it, expect } from 'vitest';
import { pipe } from '../src/pipe';

describe('pipe', () => {
  const inc = x => x + 1;
  const double = x => x * 2;

  it('pipes functions', () => {
    const piped = pipe(double, inc);

    expect(piped(2)).toBe(inc(double(2)));
  });
});
