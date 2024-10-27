import { describe, it, expect } from 'vitest';
import { invariant } from '../src/invariant';

describe('invariant', () => {
  it('should throw an error if the condition is false', () => {
    expect(() => invariant(false, 'error message')).toThrowError(
      'error message'
    );
  });

  it('should not throw an error if the condition is true', () => {
    expect(() => invariant(true, 'error message')).not.toThrowError();
  });
});
