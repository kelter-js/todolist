import { v1 } from "uuid";

import { firstTasks, secondTasks, thirdTasks } from "../utils/constants";
import { TodoListsStateData } from "../types/interfaces";

export const initialState: TodoListsStateData[] = [
  {
    id: v1(),
    title: "testName",
    tasks: firstTasks,
  },
  {
    id: v1(),
    title: "some",
    tasks: secondTasks,
  },
  {
    id: v1(),
    title: "another",
    tasks: thirdTasks,
  },
];
