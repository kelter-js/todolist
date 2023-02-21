import { v1 } from "uuid";

export const tasks = [
  { id: v1(), description: 'CSS', isDone: true },
  { id: v1(), description: 'HTML', isDone: true },
  { id: v1(), description: 'JS & React', isDone: true },
  { id: v1(), description: 'React Native', isDone: false },
];