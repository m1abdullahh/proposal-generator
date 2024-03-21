"use client";

import React, { createContext, useState } from "react";

export interface IContext {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Context = createContext<IContext | undefined>(undefined);

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [context, setContext] = useState<boolean>(false);

  return (
    <Context.Provider value={{ loading: context, setLoading: setContext }}>
      {children}
    </Context.Provider>
  );
};
