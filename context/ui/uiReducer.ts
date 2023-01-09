import { UIState } from ".";
type UIType =
  | {
      type: "UI - Open SideBar";
      payload?: UIState;
    }
  | {
      type: "UI - Close SideBar";
      payload?: UIState;
    }
  | {
      type: "Entry";
      payload: UIState;
    }
  | {
      type: "UI-Start Dragging";
    }
  | {
      type: "UI-End Dragging";
    };

export const uiReducer = (state: UIState, action: UIType): UIState => {
  switch (action.type) {
    case "UI - Open SideBar":
      return {
        ...state,
        sidemenuOpen: true,
      };
    case "UI - Close SideBar":
      return {
        ...state,
        sidemenuOpen: false,
      };
    case "Entry":
      return {
        ...state,
        isAdding: action.payload.isAdding,
      };
    case "UI-Start Dragging":
      return {
        ...state,
        isDragging: true,
      };
    case "UI-End Dragging":
      return {
        ...state,
        isDragging: false,
      };
    default:
      return state;
  }
};
