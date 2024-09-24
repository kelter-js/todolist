import { TaskData } from "../types/interfaces";
import { ACTION_NAMES_ENUM } from "./entities";

export type RemoveTodolistActionType = {
  type: ACTION_NAMES_ENUM.REMOVE_TODOLIST;
  id: string;
};

export type AddTodolistActionType = {
  type: ACTION_NAMES_ENUM.ADD_TODOLIST;
  title: string;
};

export type AddTaskInTodoList = {
  type: ACTION_NAMES_ENUM.ADD_TASK_IN_TODOLIST;
  task: TaskData;
  listId: string;
};

export type ChangeTodolistTitleActionType = {
  type: ACTION_NAMES_ENUM.CHANGE_TODOLIST_TITLE;
  title: string;
  id: string;
};

export type RemoveTaskFromListActionType = {
  type: ACTION_NAMES_ENUM.REMOVE_TASK_FROM_LIST;
  taskListId: string;
  taskId: string;
};

export type ChangeTaskFromListStatusActionType = {
  type: ACTION_NAMES_ENUM.CHANGE_TASK_FROM_LIST_STATUS;
  taskListId: string;
  taskId: string;
};

export type ActionsTypes =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | AddTaskInTodoList
  | RemoveTaskFromListActionType
  | ChangeTaskFromListStatusActionType
  | ChangeTodolistTitleActionType;
