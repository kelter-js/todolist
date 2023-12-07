import {
  addTask,
  tasksReducer,
  markTaskAsDone,
  removeTask,
} from "./tasks-reducer";
import { ITask } from "../types/interfaces";

let initialState: ITask[] = [
  { id: "1", description: "css", isDone: false },
  { id: "2", description: "js", isDone: true },
  { id: "3", description: "react", isDone: false },
];

beforeEach(() => {
  initialState = [
    { id: "1", description: "css", isDone: false },
    { id: "2", description: "js", isDone: true },
    { id: "3", description: "react", isDone: false },
  ];
});

test("correct task should be deleted from tasks list", () => {
  const TASK_ID_TO_BE_REMOVED = "2";
  const finalState = tasksReducer(
    initialState,
    removeTask(TASK_ID_TO_BE_REMOVED)
  );

  expect(finalState.length).not.toBe(initialState.length);
  expect(finalState.length).toBe(initialState.length - 1);
  expect(
    finalState.filter((task) => task.id === TASK_ID_TO_BE_REMOVED).length
  ).toBe(0);
  expect(finalState).not.toBe(initialState);
});

test("should create and add new task", () => {
  const NEW_TASK_DESCRIPTION = "someNewTaskDescription";
  const finalState = tasksReducer(initialState, addTask(NEW_TASK_DESCRIPTION));

  expect(finalState.length).not.toBe(initialState.length);
  expect(finalState.length).toBe(initialState.length + 1);
  expect(
    finalState.filter((task) => task.description === NEW_TASK_DESCRIPTION)
      .length
  ).toBe(1);
  expect(
    finalState.filter((task) => task.description === NEW_TASK_DESCRIPTION)[0].id
  ).toBeDefined();
  expect(
    finalState.filter((task) => task.description === NEW_TASK_DESCRIPTION)[0]
      .isDone
  ).toBeFalsy();
  expect(finalState).not.toBe(initialState);
});

test("should change dedicated task status", () => {
  const TASK_ID = "2";
  const getTaskStatus = (tasks: ITask[]) => {
    const [taskToChangeStatus] = tasks.filter((task) => task.id === TASK_ID);
    return taskToChangeStatus.isDone;
  };

  expect(getTaskStatus(initialState)).toBeTruthy();

  const finalState = tasksReducer(initialState, markTaskAsDone(TASK_ID));

  expect(finalState.length).toBe(initialState.length);
  expect(getTaskStatus(finalState)).toBeFalsy();
  expect(finalState).not.toBe(initialState);
});
