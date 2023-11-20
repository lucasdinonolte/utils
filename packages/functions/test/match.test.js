import { describe, it, expect } from 'vitest';
import { match } from '../src/match';

describe('match', () => {
  it('returns the first match', () => {
    const matcher = match(
      [(x) => x < 0, 'tiny'],
      [(x) => x > 10, 'big'],
      [(x) => x > 100, 'huge']
    );

    const res = matcher(200);
    expect(res).toBe('big');
  });

  it('returns null if no match is found', () => {
    const matcher = match(
      [(x) => x === 0, 'zero'],
      [(x) => x === 1, 'one'],
      [(x) => x === 2, 'two']
    );

    const res = matcher(3);
    expect(res).toBe(null);
  });
});
