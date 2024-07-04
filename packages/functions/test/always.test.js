import { describe, it, expect } from 'vitest';
import { always, F, T } from '../src/always';

describe('always', () => {
  it('works as expected', () => {
    const fn = always('abc');

    expect(fn).toBeTypeOf('function');
    expect(fn(123)).toBe('abc');
    expect(fn(false)).toBe('abc');
  });

  it('works for various types', () => {
    expect(always(12)()).toBe(12);
    expect(always(null)()).toBe(null);
    expect(always(true)()).toBe(true);
    expect(always(false)()).toBe(false);
    expect(always({ a: 'foo' })()).toStrictEqual({ a: 'foo' });
  });

  describe('F', () => {
    it('always returns false', () => {
      expect(F()).toBe(false);
      expect(F('whatever')).toBe(false);
      expect(F(true)).toBe(false);
    });
  });

  describe('T', () => {
    it('always returns true', () => {
      expect(T()).toBe(true);
      expect(T('whatever')).toBe(true);
      expect(T(false)).toBe(true);
    });
  });
});
