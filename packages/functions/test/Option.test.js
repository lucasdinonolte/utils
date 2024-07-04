import { describe, it, expect, vi } from 'vitest';
import { Option } from '../src/types/Option.js';

describe('Option', () => {
  describe('Some', () => {
    const res = Option.Some(12);

    it('can be created from Some', () => {
      expect(res.is('Some')).toBe(true);
    });

    it('applies a function when map is called', () => {
      const fn = vi.fn();
      const updatedRes = res.map(fn);

      expect(fn).toHaveBeenCalledWith(12);
      expect(updatedRes.is('Some')).toBe(true);
    });

    it('applies a function when chain is called', () => {
      const fn = vi.fn();
      res.chain(fn);

      expect(fn).toHaveBeenCalledWith(12);
    });

    it('applies the right-hand function when folding', () => {
      const f = vi.fn();
      const g = vi.fn();
      res.fold(f, g);

      expect(f).not.toHaveBeenCalled();
      expect(g).toHaveBeenCalledWith(12);
    });

    it('gets the value out on unwrap', () => {
      expect(res.unwrap()).toBe(12);
    });
  });

  describe('None', () => {
    const res = Option.None();

    it('can be created from None', () => {
      expect(res.is('None')).toBe(true);
    });

    it('does not apply a function when map is called', () => {
      const fn = vi.fn();
      const updatedRes = res.map(fn);

      expect(fn).not.toHaveBeenCalled();
      expect(updatedRes.is('None')).toBe(true);
    });

    it('does not apply a function when chain is called', () => {
      const fn = vi.fn();
      const updatedRes = res.chain(fn);

      expect(fn).not.toHaveBeenCalled();
      expect(updatedRes.is('None')).toBe(true);
    });

    it('applies the left-hand function when folding', () => {
      const f = vi.fn();
      const g = vi.fn();
      res.fold(f, g);

      expect(g).not.toHaveBeenCalled();
      expect(f).toHaveBeenCalled(12);
    });

    it('gets the null out on unwrap', () => {
      expect(res.unwrap()).toBe(null);
    });
  });

  describe('fromNullable', () => {
    it('should return Some for non-null value', () => {
      expect(Option.fromNullable(12).is('Some')).toBe(true);
    });

    it('should return None for null or undefined value', () => {
      expect(Option.fromNullable(null).is('None')).toBe(true);
      expect(Option.fromNullable(undefined).is('None')).toBe(true);
    });

    it('should return Some for falsy but non null value', () => {
      expect(Option.fromNullable('').is('Some')).toBe(true);
      expect(Option.fromNullable(0).is('Some')).toBe(true);
      expect(Option.fromNullable(false).is('Some')).toBe(true);
    });
  });
});
