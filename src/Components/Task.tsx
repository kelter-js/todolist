import { Checkbox, Button } from '@mui/material';
import styled from 'styled-components';

import { ITaskComponent } from '../types/interfaces';

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
  const onChange = () => onChangeMark(id);

  const deleteTask = () => onDelete(id);

  return (
    <TaskItem>
      <Checkbox onChange={onChange} checked={isDone} />
      <p>{description}</p>
      <Button onClick={deleteTask} color='warning' variant='contained'>Remove</Button>
    </TaskItem>
  );
}

export default Task;

