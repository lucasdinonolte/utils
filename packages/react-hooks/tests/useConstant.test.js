import { expect, it, describe } from 'vitest';
import { renderHook } from '@testing-library/react';

import { useConstant } from '../src/useConstant';

describe('useConstant', () => {
  it('should return the same value on each call', () => {
    const { result, rerender } = renderHook(() =>
      useConstant(() => Math.random())
    );
    const first = result.current;
    rerender();
    expect(result.current).toBe(first);
  });
});
