import { useState, useEffect } from 'react';

const getSize = el => {
  const isClient = typeof window === 'object';

  if (!el || !isClient) {
    return {
      width: undefined,
      height: undefined,
    };
  }

  return {
    width: el.clientWidth,
    height: el.clientHeight,
  };
};

const useComponentSize = (ref, dep) => {
  const [size, setSize] = useState(getSize(ref.current));

  useEffect(() => {
    if (!ref.current) {
      return undefined;
    }

    const handleResize = () => {
      if (ref.current) {
        setSize(getSize(ref.current));
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [ref, dep]);

  return size;
};

export default useComponentSize;
