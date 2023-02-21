import React, { useState } from 'react';
import { Button, TextField, ToggleButton } from '@mui/material';
import { ITodolist } from '../types/interfaces';
import Task from './Task';
import * as S from './TodolistStyles';
import { FilterByValueTypes } from '../types/types';

const Todolist = ({
  title,
  tasks,
  removeTask,
  changeFilter,
  currentFilter,
  changeTaskMark,
  addTask,
}: ITodolist): JSX.Element => {
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [helperText, setHelperText] = useState<string>('');

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDescription(e.target.value);
    setHelperText('');
  }

  const createTask = () => {
    if (taskDescription) {
      addTask(taskDescription);
      setTaskDescription('');
    } else {
      setHelperText('Can`t create task with empty description');
    }
  }

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      createTask();
    }
  }

  const onChangeFilterClick = (e: React.MouseEvent<HTMLElement>) => {
    const { name } = (e.target as HTMLButtonElement);

    changeFilter(name as FilterByValueTypes);
  }

  return (
    <S.Container>
      <S.Header>{title}</S.Header>
      <S.TextContainer>
        <TextField
          onKeyDown={onEnter}
          label='Task information'
          value={taskDescription}
          onChange={onInput}
          error={Boolean(helperText)}
          helperText={helperText}
        />
        <Button onClick={createTask} variant='contained' color='info'>Add</Button>
      </S.TextContainer>
      <S.List>
        {tasks.map((item) => <Task onChangeMark={changeTaskMark} key={item.id} {...item} onDelete={removeTask} />)}
      </S.List>
      <S.ControlsContainer>
        <ToggleButton
          value={currentFilter}
          selected={currentFilter === 'all'}
          name='all'
          onClick={onChangeFilterClick}
          color='info'
        >
          All
        </ToggleButton>
        <ToggleButton
          value={currentFilter}
          selected={currentFilter === 'active'}
          name='active'
          onClick={onChangeFilterClick}
          color='info'
        >
          Active
        </ToggleButton>
        <ToggleButton
          value={currentFilter}
          selected={currentFilter === 'completed'}
          name='completed'
          onClick={onChangeFilterClick}
          color='success'
        >Completed
        </ToggleButton>
      </S.ControlsContainer>
    </S.Container>
  );
}

export default Todolist;

