import { useReducer } from "react";

type ActionType = "SET_STATE" | "UNDO";

type Action = {
  type: ActionType;
  payload?: any;
};

type Dispatch = (action: Action) => void;

const reducerWithUndoRedo = (state: any, action: Action) => {
  const { past, present } = state;

  switch (action.type) {
    case "SET_STATE":
      return {
        past: [...past, present],
        present: action.payload,
      };
    case "UNDO":
      return {
        past: past.slice(0, past.length - 1),
        present: past[past.length - 1],
      };
    default:
      throw new Error();
  }
};

export const useUndo = (initialState = {}) => {
  const [state, dispatch] = useReducer(reducerWithUndoRedo, {
    past: [],
    present: initialState,
  });
  const { past, present } = state;

  const setState = (newState: any) =>
    dispatch({ type: "SET_STATE", payload: newState });
  const undo = () => dispatch({ type: "UNDO" });
  const isUndoPossible = past && past.length > 0;

  return {
    state: present,
    setState,
    undo,
    pastStates: past,
    isUndoPossible,
  };
};
