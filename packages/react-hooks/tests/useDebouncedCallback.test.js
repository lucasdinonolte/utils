import { expect, it, describe, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';

import { useDebouncedCallback } from '../src/useDebouncedCallback';

describe('useDebouncedCallback', () => {
  it('should return a function', () => {
    const { result } = renderHook(() => useDebouncedCallback(() => { }, 5));

    expect(result.current).toBeTypeOf('function');
  });

  it('should debounce a function', () => {
    vi.useFakeTimers();

    const spy = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(spy, 5));
    expect(spy).not.toHaveBeenCalled();

    act(() => result.current(1));
    expect(spy).not.toHaveBeenCalled();

    act(() => result.current(2));
    vi.advanceTimersByTime(10);
    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith(2);

    vi.clearAllTimers();
    vi.useRealTimers();
  });
});
