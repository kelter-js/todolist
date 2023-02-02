import React from 'react';
import VisuallyHidden from '../Common/VisuallyHidden';
import { Button, TextField } from '@mui/material';
import { ITodolist } from '../types/interfaces';
import Task from './Task';

const Todolist = ({
  title,
  tasks
}: ITodolist): JSX.Element => {
  return (
    <div>
      <header>
        <h3>{title}</h3>
      </header>
      <main>
        <VisuallyHidden>
          To do list application
        </VisuallyHidden>
        <TextField />
        <Button variant='contained' color='info'>Add</Button>
        <ul>
          {tasks.map((item) => <Task key={item.id} {...item} />)}
        </ul>
      </main>
      <footer>
        <Button variant='contained' color='info'>All</Button>
        <Button variant='contained' color='info'>Active</Button>
        <Button variant='contained' color='success'>Completed</Button>
      </footer>
    </div>
  );
}

export default Todolist;

