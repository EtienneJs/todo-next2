import { FunctionComponent, useReducer } from "react";
import { UIContext, uiReducer } from "./";
export interface UIState {
  sidemenuOpen: boolean;
  isAdding: boolean;
  isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  isAdding: false,
  isDragging: false,
};

export const UIProvider: FunctionComponent<{
  children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);
  const openSideMenu = () => {
    dispatch({ type: "UI - Open SideBar" });
  };
  const closeSideMenu = () => {
    dispatch({ type: "UI - Close SideBar" });
  };
  const setIsAdding = (cond: boolean) => {
    const isAddChange: UIState = {
      ...state,
      isAdding: cond,
    };
    dispatch({ type: "Entry", payload: isAddChange });
  };
  const startDragging = () => {
    dispatch({ type: "UI-Start Dragging" });
  };
  const endDragging = () => {
    dispatch({ type: "UI-End Dragging" });
  };
  return (
    <UIContext.Provider
      value={{
        ...state,
        openSideMenu,
        closeSideMenu,
        setIsAdding,
        startDragging,
        endDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
