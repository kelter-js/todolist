import { useState, ChangeEvent, KeyboardEvent } from "react";
import { Button, TextField } from "@mui/material";

import { TextContainer } from "./TodolistStyles";

interface IAddItemFormProps {
  onAddItem: (data: string) => void;
}

const AddItemForm = ({ onAddItem }: IAddItemFormProps): JSX.Element => {
  const [taskDescription, setTaskDescription] = useState("");
  const [helperText, setHelperText] = useState("");

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskDescription(e.target.value);
    setHelperText("");
  };

  const createTask = () => {
    if (taskDescription) {
      onAddItem(taskDescription);
      setTaskDescription("");
    } else {
      setHelperText("Can`t create task with empty description");
    }
  };

  const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      createTask();
    }
  };

  return (
    <TextContainer>
      <TextField
        onKeyDown={onEnter}
        label="Task information"
        value={taskDescription}
        onChange={onInput}
        error={Boolean(helperText)}
        helperText={helperText}
      />
      <Button onClick={createTask} variant="contained" color="info">
        Add
      </Button>
    </TextContainer>
  );
};

export default AddItemForm;
