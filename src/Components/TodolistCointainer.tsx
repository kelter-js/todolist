import { useState, useMemo } from 'react';
import { v1 } from 'uuid';

import { ITodolistContainer } from '../types/interfaces';
import { FilterByValueTypes } from '../types/types';
import { ITask } from '../types/interfaces';
import Todolist from './Todolist';

const TodolistCointainer = ({
  title,
  tasks
}: ITodolistContainer): JSX.Element => {
  const [tasksList, setTasks] = useState<ITask[]>([...tasks]);
  const [filterValue, setFilterValue] = useState<FilterByValueTypes>("all");

  const removeTask = (id: string) => {
    setTasks(tasksList.filter(item => item.id !== id));
  }

  const onChangeFilter = (filter: FilterByValueTypes) => {
    setFilterValue(filter);
  }

  const addTask = (description: string) => {
    const task = {
      id: v1(),
      description: description.trim(),
      isDone: false,
    }

    setTasks((tasks) => [...tasks, task]);
  }

  const markTask = (id: string) => {
    const [target] = tasksList.filter(item => item.id === id);

    target.isDone = !target.isDone;

    if (filterValue === 'completed' || filterValue === 'active') {
      setTasks(tasksList.filter(item => filterValue === 'completed' ? item.isDone === true : item.isDone === false));
    } else {
      setTasks([...tasksList]);
    }
  }

  const tasksToRender = useMemo(() => {
    switch (filterValue) {
      case 'completed':
        return tasksList.filter(item => item.isDone === true);
      case 'active':
        return tasksList.filter(item => item.isDone === false);
      default:
        return [...tasksList];
    }
  }, [filterValue, tasksList]);

  return (
    <Todolist
      title={title}
      tasks={tasksToRender}
      removeTask={removeTask}
      changeFilter={onChangeFilter}
      currentFilter={filterValue}
      changeTaskMark={markTask}
      addTask={addTask}
    />
  );
}

export default TodolistCointainer;

