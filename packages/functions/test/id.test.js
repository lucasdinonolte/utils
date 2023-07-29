import { describe, it, expect } from 'vitest';
import { id } from '../src/id';

describe('id', () => {
  it('works as expected', () => {
    expect(id(123)).toBe(123);
    expect(id(true)).toBeTruthy();
    expect(id({ x: 12 })).toEqual({ x: 12 });
  });
});
