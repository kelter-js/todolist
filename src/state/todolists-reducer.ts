import { ITodoListsState } from "../types/interfaces";
import { v1 } from "uuid";

export type RemoveTodolistActionType = {
  type: "REMOVE_TODOLIST";
  id: string;
};

export type AddTodolistActionType = {
  type: "ADD_TODOLIST";
  title: string;
};

export type ChangeTodolistTitleActionType = {
  type: "CHANGE_TODOLIST_TITLE";
  title: string;
  id: string;
};

export type ChangeTodolistFilterActionType = {
  type: "CHANGE_TODOLIST_FILTER";
  filter: string;
  id: string;
};

type ActionsTypes =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;

export const todolistsReducer = (
  state: ITodoListsState[],
  action: ActionsTypes
): ITodoListsState[] => {
  switch (action.type) {
    case "REMOVE_TODOLIST":
      return state.filter((item) => item.id !== action.id);
    case "ADD_TODOLIST":
      return [...state, { title: action.title, tasks: [], id: v1() }];
    case "CHANGE_TODOLIST_TITLE":
      const [target] = state.filter((item) => item.id === action.id);
      const targetIndex = state.indexOf(target);

      return [
        ...state.slice(0, targetIndex),
        { ...target, title: action.title },
        ...state.slice(targetIndex + 1),
      ];

    default:
      return state;
  }
};

export const removeTodolist = (listId: string): RemoveTodolistActionType => {
  return {
    type: "REMOVE_TODOLIST",
    id: listId,
  };
};

export const addTodolist = (title: string): AddTodolistActionType => {
  return {
    type: "ADD_TODOLIST",
    title,
  };
};

export const changeTodolistTitle = (
  title: string,
  id: string
): ChangeTodolistTitleActionType => {
  return {
    type: "CHANGE_TODOLIST_TITLE",
    title,
    id,
  };
};
