import { FilterByValueTypes } from ".";

export interface VisuallyHiddenProps {
  children: string | JSX.Element | JSX.Element[];
}

export interface TaskData {
  description: string;
  isDone: boolean;
  id: string;
  title?: string;
  status?: string;
  priority?: number;
  startDate?: Date;
  deadline?: Date;
  todoListId?: string;
  order?: number;
  addedDate?: Date;
}

export interface TaskComponent extends TaskData {
  onDelete: (id: string) => void;
  onChangeMark: (id: string) => void;
  handleTaskDescriptionChange: (id: string, title: string) => void;
}

export interface TodoListsStateData {
  title: string;
  tasks: TaskData[];
  id: string;
}

export interface TodolistContainerProps extends TodoListsStateData {
  deleteTodoList: (id: string) => void;
  handleTaskListTitleChange: (id: string, title: string) => void;
  onRemoveTask: (listId: string, taskId: string) => void;
  onChangeStatus: (listId: string, taskId: string) => void;
  onAddTask: (task: TaskData, listId: string) => void;
}

export interface ITodolist
  extends Omit<
    TodolistContainerProps,
    "onRemoveTask" | "onChangeStatus" | "onAddTask"
  > {
  currentFilter: string;
  removeTask: (id: string) => void;
  changeFilter: (filter: FilterByValueTypes) => void;
  changeTaskMark: (id: string) => void;
  addTask: (description: string) => void;
  deleteTodoList: (id: string) => void;
  handleTaskDescriptionChange: (id: string, title: string) => void;
}

export interface TodolistApi {
  id: string;
  title: string;
  date: string;
  order?: number;
}

interface APIResponse {
  resultCode: number;
  messages: string[];
}

interface UpdateDeleteResponse extends APIResponse {
  data: {};
}

export interface TodolistCreationResponse extends APIResponse {
  data: { item: TodolistApi };
}

export interface TodolistDeletionResponse extends UpdateDeleteResponse {}

export interface TodolistUpdateResponse extends UpdateDeleteResponse {}

export interface TodolistsTasksResponse {
  error: string;
  totalCount: number;
  items: TaskData[];
}

export interface AddItemFormProps {
  onAddItem: (data: string) => void;
}

export interface EditableTitleProps {
  title: string;
  id: string;
  handleTaskChange: (id: string, title: string) => void;
}

export interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  size?: "small" | "medium" | "large";
  label: string;
  onClick?: () => void;
}

export interface User {
  name: string;
}

export interface HeaderProps {
  user?: User;
  onLogin?: () => void;
  onLogout?: () => void;
  onCreateAccount?: () => void;
}
