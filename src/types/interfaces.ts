export interface IVisuallyHidden {
  children: string | JSX.Element | JSX.Element[];
}

export interface ITask {
  description: string;
  isDone: boolean;
  id: number;
}

export interface ITodolist {
  title: string;
  tasks: ITask[];
}