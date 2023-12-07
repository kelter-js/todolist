import { ITask } from "../types/interfaces";
import { v1 } from "uuid";

export type REMOVE_TASK_TYPE = {
  type: "REMOVE_TASK_FROM_LIST";
  id: string;
};

export type CHANGE_TASK_STATUS_TYPE = {
  type: "CHANGE_TASK_STATUS";
  id: string;
};

export type ADD_TASK_TYPE = {
  type: "ADD_TASK_TO_LIST";
  description: string;
  id: string;
  isDone: boolean;
};

type ActionsTypes = REMOVE_TASK_TYPE | ADD_TASK_TYPE | CHANGE_TASK_STATUS_TYPE;

export const tasksReducer = (state: ITask[], action: ActionsTypes): ITask[] => {
  switch (action.type) {
    case "REMOVE_TASK_FROM_LIST":
      return state.filter((item) => item.id !== action.id);
    case "ADD_TASK_TO_LIST":
      return [
        ...state,
        {
          description: action.description,
          id: action.id,
          isDone: action.isDone,
        },
      ];

    case "CHANGE_TASK_STATUS":
      const [taskToChangeStatus] = state.filter(
        (task) => task.id === action.id
      );
      taskToChangeStatus.isDone = !taskToChangeStatus.isDone;
      
      return [...state];

    default:
      return state;
  }
};

export const removeTask = (id: string): REMOVE_TASK_TYPE => {
  return {
    type: "REMOVE_TASK_FROM_LIST",
    id,
  };
};

export const addTask = (description: string): ADD_TASK_TYPE => {
  return {
    type: "ADD_TASK_TO_LIST",
    description,
    id: v1(),
    isDone: false,
  };
};

export const markTaskAsDone = (id: string): CHANGE_TASK_STATUS_TYPE => {
  return {
    type: "CHANGE_TASK_STATUS",
    id,
  };
};
