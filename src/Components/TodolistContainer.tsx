import { useState, useMemo, useCallback, useEffect } from "react";
import { v1 } from "uuid";

import { TodolistContainerProps, TaskData } from "../types/interfaces";
import { FilterByValueTypes } from "../types";
import { TASKS_STATUSES } from "../entities";
import Todolist from "./Todolist";

const TodolistCointainer = ({
  title,
  tasks,
  id,
  deleteTodoList,
  handleTaskListTitleChange,
  onRemoveTask,
  onChangeStatus,
  onAddTask,
}: TodolistContainerProps): JSX.Element => {
  const [tasksList, setTasks] = useState<TaskData[]>([...tasks]);
  const [filterValue, setFilterValue] = useState<FilterByValueTypes>(
    TASKS_STATUSES.ALL
  );

  useEffect(() => {
    setTasks(tasks);
  }, [tasks]);

  const removeTask = useCallback(
    (taskId: string) => {
      onRemoveTask(id, taskId);
    },
    [id]
  );

  const handleChangeFilter = useCallback((filter: FilterByValueTypes) => {
    setFilterValue(filter);
  }, []);

  const addTask = useCallback((description: string) => {
    const task = {
      id: v1(),
      description: description.trim(),
      isDone: false,
    };

    onAddTask(task, id);
  }, []);

  const markTask = useCallback(
    (taskId: string) => {
      onChangeStatus(id, taskId);
    },
    [id]
  );

  const handleTaskDescriptionChange = useCallback(
    (id: string, description: string) => {
      const [target] = tasksList.filter((item) => item.id === id);

      target.description = description;

      setTasks([...tasksList]);
    },
    [tasksList.length]
  );

  const tasksToRender = useMemo(() => {
    switch (filterValue) {
      case TASKS_STATUSES.COMPLETED:
        return tasksList.filter((item) => item.isDone === true);
      case TASKS_STATUSES.ACTIVE:
        return tasksList.filter((item) => item.isDone === false);
      default:
        return [...tasksList];
    }
  }, [filterValue, tasksList, tasks]);

  return (
    <Todolist
      title={title}
      id={id}
      tasks={tasksToRender}
      removeTask={removeTask}
      changeFilter={handleChangeFilter}
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
