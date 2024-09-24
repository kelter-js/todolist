import { v1 } from "uuid";

import { todolistsReducer } from "./todolists-reducer";
import { TodoListsStateData } from "../types/interfaces";
import {
  removeTodolist,
  addTodolist,
  changeTodolistTitle,
} from "./todolists-reducer";

test("valid todolist should be removed from todolists", () => {
  const todolistFirstTestID = v1();
  const todolistSecondTestID = v1();

  const initialState: TodoListsStateData[] = [
    { id: todolistFirstTestID, title: "test title 1", tasks: [] },
    { id: todolistSecondTestID, title: "test title 2", tasks: [] },
  ];

  const finalState = todolistsReducer(
    [...initialState],
    removeTodolist(todolistFirstTestID)
  );

  expect(finalState.length).toBe(1);
  expect(finalState[0].id).toBe(todolistSecondTestID);
});

test("valid todolist should be added", () => {
  const todolistFirstTestID = v1();
  const todolistSecondTestID = v1();

  const newTodolistTitle = "New Todolist";

  const initialState: TodoListsStateData[] = [
    { id: todolistFirstTestID, title: "test title 1", tasks: [] },
    { id: todolistSecondTestID, title: "test title 2", tasks: [] },
  ];

  const finalState = todolistsReducer(
    [...initialState],
    addTodolist(newTodolistTitle)
  );

  expect(finalState.length).toBe(3);
  expect(finalState[2].title).toBe(newTodolistTitle);
  expect(finalState[2].tasks.length).toBe(0);
});

test("should change title of one of task lists", () => {
  const todolistFirstTestID = v1();
  const todolistSecondTestID = v1();

  const changedTodolistTitle = "Changed Todolist title";

  const initialState: TodoListsStateData[] = [
    { id: todolistFirstTestID, title: "test title 1", tasks: [] },
    { id: todolistSecondTestID, title: "test title 2", tasks: [] },
  ];

  const finalState = todolistsReducer(
    [...initialState],
    changeTodolistTitle(changedTodolistTitle, todolistSecondTestID)
  );

  expect(finalState[0].title).toBe(initialState[0].title);
  expect(finalState[1].title).toBe(changedTodolistTitle);
});
