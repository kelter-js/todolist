import {
  addTask,
  tasksReducer,
  markTaskAsDone,
  removeTask,
  changeTaskDescription,
  changeTaskFilter,
  TodolistState,
} from "./tasks-reducer";
import { ITask } from "../types/interfaces";
import { TASKS_STATUSES } from "../view";

let initialState: TodolistState = {
  filterType: TASKS_STATUSES.ALL,
  tasksList: [
    { id: "1", description: "css", isDone: false },
    { id: "2", description: "js", isDone: true },
    { id: "3", description: "react", isDone: false },
  ],
};

beforeEach(() => {
  initialState = {
    filterType: TASKS_STATUSES.ALL,
    tasksList: [
      { id: "1", description: "css", isDone: false },
      { id: "2", description: "js", isDone: true },
      { id: "3", description: "react", isDone: false },
    ],
  };
});

test("correct task should be deleted from tasks list", () => {
  const TASK_ID_TO_BE_REMOVED = "2";
  const finalState = tasksReducer(
    initialState,
    removeTask(TASK_ID_TO_BE_REMOVED)
  );

  expect(finalState.tasksList.length).not.toBe(initialState.tasksList.length);
  expect(finalState.tasksList.length).toBe(initialState.tasksList.length - 1);
  expect(
    finalState.tasksList.filter((task) => task.id === TASK_ID_TO_BE_REMOVED).length
  ).toBe(0);
  expect(finalState).not.toBe(initialState);
});

test("should create and add new task", () => {
  const NEW_TASK_DESCRIPTION = "someNewTaskDescription";
  const finalState = tasksReducer(initialState, addTask(NEW_TASK_DESCRIPTION));

  expect(finalState.tasksList.length).not.toBe(initialState.tasksList.length);
  expect(finalState.tasksList.length).toBe(initialState.tasksList.length + 1);
  expect(
    finalState.tasksList.filter(
      (task) => task.description === NEW_TASK_DESCRIPTION
    ).length
  ).toBe(1);
  expect(
    finalState.tasksList.filter(
      (task) => task.description === NEW_TASK_DESCRIPTION
    )[0].id
  ).toBeDefined();
  expect(
    finalState.tasksList.filter(
      (task) => task.description === NEW_TASK_DESCRIPTION
    )[0].isDone
  ).toBeFalsy();
  expect(finalState).not.toBe(initialState);
});

test("should change dedicated task status", () => {
  const TASK_ID = "2";
  const getTaskStatus = (tasks: ITask[]) => {
    const [taskToChangeStatus] = tasks.filter((task) => task.id === TASK_ID);
    return taskToChangeStatus.isDone;
  };

  expect(getTaskStatus(initialState.tasksList)).toBeTruthy();

  const finalState = tasksReducer(initialState, markTaskAsDone(TASK_ID));

  expect(finalState.tasksList.length).toBe(initialState.tasksList.length);
  expect(getTaskStatus(finalState.tasksList)).toBeFalsy();
  expect(finalState).not.toBe(initialState);
});

test("should change dedicated task title", () => {
  const TASK_ID = "2";
  const NEW_TASK_DESCRIPTION = "newTaskDescription";

  const getTaskDescription = (tasks: ITask[]) => {
    const [taskToChangeStatus] = tasks.filter((task) => task.id === TASK_ID);
    return taskToChangeStatus.description;
  };

  expect(getTaskDescription(initialState.tasksList)).toBe(
    initialState.tasksList[1].description
  );

  const finalState = tasksReducer(
    initialState,
    changeTaskDescription(TASK_ID, NEW_TASK_DESCRIPTION)
  );

  expect(finalState.tasksList.length).toBe(initialState.tasksList.length);
  expect(getTaskDescription(finalState.tasksList)).toBe(NEW_TASK_DESCRIPTION);
  expect(finalState).not.toBe(initialState);
});

test("should change state filter settings and return only in progress tasks", () => {
  expect(initialState.tasksList.length).toBe(3);

  const finalState = tasksReducer(
    initialState,
    changeTaskFilter(TASKS_STATUSES.ACTIVE)
  );

  expect(finalState.tasksList.length).toBe(
    initialState.tasksList.filter((task) => !task.isDone).length
  );
  expect(finalState.tasksList[0].description).toBe(
    initialState.tasksList[0].description
  );
  expect(finalState.tasksList[0].id).toBe(initialState.tasksList[0].id);
  expect(finalState.tasksList[1].description).toBe(
    initialState.tasksList[2].description
  );
  expect(finalState.tasksList[1].id).toBe(initialState.tasksList[2].id);
  expect(finalState).not.toBe(initialState);
});

test("should change state filter settings and return only done tasks", () => {
  expect(initialState.tasksList.length).toBe(3);

  const finalState = tasksReducer(
    initialState,
    changeTaskFilter(TASKS_STATUSES.COMPLETED)
  );

  expect(finalState.tasksList.length).toBe(
    initialState.tasksList.filter((task) => task.isDone).length
  );
  expect(finalState.tasksList[0].description).toBe(
    initialState.tasksList[1].description
  );
  expect(finalState.tasksList[0].id).toBe(initialState.tasksList[1].id);
  expect(finalState).not.toBe(initialState);
});

test("should change state filter settings, set it back and return correct tasks list", () => {
  expect(initialState.tasksList.length).toBe(3);

  let finalState = tasksReducer(
    initialState,
    changeTaskFilter(TASKS_STATUSES.ACTIVE)
  );

  expect(finalState.tasksList.length).toBe(
    initialState.tasksList.filter((task) => !task.isDone).length
  );
  expect(finalState.tasksList[0].description).toBe(
    initialState.tasksList[0].description
  );
  expect(finalState.tasksList[0].id).toBe(initialState.tasksList[0].id);
  expect(finalState.tasksList[1].description).toBe(
    initialState.tasksList[2].description
  );
  expect(finalState.tasksList[1].id).toBe(initialState.tasksList[2].id);
  expect(finalState).not.toBe(initialState);

  finalState = tasksReducer(initialState, changeTaskFilter(TASKS_STATUSES.ALL));

  expect(finalState.tasksList.length).toBe(initialState.tasksList.length);
  expect(finalState.tasksList[0].description).toBe(
    initialState.tasksList[0].description
  );
  expect(finalState.tasksList[0].id).toBe(initialState.tasksList[0].id);
  expect(finalState.tasksList[1].description).toBe(
    initialState.tasksList[1].description
  );
  expect(finalState.tasksList[1].id).toBe(initialState.tasksList[1].id);
  expect(finalState.tasksList[2].description).toBe(
    initialState.tasksList[2].description
  );
  expect(finalState.tasksList[2].id).toBe(initialState.tasksList[2].id);
  expect(finalState).not.toBe(initialState);
});
