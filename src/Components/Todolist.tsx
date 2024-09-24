import { FC, MouseEvent, memo, useMemo } from "react";
import { ToggleButton } from "@mui/material";

import { ITodolist } from "../types/interfaces";
import { FilterByValueTypes } from "../types";
import { TASKS_STATUSES } from "../entities";
import EditableTitle from "./EditableTitle";
import AddItemForm from "./AddItemForm";
import Task from "./Task";
import * as S from "./TodolistStyles";

const Todolist: FC<ITodolist> = ({
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
}) => {
  const handleChangeFilterClick = (e: MouseEvent<HTMLElement>) => {
    const { name } = e.target as HTMLButtonElement;

    changeFilter(name as FilterByValueTypes);
  };

  const handleDeleteTaskList = () => deleteTodoList(id);

  const tasksList = useMemo(
    () =>
      tasks.map((item) => (
        <Task
          handleTaskDescriptionChange={handleTaskDescriptionChange}
          onChangeMark={changeTaskMark}
          key={item.id}
          {...item}
          onDelete={removeTask}
        />
      )),
    [tasks, handleTaskDescriptionChange, changeTaskMark, removeTask]
  );

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

      <S.List>{tasksList}</S.List>

      <S.ControlsContainer>
        <ToggleButton
          value={currentFilter}
          selected={currentFilter === TASKS_STATUSES.ALL}
          name={TASKS_STATUSES.ALL}
          onClick={handleChangeFilterClick}
          color="info"
        >
          All
        </ToggleButton>

        <ToggleButton
          value={currentFilter}
          selected={currentFilter === TASKS_STATUSES.ACTIVE}
          name={TASKS_STATUSES.ACTIVE}
          onClick={handleChangeFilterClick}
          color="info"
        >
          Active
        </ToggleButton>

        <ToggleButton
          value={currentFilter}
          selected={currentFilter === TASKS_STATUSES.COMPLETED}
          name={TASKS_STATUSES.COMPLETED}
          onClick={handleChangeFilterClick}
          color="success"
        >
          Completed
        </ToggleButton>
      </S.ControlsContainer>

      <S.DeleteButton onClick={handleDeleteTaskList}>X</S.DeleteButton>
    </S.Container>
  );
};

export default memo(Todolist);
