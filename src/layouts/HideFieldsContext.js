 // src/layouts/HideFieldsContext.js
import React, { createContext, useContext, useState } from 'react';

const HideFieldsContext = createContext();

export const HideFieldsProvider = ({ children }) => {
  const [hideFields, setHideFields] = useState({
    name: false,
    phone: false,
    email: false,
    referee: false,
    picture : false,
  });

  return (
    <HideFieldsContext.Provider value={{ hideFields, setHideFields }}>
      {children}
    </HideFieldsContext.Provider>
  );
};

export const useHideFields = () => {
  const context = useContext(HideFieldsContext);
  if (!context) {
    throw new Error('useHideFields must be used within a HideFieldsProvider');
  }
  return context;
};
