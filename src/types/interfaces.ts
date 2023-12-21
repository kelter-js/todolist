import { FilterByValueTypes } from '.';

export interface IVisuallyHidden {
  children: string | JSX.Element | JSX.Element[];
}

export interface ITask {
  description: string;
  isDone: boolean;
  id: string;
}

export interface ITaskComponent extends ITask {
  onDelete: (id: string) => void;
  onChangeMark: (id: string) => void;
  handleTaskDescriptionChange: (id: string, title: string) => void;
}

export interface ITodoListsState {
  title: string;
  tasks: ITask[];
  id: string;
}

export interface ITodolistContainer extends ITodoListsState {
  deleteTodoList: (id: string) => void;
  handleTaskListTitleChange: (id: string, title: string) => void;
}

export interface ITodolist extends ITodolistContainer {
  currentFilter: string;
  removeTask: (id: string) => void;
  changeFilter: (filter: FilterByValueTypes) => void;
  changeTaskMark: (id: string) => void;
  addTask: (description: string) => void;
  deleteTodoList: (id: string) => void;
  handleTaskDescriptionChange: (id: string, title: string) => void;
}