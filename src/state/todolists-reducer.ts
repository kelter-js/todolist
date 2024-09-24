import { v1 } from "uuid";

import { TodoListsStateData, TaskData } from "../types/interfaces";
import { ACTION_NAMES_ENUM } from "./entities";
import { initialState } from "./constants";
import {
  ActionsTypes,
  AddTaskInTodoList,
  AddTodolistActionType,
  ChangeTaskFromListStatusActionType,
  ChangeTodolistTitleActionType,
  RemoveTaskFromListActionType,
  RemoveTodolistActionType,
} from "./types";

export const todolistsReducer = (
  state: TodoListsStateData[] = initialState,
  action: ActionsTypes
): TodoListsStateData[] => {
  switch (action.type) {
    case ACTION_NAMES_ENUM.REMOVE_TODOLIST:
      return state.filter((item) => item.id !== action.id);

    case ACTION_NAMES_ENUM.ADD_TODOLIST:
      return [...state, { title: action.title, tasks: [], id: v1() }];

    case ACTION_NAMES_ENUM.ADD_TASK_IN_TODOLIST:
      const [targetListToAdd] = state.filter(
        (item) => item.id === action.listId
      );

      const targetListIndex = state.indexOf(targetListToAdd);

      return [
        ...state.slice(0, targetListIndex),
        {
          ...targetListToAdd,
          tasks: [...targetListToAdd.tasks, action.task],
        },
        ...state.slice(targetListIndex + 1),
      ];

    case ACTION_NAMES_ENUM.REMOVE_TASK_FROM_LIST:
      const [list] = state.filter((item) => item.id === action.taskListId);

      const removeTaskTargetListIndex = state.indexOf(list);

      return [
        ...state.slice(0, removeTaskTargetListIndex),
        {
          ...list,
          tasks: list.tasks.filter((item) => item.id !== action.taskId),
        },
        ...state.slice(removeTaskTargetListIndex + 1),
      ];

    case ACTION_NAMES_ENUM.CHANGE_TASK_FROM_LIST_STATUS:
      const [tasksList] = state.filter((item) => item.id === action.taskListId);

      const [selectedTask] = tasksList.tasks.filter(
        (item) => item.id === action.taskId
      );

      const changeTaskTitleTargetListIndex = state.indexOf(tasksList);
      const changeTaskTitleSelectedTask = tasksList.tasks.indexOf(selectedTask);

      return [
        ...state.slice(0, changeTaskTitleTargetListIndex),
        {
          ...tasksList,
          tasks: [
            ...tasksList.tasks.slice(0, changeTaskTitleSelectedTask),
            { ...selectedTask, isDone: !selectedTask.isDone },
            ...tasksList.tasks.slice(changeTaskTitleSelectedTask + 1),
          ],
        },
        ...state.slice(changeTaskTitleTargetListIndex + 1),
      ];

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

export const removeTaskFromList = (
  listId: string,
  taskId: string
): RemoveTaskFromListActionType => ({
  type: ACTION_NAMES_ENUM.REMOVE_TASK_FROM_LIST,
  taskListId: listId,
  taskId,
});

export const changeTaskFromListStatus = (
  listId: string,
  taskId: string
): ChangeTaskFromListStatusActionType => ({
  type: ACTION_NAMES_ENUM.CHANGE_TASK_FROM_LIST_STATUS,
  taskListId: listId,
  taskId,
});

export const addTodolist = (title: string): AddTodolistActionType => ({
  type: ACTION_NAMES_ENUM.ADD_TODOLIST,
  title,
});

export const addTaskInTodolist = (
  task: TaskData,
  listId: string
): AddTaskInTodoList => ({
  type: ACTION_NAMES_ENUM.ADD_TASK_IN_TODOLIST,
  task,
  listId,
});

export const changeTodolistTitle = (
  title: string,
  id: string
): ChangeTodolistTitleActionType => ({
  type: ACTION_NAMES_ENUM.CHANGE_TODOLIST_TITLE,
  title,
  id,
});
