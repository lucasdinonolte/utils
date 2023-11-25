import { describe, expect, it, vi } from 'vitest';
import { createSignal, createEffect } from '../src/signals';

describe('createSignal', () => {
  it('should return to functions', () => {
    const [count, setCount] = createSignal(0);
    expect(count).toBeTypeOf('function');
    expect(setCount).toBeTypeOf('function');
  });

  it('should return the initial value', () => {
    const [count, _] = createSignal(0);
    expect(count()).toBe(0);
  });

  it('should update its value', () => {
    const [count, setCount] = createSignal(0);
    setCount(1);
    expect(count()).toBe(1);
  });
});

describe('createEffect', () => {
  it('should get run initially', () => {
    const fn = vi.fn();
    createEffect(fn);
    expect(fn).toHaveBeenCalledOnce();
  });

  it('should get re-run when a signal changes', () => {
    const [count, setCount] = createSignal(0);
    const fn = vi.fn();

    createEffect(() => {
      fn(count());
    });

    expect(fn).toHaveBeenCalledWith(0);

    setCount(1);

    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith(1);
  });

  it('should work with multiple signals', () => {
    const [count, setCount] = createSignal(0);
    const [count2, setCount2] = createSignal(0);
    const fn = vi.fn();

    createEffect(() => {
      fn(count(), count2());
    });

    expect(fn).toHaveBeenCalledWith(0, 0);

    setCount(1);
    setCount2(1);

    expect(fn).toHaveBeenCalledTimes(3);
    expect(fn).toHaveBeenLastCalledWith(1, 1);
  });
});
