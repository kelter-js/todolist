import React from 'react';
import { Button, TextField, ToggleButton } from '@mui/material';
import { ITodolist } from '../types/interfaces';
import Task from './Task';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 350px;
  margin: 20px;
  padding: 10px;
  position: relative;
  background: white;
  border-radius: 0% 0% 0% 0% / 0% 0% 0% 0% ;
  box-shadow: 20px 20px rgba(0,0,0,.15);
  transition: all .4s ease;

  &:hover {
    border-radius: 0% 0% 30% 30% / 0% 0% 3% 3%;
    box-shadow: 10px 10px rgba(0,0,0,.25);
  }
`;

const Header = styled.h3`
  text-align: center;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  & .MuiButton-containedInfo {
    min-width: 90px;
  }
`;

const List = styled.ul`
  margin: 10px 0;
  padding: 0;
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;

  & .MuiToggleButton-info {
    margin-right: 10px;

    &:last-of-type {
      margin-right: 0;
    }
  }
`;

const Todolist = ({
  title,
  tasks,
  removeTask,
  changeFilter,
  currentFilter,
  changeTaskMark,
}: ITodolist): JSX.Element => {
  return (
    <Container>
      <Header>{title}</Header>
      <TextContainer>
        <TextField label='Task information' />
        <Button variant='contained' color='info'>Add</Button>
      </TextContainer>
      <List>
        {tasks.map((item) => <Task onChangeMark={changeTaskMark} key={item.id} {...item} onDelete={removeTask} />)}
      </List>
      <ControlsContainer>
        <ToggleButton
          value={currentFilter}
          selected={currentFilter === 'all'}
          onClick={() => changeFilter('all')}
          color='info'
        >
          All
        </ToggleButton>
        <ToggleButton
          value={currentFilter}
          selected={currentFilter === 'active'}
          onClick={() => changeFilter('active')}
          color='info'
        >
          Active
        </ToggleButton>
        <ToggleButton
          value={currentFilter}
          selected={currentFilter === 'completed'}
          onClick={() => changeFilter('completed')}
          color='success'
        >Completed
        </ToggleButton>
      </ControlsContainer>
    </Container>
  );
}

export default Todolist;

