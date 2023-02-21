import { FilterByValueTypes } from './types';

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
}

export interface ITodolistContainer {
  title: string;
  tasks: ITask[];
}

export interface ITodolist extends ITodolistContainer {
  currentFilter: string;
  removeTask: (id: string) => void;
  changeFilter: (filter: FilterByValueTypes) => void;
  changeTaskMark: (id: string) => void;
  addTask: (description: string) => void;
}