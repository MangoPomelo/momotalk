import { useEffect, useRef } from 'react';

/**
 * Just modified version of useEffect that is skipping the first render.
 * @param {React.EffectCallback} effect Imperative function that can return a cleanup function
 * @param {React.DependencyList | undefined} deps If present, effect will only activate if the values in the list change.
 * @see {@link https://github.com/juliencrn/usehooks-ts/blob/master/packages/usehooks-ts/src/useUpdateEffect/useUpdateEffect.ts | code source}
 */
export function useUpdateEffect(effect, deps) {
  const isFirstTimeRender = useRef(true);

  useEffect(() => {
    if (isFirstTimeRender.current) {
      isFirstTimeRender.current = false;
      return;
    }

    return effect();
  }, deps);
}
