import { FilterByValueTypes } from './types';

export interface IVisuallyHidden {
  children: string | JSX.Element | JSX.Element[];
}

export interface ITask {
  description: string;
  isDone: boolean;
  id: number;
}

export interface ITaskComponent extends ITask {
  onDelete: (id: number) => void;
  onChangeMark: (id: number) => void;
}

export interface ITodolistContainer {
  title: string;
  tasks: ITask[];
}

export interface ITodolist extends ITodolistContainer {
  currentFilter: string;
  removeTask: (id: number) => void;
  changeFilter: (filter: FilterByValueTypes) => void;
  changeTaskMark: (id: number) => void;
}