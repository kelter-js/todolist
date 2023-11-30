import { Checkbox, Button } from "@mui/material";
import styled from "styled-components";

import { ITaskComponent } from "../types/interfaces";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
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

const Task = ({
  description,
  isDone,
  id,
  onDelete,
  onChangeMark,
  handleTaskDescriptionChange,
}: ITaskComponent): JSX.Element => {
  const onChange = () => onChangeMark(id);

  const deleteTask = () => onDelete(id);

  return (
    <TaskItem>
      <Checkbox onChange={onChange} checked={isDone} />
      <EditableTitle
        title={description}
        id={id}
        handleTaskChange={handleTaskDescriptionChange}
      />
      <Button onClick={deleteTask} color="warning" variant="contained">
        <DeleteForeverIcon />
        Remove
      </Button>
    </TaskItem>
  );
};

export default Task;
