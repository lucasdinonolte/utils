import { expect, it, describe, vi } from 'vitest';
import { renderHook } from '@testing-library/react';

import { useMount } from '../src/useMount';

describe('useMount', () => {
  it('should only execute the callback on the first component render', () => {
    const spy = vi.fn();
    const { rerender } = renderHook(() => useMount(spy));
    expect(spy).toHaveBeenCalledOnce();
    rerender();
    expect(spy).toHaveBeenCalledOnce();
  });
});
