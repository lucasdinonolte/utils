import { expect, it, describe } from 'vitest';
import { renderHook } from '@testing-library/react';

import { useRenderCount } from '../src/useRenderCount';

describe('useRenderCount', () => {
  it('should count the initial render', () => {
    const { result } = renderHook(() => useRenderCount());
    expect(result.current).toBe(1);
  });

  it('should increment with every render', () => {
    const { result, rerender } = renderHook(() => useRenderCount());
    expect(result.current).toBe(1);
    rerender();
    expect(result.current).toBe(2);
    rerender();
    expect(result.current).toBe(3);
  });
});
