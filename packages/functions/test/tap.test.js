import { describe, it, expect, vi } from 'vitest';
import { pipe } from '../src/pipe';
import { id } from '../src/id';
import { tap } from '../src/tap';

describe('tap', () => {
  const tapEffect = vi.fn();
  const afterTap = vi.fn();

  it('runs an effect without chaning the value', () => {
    const VALUE = 'Something';
    const piped = pipe(id, tap(tapEffect), afterTap);

    piped(VALUE);
    expect(tapEffect).toHaveBeenCalledWith(VALUE);
    expect(afterTap).toHaveBeenCalledWith(VALUE);
  });
});
