import axios from "axios";
import {
  TodolistApi,
  TodolistCreationResponse,
  TodolistDeletionResponse,
  TodolistsTasksResponse,
  TodolistUpdateResponse,
} from "../types/interfaces";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: { "API-KEY": process.env.REACT_APP_API_KEY },
});

const DEFAULT_PATH = "todo-lists";

export const todolistsApi = {
  get: () => instance.get<TodolistApi[]>(DEFAULT_PATH),

  update: (todolistId: string, title: string) =>
    instance.put<TodolistUpdateResponse>(`${DEFAULT_PATH}/${todolistId}`, {
      title,
    }),

  delete: (todolistId: string) =>
    instance.delete<TodolistDeletionResponse>(`${DEFAULT_PATH}/${todolistId}`),

  create: (title: string) =>
    instance.post<TodolistCreationResponse>(DEFAULT_PATH, {
      title,
    }),

  getTasks: (id: string) =>
    instance.get<TodolistsTasksResponse>(`${DEFAULT_PATH}/${id}/tasks`),

  deleteTask: (todolistId: string, taskId: string) =>
    instance.delete<TodolistsTasksResponse>(
      `${DEFAULT_PATH}/${todolistId}/tasks/${taskId}`
    ),

  createTask: (todolistId: string, title: string) =>
    instance.post<TodolistsTasksResponse>(
      `${DEFAULT_PATH}/${todolistId}/tasks/`,
      {
        title,
      }
    ),

  updateTask: (todolistId: string, taskId: string, title: string) =>
    instance.put<TodolistsTasksResponse>(
      `${DEFAULT_PATH}/${todolistId}/tasks/${taskId}`,
      { title }
    ),
};
