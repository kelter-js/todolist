import { FC } from "react";
import { Checkbox, Button } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import styled from "styled-components";

import { TaskComponent } from "../types/interfaces";
import EditableTitle from "./EditableTitle";

const TaskItem = styled.li`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const Task: FC<TaskComponent> = ({
  description,
  isDone,
  id,
  onDelete,
  onChangeMark,
  handleTaskDescriptionChange,
}) => {
  const handleChange = () => onChangeMark(id);

  const handleDeleteTask = () => onDelete(id);

  return (
    <TaskItem>
      <Checkbox onChange={handleChange} checked={isDone} />

      <EditableTitle
        title={description}
        id={id}
        handleTaskChange={handleTaskDescriptionChange}
      />

      <Button onClick={handleDeleteTask} color="warning" variant="contained">
        <DeleteForeverIcon />
        Remove
      </Button>
    </TaskItem>
  );
};

export default Task;
