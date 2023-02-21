import React, { useCallback } from 'react';
import { Checkbox } from '@mui/material';
import { ITaskComponent } from '../types/interfaces';
import styled from 'styled-components';
import { Button } from '@mui/material';

const TaskItem = styled.li`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const Task = ({
  description,
  isDone,
  id,
  onDelete,
  onChangeMark
}: ITaskComponent): JSX.Element => {
  const onChange = useCallback(() => onChangeMark(id), [id, onChangeMark]);

  const deleteTask = useCallback(() => onDelete(id), [id, onDelete]);

  return (
    <TaskItem>
      <Checkbox onChange={onChange} checked={isDone} />
      <p>{description}</p>
      <Button onClick={deleteTask} color='warning' variant='contained'>Remove</Button>
    </TaskItem>
  );
}

export default Task;

