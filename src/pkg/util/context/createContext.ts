import {
  createContext as _createContext,
  useContext as _useContext,
} from 'react';

export function createContext<A extends Record<string, unknown> | null>() {
  const context = _createContext<A | null>(null);

  const useContext = () => {
    const ctx = _useContext(context);

    if (ctx === null) {
      throw new Error('useCtx must be inside a Provider with a value');
    }

    return ctx;
  };

  return [useContext, context.Provider] as const;
}
