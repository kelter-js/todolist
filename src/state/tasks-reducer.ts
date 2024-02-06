import { v1 } from "uuid";

import { ITask } from "../types/interfaces";
import { FilterByValueTypes } from "../types";
import { TASKS_STATUSES } from "../view";

enum ACTION_NAMES_ENUM {
  REMOVE_TASK_FROM_LIST = "REMOVE_TASK_FROM_LIST",
  CHANGE_TASK_STATUS = "CHANGE_TASK_STATUS",
  CHANGE_TASK_DESCRIPTION = "CHANGE_TASK_DESCRIPTION",
  ADD_TASK_TO_LIST = "ADD_TASK_TO_LIST",
  CHANGE_TASK_FILTER = "CHANGE_TASKS_FILTER",
}

export type REMOVE_TASK_TYPE = {
  type: ACTION_NAMES_ENUM.REMOVE_TASK_FROM_LIST;
  id: string;
};

export type CHANGE_TASK_FILTER = {
  type: ACTION_NAMES_ENUM.CHANGE_TASK_FILTER;
  filterType: FilterByValueTypes;
};

export type CHANGE_TASK_STATUS_TYPE = {
  type: ACTION_NAMES_ENUM.CHANGE_TASK_STATUS;
  id: string;
};

export type CHANGE_TASK_DESCRIPTION_TYPE = {
  type: ACTION_NAMES_ENUM.CHANGE_TASK_DESCRIPTION;
  id: string;
  description: string;
};

export type ADD_TASK_TYPE = {
  type: ACTION_NAMES_ENUM.ADD_TASK_TO_LIST;
  description: string;
  id: string;
  isDone: boolean;
};

type ActionsTypes =
  | REMOVE_TASK_TYPE
  | ADD_TASK_TYPE
  | CHANGE_TASK_STATUS_TYPE
  | CHANGE_TASK_DESCRIPTION_TYPE
  | CHANGE_TASK_FILTER;

export interface TodolistState {
  filterType: FilterByValueTypes;
  tasksList: ITask[];
  getTasksView: (state: TodolistState) => ITask[];
}

export const filterTasksByStatus = (state: TodolistState): ITask[] => {
  switch (state.filterType) {
    case TASKS_STATUSES.COMPLETED:
      return state.tasksList.filter((item) => item.isDone === true);
    case TASKS_STATUSES.ACTIVE:
      return state.tasksList.filter((item) => item.isDone === false);
    default:
      return [...state.tasksList];
  }
};

export const initialState: TodolistState = {
  filterType: TASKS_STATUSES.ALL,
  tasksList: [],
  getTasksView: filterTasksByStatus,
};

export const tasksReducer = (
  state: TodolistState,
  action: ActionsTypes
): TodolistState => {
  switch (action.type) {
    case ACTION_NAMES_ENUM.REMOVE_TASK_FROM_LIST:
      return {
        ...state,
        tasksList: state.tasksList.filter((item) => item.id !== action.id),
      };

    case ACTION_NAMES_ENUM.ADD_TASK_TO_LIST:
      return {
        ...state,
        tasksList: [
          ...state.tasksList,
          {
            description: action.description,
            id: action.id,
            isDone: action.isDone,
          },
        ],
      };

    case ACTION_NAMES_ENUM.CHANGE_TASK_STATUS:
      const [taskToChangeStatus] = state.tasksList.filter(
        (task) => task.id === action.id
      );

      taskToChangeStatus.isDone = !taskToChangeStatus.isDone;

      return { ...state };

    case ACTION_NAMES_ENUM.CHANGE_TASK_DESCRIPTION:
      const [taskToChangeDescription] = state.tasksList.filter(
        (task) => task.id === action.id
      );

      taskToChangeDescription.description = action.description;

      return { ...state };

    case ACTION_NAMES_ENUM.CHANGE_TASK_FILTER:
      switch (action.filterType) {
        case TASKS_STATUSES.COMPLETED:
          return {
            ...state,
            filterType: action.filterType,
          };
        case TASKS_STATUSES.ACTIVE:
          return {
            ...state,
            filterType: action.filterType,
          };
        default:
          return { ...state, filterType: action.filterType };
      }

    default:
      return state;
  }
};

export const removeTask = (id: string): REMOVE_TASK_TYPE => ({
  type: ACTION_NAMES_ENUM.REMOVE_TASK_FROM_LIST,
  id,
});

export const addTask = (description: string): ADD_TASK_TYPE => ({
  type: ACTION_NAMES_ENUM.ADD_TASK_TO_LIST,
  description,
  id: v1(),
  isDone: false,
});

export const markTaskAsDone = (id: string): CHANGE_TASK_STATUS_TYPE => ({
  type: ACTION_NAMES_ENUM.CHANGE_TASK_STATUS,
  id,
});

export const changeTaskDescription = (
  id: string,
  description: string
): CHANGE_TASK_DESCRIPTION_TYPE => ({
  type: ACTION_NAMES_ENUM.CHANGE_TASK_DESCRIPTION,
  id,
  description,
});

export const changeTaskFilter = (
  filterType: FilterByValueTypes
): CHANGE_TASK_FILTER => ({
  type: ACTION_NAMES_ENUM.CHANGE_TASK_FILTER,
  filterType,
});
