import { describe, it, expect } from 'vitest';
import { compose } from '../src/compose';

describe('compose', () => {
  const inc = x => x + 1;
  const double = x => x * 2;

  it('composes functions', () => {
    const composed = compose(double, inc);

    expect(composed(2)).toBe(double(inc(2)));
  });
});
