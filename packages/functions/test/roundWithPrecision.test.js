import { describe, it, expect } from 'vitest';
import { roundWithPrecision } from '../src/roundWithPrecision';

describe('roundWithPrecision', () => {
  it('should round a number to the nearest integer by default', () => {
    expect(roundWithPrecision(5.1234)).toBe(5);
  });

  it('should round a number to the specified decimal places', () => {
    expect(roundWithPrecision(3.14159, 2)).toBeCloseTo(3.14);
  });

  it('should handle negative numbers correctly', () => {
    expect(roundWithPrecision(-3.456, 1)).toBeCloseTo(-3.5);
  });

  it('should return 0 when rounding 0', () => {
    expect(roundWithPrecision(0.0, 3)).toBe(0);
  });
});
