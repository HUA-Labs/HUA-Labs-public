import React, { createContext, useContext } from 'react';

interface LayoutSidebarContextProps {
  isSidebarOpen: boolean;
  handleToggle: () => void;
  handleNewChat: () => void;
  setIsSidebarOpen: (open: boolean) => void;
}

export const LayoutSidebarContext = createContext<LayoutSidebarContextProps | undefined>(undefined);

export const useLayoutSidebar = () => {
  const ctx = useContext(LayoutSidebarContext);
  if (!ctx) throw new Error('useLayoutSidebar must be used within LayoutSidebarContext.Provider');
  return ctx;
};

export const LayoutSidebarProvider = LayoutSidebarContext.Provider as any; 