import React, { createContext, useContext, useState } from 'react';
import { ViewModeContextType } from '../types';

const ViewModeContext = createContext<ViewModeContextType | undefined>(undefined);

export const ViewModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isClientMode, setIsClientMode] = useState(false);

  const toggleViewMode = () => {
    setIsClientMode((prev) => !prev);
  };

  return React.createElement(
    ViewModeContext.Provider,
    { value: { isClientMode, toggleViewMode } },
    children
  );
};

export const useViewMode = () => {
  const context = useContext(ViewModeContext);
  if (context === undefined) {
    throw new Error('useViewMode must be used within a ViewModeProvider');
  }
  return context;
};