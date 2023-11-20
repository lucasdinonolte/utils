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
    console.log(window.location.search);
    const paramName = 'count';
    const initialValue = 10;
    const { result } = renderHook(() => useParamState(paramName, initialValue));
    act(() => {
      result.current[1](20);
    });
    expect(window.location.search).toBe(`?${paramName}=20`);
    expect(result.current[0]).toBe(20);
  });

  it('should allow storing multiple keys in the URL', () => {
    const firstParam = 'count';
    const firstValue = 10;

    const secondParam = 'name';
    const secondValue = 'John';

    const { result } = renderHook(() => {
      return [useParamState(firstParam, 5), useParamState(secondParam, '')];
    });

    act(() => {
      result.current[0][1](firstValue);
      result.current[1][1](secondValue);
    });

    expect(window.location.search).toBe(
      `?${firstParam}=${firstValue}&${secondParam}=${secondValue}`
    );
  });

  it('should pick up the state from the URL', () => {
    const firstParam = 'count';
    const firstValue = 10;

    const secondParam = 'name';
    const secondValue = 'John';

    window.history.pushState(
      {},
      '',
      `?${firstParam}=${firstValue}&${secondParam}=${secondValue}`
    );
    const { result } = renderHook(() => [
      useParamState(firstParam, 20),
      useParamState(secondParam, ''),
    ]);

    expect(result.current[0][0]).toBe(firstValue);
    expect(result.current[1][0]).toBe(secondValue);
  });
});
