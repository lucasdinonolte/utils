import { expect, it, describe } from 'vitest';
import { act, renderHook } from '@testing-library/react';

import { useParamState } from '../src/useParamState';

describe('useParamState', () => {
  it('should return value and setter', () => {
    const paramName = 'count';
    const initialValue = 10;
    const { result } = renderHook(() => useParamState(paramName, initialValue));
    expect(result.current[0]).toBe(initialValue);
    expect(result.current[1]).toBeInstanceOf(Function);
  });

  it('should update the URL search string when a value is updated', () => {
    const paramName = 'count';
    const initialValue = 10;
    const { result } = renderHook(() => useParamState(paramName, initialValue));
    act(() => {
      result.current[1](20);
    });
    expect(window.location.search).toBe(`?${paramName}=20`);
    expect(result.current[0]).toBe(20);
  });

  it('should pick up the state from the URL', () => {
    const paramName = 'count';
    const initialValue = 10;
    window.history.pushState({}, '', `?${paramName}=20`);
    const { result } = renderHook(() => useParamState(paramName, initialValue));
    expect(result.current[0]).toBe(20);
  });
});
