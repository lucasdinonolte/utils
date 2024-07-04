import { describe, it, expect, vi } from 'vitest';
import {
  chainResult,
  encaseInResult,
  fromData,
  fromError,
  matchResult,
  mapResult,
  unwrapResult,
  withData,
  withError,
} from '../src/results';

describe('result', () => {
  const inc = (x) => x + 1;
  const double = (x) => x * 2;

  const ok = fromData(10);
  const err = fromError('error');

  describe('fromData', () => {
    it('works as expected', () => {
      const res = fromData(10);
      expect(res.is('Data')).toBe(true);
    });
  });

  describe('fromError', () => {
    it('works as expected', () => {
      const res = fromError('error');
      expect(res.is('Error'));
    });
  });

  describe('matchResult', () => {
    it('should only execute the data branch for ok results', () => {
      const dataFn = vi.fn();
      const errorFn = vi.fn();

      matchResult({ data: dataFn, error: errorFn })(ok);

      expect(dataFn).toHaveBeenCalled();
      expect(errorFn).not.toHaveBeenCalled();
    });

    it('should only execute the error branch for error results', () => {
      const dataFn = vi.fn();
      const errorFn = vi.fn();

      matchResult({ data: dataFn, error: errorFn })(err);

      expect(dataFn).not.toHaveBeenCalled();
      expect(errorFn).toHaveBeenCalled();
    });
  });

  describe('withData', () => {
    it('should execute the callback for an ok result', () => {
      const dataFn = vi.fn();
      withData(dataFn)(ok);
      expect(dataFn).toHaveBeenCalledWith(10);
    });

    it('should not execute the callback for an error result but pass through the error', () => {
      const dataFn = vi.fn();
      const res = withData(dataFn)(err);

      expect(dataFn).not.toHaveBeenCalled();
      expect(res.is('Error')).toBe(true);
    });
  });

  describe('withError', () => {
    it('should execute the callback for an error result', () => {
      const errorFn = vi.fn();
      withError(errorFn)(err);
      expect(errorFn).toHaveBeenCalledWith('error');
    });

    it('should not execute the callback for an ok result but pass through the data', () => {
      const errorFn = vi.fn();
      const res = withError(errorFn)(ok);

      expect(errorFn).not.toHaveBeenCalled();
      expect(res.is('Data')).toBe(true);
    });
  });

  describe('mapResult', () => {
    it('should work as expected', () => {
      const res = mapResult(inc)(ok);
      expect(res.is('Data')).toBe(true);
      expect(res.payload.data).toBe(11);
    });

    it('should pass along any error', () => {
      const res = mapResult(inc)(err);
      expect(res.is('Error')).toBe(true);
    });
  });

  describe('chainResult', () => {
    it('should work as expected', () => {
      const res = chainResult(double)(ok);
      expect(res).toBe(20);
    });

    it('should pass along any error', () => {
      const res = chainResult(double)(err);
      expect(res.is('Error')).toBe(true);
    });
  });

  describe('unwrapResult', () => {
    it('extract the value from an ok result', () => {
      const res = unwrapResult(ok);
      expect(res).toBe(10);
    });

    it('throw for an error result', () => {
      expect(() => unwrapResult(err)).toThrow();
    });
  });

  describe('encaseInResult', () => {
    it('should return a function', () => {
      const fn = vi.fn();
      encaseInResult(fn)(10);
      expect(fn).toHaveBeenCalledWith(10);
    });

    it('should return an ok result for a non-throwing function', () => {
      const fn = (x) => x;
      const res = encaseInResult(fn)(10);
      expect(res.is('Data')).toBe(true);
    });

    it('should return an error result for a throwing function', () => {
      const fn = () => {
        throw new Error('error');
      };
      const res = encaseInResult(fn)(10);
      expect(res.is('Error')).toBe(true);
    });
  });
});
