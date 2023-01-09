import { createContext } from "react";

interface ContextProps {
  sidemenuOpen: boolean;
  //Methods
  openSideMenu: () => void;
  closeSideMenu: () => void;
  setIsAdding: (cond: boolean) => void;
  isAdding: boolean;
  startDragging: () => void;
  endDragging: () => void;
  isDragging: boolean;
}

export const UIContext = createContext({} as ContextProps);
