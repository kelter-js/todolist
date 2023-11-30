import { useState, KeyboardEvent, ChangeEvent } from "react";

import { EditableText } from "./TodolistStyles";

interface IEditableTitleProps {
  title: string;
  id: string;
  handleTaskChange: (id: string, title: string) => void;
}

const EditableTitle = ({
  title,
  handleTaskChange,
  id,
}: IEditableTitleProps): JSX.Element => {
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

  return isEditMode ? (
    <input
      value={title}
      autoFocus
      onChange={onChange}
      onClick={handleSetEditMode}
      onKeyDown={onEnter}
      onBlur={handleSetEditMode}
    />
  ) : (
    <EditableText onClick={handleSetEditMode}>{title}</EditableText>
  );
};

export default EditableTitle;
