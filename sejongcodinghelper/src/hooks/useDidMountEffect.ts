import { DependencyList, useEffect, useRef } from 'react';

/**
 * useEffect인데 첫 렌더링시에는 수행되지 않는 useEffect
 */
const useDidMountEffect = (
  func: () => void,
  deps: DependencyList | undefined
) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};

export default useDidMountEffect;
