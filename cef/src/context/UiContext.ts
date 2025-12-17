// src/context/UIContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface UIPanels {
  main: boolean;
  notifications: boolean;
  inventory: boolean;
  admin: boolean;
  // Agrega más aquí (phone: boolean, shop: boolean, etc.)
}

interface UIContextType {
  panels: UIPanels;
  toggle: (panel: keyof UIPanels) => void;
  show: (panel: keyof UIPanels) => void;
  hide: (panel: keyof UIPanels) => void;
  hideAll: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [panels, setPanels] = useState<UIPanels>({
    main: false,
    notifications: false,
    inventory: false,
    admin: false,
  });

  const toggle = (panel: keyof UIPanels) => {
    setPanels(prev => ({ ...prev, [panel]: !prev[panel] }));
  };

  const show = (panel: keyof UIPanels) => {
    setPanels(prev => ({ ...prev, [panel]: true }));
  };

  const hide = (panel: keyof UIPanels) => {
    setPanels(prev => ({ ...prev, [panel]: false }));
  };

  const hideAll = () => {
    setPanels({
      main: false,
      notifications: false,
      inventory: false,
      admin: false,
    });
  };

  return (
    <UIContext.Provider value={{ panels, toggle, show, hide, hideAll }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) throw new Error('useUI must be used within UIProvider');
  return context;
}