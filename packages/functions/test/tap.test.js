import { describe, it, expect, vi } from 'vitest';
import { flow } from '../src/flow';
import { id } from '../src/id';
import { tap } from '../src/tap';

describe('tap', () => {
  const tapEffect = vi.fn();
  const afterTap = vi.fn();

  it('runs an effect without chaning the value', () => {
    const VALUE = 'Something';
    const composition = flow(id, tap(tapEffect), afterTap);

    composition(VALUE);
    expect(tapEffect).toHaveBeenCalledWith(VALUE);
    expect(afterTap).toHaveBeenCalledWith(VALUE);
  });
});
