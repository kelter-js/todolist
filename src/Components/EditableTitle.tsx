import { FC, useState, KeyboardEvent, ChangeEvent, memo } from "react";

import { EditableTitleProps } from "../types/interfaces";
import { EditableText } from "./TodolistStyles";

const EditableTitle: FC<EditableTitleProps> = ({
  title,
  handleTaskChange,
  id,
}) => {
  const [isEditMode, setEditMode] = useState(false);

  const handleSetEditMode = () => setEditMode((state) => !state);

  const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSetEditMode();
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleTaskChange(id, e.target.value);
  };

  if (isEditMode) {
    return (
      <input
        value={title}
        autoFocus
        onChange={onChange}
        onClick={handleSetEditMode}
        onKeyDown={onEnter}
        onBlur={handleSetEditMode}
      />
    );
  }

  return <EditableText onClick={handleSetEditMode}>{title}</EditableText>;
};

export default memo(EditableTitle);
