import {
  addTask,
  tasksReducer,
  markTaskAsDone,
  removeTask,
  changeTaskDescription,
  changeTaskFilter
} from "./tasks-reducer";
import { ITask } from "../types/interfaces";
import { TASKS_STATUSES } from "../view";

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

test("should change dedicated task title", () => {
  const TASK_ID = "2";
  const NEW_TASK_DESCRIPTION = "newTaskDescription";

  const getTaskDescription = (tasks: ITask[]) => {
    const [taskToChangeStatus] = tasks.filter((task) => task.id === TASK_ID);
    return taskToChangeStatus.description;
  };

  expect(getTaskDescription(initialState)).toBe(initialState[1].description);

  const finalState = tasksReducer(
    initialState,
    changeTaskDescription(TASK_ID, NEW_TASK_DESCRIPTION)
  );

  expect(finalState.length).toBe(initialState.length);
  expect(getTaskDescription(finalState)).toBe(NEW_TASK_DESCRIPTION);
  expect(finalState).not.toBe(initialState);
});

test("should change state filter settings and return only in progress tasks", () => {
  expect(initialState.length).toBe(3);

  const finalState = tasksReducer(
    initialState,
    changeTaskFilter(TASKS_STATUSES.ACTIVE)
  );

  expect(finalState.length).toBe(initialState.filter(task => !task.isDone).length);
  expect(finalState[0].description).toBe(initialState[0].description);
  expect(finalState[0].id).toBe(initialState[0].id);
  expect(finalState[1].description).toBe(initialState[2].description);
  expect(finalState[1].id).toBe(initialState[2].id);
  expect(finalState).not.toBe(initialState);
});

test("should change state filter settings and return only done tasks", () => {
  expect(initialState.length).toBe(3);

  const finalState = tasksReducer(
    initialState,
    changeTaskFilter(TASKS_STATUSES.COMPLETED)
  );

  expect(finalState.length).toBe(initialState.filter(task => task.isDone).length);
  expect(finalState[0].description).toBe(initialState[1].description);
  expect(finalState[0].id).toBe(initialState[1].id);
  expect(finalState).not.toBe(initialState);
});

test("should change state filter settings, set it back and return correct tasks list", () => {
  expect(initialState.length).toBe(3);

  let finalState = tasksReducer(
    initialState,
    changeTaskFilter(TASKS_STATUSES.ACTIVE)
  );

  expect(finalState.length).toBe(initialState.filter(task => !task.isDone).length);
  expect(finalState[0].description).toBe(initialState[0].description);
  expect(finalState[0].id).toBe(initialState[0].id);
  expect(finalState[1].description).toBe(initialState[2].description);
  expect(finalState[1].id).toBe(initialState[2].id);
  expect(finalState).not.toBe(initialState);

  finalState = tasksReducer(
    initialState,
    changeTaskFilter(TASKS_STATUSES.ALL)
  );

  expect(finalState.length).toBe(initialState.length);
  expect(finalState[0].description).toBe(initialState[0].description);
  expect(finalState[0].id).toBe(initialState[0].id);
  expect(finalState[1].description).toBe(initialState[1].description);
  expect(finalState[1].id).toBe(initialState[1].id);
  expect(finalState[2].description).toBe(initialState[2].description);
  expect(finalState[2].id).toBe(initialState[2].id);
  expect(finalState).not.toBe(initialState);
});
