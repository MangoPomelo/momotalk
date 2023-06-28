import { useEffect, useRef, useState } from 'react';

/**
 * Just modified version of useEffect that is skipping the first render.
 * @see {@link https://github.com/juliencrn/usehooks-ts/blob/master/packages/usehooks-ts/src/useUpdateEffect/useUpdateEffect.ts | code source}
 * @param {React.EffectCallback} effect Imperative function that can return a cleanup function
 * @param {React.DependencyList | undefined} deps If present, effect will only activate if the values in the list change.
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

/**
 * This React hook helps to limit that the component is re-rendered too many time
 * @see {@link https://github.com/juliencrn/usehooks-ts/blob/master/packages/usehooks-ts/src/useDebounce/useDebounce.ts | code source}
 * @template T
 * @param {T} value Value which needs debouncing
 * @param {number} [delay=500] Debounce delay
 * @return {T} Debounced value
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => void clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
