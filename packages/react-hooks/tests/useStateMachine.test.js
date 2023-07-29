import { expect, it, describe, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';

import { useStateMachine } from '../src/useStateMachine';

describe('useStateMachine', () => {
  const definition = {
    initial: 'off',
    context: { hasBeenOn: false },
    states: {
      off: {
        on: { ACTIVATE: 'on' },
      },
      on: {
        on: { DEACTIVATE: 'off' },
        effect: ({ setContext }) => {
          setContext((c) => ({
            ...c,
            hasBeenOn: true,
          }));
        },
      },
    },
  };

  const definitionWithTargetSyntax = {
    initial: 'off',
    context: { hasBeenOn: false },
    states: {
      off: {
        on: { ACTIVATE: { target: 'on' } },
      },
      on: {
        on: { DEACTIVATE: { target: 'off' } },
        effect: ({ setContext }) => {
          setContext((c) => ({
            ...c,
            hasBeenOn: true,
          }));
        },
      },
    },
  };

  const makeDefinitionWithGuards = (cb) => ({
    initial: 'off',
    context: { hasBeenOn: false },
    states: {
      off: {
        on: {
          ACTIVATE: {
            target: 'on',
            guard: () => {
              cb();
              return true;
            },
          },
        },
      },
      on: {
        on: {
          DEACTIVATE: {
            target: 'off',
            guard: () => {
              cb();
              return false;
            },
          },
        },
        effect: ({ setContext }) => {
          setContext((c) => ({
            ...c,
            hasBeenOn: true,
          }));
        },
      },
    },
  });

  it('should be in initial state', () => {
    const { result } = renderHook(() => useStateMachine(definition));

    expect(result.current[0].value).toBe('off');
    expect(result.current[0].context.hasBeenOn).toBe(false);
  });

  it('should transition', () => {
    const { result } = renderHook(() => useStateMachine(definition));

    act(() => result.current[1]('ACTIVATE'));

    expect(result.current[0].value).toBe('on');
    expect(result.current[0].context.hasBeenOn).toBe(true);
  });

  it('should transition with target syntax', () => {
    const { result } = renderHook(() =>
      useStateMachine(definitionWithTargetSyntax)
    );

    act(() => result.current[1]('ACTIVATE'));

    expect(result.current[0].value).toBe('on');
    expect(result.current[0].context.hasBeenOn).toBe(true);
  });

  it('should use guards to check if a transition is allowed', () => {
    const spy = vi.fn();
    const definition = makeDefinitionWithGuards(spy);

    const { result } = renderHook(() => useStateMachine(definition));

    act(() => result.current[1]('ACTIVATE'));

    expect(result.current[0].value).toBe('on');
    expect(result.current[0].context.hasBeenOn).toBe(true);
    expect(spy).toHaveBeenCalledOnce();

    act(() => result.current[1]('DEACTIVATE'));
    expect(result.current[0].value).toBe('on');
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
