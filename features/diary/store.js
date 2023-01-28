import React, { useState, useContext, createContext } from 'react';

const DiaryContext = createContext(undefined);

const initialState = {
  data: {
    slug: 'sample',
    date: new Date().getTime(),
  },
};

export const DiaryProvider = ({ children, value = initialState }) => {
  const [state, setState] = useState(value);
  const context = React.useMemo(() => [state, setState], [state]);
  return <DiaryContext.Provider value={context}>{children}</DiaryContext.Provider>;
};

export const useDiary = () => {
  const context = useContext(DiaryContext);
  if (!context) {
    throw new Error(`useDiary must be used within a DiaryProvider`);
  }
  return context;
};
