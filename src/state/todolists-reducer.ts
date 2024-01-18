import { v1 } from "uuid";

import { ITodoListsState } from "../types/interfaces";
import { tasks } from "../utils/constants";

enum ACTION_NAMES_ENUM {
  REMOVE_TODOLIST = "REMOVE_TODOLIST",
  ADD_TODOLIST = "ADD_TODOLIST",
  CHANGE_TODOLIST_TITLE = "CHANGE_TODOLIST_TITLE",
  CHANGE_TODOLIST_FILTER = "CHANGE_TODOLIST_FILTER",
}

export type RemoveTodolistActionType = {
  type: ACTION_NAMES_ENUM.REMOVE_TODOLIST;
  id: string;
};

export type AddTodolistActionType = {
  type: ACTION_NAMES_ENUM.ADD_TODOLIST;
  title: string;
};

export type ChangeTodolistTitleActionType = {
  type: ACTION_NAMES_ENUM.CHANGE_TODOLIST_TITLE;
  title: string;
  id: string;
};

type ActionsTypes =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType;

export const initialState: ITodoListsState[] = [
  {
    id: v1(),
    title: "testName",
    tasks,
  },
  {
    id: v1(),
    title: "some",
    tasks,
  },
];

export const todolistsReducer = (
  state: ITodoListsState[],
  action: ActionsTypes
): ITodoListsState[] => {
  switch (action.type) {
    case ACTION_NAMES_ENUM.REMOVE_TODOLIST:
      return state.filter((item) => item.id !== action.id);
    case ACTION_NAMES_ENUM.ADD_TODOLIST:
      return [...state, { title: action.title, tasks: [], id: v1() }];
    case ACTION_NAMES_ENUM.CHANGE_TODOLIST_TITLE:
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

export const removeTodolist = (listId: string): RemoveTodolistActionType => ({
  type: ACTION_NAMES_ENUM.REMOVE_TODOLIST,
  id: listId,
});

export const addTodolist = (title: string): AddTodolistActionType => ({
  type: ACTION_NAMES_ENUM.ADD_TODOLIST,
  title,
});

export const changeTodolistTitle = (
  title: string,
  id: string
): ChangeTodolistTitleActionType => ({
  type: ACTION_NAMES_ENUM.CHANGE_TODOLIST_TITLE,
  title,
  id,
});
