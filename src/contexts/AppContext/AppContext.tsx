import React, { createContext, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const AppContext = createContext({});

const AppProvider = AppContext.Provider;

export const AppContextWrapper = ({ children }: Props) => {
  const userData = { username: '' };

  return <AppProvider value={{ userData }}>{children}</AppProvider>;
};

export default AppContext;
