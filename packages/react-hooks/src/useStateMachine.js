import { useEffect, useReducer } from 'react';
import { useConstant } from './useConstant';

/**
 * A very simple state machine hook.
 *
 * @param {object} definition
 * @example
 * const [machine, send, onTransition] = useStateMachine({
 *   initial: 'idle',
 *   states: {
 *     idle: {
 *       on: { FETCH: 'pending' },
 *       effect: () => {
 *         console.log('entering idle');
 *         return () => console.log('leaving idle');
 *       }
 *     },
 *     pending: {
 *       on: { RESOLVE: 'resolved', REJECT: 'rejected' },
 *     },
 *     resolved: {},
 *     rejected: {},
 *   }
 * })
 */
export const useStateMachine = (definition) => {
  const initialState = {
    value: definition.initial,
    context: definition.context || {},
    event: { type: 'INIT' },
    listeners: [],
  };

  const reducer = (state, event) => {
    if (event.type === 'ADD_EVENT_LISTENER') {
      return {
        ...state,
        listeners: [...state.listeners, event.listener],
      };
    }
    if (event.type === 'SET_CONTEXT') {
      return {
        ...state,
        context: event.updater(state.context),
      };
    }
    if (event.type === 'SEND') {
      const resolvedState = definition.states[state.value];
      const resolvedTransition = resolvedState.on?.[event.event];

      // If the transition is not defined keep the current state
      if (!resolvedTransition) return state;

      // Next check if there is a guard on this transition
      const nextState =
        typeof resolvedTransition === 'string'
          ? resolvedTransition
          : resolvedTransition.target;

      if (!nextState) return state;

      const guard = resolvedTransition.guard;

      // If the guard returns false keep the current state
      if (
        typeof guard === 'function' &&
        !guard({
          context: state.context,
          event,
        })
      ) {
        return state;
      }

      // Finally apply the transition
      state.listeners.forEach((listener) =>
        listener.call(null, event, nextState)
      );

      return {
        ...state,
        value: nextState,
        event,
      };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const send = useConstant(
    () => (event, payload) => dispatch({ type: 'SEND', event, payload })
  );

  const setContext = (updater) => {
    dispatch({ type: 'SET_CONTEXT', updater });
  };

  const onTransition = (listener) => {
    dispatch({ type: 'ADD_EVENT_LISTENER', listener });
  };

  useEffect(() => {
    const onEnter = definition.states[state.value].effect;
    const onExit = onEnter?.({
      send,
      setContext,
    });

    return typeof onExit === 'function'
      ? () => onExit({ send, setContext })
      : undefined;
  }, [state.value]);

  return [state, send, onTransition];
};
