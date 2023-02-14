import React, { useState, useEffect } from 'react';
import { ITodolistContainer } from '../types/interfaces';
import Todolist from './Todolist';
import { FilterByValueTypes } from '../types/types';
import { ITask } from '../types/interfaces';

const TodolistCointainer = ({
  title,
  tasks
}: ITodolistContainer): JSX.Element => {
  const [initialTasks, setInitialTasks] = useState<ITask[]>([...tasks]);
  const [tasksList, setTasks] = useState<ITask[]>([...tasks]);
  const [filterValue, setFilterValue] = useState<FilterByValueTypes>("all");

  const removeTask = (id: number) => {
    setTasks(tasksList.filter(item => item.id !== id));
    setInitialTasks(initialTasks.filter(item => item.id !== id));
  }

  const onChangeFilter = (filter: FilterByValueTypes) => {
    setFilterValue(filter);
  }

  const markTask = (id: number) => {
    const [target] = tasksList.filter(item => item.id === id);
    target.isDone = !target.isDone;
    if (filterValue === 'completed' || filterValue === 'active') {
      setTasks([...tasksList].filter(item => filterValue === 'completed' ? item.isDone === true : item.isDone === false));
    } else {
      setTasks([...tasksList]);
    }
  }

  useEffect(() => {
    switch (filterValue) {
      case 'completed':
        setTasks(initialTasks.filter(item => item.isDone === true));
        break;
      case 'active':
        setTasks(initialTasks.filter(item => item.isDone === false));
        break;
      default:
        setTasks(initialTasks);
    }
  }, [filterValue]);

  return (
    <Todolist
      title={title}
      tasks={tasksList}
      removeTask={removeTask}
      changeFilter={onChangeFilter}
      currentFilter={filterValue}
      changeTaskMark={markTask}
    />
  );
}

export default TodolistCointainer;

