import React from 'react';
import { Checkbox } from '@mui/material';
import { ITask } from '../types/interfaces';

const Task = ({
  description,
  isDone,
}: ITask): JSX.Element => {
  return (
    <li>
      <Checkbox checked={isDone} />
      <p>{description}</p>
    </li>
  );
}

export default Task;

