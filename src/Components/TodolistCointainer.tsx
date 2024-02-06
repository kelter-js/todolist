import { useReducer, useMemo } from "react";

import { ITodolistContainer } from "../types/interfaces";
import { FilterByValueTypes } from "../types";
import {
  tasksReducer,
  initialState,
  removeTask as removeTaskAction,
  changeTaskFilter,
  addTask as addTaskAction,
  markTaskAsDone,
  changeTaskDescription,
} from "../state/tasks-reducer";
import Todolist from "./Todolist";

const TodolistCointainer = ({
  title,
  tasks,
  id,
  deleteTodoList,
  handleTaskListTitleChange,
}: ITodolistContainer): JSX.Element => {
  const [state, dispatch] = useReducer(tasksReducer, {
    ...initialState,
    tasksList: tasks,
  });

  const removeTask = (id: string) => {
    dispatch(removeTaskAction(id));
  };

  const onChangeFilter = (filter: FilterByValueTypes) => {
    dispatch(changeTaskFilter(filter));
  };

  const addTask = (description: string) => {
    dispatch(addTaskAction(description));
  };

  const markTask = (id: string) => {
    dispatch(markTaskAsDone(id));
  };

  const handleTaskDescriptionChange = (id: string, description: string) => {
    dispatch(changeTaskDescription(id, description));
  };

  const tasksToRender = useMemo(
    () => state.getTasksView(state),
    [
      state.filterType,
      state.tasksList,
      ...state.tasksList.map((item) => item.isDone),
    ]
  );

  return (
    <Todolist
      title={title}
      id={id}
      tasks={tasksToRender}
      removeTask={removeTask}
      changeFilter={onChangeFilter}
      currentFilter={state.filterType}
      changeTaskMark={markTask}
      addTask={addTask}
      deleteTodoList={deleteTodoList}
      handleTaskListTitleChange={handleTaskListTitleChange}
      handleTaskDescriptionChange={handleTaskDescriptionChange}
    />
  );
};

export default TodolistCointainer;
