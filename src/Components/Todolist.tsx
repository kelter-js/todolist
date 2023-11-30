import { MouseEvent } from "react";
import { ToggleButton } from "@mui/material";

import { ITodolist } from "../types/interfaces";
import { FilterByValueTypes } from "../types/types";
import EditableTitle from "./EditableTitle";
import AddItemForm from "./AddItemForm";
import Task from "./Task";
import * as S from "./TodolistStyles";

const Todolist = ({
  title,
  tasks,
  id,
  removeTask,
  changeFilter,
  currentFilter,
  changeTaskMark,
  addTask,
  deleteTodoList,
  handleTaskListTitleChange,
  handleTaskDescriptionChange,
}: ITodolist): JSX.Element => {
  const onChangeFilterClick = (e: MouseEvent<HTMLElement>) => {
    const { name } = e.target as HTMLButtonElement;

    changeFilter(name as FilterByValueTypes);
  };

  return (
    <S.Container>
      <S.Header>
        <EditableTitle
          title={title}
          id={id}
          handleTaskChange={handleTaskListTitleChange}
        />
      </S.Header>
      <AddItemForm onAddItem={addTask} />
      <S.List>
        {tasks.map((item) => (
          <Task
            handleTaskDescriptionChange={handleTaskDescriptionChange}
            onChangeMark={changeTaskMark}
            key={item.id}
            {...item}
            onDelete={removeTask}
          />
        ))}
      </S.List>
      <S.ControlsContainer>
        <ToggleButton
          value={currentFilter}
          selected={currentFilter === "all"}
          name="all"
          onClick={onChangeFilterClick}
          color="info"
        >
          All
        </ToggleButton>
        <ToggleButton
          value={currentFilter}
          selected={currentFilter === "active"}
          name="active"
          onClick={onChangeFilterClick}
          color="info"
        >
          Active
        </ToggleButton>
        <ToggleButton
          value={currentFilter}
          selected={currentFilter === "completed"}
          name="completed"
          onClick={onChangeFilterClick}
          color="success"
        >
          Completed
        </ToggleButton>
      </S.ControlsContainer>
      <S.DeleteButton onClick={() => deleteTodoList(id)}>X</S.DeleteButton>
    </S.Container>
  );
};

export default Todolist;
