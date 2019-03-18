import { useState, useCallback } from 'react';

const useBoolean = initial => {
  const [value, setValue] = useState(initial);
  return [value, useCallback(() => setValue(v => !v), [])];
};

export default useBoolean;
