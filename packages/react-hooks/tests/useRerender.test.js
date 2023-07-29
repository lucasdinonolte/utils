import { expect, it, describe } from 'vitest';
import { act, renderHook } from '@testing-library/react';

import { useRerender } from '../src/useRerender';

describe('useRerender', () => {
  it('rerenders when called', () => {
    let renders = 0;
    const { result } = renderHook(() => {
      renders++;
      return useRerender();
    });

    expect(renders).toBe(1);

    act(() => result.current());
    expect(renders).toBe(2);

    act(() => result.current());
    expect(renders).toBe(3);
  });
});
