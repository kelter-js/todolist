import { useState, useMemo } from "react";
import { v1 } from "uuid";

import { ITodolistContainer, ITask } from "../types/interfaces";
import { FilterByValueTypes } from "../types";
import { TASKS_STATUSES } from "../view";
import Todolist from "./Todolist";

const TodolistCointainer = ({
  title,
  tasks,
  id,
  deleteTodoList,
  handleTaskListTitleChange,
}: ITodolistContainer): JSX.Element => {
  const [tasksList, setTasks] = useState<ITask[]>([...tasks]);
  const [filterValue, setFilterValue] = useState<FilterByValueTypes>(
    TASKS_STATUSES.ALL
  );

  const removeTask = (id: string) => {
    setTasks(tasksList.filter((item) => item.id !== id));
  };

  const onChangeFilter = (filter: FilterByValueTypes) => {
    setFilterValue(filter);
  };

  const addTask = (description: string) => {
    const task = {
      id: v1(),
      description: description.trim(),
      isDone: false,
    };

    setTasks((tasks) => [...tasks, task]);
  };

  const markTask = (id: string) => {
    const [target] = tasksList.filter((item) => item.id === id);

    target.isDone = !target.isDone;

    if (
      filterValue === TASKS_STATUSES.COMPLETED ||
      filterValue === TASKS_STATUSES.ACTIVE
    ) {
      setTasks(
        tasksList.filter((item) =>
          filterValue === TASKS_STATUSES.COMPLETED
            ? item.isDone === true
            : item.isDone === false
        )
      );
    } else {
      setTasks([...tasksList]);
    }
  };

  const handleTaskDescriptionChange = (id: string, description: string) => {
    const [target] = tasksList.filter((item) => item.id === id);

    target.description = description;

    setTasks([...tasksList]);
  };

  const tasksToRender = useMemo(() => {
    switch (filterValue) {
      case TASKS_STATUSES.COMPLETED:
        return tasksList.filter((item) => item.isDone === true);
      case TASKS_STATUSES.ACTIVE:
        return tasksList.filter((item) => item.isDone === false);
      default:
        return [...tasksList];
    }
  }, [filterValue, tasksList]);

  return (
    <Todolist
      title={title}
      id={id}
      tasks={tasksToRender}
      removeTask={removeTask}
      changeFilter={onChangeFilter}
      currentFilter={filterValue}
      changeTaskMark={markTask}
      addTask={addTask}
      deleteTodoList={deleteTodoList}
      handleTaskListTitleChange={handleTaskListTitleChange}
      handleTaskDescriptionChange={handleTaskDescriptionChange}
    />
  );
};

export default TodolistCointainer;
