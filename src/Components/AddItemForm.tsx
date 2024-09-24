import { useState, ChangeEvent, KeyboardEvent, memo, useCallback } from "react";
import { Button, TextField } from "@mui/material";

import { AddItemFormProps } from "../types/interfaces";
import { TextContainer } from "./TodolistStyles";

const MISSING_DESCRIPTION_ERROR_TEXT =
  "Can`t create task with empty description";

const AddItemForm = ({ onAddItem }: AddItemFormProps): JSX.Element => {
  const [taskDescription, setTaskDescription] = useState("");
  const [helperText, setHelperText] = useState("");

  const onInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTaskDescription(e.target.value);
    setHelperText("");
  }, []);

  const createTask = useCallback(() => {
    if (taskDescription) {
      onAddItem(taskDescription);
      setTaskDescription("");
    } else if (helperText !== MISSING_DESCRIPTION_ERROR_TEXT) {
      setHelperText(MISSING_DESCRIPTION_ERROR_TEXT);
    }
  }, [taskDescription, helperText, onAddItem]);

  const onEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        createTask();
      }
    },
    [createTask]
  );

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

export default memo(AddItemForm);
