import { expect, it, describe, vi } from 'vitest';
import { renderHook } from '@testing-library/react';

import { useUnmount } from '../src/useUnmount';

describe('useUnmount', () => {
  it('should not be called on mount', () => {
    const spy = vi.fn();
    renderHook(() => useUnmount(spy));
    expect(spy).not.toHaveBeenCalledOnce();
  });

  it('should not be called on any rerender', () => {
    const spy = vi.fn();
    const { rerender } = renderHook(() => useUnmount(spy));
    expect(spy).not.toHaveBeenCalled();
    rerender();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should be called when a component unmounts', () => { 
    const spy = vi.fn();
    const { unmount } = renderHook(() => useUnmount(spy));
    expect(spy).not.toHaveBeenCalled();
    unmount();
    expect(spy).toHaveBeenCalledOnce();
  });
});
