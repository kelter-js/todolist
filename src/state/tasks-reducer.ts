import { ITodoListsState } from "../types/interfaces";
import { v1 } from "uuid";

export type SomeTaskRelatedType = {
  type: "SOME_ACTION_TYPE";
  id: string;
};

type ActionsTypes = SomeTaskRelatedType;

export const tasksReducer = (
  state: ITodoListsState[],
  action: ActionsTypes
): ITodoListsState[] => {
  switch (action.type) {
    case "SOME_ACTION_TYPE":
      return state.filter((item) => item.id !== action.id);

    default:
      return state;
  }
};

export const someTaskReducerRelatedAC = (
  listId: string
): SomeTaskRelatedType => {
  return {
    type: "SOME_ACTION_TYPE",
    id: listId,
  };
};
